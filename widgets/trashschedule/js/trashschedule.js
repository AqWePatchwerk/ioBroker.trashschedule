/*
    ioBroker.vis TrashSchedule Widget-Set

    Copyright 2022 Matthias Kleine info@haus-automatisierung.com
*/
'use strict';

// add translations for edit mode
$.extend(
    true,
    systemDictionary,
    {
        "size": {
            "en": "Size",
            "de": "Größe",
            "ru": "Размер",
            "pt": "Tamanho",
            "nl": "Grootte",
            "fr": "Taille",
            "it": "Dimensione",
            "es": "Talla",
            "pl": "Rozmiar",
            "uk": "Розмір",
            "zh-cn": "尺寸"
        },
        "limit": {
            "en": "Limit",
            "de": "Limit",
            "ru": "Предел",
            "pt": "Limite",
            "nl": "Begrenzing",
            "fr": "Limite",
            "it": "Limite",
            "es": "Límite",
            "pl": "Limit",
            "uk": "Ліміт",
            "zh-cn": "限制"
        },
        "glow": {
            "en": "Glow when due",
            "de": "Leuchten, wenn fällig",
            "ru": "Свечение, когда из-за",
            "pt": "Brilhar quando devido",
            "nl": "Gloed wanneer het moet",
            "fr": "Briller à l'échéance",
            "it": "Bagliore quando dovuto",
            "es": "Resplandece cuando es debido",
            "pl": "Świeci się, gdy należy",
            "uk": "Пожовтий, коли",
            "zh-cn": "到期时发光"
        },
        "glowLimit": {
            "en": "Days (Glow)",
            "de": "Tage (Leuchten)",
            "ru": "Дни (светящиеся)",
            "pt": "Dias (brilhantes)",
            "nl": "Dagen (gloeien)",
            "fr": "Jours (brillent)",
            "it": "Giorni (brillano)",
            "es": "Días (resplandecientes)",
            "pl": "Dzień (świecenia)",
            "uk": "Днів (світіння)",
            "zh-cn": "日子"
        },
        "showName": {
            "en": "Show name",
            "de": "Name anzeigen",
            "ru": "Показать имя",
            "pt": "Mostrar nome",
            "nl": "Toon naam",
            "fr": "Afficher le nom",
            "it": "Mostra nome",
            "es": "Mostrar nombre",
            "pl": "Pokaż nazwę",
            "uk": "Ім'я",
            "zh-cn": "显示名称"
        },
        "showDate": {
            "en": "Show date",
            "de": "Datum anzeigen",
            "ru": "Показать дату",
            "pt": "Mostrar data",
            "nl": "Toon datum",
            "fr": "Afficher la date",
            "it": "Mostra data",
            "es": "Mostrar fecha",
            "pl": "Pokaż datę",
            "uk": "Дата завантаження",
            "zh-cn": "显示日期"
        },
        "dateLocale": {
            "en": "Date locale",
            "de": "Datumsgebietsschema",
            "ru": "Язык даты",
            "pt": "Local de data",
            "nl": "Datum locale",
            "fr": "Paramètres régionaux de date",
            "it": "Data locale",
            "es": "Configuración regional de la fecha",
            "pl": "Lokalizacja daty",
            "uk": "Дата місцевих",
            "zh-cn": "日期语言环境"
        },
        "de-DE": {
            "en": "German",
            "de": "Deutsch",
            "ru": "Немецкий",
            "pt": "alemão",
            "nl": "Duitse",
            "fr": "allemand",
            "it": "Tedesco",
            "es": "alemán",
            "pl": "Niemiecki",
            "uk": "Німецька",
            "zh-cn": "德语"
        },
        "dateWeekday": {
            "en": "Weekday",
            "de": "Wochentag",
            "ru": "Будний день",
            "pt": "Dia da semana",
            "nl": "Weekdag",
            "fr": "Jour de la semaine",
            "it": "giorno della settimana",
            "es": "Día laborable",
            "pl": "Dzień powszedni",
            "uk": "День народження",
            "zh-cn": "工作日"
        },
        "hide": {
            "en": "Hide",
            "de": "Hirse",
            "ru": "Скрыть",
            "pt": "Esconde-te",
            "nl": "Verberg je",
            "fr": "C'est ça",
            "it": "Nascondi",
            "es": "Escóndete",
            "pl": "Hide",
            "uk": "Приват",
            "zh-cn": "导 言"
        },
        "long": {
            "en": "long",
            "de": "lang",
            "ru": "длинный",
            "pt": "longo",
            "nl": "lang",
            "fr": "longue",
            "it": "lungo",
            "es": "largo",
            "pl": "długie",
            "uk": "довгий",
            "zh-cn": "长"
        },
        "short": {
            "en": "short",
            "de": "kurz",
            "ru": "короткая",
            "pt": "curto",
            "nl": "kort",
            "fr": "court",
            "it": "corto",
            "es": "corto",
            "pl": "krótki",
            "uk": "короткий",
            "zh-cn": "短"
        }
    }
);

