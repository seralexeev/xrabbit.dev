import * as yaml from 'js-yaml';
import { marked } from 'marked';
import * as fs from 'node:fs/promises';
import * as path from 'path';
import { z } from 'zod';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

type PostMeta = z.infer<typeof PostMeta>;
const PostMeta = z.object({
    id: z.number(),
    date: z.string(),
    media: z.array(z.string()).optional(),
});

const Image = ({ src }: { src: string }) => {
    return html`
        <a class="media-item" href="${src}" target="_blank" rel="noopener noreferrer">
            <img src="${src}" />
        </a>
    `;
};

const Video = ({ src }: { src: string }) => {
    return html`
        <a class="media-item" href="${src}" target="_blank" rel="noopener noreferrer">
            <div>Click to Play</div>
            <video src="${src}" preload="none"></video>
        </a>
    `;
};

const Post = ({ meta, content }: { meta: PostMeta; content: string }) => {
    const media = () => {
        if (meta.media == null || meta.media.length === 0) {
            return null;
        }

        return html`
            <div class="post-media">
                ${meta.media.map((x) => (x.endsWith('.mp4') ? Video({ src: x }) : Image({ src: x })))}
            </div>
        `;
    };

    return html`
        <div class="post" id="${meta.id}">
            <div class="post-header">
                <a href="#${meta.id}">#${meta.id}</a>
                <div class="post-meta">${meta.date}</div>
            </div>
            <div class="post-body">${content}</div>
            ${media()}
        </div>
    `;
};

const html = (strings: TemplateStringsArray, ...values: Array<string | null | number | string[]>) => {
    return String.raw(strings, ...values.map((x) => (Array.isArray(x) ? x.join('') : x ?? '')));
};

