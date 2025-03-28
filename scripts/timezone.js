import { _, copy, main } from './utility.js';
const
    /** @type {string[]} */
    timeZones = location.hash.replace(/^#/, '').split(',') ?? ['UTC'],
    /** @type {Promise<{convertTime: (hh: number, mm: number, timezones: string[]) => string}>}*/
    PYTHON = loadPyodide().then(pyodide => pyodide.loadPackage(["micropip"]).then(() => pyodide.runPythonAsync(`
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
    main._('Please\u00A0Wait...', _('br'), 'Loading\u00A0Python...');
    PYTHON.then(({ convertTime }) => {
        const
            checkboxContainer = _('div'),
            hh = _('input', { type: 'number', min: 0, max: 23, placeholder: 'HH', value: 12 }).on('mouseenter', () => hh.focus()),
            mm = _('input', { type: 'number', min: 0, max: 59, placeholder: 'MM', value: 0 }).on('mouseenter', () => mm.focus()),
            output = _('output').on('click', () => copy(output.innerText)),
            update = () => {
                if (!(hh.value && mm.value && hh.checkValidity() && mm.checkValidity())) { return; }
                output.innerText = convertTime(Number(hh.value), Number(mm.value), checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value));
            },
            [labels, checkboxes] = ((arr) => arr[0].map((_, i) => arr.map(row => row[i])))(timeZones.map(timeZone => {
                const label = _('label'), checkbox = _('input', { type: 'checkbox', value: timeZone, checked: timeZone == 'UTC' }).on('change', update);
                return [label._(_('span', { innerText: timeZone.replace('/', ' / ') }), checkbox), checkbox];
            }));
        hh.on('input', update); mm.on('input', update);
        checkboxContainer.classList.add('toggles', 'box', 'small-cols');
        main.__(hh, mm, output, checkboxContainer._(...labels));
    }, (e) => main.__(e));
});