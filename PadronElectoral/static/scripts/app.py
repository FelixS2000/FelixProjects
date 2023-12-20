from flask import Flask, render_template, request, redirect, url_for
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

# Close the database connection
cursor.close()
conn.close()

# Route to display the list of voters
@app.route('/')
def index():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    
    # Fetch all voters from the database
    cursor.execute("SELECT * FROM voters")
    voters = cursor.fetchall()
    
    # Close the database connection
    cursor.close()
    conn.close()
    
    return render_template('index.html', voters=voters)

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
