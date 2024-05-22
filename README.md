# Um

> Minimal JavaScript UI Builder

Um, is an experimental composable UI builder that takes ideas from early [hyperapp](https://github.com/jorgebucaran/hyperapp) design, but does not stick to strict Elm Architecture.

Um, because you should think about, um, NOT using it.

## Features
- No Virtual Dom
- No Build System
- No Over Engineering
- ~1kb minified
- Totally INEFFICIENT rendering (at scale)

## Install

Via JSDelivr CDN

```js
import {app,h} from "https://cdn.jsdelivr.net/gh/n2geoff/um/dist/um.min.js";
```

## Overview

**Um** only has 2 exported functions, `app()`  and `h()`, and the later is optional.

### app({opts})

The `app()` is the builder function and takes an `opts` object:

#### Input:

| Property  | Default                    | Description                                                 |
| --------- | -------------------------- | ----------------------------------------------------------- |
| `state`   | `{}`                       | initial data state                                          |
| `actions` | `{}`                       | function object passed to view                              |
| `view`    | `(state, actions) => null` | function that takes state and actions and returns valid dom |
| `mount`   | `body`                    | valid query selector as mounting point                      |

#### Output:

Interface with internal state for utility expansion

| Property        | Description                                   |
| --------------- | --------------------------------------------- |
| `state` | internal state object |
| `update()` | function to render dom state |

### h(tag, [...args])

The `h()` is an **optional** hypertext build utility that weighs in around **~250b** and is provided as *a* way to build out your `view` DOM, but you can build your `view` using any method you like as long as it returns valid DOM.


## Example

```html
    <script type="module">
        import {app, h} from "./um.min.js";

        const myapp = app({
            state: {name: "[Your Name Here]", job: "Developer"},
            view(state, actions) {
                return h("main", [
                    h("strong", `Greeting from ${state.name}`),
                    h("div", `Your local ${state.job}`),
                    h("div", {id: "test"}, [
                        h("h1", "Um, Hello"),
                        h("p", 21),
                        h("hr")
                    ])
                ]);
            }
        });
    </script>
```

## Notes

> WORK-IN-PROGRESS

### TODO

- Improve Update
