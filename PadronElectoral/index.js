const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
 if (req.method === 'GET') {
    fs.readFile('./template/index.html', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end(`Server Error: ${err}`);
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
 } else {
    res.statusCode = 405;
    res.end('Method Not Allowed');
 }
}).listen(3000, () => {
 console.log('Server running at http://localhost:3000/');
});