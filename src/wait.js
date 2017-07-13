/**
 * Created by Yinxiong on 2017/5/19.
 */

import delay from './delay'

export default function (props = {}, resolved = true, d) {
  return new Promise((resolve, reject) => {
    delay(() => {
      resolved ? resolve(props) : reject(props)
    }, d || Math.random() * 5000)
  })
}
