/// <reference path="types/external/chrome-types.d.ts"/>
import { _, createGroup, main, createContainer } from "./utility.js";
document.documentElement.dataset.noLinkOpenButtons = '';
async function render() {
    chrome.storage.sync.get("config").then(({ config }) => {
        main.__();
        config?.groups?.forEach(createGroup);
        if (config?.useTZ) {
            const iframe = _('iframe', {
                src: `./timezone.html#${config?.tzList.join(',') ?? 'UTC'}`,
                style: {
                    width: "100%",
                    height: "10rem",
                }
            });
            iframe.setAttribute('allow', "clipboard-write 'self' *");
            createContainer({ legendText: 'Convert Times', content: [iframe] });
        }
    });
}
chrome.storage.onChanged.addListener(render);
render();;