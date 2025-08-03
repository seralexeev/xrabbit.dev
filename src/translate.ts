import z from 'zod';

const OPENAI_API_KEY = z.string().parse(process.env['OPENAI_API_KEY']);

export const translate = async (content: string) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
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
