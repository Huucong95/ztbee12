export default class Article {
    constructor(init?: Partial<Article>);
    id: string;
    title: string;
    author: string;
    content: string;
    created_at: string;
    comments: {
        id: number;
        author: string;
        email: string;
        content: string;
        status: string;
        created_at: any;
        updated_at: string;
        url: string;
    };
}
