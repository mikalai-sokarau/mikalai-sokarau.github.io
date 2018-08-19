'use strict';

export default class Resources {
    constructor() {
        this.resourceCache = {};
        this.loading = [];
        this.readyCallbacks = [];
    }

    load(...args) {
        args.forEach(url => {
            let cache = this.resourceCache[url];

            if (cache) {
                return cache;
            } else {
                const img = document.createElement('img');

                img.addEventListener('load', () => {
                    this.resourceCache[url] = img;

                    if (this.isReady()) {
                        this.readyCallbacks.forEach(func => func());
                    }
                });
                this.resourceCache[url] = false;
                img.src = url;
            }
        })
    }

    get(url) {
        return this.resourceCache[url];
    }

    isReady() {
        let ready = true;

        for (let k in this.resourceCache) {
            if (this.resourceCache.hasOwnProperty(k) &&
                !this.resourceCache[k]) {
                ready = false;
            }
        }

        return ready;
    }

    onReady(func) {
        this.readyCallbacks.push(func);
    }
}
