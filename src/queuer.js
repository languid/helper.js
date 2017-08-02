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
  return Object.assign({
    list: [],
    count,
    originCount: count,
    isReady: false,
    ready () {
      if (--this.count === 0) {
        this.isReady = true
        this.list.forEach(f => f.call(this))
        this.complete()
      } else {
        this.countdown(this.count)
      }
    },
    exec (fn) {
      if (typeof fn === 'function') {
        if (this.isReady) {
          fn.call(this)
        } else {
          this.list.push(fn)
        }
      }
    },
    reset () {
      this.list = []
      this.count = this.originCount
      this.isReady = false
    },
    countdown: noop,
    complete: noop
  }, props)
}
