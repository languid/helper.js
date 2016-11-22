/**
 * Created by Yinxiong on 2016/11/20.
 */

export default function(content, defaultValue) {
    defaultValue = defaultValue || void 0;
    if(!content){
        return defaultValue;
    }
    if (typeof content == 'string') {
        return content ? (new Function('return ' + content))() : defaultValue;
    }
    return content;
}