document.addEventListener('DOMContentLoaded', function () {
    const voterList = document.getElementById('voter-list');

    // Fetch voters from the API
    fetch('/api/voters')
        .then(response => response.json())
        .then(data => {
            // Render voter list
            data.forEach(voter => {
                const voterCard = document.createElement('div');
                voterCard.className = 'voter-card';
                voterCard.innerHTML = `
                    <h3>${voter.fname}</h3>
                    <p>Gender: ${voter.gender}</p>
                    <p>Age: ${voter.age}</p>
                    <p>Location: ${voter.location}</p>
                `;
                voterList.appendChild(voterCard);
            });
        })
        .catch(error => console.error('Error fetching voters:', error));
});
