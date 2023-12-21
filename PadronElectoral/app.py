from flask import Flask, jsonify, render_template, request
from flask_cors import CORS  # Only needed if your frontend is served from a different origin

app = Flask(__name__)
CORS(app)  # Only needed if your frontend is served from a different origin

# Mock data for testing
voters_data = [
    {"id": 1, "cedula": "123456789", "habilitado": True, "nombre": "John Doe", "pasaporte": "ABC123"},
    {"id": 2, "cedula": "987654321", "habilitado": True, "nombre": "Jane Doe", "pasaporte": "XYZ789"}
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/getVoters')
def get_voters():
    return jsonify(voters_data)

@app.route('/api/addVoter', methods=['POST'])
def add_voter():
    new_voter = {
        "id": len(voters_data) + 1,
        "cedula": request.form.get('cedula'),
        "habilitado": request.form.get('habilitado') == 'on',
        "nombre": request.form.get('nombre'),
        "pasaporte": request.form.get('pasaporte')
    }

    voters_data.append(new_voter)
    return jsonify(voters_data)

if __name__ == '__main__':
    app.run(debug=True)
