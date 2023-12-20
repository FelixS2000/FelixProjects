from flask import Flask, render_template, request, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# MySQL Connection Configuration
db_config = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': 'Felix1729!2020',
    'database': 'padronelectoral',
    'port': 3306,
    'raise_on_warnings': True
}

def execute_query(query, params=None):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        connection.commit()
        return cursor.fetchall()
    except Error as e:
        print(e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/voters', methods=['GET'])
def get_voters():
    query = "SELECT * FROM voters"
    result = execute_query(query)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
