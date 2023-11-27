console.log('I`m finally doing it!  hh');

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

async function getPosts (): Promise<Post[]> {
    const response = await fetch(' https://jsonplaceholder.typicode.com/posts');
    if(!response.ok) {
        throw new Error("Failed to fetch");
        
    }
    const posts = await response.json() as Post[];
    return posts;
}

function renderPosts (posts: Post[]): void {
    const container = document.getElementsByClassName('posts')[0]
    posts.forEach(({title, body}) => {
        const post = document.createElement('div');

        post.innerHTML = `
            <h2>${title}</h2>
            <p>${body}</p>
        `
        container.appendChild(post);
    });
}

async function init() {
    try {
        const posts = await getPosts();
        renderPosts(posts);
    } catch (error) {
        console.error(error)
    }
}

document.addEventListener('DOMContentLoaded', init)