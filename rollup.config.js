/**
 * Created by Yinxiong on 2016/11/21.
 */

export default {
    entry: 'index.js',
    dest: 'build/helper.js',
    moduleName: 'helper',
    format: 'umd',
    globals: {
        lodash: '_',
        jquery: '$'
    }
}