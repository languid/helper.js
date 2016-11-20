/**
 * Created by Yinxiong on 2016/11/20.
 */

import $ from 'jquery';
import lazyResize from './lazyResize';

export default function({context=null, height=0}={}) {
    const $win = $(window);
    const _context = $(context);

    if (!_context.length) return;

    const pageTop = function () {
        return document.documentElement.clientHeight
            + Math.max(document.documentElement.scrollTop, document.body.scrollTop)
            - height;
    };
    const imgLoad = function () {
        _context.find('img[orgSrc]').each(function () {
            if ($(this).offset().top <= pageTop() && $(this).is(':visible')) {
                let orgSrc = this.getAttribute('orgSrc');
                this.setAttribute('src', orgSrc);
                this.removeAttribute('orgSrc');
            }
        });
    };
    $win.bind('lazyload', imgLoad);
    lazyResize('scroll.lazyload', imgLoad);
}