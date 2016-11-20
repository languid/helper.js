/**
 * Created by Yinxiong on 2016/11/20.
 */

export default function(fn, time){
    return setTimeout(fn, time || 0);
}