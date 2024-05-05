export default function app(opts, selector = "body") {
    // initial setup
    let data = {};
    let view = () => null;
    let methods = {};

    // query helper
    const $ = document.querySelector.bind(document);

    // state helper
    const state = (state) => {
        if(typeof state === "object") {
            data = {...data, ...state};
        }

        // update ui
        render();

        // return current state
        return data;
    }

    const render = () => {
        $(selector).replaceChildren(view(data, methods));
    }

    // setup view
    if (opts.view && typeof opts.view === "function") {
        view = opts?.view;
    }

    // setup data
    if (opts.data && typeof opts.data === "object") {
        // wrap data in state object
        data = state(opts.data);
    }

    // setup methods
    if (opts.methods && typeof opts.methods === "object") {
        methods = opts.methods;
    }

    // mount view
    if (opts.view && selector) {
        render();
    }

    return {
        state,
        methods,
    };
}
