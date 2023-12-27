conn = mysql.connector.connect(
  host='127.0.0.1',
  user='root',
  password='Felix1729!2020',
  database='electoral'
)




# app.py

import mysql.connector
import json

def add_voter(voter_data):

  # Load DB settings
  with open('settings.json') as f:
    settings = json.load(f)
  
  db = settings['db']

  # Connect to MySQL
  conn = mysql.connector.connect(
    host=db['127.0.0.1'],
    user=db['root'], 
    password=db['Felix1729!2020'],
    database=db['electoral']
  )

  # Insert voter query
  query = "INSERT INTO voters (name, age, gender, address, photo) VALUES (%s, %s, %s, %s, %s)"

  # Convert voter data to tuple
  data = (
    voter_data['name'],
    voter_data['age'],
    voter_data['gender'],
    voter_data['address'],
    voter_data['photo']
  )

  # Execute insert
  cursor = conn.cursor()
  cursor.execute(query, data)

  # Commit and close connection
  conn.commit()
  conn.close()