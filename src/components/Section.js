export default class Section{
    constructor({ renderer }, containerSelector){
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    render(items) {
        items.forEach(
            this._renderer
        );
    }

    addItem (element) {
        this._container.prepend(element)
    }

    addItemAppend (element) {
        this._container.append(element)
    }

}


