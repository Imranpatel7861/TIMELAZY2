from datetime import datetime
import copy

# === Validation Functions ===
def validate_faculty(faculty):
    required = ['abbr', 'name', 'max_per_day', 'max_per_week']
    for field in required:
        if field not in faculty:
            raise ValueError(f"Faculty missing field: {field}")
    if 'availability' not in faculty or not isinstance(faculty['availability'], list):
        faculty['availability'] = list(range(5))  # Monday to Friday
    return True

def validate_subject(subject):
    required = ['code', 'name', 'faculty', 'type', 'min_per_week']
    for field in required:
        if field not in subject:
            raise ValueError(f"Subject missing field: {field}")
    if subject['type'] not in ['Theory', 'Lab']:
        raise ValueError(f"Invalid subject type: {subject['type']}")
    if 'duration' not in subject:
        subject['duration'] = 50 if subject['type'] == 'Theory' else 150
    return True

def validate_room(room):
    required = ['name', 'type', 'capacity']
    for field in required:
        if field not in room:
            raise ValueError(f"Room missing field: {field}")
    if room['type'] not in ['Theory', 'Lab']:
        raise ValueError(f"Invalid room type: {room['type']}")
    return True

# === Schema Generator ===
def generate_schema(university, department, divisions, subjects, faculty, rooms,
                    mentor_batches=None, academic_year=None, term=None,
                    effective_from=None, effective_to=None):

    if not university.strip():
        raise ValueError("University name is required")
    if not department.strip():
        raise ValueError("Department name is required")

    # Validate faculty and rooms
    for f in faculty:
        validate_faculty(f)
    validated_rooms = [r for r in rooms if validate_room(r)]

    all_subjects = []
    for s in subjects:
        s = copy.deepcopy(s)
        validate_subject(s)

        # Normalize faculty to list
        if isinstance(s['faculty'], str):
            s['faculty'] = [s['faculty']]
        elif not isinstance(s['faculty'], list):
            s['faculty'] = []

        # Fill defaults
        s.setdefault('room_type', 'Theory' if s['type'] == 'Theory' else 'Lab')
        s.setdefault('max_per_week', s['min_per_week'] + 2)
        s.setdefault('is_mentor', False)
        s.setdefault('required_room', '')

        if s['type'] == 'Lab':
            for batch_obj in s.get('batches', []):
                if not isinstance(batch_obj, dict):
                    continue
                batch_name = batch_obj.get('name')
                if not batch_name:
                    continue

                batch_faculty = [batch_obj['faculty']] if batch_obj.get('faculty') else s['faculty']
                batch_room = batch_obj.get('room') or s.get('required_room')

                all_subjects.append({
                    "code": f"{s['code']}-{batch_name}",
                    "name": f"{s['name']} - {batch_name}",
                    "faculty": batch_faculty,
                    "type": "Lab",
                    "room_type": "Lab",
                    "duration": s['duration'],
                    "min_per_week": s['min_per_week'],
                    "max_per_week": s['max_per_week'],
                    "required_room": batch_room,
                    "batches": [batch_name],
                    "is_mentor": s['is_mentor']
                })
        else:  # Theory
            all_subjects.append({
                "code": s["code"].strip(),
                "name": s["name"],
                "faculty": s["faculty"],
                "type": "Theory",
                "room_type": s["room_type"],
                "duration": s["duration"],
                "min_per_week": s["min_per_week"],
                "max_per_week": s["max_per_week"],
                "required_room": s["required_room"],
                "batches": s.get("batches", []),
                "is_mentor": s["is_mentor"]
            })

    # Auto-generate mentor_batches if missing
    if not mentor_batches:
        mentor_batches = []
        if faculty:
            faculty_cycle = [f['abbr'] for f in faculty]
            i = 0
            for div in divisions:
                div_name = div['name']
                for batch in div.get('batches', []):
                    mentor_batches.append({
                        "division": div_name,
                        "batch": batch,
                        "mentor": faculty_cycle[i % len(faculty_cycle)],
                        "roll_range": [f"{batch}-01", f"{batch}-30"]
                    })
                    i += 1

    # === Validate mentor_batches against faculty ===
    faculty_abbrs = {f["abbr"] for f in faculty}
    for mb in mentor_batches:
        mentor = mb.get("mentor")
        if mentor and mentor not in faculty_abbrs:
            print(f"WARNING: Mentor {mentor} not in faculty list. Adding automatically.")
            new_fac = {
                "abbr": mentor,
                "name": mentor,
                "max_per_day": 5,
                "max_per_week": 25,
                "availability": list(range(5)),
            }
            faculty.append(new_fac)
            faculty_abbrs.add(mentor)

    # === Deduplicate faculty by abbr ===
    unique_faculty = {}
    for f in faculty:
        abbr = f["abbr"].strip()
        if not abbr:
            continue
        if abbr in unique_faculty:
            existing = unique_faculty[abbr]
            existing["max_per_day"] = min(existing["max_per_day"], f["max_per_day"])
            existing["max_per_week"] = min(existing["max_per_week"], f["max_per_week"])
            if existing["availability"] and f["availability"]:
                existing["availability"] = sorted(set(existing["availability"]) & set(f["availability"]))
            else:
                existing["availability"] = sorted(set(existing["availability"]) | set(f["availability"]))
        else:
            unique_faculty[abbr] = f
    faculty = list(unique_faculty.values())

    # === Deduplicate rooms by name ===
    unique_rooms = {}
    for r in validated_rooms:
        name = r["name"].strip()
        if not name:
            continue
        if name in unique_rooms:
            existing = unique_rooms[name]
            if existing["type"] != r["type"]:
                existing["type"] = "Theory" if "Theory" in (existing["type"], r["type"]) else "Lab"
            existing["capacity"] = max(existing["capacity"], r["capacity"])
        else:
            unique_rooms[name] = r
    validated_rooms = list(unique_rooms.values())

    # Fill academic/year defaults
    now = datetime.now()
    if not academic_year:
        academic_year = f"{now.year}-{now.year + 1}" if now.month >= 7 else f"{now.year - 1}-{now.year}"
    if not term:
        term = "1" if now.month >= 7 else "2"
    if not effective_from:
        effective_from = now.strftime("%Y-%m-%d")
    if not effective_to:
        effective_to = (
            now.replace(year=now.year + 1).strftime("%Y-%m-%d")
            if now.month >= 7 else datetime(now.year, 12, 31).strftime("%Y-%m-%d")
        )

    return {
        "university": university,
        "department": department,
        "academic_year": academic_year,
        "term": term,
        "effective_from": effective_from,
        "effective_to": effective_to,
        "divisions": divisions,
        "subjects": all_subjects,
        "faculty": faculty,
        "rooms": validated_rooms,
        "mentor_batches": mentor_batches
    }