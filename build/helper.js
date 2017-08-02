(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash'), require('jquery'), require('moment')) :
	typeof define === 'function' && define.amd ? define(['exports', 'lodash', 'jquery', 'moment'], factory) :
	(factory((global.helper = global.helper || {}),global._,global.$,global.moment));
}(this, (function (exports,_,$,moment) { 'use strict';

_ = _ && 'default' in _ ? _['default'] : _;
$ = $ && 'default' in $ ? $['default'] : $;
moment = moment && 'default' in moment ? moment['default'] : moment;

/**
 * Created by Yinxiong on 2016/11/20.
 */

var noop = function () {};

/**
 * Created by Yinxiong on 2016/11/20.
 */

var delay = function (fn, time) {
  return setTimeout(fn, time || 0);
};

/**
 * Created by Yinxiong on 2016/11/20.
 */

var queryString = function (name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/**
 * Created by Yinxiong on 2016/11/20.
 */

var go = function (url, isNewWindow) {
  var local = location;
  var href = '';
  if (url === 'me') {
    href = local.href;
  } else if (/^#/.test(url)) {
    href = local.origin + local.pathname + url;
  } else {
    href = url;
  }
  if (!isNewWindow) {
    local.href = href;
  } else {
    window.open(href);
  }
  return local;
};

/**
 * Created by Yinxiong on 2016/11/20.
 */

var paramsEncode = function (obj) {
  var str = '';
  for (var key in obj) {
    if (str !== '') {
      str += '&';
    }
    str += key + '=' + encodeURIComponent(obj[key]);
  }
  return str;
};

/**
 * Created by Yinxiong on 2016/11/20.
 */

var parseCode = function (content, defaultValue) {
  defaultValue = defaultValue || void 0;
  if (!content) {
    return defaultValue;
  }
  if (typeof content === 'string') {
    return content ? new Function('return ' + content)() : defaultValue;
  }
  return content;
};

/**
 * Created by Administrator on 2016/10/13.
 */
var validator = {
  required: {
    message: function message() {
      return 'required';
    },
    validate: function validate(val, required) {
      return !required ? true : _.isString(val) ? !!_.trim(val) : _.isArray(val) || _.isObject(val) ? _.size(val) > 0 : true;
    }
  },
  maxlength: {
    message: function message() {
      return 'maxlength';
    },
    validate: function validate(val, num) {
      return _.isString(val) && val.length <= num;
    }
  },
  minlength: {
    message: function message() {
      return 'minlength';
    },
    validate: function validate(val, num) {
      return _.isString(val) && val.length >= num;
    }
  },
  max: {
    message: function message() {
      return 'max';
    },
    validate: function validate(val, num) {
      return validator.number(val, true) && +val <= num;
    }
  },
  min: {
    message: function message() {
      return 'min';
    },
    validate: function validate(val, num) {
      return validator.number(val, true) && +val >= num;
    }
  },
  number: {
    message: function message() {
      return 'must number';
    },
    validate: function validate(val, required) {
      return !required ? true : /^\d+(\.\d+)?$/.test(val);
    }
  },
  digits: {
    message: function message() {
      return 'must digits';
    },
    validate: function validate(val, required) {
      return !required ? true : /^\d+$/.test(val);
    }
  },
  range: {
    message: function message(condition) {
      return 'Must be between ' + condition[0] + ' and ' + condition[1];
    },
    validate: function validate(val, range) {
      return val.length >= range[0] && val.length <= range[1];
    }
  }
};

/**
 * Created by Yinxiong on 2016/11/20.
 */

var pending = 0;

/**
 *
 * @param elements
 * @param callback
 * @returns {Function}
 */
var documentClick = function (elements) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

  var $document = $(document);

  var els = (!Array.isArray(elements) ? [elements] : $.makeArray(elements)).map(function (element) {
    return element && element.jquery ? element[0] : element;
  });

  var len = els.length;

  var name = 'mousedown.clickDocumentHide' + pending++;

  $document.bind(name, function (e) {
    var target = e.target;
    var r = 0;
    var el = void 0;
    for (var i = 0; i < len; i++) {
      el = els[i];
      if (target !== el && !$.contains(el, target)) {
        r++;
      } else {
        break;
      }
    }
    if (r === len) {
      callback(e, el);
    }
  });

  return function () {
    $document.unbind(name);
  };
};

/**
 * Created by Yinxiong on 2016/11/20.
 */

var lazyResize = function (options) {
  var timer = null;
  var isEnd = false;
  var $win = $(window);

  var setting = {
    name: 'scroll resize',
    init: true,
    end: noop,
    start: noop,
    delay: 50
  };

  if (typeof options === 'function') {
    setting.end = options;
  } else {
    setting = Object.assign(setting, options);
  }

  $win.on(setting.name, function (e) {
    clearTimeout(timer);
    if (!isEnd) {
      isEnd = true;
      setting.start.call($win, e);
    }
    timer = delay(function () {
      isEnd = false;
      setting.end.call($win, e);
    }, setting.delay);
  });

  if (setting.init) {
    $win.trigger(setting.name.split(' ')[0]);
  }

  return function () {
    $win.off(setting.name);
  };
};

/**
 * Created by Yinxiong on 2016/11/20.
 */

var lazyLoad = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$context = _ref.context,
      context = _ref$context === undefined ? null : _ref$context,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 0 : _ref$height;

  var $win = $(window);
  var _context = $(context);

  if (!_context.length) return;

  var pageTop = function pageTop() {
    return document.documentElement.clientHeight + Math.max(document.documentElement.scrollTop, document.body.scrollTop) - height;
  };
  var imgLoad = function imgLoad() {
    _context.find('img[orgSrc]').each(function () {
      if ($(this).offset().top <= pageTop() && $(this).is(':visible')) {
        var orgSrc = this.getAttribute('orgSrc');
        this.setAttribute('src', orgSrc);
        this.removeAttribute('orgSrc');
      }
    });
  };
  $win.bind('lazyload', imgLoad);
  lazyResize('scroll.lazyload', imgLoad);
};

/**
 * Created by Yinxiong on 2016/11/20.
 */

var onAnimateEnd = function (el, fn) {
  var name = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  el.one(name, fn);
  return function () {
    el.unbind(name);
  };
};

/**
 * Created by Yinxiong on 2016/11/20.
 */

var onTransitionEnd = function (el, fn) {
  var name = 'webkitTransitionEnd oTransitionEnd transitionend';
  el.one(name, fn);
  return function () {
    el.unbind(name);
  };
};

/**
 * Created by Yinxiong on 2016/12/11.
 */

var loadImage = function (url, callback, crossDomain) {
  var img = new Image();
  img.src = url;
  if (crossDomain) {
    img.setAttribute('crossOrigin', 'anonymous');
  }
  if (img.complete) {
    callback.call(img, false);
  } else {
    img.onload = function () {
      callback.call(img, false);
    };
    img.onerror = function () {
      callback.call(this, true);
    };
    img.src = img.src;
  }
};

/**
 * Created by Yinxiong on 2016/12/15.
 */

var clearEmpty = function (obj) {
  var query = {};
  _.forEach(obj, function (value, key) {
    if (value || parseInt(value) === 0) {
      query[key] = value;
    }
  });
  return query;
};

/**
 * Created by Yinxiong on 2017/5/19.
 */

var wait = function (fn) {
  var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var resolved = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return new Promise(function (resolve, reject) {
    var time = void 0;
    time = delay(function () {
      clearTimeout(time);
      if (typeof fn === 'function') {
        try {
          resolve(fn());
        } catch (e) {
          reject(e);
        }
      } else {
        resolved ? resolve(fn) : reject();
      }
    }, d || Math.random() * 5000);
  });
};

/**
 * Created by Yinxiong on 2017/5/19.
 */

/**
 * 简单的队列等待管理，主要为异步模块提供统一调用接口
 * @param count
 * @param props
 * @returns {{list: Array, count: number, originCount: number, isReady: boolean, ready: (function()), exec: (function(*=)), reset: (function()), countdown: Function, complete: Function}}
 */
var queuer = function () {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return Object.assign({
    list: [],
    count: count,
    originCount: count,
    isReady: false,
    ready: function ready() {
      var _this = this;

      if (--this.count === 0) {
        this.isReady = true;
        this.list.forEach(function (f) {
          return f.call(_this);
        });
        this.complete();
      } else {
        this.countdown(this.count);
      }
    },
    exec: function exec(fn) {
      if (typeof fn === 'function') {
        if (this.isReady) {
          fn.call(this);
        } else {
          this.list.push(fn);
        }
      }
    },
    reset: function reset() {
      this.list = [];
      this.count = this.originCount;
      this.isReady = false;
    },

    countdown: noop,
    complete: noop
  }, props);
};

/**
 * Created by Yinxiong on 2017/7/13.
 */

// https://bost.ocks.org/mike/shuffle/
// @flow
var shuffle = function (array) {
  var m = array.length;
  var t = void 0;
  var i = void 0;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

/**
 * Created by Yinxiong on 2017/5/19.
 */

function uppercase(v) {
  if (!v) return '';
  return v.toString().toUpperCase();
}

function lowercase(v) {
  if (!v) return '';
  return v.toString().toLowerCase();
}

/**
 * Created by Yinxiong on 2016/5/10 0010.
 */

var DATE_FORMAT = {
  LOCAL_FORMAT: 'LL',
  YMD_FORMAT: 'YYYY-MM-DD'
};

/**
 * 快捷方法，添加format方法
 * @param arr
 * @returns {*}
 */
function toRangeArray(arr) {
  arr.format = function () {
    var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DATE_FORMAT.YMD_FORMAT;

    return [this[0].format(format), this[1].format(format)];
  };
  return arr;
}

function thisDay() {
  return toRangeArray([moment(), moment()]);
}

function thisWeek() {
  var today = moment();
  var endWeek = moment().endOf('week');
  return toRangeArray([moment().startOf('week'), endWeek.isAfter(today) ? today : endWeek]);
}

function thisMonth() {
  var today = moment();
  var endMonth = moment().endOf('month');
  return toRangeArray([moment().startOf('month'), endMonth.isAfter(today) ? today : endMonth]);
}

function thisYear() {
  var today = moment();
  var endYear = moment().endOf('year');
  return toRangeArray([moment().startOf('year'), endYear.isAfter(today) ? today : endYear]);
}

function yesterday() {
  var m = moment().subtract(1, 'days');
  return toRangeArray([m, m]);
}

/**
 * 前几天
 * @param count
 * @returns {*}
 */
function lastDay() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  return toRangeArray([moment().subtract(count, 'days'), moment().subtract(1, 'days')]);
}

/**
 * 前几周
 * @param count
 * @returns {*}
 */
function lastWeek() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  return toRangeArray([moment().subtract(count, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')]);
}

/**
 * 前几个月
 * @param count
 * @returns {*}
 */
function lastMonth() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  return toRangeArray([moment().subtract(count, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]);
}

/**
 * 前几年
 * @param count
 * @returns {*}
 */
function lastYear() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  return toRangeArray([moment().subtract(count, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]);
}

/**
 * 近几周
 * @param count
 * @returns {array}
 */
function nearlyWeek() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  return toRangeArray([moment().subtract(count, 'week'), moment().subtract(1, 'days')]);
}

/**
 * 近几个月
 * @param count
 * @returns {array}
 */
function nearlyMonth() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  return toRangeArray([moment().subtract(count, 'month'), moment().subtract(1, 'days')]);
}

/**
 * 近几年
 * @param count
 * @returns {*}
 */
function nearlyYear() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  return toRangeArray([moment().subtract(count, 'year'), moment().subtract(1, 'days')]);
}

function formatDate(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DATE_FORMAT.YMD_FORMAT;

  return moment(date).format(format);
}

/**
 * Created by Yinxiong on 2016/11/20.
 */

exports.noop = noop;
exports.delay = delay;
exports.queryString = queryString;
exports.go = go;
exports.paramsEncode = paramsEncode;
exports.parseCode = parseCode;
exports.validator = validator;
exports.documentClick = documentClick;
exports.lazyLoad = lazyLoad;
exports.onAnimateEnd = onAnimateEnd;
exports.onTransitionEnd = onTransitionEnd;
exports.lazyResize = lazyResize;
exports.loadImage = loadImage;
exports.clearEmpty = clearEmpty;
exports.wait = wait;
exports.queuer = queuer;
exports.shuffle = shuffle;
exports.uppercase = uppercase;
exports.lowercase = lowercase;
exports.DATE_FORMAT = DATE_FORMAT;
exports.toRangeArray = toRangeArray;
exports.thisDay = thisDay;
exports.thisWeek = thisWeek;
exports.thisMonth = thisMonth;
exports.thisYear = thisYear;
exports.yesterday = yesterday;
exports.lastDay = lastDay;
exports.lastWeek = lastWeek;
exports.lastMonth = lastMonth;
exports.lastYear = lastYear;
exports.nearlyWeek = nearlyWeek;
exports.nearlyMonth = nearlyMonth;
exports.nearlyYear = nearlyYear;
exports.formatDate = formatDate;

Object.defineProperty(exports, '__esModule', { value: true });

})));
