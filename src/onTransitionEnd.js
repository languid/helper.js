/**
 * Created by Yinxiong on 2016/11/20.
 */

export default function(el, fn) {
    let name = 'webkitTransitionEnd oTransitionEnd transitionend';
    el.one(name, fn);
    return function () {
        el.unbind(name);
    };
}