import { Injectable, NgModule, Pipe } from '@angular/core';
import { FsMath, FsUtil } from '@firestitch/common';
import moment from 'moment-timezone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FsDate } from 'fsdate.service';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SECONDS = {
    YEAR: 3600 * 24 * 365,
    MONTH: 3600 * 24 * 30.417,
    DAY: 3600 * 24,
    HOUR: 3600,
    MINUTE: 60
};
var FsDate$1 = (function () {
    function FsDate$$1(FsUtil$$1, FsMath$$1) {
        this.FsUtil = FsUtil$$1;
        this.FsMath = FsMath$$1;
    }
    /**
     * @param {?} time
     * @param {?} options
     * @return {?}
     */
    FsDate$$1.prototype.duration = /**
     * @param {?} time
     * @param {?} options
     * @return {?}
     */
    function (time, options) {
        if (!this.FsUtil.isNumeric(time)) {
            return '';
        }
        if (typeof options === 'string') {
            options = this.formatOptions(options);
        }
        options = Object.assign({}, options);
        options.unit = options.unit === undefined ? 'second' : options.unit;
        options.abr = options.abr === undefined ? true : options.abr;
        options.suffix = options.suffix === true ? (time > 0 ? " ago" : " from now") : "";
        options.seconds = options.seconds === undefined ? true : options.seconds;
        options.minutes = options.minutes === undefined ? true : options.minutes;
        options.hours = options.hours === undefined ? true : options.hours;
        options.days = options.days === undefined ? true : options.days;
        options.months = options.months === undefined ? true : options.months;
        options.years = options.years === undefined ? true : options.years;
        if (options.unit === 'minute') {
            time = time * 60;
        }
        else if (options.unit === 'hour') {
            time = time * 60 * 60;
        }
        time = Math.abs(parseInt(time));
        var /** @type {?} */ units = {
            years: { abr: 'Y', single: 'year', plural: 'years', seconds: SECONDS.YEAR, next: 'months' },
            months: { abr: 'M', single: 'month', plural: 'months', seconds: SECONDS.MONTH, next: 'days' },
            days: { abr: 'd', single: 'day', plural: 'days', seconds: SECONDS.DAY, next: 'hours' },
            hours: { abr: 'h', single: 'hour', plural: 'hours', seconds: SECONDS.HOUR, next: 'months' },
            minutes: { abr: 'm', single: 'minute', plural: 'minutes', seconds: SECONDS.MINUTE, next: 'seconds' },
            seconds: { abr: 's', single: 'second', plural: 'seconds', seconds: 1, next: null },
        };
        var /** @type {?} */ pieces = {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        var /** @type {?} */ remainder = time;
        if (options.years) {
            var /** @type {?} */ years = remainder / SECONDS.YEAR;
            if (years >= 1) {
                pieces.years = Math.floor(years);
                remainder = remainder - (pieces.years * SECONDS.YEAR);
            }
        }
        if (options.months) {
            var /** @type {?} */ months = remainder / SECONDS.MONTH;
            if (months >= 1) {
                pieces.months = Math.floor(months);
                remainder = remainder - (pieces.months * SECONDS.MONTH);
            }
        }
        if (options.days) {
            var /** @type {?} */ days = remainder / SECONDS.DAY;
            if (days >= 1) {
                pieces.days = Math.floor(days);
                remainder = remainder - (pieces.days * SECONDS.DAY);
            }
        }
        if (options.hours) {
            var /** @type {?} */ hours = remainder / SECONDS.HOUR;
            if (hours >= 1) {
                pieces.hours = Math.floor(hours);
                remainder = remainder - (pieces.hours * SECONDS.HOUR);
            }
        }
        if (options.minutes) {
            var /** @type {?} */ minutes = remainder / 60;
            if (minutes >= 1) {
                pieces.minutes = Math.floor(minutes);
                remainder = remainder - (pieces.minutes * SECONDS.MINUTE);
            }
        }
        pieces.seconds = Math.floor(remainder);
        var /** @type {?} */ enabled = [], /** @type {?} */ total_seconds = 0;
        for (var /** @type {?} */ name_1 in units) {
            if (units.hasOwnProperty(name_1)) {
                if (options[name_1]) {
                    enabled.push(name_1);
                }
                total_seconds += pieces[name_1] * units[name_1].seconds;
            }
        }
        var /** @type {?} */ output = [];
        if (enabled.length === 1) {
            var /** @type {?} */ precision = options.precision === undefined ? 1 : options.precision;
            var /** @type {?} */ name_2 = enabled.join('');
            var /** @type {?} */ value = this.FsMath.round(total_seconds / units[name_2]['seconds'], precision);
            output.push(value + (options.abr ? units[name_2].abr : ' ' + (value == 1 ? units[name_2].single : units[name_2].plural)));
        }
        else {
            var /** @type {?} */ precision = options.precision === undefined ? 2 : options.precision;
            for (var /** @type {?} */ name_3 in units) {
                if (units.hasOwnProperty(name_3)) {
                    if (precision && output.length >= precision) {
                        continue;
                    }
                    if (options[name_3]) {
                        var /** @type {?} */ value = pieces[name_3];
                        if (value) {
                            output.push(value + (options.abr ? units[name_3].abr : ' ' + (value == 1 ? units[name_3].single : units[name_3].plural)));
                        }
                    }
                }
            }
        }
        //there are no values so show zero of the smallest unit (i.e. "0s")
        if (output.length === 0) {
            for (var /** @type {?} */ name_4 in units) {
                if (units.hasOwnProperty(name_4)) {
                    if (options[name_4]) {
                        output = ['0' + (options.abr ? units[name_4].abr : ' ' + (units[name_4] == 1 ? units[name_4].single : units[name_4].plural))];
                    }
                }
            }
        }
        //add suffix if required
        if (options.suffix) {
            output.push(options.suffix);
        }
        return output.join(' ');
    };
    /**
     * @param {?} time
     * @param {?=} options
     * @return {?}
     */
    FsDate$$1.prototype.granularDuration = /**
     * @param {?} time
     * @param {?=} options
     * @return {?}
     */
    function (time, options) {
        if (options === void 0) { options = {}; }
        options['seconds'] = options['seconds'] === undefined ? false : options['seconds'];
        options['months'] = options['months'] === undefined ? false : options['months'];
        options['years'] = options['years'] === undefined ? false : options['years'];
        options['precision'] = options['precision'] === undefined ? 3 : options['precision'];
        return this.duration(time, options);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    FsDate$$1.prototype.iso8601 = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!date) {
            return '';
        }
        return moment(date).format();
    };
    /**
     * @param {?} date
     * @param {?=} format
     * @return {?}
     */
    FsDate$$1.prototype.ago = /**
     * @param {?} date
     * @param {?=} format
     * @return {?}
     */
    function (date, format) {
        if (format === void 0) { format = 'date'; }
        if (!date) {
            return '';
        }
        var /** @type {?} */ min_diff = this.FsMath.round(moment().diff(date, 'minute', true), 0);
        var /** @type {?} */ hour_diff = this.FsMath.round(moment().diff(date, 'hour', true), 0);
        if (Math.abs(hour_diff) >= 24) {
            if (moment(date).year() == moment().year()) {
                return this.format(date, 'date-yearless');
            }
            else {
                return this.format(date, format);
            }
        }
        else if (hour_diff == 0 && min_diff == 0) {
            return 'now';
        }
        else {
            return this.duration(min_diff, {
                unit: 'minute',
                suffix: true,
                seconds: false
            });
        }
    };
    /**
     * @param {?} date
     * @param {?=} format
     * @return {?}
     */
    FsDate$$1.prototype.format = /**
     * @param {?} date
     * @param {?=} format
     * @return {?}
     */
    function (date, format) {
        var /** @type {?} */ output_format = this.get_format_string(date, format);
        return moment(date).format(output_format);
    };
    /**
     * @param {?} from
     * @param {?} to
     * @param {?=} format
     * @return {?}
     */
    FsDate$$1.prototype.range = /**
     * @param {?} from
     * @param {?} to
     * @param {?=} format
     * @return {?}
     */
    function (from, to, format) {
        if (format === void 0) { format = 'date'; }
        var /** @type {?} */ format_parts = format.split('-');
        var /** @type {?} */ from_format = this.get_format_string(from, format);
        var /** @type {?} */ to_format = this.get_format_string(to, format);
        from = moment(from);
        to = moment(to);
        if (from.diff(to) == 0) {
            return from.format(from_format);
        }
        if (format_parts.indexOf('time') !== -1) {
            //date and time
            if (from.year() == to.year()) {
                to_format = to_format.replace(' YYYY', '').replace(',', '');
                if (from.month() == to.month()) {
                    if (from.day() == to.day()) {
                        to_format = to_format
                            .replace(' MMMM', '')
                            .replace(' MMM', '')
                            .replace('dddd', '')
                            .replace('ddd', '')
                            .replace(' Do', '')
                            .replace(' D', '');
                    }
                    else {
                        //add comma after day
                        to_format = to_format
                            .replace(' Do', ' Do,')
                            .replace(' D', ' D,');
                    }
                }
                else {
                    //add comma after day
                    to_format = to_format
                        .replace(' Do', ' Do,')
                        .replace(' D', ' D,');
                }
            }
        }
        else {
            //date only
            if (from.year() == to.year()) {
                from_format = from_format.replace(' YYYY', '').replace(',', '');
                if (from.month() == to.month()) {
                    if (format_parts.indexOf('day') == -1) {
                        to_format = to_format.replace(' MMMM', '').replace(' MMM', '');
                    }
                    if (from.day() == to.day()) {
                        if (format_parts.indexOf('time') == -1) {
                            from_format = this.get_format_string(from, format);
                            to_format = '';
                        }
                    }
                }
            }
        }
        var /** @type {?} */ output = from.format(from_format);
        if (to_format) {
            output += ' - ' + to.format(to_format);
        }
        return output;
    };
    /**
     * @param {?} date
     * @param {?=} format
     * @return {?}
     */
    FsDate$$1.prototype.get_format_string = /**
     * @param {?} date
     * @param {?=} format
     * @return {?}
     */
    function (date, format) {
        if (format === void 0) { format = 'date'; }
        var /** @type {?} */ format_parts = format.split('-');
        var /** @type {?} */ date_format = '';
        var /** @type {?} */ time_format = '';
        if (format_parts.indexOf('date') != -1) {
            var /** @type {?} */ dayofweek_format = void 0, /** @type {?} */ month_format = void 0, /** @type {?} */ day_format = void 0, /** @type {?} */ year_format = void 0;
            //day of week
            if (format_parts.indexOf('day') != -1) {
                dayofweek_format = format_parts.indexOf('full') != -1 ? 'dddd' : 'ddd';
            }
            else {
                dayofweek_format = '';
            }
            //month
            month_format = format_parts.indexOf('full') != -1 ? ' MMMM' : ' MMM';
            //day
            if (format_parts.indexOf('dayless') != -1) {
                day_format = '';
            }
            else {
                day_format = format_parts.indexOf('ordinal') != -1 ? ' Do' : ' D';
            }
            //year
            year_format = format_parts.indexOf('yearless') != -1 ? '' : ' YYYY';
            if (day_format && year_format) {
                year_format = "," + year_format;
            }
            date_format = dayofweek_format + month_format + day_format + year_format;
        }
        if (format_parts.indexOf('time') != -1) {
            time_format = format_parts.indexOf('24') != -1 ? 'HH:mm' : 'h:mma';
            if (format_parts.indexOf('tz') != -1) {
                time_format += ' [' + moment.tz(date, moment.tz.guess()).format('z') + ']';
            }
            if (format_parts.indexOf('gmt') != -1) {
                var /** @type {?} */ offset = new Date().getTimezoneOffset() / 60;
                time_format += ' [GMT' + (offset > -.1 ? '+' : '') + offset + ']';
            }
        }
        date_format = date_format.trim();
        time_format = time_format.trim();
        return date_format + (date_format && time_format ? ' ' : '') + time_format;
    };
    /**
     * @param {?} options
     * @return {?}
     */
    FsDate$$1.prototype.formatOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        options = { seconds: !!options.match(/second/),
            minutes: !!options.match(/minute/),
            hours: !!options.match(/hour/),
            days: !!options.match(/day/),
            months: !!options.match(/month/),
            years: !!options.match(/year/) };
        var /** @type {?} */ precision = 0;
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            if (option) {
                precision++;
            }
        }
        
        options.precision = precision;
        return options;
    };
    FsDate$$1.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FsDate$$1.ctorParameters = function () { return [
        { type: FsUtil, },
        { type: FsMath, },
    ]; };
    return FsDate$$1;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FsDatePipe = (function () {
    function FsDatePipe(FsDate$$1) {
        this.FsDate = FsDate$$1;
    }
    /**
     * @param {?} value
     * @param {?=} format
     * @return {?}
     */
    FsDatePipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} format
     * @return {?}
     */
    function (value, format) {
        return this.FsDate.format(value, format);
    };
    FsDatePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'fsDate'
                },] },
    ];
    /** @nocollapse */
    FsDatePipe.ctorParameters = function () { return [
        { type: FsDate$1, },
    ]; };
    return FsDatePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FsDateAgoPipe = (function () {
    function FsDateAgoPipe(FsDate$$1) {
        this.FsDate = FsDate$$1;
    }
    /**
     * @param {?} value
     * @param {?=} format
     * @return {?}
     */
    FsDateAgoPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} format
     * @return {?}
     */
    function (value, format) {
        return this.FsDate.ago(value, format);
    };
    FsDateAgoPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'fsDateAgo'
                },] },
    ];
    /** @nocollapse */
    FsDateAgoPipe.ctorParameters = function () { return [
        { type: FsDate$1, },
    ]; };
    return FsDateAgoPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//this one is some ugly list parsed from some website, if we are to use moment.js I'll just get abbreviation from there, if not I'll clean up this one
