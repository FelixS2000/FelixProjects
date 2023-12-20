# app.py
from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)

# Database configuration
db_config = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': 'Felix1729!2020',
    'database': 'padronElectoral',
}

# ... (rest of your Flask application code)

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
