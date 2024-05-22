/**
 * HTML Tag Scripting Function
 *
 * creates new DOM element(s) from tag name(s) and attributes
 *
 * @param {String} tag  - tag to create
 * @param {*} args      - attributes and/or child tag elements
 *
 * @returns {HTMLElement} The created DOM element(s)
 */
export default function h(tag, ...args) {
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