var TIMEZONES = [
    { name: 'A', value: "1" },
    { name: 'ACDT', value: "10:30" },
    { name: 'ACST', value: "9:30" },
    { name: 'ADT', value: "-3" },
    { name: 'ADT', value: "-3" },
    { name: 'AEDT', value: "11" },
    { name: 'AEST', value: "10" },
    { name: 'AFT', value: "4:30" },
    { name: 'AKDT', value: "-8" },
    { name: 'AKST', value: "-9" },
    { name: 'ALMT', value: "6" },
    { name: 'AMST', value: "5" },
    { name: 'AMST', value: "-3" },
    { name: 'AMT', value: "4" },
    { name: 'AMT', value: "-4" },
    { name: 'ANAST', value: "12" },
    { name: 'ANAT', value: "12" },
    { name: 'AQTT', value: "5" },
    { name: 'ART', value: "-3" },
    { name: 'AST', value: "3" },
    { name: 'AST', value: "-4" },
    { name: 'AWDT', value: "9" },
    { name: 'AWST', value: "8" },
    { name: 'AZOST', value: "0" },
    { name: 'AZOT', value: "-1" },
    { name: 'AZST', value: "5" },
    { name: 'AZT', value: "4" },
    { name: 'B', value: "2" },
    { name: 'BNT', value: "8" },
    { name: 'BOT', value: "-4" },
    { name: 'BRST', value: "-2" },
    { name: 'BRT', value: "-3" },
    { name: 'BST', value: "6" },
    { name: 'BST', value: "1" },
    { name: 'BTT', value: "6" },
    { name: 'C', value: "3" },
    { name: 'CAST', value: "8" },
    { name: 'CAT', value: "2" },
    { name: 'CCT', value: "6:30" },
    { name: 'CDT', value: "-4" },
    { name: 'CDT', value: "-5" },
    { name: 'CEST', value: "2" },
    { name: 'CET', value: "1" },
    { name: 'CHADT', value: "13:45" },
    { name: 'CHAST', value: "12:45" },
    { name: 'CKT', value: "-10" },
    { name: 'CLST', value: "-3" },
    { name: 'CLT', value: "-4" },
    { name: 'COT', value: "-5" },
    { name: 'CST', value: "8" },
    { name: 'CST', value: "-6" },
    { name: 'CST', value: "-5" },
    { name: 'CVT', value: "-1" },
    { name: 'CXT', value: "7" },
    { name: 'ChST', value: "10" },
    { name: 'D', value: "4" },
    { name: 'DAVT', value: "7" },
    { name: 'E', value: "5" },
    { name: 'EASST', value: "-5" },
    { name: 'EAST', value: "-6" },
    { name: 'EAT', value: "3" },
    { name: 'EAT', value: "3" },
    { name: 'ECT', value: "-5" },
    { name: 'EDT', value: "-4" },
    { name: 'EEST', value: "3" },
    { name: 'EET', value: "2" },
    { name: 'EGST', value: "0" },
    { name: 'EGT', value: "-1" },
    { name: 'EST', value: "-5" },
    { name: 'ET', value: "-5" },
    { name: 'F', value: "6" },
    { name: 'FJST', value: "13" },
    { name: 'FJT', value: "12" },
    { name: 'FKST', value: "-3" },
    { name: 'FKT', value: "-4" },
    { name: 'FNT', value: "-2" },
    { name: 'G', value: "7" },
    { name: 'GALT', value: "-6" },
    { name: 'GAMT', value: "-9" },
    { name: 'GET', value: "4" },
    { name: 'GFT', value: "-3" },
    { name: 'GILT', value: "12" },
    { name: 'GMT', value: "0" },
    { name: 'GST', value: "4" },
    { name: 'GYT', value: "-4" },
    { name: 'H', value: "8" },
    { name: 'HAA', value: "-3" },
    { name: 'HAC', value: "-5" },
    { name: 'HADT', value: "-9" },
    { name: 'HAE', value: "-4" },
    { name: 'HAP', value: "-7" },
    { name: 'HAR', value: "-6" },
    { name: 'HAST', value: "-10" },
    { name: 'HAT', value: "-2:30" },
    { name: 'HAY', value: "-8" },
    { name: 'HKT', value: "8" },
    { name: 'HLV', value: "-4:30" },
    { name: 'HNA', value: "-4" },
    { name: 'HNC', value: "-6" },
    { name: 'HNE', value: "-5" },
    { name: 'HNP', value: "-8" },
    { name: 'HNR', value: "-7" },
    { name: 'HNT', value: "-3:30" },
    { name: 'HNY', value: "-9" },
    { name: 'HOVT', value: "7" },
    { name: 'I', value: "9" },
    { name: 'ICT', value: "7" },
    { name: 'IDT', value: "3" },
    { name: 'IOT', value: "6" },
    { name: 'IRDT', value: "4:30" },
    { name: 'IRKST', value: "9" },
    { name: 'IRKT', value: "9" },
    { name: 'IRST', value: "3:30" },
    { name: 'IST', value: "2" },
    { name: 'IST', value: "5:30" },
    { name: 'IST', value: "1" },
    { name: 'JST', value: "9" },
    { name: 'K', value: "10" },
    { name: 'KGT', value: "6" },
    { name: 'KRAST', value: "8" },
    { name: 'KRAT', value: "8" },
    { name: 'KST', value: "9" },
    { name: 'KUYT', value: "4" },
    { name: 'L', value: "11" },
    { name: 'LHDT', value: "11" },
    { name: 'LHST', value: "10:30" },
    { name: 'LINT', value: "14" },
    { name: 'M', value: "12" },
    { name: 'MAGST', value: "12" },
    { name: 'MAGT', value: "12" },
    { name: 'MART', value: "-9:30" },
    { name: 'MAWT', value: "5" },
    { name: 'MDT', value: "-6" },
    { name: 'MESZ', value: "2" },
    { name: 'MEZ', value: "1" },
    { name: 'MHT', value: "12" },
    { name: 'MMT', value: "6:30" },
    { name: 'MSD', value: "4" },
    { name: 'MSK', value: "4" },
    { name: 'MST', value: "-7" },
    { name: 'MUT', value: "4" },
    { name: 'MVT', value: "5" },
    { name: 'MYT', value: "8" },
    { name: 'N', value: "-1" },
    { name: 'NCT', value: "11" },
    { name: 'NDT', value: "-2:30" },
    { name: 'NFT', value: "11:30" },
    { name: 'NOVST', value: "7" },
    { name: 'NOVT', value: "6" },
    { name: 'NPT', value: "5:45" },
    { name: 'NST', value: "-3:30" },
    { name: 'NUT', value: "-11" },
    { name: 'NZDT', value: "13" },
    { name: 'NZST', value: "12" },
    { name: 'O', value: "-2" },
    { name: 'OMSST', value: "7" },
    { name: 'OMST', value: "7" },
    { name: 'P', value: "-3" },
    { name: 'PDT', value: "-7" },
    { name: 'PET', value: "-5" },
    { name: 'PETST', value: "12" },
    { name: 'PETT', value: "12" },
    { name: 'PGT', value: "10" },
    { name: 'PHOT', value: "13" },
    { name: 'PHT', value: "8" },
    { name: 'PKT', value: "5" },
    { name: 'PMDT', value: "-2" },
    { name: 'PMST', value: "-3" },
    { name: 'PONT', value: "11" },
    { name: 'PST', value: "-8" },
    { name: 'PST', value: "-8" },
    { name: 'PT', value: "-8" },
    { name: 'PWT', value: "9" },
    { name: 'PYST', value: "-3" },
    { name: 'PYT', value: "-4" },
    { name: 'Q', value: "-4" },
    { name: 'R', value: "-5" },
    { name: 'RET', value: "4" },
    { name: 'S', value: "-6" },
    { name: 'SAMT', value: "4" },
    { name: 'SAST', value: "2" },
    { name: 'SBT', value: "11" },
    { name: 'SCT', value: "4" },
    { name: 'SGT', value: "8" },
    { name: 'SRT', value: "-3" },
    { name: 'SST', value: "-11" },
    { name: 'T', value: "-7" },
    { name: 'TAHT', value: "-10" },
    { name: 'TFT', value: "5" },
    { name: 'TJT', value: "5" },
    { name: 'TKT', value: "13" },
    { name: 'TLT', value: "9" },
    { name: 'TMT', value: "5" },
    { name: 'TVT', value: "12" },
    { name: 'U', value: "-8" },
    { name: 'ULAT', value: "8" },
    { name: 'UTC', value: "0" },
    { name: 'UYST', value: "-2" },
    { name: 'UYT', value: "-3" },
    { name: 'UZT', value: "5" },
    { name: 'V', value: "-9" },
    { name: 'VET', value: "-4:30" },
    { name: 'VLAST', value: "11" },
    { name: 'VLAT', value: "11" },
    { name: 'VUT', value: "11" },
    { name: 'W', value: "-10" },
    { name: 'WAST', value: "2" },
    { name: 'WAT', value: "1" },
    { name: 'WEST', value: "1" },
    { name: 'WESZ', value: "1" },
    { name: 'WET', value: "0" },
    { name: 'WEZ', value: "0" },
    { name: 'WFT', value: "12" },
    { name: 'WGST', value: "-2" },
    { name: 'WGT', value: "-3" },
    { name: 'WIB', value: "7" },
    { name: 'WIT', value: "9" },
    { name: 'WITA', value: "8" },
    { name: 'WST', value: "1" },
    { name: 'WST', value: "13" },
    { name: 'WT', value: "0" },
    { name: 'X', value: "-11" },
    { name: 'Y', value: "-12" },
    { name: 'YAKST', value: "10" },
    { name: 'YAKT', value: "10" },
    { name: 'YAPT', value: "10" },
    { name: 'YEKST', value: "6" },
    { name: 'YEKT', value: "6" },
    { name: 'Z', value: "0" },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FsDateModule = (function () {
    function FsDateModule() {
    }
    /**
     * @return {?}
     */
    FsDateModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: FsDateModule,
            providers: [FsDate]
        };
    };
    FsDateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule
                    ],
                    declarations: [
                        FsDatePipe,
                        FsDateAgoPipe
                    ],
                    providers: [
                        FsDate,
                        FsMath,
                        FsUtil
                    ],
                    exports: [
                        FsDatePipe,
                        FsDateAgoPipe
                    ]
                },] },
    ];
    /** @nocollapse */
    FsDateModule.ctorParameters = function () { return []; };
    return FsDateModule;
}());

export { FsDateModule, FsDatePipe, TIMEZONES, SECONDS, FsDate$1 as FsDate, FsDateAgoPipe };
