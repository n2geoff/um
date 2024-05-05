export default function app(opts, selector = "body") {
    // initial setup
    let data = {};
    let view = () => null;
    let actions = {};

    // query helper
    const $ = document.querySelector.bind(document);

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
        $(selector).replaceChildren(view(data, actions));
    }

    // setup view function
    if (opts.view && typeof opts.view === "function") {
        view = opts?.view;
    }

    // setup data object
    if (opts.state && typeof opts.state === "object") {
        // wrap data in state object
        data = state(opts.state);
    }

    // setup actions object
    if (opts.actions && typeof opts.actions === "object") {
        actions = opts.actions;
    }

    // mount view
    if (opts.view && selector) {
        update();
    }

    return {
        state,
        actions,
    };
}
