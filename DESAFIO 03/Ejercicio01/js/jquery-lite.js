(function(window, document) {
    if (window.jQuery && window.$) {
        return;
    }

    function LiteQuery(selector) {
        if (typeof selector === 'function') {
            ready(selector);
            this.elements = [];
            return;
        }

        if (selector === document) {
            this.elements = [document];
            return;
        }

        if (selector instanceof Element || selector === window) {
            this.elements = [selector];
            return;
        }

        this.elements = Array.prototype.slice.call(document.querySelectorAll(selector));
    }

    LiteQuery.prototype.ready = function(callback) {
        ready(callback);
        return this;
    };

    LiteQuery.prototype.html = function(value) {
        if (value === undefined) {
            return this.elements[0] ? this.elements[0].innerHTML : '';
        }
        this.elements.forEach(function(element) {
            element.innerHTML = value;
        });
        return this;
    };

    LiteQuery.prototype.text = function(value) {
        if (value === undefined) {
            return this.elements[0] ? this.elements[0].textContent : '';
        }
        this.elements.forEach(function(element) {
            element.textContent = value;
        });
        return this;
    };

    LiteQuery.prototype.val = function(value) {
        if (value === undefined) {
            return this.elements[0] ? this.elements[0].value : '';
        }
        this.elements.forEach(function(element) {
            element.value = value;
        });
        return this;
    };

    LiteQuery.prototype.attr = function(name, value) {
        if (value === undefined) {
            return this.elements[0] ? this.elements[0].getAttribute(name) : null;
        }
        this.elements.forEach(function(element) {
            element.setAttribute(name, value);
        });
        return this;
    };

    LiteQuery.prototype.click = function(callback) {
        return this.on('click', callback);
    };

    LiteQuery.prototype.on = function(events, callback) {
        const eventNames = events.split(/\s+/);
        this.elements.forEach(function(element) {
            eventNames.forEach(function(eventName) {
                element.addEventListener(eventName, callback);
            });
        });
        return this;
    };

    function ready(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    function $(selector) {
        return new LiteQuery(selector);
    }

    $.parseJSON = JSON.parse;
    window.$ = $;
    window.jQuery = $;
})(window, document);
