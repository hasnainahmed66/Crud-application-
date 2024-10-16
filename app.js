const apiURL = 'https://66f91c852a683ce97310ee2f.mockapi.io/api/v1/posts/';

// Fetch and display posts (Read operation)
function fetchPosts() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.log('Error:', error));
}
fetchPosts();

// Display posts on the page
function displayData(posts) {
    const postsParentDiv = document.getElementById('posts');
    postsParentDiv.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="Avatar">
                <div>
                    <h3>${post.name}</h3>
                    <small>${post.createdAt}</small>
                </div>
            </div>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <div class="actions">
                <button class="edit-btn" onclick="populateUpdateForm(${post.id})">Edit</button>
                <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
            </div>
        `;
        postsParentDiv.appendChild(postDiv);
    });
}

// Create a new post
document.getElementById('createPostForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.name;
    const title = document.getElementById('title').value.title;
    const avatar = document.getElementById('avatar').value.avatar;
    const body = document.getElementById('body').value.body;

    const newPost = {
        name: name,
        title: title,
        avatar: avatar,
        body: body,
        createdAt: new Date().toISOString()
    };

    fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Post Created:', data);
            fetchPosts();  // Refresh the list of posts
        })
        .catch(error => console.log('Error:', error));
});

// Delete a post (Delete operation)
function deletePost(id) {
    fetch(`${apiURL}/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(() => {
            alert(`Post with ID ${id} has been deleted.`);
            fetchPosts();  // Refresh the list of posts
        })
        .catch(error => console.log('Error:', error));
}

// Populate update form (Edit operation)
function populateUpdateForm(id) {
    fetch(`${apiURL}/${id}`)
        .then(response => response.json())
        .then(post => {
            document.getElementById('name').value = post.name;
            document.getElementById('title').value = post.title;
            document.getElementById('avatar').value = post.avatar;
            document.getElementById('body').value = post.body;

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update Post';
            updateButton.onclick = function () {
                updatePost(id);
            };
            const form = document.getElementById('createPostForm');
            form.appendChild(updateButton);
        })
        .catch(error => console.log('Error:', error));
}

// Update a post
function updatePost(id) {
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const avatar = document.getElementById('avatar').value;
    const body = document.getElementById('body').value;

    const updatedPost = {
        name: name,
        title: title,
        avatar: avatar,
        body: body,
        createdAt: new Date().toISOString()
    };

    fetch(`${apiURL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost)
    })
        .then(response => response.json())
        .then(data => {
            alert(`Post with ID ${id} has been updated.`);
            fetchPosts();  // Refresh the list of posts
        })
        .catch(error => console.log('Error:', error));
}
