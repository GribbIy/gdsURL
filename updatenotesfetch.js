fetch('https://gdsgames.net/API/updateslaunchernotes.json')
    .then(response => response.json())
    .then(data => {
        const versionElement = document.getElementById('version');
        versionElement.textContent = `Version ${data.version} (Released on ${data.releaseDate})`;

        const updateListElement = document.getElementById('update-list');
        data.notes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.textContent = note;
            updateListElement.appendChild(listItem);
        });

        const downloadButton = document.getElementById('download-button');
        downloadButton.href = data.downloadLink;
    })
    .catch(error => {
        console.error('Error fetching update notes:', error);
    });
