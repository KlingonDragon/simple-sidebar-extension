/// <reference path="types/utility.d.ts"/>
/// <reference path="types/groups.d.ts"/>
HTMLElement.prototype._ = function (...children) { this.append(...children.filter(item => item !== undefined)); return this; };
HTMLElement.prototype.__ = function (...children) { this.replaceChildren(...children.filter(item => item !== undefined)); return this; };
HTMLElement.prototype.on = function (type, listener) { this.addEventListener(type, listener); return this; };

const __main = document.querySelector('main');
if (!__main) { alert('HTML missing <main>'); throw 'HTML missing <main>'; }
export const
    main = __main,
    /** @type {<TagName extends keyof HTMLElementTagNameMap>(tagName: TagName, props?: {dataset?: DOMStringMap; style?: Partial<CSSStyleDeclaration>; classList?: (string | undefined)[]; [key:string]:any}) => HTMLElementTagNameMap[TagName]} */
    _ = (tagName, { dataset, style, classList, ...props } = {}) => {
        const node = document.createElement(tagName);
        if (dataset) { Object.assign(node.dataset, dataset); }
        if (style) { Object.assign(node.style, style); }
        if (classList) { node.classList.add(...classList.filter(item => item !== undefined)); }
        Object.assign(node, props);
        return node;
    },
    /** @type {(text: string) => void} */
    copy = text => {
        navigator.clipboard.writeText(text).then(() => {
            console.log(`Copied: ${text}`);
        }).catch((e) => {
            console.warn(e);
        });
    },
    /** @type {({}:{ legendText:string, content:AppendItem[], defaultShrink?:boolean }) => HTMLFieldSetElement} */
    createContainer = ({ legendText, content, defaultShrink }) => {

        const
            container = _('div', { classList: ['fieldset-container', defaultShrink ? 'shrink' : undefined] })._(...content),
            fieldset = _('fieldset')._(_('legend', { innerText: legendText }).on('click', () => container.classList.toggle('shrink')), container);
        main._(fieldset);
        return fieldset;
    },
    /** @type {({}:GroupConfig) => HTMLFieldSetElement} */
    createGroup = ({ legendText, staticLinks, inputLinks, badgeGallery, defaultShrink }) => createContainer({
        legendText,
        content: [
            staticLinks && _('div', { classList: ['box', 'small-cols'] })._(...staticLinks?.map(createStaticLink)),
            inputLinks && _('div', { classList: ['box'] })._(...(inputLinks?.map(createInputLink))),
            badgeGallery && _('div', { classList: ['dynamic'] })._(...badgeGallery.map(createBadge)),
        ],
        defaultShrink
    }),
    /** @type {({}:LinkConfig) => HTMLAnchorElement} */
    createStaticLink = ({ innerText, imgSrc, href }) => _('a', { href })._(innerText ?? _('img', { src: imgSrc })),
    /** @type {({}:LinkConfig) => HTMLDivElement} */
    createInputLink = ({ innerText, href, imgSrc }) => {
        const
            input = _('input', { type: 'text' }),
            button = _('a', {
                innerText: 'Open',
                href: '#',
                target: '_blank'
            }),
            output = _('output');
        input
            .on('mouseenter', () => input.focus())
            .on('input', () => button.href = (output.innerText = (input.value && href.replace('{{{PLACEHOLDER}}}', input.value)) || '') || '#')
            .on("keypress", (event) => event.key === "Enter" && button.click());
        button.on('click', event => button.href.startsWith('https://') || event.preventDefault());
        return _('div', { classList: ['quick-search'] })._(_('label')._(innerText ? _('span', { innerText }) : _('img', { src: imgSrc }), input), button, output);
    },
    /** @type {({}:LinkFunctionConfig) => HTMLDivElement} */
    createInputLinkFunction = ({ innerText, hrefFunction, imgSrc }) => {
        const
            input = _('input', { type: 'text' }),
            button = _('a', {
                innerText: 'Open',
                href: '#',
                target: '_blank'
            }),
            output = _('output');
        input
            .on('mouseenter', () => input.focus())
            .on('input', () => button.href = (output.innerText = (input.value && hrefFunction(input.value)) || '') || '#')
            .on("keypress", (event) => event.key === "Enter" && button.click());
        button.on('click', event => button.href.startsWith('https://') || event.preventDefault());
        return _('div', { classList: ['quick-search'] })._(_('label')._(innerText ? _('span', { innerText }) : _('img', { src: imgSrc }), input), button, output);
    },
    /** @type {({}:BadgeConfig)=>HTMLAnchorElement|HTMLImageElement} */
    createBadge = ({ href, src }) => {
        const img = _('img', { src, loading: 'lazy' }),
            refresh = () => {
                img.src = `${src}${src.includes('?') ? '&' : '?'}refreshTime=${Date.now()}`;
                setTimeout(refresh, 5 * 60 * 1000 + ((Math.random() - 0.5) * 3));
            };
        return href ? _('a', { href })._(img) : img;
    }
    ;