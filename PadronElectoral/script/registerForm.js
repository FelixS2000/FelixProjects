document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(event.target);

    fetch('https://felixc2000.github.io/FelixProjects/PadronElectoral/index.html')
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const mainDoc = parser.parseFromString(html, 'text/html');
                const mainTitle = mainDoc.getElementById('mainTitle');
                const mainContent = mainDoc.getElementById('mainContent');

                // Display the title from the main index.html
                document.getElementById('mainTitle').innerHTML = mainTitle.innerHTML;

                // Display the content from the main index.html
                document.getElementById('mainContent').innerHTML = mainContent.innerHTML;
            })
            .catch(error => console.error('Error fetching main content:', error));
});
