from flask import Blueprint, jsonify, request, current_app
from flask_mysqldb import MySQL

seating_bp = Blueprint('seating_bp', __name__)

@seating_bp.route('/classrooms', methods=['GET'])
def get_classrooms():
    try:
        mysql = current_app.mysql
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT id, classroom_number FROM classrooms")
        classrooms = cursor.fetchall()

        classrooms_data = [
            {
                "id": classroom[0],
                "name": classroom[1]
            }
            for classroom in classrooms
        ]
        cursor.close()
        return jsonify(classrooms_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@seating_bp.route('/teachers', methods=['GET'])
def get_teachers():
    try:
        mysql = current_app.mysql
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT id, name FROM teachers")
        teachers = cursor.fetchall()

        teachers_data = [
            {
                "id": teacher[0],
                "name": teacher[1]
            }
            for teacher in teachers
        ]
        cursor.close()
        return jsonify(teachers_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@seating_bp.route('/classroom-teacher', methods=['GET'])
def get_classroom_teacher():
    classroom_id = request.args.get('classroom_id')
    if not classroom_id:
        return jsonify({"error": "classroom_id is required"}), 400

    try:
        mysql = current_app.mysql
        cursor = mysql.connection.cursor()

        # Get the admin_id for the classroom
        cursor.execute("SELECT admin_id FROM classrooms WHERE id = %s", (classroom_id,))
        classroom = cursor.fetchone()

        if not classroom:
            return jsonify({"error": "Classroom not found"}), 404

        admin_id = classroom[0]

        # Get the teacher name for the admin_id
        cursor.execute("SELECT name FROM teachers WHERE admin_id = %s", (admin_id,))
        teacher = cursor.fetchone()

        cursor.close()

        if not teacher:
            return jsonify({"error": "Teacher not found for this classroom"}), 404

        return jsonify({"teacher_name": teacher[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
