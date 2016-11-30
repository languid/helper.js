/**
 * Created by Yinxiong on 2016/11/20.
 */

import $ from 'jquery';
import {isArray} from 'lodash';
import noop from './noop';

let pending = 0;

/**
 *
 * @param elements
 * @param callback
 * @returns {Function}
 */
export default function(elements, callback=noop) {

    const $document = $(document);

    let els = (!isArray(elements) ? [elements] : $.makeArray(elements)).map(function (element) {
        return element && element.jquery ? element[0] : element;
    });

    let len = els.length;

    let name = 'mousedown.clickDocumentHide' + pending++;

    $document.bind(name, function (e) {
        const target = e.target;
        let r = 0;
        let el;
        for (let i = 0; i < len; i++) {
            el = els[i];
            if (target != el && !$.contains(el, target)) {
                r++;
            } else {
                break;
            }
        }
        if (r == len) {
            callback(e, el);
        }
    });

    return function () {
        $document.unbind(name);
    };
}