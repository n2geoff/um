/**
 * Creates new DOM element(s) from tag name(s) and attributes
 *
 * @param {string} tag  - tag to create
 * @param {...any} args - attributes and/or child tag elements
 *
 * @returns {HTMLElement} The created DOM element(s)
 */
export default function tag(tag, ...args) {
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
