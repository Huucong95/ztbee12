import Article from './article';
export default class Blog {
    constructor(init?: Partial<Blog>);
    id: string;
    handle: string;
    title: string;
    url: string;
    articles: Article[];
    articles_count: number;
    comments_enabled?: any;
    comment_post_url: any[];
    comments_count: number;
    moderated?: any;
}
