/**
 * Created by Yinxiong on 2017/5/19.
 */

export default function(){
    let queue = [];
    queue.isReady = false;
    queue.exec = function(fn){
        if(queue.isReady) {
            fn();
        } else {
            queue.push(fn);
        }
    };
    queue.ready = function(){
        queue.isReady = true;
        queue.forEach(f=>f());
    };

    return queue;
}