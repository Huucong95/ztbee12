export default class Store {
    constructor(init?: Partial<Store>);
    id: string;
    name: string;
    description?: string;
}
