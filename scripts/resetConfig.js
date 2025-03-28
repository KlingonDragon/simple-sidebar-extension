/// <reference path="types/external/chrome-types.d.ts"/>
/// <reference path="types/groups.d.ts"/>
/** @type {Config} */
const defaultConfig = {
    groups: [
        {
            legendText: 'Test Links',
            staticLinks: [
                { innerText: 'Search', href: 'https://duckduckgo.com' },
                {
                    imgSrc: 'data:image/svg+xml;base64,PHN2ZyBpZD0iZW1vamkiIHZpZXdCb3g9IjAgMCA3MiA3MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBpZD0iY29sb3IiPgogICAgPHBvbHlnb24gZmlsbD0iI0ZDRUEyQiIgc3Ryb2tlPSJub25lIiBwb2ludHM9IjM1Ljk5MjgsMTAuNzM2MyAyNy43OTEzLDI3LjM2OTkgOS40Mzk0LDMwLjA0MzYgMjIuNzI0NSw0Mi45ODM4IDE5LjU5NjIsNjEuMjYzNyAzNi4wMDg0LDUyLjYyNzYgNTIuNDI3LDYxLjI1MTUgNDkuMjg1MSw0Mi45NzM5IDYyLjU2MDYsMzAuMDIzOSA0NC4yMDY3LDI3LjM2MzgiLz4KICA8L2c+CiAgPGcgaWQ9ImhhaXIiLz4KICA8ZyBpZD0ic2tpbiIvPgogIDxnIGlkPSJza2luLXNoYWRvdyIvPgogIDxnIGlkPSJsaW5lIj4KICAgIDxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMiIgcG9pbnRzPSIzNS45OTI4LDEwLjczNjMgMjcuNzkxMywyNy4zNjk5IDkuNDM5NCwzMC4wNDM2IDIyLjcyNDUsNDIuOTgzOCAxOS41OTYyLDYxLjI2MzcgMzYuMDA4NCw1Mi42Mjc2IDUyLjQyNyw2MS4yNTE1IDQ5LjI4NTEsNDIuOTczOSA2Mi41NjA2LDMwLjAyMzkgNDQuMjA2NywyNy4zNjM4Ii8+CiAgPC9nPgo8L3N2Zz4K',
                    href: 'https://duckduckgo.com'
                }
            ],
            inputLinks: [
                {
                    imgSrc: 'data:image/svg+xml;base64,PHN2ZyBpZD0iZW1vamkiIHZpZXdCb3g9IjAgMCA3MiA3MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBpZD0iY29sb3IiPgogICAgPHBvbHlnb24gZmlsbD0iI0ZDRUEyQiIgc3Ryb2tlPSJub25lIiBwb2ludHM9IjM1Ljk5MjgsMTAuNzM2MyAyNy43OTEzLDI3LjM2OTkgOS40Mzk0LDMwLjA0MzYgMjIuNzI0NSw0Mi45ODM4IDE5LjU5NjIsNjEuMjYzNyAzNi4wMDg0LDUyLjYyNzYgNTIuNDI3LDYxLjI1MTUgNDkuMjg1MSw0Mi45NzM5IDYyLjU2MDYsMzAuMDIzOSA0NC4yMDY3LDI3LjM2MzgiLz4KICA8L2c+CiAgPGcgaWQ9ImhhaXIiLz4KICA8ZyBpZD0ic2tpbiIvPgogIDxnIGlkPSJza2luLXNoYWRvdyIvPgogIDxnIGlkPSJsaW5lIj4KICAgIDxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMiIgcG9pbnRzPSIzNS45OTI4LDEwLjczNjMgMjcuNzkxMywyNy4zNjk5IDkuNDM5NCwzMC4wNDM2IDIyLjcyNDUsNDIuOTgzOCAxOS41OTYyLDYxLjI2MzcgMzYuMDA4NCw1Mi42Mjc2IDUyLjQyNyw2MS4yNTE1IDQ5LjI4NTEsNDIuOTczOSA2Mi41NjA2LDMwLjAyMzkgNDQuMjA2NywyNy4zNjM4Ii8+CiAgPC9nPgo8L3N2Zz4K',
                    href: 'https://duckduckgo.com/?q={{{PLACEHOLDER}}}'
                },
                {
                    innerText: 'Search',
                    href: 'https://duckduckgo.com/?q={{{PLACEHOLDER}}}'
                }
            ],
            badgeGallery: [
                { src: 'https://img.shields.io/github/manifest-json/name/klingondragon/simple-sidebar-extension?style=for-the-badge' },
                { src: 'https://img.shields.io/github/issues/klingondragon/simple-sidebar-extension?style=for-the-badge' },
                { src: 'https://img.shields.io/github/last-commit/klingondragon/simple-sidebar-extension?style=for-the-badge' },
                { src: 'https://img.shields.io/github/languages/top/klingondragon/simple-sidebar-extension?style=for-the-badge' },
            ]
        }
    ],
    useTZ: true,
    tzList: [
        "US/Pacific",
        "US/Eastern",
        "UTC",
        "Europe/London",
        "Europe/Paris",
        "Asia/Dubai",
        "Asia/Kolkata",
        "Asia/Tokyo",
        "Australia/Sydney"
    ]
};
chrome.storage.sync.get("config").then(({ config }) => chrome.storage.sync.set({ config: defaultConfig })).then(() => chrome.runtime.reload()).then(() => window.close());