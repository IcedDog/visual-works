import Item from "./item"

export let data: any
export let items: Item[]

export const preload = () => {
    data = p.loadJSON("oversubstitution/data.json")
    //p._incrementPreload()
    //fetch("oversubstitution/data.json")
    //    .then(response => response.json())
    //    .then(json => {
    //        data = json
    //        p._decrementPreload()
    //    })
}

export const setup = () => {
    items = data.data.map((item: any) => {
        return new Item(item.kashi, item.kana, item.index, item.length, item.x, item.y, item.time)
    })
}