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

# Route to display the list of voters
@app.route('/')
def index():
    cursor.execute("SELECT * FROM voters")
    voters = cursor.fetchall()

    return render_template('index.html', voters=voters)

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
