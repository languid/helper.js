/**
 * Created by Yinxiong on 2016/12/11.
 */

export default function (url, callback, crossDomain) {
    let img = new Image();
    img.src = url;
    if (crossDomain) {
        img.setAttribute('crossOrigin', 'anonymous');
    }
    if (img.complete) {
        callback.call(img, false);
    }
    else {
        img.onload = function () {
            callback.call(img, false);
        };
        img.onerror = function () {
            callback.call(this, true);
        };
        img.src = img.src;
    }
}