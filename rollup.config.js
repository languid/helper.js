/**
 * Created by Yinxiong on 2016/11/21.
 */

import babel from 'rollup-plugin-babel';

export default {
    entry: 'index.js',
    dest: 'build/helper.js',
    moduleName: 'helper',
    format: 'umd',
	external: ['lodash', 'jquery'],
	globals: {
    	lodash: '_',
		jquery: '$'
	},
	plugins: [
		babel({
			exclude: 'node_modules/**'
		})
	]
}