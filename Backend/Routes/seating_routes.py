from flask import Blueprint, jsonify, current_app

seating_bp = Blueprint('seating_bp', __name__)

# Fetch classrooms
@seating_bp.route('/classrooms', methods=['GET'])
def get_classrooms():
    try:
        mysql = current_app.mysql
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT id, classroom_number FROM classrooms")
        classrooms = cursor.fetchall()
        cursor.close()
        return jsonify([
            {"id": c[0], "name": c[1]} for c in classrooms
        ])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Fetch teachers/faculty
@seating_bp.route('/teachers', methods=['GET'])
def get_teachers():
    try:
        mysql = current_app.mysql
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT id, name FROM teachers")
        teachers = cursor.fetchall()
        cursor.close()
        return jsonify([
            {"id": t[0], "name": t[1]} for t in teachers
        ])
    except Exception as e:
        return jsonify({"error": str(e)}), 500
