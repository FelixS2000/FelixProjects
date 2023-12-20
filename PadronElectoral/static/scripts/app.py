from flask import Flask, render_template, g
import mysql.connector
import os

app = Flask(__name__)

# Database configuration
db_config = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': 'Felix1729!2020',
    'database': 'padronElectoral',
}

# Function to get the database connection
def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(**db_config)
    return g.db

# Function to close the database connection
def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

# Register the functions with the application
app.teardown_appcontext(close_db)

# Create the voters table if not exists
with app.app_context():
    cursor = get_db().cursor()
    create_table_query = """
    CREATE TABLE IF NOT EXISTS voters (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fname VARCHAR(255),
      gender ENUM('m', 'f'),
      age INT,
      location VARCHAR(255),
      image BLOB
    )
    """
    cursor.execute(create_table_query)
    get_db().commit()

    # Read and execute the padronelectoral.sql file
    try:
        script_path = os.path.join(os.path.dirname(__file__), 'padronelectoral.sql')
        with open(script_path, 'r') as sql_file:
            sql_script = sql_file.read()
            cursor.execute(sql_script)
        get_db().commit()
    except Exception as e:
        print(f"Error executing SQL script: {e}")

# Route to display the list of voters
@app.route('/')
def index():
    cursor = get_db().cursor(dictionary=True)
    cursor.execute("SELECT * FROM voters")
    voters = cursor.fetchall()
    return render_template('index.html', voters=voters)

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
