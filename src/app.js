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

    const update = () => {
        document.querySelector(mount).replaceChildren(view(data, actions));
    }

    // mount view
    if (opts.view && mount) {
        update();
    }

    return {
        state,
        actions,
    }
}