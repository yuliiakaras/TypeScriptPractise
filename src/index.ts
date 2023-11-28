import { updateObjectInArray } from "./updateObjectInArray.js";

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

async function getPosts (): Promise<Post[]> {
    const response: Response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if(!response.ok) {
        throw new Error("Failed to fetch");
    }
    const posts: Post[] = await response.json();
    return posts;
}

function renderPosts (posts: Post[]): void {
    const container: HTMLElement | null = document.getElementById('posts');
    posts.forEach(({title, body}: Post) => {
        const post: HTMLDivElement = document.createElement('div');

        post.innerHTML = `
            <h2 class='posts__header'>${title}</h2>
            <p class='posts__body'>${body}</p>
        `
        post.classList.add('posts__item')
        if(container) {
            container.appendChild(post);
        }
    });
}

async function init(): Promise<void> {
    try {
        let posts: Post[] = await getPosts();

        posts = updateObjectInArray(posts, 'id', 1, { title: "Changed Title!", body: "Changed text!" });
        posts = updateObjectInArray(posts, 'id', 2, { title: "Changed Title!" });

        renderPosts(posts);
    } catch (error) {
        console.error(error)
    }
}

document.addEventListener('DOMContentLoaded', init)

