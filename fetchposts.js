document.addEventListener("DOMContentLoaded", function() {
    fetch('API/posts.json')
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
                ${creation.video ? embedVideo(creation.video) : ""}
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
                ${post.video ? embedVideo(post.video) : ""}
            `;
            postsContainer.appendChild(postCard);
        });
    }

    function embedImages(content) {
        const imageUrlPattern = /(https?:\/\/[^\s]+(?:jpg|jpeg|png|gif))/g;
        return content.replace(imageUrlPattern, '<img src="$1" alt="Embedded Image" class="embedded-image">');
    }

    function embedVideo(videoUrl) {
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
            const youtubeId = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|shorts|watch|user|playlist)[^\/\n\s]+\/|(?:(?:watch\?v=|v\/|embed\/|v=)|v\/|shorts\/))([^?&\n\/]+))|(?:youtu\.be\/([^?&\n\/]+))/)[1];
            return `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else if (videoUrl.includes('vimeo.com')) {
            const vimeoId = videoUrl.split('/').pop();
            return `<iframe src="https://player.vimeo.com/video/${vimeoId}" width="100%" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        } else if (videoUrl.endsWith('.mp4')) {
            return `<video width="100%" controls>
                        <source src="${videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>`;
        } else {
            return `<a href="${videoUrl}" target="_blank">Watch Video</a>`;
        }
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
