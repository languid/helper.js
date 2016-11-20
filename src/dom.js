/**
 * Created by Yinxiong on 2016/11/20.
 */

import {isArray} from 'lodash';
import $ from 'jquery';

export const clickOtherPlace = function () {
    let pending = 0;

    const $document = $(document);

    return (elements, callback) => {

        let els = (!isArray(elements) ? [elements] : $.makeArray(elements)).map(function (element) {
            return element && element.jquery ? element[0] : element;
        });

        let len = els.length;

        let name = 'mousedown.clickDocumentHide' + pending++;

        callback = callback || $.noop;

        $document.bind(name, function (e) {
            const target = e.target;
            let r = 0;
            for (let i = 0, el; i < len; i++) {
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
}();


