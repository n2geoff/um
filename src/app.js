export default function app(opts) {
    // initial setup
    let data    = check(opts.state, {});
    let view    = check(opts.view, () => null);
    let actions = check(opts.actions, {});
    let mount   = opts.mount || "body";

    // check set or default
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

    // starts app
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

    const update = () => {
        document.querySelector(mount).replaceChildren(view(data, actions));
    }

    // mount view
    if (opts.view && mount) {
        dispatch(data, actions);
    }

    return {state}
}