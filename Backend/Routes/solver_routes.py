from flask import Blueprint, request, jsonify
from solver import solve_timetable

# Define the Blueprint
solver_bp = Blueprint('solver_bp', __name__)

@solver_bp.route('/solve', methods=['POST'])
def solve():
    try:
        data = request.get_json()
        schema = data.get('schema', {})
        fixed_positions = data.get('fixed_positions', {})

        timetable = solve_timetable(schema, fixed_positions)

        if timetable:
            return jsonify({
                'success': True,
                'timetable': timetable
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to generate timetable'
            }), 400
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500
