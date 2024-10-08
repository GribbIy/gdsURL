document.addEventListener("DOMContentLoaded", function() {
    fetch('https://gdsgames.net/API/posts.json')
        .then(response => response.json())
        .then(data => {
            renderCreations(data.creations);
            renderCommunityPosts(data.communityPosts);
        })
        .catch(error => console.error('Error fetching data:', error));
    
    function renderCreations(creations) {
        const creationsGrid = document.getElementById('creations-grid');
        creations.forEach(creation => {
            const creationCard = document.createElement('div');
            creationCard.classList.add('explore-card');
            creationCard.innerHTML = `
                <img src="${creation.image}" alt="${creation.title}">
                <h4>${creation.title}</h4>
                <p>By ${creation.author}</p>
            `;
            creationsGrid.appendChild(creationCard);
        });
    }

    function renderCommunityPosts(posts) {
        const postsContainer = document.getElementById('community-posts');
        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');
            postCard.innerHTML = `
                <h4>${post.title}</h4>
                <p>By ${post.author} - ${post.date}</p>
                <p>${post.content}</p>
            `;
            postsContainer.appendChild(postCard);
        });
    }
});
