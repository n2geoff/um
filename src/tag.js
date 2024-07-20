/**
 * HTML Tag Scripting Function
 *
 * Generates new DOM element(s) from a tag, attributes
 *
 * @param {String} tag                 - tag name
 * @param {Object|String|Array} args   - attributes, text or array of child elements
 *
 * @returns {HTMLElement} The created DOM element(s)
 */
export default function h(tag, ...args) {
    const el = document.createElement(tag);

    // support all scalar values as TextNodes
    const isScalar = (value) => ["boolean", "string", "number"].includes(typeof value);

    for(let i = 0; i < args.length; i++) {
        if (isScalar(args[i])) {
            el.appendChild(document.createTextNode(args[i]));
        } else if (Array.isArray(args[i])) {
            el.append(...args[i]);
        } else {
            for(const [k,v] of Object.entries(args[i])) {
                // if not both ways, some attributes do not render
                el.setAttribute(k, v);
                el[k] = v;
            }
        }
    }

    return el;
}
