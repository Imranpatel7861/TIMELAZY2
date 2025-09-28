import json
from ortools.sat.python import cp_model

# Constants
DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
SLOTS_PER_DAY = 10  # Updated to reflect 10 slots
LUNCH_BREAK_SLOTS = {0: [5], 1: [5], 2: [5], 3: [5], 4: [5]} # Lunch is slot 5 (0-based) for all days
TIME_SLOTS = [
    "08:50-09:40",
    "09:40-10:30",
    "10:30-11:20",
    "11:20-12:10",
    "12:10-01:00",
    "01:00-01:40",  # LUNCH BREAK - single slot
    "01:40-02:30",
    "02:30-03:20",
    "03:20-04:10",
    "04:10-05:00"
]

def find_room_for_subject(subj, rooms):
    """
    Find an appropriate room for a subject based on its constraints.
    Returns the room name. Assumes a room will always be found.
    """
    if subj.get("required_room"):
        for room in rooms:
            if room["name"] == subj["required_room"]:
                return room["name"]
    if subj.get("room_type"):
        for room in rooms:
            if room["type"] == subj["room_type"]:
                return room["name"]
    # Return first available room as fallback
    return rooms[0]["name"] if rooms else "Room1"

def solve_timetable(schema, fixed_positions=None):
    """
    Solve timetable using Google OR-Tools CP-SAT.
    Returns frontend-ready timetable grid with proper display format using day names and time slots.
    """
    try:
        print("=== SOLVER DEBUG: Starting solver ===")
        model = cp_model.CpModel()

        divisions = schema["divisions"]
        subjects = schema["subjects"]
        faculty = schema["faculty"]
        rooms = schema["rooms"]

        print(f"Solver input: {len(divisions)} divisions, {len(subjects)} subjects, {len(faculty)} faculty, {len(rooms)} rooms")

        # Separate subjects into lectures and labs
        lecture_subjects = [s for s in subjects if s['type'] == 'Theory']
        lab_subjects = [s for s in subjects if s['type'] == 'Lab']
        
        print(f"Subject breakdown: {len(lecture_subjects)} lectures, {len(lab_subjects)} labs")
        
        # Handle empty subject lists
        if not lecture_subjects and not lab_subjects:
            print("ERROR: No subjects found in schema")
            return None
        
        # Create index maps
        lecture_index_map = {subj["code"]: idx for idx, subj in enumerate(lecture_subjects)}
        lab_index_map = {subj["code"]: idx for idx, subj in enumerate(lab_subjects)}

        # Variables for lectures: timetable_lecture[(day, slot, division)] = lecture_subject_index (-1 means free)
        timetable_lecture = {}
        for d in range(len(DAYS)):
            for s in range(SLOTS_PER_DAY):
                for div in divisions:
                    max_lecture_index = max(0, len(lecture_subjects) - 1) if lecture_subjects else 0
                    timetable_lecture[(d, s, div["name"])] = model.NewIntVar(
                        -1, max_lecture_index,
                        f"lec_{d}{s}{div['name']}"
                    )

        # Variables for labs: timetable_lab[(day, slot, division, batch)] = lab_subject_index (-1 means free)
        timetable_lab = {}
        for d in range(len(DAYS)):
            for s in range(SLOTS_PER_DAY):
                for div in divisions:
                    for batch in div["batches"]:
                        max_lab_index = max(0, len(lab_subjects) - 1) if lab_subjects else 0
                        timetable_lab[(d, s, div["name"], batch)] = model.NewIntVar(
                            -1, max_lab_index,
                            f"lab_{d}{s}{div['name']}_{batch}"
                        )

        print("=== SOLVER DEBUG: Variables created ===")

        # --- Hard Constraints ---

        # 1. No classes during lunch break (day-specific)
        for d in range(len(DAYS)):
            for s in LUNCH_BREAK_SLOTS.get(d, []):
                for div in divisions:
                    model.Add(timetable_lecture[(d, s, div["name"])] == -1)
                    for batch in div["batches"]:
                        model.Add(timetable_lab[(d, s, div["name"], batch)] == -1)

        # 2. Daily AIML-HONOR lecture at the first slot for all divisions (Mon-Thu)
        aiml_honor_index = lecture_index_map.get("AIML-HONOR")
        if aiml_honor_index is not None:
            for d in range(4): # Monday to Thursday
                for div in divisions:
                    model.Add(timetable_lecture[(d, 0, div["name"])] == aiml_honor_index)
                    print(f"Added fixed constraint: AIML-HONOR lecture on {DAYS[d]} at slot 0 for Div {div['name']}")

        # 3. Exactly 4 sessions per day per batch (lectures + labs)
        for d in range(len(DAYS)):
            for div in divisions:
                for batch in div["batches"]:
                    daily_class_vars = []
                    for s in range(SLOTS_PER_DAY):
                        if s not in LUNCH_BREAK_SLOTS.get(d, []):
                            # A boolean variable that is true if there is a lecture in this slot
                            is_lecture = model.NewBoolVar(f"is_lec_{d}{s}{div['name']}")
                            model.Add(timetable_lecture[(d, s, div['name'])] != -1).OnlyEnforceIf(is_lecture)
                            model.Add(timetable_lecture[(d, s, div['name'])] == -1).OnlyEnforceIf(is_lecture.Not())
                            
                            # A boolean variable that is true if there is a lab in this slot for this batch
                            is_lab = model.NewBoolVar(f"is_lab_{d}{s}{div['name']}_{batch}")
                            model.Add(timetable_lab[(d, s, div['name'], batch)] != -1).OnlyEnforceIf(is_lab)
                            model.Add(timetable_lab[(d, s, div['name'], batch)] == -1).OnlyEnforceIf(is_lab.Not())
                            
                            daily_class_vars.append(is_lecture)
                            daily_class_vars.append(is_lab)
                    
                    # The sum of all active class booleans for a day must be exactly 4
                    if daily_class_vars:
                        model.Add(sum(daily_class_vars) == 4)
                        print(f"Added constraint: Division {div['name']}, Batch {batch} must have exactly 4 classes per day")

        # 4. No lecture and lab at the same time for a division
        for d in range(len(DAYS)):
            for s in range(SLOTS_PER_DAY):
                if s in LUNCH_BREAK_SLOTS.get(d, []):
                    continue
                for div in divisions:
                    is_lecture = model.NewBoolVar(f"is_lec_at_slot_{d}{s}{div['name']}")
                    model.Add(timetable_lecture[(d, s, div["name"])] >= 0).OnlyEnforceIf(is_lecture)
                    model.Add(timetable_lecture[(d, s, div["name"])] == -1).OnlyEnforceIf(is_lecture.Not())

                    for batch in div["batches"]:
                        is_lab = model.NewBoolVar(f"is_lab_at_slot_{d}{s}{div['name']}_{batch}")
                        model.Add(timetable_lab[(d, s, div["name"], batch)] >= 0).OnlyEnforceIf(is_lab)
                        model.Add(timetable_lab[(d, s, div["name"], batch)] == -1).OnlyEnforceIf(is_lab.Not())
                        model.Add(is_lecture + is_lab <= 1)
        
        # 5. Division-Specific Practical Patterns
        for div in divisions:
            div_name = div["name"]
            
            # Division A: 3-hour practical blocks, mostly morning
            if div_name == "A":
                print("Adding Div A specific constraints (3-hour labs, morning-focused)...")
                for d in range(len(DAYS)):
                    for s in range(SLOTS_PER_DAY - 2):
                        if s + 2 >= SLOTS_PER_DAY or any((s + i) in LUNCH_BREAK_SLOTS.get(d, []) for i in range(3)):
                            continue  # Skip if would cross lunch break
                        
                        is_lab_block = model.NewBoolVar(f"is_lab_block_{div_name}_{d}{s}")
                        
                        for batch in div["batches"]:
                            lab_index_1 = timetable_lab[(d, s, div_name, batch)]
                            lab_index_2 = timetable_lab[(d, s+1, div_name, batch)]
                            lab_index_3 = timetable_lab[(d, s+2, div_name, batch)]
                            
                            # If it's a lab block, all three slots for the same batch must have the same subject
                            model.Add(lab_index_1 == lab_index_2).OnlyEnforceIf(is_lab_block)
                            model.Add(lab_index_2 == lab_index_3).OnlyEnforceIf(is_lab_block)
                            # The slots must contain a lab
                            model.Add(lab_index_1 != -1).OnlyEnforceIf(is_lab_block)

            # Division B & C: 2-hour practical blocks
            elif div_name in ["B", "C"]:
                print(f"Adding Div {div_name} specific constraints (2-hour labs)...")
                for d in range(len(DAYS)):
                    for s in range(SLOTS_PER_DAY - 1):
                        if s + 1 >= SLOTS_PER_DAY or any((s + i) in LUNCH_BREAK_SLOTS.get(d, []) for i in range(2)):
                            continue  # Skip if would cross lunch break
                        
                        is_lab_block = model.NewBoolVar(f"is_lab_block_{div_name}_{d}{s}")
                        
                        for batch in div["batches"]:
                            lab_index_1 = timetable_lab[(d, s, div_name, batch)]
                            lab_index_2 = timetable_lab[(d, s+1, div_name, batch)]
                            model.Add(lab_index_1 == lab_index_2).OnlyEnforceIf(is_lab_block)
                            model.Add(lab_index_1 != -1).OnlyEnforceIf(is_lab_block)

            # Division D: Mix of 2-hour and 3-hour blocks
            elif div_name == "D":
                print("Adding Div D specific constraints (mix of 2- and 3-hour labs)...")
                # 2-hour blocks
                for d in range(len(DAYS)):
                    for s in range(SLOTS_PER_DAY - 1):
                        if s + 1 >= SLOTS_PER_DAY or any((s + i) in LUNCH_BREAK_SLOTS.get(d, []) for i in range(2)):
                            continue
                        
                        is_lab_block = model.NewBoolVar(f"is_lab_block_2_{div_name}_{d}{s}")
                        
                        for batch in div["batches"]:
                            lab_index_1 = timetable_lab[(d, s, div_name, batch)]
                            lab_index_2 = timetable_lab[(d, s+1, div_name, batch)]
                            model.Add(lab_index_1 == lab_index_2).OnlyEnforceIf(is_lab_block)
                            model.Add(lab_index_1 != -1).OnlyEnforceIf(is_lab_block)

                # 3-hour blocks
                for d in range(len(DAYS)):
                    for s in range(SLOTS_PER_DAY - 2):
                        if s + 2 >= SLOTS_PER_DAY or any((s + i) in LUNCH_BREAK_SLOTS.get(d, []) for i in range(3)):
                            continue
                        
                        is_lab_block = model.NewBoolVar(f"is_lab_block_3_{div_name}_{d}{s}")
                        
                        for batch in div["batches"]:
                            lab_index_1 = timetable_lab[(d, s, div_name, batch)]
                            lab_index_2 = timetable_lab[(d, s+1, div_name, batch)]
                            lab_index_3 = timetable_lab[(d, s+2, div_name, batch)]
                            model.Add(lab_index_1 == lab_index_2).OnlyEnforceIf(is_lab_block)
                            model.Add(lab_index_2 == lab_index_3).OnlyEnforceIf(is_lab_block)
                            model.Add(lab_index_1 != -1).OnlyEnforceIf(is_lab_block)

        # 7. Apply fixed positions if provided
        if fixed_positions:
            print(f"Applying {len(fixed_positions)} fixed positions")
            for (div_name, batch_name, d, s), subj_code in fixed_positions.items():
                if subj_code in lecture_index_map:
                    model.Add(timetable_lecture[(d, s, div_name)] == lecture_index_map[subj_code])
                elif subj_code in lab_index_map and batch_name:
                    model.Add(timetable_lab[(d, s, div_name, batch_name)] == lab_index_map[subj_code])

        # Lecture frequency constraints (min/max per week)
        if lecture_subjects:
            print("Adding lecture frequency constraints...")
            for subj_index, subj in enumerate(lecture_subjects):
                min_pw = max(1, subj.get("min_per_week", 1))
                max_pw = min(subj.get("max_per_week", 7), 7)
                
                vars_for_subj = []
                for d in range(len(DAYS)):
                    for s in range(SLOTS_PER_DAY):
                        if s not in LUNCH_BREAK_SLOTS.get(d, []):
                            for div in divisions:
                                bvar = model.NewBoolVar(f"lec_subj_{subj_index}{d}{s}_{div['name']}")
                                model.Add(timetable_lecture[(d, s, div["name"])] == subj_index).OnlyEnforceIf(bvar)
                                model.Add(timetable_lecture[(d, s, div["name"])] != subj_index).OnlyEnforceIf(bvar.Not())
                                vars_for_subj.append(bvar)

                if vars_for_subj:
                    model.Add(sum(vars_for_subj) >= min_pw)
                    model.Add(sum(vars_for_subj) <= max_pw)

        # Lab frequency constraints (min/max per week)
        if lab_subjects:
            print("Adding lab frequency constraints...")
            for subj_index, subj in enumerate(lab_subjects):
                min_pw = max(1, subj.get("min_per_week", 1))
                max_pw = min(subj.get("max_per_week", 5), 5)
                
                vars_for_subj = []
                for d in range(len(DAYS)):
                    for div in divisions:
                        for batch in div["batches"]:
                            for s in range(SLOTS_PER_DAY):
                                if s not in LUNCH_BREAK_SLOTS.get(d, []):
                                    if not subj.get("batches", []) or batch in subj.get("batches", []):
                                        bvar = model.NewBoolVar(f"lab_subj_{subj_index}{d}{s}{div['name']}{batch}")
                                        model.Add(timetable_lab[(d, s, div["name"], batch)] == subj_index).OnlyEnforceIf(bvar)
                                        model.Add(timetable_lab[(d, s, div["name"], batch)] != subj_index).OnlyEnforceIf(bvar.Not())
                                        vars_for_subj.append(bvar)

                if vars_for_subj:
                    model.Add(sum(vars_for_subj) >= min_pw)
                    model.Add(sum(vars_for_subj) <= max_pw)

        # Faculty constraints (no overlap, max per day/week, respect availability)
        print("Adding faculty constraints...")
        for fac in faculty:
            max_per_day = min(fac.get("max_per_day", 5), SLOTS_PER_DAY)
            max_per_week = min(fac.get("max_per_week", 25), SLOTS_PER_DAY * 5)
            availability_days = set(fac.get("availability", range(len(DAYS))))
            
            weekly_assignments = []
            
            for d in range(len(DAYS)):
                if d not in availability_days:
                    continue
                    
                daily_assignments = []
                for s in range(SLOTS_PER_DAY):
                    if s in LUNCH_BREAK_SLOTS.get(d, []):
                        continue
                    
                    slot_assignments = []
                    
                    # Lectures taught by this faculty
                    for subj_index, subj in enumerate(lecture_subjects):
                        if fac["abbr"] in subj.get("faculty", []):
                            for div in divisions:
                                bvar = model.NewBoolVar(f"fac_{fac['abbr']}lec{d}{s}{div['name']}_{subj_index}")
                                model.Add(timetable_lecture[(d, s, div["name"])] == subj_index).OnlyEnforceIf(bvar)
                                model.Add(timetable_lecture[(d, s, div["name"])] != subj_index).OnlyEnforceIf(bvar.Not())
                                slot_assignments.append(bvar)
                    
                    # Labs taught by this faculty
                    for subj_index, subj in enumerate(lab_subjects):
                        if fac["abbr"] in subj.get("faculty", []):
                            for div in divisions:
                                for batch in div["batches"]:
                                    bvar = model.NewBoolVar(f"fac_{fac['abbr']}lab{d}{s}{div['name']}{batch}{subj_index}")
                                    model.Add(timetable_lab[(d, s, div["name"], batch)] == subj_index).OnlyEnforceIf(bvar)
                                    model.Add(timetable_lab[(d, s, div["name"], batch)] != subj_index).OnlyEnforceIf(bvar.Not())
                                    slot_assignments.append(bvar)
                    
                    # A faculty member can be assigned to at most one class at a time
                    if slot_assignments:
                        model.Add(sum(slot_assignments) <= 1)
                    
                    daily_assignments.extend(slot_assignments)
                
                # A faculty member can be assigned to at most max_per_day classes per day
                if daily_assignments:
                    model.Add(sum(daily_assignments) <= max_per_day)
                weekly_assignments.extend(daily_assignments)

            # A faculty member can be assigned to at most max_per_week classes per week
            if weekly_assignments:
                model.Add(sum(weekly_assignments) <= max_per_week)

        # Room capacity and availability constraints
        print("Adding room constraints...")
        for room in rooms:
            room_name = room["name"]
            room_type = room.get("type", "")
            
            for d in range(len(DAYS)):
                for s in range(SLOTS_PER_DAY):
                    if s in LUNCH_BREAK_SLOTS.get(d, []):
                        continue
                    room_assignments = []
                    
                    # Lectures in this room
                    for subj_index, subj in enumerate(lecture_subjects):
                        if subj.get("room_type") == room_type or subj.get("required_room") == room_name:
                            for div in divisions:
                                bvar = model.NewBoolVar(f"room_{room_name}lec{d}{s}{div['name']}_{subj_index}")
                                model.Add(timetable_lecture[(d, s, div["name"])] == subj_index).OnlyEnforceIf(bvar)
                                model.Add(timetable_lecture[(d, s, div["name"])] != subj_index).OnlyEnforceIf(bvar.Not())
                                room_assignments.append(bvar)
                    
                    # Labs in this room
                    for subj_index, subj in enumerate(lab_subjects):
                        if subj.get("room_type") == room_type or subj.get("required_room") == room_name:
                            for div in divisions:
                                for batch in div["batches"]:
                                    bvar = model.NewBoolVar(f"room_{room_name}lab{d}{s}{div['name']}{batch}{subj_index}")
                                    model.Add(timetable_lab[(d, s, div["name"], batch)] == subj_index).OnlyEnforceIf(bvar)
                                    model.Add(timetable_lab[(d, s, div["name"], batch)] != subj_index).OnlyEnforceIf(bvar.Not())
                                    room_assignments.append(bvar)
                    
                    # A room can be assigned to at most one class at a time
                    if room_assignments:
                        model.Add(sum(room_assignments) <= 1)

        print("=== SOLVER DEBUG: All constraints added, starting solve ===")

        # Solve
        solver = cp_model.CpSolver()
        solver.parameters.max_time_in_seconds = 180
        solver.parameters.log_search_progress = True
        
        status = solver.Solve(model)
        
        print(f"Solver status: {status}")
        print(f"Solver statistics: {solver.ResponseStats()}")

        if status in (cp_model.OPTIMAL, cp_model.FEASIBLE):
            print("=== SOLVER DEBUG: Solution found, building output ===")
            
            output = {}
            for div in divisions:
                div_name = div["name"]
                output[div_name] = {"batches": {}}
                
                for batch in div["batches"]:
                    batch_schedule = {}
                    
                    for d in range(len(DAY_NAMES)):
                        day_name = DAY_NAMES[d]
                        day_slots = []
                        daily_class_count = 0
                        
                        for s in range(SLOTS_PER_DAY):
                            slot_content = ""
                            if s in LUNCH_BREAK_SLOTS.get(d, []):
                                slot_content = "LUNCH BREAK"
                            else:
                                lec_index = solver.Value(timetable_lecture[(d, s, div_name)])
                                if lec_index >= 0 and lec_index < len(lecture_subjects):
                                    subj = lecture_subjects[lec_index]
                                    room_name = find_room_for_subject(subj, rooms)
                                    faculty_list = subj.get("faculty", [])
                                    faculty_str = faculty_list[0] if faculty_list else ""
                                    
                                    slot_content = f"{subj['code']}-{room_name}({faculty_str})"
                                    daily_class_count += 1
                                else:
                                    lab_index = solver.Value(timetable_lab[(d, s, div_name, batch)])
                                    if lab_index >= 0 and lab_index < len(lab_subjects):
                                        subj = lab_subjects[lab_index]
                                        if not subj.get("batches", []) or batch in subj.get("batches", []):
                                            room_name = find_room_for_subject(subj, rooms)
                                            faculty_list = subj.get("faculty", [])
                                            faculty_str = faculty_list[0] if faculty_list else ""
                                            
                                            slot_content = f"{batch}-{subj['code']}-{faculty_str}-{room_name}"
                                            daily_class_count += 1
                            
                            day_slots.append(slot_content)
                        
                        batch_schedule[day_name] = day_slots
                    
                    output[div_name]["batches"][batch] = batch_schedule
            
            print(f"=== SOLVER DEBUG: Output built for {len(output)} divisions ===")
            for div_name, div_data in output.items():
                print(f"Division {div_name}:")
                for batch_name, batch_data in div_data["batches"].items():
                    print(f"  Batch {batch_name}: {list(batch_data.keys())}")
                    for day, slots in batch_data.items():
                        class_slots = [i for i, slot in enumerate(slots) if slot not in ['', 'LUNCH BREAK']]
                        print(f"    {day}: {len(class_slots)} classes in slots {class_slots}")
            
            return output
        else:
            print(f"=== SOLVER DEBUG: No solution found, status: {status} ===")
            if status == cp_model.INFEASIBLE:
                print("Problem is INFEASIBLE - constraints are too restrictive")
                print("This might be because:")
                print("- Not enough subjects to fill 4 slots per day")
                print("- Faculty availability is too limited")
                print("- Room constraints are too restrictive")
                print("- Conflicting requirements between subjects")
            elif status == cp_model.UNKNOWN:
                print("Solver timed out or ran into issues")
            return None
            
    except Exception as e:
        print(f"=== SOLVER EXCEPTION: {str(e)} ===")
        import traceback
        print(traceback.format_exc())
        return None


# if _name_ == "_main_":
#     # Schema should be provided by user input or loaded dynamically
#     schema = {}  # Placeholder, to be replaced with user input or generate_schema.py output
#     fixed_positions = {}
#     timetable = solve_timetable(schema, fixed_positions=fixed_positions)
#     if timetable:
#         print(json.dumps(timetable, indent=2))
#     else:
#         print("Failed to generate timetable")