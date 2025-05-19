document.addEventListener("DOMContentLoaded", () => {
    const postForm = document.querySelector("form");
    const postsContainer = document.createElement("div");
    postsContainer.id = "posts-container";
    document.body.appendChild(postsContainer);

    // Fetch posts from backend
    async function fetchPosts() {
        try {
            const response = await fetch("/posts");
            const posts = await response.json();
            renderPosts(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    // Render posts on the page
    function renderPosts(posts) {
        postsContainer.innerHTML = "";
        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.className = "post";
            postElement.innerHTML = `
                <p>${post.content}</p>
                ${post.media ? `<img src="${post.media}" alt="Post media">` : ""}
                <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Handle form submission
    postForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(postForm);
        const postData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                fetchPosts(); // Refresh posts
            }
        } catch (error) {
            console.error("Error posting data:", error);
        }
    });

    // Initial fetch
    fetchPosts();
});