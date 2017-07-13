/**
 * Created by Yinxiong on 2017/5/19.
 */

import noop from './noop'

/**
 *
 * @param {Number} count
 * @param {Object} events
 * @returns {{ready: (function()), exec: (function(*=)), reset: (function())}}
 */
export default function (count = 1, events = {}) {
  let list = []
  let isReady = false
  const originCount = count

  events = Object.assign({
    countdown: noop,
    complete: noop
  }, events)

  return {
    ready () {
      if (--count === 0) {
        isReady = true
        list.forEach(f => f())
        events.complete()
      } else {
        events.countdown(count)
      }
    },
    exec (fn) {
      if (typeof fn === 'function') {
        if (isReady) {
          fn()
        } else {
          list.push(fn)
        }
      }
    },
    reset () {
      list = []
      count = originCount
      isReady = false
    }
  }
}