vis.binds['trashschedule'] = {
    version: '2.2.0',
    showVersion: function () {
        if (vis.binds['trashschedule'].version) {
            console.log('Version trashschedule: ' + vis.binds['trashschedule'].version);
            vis.binds['trashschedule'].version = null;
        }
    },
    createWidget: function (widgetID, view, data, style) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['trashschedule'].createWidget(widgetID, view, data, style);
            }, 100);
        }

        const oid = data.oid ? data.oid : 'trashschedule.0.type.json';
        const size = data.size ? parseInt(data.size) : 100;
        const limit = data.limit ? parseInt(data.limit) : 0; // 0 = no limit
        const glow = !!data.glow;
        const glowLimit = data.glowLimit ? parseInt(data.glowLimit) : 1; // 1 defaults to (daysLeft <= 1)
        const showName = Object.prototype.hasOwnProperty.call(data, 'showName') ? !!data.showName : true;
        const showDate = !!data.showDate;
        const dateLocale = data.dateLocale ? data.dateLocale : 'de-DE';
        const dateWeekday = data.dateWeekday ? data.dateWeekday : 'long';

        const dateOptions = { month: 'numeric', day: 'numeric' };

        if (dateWeekday != 'hide') {
            dateOptions.weekday = dateWeekday;
        }

        // update based on current value
        vis.binds['trashschedule'].redraw($div.find('.trashtypes'), vis.states[oid + '.val'], size, limit, glow, glowLimit, showName, showDate, dateLocale, dateOptions);

        // subscribe on updates of value
        if (oid) {
            vis.states.bind(oid + '.val', function (e, newVal, oldVal) {
                vis.binds['trashschedule'].redraw($div.find('.trashtypes'), newVal, size, limit, glow, glowLimit, showName, showDate, dateLocale, dateOptions);
            });
        }
    },
    toPaddedHexString: function (num, len) {
        let str = num.toString(16);
        return '0'.repeat(len - str.length) + str;
    },
    rgbToHsl: function (r, g, b) {
        r /= 255, g /= 255, b /= 255;

        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return [h, s, l];
    },
    hslToRgb: function (h, s, l) {
        var r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [
            Math.max(0, Math.min(Math.round(r * 255), 255)),
            Math.max(0, Math.min(Math.round(g * 255), 255)),
            Math.max(0, Math.min(Math.round(b * 255), 255))
        ];
    },
    getRgb: function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        var r = parseInt(result[1], 16);
        var g = parseInt(result[2], 16);
        var b = parseInt(result[3], 16);

        return [r, g, b];
    },
    getHsl: function (hex) {
        var result = this.getRgb(hex);

        var r = result[0];
        var g = result[1];
        var b = result[2];

        return this.rgbToHsl(r, g, b);
    },
    getShiftedColor: function (hex, lightnessShift) {
        var hsl = this.getHsl(hex);
        var rgb = this.hslToRgb(hsl[0], hsl[1], hsl[2] + lightnessShift);

        return this.toPaddedHexString(rgb[0], 2) + this.toPaddedHexString(rgb[1], 2) + this.toPaddedHexString(rgb[2], 2);
    },
    getBackgroundImage: function (color) {

        const newColor = /^#?([a-f\d]{6})$/i.exec(color);
        let rgb = newColor[1];

        // Ausgangsfarbe: #8a8a8a

        /*
            #8a8a8a -> 0°, 0%, 54%

            #363636 -> 0°, 0%, 21% -> -33 (MIN 33% required for correction - not lower)
            #595959 -> 0°, 0%, 35% -> -19
            #666666 -> 0°, 0%, 40% -> -14
            #6e6e6e -> 0°, 0%, 43% -> -11
            #707070 -> 0°, 0%, 44% -> -10
            #9e9e9e -> 0°, 0%, 62% -> + 8
            #a3a3a3 -> 0°, 0%, 64% -> +10
            #a6a6a6 -> 0°, 0%, 65% -> +11 (MAX 89% required for correction - not higher)
        */

        // Color correction (if source is too light or too dark)
        var hsl = this.getHsl(rgb);
        if (hsl[2] < .33) {
            rgb = this.getShiftedColor(rgb, (.33 - hsl[2]));
        } else if (hsl[2] > .89) {
            rgb = this.getShiftedColor(rgb, -(hsl[2] - .89));
        }

        let svg = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 372.57144 611.88544'%3E%3Cdefs%3E%3Cfilter id='d'%3E%3CfeGaussianBlur stdDeviation='1.88219'/%3E%3C/filter%3E%3Cfilter id='e' x='-.13781' y='-.04479' width='1.2756' height='1.0896'%3E%3CfeGaussianBlur stdDeviation='.79176'/%3E%3C/filter%3E%3ClinearGradient id='a'%3E%3Cstop stop-color='%23363636' offset='0'/%3E%3Cstop stop-color='%23363636' stop-opacity='0' offset='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b'%3E%3Cstop stop-color='%23666666' offset='0'/%3E%3Cstop stop-color='%23595959' offset='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='c'%3E%3Cstop stop-color='%23707070' offset='0'/%3E%3Cstop stop-color='%23595959' offset='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='l' x1='174.29' x2='183.57' y1='335' y2='577.86' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%236e6e6e' offset='0'/%3E%3Cstop stop-color='%238a8a8a' offset='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='m' x2='0' y1='230.07' y2='401.07' gradientUnits='userSpaceOnUse' xlink:href='%23c'/%3E%3ClinearGradient id='k' x2='0' y1='108.98' y2='-102.96' gradientUnits='userSpaceOnUse' xlink:href='%23c'/%3E%3ClinearGradient id='j' x1='171.99' x2='193.73' y1='96.159' y2='56.561' gradientUnits='userSpaceOnUse' xlink:href='%23b'/%3E%3ClinearGradient id='i' x1='171.99' x2='193.73' y1='513.74' y2='474.14' gradientUnits='userSpaceOnUse' xlink:href='%23b'/%3E%3ClinearGradient id='h' x2='0' y1='165.39' y2='25.449' gradientUnits='userSpaceOnUse' xlink:href='%23a'/%3E%3ClinearGradient id='g' x2='0' y1='283.54' y2='205.98' gradientUnits='userSpaceOnUse' xlink:href='%23a'/%3E%3ClinearGradient id='f' x2='0' y1='282.84' y2='205.27' gradientUnits='userSpaceOnUse' xlink:href='%23a'/%3E%3C/defs%3E%3Cpath d='m61.143 176h254.29c20.577 0 31.143-18.053 37.143-46.036l20-83.928c0-25.504-16.566-46.036-37.143-46.036h-294.29c-20.577 0-37.143 20.532-37.143 46.036l20 83.928c8 27.363 16.566 46.036 37.143 46.036z' fill='url(%23k)'/%3E%3Cpath d='m76.467 165.39h223.64c18.097 0 27.389-15.877 32.666-40.488l17.589-73.812c0-22.43-14.569-40.488-32.666-40.488h-258.82c-18.097 0-32.666 18.057-32.666 40.488l17.589 73.812c7.0358 24.065 14.569 40.488 32.666 40.488z' fill='url(%23h)' opacity='.25'/%3E%3Cpath d='m358.9 289.24-41.378 291.4c0 14.882-11.98 26.862-26.862 26.862h-212.83c-14.881 0-26.862-11.98-26.862-26.862l-42.739-290.04 350.67-1.362z' fill='url(%23l)'/%3E%3Cpath d='m20.977 290.54-12.75 0.03101 42.75 290.06c0 11.835 7.572 21.844 18.157 25.437-2.415-4.3701-3.813-9.412-3.813-14.781l-44.344-300.75z' fill='%23a3a3a3'/%3E%3Cpath d='m29.019 291.84-12.75 0.03119 42.75 290.06c0 7.9506 3.0632 17.905 8.5147 22.816 2.6639 2.3997 6.1672 1.442 9.6416 2.6215-2.4143-4.3704-3.8125-9.4116-3.8125-14.781l-44.344-300.75v6.1e-5z' fill='%23a3a3a3' filter='url(%23d)'/%3E%3Cpath d='m340.42 293.96 12.75 0.03119-42.75 290.06c0 8.6726-4.0655 16.364-10.403 21.27-2.3113 1.7891-4.2178 1.0863-7.0465 2.0466 2.4143-4.3704 3.1054-7.2903 3.1054-12.66l44.344-300.75v6.1e-5z' fill='%23a3a3a3' filter='url(%23d)'/%3E%3Cpath d='m348.11 290.54 12.75 0.03101-42.75 290.06c0 11.835-7.572 21.844-18.156 25.437 2.414-4.3701 3.812-9.412 3.812-14.781l44.344-300.75z' fill='%23a3a3a3'/%3E%3Cpath d='m1.089 282.9 10.375 70.406c6.7593 7.2021 16.385 11.688 27.094 11.688h294.31c9.9557 0 18.974-3.8856 25.625-10.219l9.0312-63.531c-5.3515 13.922-18.805 23.75-34.656 23.75h-294.31c-18.866 0-34.335-13.918-36.781-32.094h-0.6875z' fill='%238a8a8a'/%3E%3Cpath d='m57.143 176h254.29c20.577 0 31.143 14.566 37.143 37.143l20 67.714c0 20.577-16.566 37.143-37.143 37.143h-294.29c-20.577 0-37.143-16.566-37.143-37.143l20-67.714c8-22.077 16.566-37.143 37.143-37.143z' fill='url(%23m)'/%3E%3Cpath d='m12.375 314.02 8.4062 56.969c5.6076 3.3926 12.189 5.3438 19.25 5.3438h294.31c5.2941 0 10.326-1.1125 14.875-3.0938l7.7188-54.562c-6.2503 4.7925-14.07 7.6562-22.594 7.6562h-294.31c-11.016 0-20.873-4.7451-27.656-12.312z' fill='%23363636' opacity='.17857'/%3E%3Cpath d='m57.652 177.99c-20.577 0-29.156 15.079-37.156 37.156l-20 67.719c0 20.577 16.579 37.125 37.156 37.125h294.28c20.577 0 37.125-16.548 37.125-37.125l-20-67.719c-6-22.577-16.548-37.156-37.125-37.156h-254.28zm6.375 2.5h243.53c19.708 0 29.816 13.757 35.562 35.062l19.156 63.906c0 19.418-15.855 35.031-35.562 35.031h-281.84c-19.708 0-35.594-15.613-35.594-35.031l19.156-63.906c7.662-20.833 15.886-35.062 35.594-35.062z' fill='%23a6a6a6'/%3E%3Cpath d='m313.17 139.57-234.19-101.05c-3.0598-1.2988-6.5686 0.11888-7.8674 3.1786s0.11887 6.5686 3.1786 7.8674l234.19 101.05c3.0598 1.2988 6.5686-0.11887 7.8674-3.1786s-0.1189-6.5686-3.1786-7.8674z' fill='url(%23j)'/%3E%3Cpath d='m75.652 37.522c-2.3386-6e-3 -4.5572 1.3927-5.5312 3.6875-0.0892 0.21005-0.15485 0.41158-0.21875 0.625 1.664-1.3259 3.9902-1.7054 6.0938-0.8125l234.19 101.03c2.8378 1.2046 4.2506 4.3335 3.4062 7.2188 0.74124-0.59937 1.3501-1.4017 1.75-2.3438 1.2988-3.0598-0.0965-6.5762-3.1562-7.875l-234.19-101.03c-0.76494-0.32471-1.5642-0.49808-2.3438-0.5z' fill='%23363636' opacity='.38929'/%3E%3Cg transform='matrix(1 0 0 -1 -6.8583e-8 606.2)'%3E%3Cpath d='m313.17 557.15-234.19-101.05c-3.0598-1.2988-6.5686 0.11887-7.8674 3.1786s0.11887 6.5686 3.1786 7.8674l234.19 101.05c3.0598 1.2988 6.5686-0.11884 7.8674-3.1786s-0.1189-6.5686-3.1786-7.8674z' fill='url(%23i)'/%3E%3Cpath d='m72.526 464.7c-1.5827-1.7216-2.048-4.3027-1.012-6.5702 0.0948-0.20758 0.1992-0.392 0.31355-0.58322 0.1447 2.1227 1.4345 4.0954 3.5131 5.045l232.61 104.62c2.8041 1.281 6.0664 0.21179 7.6256-2.3585 0.05801 0.95154-0.12311 1.9423-0.54837 2.8732-1.3813 3.0234-4.9178 4.3671-7.9412 2.9858l-232.61-104.62c-0.75586-0.34531-1.4232-0.81808-1.9508-1.392z' fill='%23363636' opacity='.38929'/%3E%3C/g%3E%3Cpath d='m34.882 312.83c-9.2018-2.9784-16.709-8.7598-20.74-15.972-2.3966-4.2879-4.7158-11.761-4.7158-15.196 0-3.4583 18.785-65.742 22.308-73.962 1.489-3.4748 3.7672-8.132 5.0628-10.349 2.7296-4.6716 9.0225-11.761 9.7795-11.017 0.47365 0.46518 13.004 121.44 13.039 125.89l0.0154 1.9445-10.43-0.03796c-7.992-0.02911-11.339-0.33227-14.319-1.2969z' fill='url(%23g)' opacity='.25'/%3E%3Cpath d='m335.4 312.13c9.2018-2.9784 16.709-8.7598 20.74-15.972 2.3966-4.2879 4.7158-11.761 4.7158-15.196 0-3.4583-18.785-65.742-22.308-73.962-1.489-3.4748-3.7672-8.132-5.0628-10.349-2.7296-4.6716-9.0225-11.761-9.7795-11.017-0.47363 0.46518-13.004 121.44-13.039 125.89l-0.01538 1.9446 10.43-0.03803c7.992-0.02911 11.339-0.33227 14.319-1.2969z' fill='url(%23f)' opacity='.25'/%3E%3Cpath d='m1.089 282.9 10.375 70.406c6.7593 7.2021 16.385 11.688 27.094 11.688h294.31c9.9557 0 18.974-3.8856 25.625-10.219l9.0312-63.531c-5.3515 13.922-18.805 23.75-34.656 23.75h-294.31c-18.866 0-34.335-13.918-36.781-32.094h-0.6875z' fill='%238a8a8a'/%3E%3Cpath d='m5.4681 293.44s8.1317 15.556 22.981 19.445l3.182 49.498c-14.142 1.0607-19.445-8.8388-19.445-8.8388l-6.7175-60.104z' fill='%239e9e9e' filter='url(%23e)'/%3E%3Cpath d='m366.63 293.44s-8.1317 15.556-22.981 19.445l-3.182 49.498c14.142 1.0607 19.445-8.8388 19.445-8.8388l6.7175-60.104z' fill='%239e9e9e' filter='url(%23e)'/%3E%3C/svg%3E\")";

        return svg.replace(/%23([a-f\d]{6})/gi, function (x) {
            switch (x) {
                case '%238a8a8a':
                    return '%23' + rgb;
                    break;
                case '%23363636':
                    return '%23' + vis.binds['trashschedule'].getShiftedColor(rgb, -.33);
                    break;
                case '%23595959':
                    return '%23' + vis.binds['trashschedule'].getShiftedColor(rgb, -.19);
                    break;
                case '%23666666':
                    return '%23' + vis.binds['trashschedule'].getShiftedColor(rgb, -.14);
                    break;
                case '%236e6e6e':
                    return '%23' + vis.binds['trashschedule'].getShiftedColor(rgb, -.11);
                    break;
                case '%23707070':
                    return '%23' + vis.binds['trashschedule'].getShiftedColor(rgb, -.10);
                    break;
                case '%239e9e9e':
                    return '%23' + vis.binds['trashschedule'].getShiftedColor(rgb, .08);
                    break;
                case '%23a3a3a3':
                    return '%23' + vis.binds['trashschedule'].getShiftedColor(rgb, .1);
                    break;
                case '%23a6a6a6':
                    return '%23' + vis.binds['trashschedule'].getShiftedColor(rgb, .11);
                    break;
            }
            return x;
        });
    },
    redraw: function (target, json, size, limit, glow, glowLimit, showName, showDate, dateLocale, dateOptions) {

        if (json) {
            target.empty();
            var rendered = 0;

            if (size < 100 && size > 0) {
                target.css('transform', 'scale(' + (size / 100) + ')');
            }

            $.each(JSON.parse(json), function (i, trashType) {

                if (!trashType._completed) {
                    if (limit === 0 || rendered < limit) {
                        var newItem = $('<div class="trashtype"></div>');

                        if (trashType.daysLeft == 1) {
                            newItem.addClass('trash-tomorrow');
                        }

                        if (trashType.daysLeft == 0) {
                            newItem.addClass('trash-today');
                        }

                        if (glow && trashType.daysLeft <= glowLimit) {
                            newItem.addClass('trash-glow');
                        }

                        if (showName) {
                            $('<span class="name"></span>').html(trashType.name).appendTo(newItem);
                        }

                        $('<div class="dumpster"></div>').html(trashType.daysLeft).wrapInner('<span class="daysleft"></span>').appendTo(newItem);

                        if (showDate) {
                            $('<span class="nextdate"></span>').html(new Date(trashType.nextDate).toLocaleDateString(dateLocale, dateOptions)).appendTo(newItem);
                        }

                        if (trashType._color) {
                            newItem.find('.dumpster').css('background-image', url('data:image/jpeg;base64,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'));
                        }

                        target.append(newItem);
                        rendered++;
                    }
                }
            });
        }

    }
};

vis.binds['trashschedule'].showVersion();