const translate = async (content: string) => {
    const api_key = z.string().parse(process.env['OPENAI_API_KEY']);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${api_key}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-4.1',
            messages: [
                {
                    role: 'user',
                    content: `
                        - You are a professional translator specialized in translating technical blog posts.
                        - Translate the following text from Russian to English, preserving the original formatting and code blocks. Do not translate any code or URLs. The text is a blog post about a robot rabbit project.
                        - Keep the original structure, including headings, paragraphs, and code blocks.
                        - Keep the original style and tone of the text.
                        - Do not add any additional explanations or comments. Just provide the translated text.
                        - The text is in Markdown format, so preserve the Markdown syntax.
                        - Do not use rare or complex words, the author is not a native English speaker unless it's a technical term.
                        - Do not use oxford commas and do not use commas before "and", "or", "but", etc. 

                        Translate the following text:

                        ${content}
                    `,
                },
            ],
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch translation: ${response.status} ${response.statusText}`);
    }

    const Reply = z.object({
        choices: z.array(
            z.object({
                message: z.object({
                    content: z.string(),
                }),
            }),
        ),
    });

    const data = await response.json();
    const llm_response = Reply.parse(data).choices[0]?.message.content;
    if (llm_response == null) {
        throw new Error('Translation content is null');
    }

    return llm_response;
};

const read_markdown_file = async (file_path: string) => {
    const file_content = await fs.readFile(file_path, 'utf-8');
    const sections = file_content
        .split('---')
        .map((x) => x.trim() || null)
        .filter((x) => x != null);

    const items: Array<{
        meta: PostMeta;
        content: string;
    }> = [];

    for (const section of sections) {
        const yaml_match = section.match(/^```yaml\n([\s\S]*?)\n```/);
        if (!yaml_match) {
            throw new Error('YAML meta not found');
        }

        const yaml_content = yaml_match[1];
        if (yaml_content == null) {
            throw new Error('YAML content not found');
        }

        const content = section.slice(yaml_match[0].length).trim();
        const raw_meta = yaml.load(yaml_content);
        const meta = PostMeta.parse(raw_meta);

        items.push({ meta, content });
    }

    return new Map(items.map((item) => [item.meta.id, item]));
};

const dump_posts = async (file_path: string, posts: { meta: PostMeta; content: string }[]) => {
    const content = posts
        .map((post) => '```yaml\n' + yaml.dump(post.meta) + '```\n\n' + post.content)
        .join('\n\n---\n\n');

    await fs.writeFile(file_path, content + '\n', 'utf-8');
};

const render_html = async (posts: Array<{ meta: PostMeta; content: string }>) => {
    const rendered_posts: string[] = [];
    for (const post of posts) {
        const content = await marked.parse(post.content);
        rendered_posts.push(
            Post({
                meta: post.meta,
                content,
            }),
        );
    }

    const result = html`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>🐰 Robot Rabbit</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap"
                    rel="stylesheet"
                />

                <style>
                    :root {
                        --color-black: #000;
                        --color-white: #fff;
                        --color-gray: #aaa;
                        --color-blue: #007aff;
                        --color-green: #41ff00;
                    }

                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    html,
                    body,
                    div,
                    span,
                    h1,
                    h2,
                    h3,
                    h4,
                    h5,
                    h6,
                    p,
                    pre,
                    code {
                        margin: 0;
                        padding: 0;
                        border: 0;
                        font-size: 100%;
                        font: inherit;
                        vertical-align: baseline;
                    }

                    body {
                        font-family: 'Fira Code', monospace;
                        font-size: 16px;
                        line-height: 1.4;
                        color: var(--color-black);
                        background: var(--color-white);
                        padding: 20px;
                    }

                    .container {
                        max-width: 720px;
                        margin: 0 auto;
                    }

                    header {
                        margin-bottom: 20px;
                    }

                    h1 {
                        font-size: 24px;
                        font-weight: normal;
                    }

                    header img {
                        height: 36px;
                        vertical-align: middle;
                    }

                    .post-list {
                        display: flex;
                        flex-direction: column;
                        gap: 20px;
                    }

                    .post {
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                    }

                    .post-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 8px;
                    }

                    .post-meta {
                        color: var(--color-gray);
                    }

                    .post-media {
                        display: flex;
                        gap: 8px;
                    }

                    .media-item {
                        text-decoration: none;
                        border: none;
                        background: var(--color-black);
                        width: 100%;
                        height: 256px;
                        overflow: hidden;
                    }

                    .media-item img,
                    .media-item video {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        cursor: pointer;
                    }

                    a {
                        color: var(--color-blue);
                        text-decoration: underline;
                        text-underline-offset: 0.2rem;
                    }

                    u {
                        text-decoration: none;
                        border-bottom: 1px solid var(--color-black);
                    }

                    p {
                        margin-bottom: 16px;
                    }

                    code {
                        background: var(--color-black);
                        color: var(--color-green);
                        padding: 0 2px;
                        font-family: inherit;
                    }

                    pre {
                        background: var(--color-black);
                        color: var(--color-green);
                        padding: 8px;
                        margin: 8px 0;
                        overflow-x: auto;
                    }

                    .divider {
                        text-align: center;
                        color: var(--color-gray);
                        font-size: 14px;
                    }

                    .translated {
                        color: var(--color-gray);
                        font-style: italic;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <img src="./media/logo.gif" />
                        <h1>Robot Rabbit</h1>
                        <span class="translated">(translated from Russian via ChatGPT)</span>
                    </header>

                    <div class="post-list">${rendered_posts.join(html`<div class="divider">---</div>`)}</div>
                </div>
            </body>
        </html>
    `;

    const output_path = path.join(__dirname, 'static/index.html');
    await fs.writeFile(output_path, result, 'utf-8');
};

(async () => {
    const ru_posts = await read_markdown_file(path.join(__dirname, 'README.ru.md'));
    const en_posts = await read_markdown_file(path.join(__dirname, 'README.md'));

    for (const [id, post] of ru_posts) {
        if (en_posts.has(id)) {
            console.log(`⚪ ${id} - already exists in English`);
            continue;
        }

        console.log(`🟢 ${id} - translating to English`);
        en_posts.set(id, {
            meta: post.meta,
            content: await translate(post.content),
        });
    }

    const items = Array.from(en_posts.values());

    await dump_posts(
        path.join(__dirname, 'README.md'),
        items.sort((a, b) => a.meta.id - b.meta.id),
    );
    await render_html(items.sort((a, b) => b.meta.id - a.meta.id));
})();
