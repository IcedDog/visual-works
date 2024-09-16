import Item from "./item";

export let data: any;
export let image: any;
export let imageSelected: any;
export let items: Item[];

export const preload = () => {
    data = p.loadJSON("not-oversubstitution/item.json");
    image = p.loadJSON("not-oversubstitution/images.json");
    imageSelected = p.loadJSON("not-oversubstitution/selectedImages.json");
}

export const setup = () => {
    if (!data.data.length || !image.images.length) { throw new Error("Data not preloaded"); }
    items = [];

    data.data.forEach((e: any) => {
        items.push(new Item(e.kanji, e.name, e.components, e.x, e.y, e.time, e.selectBox));
    });

    image.images.forEach((str: string, idx: number) => {
        items[idx].loadImage(str);
        items[idx].loadSelectedImage(imageSelected.selectedImages[idx]);
    });
}