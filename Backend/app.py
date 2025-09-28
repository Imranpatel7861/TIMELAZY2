from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_jwt_extended import JWTManager
import os
import traceback

import config
from generate_schema import generate_schema
from solver import solve_timetable

# Create the Flask app instance
app = Flask(__name__)
app.config.from_object(config.Config)

# JWT configuration
app.config["JWT_SECRET_KEY"] = "your-secret-key"  # change to something secure
jwt = JWTManager(app)

# CORS configuration
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": config.Config.CORS_ORIGINS}})

# Upload folder configuration
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# ✅ Route to serve uploaded files
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Initialize MySQL
mysql = MySQL(app)
app.mysql = mysql

# Global state
LAST_TIMETABLE = None
LAST_SCHEMA = None
USER_CONFIG = {}


@app.route('/api/generate', methods=['POST'])
def generate_timetable():
    global LAST_TIMETABLE, LAST_SCHEMA, USER_CONFIG
    try:
        input_data = request.json
        required_fields = ['university', 'department', 'subjects', 'faculty', 'rooms', 'divisions']
        for field in required_fields:
            if field not in input_data or not input_data[field]:
                return jsonify({"status": "error", "message": f"Missing required field: {field}"}), 400

        # Extract user input
        university = input_data['university'].strip()
        department = input_data['department'].strip()
        subjects = input_data['subjects']
        faculty = input_data['faculty']
        rooms = input_data['rooms']
        divisions = input_data['divisions']
        mentor_batches = input_data.get('mentor_batches', [])

        # Optional user config
        USER_CONFIG = {
            "weekdays": input_data.get("weekdays", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),
            "time_slots": input_data.get("time_slots", [
                "08:50 TO 09:40", "09:40 TO 10:30", "10:30 TO 11:20",
                "11:20 TO 12:10", "12:10 TO 01:00", "01:00 TO 01:40",
                "01:40 TO 02:30", "02:30 TO 03:20", "03:20 TO 04:10"
            ]),
            "lunch_slot_index": input_data.get("lunch_slot_index", 4),
            "academic_year": input_data.get("academic_year", "2025-26"),
            "term": input_data.get("term", "Odd"),
            "institute": input_data.get("institute", "Your Institute Name"),
            "location": input_data.get("location", "Your City, State")
        }

        # Generate schema
        schema = generate_schema(university, department, divisions, subjects, faculty, rooms, mentor_batches)
        LAST_SCHEMA = schema

        # Solve timetable
        fixed_positions = {}
        timetable_grids = solve_timetable(schema, fixed_positions=fixed_positions)

        if not timetable_grids:
            return jsonify({
                "status": "error",
                "message": "No valid timetable found. Check constraints, faculty load, or room availability."
            }), 500

        # Process solver output
        divisions_data = {}
        for div_name, div_data in timetable_grids.items():
            divisions_data[div_name] = {"batches": {}}
            if "batches" not in div_data:
                continue
            for batch_name, batch_schedule in div_data["batches"].items():
                divisions_data[div_name]["batches"][batch_name] = batch_schedule

        result = {
            "metadata": {
                "academic_year": USER_CONFIG["academic_year"],
                "term": USER_CONFIG["term"],
                "department": department,
                "institute": USER_CONFIG["institute"],
                "location": USER_CONFIG["location"]
            },
            "timetable": {"divisions": divisions_data}
        }

        LAST_TIMETABLE = result
        return jsonify({
            "status": "success",
            "metadata": result["metadata"],
            "timetable": result["timetable"]
        })

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"status": "error", "message": f"Server error: {str(e)}"}), 500


@app.route('/api/download/json', methods=['GET'])
def download_json():
    if not LAST_TIMETABLE:
        return jsonify({"status": "error", "message": "No timetable generated yet."}), 400
    return jsonify(LAST_TIMETABLE)


@app.route('/api/schema', methods=['POST'])
def preview_schema():
    try:
        input_data = request.json
        required_fields = ['university', 'department', 'subjects', 'faculty', 'rooms', 'divisions']
        for field in required_fields:
            if field not in input_data:
                return jsonify({"status": "error", "message": f"Missing {field}"}), 400

        schema = generate_schema(
            university=input_data['university'],
            department=input_data['department'],
            divisions=input_data['divisions'],
            subjects=input_data['subjects'],
            faculty=input_data['faculty'],
            rooms=input_data['rooms'],
            mentor_batches=input_data.get('mentor_batches', [])
        )
        return jsonify(schema)
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"status": "error", "message": str(e)}), 500


# ===========================
# Register Blueprints
# ===========================
from Routes.auth_routes import auth_bp
from Routes.personal_routes import personal_bp
from Routes.lab_routes import lab_bp
from Routes.classroom_routes import classroom_bp
from Routes.teacher_routes import teacher_bp
from Routes.profile_routes import profile_bp
from Routes.setting_routes import setting_bp
from Routes.password_routes import password_bp
from Routes.student_routes import student_bp
from Routes.contact_routes import contact_bp
from Routes.solver_routes import solver_bp
from Routes.seating_routes import seating_bp

app.register_blueprint(auth_bp)
app.register_blueprint(personal_bp)
app.register_blueprint(lab_bp)
app.register_blueprint(classroom_bp)
app.register_blueprint(teacher_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(setting_bp)
app.register_blueprint(password_bp)
app.register_blueprint(student_bp)
app.register_blueprint(contact_bp)
app.register_blueprint(solver_bp)
app.register_blueprint(seating_bp)

# Health check
@app.route('/')
def home():
    return 'Flask Modular Backend Running!'

# Run server
if __name__ == '__main__':
    app.run(debug=True)
