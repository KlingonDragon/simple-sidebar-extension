/// <reference path="types/chrome-types.d.ts"/>
import { _, configPageFlags, createAddItemInput, createBox, createContainer, createToggle, downloadJSON, main } from "./utility.js";
//#region Config Restrictions
const
    allowedColourSchemes = ['Browser Default', 'Light', 'Dark'],
    allowedTimeZones = Intl.supportedValuesOf("timeZone");
//#endregion
//#region Default Config
/** @type {Config} */
const defaultConfig = {
    hideOpenLinkButtons: false,
    hideToggleCheckboxes: false,
    groups: [
        {
            legendText: 'Test Links',
            staticLinks: [
                { innerText: 'Search', href: 'https://duckduckgo.com' },
                {
                    innerText: 'duckduckgo',
                    imgSrc: 'data:image/svg+xml;base64,PHN2ZyBpZD0iZW1vamkiIHZpZXdCb3g9IjAgMCA3MiA3MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBpZD0iY29sb3IiPgogICAgPHBvbHlnb24gZmlsbD0iI0ZDRUEyQiIgc3Ryb2tlPSJub25lIiBwb2ludHM9IjM1Ljk5MjgsMTAuNzM2MyAyNy43OTEzLDI3LjM2OTkgOS40Mzk0LDMwLjA0MzYgMjIuNzI0NSw0Mi45ODM4IDE5LjU5NjIsNjEuMjYzNyAzNi4wMDg0LDUyLjYyNzYgNTIuNDI3LDYxLjI1MTUgNDkuMjg1MSw0Mi45NzM5IDYyLjU2MDYsMzAuMDIzOSA0NC4yMDY3LDI3LjM2MzgiLz4KICA8L2c+CiAgPGcgaWQ9ImhhaXIiLz4KICA8ZyBpZD0ic2tpbiIvPgogIDxnIGlkPSJza2luLXNoYWRvdyIvPgogIDxnIGlkPSJsaW5lIj4KICAgIDxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMiIgcG9pbnRzPSIzNS45OTI4LDEwLjczNjMgMjcuNzkxMywyNy4zNjk5IDkuNDM5NCwzMC4wNDM2IDIyLjcyNDUsNDIuOTgzOCAxOS41OTYyLDYxLjI2MzcgMzYuMDA4NCw1Mi42Mjc2IDUyLjQyNyw2MS4yNTE1IDQ5LjI4NTEsNDIuOTczOSA2Mi41NjA2LDMwLjAyMzkgNDQuMjA2NywyNy4zNjM4Ii8+CiAgPC9nPgo8L3N2Zz4K',
                    href: 'https://duckduckgo.com'
                }
            ],
            inputLinks: [
                {
                    innerText: 'duckduckgo',
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
    useTZ: false,
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
    ],
    defaultTZList: ["UTC"]
};
//#endregion
//#region Render
async function render() {
    main.__('Loading Config Values');
    chrome.storage.sync.get("config").then(({ config: configFromStorage }) => {
        if (!configFromStorage) { configFromStorage = defaultConfig; }
        const
            /** @type {Config} */
            config = configFromStorage,
            { colourScheme, hideOpenLinkButtons, hideToggleCheckboxes, groups, useTZ, tzList = [], defaultTZList = [] } = config,
            /** @type {(newConfig:Partial<Config>)=>void} */
            updateConfig = (newConfig) => chrome.storage.sync.set({ config: Object.assign(config, newConfig) });
        main.__();
        configPageFlags({ colourScheme, hideToggleCheckboxes });
        createContainer({
            legendText: 'Built-In Config Options',
            content: [
                createBox('dynamic')._(
                    _('button', { innerText: 'Reset Config to default', classList: ['yellow'] }).on('click',
                        () => chrome.storage.sync.set({ config: defaultConfig })
                    ),
                    _('button', { innerText: 'Reload Extension', classList: ['red'] }).on('click',
                        () => chrome.runtime.reload()
                    ),
                    _('button', { innerText: 'Export Config' }).on('click', () => { downloadJSON(`${Date.now()}.simple-sidebar-config.json`, config); })
                ),
                createBox('toggles')._(
                    _('label', { classList: ['stacked'] })._(
                        _('span', { innerText: 'Colour scheme' }),
                        _('select')._(...allowedColourSchemes.map(value => _('option', { innerText: value, value, selected: colourScheme == value })))
                            .on('change', ({ currentTarget: { value } }) => updateConfig({ colourScheme: value }))
                    ),
                    createToggle({
                        innerText: 'Hide "Open" buttons for input links', value: '', checked: hideOpenLinkButtons ?? false,
                        onChange: ({ checked }) => updateConfig({ hideOpenLinkButtons: checked })
                    }),
                    createToggle({
                        innerText: 'Hide tick boxes in toggles', value: '', checked: hideToggleCheckboxes ?? false,
                        onChange: ({ checked }) => updateConfig({ hideToggleCheckboxes: checked })
                    }),
                ),
            ]
        });
        createContainer({
            legendText: 'Timezone Converter', content: [
                createBox('toggles')._(
                    createToggle({
                        innerText: 'Enable TimeZone Converter', value: '', checked: useTZ ?? false,
                        onChange: ({ checked }) => updateConfig({ useTZ: checked })
                    })
                ),
                ...(useTZ ? [
                    createBox('dynamic')._(
                        _('button', { innerText: 'Reset available timezones list', classList: ['yellow'] }).on('click',
                            () => updateConfig({ tzList: defaultConfig.tzList })
                        ),
                        _('button', { innerText: 'Reset default timezones list', classList: ['yellow'] }).on('click',
                            () => updateConfig({ defaultTZList: defaultConfig.defaultTZList })
                        ),
                    ),
                    createContainer({
                        legendText: 'Enabled TimeZones', appendToMain: false, content: [
                            createBox()._(...tzList?.map(tz =>
                                _('button', { innerText: tz.replace('/', ' / '), classList: ['delete'], title: `Delete ${tz}` })
                                    .on('click', () => { updateConfig({ tzList: tzList.filter(item => item !== tz) }); })
                            )),
                            createAddItemInput({
                                labelText: 'Add Timezone', listID: 'TZ', onSubmit: ({ value }) => {
                                    const newTZ = value.replace(/\s/g, '');
                                    allowedTimeZones.includes(newTZ) && updateConfig({ tzList: [...tzList, newTZ] });
                                }
                            })._(_('datalist', { id: 'TZ' })._(...allowedTimeZones.map(value => _('option', { value })))),
                        ]
                    }),
                    createContainer({
                        legendText: 'Default Conversion TimeZones', appendToMain: false, content: [
                            createBox('toggles')._(...tzList.map(timeZone => createToggle({
                                innerText: timeZone.replace('/', ' / '), value: timeZone, checked: defaultTZList.includes(timeZone),
                                onChange: ({ value, checked }) => checked ? updateConfig({ defaultTZList: [...defaultTZList, value.replace(/\s/g, '')] }) : updateConfig({ defaultTZList: defaultTZList.filter(item => item !== value) })
                            })))
                        ]
                    })
                ] : []),
            ]
        });
        const updateGroups = () => updateConfig({ groups });
        createContainer({
            legendText: 'Link Groups User Config', content: [
                createBox('dynamic')._(
                    _('button', { innerText: 'Load Example', classList: ['yellow'] }).on('click',
                        () => updateConfig({ groups: defaultConfig.groups })
                    ),
                    _('button', { innerText: 'Export' }).on('click', () => { downloadJSON(`${Date.now()}.simple-sidebar-link-groups-config.json`, groups); }),
                    _('label')._(_('span', { innerText: 'Import' }), _('input', { type: 'file' })),
                ),
                ...groups.map((group) => {
                    const { legendText, defaultShrink } = group;
                    return createContainer({
                        legendText, content: [
                            createBox('dynamic')._(
                                createBox('toggles')._(
                                    createToggle({ innerText: 'Shrink by default', value: '', checked: defaultShrink ?? false, onChange: ({ checked }) => { group.defaultShrink = checked; updateGroups(); } }),
                                ),
                                _('button', { classList: ['delete'] })._(_('span', { innerText: 'Delete', style: { padding: '0.125rem' } })).on('click', () => {
                                    const i = groups.indexOf(group); if (i == -1) { return; } groups.splice(i, 1); updateGroups();
                                })
                            )
                        ]
                    });
                }),
                createAddItemInput({ labelText: 'Add group', onSubmit: ({ value }) => updateConfig({ groups: [...groups, { legendText: value }] }) }),
                createBox('dynamic')._(
                    _('button', { innerText: 'Save', classList: ['green'] })
                        .on('click', updateGroups),
                )
            ]
        }).style.gridColumn = '1 / -1';
    });
}
chrome.storage.onChanged.addListener(render);
render();
//#endregion