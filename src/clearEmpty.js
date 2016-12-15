/**
 * Created by Yinxiong on 2016/12/15.
 */

import _ from 'lodash';
export default function (obj) {
    let query = {};
    _.forEach(obj, (value, key) => {
        if (value || parseInt(value) == 0) {
            query[key] = value;
        }
    });
    return query;
}