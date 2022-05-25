export default class Search {
    constructor(init?: Partial<Search>);
    type: string;
    terms: string;
    performed: boolean;
    results_count: number;
    results: any[];
}
