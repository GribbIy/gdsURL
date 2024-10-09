document.addEventListener("DOMContentLoaded", function() {
    fetch('posts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            renderCreations(data.creations);
            renderCommunityPosts(data.communityPosts);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            showErrorCard();
        });

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
                <p>${embedImages(post.content)}</p>
            `;
            postsContainer.appendChild(postCard);
        });
    }

    function embedImages(content) {
        const imageUrlPattern = /(https?:\/\/[^\s]+(?:jpg|jpeg|png|gif))/g;
        return content.replace(imageUrlPattern, '<img src="$1" alt="Embedded Image" class="embedded-image">');
    }

    function showErrorCard() {
        const postsContainer = document.getElementById('community-posts');
        const errorCard = document.createElement('div');
        errorCard.classList.add('error-card');
        errorCard.innerHTML = `
            <h4>Oops! Something went wrong.</h4>
            <p>We couldn't load the content. Please try again later.</p>
        `;
        postsContainer.appendChild(errorCard);
    }
});
