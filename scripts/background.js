/// <reference path="types/external/chrome-types.d.ts"/>
/// <reference path="types/groups.d.ts"/>
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(e => console.error(e));
//#region Storage
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
        );
    }
});
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "resetConfig",
        title: "Reset Config",
        contexts: ["all"]
    });
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "resetConfig") {
        chrome.windows.create({
            url: "../pages/resetConfig.html",
            type: "popup",
            width: 0,
            height: 0
        });
    }
});
//#endregion