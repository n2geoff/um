# Tagged

> Minimal JavaScript UI Builder

An experimental composable UI builder that takes ideas from early [hyperapp](https://github.com/jorgebucaran/hyperapp) design, but does not stick to strict Elm Architecture.

## Features
- No Virtual Dom
- No Build System
- No Over Engineering
- ~1kb minified
- Totally INEFFICIENT rendering (at scale)

## Overview

The library only has 2 functions, `app()`  and `h()`, and the later is optional.  

### app({opts}) 

The `app()` is the builder function and takes an `opts` object:

#### Input:

| Property  | Default                    | Description                                                 |
| --------- | -------------------------- | ----------------------------------------------------------- |
| `state`   | `{}`                       | initial data state                                          |
| `actions` | `{}`                       | function object passed to view                              |
| `view`    | `(state, actions) => null` | function that takes state and actions and returns valid dom |
| `mount`   | "body"                     | valid query selector as mounting point                      |

#### Output:

| Property        | Description                                   |
| --------------- | --------------------------------------------- |
| `state([data])` | state function to get or update internal data |

### h(tag, [...args])

The `h()` is an **optional** hypertext build utility that weighs in around **~250b** and is provided as *a* way to build out your view markdown, but you can build your view using any method you like as long as it returns valid dom.


## Example

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
        });
    </script>
```

## Notes

> WORK-IN-PROGRESS
