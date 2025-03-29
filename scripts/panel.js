/// <reference path="types/chrome-types.d.ts"/>
import { _, createGroup, main, createContainer, configPageFlags, omit } from "./utility.js";

//#region Nav
nav: {
    const nav = document.querySelector('nav');
    if (!nav) { break nav; }
    nav._(
        _('button', { innerText: 'Config' }).on('click', () => chrome.runtime.openOptionsPage()),
    );
}
//#endregion
//#region Render
async function render() {
    chrome.storage.sync.get("config").then(({ config: configFromStorage }) => {
        const
            /** @type {Config} */
            config = configFromStorage,
            { colourScheme, hideOpenLinkButtons, hideToggleCheckboxes, groups, useTZ } = config;
        main.__();
        configPageFlags({ colourScheme, hideOpenLinkButtons, hideToggleCheckboxes });
        groups?.forEach(createGroup);
        if (useTZ) {
            const iframe = _('iframe', {
                src: `./timezone.html?config=${JSON.stringify(omit(config, 'groups'))}`,
                style: {
                    width: "100%",
                    height: "12rem",
                }
            });
            iframe.setAttribute('allow', "clipboard-write 'self' *");
            createContainer({ legendText: 'TimeZone Converter', content: [iframe] });
        }
    });
}
chrome.storage.onChanged.addListener(render);
render();
//#endregion