# app.py

from flask import Flask, render_template, request, redirect, url_for
import mysql.connector
import os

app = Flask(__name__)

# Configure db connection
db = mysql.connector.connect(
  host="localhost",
  user="root",
  password="password",
  database="electoral"
)

cursor = db.cursor()

@app.route('/')
def index():
  cursor.execute("SELECT * FROM voters")
  voters = cursor.fetchall()  
  return render_template('index.html', voters=voters)

@app.route('/register', methods=['GET', 'POST'])
def register():
  if request.method == 'POST':
    name = request.form['name']
    age = request.form['age']
    address = request.form['address']
    photo = request.files['photo']
    
    # Save photo
    photo.save(os.path.join('static', photo.filename))
    
    # Insert into db
    sql = "INSERT INTO voters (name, age, address, photo) VALUES (%s, %s, %s, %s)"
    cursor.execute(sql, (name, age, address, photo.filename))
    db.commit()
    
    return redirect(url_for('index'))

  return render_template('register.html')

if __name__ == '__main__':
  app.run(debug=True)