/**
 * Created by Yinxiong on 2016/11/20.
 */

export default function(url, isNewWindow){
    let local = location, href = '';
    if (url == 'me') {
        href = local.href;
    } else if (/^#/.test(url)) {
        href = local.origin + local.pathname + url;
    } else {
        href = url;
    }
    if (!isNewWindow) {
        local.href = href;
    } else {
        window.open(href);
    }
    return local;
}