class Queue {
    constructor() {
        this._data = null;
    }
    add(buffer) {
        if (this._data == null) {
            this._data = buffer;
        } else {
            this._data = Buffer.concat([this._data, buffer]);
        }
    }
    get() {
        return this._data;
    }
    size() {
        return this._data.length;
    }
    release(size) {
        this._data = this._data.slice(size);
    }
    reset() {
        this._data = null;
    }
}

module.exports = Queue