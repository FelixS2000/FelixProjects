# app.py

import sqlite3
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/register', methods=['POST'])
def register_voter():
  connection = sqlite3.connect('database.db')
  cursor = connection.cursor()

  name = request.json['name']
  age = request.json['age']
  address = request.json['address']
  photo = request.json['photo']

  cursor.execute('INSERT INTO voters (name, age, address, photo) VALUES (?, ?, ?, ?)', (name, age, address, photo))

  voter_id = cursor.lastrowid
  voter = cursor.execute('SELECT * FROM voters WHERE id = ?', (voter_id,)).fetchone()

  connection.commit()
  connection.close()

  return jsonify(voter)

if __name__ == '__main__':
  app.run()