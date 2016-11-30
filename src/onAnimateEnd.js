/**
 * Created by Yinxiong on 2016/11/20.
 */

export default function(el, fn) {
    let name = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    el.one(name, fn);
    return function () {
        el.unbind(name);
    };
}