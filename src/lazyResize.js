/**
 * Created by Yinxiong on 2016/11/20.
 */

import $ from 'jquery';
import delay from './delay';
import noop from './noop';
import {isFunction} from 'lodash';

export default function(options) {
    let timer = null;
    let isEnd = false;
    let $win = $(window);

    let setting = {
        name: 'scroll resize',
        init: true,
        end: noop,
        start: noop,
        delay: 50
    };

    if(isFunction(options)){
        setting.end = options;
    } else {
        setting = Object.assign(setting, options);
    }

    $win.on(setting.name, function (e) {
        clearTimeout(timer);
        if (!isEnd) {
            isEnd = true;
            setting.start.call($win, e);
        }
        timer = delay(function () {
            isEnd = false;
            setting.end.call($win, e);
        }, setting.delay);
    });

    if (setting.init) {
        $win.trigger(setting.name.split(' ')[0]);
    }

    return function () {
        $win.off(setting.name);
    };
}