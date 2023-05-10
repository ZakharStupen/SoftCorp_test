const fs = require('fs')
const glob = require("glob");

module.exports = class Mock {
    constructor() {
        this.dotNotation = {};
        this.data = {};
    }

    getFiles(path) {
        return glob.sync(`${path}/**/*.json`);
    }

    getData(path) {
        let files = this.getFiles(path);
        let data = {};

        if (files.length > 0) {
            files.forEach(file => {
                let relativePath = '_' + file.replace(path + '/', '').slice(0, -5);
                let contents = JSON.parse(fs.readFileSync(file, 'utf8'));
                let keys = relativePath.split('/');
                this.dotNotation[keys.join('.')] = contents;
                keys.forEach(item => {
                    if (keys.length === 1 && item === '_global') {
                        data = {...contents, ...data}
                    } else {
                        data = this.addNestedProperty(data, relativePath.split('/'), contents)
                    }
                })
            });
        }
        this.data = data;
        data = this.processData(data);
        return data;
    }

    processData(data) {
        if (this.isObject(data)) {
            return this.walk(data);
        }

        return data;
    }

    addNestedProperty(object, keys, value) {
        let tmp = object;

        keys.forEach((key, index, array) => {
            tmp[key] = tmp[key] || {};

            if (index === (array.length - 1)) {
                tmp = tmp[key] = value;
            } else {
                tmp = tmp[key];
            }
        });

        return object;
    }

    walk(data) {
        for (let key in data) {
            if (!data.hasOwnProperty(key)) {
                return data;
            }

            if (this.isObject(data[key])) {
                data[key] = this.walk(data[key]);
            } else {
                if (this.isLinkedMock(data[key])) {
                    data[key] = this.getLinkedMock(data[key]);
                }
            }
        }

        return data;
    }

    isObject(data) {
        return typeof data === 'object' && data !== null;
    }

    isLinkedMock(value) {
        return this.dotNotation.hasOwnProperty(value);
    }

    getLinkedMock(key) {
        return this.dotNotation[key];
    }
}
