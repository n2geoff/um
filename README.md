# Tagged

> Minimal Javascript UI Library

This is an experimental composable ui builder that takes ideas from Elm Architecture, but without the doctrine - this is Javascript!

## Features
- No Virtual Dom
- No Build System
- No Over Engineering
- ~1kb minified
- Totally INEFFICIENT rendering (at scale)

## Overview

the `app` builder takes an `opts` object that expects:

- `state` as initial data `{object}`
- `actions` as `{object}` with functions definitions
- `view` as `{function}` that returns valid dom
- `mount` as querySelector compatible `{string}`

`app` returns:

- `state` current of component as updatable function
- `actions` to call on component

### Example

```html
    <script type="module">
        import {app, h} from "./tagged.min.js";

        const myapp = app({
            state: {name: "[Your Name Here]", job: "Developer"},
            view(state, actions) {
                return h("main", [
                    h("strong", `Greeting from ${state.name}`),
                    h("div", `Your local ${state.job}`),
                    h("div", {id: "test"}, [
                        h("h1", "Hello Tagged"),
                        h("p", 21),
                        h("hr")
                    ])
                ]);
            }
        }, "#main");
    </script>

    <main id="app"></main>
```

### Inspired By

- hyperapp
- Elm Architecture

## Notes

> WORK-IN-PROGRESS
