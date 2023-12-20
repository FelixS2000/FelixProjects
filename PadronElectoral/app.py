from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/padronElectoral'
db = SQLAlchemy(app)

class Voter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(255))
    gender = db.Column(db.Enum('m', 'f'))
    age = db.Column(db.Integer)
    location = db.Column(db.String(255))
    image = db.Column(db.LargeBinary)

# Replace 'username' and 'password' with your MySQL username and password

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/voters')
def get_voters():
    voters = Voter.query.all()
    return jsonify([{'id': voter.id, 'fname': voter.fname, 'gender': voter.gender, 'age': voter.age, 'location': voter.location} for voter in voters])

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
