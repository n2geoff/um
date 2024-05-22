/**
 * HTML Tag Scripting Function
 *
 * Generates new DOM element(s) from a tag, attributes
 *
 * @param {String} tag                 - tag name
 * @param {Object|String|Array} args   - attributes, text or array of child elements
 *
 * @returns {HTMLElement} The created DOM element(s)
 */
function h(tag, ...args) {
    const el = document.createElement(tag);

    // support all scalar values as TextNodes
    const isScalar = (value) => ["boolean", "string", "number"].includes(typeof value);

    args.forEach((arg) => {
        if (isScalar(arg)) {
            el.appendChild(document.createTextNode(arg));
        } else if (Array.isArray(arg)) {
            el.append(...arg);
        } else {
            Object.assign(el, arg);
        }
    });

    return el;
}

/**
 * App Builder
 *
 * Composes state, actions, view together as
 * mountable ui
 *
 * @param {Object}   opts           options bag of state, view, actions, and mount
 * @param {Object}   opts.state     initial app object state
 * @param {Function} opts.view      function that returns dom. state and actions are passed in
 * @param {Object}   opts.actions   object functions includes and return state
 * @param {String}   opts.mount     querySelector value
 *
 * @returns {Object}                state and update() interface
 */
function app(opts) {
    // initial setup
    const state   = check(opts.state, {});
    const view    = check(opts.view, () => null);
    const actions = check(opts.actions, {});
    const mount   = opts.mount || "body";

    /**
     * simple type validation check
     *
     * @param {*} value
     * @param {String} type
     * @returns {*}
     */
    function check(value, type) {
        return typeof value === typeof type ? value : type;
    }

    /**
     * Assigns Dispatch-able Actions into App
     *
     * @param {Object} data        state used by actions
     * @param {Object} actions     functions that update state
     */
    function dispatch(data, actions) {
        Object.entries(actions).forEach(([name, action]) => {
            if (typeof action === "function") {
                actions[name] = (...args) => {
                    // update date from action return
                    Object.assign(state, action(data, ...args));

                    // call update
                    update();
                };
            }
        });

        update();
    }

    /** update dom */
    const update = () => {
        document.querySelector(mount).replaceChildren(view(state, actions));
    };

    // mount view
    if (opts.view && mount) {
        dispatch(state, actions);
    }

    return {state,update}
}

export { app, h };
