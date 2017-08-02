/**
 * Created by Yinxiong on 2017/5/19.
 */

import delay from './delay'

export default function (fn, d = 0, resolved = true) {
  return new Promise((resolve, reject) => {
    let time
    time = delay(() => {
      clearTimeout(time)
      if (typeof fn === 'function') {
        try {
          resolve(fn())
        } catch (e) {
          reject(e)
        }
      } else {
        resolved ? resolve(fn) : reject()
      }
    }, d || Math.random() * 5000)
  })
}
