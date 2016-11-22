/**
 * Created by Yinxiong on 2016/11/20.
 */

export default function(obj){
    let str = '';
    for (let key in obj) {
        if (str != '') {
            str += '&';
        }
        str += key + '=' + encodeURIComponent(obj[key]);
    }
    return str;
}
