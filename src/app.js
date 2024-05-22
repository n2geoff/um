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
 * @returns {Object}                state proxy object
 */
export default function app(opts) {
    // initial setup
    let data    = check(opts.state, {});
    let view    = check(opts.view, () => null);
    let actions = check(opts.actions, {});
    let mount   = opts.mount || "body";

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

    // state helper
    const state = (state) => {
        if(typeof state === "object") {
            data = {...data, ...state};
        }

        // update ui
        update();

        // return current state
        return data;
    }

    /**
     * Assigns Dispatch-able Actions into App
     *
     * @param {Object} input        state used by actions
     * @param {Object} actions      functions that update state
     */
    function dispatch(input, actions) {
        Object.entries(actions).forEach(([name, action]) => {
            if (typeof action === "function") {
                actions[name] = (...args) => {
                    // update date from action return
                    Object.assign(data, action(input, ...args));

                    // call update
                    update();
                };
            }
        });

        update();
    }

    /** update dom */
    const update = () => {
        document.querySelector(mount).replaceChildren(view(data, actions));
    }

    // mount view
    if (opts.view && mount) {
        dispatch(data, actions);
    }

    return {state}
}