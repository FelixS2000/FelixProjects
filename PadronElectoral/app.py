from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

db = mysql.connector.connect(
  host="127.0.0.1",
  user="root",
  password="Felix1729!2020",
  database="padronelectoral"
)
cursor = db.cursor()

@app.route('/voters', methods=['GET'])
def get_voters():
  cursor.execute("SELECT * FROM voters")
  rows = cursor.fetchall()
  return jsonify(rows)

@app.route('/voters', methods=['POST'])  
def add_voter():
  data = request.get_json()
  sql = "INSERT INTO voters (cedula, nombre, fecha_nacimiento, genero, foto) VALUES (%s, %s, %s, %s, %s)"
  values = (data['cedula'], data['nombre'], data['fecha_nacimiento'], data['genero'], data['foto'])
  cursor.execute(sql, values)
  db.commit()  
  return jsonify({'message': 'Voter added successfully'})

if __name__ == '__main__':
  app.run(debug=True)