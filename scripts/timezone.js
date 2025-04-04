import { _, configPageFlags, copy, createBox, createToggle, main } from './utility.js';
const
    /** @type {Config} */
    { colourScheme, hideToggleCheckboxes, tzList = [], defaultTZList = [] } = JSON.parse(new URLSearchParams(window.location.search).get('config') || ''),
    /** @type {Promise<{convertTime: (hh: number, mm: number, timezones: string[]) => string}>}*/
    PYTHON = globalThis.loadPyodide().then(pyodide => pyodide.loadPackage(["micropip"]).then(() => pyodide.runPythonAsync(`
        import micropip
        await micropip.install("tzdata")  # Required for zoneinfo support
    `).then(() => pyodide.runPythonAsync(`
        from datetime import datetime
        from typing import Iterable
        from zoneinfo import ZoneInfo
        HOME_TIMEZONE = datetime.now().astimezone().tzinfo
        def convert_tz(hh: int, mm: int, timezones: Iterable[str]) -> str:
            converted_times = tuple(
                datetime.now(HOME_TIMEZONE)
                .replace(hour=hh, minute=mm, second=0)
                .astimezone(ZoneInfo(timezone))
                for timezone in timezones
            )
            return " ".join(
                (
                    f'{"/".join(f"{converted_time:%H:%M}" for converted_time in converted_times)}',
                    f'({"/".join(f"{converted_time:%Z}" for converted_time in converted_times)})',
                )
            )
    `)).then(() => ({
        convertTime: (hh, mm, timezones) => pyodide.runPython(`convert_tz(${hh}, ${mm}, ${JSON.stringify(timezones)})`)
    }))));
queueMicrotask(() => {
    main._(_('span', { innerText: 'Please\u00A0Wait...' }), _('span', { innerText: 'Loading\u00A0Python...' }));
    configPageFlags({ colourScheme, hideToggleCheckboxes });
    PYTHON.then(({ convertTime }) => {
        const
            hh = _('input', { type: 'number', min: '0', max: '23', placeholder: 'HH', value: '12' }).on('mouseenter', () => hh.focus()),
            mm = _('input', { type: 'number', min: '0', max: '59', placeholder: 'MM', value: '0' }).on('mouseenter', () => mm.focus()),
            output = _('output').on('click', () => copy(output.innerText)),
            update = () => {
                if (!(hh.value && mm.value && hh.checkValidity() && mm.checkValidity())) { return; }
                output.innerText = convertTime(Number(hh.value), Number(mm.value), labels.map(label => label.checkBox).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value));
            },
            labels = tzList.map(timeZone => createToggle({ innerText: timeZone.replace('/', ' / '), value: timeZone, checked: defaultTZList.includes(timeZone), onChange: update }));
        hh.on('input', update); mm.on('input', update);
        main.__(hh, mm, output, createBox('toggles')._(...labels));
        update();
    }, (e) => main.__(e));
});