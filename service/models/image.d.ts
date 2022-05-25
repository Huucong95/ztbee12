export default class Image {
    constructor(init?: Partial<Image>);
    alt: string;
    aspect_ratio: number;
    attached_to_variant?: boolean;
    height: number;
    id: string;
    media_type: string;
    position: number;
    preview_image: string;
    product_id: string;
    src: string;
    variants: any;
    width: number;
}
