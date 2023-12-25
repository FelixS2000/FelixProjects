// Connect to MySQL database
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Felix1729!2020',
  database: 'padronelectoral'
});

// Submit form
const form = document.getElementById('voter-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form data
  const fullName = form.elements['full-name'].value;
  const gender = form.elements['gender'].value;
  const birthdate = form.elements['birthdate'].value;
  const cedula = form.elements['cedula'].value;
  const image = form.elements['image'].files[0];

  // Insert voter into database
  connection.query('INSERT INTO voters SET ?', {
    cedula,
    habilitado: true,
    nombre: fullName,
    fecha_nacimiento: birthdate,
    genero: gender,
    foto: image
  }, (error, results) => {
    if (error) throw error;

    // Display confirmation
    document.getElementById('voter-info').innerHTML = `
      <p>Voter ${fullName} added successfully with cédula ${cedula}.</p>
    `;

    // Clear form
    form.reset();
  });

});

// Display voters
connection.query('SELECT * FROM voters', (error, results) => {
  if (error) throw error;

  let voterInfo = '<h2>Voters</h2>';
  results.forEach(voter => {
    voterInfo += `
      <div>
        <p>Name: ${voter.nombre}</p>
        <p>Cédula: ${voter.cedula}</p>
        <img src="/uploads/${voter.foto}" alt="Voter photo">
      </div>
    `;
  });

  document.getElementById('voter-info').innerHTML = voterInfo;
});