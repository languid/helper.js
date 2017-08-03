/**
 * Created by Yinxiong on 2017/5/19.
 */

import noop from './noop'

/**
 * 简单的队列等待管理，主要为异步模块提供统一调用接口
 * @param count
 * @param props
 * @returns {{list: Array, count: number, originCount: number, isReady: boolean, ready: (function()), exec: (function(*=)), reset: (function()), countdown: Function, complete: Function}}
 */
export default function (count = 1, props = {}) {
  const queue = Object.assign({
    list: [],
    count,
    originCount: count,
    isReady: false,
    ready () {
      if (--queue.count === 0) {
        queue.isReady = true
        queue.list.forEach(f => f.call(queue))
        queue.complete()
      } else {
        queue.countdown(queue.count)
      }
    },
    exec (fn) {
      if (typeof fn === 'function') {
        if (queue.isReady) {
          fn.call(queue)
        } else {
          queue.list.push(fn)
        }
      }
    },
    reset () {
      queue.list = []
      queue.count = queue.originCount
      queue.isReady = false
    },
    countdown: noop,
    complete: noop
  }, props)

  return queue
}
