"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@firestitch/common");
var moment = require("moment-timezone");
exports.SECONDS = {
    YEAR: 3600 * 24 * 365,
    MONTH: 3600 * 24 * 30.417,
    DAY: 3600 * 24,
    HOUR: 3600,
    MINUTE: 60
};
var FsDate = (function () {
    function FsDate(FsUtil, FsMath) {
        this.FsUtil = FsUtil;
        this.FsMath = FsMath;
    }
    FsDate.prototype.duration = function (time, options) {
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
        var units = {
            years: { abr: 'Y', single: 'year', plural: 'years', seconds: exports.SECONDS.YEAR, next: 'months' },
            months: { abr: 'M', single: 'month', plural: 'months', seconds: exports.SECONDS.MONTH, next: 'days' },
            days: { abr: 'd', single: 'day', plural: 'days', seconds: exports.SECONDS.DAY, next: 'hours' },
            hours: { abr: 'h', single: 'hour', plural: 'hours', seconds: exports.SECONDS.HOUR, next: 'months' },
            minutes: { abr: 'm', single: 'minute', plural: 'minutes', seconds: exports.SECONDS.MINUTE, next: 'seconds' },
            seconds: { abr: 's', single: 'second', plural: 'seconds', seconds: 1, next: null },
        };
        var pieces = {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        var remainder = time;
        if (options.years) {
            var years = remainder / exports.SECONDS.YEAR;
            if (years >= 1) {
                pieces.years = Math.floor(years);
                remainder = remainder - (pieces.years * exports.SECONDS.YEAR);
            }
        }
        if (options.months) {
            var months = remainder / exports.SECONDS.MONTH;
            if (months >= 1) {
                pieces.months = Math.floor(months);
                remainder = remainder - (pieces.months * exports.SECONDS.MONTH);
            }
        }
        if (options.days) {
            var days = remainder / exports.SECONDS.DAY;
            if (days >= 1) {
                pieces.days = Math.floor(days);
                remainder = remainder - (pieces.days * exports.SECONDS.DAY);
            }
        }
        if (options.hours) {
            var hours = remainder / exports.SECONDS.HOUR;
            if (hours >= 1) {
                pieces.hours = Math.floor(hours);
                remainder = remainder - (pieces.hours * exports.SECONDS.HOUR);
            }
        }
        if (options.minutes) {
            var minutes = remainder / 60;
            if (minutes >= 1) {
                pieces.minutes = Math.floor(minutes);
                remainder = remainder - (pieces.minutes * exports.SECONDS.MINUTE);
            }
        }
        pieces.seconds = Math.floor(remainder);
        var enabled = [], total_seconds = 0;
        for (var name_1 in units) {
            if (units.hasOwnProperty(name_1)) {
                if (options[name_1]) {
                    enabled.push(name_1);
                }
                total_seconds += pieces[name_1] * units[name_1].seconds;
            }
        }
        var output = [];
        if (enabled.length === 1) {
            var precision = options.precision === undefined ? 1 : options.precision;
            var name_2 = enabled.join('');
            var value = this.FsMath.round(total_seconds / units[name_2]['seconds'], precision);
            output.push(value + (options.abr ? units[name_2].abr : ' ' + (value == 1 ? units[name_2].single : units[name_2].plural)));
        }
        else {
            var precision = options.precision === undefined ? 2 : options.precision;
            for (var name_3 in units) {
                if (units.hasOwnProperty(name_3)) {
                    if (precision && output.length >= precision) {
                        continue;
                    }
                    if (options[name_3]) {
                        var value = pieces[name_3];
                        if (value) {
                            output.push(value + (options.abr ? units[name_3].abr : ' ' + (value == 1 ? units[name_3].single : units[name_3].plural)));
                        }
                    }
                }
            }
        }
        //there are no values so show zero of the smallest unit (i.e. "0s")
        if (output.length === 0) {
            for (var name_4 in units) {
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
    FsDate.prototype.granularDuration = function (time, options) {
        if (options === void 0) { options = {}; }
        options['seconds'] = options['seconds'] === undefined ? false : options['seconds'];
        options['months'] = options['months'] === undefined ? false : options['months'];
        options['years'] = options['years'] === undefined ? false : options['years'];
        options['precision'] = options['precision'] === undefined ? 3 : options['precision'];
        return this.duration(time, options);
    };
    FsDate.prototype.iso8601 = function (date) {
        if (!date) {
            return '';
        }
        return moment(date).format();
    };
    FsDate.prototype.ago = function (date, format) {
        if (format === void 0) { format = 'date'; }
        if (!date) {
            return '';
        }
        var min_diff = this.FsMath.round(moment().diff(date, 'minute', true), 0);
        var hour_diff = this.FsMath.round(moment().diff(date, 'hour', true), 0);
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
    FsDate.prototype.format = function (date, format) {
        var output_format = this.get_format_string(date, format);
        return moment(date).format(output_format);
    };
    FsDate.prototype.range = function (from, to, format) {
        if (format === void 0) { format = 'date'; }
        var format_parts = format.split('-');
        var from_format = this.get_format_string(from, format);
        var to_format = this.get_format_string(to, format);
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
        var output = from.format(from_format);
        if (to_format) {
            output += ' - ' + to.format(to_format);
        }
        return output;
    };
    FsDate.prototype.get_format_string = function (date, format) {
        if (format === void 0) { format = 'date'; }
        var format_parts = format.split('-');
        var date_format = '';
        var time_format = '';
        if (format_parts.indexOf('date') != -1) {
            var dayofweek_format = void 0, month_format = void 0, day_format = void 0, year_format = void 0;
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
                var offset = new Date().getTimezoneOffset() / 60;
                time_format += ' [GMT' + (offset > -.1 ? '+' : '') + offset + ']';
            }
        }
        date_format = date_format.trim();
        time_format = time_format.trim();
        return date_format + (date_format && time_format ? ' ' : '') + time_format;
    };
    FsDate.prototype.formatOptions = function (options) {
        options = { seconds: !!options.match(/second/),
            minutes: !!options.match(/minute/),
            hours: !!options.match(/hour/),
            days: !!options.match(/day/),
            months: !!options.match(/month/),
            years: !!options.match(/year/) };
        var precision = 0;
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            if (option) {
                precision++;
            }
        }
        ;
        options.precision = precision;
        return options;
    };
    FsDate = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [common_1.FsUtil, common_1.FsMath])
    ], FsDate);
    return FsDate;
}());
exports.FsDate = FsDate;
//# sourceMappingURL=fsdate.service.js.map