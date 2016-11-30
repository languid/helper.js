/**
 * Created by Yinxiong on 2016/5/10 0010.
 */

import moment from 'moment';

export const DATE_FORMAT = {
    LOCAL_FORMAT: 'LL',
    YMD_FORMAT: 'YYYY-MM-DD'
};

/**
 * 快捷方法，添加format方法
 * @param arr
 * @returns {*}
 */
export function toRangeArray(arr) {
    arr.format = function () {
        return [this[0].format(DATE_FORMAT.YMD_FORMAT), this[1].format(DATE_FORMAT.YMD_FORMAT)];
    };
    return arr;
}

export function thisDay() {
    return toRangeArray([moment(), moment()]);
}

export function thisWeek() {
    let today = moment();
    let endWeek = moment().endOf('week');
    return toRangeArray([moment().startOf('week'), endWeek.isAfter(today) ? today : endWeek]);
}

export function thisMonth() {
    let today = moment();
    let endMonth = moment().endOf('month');
    return toRangeArray([moment().startOf('month'), endMonth.isAfter(today) ? today : endMonth]);
}

export function thisYear() {
    let today = moment();
    let endYear = moment().endOf('year');
    return toRangeArray([moment().startOf('year'), endYear.isAfter(today) ? today : endYear]);
}

export function yesterday() {
    let m = moment().subtract(1, 'days');
    return toRangeArray([m, m]);
}

/**
 * 前几天
 * @param count
 * @returns {*}
 */
export function lastDay(count = 1) {
    return toRangeArray([moment().subtract(count, 'days'), moment().subtract(1, 'days')]);
}

/**
 * 前几周
 * @param count
 * @returns {*}
 */
export function lastWeek(count = 1) {
    return toRangeArray([moment().subtract(count, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')]);
}

/**
 * 前几个月
 * @param count
 * @returns {*}
 */
export function lastMonth(count = 1) {
    return toRangeArray([moment().subtract(count, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]);
}

/**
 * 前几年
 * @param count
 * @returns {*}
 */
export function lastYear(count = 1) {
    return toRangeArray([moment().subtract(count, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]);
}

/**
 * 近几周
 * @param count
 * @returns {array}
 */
export function nearlyWeek(count = 1) {
    return toRangeArray([moment().subtract(count, 'week'), moment().subtract(1, 'days')]);
}

/**
 * 近几个月
 * @param count
 * @returns {array}
 */
export function nearlyMonth(count = 1) {
    return toRangeArray([moment().subtract(count, 'month'), moment().subtract(1, 'days')]);
}

/**
 * 近几年
 * @param count
 * @returns {*}
 */
export function nearlyYear(count = 1) {
    return toRangeArray([moment().subtract(count, 'year'), moment().subtract(1, 'days')]);
}


export function formatDate(date, format = DATE_FORMAT.YMD_FORMAT) {
    return moment(date).format(format);
}