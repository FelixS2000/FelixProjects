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

# Create a MySQL connection
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

# Create the voters table if not exists
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
conn.commit()

# Read and execute the padronelectoral.sql file
with open('padronelectoral.sql', 'r') as sql_file:
    sql_script = sql_file.read()
    cursor.execute(sql_script)
    conn.commit()

# Route to display the list of voters
@app.route('/')
def index():
    cursor.execute("SELECT * FROM voters")
    voters = cursor.fetchall()
    
    return render_template('index.html', voters=voters)

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
