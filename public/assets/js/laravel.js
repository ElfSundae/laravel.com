/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__("./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./resources/assets/js/laravel.js":
/***/ (function(module, exports, __webpack_require__) {

// jQuery core
window.jQuery = window.$ = __webpack_require__("./resources/assets/js/vendor/jquery.js");

// These all require jQuery
__webpack_require__("./resources/assets/js/vendor/prism.js");
__webpack_require__("./resources/assets/js/vendor/bootstrap.js");
__webpack_require__("./resources/assets/js/vendor/typeahead.js");
__webpack_require__("./resources/assets/js/vendor/scotchPanels.js");

// Standalone vendor libraries
var Hogan = __webpack_require__("./resources/assets/js/vendor/hogan.js");
var Mousetrap = __webpack_require__("./resources/assets/js/vendor/mousetrap.js");
var algoliasearch = __webpack_require__("./resources/assets/js/vendor/algoliasearch.js");

jQuery(function ($) {
  // Smooth scroll to anchor
  $('body.home a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  var scotchPanel = $('#slide-menu').scotchPanel({
    containerSelector: 'body',
    direction: 'left',
    duration: 300,
    transition: 'ease',
    distanceX: '70%',
    forceMinHeight: true,
    minHeight: '2500px',
    enableEscapeKey: true
  }).show(); // show to avoid flash of content

  $('.toggle-slide').click(function () {
    scotchPanel.css('overflow', 'scroll');
    scotchPanel.toggle();
    return false;
  });

  $('.overlay').click(function () {
    // CLOSE ONLY
    scotchPanel.close();
  });

  // Hide the slide menu when changing the browser width

  function checkSize() {
    if (window.matchMedia("(min-width: 960px)").matches) {
      scotchPanel.close();
    }
  }

  checkSize();
  window.onresize = checkSize;

  // gheading links
  $('.docs-wrapper').find('a[name]').each(function () {
    var anchor = $('<a href="#' + this.name + '"/>');
    $(this).parent().next('h2').wrapInner(anchor);
  });

  // It's nice to just write in Markdown, so this will adjust
  // our blockquote style to fill in the icon flag and label
  $('.docs blockquote p').each(function () {
    var str = $(this).html();
    var match = str.match(/\{(.*?)\}/);

    if (match) {
      var icon = match[1] || false;
      var word = match[1] || false;
    }

    if (icon) {
      switch (icon) {
        case "note":
          icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" version="1.1" x="0px" y="0px" width="90px" height="90px" viewBox="0 0 90 90" enable-background="new 0 0 90 90" xml:space="preserve"><path fill="#FFFFFF" d="M45 0C20.1 0 0 20.1 0 45s20.1 45 45 45 45-20.1 45-45S69.9 0 45 0zM45 74.5c-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5 6.5 2.9 6.5 6.5S48.6 74.5 45 74.5zM52.1 23.9l-2.5 29.6c0 2.5-2.1 4.6-4.6 4.6 -2.5 0-4.6-2.1-4.6-4.6l-2.5-29.6c-0.1-0.4-0.1-0.7-0.1-1.1 0-4 3.2-7.2 7.2-7.2 4 0 7.2 3.2 7.2 7.2C52.2 23.1 52.2 23.5 52.1 23.9z"/></svg>';
          break;
        case "tip":
          icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" version="1.1" x="0px" y="0px" width="56.6px" height="87.5px" viewBox="0 0 56.6 87.5" enable-background="new 0 0 56.6 87.5" xml:space="preserve"><path fill="#FFFFFF" d="M28.7 64.5c-1.4 0-2.5-1.1-2.5-2.5v-5.7 -5V41c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v10.1 5 5.8C31.2 63.4 30.1 64.5 28.7 64.5zM26.4 0.1C11.9 1 0.3 13.1 0 27.7c-0.1 7.9 3 15.2 8.2 20.4 0.5 0.5 0.8 1 1 1.7l3.1 13.1c0.3 1.1 1.3 1.9 2.4 1.9 0.3 0 0.7-0.1 1.1-0.2 1.1-0.5 1.6-1.8 1.4-3l-2-8.4 -0.4-1.8c-0.7-2.9-2-5.7-4-8 -1-1.2-2-2.5-2.7-3.9C5.8 35.3 4.7 30.3 5.4 25 6.7 14.5 15.2 6.3 25.6 5.1c13.9-1.5 25.8 9.4 25.8 23 0 4.1-1.1 7.9-2.9 11.2 -0.8 1.4-1.7 2.7-2.7 3.9 -2 2.3-3.3 5-4 8L41.4 53l-2 8.4c-0.3 1.2 0.3 2.5 1.4 3 0.3 0.2 0.7 0.2 1.1 0.2 1.1 0 2.2-0.8 2.4-1.9l3.1-13.1c0.2-0.6 0.5-1.2 1-1.7 5-5.1 8.2-12.1 8.2-19.8C56.4 12 42.8-1 26.4 0.1zM43.7 69.6c0 0.5-0.1 0.9-0.3 1.3 -0.4 0.8-0.7 1.6-0.9 2.5 -0.7 3-2 8.6-2 8.6 -1.3 3.2-4.4 5.5-7.9 5.5h-4.1H28h-0.5 -3.6c-3.5 0-6.7-2.4-7.9-5.7l-0.1-0.4 -1.8-7.8c-0.4-1.1-0.8-2.1-1.2-3.1 -0.1-0.3-0.2-0.5-0.2-0.9 0.1-1.3 1.3-2.1 2.6-2.1H41C42.4 67.5 43.6 68.2 43.7 69.6zM37.7 72.5H26.9c-4.2 0-7.2 3.9-6.3 7.9 0.6 1.3 1.8 2.1 3.2 2.1h4.1 0.5 0.5 3.6c1.4 0 2.7-0.8 3.2-2.1L37.7 72.5z"/></svg>';
          break;
        case "laracasts":
        case "video":
          icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" version="1.1" x="0px" y="0px" width="68.9px" height="59.9px" viewBox="0 0 68.9 59.9" enable-background="new 0 0 68.9 59.9" xml:space="preserve"><path fill="#FFFFFF" d="M63.7 0H5.3C2.4 0 0 2.4 0 5.3v49.3c0 2.9 2.4 5.3 5.3 5.3h58.3c2.9 0 5.3-2.4 5.3-5.3V5.3C69 2.4 66.6 0 63.7 0zM5.3 4h58.3c0.7 0 1.3 0.6 1.3 1.3V48H4V5.3C4 4.6 4.6 4 5.3 4zM13 52v4h-2v-4H13zM17 52h2v4h-2V52zM23 52h2v4h-2V52zM29 52h2v4h-2V52zM35 52h2v4h-2V52zM41 52h2v4h-2V52zM4 54.7V52h3v4H5.3C4.6 56 4 55.4 4 54.7zM63.7 56H47v-4h18v2.7C65 55.4 64.4 56 63.7 56zM26 38.7c0.3 0.2 0.7 0.3 1 0.3 0.4 0 0.7-0.1 1-0.3l17-10c0.6-0.4 1-1 1-1.7s-0.4-1.4-1-1.7l-17-10c-0.6-0.4-1.4-0.4-2 0s-1 1-1 1.7v20C25 37.7 25.4 38.4 26 38.7zM29 20.5L40.1 27 29 33.5V20.5z"/></svg>';
          break;
      }

      $(this).html(str.replace(/\{(.*?)\}/, '<div class="flag"><span class="svg">' + icon + '</span></div>'));
      $(this).parent().addClass('has-icon');
      $(this).addClass(word);
    }
  });

  Mousetrap.bind('/', function (e) {
    e.preventDefault();
    $('#search-input').focus();
  });

  Mousetrap.bind(["ctrl+b", "command+b"], function (e) {
    e.preventDefault();
    $(".sidebar").find("h2").addClass('is-active');
  });

  initAlgoliaSearch();

  // Fixes FOUC for the search box
  $('.search.invisible').removeClass('invisible');

  function initAlgoliaSearch() {
    if (window.algolia_app_id === '') {
      return;
    }

    var client = algoliasearch(window.algolia_app_id, window.algolia_search_key);
    var index = client.initIndex('docs');

    var templates = {
      suggestion: Hogan.compile($('#search_suggestion_template').html()),
      empty: Hogan.compile($('#search_empty_template').html()),
      footer: Hogan.compile($('#search_footer_template').html())
    };

    var $searchInput = $('#search-input');
    var $mainNav = $('.main-nav');
    var $article = $('article');

    // Closes algolia results on blur
    $searchInput.blur(function () {
      $(this).val('');
    });

    // Hides main nav to widen algolia results
    $searchInput.on('input', function (event) {
      if (event.currentTarget.value !== '') {
        $mainNav.hide();
      } else {
        $mainNav.show();
      }
    });

    // typeahead datasets
    // https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md#datasets
    var datasets = [];

    datasets.push({
      source: function searchAlgolia(query, cb) {
        index.search(query, {
          hitsPerPage: 5, tagFilters: [window.version]
        }, function searchCallback(err, content) {
          if (err) {
            throw err;
          }
          cb(content.hits);
        });
      },
      templates: {
        suggestion: templates.suggestion.render.bind(templates.suggestion),
        empty: templates.empty.render.bind(templates.empty),
        footer: templates.footer.render.bind(templates.footer)
      }
    });

    var typeahead = $searchInput.typeahead({ hint: false }, datasets);
    var old_input = '';

    typeahead.on('typeahead:selected', function changePage(e, item) {
      window.location.href = '/docs/' + item._tags[0] + '/' + item.link;
    });

    typeahead.on('keyup', function (e) {
      old_input = $(this).typeahead('val');

      if ($(this).val() === '' && old_input.length == $(this).typeahead('val')) {
        $article.css('opacity', '1');
        $searchInput.closest('#search-wrapper').removeClass('not-empty');
      } else {
        $article.css('opacity', '0.1');
        $searchInput.closest('#search-wrapper').addClass('not-empty');
      }
      if (e.keyCode === 27) {
        $article.css('opacity', '1');
      }
    });

    typeahead.on('typeahead:closed', function () {
      $article.css('opacity', '1');
    });

    typeahead.on('typeahead:closed', function (e) {
      // keep menu open if input element is still focused
      if ($(e.target).is(':focus')) {
        return false;
      }
    });

    $('#cross').click(function () {
      typeahead.typeahead('val', '').keyup();
      $article.css('opacity', '1');
    });
  }

  // collapse and expand for the sidebar
  var toggles = document.querySelectorAll('.sidebar h2'),
      togglesList = document.querySelectorAll('.sidebar h2 + ul');

  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener('click', expandItem);
    toggles[i].addEventListener('keydown', expandItemKeyboard);
    toggles[i].setAttribute('tabindex', '0');
  }

  // Via https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability
  function storageAvailable(type) {
    try {
      var storage = window[type],
          x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
    }
  }

  // Track the state of the doc collapse
  var docCollapsed = true;
  function expandDocs(e) {
    for (var i = 0; i < toggles.length; i++) {
      if (docCollapsed) {
        toggles[i].classList.add('is-active');
      } else {
        toggles[i].classList.remove('is-active');
      }
    }

    // Modify states
    docCollapsed = !docCollapsed;
    document.getElementById('doc-expand').text = docCollapsed ? 'Expand All' : 'Collapse All';

    // Modify LS if we can
    if (storageAvailable('localStorage')) {
      localStorage.setItem('laravel_docCollapsed', docCollapsed);
    }
    // Cancel event
    if (e) {
      e.preventDefault();
    }
  }

  if (document.getElementById('doc-expand')) {
    // Load the users previous preference if available
    if (storageAvailable('localStorage')) {
      // Can't use if(var) since this is a boolean, LS returns null for unset keys
      if (localStorage.getItem('laravel_docCollapsed') === null) {
        localStorage.setItem('laravel_docCollapsed', true);
      } else {
        // Load previous state, and if it was false, then expand the doc
        // LS will store booleans as strings, we will "cast" them back here
        localStorage.getItem('laravel_docCollapsed') == 'false' ? expandDocs() : null;
      }
    }

    // Register event listener
    document.getElementById('doc-expand').addEventListener('click', expandDocs);
  }

  if ($('.sidebar ul').length) {
    var current = $('.sidebar ul').find('li a[href="' + window.location.pathname + '"]');

    if (current.length) {
      current.parent().css('font-weight', 'bold');

      // Only toggle the state if the user has collapsed the documentation
      if (docCollapsed) {
        current.closest('ul').prev().toggleClass('is-active');
      }
    }
  }

  function expandItem(e) {
    var elem = e.target;

    if (elem.classList.contains('is-active')) {
      elem.classList.remove('is-active');
    } else {
      clearItems();
      elem.classList.add('is-active');
    }
  }

  function expandItemKeyboard(e) {
    var elem = e.target;

    if ([13, 37, 39].includes(e.keyCode)) {
      clearItems();
    }

    if (e.keyCode === 13) {
      elem.classList.toggle('is-active');
    }

    if (e.keyCode === 39) {
      elem.classList.add('is-active');
    }

    if (e.keyCode === 37) {
      elem.classList.remove('is-active');
    }
  }

  function clearItems() {
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].classList.remove('is-active');
    }
  }
});

/***/ }),

/***/ "./resources/assets/js/vendor/algoliasearch.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {var require;var require;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! algoliasearch 3.7.7 | © 2014, 2015 Algolia SAS | github.com/algolia/algoliasearch-client-js */
(function (f) {
    var g;if (typeof window !== 'undefined') {
        g = window;
    } else if (typeof self !== 'undefined') {
        g = self;
    }g.ALGOLIA_MIGRATION_LAYER = f();
})(function () {
    var define, module, exports;return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
                }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }return n[o].exports;
        }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
            s(r[o]);
        }return s;
    }({ 1: [function (require, module, exports) {

            module.exports = function load(src, opts, cb) {
                var head = document.head || document.getElementsByTagName('head')[0];
                var script = document.createElement('script');

                if (typeof opts === 'function') {
                    cb = opts;
                    opts = {};
                }

                opts = opts || {};
                cb = cb || function () {};

                script.type = opts.type || 'text/javascript';
                script.charset = opts.charset || 'utf8';
                script.async = 'async' in opts ? !!opts.async : true;
                script.src = src;

                if (opts.attrs) {
                    setAttributes(script, opts.attrs);
                }

                if (opts.text) {
                    script.text = '' + opts.text;
                }

                var onend = 'onload' in script ? stdOnEnd : ieOnEnd;
                onend(script, cb);

                // some good legacy browsers (firefox) fail the 'in' detection above
                // so as a fallback we always set onload
                // old IE will ignore this and new IE will set onload
                if (!script.onload) {
                    stdOnEnd(script, cb);
                }

                head.appendChild(script);
            };

            function setAttributes(script, attrs) {
                for (var attr in attrs) {
                    script.setAttribute(attr, attrs[attr]);
                }
            }

            function stdOnEnd(script, cb) {
                script.onload = function () {
                    this.onerror = this.onload = null;
                    cb(null, script);
                };
                script.onerror = function () {
                    // this.onload = null here is necessary
                    // because even IE9 works not like others
                    this.onerror = this.onload = null;
                    cb(new Error('Failed to load ' + this.src), script);
                };
            }

            function ieOnEnd(script, cb) {
                script.onreadystatechange = function () {
                    if (this.readyState != 'complete' && this.readyState != 'loaded') return;
                    this.onreadystatechange = null;
                    cb(null, script); // there is no way to catch loading errors in IE8
                };
            }
        }, {}], 2: [function (require, module, exports) {
            'use strict';

            // this module helps finding if the current page is using
            // the cdn.jsdelivr.net/algoliasearch/latest/$BUILDNAME.min.js version

            module.exports = isUsingLatest;

            function isUsingLatest(buildName) {
                var toFind = new RegExp('cdn\\.jsdelivr\\.net/algoliasearch/latest/' + buildName.replace('.', '\\.') + // algoliasearch, algoliasearch.angular
                '(?:\\.min)?\\.js$'); // [.min].js

                var scripts = document.getElementsByTagName('script');
                var found = false;
                for (var currentScript = 0, nbScripts = scripts.length; currentScript < nbScripts; currentScript++) {
                    if (scripts[currentScript].src && toFind.test(scripts[currentScript].src)) {
                        found = true;
                        break;
                    }
                }

                return found;
            }
        }, {}], 3: [function (require, module, exports) {
            'use strict';

            module.exports = loadV2;

            function loadV2(buildName) {
                var loadScript = require(1);
                var v2ScriptUrl = '//cdn.jsdelivr.net/algoliasearch/2/' + buildName + '.min.js';

                var message = '-- AlgoliaSearch `latest` warning --\n' + 'Warning, you are using the `latest` version string from jsDelivr to load the AlgoliaSearch library.\n' + 'Using `latest` is no more recommended, you should load //cdn.jsdelivr.net/algoliasearch/2/algoliasearch.min.js\n\n' + 'Also, we updated the AlgoliaSearch JavaScript client to V3. If you want to upgrade,\n' + 'please read our migration guide at https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x\n' + '-- /AlgoliaSearch  `latest` warning --';

                if (window.console) {
                    if (window.console.warn) {
                        window.console.warn(message);
                    } else if (window.console.log) {
                        window.console.log(message);
                    }
                }

                // If current script loaded asynchronously,
                // it will load the script with DOMElement
                // otherwise, it will load the script with document.write
                try {
                    // why \x3c? http://stackoverflow.com/a/236106/147079
                    document.write('\x3Cscript>window.ALGOLIA_SUPPORTS_DOCWRITE = true\x3C/script>');

                    if (window.ALGOLIA_SUPPORTS_DOCWRITE === true) {
                        document.write('\x3Cscript src="' + v2ScriptUrl + '">\x3C/script>');
                        scriptLoaded('document.write')();
                    } else {
                        loadScript(v2ScriptUrl, scriptLoaded('DOMElement'));
                    }
                } catch (e) {
                    loadScript(v2ScriptUrl, scriptLoaded('DOMElement'));
                }
            }

            function scriptLoaded(method) {
                return function log() {
                    var message = 'AlgoliaSearch: loaded V2 script using ' + method;

                    if (window.console && window.console.log) {
                        window.console.log(message);
                    }
                };
            }
        }, { "1": 1 }], 4: [function (require, module, exports) {
            'use strict';

            /*eslint no-unused-vars: [2, {"vars": "local"}]*/

            module.exports = oldGlobals;

            // put old window.AlgoliaSearch.. into window. again so that
            // users upgrading to V3 without changing their code, will be warned
            function oldGlobals() {
                var message = '-- AlgoliaSearch V2 => V3 error --\n' + 'You are trying to use a new version of the AlgoliaSearch JavaScript client with an old notation.\n' + 'Please read our migration guide at https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x\n' + '-- /AlgoliaSearch V2 => V3 error --';

                window.AlgoliaSearch = function () {
                    throw new Error(message);
                };

                window.AlgoliaSearchHelper = function () {
                    throw new Error(message);
                };

                window.AlgoliaExplainResults = function () {
                    throw new Error(message);
                };
            }
        }, {}], 5: [function (require, module, exports) {
            'use strict';

            // This script will be browserified and prepended to the normal build
            // directly in window, not wrapped in any module definition
            // To avoid cases where we are loaded with /latest/ along with

            migrationLayer("algoliasearch");

            // Now onto the V2 related code:
            //  If the client is using /latest/$BUILDNAME.min.js, load V2 of the library
            //
            //  Otherwise, setup a migration layer that will throw on old constructors like
            //  new AlgoliaSearch().
            //  So that users upgrading from v2 to v3 will have a clear information
            //  message on what to do if they did not read the migration guide
            function migrationLayer(buildName) {
                var isUsingLatest = require(2);
                var loadV2 = require(3);
                var oldGlobals = require(4);

                if (isUsingLatest(buildName)) {
                    loadV2(buildName);
                } else {
                    oldGlobals();
                }
            }
        }, { "2": 2, "3": 3, "4": 4 }] }, {}, [5])(5);
});(function (f) {
    if (( false ? 'undefined' : _typeof(exports)) === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        var g;if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }g.algoliasearch = f();
    }
})(function () {
    var define, module, exports;return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
                }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }return n[o].exports;
        }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
            s(r[o]);
        }return s;
    }({ 1: [function (require, module, exports) {
            // Copyright Joyent, Inc. and other Node contributors.
            //
            // Permission is hereby granted, free of charge, to any person obtaining a
            // copy of this software and associated documentation files (the
            // "Software"), to deal in the Software without restriction, including
            // without limitation the rights to use, copy, modify, merge, publish,
            // distribute, sublicense, and/or sell copies of the Software, and to permit
            // persons to whom the Software is furnished to do so, subject to the
            // following conditions:
            //
            // The above copyright notice and this permission notice shall be included
            // in all copies or substantial portions of the Software.
            //
            // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
            // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
            // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
            // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
            // USE OR OTHER DEALINGS IN THE SOFTWARE.

            function EventEmitter() {
                this._events = this._events || {};
                this._maxListeners = this._maxListeners || undefined;
            }
            module.exports = EventEmitter;

            // Backwards-compat with node 0.10.x
            EventEmitter.EventEmitter = EventEmitter;

            EventEmitter.prototype._events = undefined;
            EventEmitter.prototype._maxListeners = undefined;

            // By default EventEmitters will print a warning if more than 10 listeners are
            // added to it. This is a useful default which helps finding memory leaks.
            EventEmitter.defaultMaxListeners = 10;

            // Obviously not all Emitters should be limited to 10. This function allows
            // that to be increased. Set to zero for unlimited.
            EventEmitter.prototype.setMaxListeners = function (n) {
                if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
                this._maxListeners = n;
                return this;
            };

            EventEmitter.prototype.emit = function (type) {
                var er, handler, len, args, i, listeners;

                if (!this._events) this._events = {};

                // If there is no 'error' event listener then throw.
                if (type === 'error') {
                    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
                        er = arguments[1];
                        if (er instanceof Error) {
                            throw er; // Unhandled 'error' event
                        }
                        throw TypeError('Uncaught, unspecified "error" event.');
                    }
                }

                handler = this._events[type];

                if (isUndefined(handler)) return false;

                if (isFunction(handler)) {
                    switch (arguments.length) {
                        // fast cases
                        case 1:
                            handler.call(this);
                            break;
                        case 2:
                            handler.call(this, arguments[1]);
                            break;
                        case 3:
                            handler.call(this, arguments[1], arguments[2]);
                            break;
                        // slower
                        default:
                            len = arguments.length;
                            args = new Array(len - 1);
                            for (i = 1; i < len; i++) {
                                args[i - 1] = arguments[i];
                            }handler.apply(this, args);
                    }
                } else if (isObject(handler)) {
                    len = arguments.length;
                    args = new Array(len - 1);
                    for (i = 1; i < len; i++) {
                        args[i - 1] = arguments[i];
                    }listeners = handler.slice();
                    len = listeners.length;
                    for (i = 0; i < len; i++) {
                        listeners[i].apply(this, args);
                    }
                }

                return true;
            };

            EventEmitter.prototype.addListener = function (type, listener) {
                var m;

                if (!isFunction(listener)) throw TypeError('listener must be a function');

                if (!this._events) this._events = {};

                // To avoid recursion in the case that type === "newListener"! Before
                // adding it to the listeners, first emit "newListener".
                if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

                if (!this._events[type])
                    // Optimize the case of one listener. Don't need the extra array object.
                    this._events[type] = listener;else if (isObject(this._events[type]))
                    // If we've already got an array, just append.
                    this._events[type].push(listener);else
                    // Adding the second element, need to change to array.
                    this._events[type] = [this._events[type], listener];

                // Check for listener leak
                if (isObject(this._events[type]) && !this._events[type].warned) {
                    var m;
                    if (!isUndefined(this._maxListeners)) {
                        m = this._maxListeners;
                    } else {
                        m = EventEmitter.defaultMaxListeners;
                    }

                    if (m && m > 0 && this._events[type].length > m) {
                        this._events[type].warned = true;
                        console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
                        if (typeof console.trace === 'function') {
                            // not supported in IE 10
                            console.trace();
                        }
                    }
                }

                return this;
            };

            EventEmitter.prototype.on = EventEmitter.prototype.addListener;

            EventEmitter.prototype.once = function (type, listener) {
                if (!isFunction(listener)) throw TypeError('listener must be a function');

                var fired = false;

                function g() {
                    this.removeListener(type, g);

                    if (!fired) {
                        fired = true;
                        listener.apply(this, arguments);
                    }
                }

                g.listener = listener;
                this.on(type, g);

                return this;
            };

            // emits a 'removeListener' event iff the listener was removed
            EventEmitter.prototype.removeListener = function (type, listener) {
                var list, position, length, i;

                if (!isFunction(listener)) throw TypeError('listener must be a function');

                if (!this._events || !this._events[type]) return this;

                list = this._events[type];
                length = list.length;
                position = -1;

                if (list === listener || isFunction(list.listener) && list.listener === listener) {
                    delete this._events[type];
                    if (this._events.removeListener) this.emit('removeListener', type, listener);
                } else if (isObject(list)) {
                    for (i = length; i-- > 0;) {
                        if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                            position = i;
                            break;
                        }
                    }

                    if (position < 0) return this;

                    if (list.length === 1) {
                        list.length = 0;
                        delete this._events[type];
                    } else {
                        list.splice(position, 1);
                    }

                    if (this._events.removeListener) this.emit('removeListener', type, listener);
                }

                return this;
            };

            EventEmitter.prototype.removeAllListeners = function (type) {
                var key, listeners;

                if (!this._events) return this;

                // not listening for removeListener, no need to emit
                if (!this._events.removeListener) {
                    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
                    return this;
                }

                // emit removeListener for all listeners on all events
                if (arguments.length === 0) {
                    for (key in this._events) {
                        if (key === 'removeListener') continue;
                        this.removeAllListeners(key);
                    }
                    this.removeAllListeners('removeListener');
                    this._events = {};
                    return this;
                }

                listeners = this._events[type];

                if (isFunction(listeners)) {
                    this.removeListener(type, listeners);
                } else {
                    // LIFO order
                    while (listeners.length) {
                        this.removeListener(type, listeners[listeners.length - 1]);
                    }
                }
                delete this._events[type];

                return this;
            };

            EventEmitter.prototype.listeners = function (type) {
                var ret;
                if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
                return ret;
            };

            EventEmitter.listenerCount = function (emitter, type) {
                var ret;
                if (!emitter._events || !emitter._events[type]) ret = 0;else if (isFunction(emitter._events[type])) ret = 1;else ret = emitter._events[type].length;
                return ret;
            };

            function isFunction(arg) {
                return typeof arg === 'function';
            }

            function isNumber(arg) {
                return typeof arg === 'number';
            }

            function isObject(arg) {
                return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
            }

            function isUndefined(arg) {
                return arg === void 0;
            }
        }, {}], 2: [function (require, module, exports) {
            // shim for using process in browser

            var process = module.exports = {};
            var queue = [];
            var draining = false;
            var currentQueue;
            var queueIndex = -1;

            function cleanUpNextTick() {
                draining = false;
                if (currentQueue.length) {
                    queue = currentQueue.concat(queue);
                } else {
                    queueIndex = -1;
                }
                if (queue.length) {
                    drainQueue();
                }
            }

            function drainQueue() {
                if (draining) {
                    return;
                }
                var timeout = setTimeout(cleanUpNextTick);
                draining = true;

                var len = queue.length;
                while (len) {
                    currentQueue = queue;
                    queue = [];
                    while (++queueIndex < len) {
                        currentQueue[queueIndex].run();
                    }
                    queueIndex = -1;
                    len = queue.length;
                }
                currentQueue = null;
                draining = false;
                clearTimeout(timeout);
            }

            process.nextTick = function (fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                    for (var i = 1; i < arguments.length; i++) {
                        args[i - 1] = arguments[i];
                    }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                    setTimeout(drainQueue, 0);
                }
            };

            // v8 likes predictible objects
            function Item(fun, array) {
                this.fun = fun;
                this.array = array;
            }
            Item.prototype.run = function () {
                this.fun.apply(null, this.array);
            };
            process.title = 'browser';
            process.browser = true;
            process.env = {};
            process.argv = [];
            process.version = ''; // empty string to avoid regexp issues
            process.versions = {};

            function noop() {}

            process.on = noop;
            process.addListener = noop;
            process.once = noop;
            process.off = noop;
            process.removeListener = noop;
            process.removeAllListeners = noop;
            process.emit = noop;

            process.binding = function (name) {
                throw new Error('process.binding is not supported');
            };

            // TODO(shtylman)
            process.cwd = function () {
                return '/';
            };
            process.chdir = function (dir) {
                throw new Error('process.chdir is not supported');
            };
            process.umask = function () {
                return 0;
            };
        }, {}], 3: [function (require, module, exports) {
            // Copyright Joyent, Inc. and other Node contributors.
            //
            // Permission is hereby granted, free of charge, to any person obtaining a
            // copy of this software and associated documentation files (the
            // "Software"), to deal in the Software without restriction, including
            // without limitation the rights to use, copy, modify, merge, publish,
            // distribute, sublicense, and/or sell copies of the Software, and to permit
            // persons to whom the Software is furnished to do so, subject to the
            // following conditions:
            //
            // The above copyright notice and this permission notice shall be included
            // in all copies or substantial portions of the Software.
            //
            // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
            // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
            // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
            // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
            // USE OR OTHER DEALINGS IN THE SOFTWARE.

            'use strict';

            // If obj.hasOwnProperty has been overridden, then calling
            // obj.hasOwnProperty(prop) will break.
            // See: https://github.com/joyent/node/issues/1707

            function hasOwnProperty(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            }

            module.exports = function (qs, sep, eq, options) {
                sep = sep || '&';
                eq = eq || '=';
                var obj = {};

                if (typeof qs !== 'string' || qs.length === 0) {
                    return obj;
                }

                var regexp = /\+/g;
                qs = qs.split(sep);

                var maxKeys = 1000;
                if (options && typeof options.maxKeys === 'number') {
                    maxKeys = options.maxKeys;
                }

                var len = qs.length;
                // maxKeys <= 0 means that we should not limit keys count
                if (maxKeys > 0 && len > maxKeys) {
                    len = maxKeys;
                }

                for (var i = 0; i < len; ++i) {
                    var x = qs[i].replace(regexp, '%20'),
                        idx = x.indexOf(eq),
                        kstr,
                        vstr,
                        k,
                        v;

                    if (idx >= 0) {
                        kstr = x.substr(0, idx);
                        vstr = x.substr(idx + 1);
                    } else {
                        kstr = x;
                        vstr = '';
                    }

                    k = decodeURIComponent(kstr);
                    v = decodeURIComponent(vstr);

                    if (!hasOwnProperty(obj, k)) {
                        obj[k] = v;
                    } else if (isArray(obj[k])) {
                        obj[k].push(v);
                    } else {
                        obj[k] = [obj[k], v];
                    }
                }

                return obj;
            };

            var isArray = Array.isArray || function (xs) {
                return Object.prototype.toString.call(xs) === '[object Array]';
            };
        }, {}], 4: [function (require, module, exports) {
            // Copyright Joyent, Inc. and other Node contributors.
            //
            // Permission is hereby granted, free of charge, to any person obtaining a
            // copy of this software and associated documentation files (the
            // "Software"), to deal in the Software without restriction, including
            // without limitation the rights to use, copy, modify, merge, publish,
            // distribute, sublicense, and/or sell copies of the Software, and to permit
            // persons to whom the Software is furnished to do so, subject to the
            // following conditions:
            //
            // The above copyright notice and this permission notice shall be included
            // in all copies or substantial portions of the Software.
            //
            // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
            // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
            // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
            // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
            // USE OR OTHER DEALINGS IN THE SOFTWARE.

            'use strict';

            var stringifyPrimitive = function stringifyPrimitive(v) {
                switch (typeof v === 'undefined' ? 'undefined' : _typeof(v)) {
                    case 'string':
                        return v;

                    case 'boolean':
                        return v ? 'true' : 'false';

                    case 'number':
                        return isFinite(v) ? v : '';

                    default:
                        return '';
                }
            };

            module.exports = function (obj, sep, eq, name) {
                sep = sep || '&';
                eq = eq || '=';
                if (obj === null) {
                    obj = undefined;
                }

                if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
                    return map(objectKeys(obj), function (k) {
                        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                        if (isArray(obj[k])) {
                            return map(obj[k], function (v) {
                                return ks + encodeURIComponent(stringifyPrimitive(v));
                            }).join(sep);
                        } else {
                            return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
                        }
                    }).join(sep);
                }

                if (!name) return '';
                return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
            };

            var isArray = Array.isArray || function (xs) {
                return Object.prototype.toString.call(xs) === '[object Array]';
            };

            function map(xs, f) {
                if (xs.map) return xs.map(f);
                var res = [];
                for (var i = 0; i < xs.length; i++) {
                    res.push(f(xs[i], i));
                }
                return res;
            }

            var objectKeys = Object.keys || function (obj) {
                var res = [];
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
                }
                return res;
            };
        }, {}], 5: [function (require, module, exports) {
            'use strict';

            exports.decode = exports.parse = require(3);
            exports.encode = exports.stringify = require(4);
        }, { "3": 3, "4": 4 }], 6: [function (require, module, exports) {

            /**
             * This is the web browser implementation of `debug()`.
             *
             * Expose `debug()` as the module.
             */

            exports = module.exports = require(7);
            exports.log = log;
            exports.formatArgs = formatArgs;
            exports.save = save;
            exports.load = load;
            exports.useColors = useColors;
            exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

            /**
             * Colors.
             */

            exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

            /**
             * Currently only WebKit-based Web Inspectors, Firefox >= v31,
             * and the Firebug extension (any Firefox version) are known
             * to support "%c" CSS customizations.
             *
             * TODO: add a `localStorage` variable to explicitly enable/disable colors
             */

            function useColors() {
                // is webkit? http://stackoverflow.com/a/16459606/376773
                return 'WebkitAppearance' in document.documentElement.style ||
                // is firebug? http://stackoverflow.com/a/398120/376773
                window.console && (console.firebug || console.exception && console.table) ||
                // is firefox >= v31?
                // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
                navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
            }

            /**
             * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
             */

            exports.formatters.j = function (v) {
                return JSON.stringify(v);
            };

            /**
             * Colorize log arguments if enabled.
             *
             * @api public
             */

            function formatArgs() {
                var args = arguments;
                var useColors = this.useColors;

                args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

                if (!useColors) return args;

                var c = 'color: ' + this.color;
                args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

                // the final "%c" is somewhat tricky, because there could be other
                // arguments passed either before or after the %c, so we need to
                // figure out the correct index to insert the CSS into
                var index = 0;
                var lastC = 0;
                args[0].replace(/%[a-z%]/g, function (match) {
                    if ('%%' === match) return;
                    index++;
                    if ('%c' === match) {
                        // we only are interested in the *last* %c
                        // (the user may have provided their own)
                        lastC = index;
                    }
                });

                args.splice(lastC, 0, c);
                return args;
            }

            /**
             * Invokes `console.log()` when available.
             * No-op when `console.log` is not a "function".
             *
             * @api public
             */

            function log() {
                // this hackery is required for IE8/9, where
                // the `console.log` function doesn't have 'apply'
                return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
            }

            /**
             * Save `namespaces`.
             *
             * @param {String} namespaces
             * @api private
             */

            function save(namespaces) {
                try {
                    if (null == namespaces) {
                        exports.storage.removeItem('debug');
                    } else {
                        exports.storage.debug = namespaces;
                    }
                } catch (e) {}
            }

            /**
             * Load `namespaces`.
             *
             * @return {String} returns the previously persisted debug modes
             * @api private
             */

            function load() {
                var r;
                try {
                    r = exports.storage.debug;
                } catch (e) {}
                return r;
            }

            /**
             * Enable namespaces listed in `localStorage.debug` initially.
             */

            exports.enable(load());

            /**
             * Localstorage attempts to return the localstorage.
             *
             * This is necessary because safari throws
             * when a user disables cookies/localstorage
             * and you attempt to access it.
             *
             * @return {LocalStorage}
             * @api private
             */

            function localstorage() {
                try {
                    return window.localStorage;
                } catch (e) {}
            }
        }, { "7": 7 }], 7: [function (require, module, exports) {

            /**
             * This is the common logic for both the Node.js and web browser
             * implementations of `debug()`.
             *
             * Expose `debug()` as the module.
             */

            exports = module.exports = debug;
            exports.coerce = coerce;
            exports.disable = disable;
            exports.enable = enable;
            exports.enabled = enabled;
            exports.humanize = require(8);

            /**
             * The currently active debug mode names, and names to skip.
             */

            exports.names = [];
            exports.skips = [];

            /**
             * Map of special "%n" handling functions, for the debug "format" argument.
             *
             * Valid key names are a single, lowercased letter, i.e. "n".
             */

            exports.formatters = {};

            /**
             * Previously assigned color.
             */

            var prevColor = 0;

            /**
             * Previous log timestamp.
             */

            var prevTime;

            /**
             * Select a color.
             *
             * @return {Number}
             * @api private
             */

            function selectColor() {
                return exports.colors[prevColor++ % exports.colors.length];
            }

            /**
             * Create a debugger with the given `namespace`.
             *
             * @param {String} namespace
             * @return {Function}
             * @api public
             */

            function debug(namespace) {

                // define the `disabled` version
                function disabled() {}
                disabled.enabled = false;

                // define the `enabled` version
                function enabled() {

                    var self = enabled;

                    // set `diff` timestamp
                    var curr = +new Date();
                    var ms = curr - (prevTime || curr);
                    self.diff = ms;
                    self.prev = prevTime;
                    self.curr = curr;
                    prevTime = curr;

                    // add the `color` if not set
                    if (null == self.useColors) self.useColors = exports.useColors();
                    if (null == self.color && self.useColors) self.color = selectColor();

                    var args = Array.prototype.slice.call(arguments);

                    args[0] = exports.coerce(args[0]);

                    if ('string' !== typeof args[0]) {
                        // anything else let's inspect with %o
                        args = ['%o'].concat(args);
                    }

                    // apply any `formatters` transformations
                    var index = 0;
                    args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
                        // if we encounter an escaped % then don't increase the array index
                        if (match === '%%') return match;
                        index++;
                        var formatter = exports.formatters[format];
                        if ('function' === typeof formatter) {
                            var val = args[index];
                            match = formatter.call(self, val);

                            // now we need to remove `args[index]` since it's inlined in the `format`
                            args.splice(index, 1);
                            index--;
                        }
                        return match;
                    });

                    if ('function' === typeof exports.formatArgs) {
                        args = exports.formatArgs.apply(self, args);
                    }
                    var logFn = enabled.log || exports.log || console.log.bind(console);
                    logFn.apply(self, args);
                }
                enabled.enabled = true;

                var fn = exports.enabled(namespace) ? enabled : disabled;

                fn.namespace = namespace;

                return fn;
            }

            /**
             * Enables a debug mode by namespaces. This can include modes
             * separated by a colon and wildcards.
             *
             * @param {String} namespaces
             * @api public
             */

            function enable(namespaces) {
                exports.save(namespaces);

                var split = (namespaces || '').split(/[\s,]+/);
                var len = split.length;

                for (var i = 0; i < len; i++) {
                    if (!split[i]) continue; // ignore empty strings
                    namespaces = split[i].replace(/\*/g, '.*?');
                    if (namespaces[0] === '-') {
                        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
                    } else {
                        exports.names.push(new RegExp('^' + namespaces + '$'));
                    }
                }
            }

            /**
             * Disable debug output.
             *
             * @api public
             */

            function disable() {
                exports.enable('');
            }

            /**
             * Returns true if the given mode name is enabled, false otherwise.
             *
             * @param {String} name
             * @return {Boolean}
             * @api public
             */

            function enabled(name) {
                var i, len;
                for (i = 0, len = exports.skips.length; i < len; i++) {
                    if (exports.skips[i].test(name)) {
                        return false;
                    }
                }
                for (i = 0, len = exports.names.length; i < len; i++) {
                    if (exports.names[i].test(name)) {
                        return true;
                    }
                }
                return false;
            }

            /**
             * Coerce `val`.
             *
             * @param {Mixed} val
             * @return {Mixed}
             * @api private
             */

            function coerce(val) {
                if (val instanceof Error) return val.stack || val.message;
                return val;
            }
        }, { "8": 8 }], 8: [function (require, module, exports) {
            /**
             * Helpers.
             */

            var s = 1000;
            var m = s * 60;
            var h = m * 60;
            var d = h * 24;
            var y = d * 365.25;

            /**
             * Parse or format the given `val`.
             *
             * Options:
             *
             *  - `long` verbose formatting [false]
             *
             * @param {String|Number} val
             * @param {Object} options
             * @return {String|Number}
             * @api public
             */

            module.exports = function (val, options) {
                options = options || {};
                if ('string' == typeof val) return parse(val);
                // long, short were "future reserved words in js", YUI compressor fail on them
                // https://github.com/algolia/algoliasearch-client-js/issues/113#issuecomment-111978606
                // https://github.com/yui/yuicompressor/issues/47
                // https://github.com/rauchg/ms.js/pull/40
                return options['long'] ? _long(val) : _short(val);
            };

            /**
             * Parse the given `str` and return milliseconds.
             *
             * @param {String} str
             * @return {Number}
             * @api private
             */

            function parse(str) {
                str = '' + str;
                if (str.length > 10000) return;
                var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
                if (!match) return;
                var n = parseFloat(match[1]);
                var type = (match[2] || 'ms').toLowerCase();
                switch (type) {
                    case 'years':
                    case 'year':
                    case 'yrs':
                    case 'yr':
                    case 'y':
                        return n * y;
                    case 'days':
                    case 'day':
                    case 'd':
                        return n * d;
                    case 'hours':
                    case 'hour':
                    case 'hrs':
                    case 'hr':
                    case 'h':
                        return n * h;
                    case 'minutes':
                    case 'minute':
                    case 'mins':
                    case 'min':
                    case 'm':
                        return n * m;
                    case 'seconds':
                    case 'second':
                    case 'secs':
                    case 'sec':
                    case 's':
                        return n * s;
                    case 'milliseconds':
                    case 'millisecond':
                    case 'msecs':
                    case 'msec':
                    case 'ms':
                        return n;
                }
            }

            /**
             * Short format for `ms`.
             *
             * @param {Number} ms
             * @return {String}
             * @api private
             */

            function _short(ms) {
                if (ms >= d) return Math.round(ms / d) + 'd';
                if (ms >= h) return Math.round(ms / h) + 'h';
                if (ms >= m) return Math.round(ms / m) + 'm';
                if (ms >= s) return Math.round(ms / s) + 's';
                return ms + 'ms';
            }

            /**
             * Long format for `ms`.
             *
             * @param {Number} ms
             * @return {String}
             * @api private
             */

            function _long(ms) {
                return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
            }

            /**
             * Pluralization helper.
             */

            function plural(ms, n, name) {
                if (ms < n) return;
                if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
                return Math.ceil(ms / n) + ' ' + name + 's';
            }
        }, {}], 9: [function (require, module, exports) {
            (function (process, global) {
                /*!
                 * @overview es6-promise - a tiny implementation of Promises/A+.
                 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
                 * @license   Licensed under MIT license
                 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
                 * @version   2.3.0
                 */

                (function () {
                    "use strict";

                    function lib$es6$promise$utils$$objectOrFunction(x) {
                        return typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
                    }

                    function lib$es6$promise$utils$$isFunction(x) {
                        return typeof x === 'function';
                    }

                    function lib$es6$promise$utils$$isMaybeThenable(x) {
                        return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
                    }

                    var lib$es6$promise$utils$$_isArray;
                    if (!Array.isArray) {
                        lib$es6$promise$utils$$_isArray = function lib$es6$promise$utils$$_isArray(x) {
                            return Object.prototype.toString.call(x) === '[object Array]';
                        };
                    } else {
                        lib$es6$promise$utils$$_isArray = Array.isArray;
                    }

                    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
                    var lib$es6$promise$asap$$len = 0;
                    var lib$es6$promise$asap$$toString = {}.toString;
                    var lib$es6$promise$asap$$vertxNext;
                    var lib$es6$promise$asap$$customSchedulerFn;

                    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
                        lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
                        lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
                        lib$es6$promise$asap$$len += 2;
                        if (lib$es6$promise$asap$$len === 2) {
                            // If len is 2, that means that we need to schedule an async flush.
                            // If additional callbacks are queued before the queue is flushed, they
                            // will be processed by this flush that we are scheduling.
                            if (lib$es6$promise$asap$$customSchedulerFn) {
                                lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
                            } else {
                                lib$es6$promise$asap$$scheduleFlush();
                            }
                        }
                    };

                    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
                        lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
                    }

                    function lib$es6$promise$asap$$setAsap(asapFn) {
                        lib$es6$promise$asap$$asap = asapFn;
                    }

                    var lib$es6$promise$asap$$browserWindow = typeof window !== 'undefined' ? window : undefined;
                    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
                    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
                    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

                    // test for web worker but not in IE10
                    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

                    // node
                    function lib$es6$promise$asap$$useNextTick() {
                        var nextTick = process.nextTick;
                        // node version 0.10.x displays a deprecation warning when nextTick is used recursively
                        // setImmediate should be used instead instead
                        var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
                        if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
                            nextTick = setImmediate;
                        }
                        return function () {
                            nextTick(lib$es6$promise$asap$$flush);
                        };
                    }

                    // vertx
                    function lib$es6$promise$asap$$useVertxTimer() {
                        return function () {
                            lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
                        };
                    }

                    function lib$es6$promise$asap$$useMutationObserver() {
                        var iterations = 0;
                        var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
                        var node = document.createTextNode('');
                        observer.observe(node, { characterData: true });

                        return function () {
                            node.data = iterations = ++iterations % 2;
                        };
                    }

                    // web worker
                    function lib$es6$promise$asap$$useMessageChannel() {
                        var channel = new MessageChannel();
                        channel.port1.onmessage = lib$es6$promise$asap$$flush;
                        return function () {
                            channel.port2.postMessage(0);
                        };
                    }

                    function lib$es6$promise$asap$$useSetTimeout() {
                        return function () {
                            setTimeout(lib$es6$promise$asap$$flush, 1);
                        };
                    }

                    var lib$es6$promise$asap$$queue = new Array(1000);
                    function lib$es6$promise$asap$$flush() {
                        for (var i = 0; i < lib$es6$promise$asap$$len; i += 2) {
                            var callback = lib$es6$promise$asap$$queue[i];
                            var arg = lib$es6$promise$asap$$queue[i + 1];

                            callback(arg);

                            lib$es6$promise$asap$$queue[i] = undefined;
                            lib$es6$promise$asap$$queue[i + 1] = undefined;
                        }

                        lib$es6$promise$asap$$len = 0;
                    }

                    function lib$es6$promise$asap$$attemptVertex() {
                        try {
                            var r = require;
                            var vertx = r('vertx');
                            lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
                            return lib$es6$promise$asap$$useVertxTimer();
                        } catch (e) {
                            return lib$es6$promise$asap$$useSetTimeout();
                        }
                    }

                    var lib$es6$promise$asap$$scheduleFlush;
                    // Decide what async method to use to triggering processing of queued callbacks:
                    if (lib$es6$promise$asap$$isNode) {
                        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
                    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
                        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
                    } else if (lib$es6$promise$asap$$isWorker) {
                        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
                    } else if (lib$es6$promise$asap$$browserWindow === undefined && typeof require === 'function') {
                        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertex();
                    } else {
                        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
                    }

                    function lib$es6$promise$$internal$$noop() {}

                    var lib$es6$promise$$internal$$PENDING = void 0;
                    var lib$es6$promise$$internal$$FULFILLED = 1;
                    var lib$es6$promise$$internal$$REJECTED = 2;

                    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

                    function lib$es6$promise$$internal$$selfFullfillment() {
                        return new TypeError("You cannot resolve a promise with itself");
                    }

                    function lib$es6$promise$$internal$$cannotReturnOwn() {
                        return new TypeError('A promises callback cannot return that same promise.');
                    }

                    function lib$es6$promise$$internal$$getThen(promise) {
                        try {
                            return promise.then;
                        } catch (error) {
                            lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
                            return lib$es6$promise$$internal$$GET_THEN_ERROR;
                        }
                    }

                    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
                        try {
                            then.call(value, fulfillmentHandler, rejectionHandler);
                        } catch (e) {
                            return e;
                        }
                    }

                    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
                        lib$es6$promise$asap$$asap(function (promise) {
                            var sealed = false;
                            var error = lib$es6$promise$$internal$$tryThen(then, thenable, function (value) {
                                if (sealed) {
                                    return;
                                }
                                sealed = true;
                                if (thenable !== value) {
                                    lib$es6$promise$$internal$$resolve(promise, value);
                                } else {
                                    lib$es6$promise$$internal$$fulfill(promise, value);
                                }
                            }, function (reason) {
                                if (sealed) {
                                    return;
                                }
                                sealed = true;

                                lib$es6$promise$$internal$$reject(promise, reason);
                            }, 'Settle: ' + (promise._label || ' unknown promise'));

                            if (!sealed && error) {
                                sealed = true;
                                lib$es6$promise$$internal$$reject(promise, error);
                            }
                        }, promise);
                    }

                    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
                        if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
                            lib$es6$promise$$internal$$fulfill(promise, thenable._result);
                        } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
                            lib$es6$promise$$internal$$reject(promise, thenable._result);
                        } else {
                            lib$es6$promise$$internal$$subscribe(thenable, undefined, function (value) {
                                lib$es6$promise$$internal$$resolve(promise, value);
                            }, function (reason) {
                                lib$es6$promise$$internal$$reject(promise, reason);
                            });
                        }
                    }

                    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
                        if (maybeThenable.constructor === promise.constructor) {
                            lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
                        } else {
                            var then = lib$es6$promise$$internal$$getThen(maybeThenable);

                            if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
                                lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
                            } else if (then === undefined) {
                                lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
                            } else if (lib$es6$promise$utils$$isFunction(then)) {
                                lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
                            } else {
                                lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
                            }
                        }
                    }

                    function lib$es6$promise$$internal$$resolve(promise, value) {
                        if (promise === value) {
                            lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFullfillment());
                        } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
                            lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
                        } else {
                            lib$es6$promise$$internal$$fulfill(promise, value);
                        }
                    }

                    function lib$es6$promise$$internal$$publishRejection(promise) {
                        if (promise._onerror) {
                            promise._onerror(promise._result);
                        }

                        lib$es6$promise$$internal$$publish(promise);
                    }

                    function lib$es6$promise$$internal$$fulfill(promise, value) {
                        if (promise._state !== lib$es6$promise$$internal$$PENDING) {
                            return;
                        }

                        promise._result = value;
                        promise._state = lib$es6$promise$$internal$$FULFILLED;

                        if (promise._subscribers.length !== 0) {
                            lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
                        }
                    }

                    function lib$es6$promise$$internal$$reject(promise, reason) {
                        if (promise._state !== lib$es6$promise$$internal$$PENDING) {
                            return;
                        }
                        promise._state = lib$es6$promise$$internal$$REJECTED;
                        promise._result = reason;

                        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
                    }

                    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
                        var subscribers = parent._subscribers;
                        var length = subscribers.length;

                        parent._onerror = null;

                        subscribers[length] = child;
                        subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
                        subscribers[length + lib$es6$promise$$internal$$REJECTED] = onRejection;

                        if (length === 0 && parent._state) {
                            lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
                        }
                    }

                    function lib$es6$promise$$internal$$publish(promise) {
                        var subscribers = promise._subscribers;
                        var settled = promise._state;

                        if (subscribers.length === 0) {
                            return;
                        }

                        var child,
                            callback,
                            detail = promise._result;

                        for (var i = 0; i < subscribers.length; i += 3) {
                            child = subscribers[i];
                            callback = subscribers[i + settled];

                            if (child) {
                                lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
                            } else {
                                callback(detail);
                            }
                        }

                        promise._subscribers.length = 0;
                    }

                    function lib$es6$promise$$internal$$ErrorObject() {
                        this.error = null;
                    }

                    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

                    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
                        try {
                            return callback(detail);
                        } catch (e) {
                            lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
                            return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
                        }
                    }

                    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
                        var hasCallback = lib$es6$promise$utils$$isFunction(callback),
                            value,
                            error,
                            succeeded,
                            failed;

                        if (hasCallback) {
                            value = lib$es6$promise$$internal$$tryCatch(callback, detail);

                            if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
                                failed = true;
                                error = value.error;
                                value = null;
                            } else {
                                succeeded = true;
                            }

                            if (promise === value) {
                                lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
                                return;
                            }
                        } else {
                            value = detail;
                            succeeded = true;
                        }

                        if (promise._state !== lib$es6$promise$$internal$$PENDING) {
                            // noop
                        } else if (hasCallback && succeeded) {
                            lib$es6$promise$$internal$$resolve(promise, value);
                        } else if (failed) {
                            lib$es6$promise$$internal$$reject(promise, error);
                        } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
                            lib$es6$promise$$internal$$fulfill(promise, value);
                        } else if (settled === lib$es6$promise$$internal$$REJECTED) {
                            lib$es6$promise$$internal$$reject(promise, value);
                        }
                    }

                    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
                        try {
                            resolver(function resolvePromise(value) {
                                lib$es6$promise$$internal$$resolve(promise, value);
                            }, function rejectPromise(reason) {
                                lib$es6$promise$$internal$$reject(promise, reason);
                            });
                        } catch (e) {
                            lib$es6$promise$$internal$$reject(promise, e);
                        }
                    }

                    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
                        var enumerator = this;

                        enumerator._instanceConstructor = Constructor;
                        enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);

                        if (enumerator._validateInput(input)) {
                            enumerator._input = input;
                            enumerator.length = input.length;
                            enumerator._remaining = input.length;

                            enumerator._init();

                            if (enumerator.length === 0) {
                                lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
                            } else {
                                enumerator.length = enumerator.length || 0;
                                enumerator._enumerate();
                                if (enumerator._remaining === 0) {
                                    lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
                                }
                            }
                        } else {
                            lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
                        }
                    }

                    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function (input) {
                        return lib$es6$promise$utils$$isArray(input);
                    };

                    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function () {
                        return new Error('Array Methods must be provided an Array');
                    };

                    lib$es6$promise$enumerator$$Enumerator.prototype._init = function () {
                        this._result = new Array(this.length);
                    };

                    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;

                    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function () {
                        var enumerator = this;

                        var length = enumerator.length;
                        var promise = enumerator.promise;
                        var input = enumerator._input;

                        for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
                            enumerator._eachEntry(input[i], i);
                        }
                    };

                    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function (entry, i) {
                        var enumerator = this;
                        var c = enumerator._instanceConstructor;

                        if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
                            if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
                                entry._onerror = null;
                                enumerator._settledAt(entry._state, i, entry._result);
                            } else {
                                enumerator._willSettleAt(c.resolve(entry), i);
                            }
                        } else {
                            enumerator._remaining--;
                            enumerator._result[i] = entry;
                        }
                    };

                    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function (state, i, value) {
                        var enumerator = this;
                        var promise = enumerator.promise;

                        if (promise._state === lib$es6$promise$$internal$$PENDING) {
                            enumerator._remaining--;

                            if (state === lib$es6$promise$$internal$$REJECTED) {
                                lib$es6$promise$$internal$$reject(promise, value);
                            } else {
                                enumerator._result[i] = value;
                            }
                        }

                        if (enumerator._remaining === 0) {
                            lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
                        }
                    };

                    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function (promise, i) {
                        var enumerator = this;

                        lib$es6$promise$$internal$$subscribe(promise, undefined, function (value) {
                            enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
                        }, function (reason) {
                            enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
                        });
                    };
                    function lib$es6$promise$promise$all$$all(entries) {
                        return new lib$es6$promise$enumerator$$default(this, entries).promise;
                    }
                    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
                    function lib$es6$promise$promise$race$$race(entries) {
                        /*jshint validthis:true */
                        var Constructor = this;

                        var promise = new Constructor(lib$es6$promise$$internal$$noop);

                        if (!lib$es6$promise$utils$$isArray(entries)) {
                            lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
                            return promise;
                        }

                        var length = entries.length;

                        function onFulfillment(value) {
                            lib$es6$promise$$internal$$resolve(promise, value);
                        }

                        function onRejection(reason) {
                            lib$es6$promise$$internal$$reject(promise, reason);
                        }

                        for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
                            lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
                        }

                        return promise;
                    }
                    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
                    function lib$es6$promise$promise$resolve$$resolve(object) {
                        /*jshint validthis:true */
                        var Constructor = this;

                        if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Constructor) {
                            return object;
                        }

                        var promise = new Constructor(lib$es6$promise$$internal$$noop);
                        lib$es6$promise$$internal$$resolve(promise, object);
                        return promise;
                    }
                    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
                    function lib$es6$promise$promise$reject$$reject(reason) {
                        /*jshint validthis:true */
                        var Constructor = this;
                        var promise = new Constructor(lib$es6$promise$$internal$$noop);
                        lib$es6$promise$$internal$$reject(promise, reason);
                        return promise;
                    }
                    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

                    var lib$es6$promise$promise$$counter = 0;

                    function lib$es6$promise$promise$$needsResolver() {
                        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
                    }

                    function lib$es6$promise$promise$$needsNew() {
                        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                    }

                    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
                    /**
                     Promise objects represent the eventual result of an asynchronous operation. The
                     primary way of interacting with a promise is through its `then` method, which
                     registers callbacks to receive either a promise's eventual value or the reason
                     why the promise cannot be fulfilled.
                      Terminology
                     -----------
                      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
                     - `thenable` is an object or function that defines a `then` method.
                     - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
                     - `exception` is a value that is thrown using the throw statement.
                     - `reason` is a value that indicates why a promise was rejected.
                     - `settled` the final resting state of a promise, fulfilled or rejected.
                      A promise can be in one of three states: pending, fulfilled, or rejected.
                      Promises that are fulfilled have a fulfillment value and are in the fulfilled
                     state.  Promises that are rejected have a rejection reason and are in the
                     rejected state.  A fulfillment value is never a thenable.
                      Promises can also be said to *resolve* a value.  If this value is also a
                     promise, then the original promise's settled state will match the value's
                     settled state.  So a promise that *resolves* a promise that rejects will
                     itself reject, and a promise that *resolves* a promise that fulfills will
                     itself fulfill.
                       Basic Usage:
                     ------------
                      ```js
                     var promise = new Promise(function(resolve, reject) {
                    // on success
                    resolve(value);
                    // on failure
                    reject(reason);
                    });
                      promise.then(function(value) {
                    // on fulfillment
                    }, function(reason) {
                    // on rejection
                    });
                     ```
                      Advanced Usage:
                     ---------------
                      Promises shine when abstracting away asynchronous interactions such as
                     `XMLHttpRequest`s.
                      ```js
                     function getJSON(url) {
                    return new Promise(function(resolve, reject){
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url);
                    xhr.onreadystatechange = handler;
                    xhr.responseType = 'json';
                    xhr.setRequestHeader('Accept', 'application/json');
                    xhr.send();
                    function handler() {
                    if (this.readyState === this.DONE) {
                      if (this.status === 200) {
                        resolve(this.response);
                      } else {
                        reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
                      }
                    }
                    };
                    });
                    }
                      getJSON('/posts.json').then(function(json) {
                    // on fulfillment
                    }, function(reason) {
                    // on rejection
                    });
                     ```
                      Unlike callbacks, promises are great composable primitives.
                      ```js
                     Promise.all([
                     getJSON('/posts'),
                     getJSON('/comments')
                     ]).then(function(values){
                    values[0] // => postsJSON
                    values[1] // => commentsJSON
                    return values;
                    });
                     ```
                      @class Promise
                     @param {function} resolver
                     Useful for tooling.
                     @constructor
                     */
                    function lib$es6$promise$promise$$Promise(resolver) {
                        this._id = lib$es6$promise$promise$$counter++;
                        this._state = undefined;
                        this._result = undefined;
                        this._subscribers = [];

                        if (lib$es6$promise$$internal$$noop !== resolver) {
                            if (!lib$es6$promise$utils$$isFunction(resolver)) {
                                lib$es6$promise$promise$$needsResolver();
                            }

                            if (!(this instanceof lib$es6$promise$promise$$Promise)) {
                                lib$es6$promise$promise$$needsNew();
                            }

                            lib$es6$promise$$internal$$initializePromise(this, resolver);
                        }
                    }

                    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
                    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
                    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
                    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
                    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
                    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
                    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

                    lib$es6$promise$promise$$Promise.prototype = {
                        constructor: lib$es6$promise$promise$$Promise,

                        /**
                         The primary way of interacting with a promise is through its `then` method,
                         which registers callbacks to receive either a promise's eventual value or the
                         reason why the promise cannot be fulfilled.
                          ```js
                         findUser().then(function(user){
                        // user is available
                        }, function(reason){
                        // user is unavailable, and you are given the reason why
                        });
                         ```
                          Chaining
                         --------
                          The return value of `then` is itself a promise.  This second, 'downstream'
                         promise is resolved with the return value of the first promise's fulfillment
                         or rejection handler, or rejected if the handler throws an exception.
                          ```js
                         findUser().then(function (user) {
                        return user.name;
                        }, function (reason) {
                        return 'default name';
                        }).then(function (userName) {
                        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
                        // will be `'default name'`
                        });
                          findUser().then(function (user) {
                        throw new Error('Found user, but still unhappy');
                        }, function (reason) {
                        throw new Error('`findUser` rejected and we're unhappy');
                        }).then(function (value) {
                        // never reached
                        }, function (reason) {
                        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
                        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
                        });
                         ```
                         If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
                          ```js
                         findUser().then(function (user) {
                        throw new PedagogicalException('Upstream error');
                        }).then(function (value) {
                        // never reached
                        }).then(function (value) {
                        // never reached
                        }, function (reason) {
                        // The `PedgagocialException` is propagated all the way down to here
                        });
                         ```
                          Assimilation
                         ------------
                          Sometimes the value you want to propagate to a downstream promise can only be
                         retrieved asynchronously. This can be achieved by returning a promise in the
                         fulfillment or rejection handler. The downstream promise will then be pending
                         until the returned promise is settled. This is called *assimilation*.
                          ```js
                         findUser().then(function (user) {
                        return findCommentsByAuthor(user);
                        }).then(function (comments) {
                        // The user's comments are now available
                        });
                         ```
                          If the assimliated promise rejects, then the downstream promise will also reject.
                          ```js
                         findUser().then(function (user) {
                        return findCommentsByAuthor(user);
                        }).then(function (comments) {
                        // If `findCommentsByAuthor` fulfills, we'll have the value here
                        }, function (reason) {
                        // If `findCommentsByAuthor` rejects, we'll have the reason here
                        });
                         ```
                          Simple Example
                         --------------
                          Synchronous Example
                          ```javascript
                         var result;
                          try {
                        result = findResult();
                        // success
                        } catch(reason) {
                        // failure
                        }
                         ```
                          Errback Example
                          ```js
                         findResult(function(result, err){
                        if (err) {
                        // failure
                        } else {
                        // success
                        }
                        });
                         ```
                          Promise Example;
                          ```javascript
                         findResult().then(function(result){
                        // success
                        }, function(reason){
                        // failure
                        });
                         ```
                          Advanced Example
                         --------------
                          Synchronous Example
                          ```javascript
                         var author, books;
                          try {
                        author = findAuthor();
                        books  = findBooksByAuthor(author);
                        // success
                        } catch(reason) {
                        // failure
                        }
                         ```
                          Errback Example
                          ```js
                          function foundBooks(books) {
                        }
                          function failure(reason) {
                        }
                          findAuthor(function(author, err){
                        if (err) {
                        failure(err);
                        // failure
                        } else {
                        try {
                        findBoooksByAuthor(author, function(books, err) {
                        if (err) {
                        failure(err);
                        } else {
                        try {
                          foundBooks(books);
                        } catch(reason) {
                          failure(reason);
                        }
                        }
                        });
                        } catch(error) {
                        failure(err);
                        }
                        // success
                        }
                        });
                         ```
                          Promise Example;
                          ```javascript
                         findAuthor().
                         then(findBooksByAuthor).
                         then(function(books){
                        // found books
                        }).catch(function(reason){
                        // something went wrong
                        });
                         ```
                          @method then
                         @param {Function} onFulfilled
                         @param {Function} onRejected
                         Useful for tooling.
                         @return {Promise}
                         */
                        then: function then(onFulfillment, onRejection) {
                            var parent = this;
                            var state = parent._state;

                            if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
                                return this;
                            }

                            var child = new this.constructor(lib$es6$promise$$internal$$noop);
                            var result = parent._result;

                            if (state) {
                                var callback = arguments[state - 1];
                                lib$es6$promise$asap$$asap(function () {
                                    lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
                                });
                            } else {
                                lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
                            }

                            return child;
                        },

                        /**
                         `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
                         as the catch block of a try/catch statement.
                          ```js
                         function findAuthor(){
                        throw new Error('couldn't find that author');
                        }
                          // synchronous
                         try {
                        findAuthor();
                        } catch(reason) {
                        // something went wrong
                        }
                          // async with promises
                         findAuthor().catch(function(reason){
                        // something went wrong
                        });
                         ```
                          @method catch
                         @param {Function} onRejection
                         Useful for tooling.
                         @return {Promise}
                         */
                        'catch': function _catch(onRejection) {
                            return this.then(null, onRejection);
                        }
                    };
                    function lib$es6$promise$polyfill$$polyfill() {
                        var local;

                        if (typeof global !== 'undefined') {
                            local = global;
                        } else if (typeof self !== 'undefined') {
                            local = self;
                        } else {
                            try {
                                local = Function('return this')();
                            } catch (e) {
                                throw new Error('polyfill failed because global object is unavailable in this environment');
                            }
                        }

                        var P = local.Promise;

                        if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
                            return;
                        }

                        local.Promise = lib$es6$promise$promise$$default;
                    }
                    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

                    var lib$es6$promise$umd$$ES6Promise = {
                        'Promise': lib$es6$promise$promise$$default,
                        'polyfill': lib$es6$promise$polyfill$$default
                    };

                    /* global define:true module:true window: true */
                    if (typeof define === 'function' && define['amd']) {
                        define(function () {
                            return lib$es6$promise$umd$$ES6Promise;
                        });
                    } else if (typeof module !== 'undefined' && module['exports']) {
                        module['exports'] = lib$es6$promise$umd$$ES6Promise;
                    } else if (typeof this !== 'undefined') {
                        this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
                    }

                    lib$es6$promise$polyfill$$default();
                }).call(this);
            }).call(this, require(2), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, { "2": 2 }], 10: [function (require, module, exports) {
            if (typeof Object.create === 'function') {
                // implementation from standard node.js 'util' module
                module.exports = function inherits(ctor, superCtor) {
                    ctor.super_ = superCtor;
                    ctor.prototype = Object.create(superCtor.prototype, {
                        constructor: {
                            value: ctor,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                };
            } else {
                // old school shim for old browsers
                module.exports = function inherits(ctor, superCtor) {
                    ctor.super_ = superCtor;
                    var TempCtor = function TempCtor() {};
                    TempCtor.prototype = superCtor.prototype;
                    ctor.prototype = new TempCtor();
                    ctor.prototype.constructor = ctor;
                };
            }
        }, {}], 11: [function (require, module, exports) {
            var arrayEach = require(14),
                baseEach = require(18),
                createForEach = require(30);

            /**
             * Iterates over elements of `collection` invoking `iteratee` for each element.
             * The `iteratee` is bound to `thisArg` and invoked with three arguments:
             * (value, index|key, collection). Iteratee functions may exit iteration early
             * by explicitly returning `false`.
             *
             * **Note:** As with other "Collections" methods, objects with a "length" property
             * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
             * may be used for object iteration.
             *
             * @static
             * @memberOf _
             * @alias each
             * @category Collection
             * @param {Array|Object|string} collection The collection to iterate over.
             * @param {Function} [iteratee=_.identity] The function invoked per iteration.
             * @param {*} [thisArg] The `this` binding of `iteratee`.
             * @returns {Array|Object|string} Returns `collection`.
             * @example
             *
             * _([1, 2]).forEach(function(n) {
            *   console.log(n);
            * }).value();
             * // => logs each value from left to right and returns the array
             *
             * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
            *   console.log(n, key);
            * });
             * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
             */
            var forEach = createForEach(arrayEach, baseEach);

            module.exports = forEach;
        }, { "14": 14, "18": 18, "30": 30 }], 12: [function (require, module, exports) {
            /** Used as the `TypeError` message for "Functions" methods. */
            var FUNC_ERROR_TEXT = 'Expected a function';

            /* Native method references for those with the same name as other `lodash` methods. */
            var nativeMax = Math.max;

            /**
             * Creates a function that invokes `func` with the `this` binding of the
             * created function and arguments from `start` and beyond provided as an array.
             *
             * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
             *
             * @static
             * @memberOf _
             * @category Function
             * @param {Function} func The function to apply a rest parameter to.
             * @param {number} [start=func.length-1] The start position of the rest parameter.
             * @returns {Function} Returns the new function.
             * @example
             *
             * var say = _.restParam(function(what, names) {
            *   return what + ' ' + _.initial(names).join(', ') +
            *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
            * });
             *
             * say('hello', 'fred', 'barney', 'pebbles');
             * // => 'hello fred, barney, & pebbles'
             */
            function restParam(func, start) {
                if (typeof func != 'function') {
                    throw new TypeError(FUNC_ERROR_TEXT);
                }
                start = nativeMax(start === undefined ? func.length - 1 : +start || 0, 0);
                return function () {
                    var args = arguments,
                        index = -1,
                        length = nativeMax(args.length - start, 0),
                        rest = Array(length);

                    while (++index < length) {
                        rest[index] = args[start + index];
                    }
                    switch (start) {
                        case 0:
                            return func.call(this, rest);
                        case 1:
                            return func.call(this, args[0], rest);
                        case 2:
                            return func.call(this, args[0], args[1], rest);
                    }
                    var otherArgs = Array(start + 1);
                    index = -1;
                    while (++index < start) {
                        otherArgs[index] = args[index];
                    }
                    otherArgs[start] = rest;
                    return func.apply(this, otherArgs);
                };
            }

            module.exports = restParam;
        }, {}], 13: [function (require, module, exports) {
            /**
             * Copies the values of `source` to `array`.
             *
             * @private
             * @param {Array} source The array to copy values from.
             * @param {Array} [array=[]] The array to copy values to.
             * @returns {Array} Returns `array`.
             */
            function arrayCopy(source, array) {
                var index = -1,
                    length = source.length;

                array || (array = Array(length));
                while (++index < length) {
                    array[index] = source[index];
                }
                return array;
            }

            module.exports = arrayCopy;
        }, {}], 14: [function (require, module, exports) {
            /**
             * A specialized version of `_.forEach` for arrays without support for callback
             * shorthands and `this` binding.
             *
             * @private
             * @param {Array} array The array to iterate over.
             * @param {Function} iteratee The function invoked per iteration.
             * @returns {Array} Returns `array`.
             */
            function arrayEach(array, iteratee) {
                var index = -1,
                    length = array.length;

                while (++index < length) {
                    if (iteratee(array[index], index, array) === false) {
                        break;
                    }
                }
                return array;
            }

            module.exports = arrayEach;
        }, {}], 15: [function (require, module, exports) {
            var baseCopy = require(17),
                keys = require(55);

            /**
             * The base implementation of `_.assign` without support for argument juggling,
             * multiple sources, and `customizer` functions.
             *
             * @private
             * @param {Object} object The destination object.
             * @param {Object} source The source object.
             * @returns {Object} Returns `object`.
             */
            function baseAssign(object, source) {
                return source == null ? object : baseCopy(source, keys(source), object);
            }

            module.exports = baseAssign;
        }, { "17": 17, "55": 55 }], 16: [function (require, module, exports) {
            var arrayCopy = require(13),
                arrayEach = require(14),
                baseAssign = require(15),
                baseForOwn = require(21),
                initCloneArray = require(33),
                initCloneByTag = require(34),
                initCloneObject = require(35),
                isArray = require(47),
                isHostObject = require(37),
                isObject = require(50);

            /** `Object#toString` result references. */
            var argsTag = '[object Arguments]',
                arrayTag = '[object Array]',
                boolTag = '[object Boolean]',
                dateTag = '[object Date]',
                errorTag = '[object Error]',
                funcTag = '[object Function]',
                mapTag = '[object Map]',
                numberTag = '[object Number]',
                objectTag = '[object Object]',
                regexpTag = '[object RegExp]',
                setTag = '[object Set]',
                stringTag = '[object String]',
                weakMapTag = '[object WeakMap]';

            var arrayBufferTag = '[object ArrayBuffer]',
                float32Tag = '[object Float32Array]',
                float64Tag = '[object Float64Array]',
                int8Tag = '[object Int8Array]',
                int16Tag = '[object Int16Array]',
                int32Tag = '[object Int32Array]',
                uint8Tag = '[object Uint8Array]',
                uint8ClampedTag = '[object Uint8ClampedArray]',
                uint16Tag = '[object Uint16Array]',
                uint32Tag = '[object Uint32Array]';

            /** Used to identify `toStringTag` values supported by `_.clone`. */
            var cloneableTags = {};
            cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[stringTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
            cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[mapTag] = cloneableTags[setTag] = cloneableTags[weakMapTag] = false;

            /** Used for native method references. */
            var objectProto = Object.prototype;

            /**
             * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
             * of values.
             */
            var objToString = objectProto.toString;

            /**
             * The base implementation of `_.clone` without support for argument juggling
             * and `this` binding `customizer` functions.
             *
             * @private
             * @param {*} value The value to clone.
             * @param {boolean} [isDeep] Specify a deep clone.
             * @param {Function} [customizer] The function to customize cloning values.
             * @param {string} [key] The key of `value`.
             * @param {Object} [object] The object `value` belongs to.
             * @param {Array} [stackA=[]] Tracks traversed source objects.
             * @param {Array} [stackB=[]] Associates clones with source counterparts.
             * @returns {*} Returns the cloned value.
             */
            function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
                var result;
                if (customizer) {
                    result = object ? customizer(value, key, object) : customizer(value);
                }
                if (result !== undefined) {
                    return result;
                }
                if (!isObject(value)) {
                    return value;
                }
                var isArr = isArray(value);
                if (isArr) {
                    result = initCloneArray(value);
                    if (!isDeep) {
                        return arrayCopy(value, result);
                    }
                } else {
                    var tag = objToString.call(value),
                        isFunc = tag == funcTag;

                    if (tag == objectTag || tag == argsTag || isFunc && !object) {
                        if (isHostObject(value)) {
                            return object ? value : {};
                        }
                        result = initCloneObject(isFunc ? {} : value);
                        if (!isDeep) {
                            return baseAssign(result, value);
                        }
                    } else {
                        return cloneableTags[tag] ? initCloneByTag(value, tag, isDeep) : object ? value : {};
                    }
                }
                // Check for circular references and return its corresponding clone.
                stackA || (stackA = []);
                stackB || (stackB = []);

                var length = stackA.length;
                while (length--) {
                    if (stackA[length] == value) {
                        return stackB[length];
                    }
                }
                // Add the source value to the stack of traversed objects and associate it with its clone.
                stackA.push(value);
                stackB.push(result);

                // Recursively populate clone (susceptible to call stack limits).
                (isArr ? arrayEach : baseForOwn)(value, function (subValue, key) {
                    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
                });
                return result;
            }

            module.exports = baseClone;
        }, { "13": 13, "14": 14, "15": 15, "21": 21, "33": 33, "34": 34, "35": 35, "37": 37, "47": 47, "50": 50 }], 17: [function (require, module, exports) {
            /**
             * Copies properties of `source` to `object`.
             *
             * @private
             * @param {Object} source The object to copy properties from.
             * @param {Array} props The property names to copy.
             * @param {Object} [object={}] The object to copy properties to.
             * @returns {Object} Returns `object`.
             */
            function baseCopy(source, props, object) {
                object || (object = {});

                var index = -1,
                    length = props.length;

                while (++index < length) {
                    var key = props[index];
                    object[key] = source[key];
                }
                return object;
            }

            module.exports = baseCopy;
        }, {}], 18: [function (require, module, exports) {
            var baseForOwn = require(21),
                createBaseEach = require(28);

            /**
             * The base implementation of `_.forEach` without support for callback
             * shorthands and `this` binding.
             *
             * @private
             * @param {Array|Object|string} collection The collection to iterate over.
             * @param {Function} iteratee The function invoked per iteration.
             * @returns {Array|Object|string} Returns `collection`.
             */
            var baseEach = createBaseEach(baseForOwn);

            module.exports = baseEach;
        }, { "21": 21, "28": 28 }], 19: [function (require, module, exports) {
            var createBaseFor = require(29);

            /**
             * The base implementation of `baseForIn` and `baseForOwn` which iterates
             * over `object` properties returned by `keysFunc` invoking `iteratee` for
             * each property. Iteratee functions may exit iteration early by explicitly
             * returning `false`.
             *
             * @private
             * @param {Object} object The object to iterate over.
             * @param {Function} iteratee The function invoked per iteration.
             * @param {Function} keysFunc The function to get the keys of `object`.
             * @returns {Object} Returns `object`.
             */
            var baseFor = createBaseFor();

            module.exports = baseFor;
        }, { "29": 29 }], 20: [function (require, module, exports) {
            var baseFor = require(19),
                keysIn = require(56);

            /**
             * The base implementation of `_.forIn` without support for callback
             * shorthands and `this` binding.
             *
             * @private
             * @param {Object} object The object to iterate over.
             * @param {Function} iteratee The function invoked per iteration.
             * @returns {Object} Returns `object`.
             */
            function baseForIn(object, iteratee) {
                return baseFor(object, iteratee, keysIn);
            }

            module.exports = baseForIn;
        }, { "19": 19, "56": 56 }], 21: [function (require, module, exports) {
            var baseFor = require(19),
                keys = require(55);

            /**
             * The base implementation of `_.forOwn` without support for callback
             * shorthands and `this` binding.
             *
             * @private
             * @param {Object} object The object to iterate over.
             * @param {Function} iteratee The function invoked per iteration.
             * @returns {Object} Returns `object`.
             */
            function baseForOwn(object, iteratee) {
                return baseFor(object, iteratee, keys);
            }

            module.exports = baseForOwn;
        }, { "19": 19, "55": 55 }], 22: [function (require, module, exports) {
            var arrayEach = require(14),
                baseMergeDeep = require(23),
                isArray = require(47),
                isArrayLike = require(36),
                isObject = require(50),
                isObjectLike = require(41),
                isTypedArray = require(53),
                keys = require(55);

            /**
             * The base implementation of `_.merge` without support for argument juggling,
             * multiple sources, and `this` binding `customizer` functions.
             *
             * @private
             * @param {Object} object The destination object.
             * @param {Object} source The source object.
             * @param {Function} [customizer] The function to customize merged values.
             * @param {Array} [stackA=[]] Tracks traversed source objects.
             * @param {Array} [stackB=[]] Associates values with source counterparts.
             * @returns {Object} Returns `object`.
             */
            function baseMerge(object, source, customizer, stackA, stackB) {
                if (!isObject(object)) {
                    return object;
                }
                var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
                    props = isSrcArr ? undefined : keys(source);

                arrayEach(props || source, function (srcValue, key) {
                    if (props) {
                        key = srcValue;
                        srcValue = source[key];
                    }
                    if (isObjectLike(srcValue)) {
                        stackA || (stackA = []);
                        stackB || (stackB = []);
                        baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
                    } else {
                        var value = object[key],
                            result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
                            isCommon = result === undefined;

                        if (isCommon) {
                            result = srcValue;
                        }
                        if ((result !== undefined || isSrcArr && !(key in object)) && (isCommon || (result === result ? result !== value : value === value))) {
                            object[key] = result;
                        }
                    }
                });
                return object;
            }

            module.exports = baseMerge;
        }, { "14": 14, "23": 23, "36": 36, "41": 41, "47": 47, "50": 50, "53": 53, "55": 55 }], 23: [function (require, module, exports) {
            var arrayCopy = require(13),
                isArguments = require(46),
                isArray = require(47),
                isArrayLike = require(36),
                isPlainObject = require(51),
                isTypedArray = require(53),
                toPlainObject = require(54);

            /**
             * A specialized version of `baseMerge` for arrays and objects which performs
             * deep merges and tracks traversed objects enabling objects with circular
             * references to be merged.
             *
             * @private
             * @param {Object} object The destination object.
             * @param {Object} source The source object.
             * @param {string} key The key of the value to merge.
             * @param {Function} mergeFunc The function to merge values.
             * @param {Function} [customizer] The function to customize merged values.
             * @param {Array} [stackA=[]] Tracks traversed source objects.
             * @param {Array} [stackB=[]] Associates values with source counterparts.
             * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
             */
            function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
                var length = stackA.length,
                    srcValue = source[key];

                while (length--) {
                    if (stackA[length] == srcValue) {
                        object[key] = stackB[length];
                        return;
                    }
                }
                var value = object[key],
                    result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
                    isCommon = result === undefined;

                if (isCommon) {
                    result = srcValue;
                    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
                        result = isArray(value) ? value : isArrayLike(value) ? arrayCopy(value) : [];
                    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                        result = isArguments(value) ? toPlainObject(value) : isPlainObject(value) ? value : {};
                    } else {
                        isCommon = false;
                    }
                }
                // Add the source value to the stack of traversed objects and associate
                // it with its merged value.
                stackA.push(srcValue);
                stackB.push(result);

                if (isCommon) {
                    // Recursively merge objects and arrays (susceptible to call stack limits).
                    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
                } else if (result === result ? result !== value : value === value) {
                    object[key] = result;
                }
            }

            module.exports = baseMergeDeep;
        }, { "13": 13, "36": 36, "46": 46, "47": 47, "51": 51, "53": 53, "54": 54 }], 24: [function (require, module, exports) {
            var toObject = require(43);

            /**
             * The base implementation of `_.property` without support for deep paths.
             *
             * @private
             * @param {string} key The key of the property to get.
             * @returns {Function} Returns the new function.
             */
            function baseProperty(key) {
                return function (object) {
                    return object == null ? undefined : toObject(object)[key];
                };
            }

            module.exports = baseProperty;
        }, { "43": 43 }], 25: [function (require, module, exports) {
            var identity = require(59);

            /**
             * A specialized version of `baseCallback` which only supports `this` binding
             * and specifying the number of arguments to provide to `func`.
             *
             * @private
             * @param {Function} func The function to bind.
             * @param {*} thisArg The `this` binding of `func`.
             * @param {number} [argCount] The number of arguments to provide to `func`.
             * @returns {Function} Returns the callback.
             */
            function bindCallback(func, thisArg, argCount) {
                if (typeof func != 'function') {
                    return identity;
                }
                if (thisArg === undefined) {
                    return func;
                }
                switch (argCount) {
                    case 1:
                        return function (value) {
                            return func.call(thisArg, value);
                        };
                    case 3:
                        return function (value, index, collection) {
                            return func.call(thisArg, value, index, collection);
                        };
                    case 4:
                        return function (accumulator, value, index, collection) {
                            return func.call(thisArg, accumulator, value, index, collection);
                        };
                    case 5:
                        return function (value, other, key, object, source) {
                            return func.call(thisArg, value, other, key, object, source);
                        };
                }
                return function () {
                    return func.apply(thisArg, arguments);
                };
            }

            module.exports = bindCallback;
        }, { "59": 59 }], 26: [function (require, module, exports) {
            (function (global) {
                /** Native method references. */
                var ArrayBuffer = global.ArrayBuffer,
                    Uint8Array = global.Uint8Array;

                /**
                 * Creates a clone of the given array buffer.
                 *
                 * @private
                 * @param {ArrayBuffer} buffer The array buffer to clone.
                 * @returns {ArrayBuffer} Returns the cloned array buffer.
                 */
                function bufferClone(buffer) {
                    var result = new ArrayBuffer(buffer.byteLength),
                        view = new Uint8Array(result);

                    view.set(new Uint8Array(buffer));
                    return result;
                }

                module.exports = bufferClone;
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {}], 27: [function (require, module, exports) {
            var bindCallback = require(25),
                isIterateeCall = require(39),
                restParam = require(12);

            /**
             * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
             *
             * @private
             * @param {Function} assigner The function to assign values.
             * @returns {Function} Returns the new assigner function.
             */
            function createAssigner(assigner) {
                return restParam(function (object, sources) {
                    var index = -1,
                        length = object == null ? 0 : sources.length,
                        customizer = length > 2 ? sources[length - 2] : undefined,
                        guard = length > 2 ? sources[2] : undefined,
                        thisArg = length > 1 ? sources[length - 1] : undefined;

                    if (typeof customizer == 'function') {
                        customizer = bindCallback(customizer, thisArg, 5);
                        length -= 2;
                    } else {
                        customizer = typeof thisArg == 'function' ? thisArg : undefined;
                        length -= customizer ? 1 : 0;
                    }
                    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                        customizer = length < 3 ? undefined : customizer;
                        length = 1;
                    }
                    while (++index < length) {
                        var source = sources[index];
                        if (source) {
                            assigner(object, source, customizer);
                        }
                    }
                    return object;
                });
            }

            module.exports = createAssigner;
        }, { "12": 12, "25": 25, "39": 39 }], 28: [function (require, module, exports) {
            var getLength = require(31),
                isLength = require(40),
                toObject = require(43);

            /**
             * Creates a `baseEach` or `baseEachRight` function.
             *
             * @private
             * @param {Function} eachFunc The function to iterate over a collection.
             * @param {boolean} [fromRight] Specify iterating from right to left.
             * @returns {Function} Returns the new base function.
             */
            function createBaseEach(eachFunc, fromRight) {
                return function (collection, iteratee) {
                    var length = collection ? getLength(collection) : 0;
                    if (!isLength(length)) {
                        return eachFunc(collection, iteratee);
                    }
                    var index = fromRight ? length : -1,
                        iterable = toObject(collection);

                    while (fromRight ? index-- : ++index < length) {
                        if (iteratee(iterable[index], index, iterable) === false) {
                            break;
                        }
                    }
                    return collection;
                };
            }

            module.exports = createBaseEach;
        }, { "31": 31, "40": 40, "43": 43 }], 29: [function (require, module, exports) {
            var toObject = require(43);

            /**
             * Creates a base function for `_.forIn` or `_.forInRight`.
             *
             * @private
             * @param {boolean} [fromRight] Specify iterating from right to left.
             * @returns {Function} Returns the new base function.
             */
            function createBaseFor(fromRight) {
                return function (object, iteratee, keysFunc) {
                    var iterable = toObject(object),
                        props = keysFunc(object),
                        length = props.length,
                        index = fromRight ? length : -1;

                    while (fromRight ? index-- : ++index < length) {
                        var key = props[index];
                        if (iteratee(iterable[key], key, iterable) === false) {
                            break;
                        }
                    }
                    return object;
                };
            }

            module.exports = createBaseFor;
        }, { "43": 43 }], 30: [function (require, module, exports) {
            var bindCallback = require(25),
                isArray = require(47);

            /**
             * Creates a function for `_.forEach` or `_.forEachRight`.
             *
             * @private
             * @param {Function} arrayFunc The function to iterate over an array.
             * @param {Function} eachFunc The function to iterate over a collection.
             * @returns {Function} Returns the new each function.
             */
            function createForEach(arrayFunc, eachFunc) {
                return function (collection, iteratee, thisArg) {
                    return typeof iteratee == 'function' && thisArg === undefined && isArray(collection) ? arrayFunc(collection, iteratee) : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
                };
            }

            module.exports = createForEach;
        }, { "25": 25, "47": 47 }], 31: [function (require, module, exports) {
            var baseProperty = require(24);

            /**
             * Gets the "length" property value of `object`.
             *
             * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
             * that affects Safari on at least iOS 8.1-8.3 ARM64.
             *
             * @private
             * @param {Object} object The object to query.
             * @returns {*} Returns the "length" value.
             */
            var getLength = baseProperty('length');

            module.exports = getLength;
        }, { "24": 24 }], 32: [function (require, module, exports) {
            var isNative = require(49);

            /**
             * Gets the native function at `key` of `object`.
             *
             * @private
             * @param {Object} object The object to query.
             * @param {string} key The key of the method to get.
             * @returns {*} Returns the function if it's native, else `undefined`.
             */
            function getNative(object, key) {
                var value = object == null ? undefined : object[key];
                return isNative(value) ? value : undefined;
            }

            module.exports = getNative;
        }, { "49": 49 }], 33: [function (require, module, exports) {
            /** Used for native method references. */
            var objectProto = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty = objectProto.hasOwnProperty;

            /**
             * Initializes an array clone.
             *
             * @private
             * @param {Array} array The array to clone.
             * @returns {Array} Returns the initialized clone.
             */
            function initCloneArray(array) {
                var length = array.length,
                    result = new array.constructor(length);

                // Add array properties assigned by `RegExp#exec`.
                if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
                    result.index = array.index;
                    result.input = array.input;
                }
                return result;
            }

            module.exports = initCloneArray;
        }, {}], 34: [function (require, module, exports) {
            (function (global) {
                var bufferClone = require(26);

                /** `Object#toString` result references. */
                var boolTag = '[object Boolean]',
                    dateTag = '[object Date]',
                    numberTag = '[object Number]',
                    regexpTag = '[object RegExp]',
                    stringTag = '[object String]';

                var arrayBufferTag = '[object ArrayBuffer]',
                    float32Tag = '[object Float32Array]',
                    float64Tag = '[object Float64Array]',
                    int8Tag = '[object Int8Array]',
                    int16Tag = '[object Int16Array]',
                    int32Tag = '[object Int32Array]',
                    uint8Tag = '[object Uint8Array]',
                    uint8ClampedTag = '[object Uint8ClampedArray]',
                    uint16Tag = '[object Uint16Array]',
                    uint32Tag = '[object Uint32Array]';

                /** Used to match `RegExp` flags from their coerced string values. */
                var reFlags = /\w*$/;

                /** Native method references. */
                var Uint8Array = global.Uint8Array;

                /** Used to lookup a type array constructors by `toStringTag`. */
                var ctorByTag = {};
                ctorByTag[float32Tag] = global.Float32Array;
                ctorByTag[float64Tag] = global.Float64Array;
                ctorByTag[int8Tag] = global.Int8Array;
                ctorByTag[int16Tag] = global.Int16Array;
                ctorByTag[int32Tag] = global.Int32Array;
                ctorByTag[uint8Tag] = Uint8Array;
                ctorByTag[uint8ClampedTag] = global.Uint8ClampedArray;
                ctorByTag[uint16Tag] = global.Uint16Array;
                ctorByTag[uint32Tag] = global.Uint32Array;

                /**
                 * Initializes an object clone based on its `toStringTag`.
                 *
                 * **Note:** This function only supports cloning values with tags of
                 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
                 *
                 * @private
                 * @param {Object} object The object to clone.
                 * @param {string} tag The `toStringTag` of the object to clone.
                 * @param {boolean} [isDeep] Specify a deep clone.
                 * @returns {Object} Returns the initialized clone.
                 */
                function initCloneByTag(object, tag, isDeep) {
                    var Ctor = object.constructor;
                    switch (tag) {
                        case arrayBufferTag:
                            return bufferClone(object);

                        case boolTag:
                        case dateTag:
                            return new Ctor(+object);

                        case float32Tag:case float64Tag:
                        case int8Tag:case int16Tag:case int32Tag:
                        case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:
                            // Safari 5 mobile incorrectly has `Object` as the constructor of typed arrays.
                            if (Ctor instanceof Ctor) {
                                Ctor = ctorByTag[tag];
                            }
                            var buffer = object.buffer;
                            return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

                        case numberTag:
                        case stringTag:
                            return new Ctor(object);

                        case regexpTag:
                            var result = new Ctor(object.source, reFlags.exec(object));
                            result.lastIndex = object.lastIndex;
                    }
                    return result;
                }

                module.exports = initCloneByTag;
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, { "26": 26 }], 35: [function (require, module, exports) {
            /**
             * Initializes an object clone.
             *
             * @private
             * @param {Object} object The object to clone.
             * @returns {Object} Returns the initialized clone.
             */
            function initCloneObject(object) {
                var Ctor = object.constructor;
                if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
                    Ctor = Object;
                }
                return new Ctor();
            }

            module.exports = initCloneObject;
        }, {}], 36: [function (require, module, exports) {
            var getLength = require(31),
                isLength = require(40);

            /**
             * Checks if `value` is array-like.
             *
             * @private
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
             */
            function isArrayLike(value) {
                return value != null && isLength(getLength(value));
            }

            module.exports = isArrayLike;
        }, { "31": 31, "40": 40 }], 37: [function (require, module, exports) {
            /**
             * Checks if `value` is a host object in IE < 9.
             *
             * @private
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
             */
            var isHostObject = function () {
                try {
                    Object({ 'toString': 0 } + '');
                } catch (e) {
                    return function () {
                        return false;
                    };
                }
                return function (value) {
                    // IE < 9 presents many host objects as `Object` objects that can coerce
                    // to strings despite having improperly defined `toString` methods.
                    return typeof value.toString != 'function' && typeof (value + '') == 'string';
                };
            }();

            module.exports = isHostObject;
        }, {}], 38: [function (require, module, exports) {
            /** Used to detect unsigned integer values. */
            var reIsUint = /^\d+$/;

            /**
             * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
             * of an array-like value.
             */
            var MAX_SAFE_INTEGER = 9007199254740991;

            /**
             * Checks if `value` is a valid array-like index.
             *
             * @private
             * @param {*} value The value to check.
             * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
             * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
             */
            function isIndex(value, length) {
                value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
                length = length == null ? MAX_SAFE_INTEGER : length;
                return value > -1 && value % 1 == 0 && value < length;
            }

            module.exports = isIndex;
        }, {}], 39: [function (require, module, exports) {
            var isArrayLike = require(36),
                isIndex = require(38),
                isObject = require(50);

            /**
             * Checks if the provided arguments are from an iteratee call.
             *
             * @private
             * @param {*} value The potential iteratee value argument.
             * @param {*} index The potential iteratee index or key argument.
             * @param {*} object The potential iteratee object argument.
             * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
             */
            function isIterateeCall(value, index, object) {
                if (!isObject(object)) {
                    return false;
                }
                var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
                if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
                    var other = object[index];
                    return value === value ? value === other : other !== other;
                }
                return false;
            }

            module.exports = isIterateeCall;
        }, { "36": 36, "38": 38, "50": 50 }], 40: [function (require, module, exports) {
            /**
             * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
             * of an array-like value.
             */
            var MAX_SAFE_INTEGER = 9007199254740991;

            /**
             * Checks if `value` is a valid array-like length.
             *
             * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
             *
             * @private
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
             */
            function isLength(value) {
                return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
            }

            module.exports = isLength;
        }, {}], 41: [function (require, module, exports) {
            /**
             * Checks if `value` is object-like.
             *
             * @private
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
             */
            function isObjectLike(value) {
                return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
            }

            module.exports = isObjectLike;
        }, {}], 42: [function (require, module, exports) {
            var isArguments = require(46),
                isArray = require(47),
                isIndex = require(38),
                isLength = require(40),
                isString = require(52),
                keysIn = require(56);

            /** Used for native method references. */
            var objectProto = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty = objectProto.hasOwnProperty;

            /**
             * A fallback implementation of `Object.keys` which creates an array of the
             * own enumerable property names of `object`.
             *
             * @private
             * @param {Object} object The object to query.
             * @returns {Array} Returns the array of property names.
             */
            function shimKeys(object) {
                var props = keysIn(object),
                    propsLength = props.length,
                    length = propsLength && object.length;

                var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object) || isString(object));

                var index = -1,
                    result = [];

                while (++index < propsLength) {
                    var key = props[index];
                    if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
                        result.push(key);
                    }
                }
                return result;
            }

            module.exports = shimKeys;
        }, { "38": 38, "40": 40, "46": 46, "47": 47, "52": 52, "56": 56 }], 43: [function (require, module, exports) {
            var isObject = require(50),
                isString = require(52),
                support = require(58);

            /**
             * Converts `value` to an object if it's not one.
             *
             * @private
             * @param {*} value The value to process.
             * @returns {Object} Returns the object.
             */
            function toObject(value) {
                if (support.unindexedChars && isString(value)) {
                    var index = -1,
                        length = value.length,
                        result = Object(value);

                    while (++index < length) {
                        result[index] = value.charAt(index);
                    }
                    return result;
                }
                return isObject(value) ? value : Object(value);
            }

            module.exports = toObject;
        }, { "50": 50, "52": 52, "58": 58 }], 44: [function (require, module, exports) {
            var baseClone = require(16),
                bindCallback = require(25),
                isIterateeCall = require(39);

            /**
             * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
             * otherwise they are assigned by reference. If `customizer` is provided it is
             * invoked to produce the cloned values. If `customizer` returns `undefined`
             * cloning is handled by the method instead. The `customizer` is bound to
             * `thisArg` and invoked with two argument; (value [, index|key, object]).
             *
             * **Note:** This method is loosely based on the
             * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
             * The enumerable properties of `arguments` objects and objects created by
             * constructors other than `Object` are cloned to plain `Object` objects. An
             * empty object is returned for uncloneable values such as functions, DOM nodes,
             * Maps, Sets, and WeakMaps.
             *
             * @static
             * @memberOf _
             * @category Lang
             * @param {*} value The value to clone.
             * @param {boolean} [isDeep] Specify a deep clone.
             * @param {Function} [customizer] The function to customize cloning values.
             * @param {*} [thisArg] The `this` binding of `customizer`.
             * @returns {*} Returns the cloned value.
             * @example
             *
             * var users = [
             *   { 'user': 'barney' },
             *   { 'user': 'fred' }
             * ];
             *
             * var shallow = _.clone(users);
             * shallow[0] === users[0];
             * // => true
             *
             * var deep = _.clone(users, true);
             * deep[0] === users[0];
             * // => false
             *
             * // using a customizer callback
             * var el = _.clone(document.body, function(value) {
            *   if (_.isElement(value)) {
            *     return value.cloneNode(false);
            *   }
            * });
             *
             * el === document.body
             * // => false
             * el.nodeName
             * // => BODY
             * el.childNodes.length;
             * // => 0
             */
            function clone(value, isDeep, customizer, thisArg) {
                if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
                    isDeep = false;
                } else if (typeof isDeep == 'function') {
                    thisArg = customizer;
                    customizer = isDeep;
                    isDeep = false;
                }
                return typeof customizer == 'function' ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 1)) : baseClone(value, isDeep);
            }

            module.exports = clone;
        }, { "16": 16, "25": 25, "39": 39 }], 45: [function (require, module, exports) {
            var baseClone = require(16),
                bindCallback = require(25);

            /**
             * Creates a deep clone of `value`. If `customizer` is provided it is invoked
             * to produce the cloned values. If `customizer` returns `undefined` cloning
             * is handled by the method instead. The `customizer` is bound to `thisArg`
             * and invoked with two argument; (value [, index|key, object]).
             *
             * **Note:** This method is loosely based on the
             * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
             * The enumerable properties of `arguments` objects and objects created by
             * constructors other than `Object` are cloned to plain `Object` objects. An
             * empty object is returned for uncloneable values such as functions, DOM nodes,
             * Maps, Sets, and WeakMaps.
             *
             * @static
             * @memberOf _
             * @category Lang
             * @param {*} value The value to deep clone.
             * @param {Function} [customizer] The function to customize cloning values.
             * @param {*} [thisArg] The `this` binding of `customizer`.
             * @returns {*} Returns the deep cloned value.
             * @example
             *
             * var users = [
             *   { 'user': 'barney' },
             *   { 'user': 'fred' }
             * ];
             *
             * var deep = _.cloneDeep(users);
             * deep[0] === users[0];
             * // => false
             *
             * // using a customizer callback
             * var el = _.cloneDeep(document.body, function(value) {
            *   if (_.isElement(value)) {
            *     return value.cloneNode(true);
            *   }
            * });
             *
             * el === document.body
             * // => false
             * el.nodeName
             * // => BODY
             * el.childNodes.length;
             * // => 20
             */
            function cloneDeep(value, customizer, thisArg) {
                return typeof customizer == 'function' ? baseClone(value, true, bindCallback(customizer, thisArg, 1)) : baseClone(value, true);
            }

            module.exports = cloneDeep;
        }, { "16": 16, "25": 25 }], 46: [function (require, module, exports) {
            var isArrayLike = require(36),
                isObjectLike = require(41);

            /** Used for native method references. */
            var objectProto = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty = objectProto.hasOwnProperty;

            /** Native method references. */
            var propertyIsEnumerable = objectProto.propertyIsEnumerable;

            /**
             * Checks if `value` is classified as an `arguments` object.
             *
             * @static
             * @memberOf _
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
             * @example
             *
             * _.isArguments(function() { return arguments; }());
             * // => true
             *
             * _.isArguments([1, 2, 3]);
             * // => false
             */
            function isArguments(value) {
                return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
            }

            module.exports = isArguments;
        }, { "36": 36, "41": 41 }], 47: [function (require, module, exports) {
            var getNative = require(32),
                isLength = require(40),
                isObjectLike = require(41);

            /** `Object#toString` result references. */
            var arrayTag = '[object Array]';

            /** Used for native method references. */
            var objectProto = Object.prototype;

            /**
             * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
             * of values.
             */
            var objToString = objectProto.toString;

            /* Native method references for those with the same name as other `lodash` methods. */
            var nativeIsArray = getNative(Array, 'isArray');

            /**
             * Checks if `value` is classified as an `Array` object.
             *
             * @static
             * @memberOf _
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
             * @example
             *
             * _.isArray([1, 2, 3]);
             * // => true
             *
             * _.isArray(function() { return arguments; }());
             * // => false
             */
            var isArray = nativeIsArray || function (value) {
                return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
            };

            module.exports = isArray;
        }, { "32": 32, "40": 40, "41": 41 }], 48: [function (require, module, exports) {
            var isObject = require(50);

            /** `Object#toString` result references. */
            var funcTag = '[object Function]';

            /** Used for native method references. */
            var objectProto = Object.prototype;

            /**
             * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
             * of values.
             */
            var objToString = objectProto.toString;

            /**
             * Checks if `value` is classified as a `Function` object.
             *
             * @static
             * @memberOf _
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
             * @example
             *
             * _.isFunction(_);
             * // => true
             *
             * _.isFunction(/abc/);
             * // => false
             */
            function isFunction(value) {
                // The use of `Object#toString` avoids issues with the `typeof` operator
                // in older versions of Chrome and Safari which return 'function' for regexes
                // and Safari 8 equivalents which return 'object' for typed array constructors.
                return isObject(value) && objToString.call(value) == funcTag;
            }

            module.exports = isFunction;
        }, { "50": 50 }], 49: [function (require, module, exports) {
            var isFunction = require(48),
                isHostObject = require(37),
                isObjectLike = require(41);

            /** Used to detect host constructors (Safari > 5). */
            var reIsHostCtor = /^\[object .+?Constructor\]$/;

            /** Used for native method references. */
            var objectProto = Object.prototype;

            /** Used to resolve the decompiled source of functions. */
            var fnToString = Function.prototype.toString;

            /** Used to check objects for own properties. */
            var hasOwnProperty = objectProto.hasOwnProperty;

            /** Used to detect if a method is native. */
            var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

            /**
             * Checks if `value` is a native function.
             *
             * @static
             * @memberOf _
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
             * @example
             *
             * _.isNative(Array.prototype.push);
             * // => true
             *
             * _.isNative(_);
             * // => false
             */
            function isNative(value) {
                if (value == null) {
                    return false;
                }
                if (isFunction(value)) {
                    return reIsNative.test(fnToString.call(value));
                }
                return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
            }

            module.exports = isNative;
        }, { "37": 37, "41": 41, "48": 48 }], 50: [function (require, module, exports) {
            /**
             * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
             * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
             *
             * @static
             * @memberOf _
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is an object, else `false`.
             * @example
             *
             * _.isObject({});
             * // => true
             *
             * _.isObject([1, 2, 3]);
             * // => true
             *
             * _.isObject(1);
             * // => false
             */
            function isObject(value) {
                // Avoid a V8 JIT bug in Chrome 19-20.
                // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
                var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
                return !!value && (type == 'object' || type == 'function');
            }

            module.exports = isObject;
        }, {}], 51: [function (require, module, exports) {
            var baseForIn = require(20),
                isArguments = require(46),
                isHostObject = require(37),
                isObjectLike = require(41),
                support = require(58);

            /** `Object#toString` result references. */
            var objectTag = '[object Object]';

            /** Used for native method references. */
            var objectProto = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty = objectProto.hasOwnProperty;

            /**
             * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
             * of values.
             */
            var objToString = objectProto.toString;

            /**
             * Checks if `value` is a plain object, that is, an object created by the
             * `Object` constructor or one with a `[[Prototype]]` of `null`.
             *
             * **Note:** This method assumes objects created by the `Object` constructor
             * have no inherited enumerable properties.
             *
             * @static
             * @memberOf _
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
             * @example
             *
             * function Foo() {
            *   this.a = 1;
            * }
             *
             * _.isPlainObject(new Foo);
             * // => false
             *
             * _.isPlainObject([1, 2, 3]);
             * // => false
             *
             * _.isPlainObject({ 'x': 0, 'y': 0 });
             * // => true
             *
             * _.isPlainObject(Object.create(null));
             * // => true
             */
            function isPlainObject(value) {
                var Ctor;

                // Exit early for non `Object` objects.
                if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isHostObject(value) && !isArguments(value)) || !hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor))) {
                    return false;
                }
                // IE < 9 iterates inherited properties before own properties. If the first
                // iterated property is an object's own property then there are no inherited
                // enumerable properties.
                var result;
                if (support.ownLast) {
                    baseForIn(value, function (subValue, key, object) {
                        result = hasOwnProperty.call(object, key);
                        return false;
                    });
                    return result !== false;
                }
                // In most environments an object's own properties are iterated before
                // its inherited properties. If the last iterated property is an object's
                // own property then there are no inherited enumerable properties.
                baseForIn(value, function (subValue, key) {
                    result = key;
                });
                return result === undefined || hasOwnProperty.call(value, result);
            }

            module.exports = isPlainObject;
        }, { "20": 20, "37": 37, "41": 41, "46": 46, "58": 58 }], 52: [function (require, module, exports) {
            var isObjectLike = require(41);

            /** `Object#toString` result references. */
            var stringTag = '[object String]';

            /** Used for native method references. */
            var objectProto = Object.prototype;

            /**
             * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
             * of values.
             */
            var objToString = objectProto.toString;

            /**
             * Checks if `value` is classified as a `String` primitive or object.
             *
             * @static
             * @memberOf _
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
             * @example
             *
             * _.isString('abc');
             * // => true
             *
             * _.isString(1);
             * // => false
             */
            function isString(value) {
                return typeof value == 'string' || isObjectLike(value) && objToString.call(value) == stringTag;
            }

            module.exports = isString;
        }, { "41": 41 }], 53: [function (require, module, exports) {
            var isLength = require(40),
                isObjectLike = require(41);

            /** `Object#toString` result references. */
            var argsTag = '[object Arguments]',
                arrayTag = '[object Array]',
                boolTag = '[object Boolean]',
                dateTag = '[object Date]',
                errorTag = '[object Error]',
                funcTag = '[object Function]',
                mapTag = '[object Map]',
                numberTag = '[object Number]',
                objectTag = '[object Object]',
                regexpTag = '[object RegExp]',
                setTag = '[object Set]',
                stringTag = '[object String]',
                weakMapTag = '[object WeakMap]';

            var arrayBufferTag = '[object ArrayBuffer]',
                float32Tag = '[object Float32Array]',
                float64Tag = '[object Float64Array]',
                int8Tag = '[object Int8Array]',
                int16Tag = '[object Int16Array]',
                int32Tag = '[object Int32Array]',
                uint8Tag = '[object Uint8Array]',
                uint8ClampedTag = '[object Uint8ClampedArray]',
                uint16Tag = '[object Uint16Array]',
                uint32Tag = '[object Uint32Array]';

            /** Used to identify `toStringTag` values of typed arrays. */
            var typedArrayTags = {};
            typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
            typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

            /** Used for native method references. */
            var objectProto = Object.prototype;

            /**
             * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
             * of values.
             */
            var objToString = objectProto.toString;

            /**
             * Checks if `value` is classified as a typed array.
             *
             * @static
             * @memberOf _
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
             * @example
             *
             * _.isTypedArray(new Uint8Array);
             * // => true
             *
             * _.isTypedArray([]);
             * // => false
             */
            function isTypedArray(value) {
                return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
            }

            module.exports = isTypedArray;
        }, { "40": 40, "41": 41 }], 54: [function (require, module, exports) {
            var baseCopy = require(17),
                keysIn = require(56);

            /**
             * Converts `value` to a plain object flattening inherited enumerable
             * properties of `value` to own properties of the plain object.
             *
             * @static
             * @memberOf _
             * @category Lang
             * @param {*} value The value to convert.
             * @returns {Object} Returns the converted plain object.
             * @example
             *
             * function Foo() {
            *   this.b = 2;
            * }
             *
             * Foo.prototype.c = 3;
             *
             * _.assign({ 'a': 1 }, new Foo);
             * // => { 'a': 1, 'b': 2 }
             *
             * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
             * // => { 'a': 1, 'b': 2, 'c': 3 }
             */
            function toPlainObject(value) {
                return baseCopy(value, keysIn(value));
            }

            module.exports = toPlainObject;
        }, { "17": 17, "56": 56 }], 55: [function (require, module, exports) {
            var getNative = require(32),
                isArrayLike = require(36),
                isObject = require(50),
                shimKeys = require(42),
                support = require(58);

            /* Native method references for those with the same name as other `lodash` methods. */
            var nativeKeys = getNative(Object, 'keys');

            /**
             * Creates an array of the own enumerable property names of `object`.
             *
             * **Note:** Non-object values are coerced to objects. See the
             * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
             * for more details.
             *
             * @static
             * @memberOf _
             * @category Object
             * @param {Object} object The object to query.
             * @returns {Array} Returns the array of property names.
             * @example
             *
             * function Foo() {
            *   this.a = 1;
            *   this.b = 2;
            * }
             *
             * Foo.prototype.c = 3;
             *
             * _.keys(new Foo);
             * // => ['a', 'b'] (iteration order is not guaranteed)
             *
             * _.keys('hi');
             * // => ['0', '1']
             */
            var keys = !nativeKeys ? shimKeys : function (object) {
                var Ctor = object == null ? undefined : object.constructor;
                if (typeof Ctor == 'function' && Ctor.prototype === object || (typeof object == 'function' ? support.enumPrototypes : isArrayLike(object))) {
                    return shimKeys(object);
                }
                return isObject(object) ? nativeKeys(object) : [];
            };

            module.exports = keys;
        }, { "32": 32, "36": 36, "42": 42, "50": 50, "58": 58 }], 56: [function (require, module, exports) {
            var arrayEach = require(14),
                isArguments = require(46),
                isArray = require(47),
                isFunction = require(48),
                isIndex = require(38),
                isLength = require(40),
                isObject = require(50),
                isString = require(52),
                support = require(58);

            /** `Object#toString` result references. */
            var arrayTag = '[object Array]',
                boolTag = '[object Boolean]',
                dateTag = '[object Date]',
                errorTag = '[object Error]',
                funcTag = '[object Function]',
                numberTag = '[object Number]',
                objectTag = '[object Object]',
                regexpTag = '[object RegExp]',
                stringTag = '[object String]';

            /** Used to fix the JScript `[[DontEnum]]` bug. */
            var shadowProps = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

            /** Used for native method references. */
            var errorProto = Error.prototype,
                objectProto = Object.prototype,
                stringProto = String.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty = objectProto.hasOwnProperty;

            /**
             * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
             * of values.
             */
            var objToString = objectProto.toString;

            /** Used to avoid iterating over non-enumerable properties in IE < 9. */
            var nonEnumProps = {};
            nonEnumProps[arrayTag] = nonEnumProps[dateTag] = nonEnumProps[numberTag] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
            nonEnumProps[boolTag] = nonEnumProps[stringTag] = { 'constructor': true, 'toString': true, 'valueOf': true };
            nonEnumProps[errorTag] = nonEnumProps[funcTag] = nonEnumProps[regexpTag] = { 'constructor': true, 'toString': true };
            nonEnumProps[objectTag] = { 'constructor': true };

            arrayEach(shadowProps, function (key) {
                for (var tag in nonEnumProps) {
                    if (hasOwnProperty.call(nonEnumProps, tag)) {
                        var props = nonEnumProps[tag];
                        props[key] = hasOwnProperty.call(props, key);
                    }
                }
            });

            /**
             * Creates an array of the own and inherited enumerable property names of `object`.
             *
             * **Note:** Non-object values are coerced to objects.
             *
             * @static
             * @memberOf _
             * @category Object
             * @param {Object} object The object to query.
             * @returns {Array} Returns the array of property names.
             * @example
             *
             * function Foo() {
            *   this.a = 1;
            *   this.b = 2;
            * }
             *
             * Foo.prototype.c = 3;
             *
             * _.keysIn(new Foo);
             * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
             */
            function keysIn(object) {
                if (object == null) {
                    return [];
                }
                if (!isObject(object)) {
                    object = Object(object);
                }
                var length = object.length;

                length = length && isLength(length) && (isArray(object) || isArguments(object) || isString(object)) && length || 0;

                var Ctor = object.constructor,
                    index = -1,
                    proto = isFunction(Ctor) && Ctor.prototype || objectProto,
                    isProto = proto === object,
                    result = Array(length),
                    skipIndexes = length > 0,
                    skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error),
                    skipProto = support.enumPrototypes && isFunction(object);

                while (++index < length) {
                    result[index] = index + '';
                }
                // lodash skips the `constructor` property when it infers it is iterating
                // over a `prototype` object because IE < 9 can't set the `[[Enumerable]]`
                // attribute of an existing property and the `constructor` property of a
                // prototype defaults to non-enumerable.
                for (var key in object) {
                    if (!(skipProto && key == 'prototype') && !(skipErrorProps && (key == 'message' || key == 'name')) && !(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
                        result.push(key);
                    }
                }
                if (support.nonEnumShadows && object !== objectProto) {
                    var tag = object === stringProto ? stringTag : object === errorProto ? errorTag : objToString.call(object),
                        nonEnums = nonEnumProps[tag] || nonEnumProps[objectTag];

                    if (tag == objectTag) {
                        proto = objectProto;
                    }
                    length = shadowProps.length;
                    while (length--) {
                        key = shadowProps[length];
                        var nonEnum = nonEnums[key];
                        if (!(isProto && nonEnum) && (nonEnum ? hasOwnProperty.call(object, key) : object[key] !== proto[key])) {
                            result.push(key);
                        }
                    }
                }
                return result;
            }

            module.exports = keysIn;
        }, { "14": 14, "38": 38, "40": 40, "46": 46, "47": 47, "48": 48, "50": 50, "52": 52, "58": 58 }], 57: [function (require, module, exports) {
            var baseMerge = require(22),
                createAssigner = require(27);

            /**
             * Recursively merges own enumerable properties of the source object(s), that
             * don't resolve to `undefined` into the destination object. Subsequent sources
             * overwrite property assignments of previous sources. If `customizer` is
             * provided it is invoked to produce the merged values of the destination and
             * source properties. If `customizer` returns `undefined` merging is handled
             * by the method instead. The `customizer` is bound to `thisArg` and invoked
             * with five arguments: (objectValue, sourceValue, key, object, source).
             *
             * @static
             * @memberOf _
             * @category Object
             * @param {Object} object The destination object.
             * @param {...Object} [sources] The source objects.
             * @param {Function} [customizer] The function to customize assigned values.
             * @param {*} [thisArg] The `this` binding of `customizer`.
             * @returns {Object} Returns `object`.
             * @example
             *
             * var users = {
            *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
            * };
             *
             * var ages = {
            *   'data': [{ 'age': 36 }, { 'age': 40 }]
            * };
             *
             * _.merge(users, ages);
             * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
             *
             * // using a customizer callback
             * var object = {
            *   'fruits': ['apple'],
            *   'vegetables': ['beet']
            * };
             *
             * var other = {
            *   'fruits': ['banana'],
            *   'vegetables': ['carrot']
            * };
             *
             * _.merge(object, other, function(a, b) {
            *   if (_.isArray(a)) {
            *     return a.concat(b);
            *   }
            * });
             * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
             */
            var merge = createAssigner(baseMerge);

            module.exports = merge;
        }, { "22": 22, "27": 27 }], 58: [function (require, module, exports) {
            /** Used for native method references. */
            var arrayProto = Array.prototype,
                errorProto = Error.prototype,
                objectProto = Object.prototype;

            /** Native method references. */
            var propertyIsEnumerable = objectProto.propertyIsEnumerable,
                splice = arrayProto.splice;

            /**
             * An object environment feature flags.
             *
             * @static
             * @memberOf _
             * @type Object
             */
            var support = {};

            (function (x) {
                var Ctor = function Ctor() {
                    this.x = x;
                },
                    object = { '0': x, 'length': x },
                    props = [];

                Ctor.prototype = { 'valueOf': x, 'y': x };
                for (var key in new Ctor()) {
                    props.push(key);
                }

                /**
                 * Detect if `name` or `message` properties of `Error.prototype` are
                 * enumerable by default (IE < 9, Safari < 5.1).
                 *
                 * @memberOf _.support
                 * @type boolean
                 */
                support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');

                /**
                 * Detect if `prototype` properties are enumerable by default.
                 *
                 * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
                 * (if the prototype or a property on the prototype has been set)
                 * incorrectly set the `[[Enumerable]]` value of a function's `prototype`
                 * property to `true`.
                 *
                 * @memberOf _.support
                 * @type boolean
                 */
                support.enumPrototypes = propertyIsEnumerable.call(Ctor, 'prototype');

                /**
                 * Detect if properties shadowing those on `Object.prototype` are non-enumerable.
                 *
                 * In IE < 9 an object's own properties, shadowing non-enumerable ones,
                 * are made non-enumerable as well (a.k.a the JScript `[[DontEnum]]` bug).
                 *
                 * @memberOf _.support
                 * @type boolean
                 */
                support.nonEnumShadows = !/valueOf/.test(props);

                /**
                 * Detect if own properties are iterated after inherited properties (IE < 9).
                 *
                 * @memberOf _.support
                 * @type boolean
                 */
                support.ownLast = props[0] != 'x';

                /**
                 * Detect if `Array#shift` and `Array#splice` augment array-like objects
                 * correctly.
                 *
                 * Firefox < 10, compatibility modes of IE 8, and IE < 9 have buggy Array
                 * `shift()` and `splice()` functions that fail to remove the last element,
                 * `value[0]`, of array-like objects even though the "length" property is
                 * set to `0`. The `shift()` method is buggy in compatibility modes of IE 8,
                 * while `splice()` is buggy regardless of mode in IE < 9.
                 *
                 * @memberOf _.support
                 * @type boolean
                 */
                support.spliceObjects = (splice.call(object, 0, 1), !object[0]);

                /**
                 * Detect lack of support for accessing string characters by index.
                 *
                 * IE < 8 can't access characters by index. IE 8 can only access characters
                 * by index on string literals, not string objects.
                 *
                 * @memberOf _.support
                 * @type boolean
                 */
                support.unindexedChars = 'x'[0] + Object('x')[0] != 'xx';
            })(1, 0);

            module.exports = support;
        }, {}], 59: [function (require, module, exports) {
            /**
             * This method returns the first argument provided to it.
             *
             * @static
             * @memberOf _
             * @category Utility
             * @param {*} value Any value.
             * @returns {*} Returns `value`.
             * @example
             *
             * var object = { 'user': 'fred' };
             *
             * _.identity(object) === object;
             * // => true
             */
            function identity(value) {
                return value;
            }

            module.exports = identity;
        }, {}], 60: [function (require, module, exports) {
            (function (process) {
                'use strict';

                module.exports = AlgoliaSearch;

                // default debug activated in dev environments
                // this is triggered in package.json, using the envify transform
                if (false) {
                    require(6).enable('algoliasearch*');
                }

                var errors = require(66);

                /*
                 * Algolia Search library initialization
                 * https://www.algolia.com/
                 *
                 * @param {string} applicationID - Your applicationID, found in your dashboard
                 * @param {string} apiKey - Your API key, found in your dashboard
                 * @param {Object} [opts]
                 * @param {number} [opts.timeout=2000] - The request timeout set in milliseconds,
                 * another request will be issued after this timeout
                 * @param {string} [opts.protocol='http:'] - The protocol used to query Algolia Search API.
                 *                                        Set to 'https:' to force using https.
                 *                                        Default to document.location.protocol in browsers
                 * @param {Object|Array} [opts.hosts={
                 *           read: [this.applicationID + '-dsn.algolia.net'].concat([
                 *             this.applicationID + '-1.algolianet.com',
                 *             this.applicationID + '-2.algolianet.com',
                 *             this.applicationID + '-3.algolianet.com']
                 *           ]),
                 *           write: [this.applicationID + '.algolia.net'].concat([
                 *             this.applicationID + '-1.algolianet.com',
                 *             this.applicationID + '-2.algolianet.com',
                 *             this.applicationID + '-3.algolianet.com']
                 *           ]) - The hosts to use for Algolia Search API.
                 *           If you provide them, you will less benefit from our HA implementation
                 */
                function AlgoliaSearch(applicationID, apiKey, opts) {
                    var debug = require(6)('algoliasearch');

                    var clone = require(44);
                    var isArray = require(47);

                    var usage = 'Usage: algoliasearch(applicationID, apiKey, opts)';

                    if (!applicationID) {
                        throw new errors.AlgoliaSearchError('Please provide an application ID. ' + usage);
                    }

                    if (!apiKey) {
                        throw new errors.AlgoliaSearchError('Please provide an API key. ' + usage);
                    }

                    this.applicationID = applicationID;
                    this.apiKey = apiKey;

                    var defaultHosts = [this.applicationID + '-1.algolianet.com', this.applicationID + '-2.algolianet.com', this.applicationID + '-3.algolianet.com'];
                    this.hosts = {
                        read: [],
                        write: []
                    };

                    this.hostIndex = {
                        read: 0,
                        write: 0
                    };

                    opts = opts || {};

                    var protocol = opts.protocol || 'https:';
                    var timeout = opts.timeout === undefined ? 2000 : opts.timeout;

                    // while we advocate for colon-at-the-end values: 'http:' for `opts.protocol`
                    // we also accept `http` and `https`. It's a common error.
                    if (!/:$/.test(protocol)) {
                        protocol = protocol + ':';
                    }

                    if (opts.protocol !== 'http:' && opts.protocol !== 'https:') {
                        throw new errors.AlgoliaSearchError('protocol must be `http:` or `https:` (was `' + opts.protocol + '`)');
                    }

                    // no hosts given, add defaults
                    if (!opts.hosts) {
                        this.hosts.read = [this.applicationID + '-dsn.algolia.net'].concat(defaultHosts);
                        this.hosts.write = [this.applicationID + '.algolia.net'].concat(defaultHosts);
                    } else if (isArray(opts.hosts)) {
                        this.hosts.read = clone(opts.hosts);
                        this.hosts.write = clone(opts.hosts);
                    } else {
                        this.hosts.read = clone(opts.hosts.read);
                        this.hosts.write = clone(opts.hosts.write);
                    }

                    // add protocol and lowercase hosts
                    this.hosts.read = map(this.hosts.read, prepareHost(protocol));
                    this.hosts.write = map(this.hosts.write, prepareHost(protocol));
                    this.requestTimeout = timeout;

                    this.extraHeaders = [];
                    this.cache = {};

                    this._ua = opts._ua;
                    this._useCache = opts._useCache === undefined ? true : opts._useCache;

                    this._setTimeout = opts._setTimeout;

                    debug('init done, %j', this);
                }

                AlgoliaSearch.prototype = {
                    /*
                     * Delete an index
                     *
                     * @param indexName the name of index to delete
                     * @param callback the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the server answer that contains the task ID
                     */
                    deleteIndex: function deleteIndex(indexName, callback) {
                        return this._jsonRequest({
                            method: 'DELETE',
                            url: '/1/indexes/' + encodeURIComponent(indexName),
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /**
                     * Move an existing index.
                     * @param srcIndexName the name of index to copy.
                     * @param dstIndexName the new index name that will contains a copy of
                     * srcIndexName (destination will be overriten if it already exist).
                     * @param callback the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the server answer that contains the task ID
                     */
                    moveIndex: function moveIndex(srcIndexName, dstIndexName, callback) {
                        var postObj = {
                            operation: 'move', destination: dstIndexName
                        };
                        return this._jsonRequest({
                            method: 'POST',
                            url: '/1/indexes/' + encodeURIComponent(srcIndexName) + '/operation',
                            body: postObj,
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /**
                     * Copy an existing index.
                     * @param srcIndexName the name of index to copy.
                     * @param dstIndexName the new index name that will contains a copy
                     * of srcIndexName (destination will be overriten if it already exist).
                     * @param callback the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the server answer that contains the task ID
                     */
                    copyIndex: function copyIndex(srcIndexName, dstIndexName, callback) {
                        var postObj = {
                            operation: 'copy', destination: dstIndexName
                        };
                        return this._jsonRequest({
                            method: 'POST',
                            url: '/1/indexes/' + encodeURIComponent(srcIndexName) + '/operation',
                            body: postObj,
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /**
                     * Return last log entries.
                     * @param offset Specify the first entry to retrieve (0-based, 0 is the most recent log entry).
                     * @param length Specify the maximum number of entries to retrieve starting
                     * at offset. Maximum allowed value: 1000.
                     * @param callback the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the server answer that contains the task ID
                     */
                    getLogs: function getLogs(offset, length, callback) {
                        if (arguments.length === 0 || typeof offset === 'function') {
                            // getLogs([cb])
                            callback = offset;
                            offset = 0;
                            length = 10;
                        } else if (arguments.length === 1 || typeof length === 'function') {
                            // getLogs(1, [cb)]
                            callback = length;
                            length = 10;
                        }

                        return this._jsonRequest({
                            method: 'GET',
                            url: '/1/logs?offset=' + offset + '&length=' + length,
                            hostType: 'read',
                            callback: callback
                        });
                    },
                    /*
                     * List all existing indexes (paginated)
                     *
                     * @param page The page to retrieve, starting at 0.
                     * @param callback the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the server answer with index list
                     */
                    listIndexes: function listIndexes(page, callback) {
                        var params = '';

                        if (page === undefined || typeof page === 'function') {
                            callback = page;
                        } else {
                            params = '?page=' + page;
                        }

                        return this._jsonRequest({
                            method: 'GET',
                            url: '/1/indexes' + params,
                            hostType: 'read',
                            callback: callback
                        });
                    },

                    /*
                     * Get the index object initialized
                     *
                     * @param indexName the name of index
                     * @param callback the result callback with one argument (the Index instance)
                     */
                    initIndex: function initIndex(indexName) {
                        return new this.Index(this, indexName);
                    },
                    /*
                     * List all existing user keys with their associated ACLs
                     *
                     * @param callback the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the server answer with user keys list
                     */
                    listUserKeys: function listUserKeys(callback) {
                        return this._jsonRequest({
                            method: 'GET',
                            url: '/1/keys',
                            hostType: 'read',
                            callback: callback
                        });
                    },
                    /*
                     * Get ACL of a user key
                     *
                     * @param key
                     * @param callback the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the server answer with user keys list
                     */
                    getUserKeyACL: function getUserKeyACL(key, callback) {
                        return this._jsonRequest({
                            method: 'GET',
                            url: '/1/keys/' + key,
                            hostType: 'read',
                            callback: callback
                        });
                    },
                    /*
                     * Delete an existing user key
                     * @param key
                     * @param callback the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the server answer with user keys list
                     */
                    deleteUserKey: function deleteUserKey(key, callback) {
                        return this._jsonRequest({
                            method: 'DELETE',
                            url: '/1/keys/' + key,
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /*
                     * Add a new global API key
                     *
                     * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
                     *   can contains the following values:
                     *     - search: allow to search (https and http)
                     *     - addObject: allows to add/update an object in the index (https only)
                     *     - deleteObject : allows to delete an existing object (https only)
                     *     - deleteIndex : allows to delete index content (https only)
                     *     - settings : allows to get index settings (https only)
                     *     - editSettings : allows to change index settings (https only)
                     * @param {Object} [params] - Optionnal parameters to set for the key
                     * @param {number} params.validity - Number of seconds after which the key will be automatically removed (0 means no time limit for this key)
                     * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
                     * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
                     * @param {string[]} params.indexes - Allowed targeted indexes for this key
                     * @param {string} params.description - A description for your key
                     * @param {string[]} params.referers - A list of authorized referers
                     * @param {Object} params.queryParameters - Force the key to use specific query parameters
                     * @param {Function} callback - The result callback called with two arguments
                     *   error: null or Error('message')
                     *   content: the server answer with user keys list
                     * @return {Promise|undefined} Returns a promise if no callback given
                     * @example
                     * client.addUserKey(['search'], {
                     *   validity: 300,
                     *   maxQueriesPerIPPerHour: 2000,
                     *   maxHitsPerQuery: 3,
                     *   indexes: ['fruits'],
                     *   description: 'Eat three fruits',
                     *   referers: ['*.algolia.com'],
                     *   queryParameters: {
                     *     tagFilters: ['public'],
                     *   }
                     * })
                     * @see {@link https://www.algolia.com/doc/rest_api#AddKey|Algolia REST API Documentation}
                     */
                    addUserKey: function addUserKey(acls, params, callback) {
                        if (arguments.length === 1 || typeof params === 'function') {
                            callback = params;
                            params = null;
                        }

                        var postObj = {
                            acl: acls
                        };

                        if (params) {
                            postObj.validity = params.validity;
                            postObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
                            postObj.maxHitsPerQuery = params.maxHitsPerQuery;
                            postObj.indexes = params.indexes;
                            postObj.description = params.description;

                            if (params.queryParameters) {
                                postObj.queryParameters = this._getSearchParams(params.queryParameters, '');
                            }

                            postObj.referers = params.referers;
                        }

                        return this._jsonRequest({
                            method: 'POST',
                            url: '/1/keys',
                            body: postObj,
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /**
                     * Add a new global API key
                     * @deprecated Please use client.addUserKey()
                     */
                    addUserKeyWithValidity: deprecate(function (acls, params, callback) {
                        return this.addUserKey(acls, params, callback);
                    }, deprecatedMessage('client.addUserKeyWithValidity()', 'client.addUserKey()')),

                    /**
                     * Update an existing API key
                     * @param {string} key - The key to update
                     * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
                     *   can contains the following values:
                     *     - search: allow to search (https and http)
                     *     - addObject: allows to add/update an object in the index (https only)
                     *     - deleteObject : allows to delete an existing object (https only)
                     *     - deleteIndex : allows to delete index content (https only)
                     *     - settings : allows to get index settings (https only)
                     *     - editSettings : allows to change index settings (https only)
                     * @param {Object} [params] - Optionnal parameters to set for the key
                     * @param {number} params.validity - Number of seconds after which the key will be automatically removed (0 means no time limit for this key)
                     * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
                     * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
                     * @param {string[]} params.indexes - Allowed targeted indexes for this key
                     * @param {string} params.description - A description for your key
                     * @param {string[]} params.referers - A list of authorized referers
                     * @param {Object} params.queryParameters - Force the key to use specific query parameters
                     * @param {Function} callback - The result callback called with two arguments
                     *   error: null or Error('message')
                     *   content: the server answer with user keys list
                     * @return {Promise|undefined} Returns a promise if no callback given
                     * @example
                     * client.updateUserKey('APIKEY', ['search'], {
                    *   validity: 300,
                    *   maxQueriesPerIPPerHour: 2000,
                    *   maxHitsPerQuery: 3,
                    *   indexes: ['fruits'],
                    *   description: 'Eat three fruits',
                    *   referers: ['*.algolia.com'],
                    *   queryParameters: {
                    *     tagFilters: ['public'],
                    *   }
                    * })
                     * @see {@link https://www.algolia.com/doc/rest_api#UpdateIndexKey|Algolia REST API Documentation}
                     */
                    updateUserKey: function updateUserKey(key, acls, params, callback) {
                        if (arguments.length === 2 || typeof params === 'function') {
                            callback = params;
                            params = null;
                        }

                        var putObj = {
                            acl: acls
                        };

                        if (params) {
                            putObj.validity = params.validity;
                            putObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
                            putObj.maxHitsPerQuery = params.maxHitsPerQuery;
                            putObj.indexes = params.indexes;
                            putObj.description = params.description;

                            if (params.queryParameters) {
                                putObj.queryParameters = this._getSearchParams(params.queryParameters, '');
                            }

                            putObj.referers = params.referers;
                        }

                        return this._jsonRequest({
                            method: 'PUT',
                            url: '/1/keys/' + key,
                            body: putObj,
                            hostType: 'write',
                            callback: callback
                        });
                    },

                    /**
                     * Set the extra security tagFilters header
                     * @param {string|array} tags The list of tags defining the current security filters
                     */
                    setSecurityTags: function setSecurityTags(tags) {
                        if (Object.prototype.toString.call(tags) === '[object Array]') {
                            var strTags = [];
                            for (var i = 0; i < tags.length; ++i) {
                                if (Object.prototype.toString.call(tags[i]) === '[object Array]') {
                                    var oredTags = [];
                                    for (var j = 0; j < tags[i].length; ++j) {
                                        oredTags.push(tags[i][j]);
                                    }
                                    strTags.push('(' + oredTags.join(',') + ')');
                                } else {
                                    strTags.push(tags[i]);
                                }
                            }
                            tags = strTags.join(',');
                        }

                        this.securityTags = tags;
                    },

                    /**
                     * Set the extra user token header
                     * @param {string} userToken The token identifying a uniq user (used to apply rate limits)
                     */
                    setUserToken: function setUserToken(userToken) {
                        this.userToken = userToken;
                    },

                    /**
                     * Initialize a new batch of search queries
                     * @deprecated use client.search()
                     */
                    startQueriesBatch: deprecate(function startQueriesBatchDeprecated() {
                        this._batch = [];
                    }, deprecatedMessage('client.startQueriesBatch()', 'client.search()')),

                    /**
                     * Add a search query in the batch
                     * @deprecated use client.search()
                     */
                    addQueryInBatch: deprecate(function addQueryInBatchDeprecated(indexName, query, args) {
                        this._batch.push({
                            indexName: indexName,
                            query: query,
                            params: args
                        });
                    }, deprecatedMessage('client.addQueryInBatch()', 'client.search()')),

                    /**
                     * Clear all queries in client's cache
                     * @return undefined
                     */
                    clearCache: function clearCache() {
                        this.cache = {};
                    },

                    /**
                     * Launch the batch of queries using XMLHttpRequest.
                     * @deprecated use client.search()
                     */
                    sendQueriesBatch: deprecate(function sendQueriesBatchDeprecated(callback) {
                        return this.search(this._batch, callback);
                    }, deprecatedMessage('client.sendQueriesBatch()', 'client.search()')),

                    /**
                     * Set the number of milliseconds a request can take before automatically being terminated.
                     *
                     * @param {Number} milliseconds
                     */
                    setRequestTimeout: function setRequestTimeout(milliseconds) {
                        if (milliseconds) {
                            this.requestTimeout = parseInt(milliseconds, 10);
                        }
                    },

                    /**
                     * Search through multiple indices at the same time
                     * @param  {Object[]}   queries  An array of queries you want to run.
                     * @param {string} queries[].indexName The index name you want to target
                     * @param {string} [queries[].query] The query to issue on this index. Can also be passed into `params`
                     * @param {Object} queries[].params Any search param like hitsPerPage, ..
                     * @param  {Function} callback Callback to be called
                     * @return {Promise|undefined} Returns a promise if no callback given
                     */
                    search: function search(queries, callback) {
                        var client = this;

                        var postObj = {
                            requests: map(queries, function prepareRequest(query) {
                                var params = '';

                                // allow query.query
                                // so we are mimicing the index.search(query, params) method
                                // {indexName:, query:, params:}
                                if (query.query !== undefined) {
                                    params += 'query=' + encodeURIComponent(query.query);
                                }

                                return {
                                    indexName: query.indexName,
                                    params: client._getSearchParams(query.params, params)
                                };
                            })
                        };

                        return this._jsonRequest({
                            cache: this.cache,
                            method: 'POST',
                            url: '/1/indexes/*/queries',
                            body: postObj,
                            hostType: 'read',
                            callback: callback
                        });
                    },

                    /**
                     * Perform write operations accross multiple indexes.
                     *
                     * To reduce the amount of time spent on network round trips,
                     * you can create, update, or delete several objects in one call,
                     * using the batch endpoint (all operations are done in the given order).
                     *
                     * Available actions:
                     *   - addObject
                     *   - updateObject
                     *   - partialUpdateObject
                     *   - partialUpdateObjectNoCreate
                     *   - deleteObject
                     *
                     * https://www.algolia.com/doc/rest_api#Indexes
                     * @param  {Object[]} operations An array of operations to perform
                     * @return {Promise|undefined} Returns a promise if no callback given
                     * @example
                     * client.batch([{
                    *   action: 'addObject',
                    *   indexName: 'clients',
                    *   body: {
                    *     name: 'Bill'
                    *   }
                    * }, {
                    *   action: 'udpateObject',
                    *   indexName: 'fruits',
                    *   body: {
                    *     objectID: '29138',
                    *     name: 'banana'
                    *   }
                    * }], cb)
                     */
                    batch: function batch(operations, callback) {
                        return this._jsonRequest({
                            method: 'POST',
                            url: '/1/indexes/*/batch',
                            body: {
                                requests: operations
                            },
                            hostType: 'write',
                            callback: callback
                        });
                    },

                    // environment specific methods
                    destroy: notImplemented,
                    enableRateLimitForward: notImplemented,
                    disableRateLimitForward: notImplemented,
                    useSecuredAPIKey: notImplemented,
                    disableSecuredAPIKey: notImplemented,
                    generateSecuredApiKey: notImplemented,
                    /*
                     * Index class constructor.
                     * You should not use this method directly but use initIndex() function
                     */
                    Index: function Index(algoliasearch, indexName) {
                        this.indexName = indexName;
                        this.as = algoliasearch;
                        this.typeAheadArgs = null;
                        this.typeAheadValueOption = null;

                        // make sure every index instance has it's own cache
                        this.cache = {};
                    },
                    /**
                     * Add an extra field to the HTTP request
                     *
                     * @param name the header field name
                     * @param value the header field value
                     */
                    setExtraHeader: function setExtraHeader(name, value) {
                        this.extraHeaders.push({
                            name: name.toLowerCase(), value: value
                        });
                    },

                    _sendQueriesBatch: function _sendQueriesBatch(params, callback) {
                        function prepareParams() {
                            var reqParams = '';
                            for (var i = 0; i < params.requests.length; ++i) {
                                var q = '/1/indexes/' + encodeURIComponent(params.requests[i].indexName) + '?' + params.requests[i].params;
                                reqParams += i + '=' + encodeURIComponent(q) + '&';
                            }
                            return reqParams;
                        }

                        return this._jsonRequest({
                            cache: this.cache,
                            method: 'POST',
                            url: '/1/indexes/*/queries',
                            body: params,
                            hostType: 'read',
                            fallback: {
                                method: 'GET',
                                url: '/1/indexes/*',
                                body: {
                                    params: prepareParams()
                                }
                            },
                            callback: callback
                        });
                    },
                    /*
                     * Wrapper that try all hosts to maximize the quality of service
                     */
                    _jsonRequest: function _jsonRequest(opts) {
                        var requestDebug = require(6)('algoliasearch:' + opts.url);

                        var body;
                        var cache = opts.cache;
                        var client = this;
                        var tries = 0;
                        var usingFallback = false;

                        if (opts.body !== undefined) {
                            body = safeJSONStringify(opts.body);
                        }

                        requestDebug('request start');

                        function doRequest(requester, reqOpts) {
                            var cacheID;

                            if (client._useCache) {
                                cacheID = opts.url;
                            }

                            // as we sometime use POST requests to pass parameters (like query='aa'),
                            // the cacheID must also include the body to be different between calls
                            if (client._useCache && body) {
                                cacheID += '_body_' + reqOpts.body;
                            }

                            // handle cache existence
                            if (client._useCache && cache && cache[cacheID] !== undefined) {
                                requestDebug('serving response from cache');
                                return client._promise.resolve(JSON.parse(safeJSONStringify(cache[cacheID])));
                            }

                            // if we reached max tries
                            if (tries >= client.hosts[opts.hostType].length ||
                            // or we need to switch to fallback
                            client.useFallback && !usingFallback) {
                                // and there's no fallback or we are already using a fallback
                                if (!opts.fallback || !client._request.fallback || usingFallback) {
                                    requestDebug('could not get any response');
                                    // then stop
                                    return client._promise.reject(new errors.AlgoliaSearchError('Cannot connect to the AlgoliaSearch API.' + ' Send an email to support@algolia.com to report and resolve the issue.' + ' Application id was: ' + client.applicationID));
                                }

                                requestDebug('switching to fallback');

                                // let's try the fallback starting from here
                                tries = 0;

                                // method, url and body are fallback dependent
                                reqOpts.method = opts.fallback.method;
                                reqOpts.url = opts.fallback.url;
                                reqOpts.jsonBody = opts.fallback.body;
                                if (reqOpts.jsonBody) {
                                    reqOpts.body = safeJSONStringify(reqOpts.jsonBody);
                                }

                                reqOpts.timeout = client.requestTimeout * (tries + 1);
                                client.hostIndex[opts.hostType] = 0;
                                usingFallback = true; // the current request is now using fallback
                                return doRequest(client._request.fallback, reqOpts);
                            }

                            var url = client.hosts[opts.hostType][client.hostIndex[opts.hostType]] + reqOpts.url;
                            var options = {
                                body: body,
                                jsonBody: opts.body,
                                method: reqOpts.method,
                                headers: client._computeRequestHeaders(),
                                timeout: reqOpts.timeout,
                                debug: requestDebug
                            };

                            requestDebug('method: %s, url: %s, headers: %j, timeout: %d', options.method, url, options.headers, options.timeout);

                            if (requester === client._request.fallback) {
                                requestDebug('using fallback');
                            }

                            // `requester` is any of this._request or this._request.fallback
                            // thus it needs to be called using the client as context
                            return requester.call(client, url, options).then(success, tryFallback);

                            function success(httpResponse) {
                                // compute the status of the response,
                                //
                                // When in browser mode, using XDR or JSONP, we have no statusCode available
                                // So we rely on our API response `status` property.
                                // But `waitTask` can set a `status` property which is not the statusCode (it's the task status)
                                // So we check if there's a `message` along `status` and it means it's an error
                                //
                                // That's the only case where we have a response.status that's not the http statusCode
                                var status = httpResponse && httpResponse.body && httpResponse.body.message && httpResponse.body.status ||

                                // this is important to check the request statusCode AFTER the body eventual
                                // statusCode because some implementations (jQuery XDomainRequest transport) may
                                // send statusCode 200 while we had an error
                                httpResponse.statusCode ||

                                // When in browser mode, using XDR or JSONP
                                // we default to success when no error (no response.status && response.message)
                                // If there was a JSON.parse() error then body is null and it fails
                                httpResponse && httpResponse.body && 200;

                                requestDebug('received response: statusCode: %s, computed statusCode: %d, headers: %j', httpResponse.statusCode, status, httpResponse.headers);

                                if (process.env.DEBUG && process.env.DEBUG.indexOf('debugBody') !== -1) {
                                    requestDebug('body: %j', httpResponse.body);
                                }

                                var ok = status === 200 || status === 201;
                                var retry = !ok && Math.floor(status / 100) !== 4 && Math.floor(status / 100) !== 1;

                                if (client._useCache && ok && cache) {
                                    cache[cacheID] = httpResponse.body;
                                }

                                if (ok) {
                                    return httpResponse.body;
                                }

                                if (retry) {
                                    tries += 1;
                                    return retryRequest();
                                }

                                var unrecoverableError = new errors.AlgoliaSearchError(httpResponse.body && httpResponse.body.message);

                                return client._promise.reject(unrecoverableError);
                            }

                            function tryFallback(err) {
                                // error cases:
                                //  While not in fallback mode:
                                //    - CORS not supported
                                //    - network error
                                //  While in fallback mode:
                                //    - timeout
                                //    - network error
                                //    - badly formatted JSONP (script loaded, did not call our callback)
                                //  In both cases:
                                //    - uncaught exception occurs (TypeError)
                                requestDebug('error: %s, stack: %s', err.message, err.stack);

                                if (!(err instanceof errors.AlgoliaSearchError)) {
                                    err = new errors.Unknown(err && err.message, err);
                                }

                                tries += 1;

                                // stop the request implementation when:
                                if (
                                // we did not generate this error,
                                // it comes from a throw in some other piece of code
                                err instanceof errors.Unknown ||

                                // server sent unparsable JSON
                                err instanceof errors.UnparsableJSON ||

                                // no fallback and a network error occured (No CORS, bad APPID)
                                !requester.fallback && err instanceof errors.Network ||

                                // max tries and already using fallback or no fallback
                                tries >= client.hosts[opts.hostType].length && (usingFallback || !opts.fallback || !client._request.fallback)) {
                                    // stop request implementation for this command
                                    return client._promise.reject(err);
                                }

                                client.hostIndex[opts.hostType] = ++client.hostIndex[opts.hostType] % client.hosts[opts.hostType].length;

                                if (err instanceof errors.RequestTimeout) {
                                    return retryRequest();
                                } else if (client._request.fallback && !client.useFallback) {
                                    // if any error occured but timeout, use fallback for the rest
                                    // of the session
                                    client.useFallback = true;
                                }

                                return doRequest(requester, reqOpts);
                            }

                            function retryRequest() {
                                client.hostIndex[opts.hostType] = ++client.hostIndex[opts.hostType] % client.hosts[opts.hostType].length;
                                reqOpts.timeout = client.requestTimeout * (tries + 1);
                                return doRequest(requester, reqOpts);
                            }
                        }

                        // we can use a fallback if forced AND fallback parameters are available
                        var useFallback = client.useFallback && opts.fallback;
                        var requestOptions = useFallback ? opts.fallback : opts;

                        var promise = doRequest(
                        // set the requester
                        useFallback ? client._request.fallback : client._request, {
                            url: requestOptions.url,
                            method: requestOptions.method,
                            body: body,
                            jsonBody: opts.body,
                            timeout: client.requestTimeout * (tries + 1)
                        });

                        // either we have a callback
                        // either we are using promises
                        if (opts.callback) {
                            promise.then(function okCb(content) {
                                exitPromise(function () {
                                    opts.callback(null, content);
                                }, client._setTimeout || setTimeout);
                            }, function nookCb(err) {
                                exitPromise(function () {
                                    opts.callback(err);
                                }, client._setTimeout || setTimeout);
                            });
                        } else {
                            return promise;
                        }
                    },

                    /*
                     * Transform search param object in query string
                     */
                    _getSearchParams: function _getSearchParams(args, params) {
                        if (this._isUndefined(args) || args === null) {
                            return params;
                        }
                        for (var key in args) {
                            if (key !== null && args[key] !== undefined && args.hasOwnProperty(key)) {
                                params += params === '' ? '' : '&';
                                params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? safeJSONStringify(args[key]) : args[key]);
                            }
                        }
                        return params;
                    },

                    _isUndefined: function _isUndefined(obj) {
                        return obj === void 0;
                    },

                    _computeRequestHeaders: function _computeRequestHeaders() {
                        var forEach = require(11);

                        var requestHeaders = {
                            'x-algolia-api-key': this.apiKey,
                            'x-algolia-application-id': this.applicationID,
                            'x-algolia-agent': this._ua
                        };

                        if (this.userToken) {
                            requestHeaders['x-algolia-usertoken'] = this.userToken;
                        }

                        if (this.securityTags) {
                            requestHeaders['x-algolia-tagfilters'] = this.securityTags;
                        }

                        if (this.extraHeaders) {
                            forEach(this.extraHeaders, function addToRequestHeaders(header) {
                                requestHeaders[header.name] = header.value;
                            });
                        }

                        return requestHeaders;
                    }
                };

                /*
                 * Contains all the functions related to one index
                 * You should use AlgoliaSearch.initIndex(indexName) to retrieve this object
                 */
                AlgoliaSearch.prototype.Index.prototype = {
                    /*
                     * Clear all queries in cache
                     */
                    clearCache: function clearCache() {
                        this.cache = {};
                    },
                    /*
                     * Add an object in this index
                     *
                     * @param content contains the javascript object to add inside the index
                     * @param objectID (optional) an objectID you want to attribute to this object
                     * (if the attribute already exist the old object will be overwrite)
                     * @param callback (optional) the result callback called with two arguments:
                     *  error: null or Error('message')
                     *  content: the server answer that contains 3 elements: createAt, taskId and objectID
                     */
                    addObject: function addObject(content, objectID, callback) {
                        var indexObj = this;

                        if (arguments.length === 1 || typeof objectID === 'function') {
                            callback = objectID;
                            objectID = undefined;
                        }

                        return this.as._jsonRequest({
                            method: objectID !== undefined ? 'PUT' : // update or create
                            'POST', // create (API generates an objectID)
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + ( // create
                            objectID !== undefined ? '/' + encodeURIComponent(objectID) : ''), // update or create
                            body: content,
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /*
                     * Add several objects
                     *
                     * @param objects contains an array of objects to add
                     * @param callback (optional) the result callback called with two arguments:
                     *  error: null or Error('message')
                     *  content: the server answer that updateAt and taskID
                     */
                    addObjects: function addObjects(objects, callback) {
                        var indexObj = this;
                        var postObj = {
                            requests: []
                        };
                        for (var i = 0; i < objects.length; ++i) {
                            var request = {
                                action: 'addObject',
                                body: objects[i]
                            };
                            postObj.requests.push(request);
                        }
                        return this.as._jsonRequest({
                            method: 'POST',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
                            body: postObj,
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /*
                     * Get an object from this index
                     *
                     * @param objectID the unique identifier of the object to retrieve
                     * @param attrs (optional) if set, contains the array of attribute names to retrieve
                     * @param callback (optional) the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the object to retrieve or the error message if a failure occured
                     */
                    getObject: function getObject(objectID, attrs, callback) {
                        var indexObj = this;

                        if (arguments.length === 1 || typeof attrs === 'function') {
                            callback = attrs;
                            attrs = undefined;
                        }

                        var params = '';
                        if (attrs !== undefined) {
                            params = '?attributes=';
                            for (var i = 0; i < attrs.length; ++i) {
                                if (i !== 0) {
                                    params += ',';
                                }
                                params += attrs[i];
                            }
                        }

                        return this.as._jsonRequest({
                            method: 'GET',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID) + params,
                            hostType: 'read',
                            callback: callback
                        });
                    },

                    /*
                     * Get several objects from this index
                     *
                     * @param objectIDs the array of unique identifier of objects to retrieve
                     */
                    getObjects: function getObjects(objectIDs, attributesToRetrieve, callback) {
                        var indexObj = this;

                        if (arguments.length === 1 || typeof attributesToRetrieve === 'function') {
                            callback = attributesToRetrieve;
                            attributesToRetrieve = undefined;
                        }

                        var body = {
                            requests: map(objectIDs, function prepareRequest(objectID) {
                                var request = {
                                    'indexName': indexObj.indexName,
                                    'objectID': objectID
                                };

                                if (attributesToRetrieve) {
                                    request.attributesToRetrieve = attributesToRetrieve.join(',');
                                }

                                return request;
                            })
                        };

                        return this.as._jsonRequest({
                            method: 'POST',
                            url: '/1/indexes/*/objects',
                            hostType: 'read',
                            body: body,
                            callback: callback
                        });
                    },

                    /*
                     * Update partially an object (only update attributes passed in argument)
                     *
                     * @param partialObject contains the javascript attributes to override, the
                     *  object must contains an objectID attribute
                     * @param callback (optional) the result callback called with two arguments:
                     *  error: null or Error('message')
                     *  content: the server answer that contains 3 elements: createAt, taskId and objectID
                     */
                    partialUpdateObject: function partialUpdateObject(partialObject, callback) {
                        var indexObj = this;
                        return this.as._jsonRequest({
                            method: 'POST',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(partialObject.objectID) + '/partial',
                            body: partialObject,
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /*
                     * Partially Override the content of several objects
                     *
                     * @param objects contains an array of objects to update (each object must contains a objectID attribute)
                     * @param callback (optional) the result callback called with two arguments:
                     *  error: null or Error('message')
                     *  content: the server answer that updateAt and taskID
                     */
                    partialUpdateObjects: function partialUpdateObjects(objects, callback) {
                        var indexObj = this;
                        var postObj = {
                            requests: []
                        };
                        for (var i = 0; i < objects.length; ++i) {
                            var request = {
                                action: 'partialUpdateObject',
                                objectID: objects[i].objectID,
                                body: objects[i]
                            };
                            postObj.requests.push(request);
                        }
                        return this.as._jsonRequest({
                            method: 'POST',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
                            body: postObj,
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /*
                     * Override the content of object
                     *
                     * @param object contains the javascript object to save, the object must contains an objectID attribute
                     * @param callback (optional) the result callback called with two arguments:
                     *  error: null or Error('message')
                     *  content: the server answer that updateAt and taskID
                     */
                    saveObject: function saveObject(object, callback) {
                        var indexObj = this;
                        return this.as._jsonRequest({
                            method: 'PUT',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(object.objectID),
                            body: object,
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /*
                     * Override the content of several objects
                     *
                     * @param objects contains an array of objects to update (each object must contains a objectID attribute)
                     * @param callback (optional) the result callback called with two arguments:
                     *  error: null or Error('message')
                     *  content: the server answer that updateAt and taskID
                     */
                    saveObjects: function saveObjects(objects, callback) {
                        var indexObj = this;
                        var postObj = {
                            requests: []
                        };
                        for (var i = 0; i < objects.length; ++i) {
                            var request = {
                                action: 'updateObject',
                                objectID: objects[i].objectID,
                                body: objects[i]
                            };
                            postObj.requests.push(request);
                        }
                        return this.as._jsonRequest({
                            method: 'POST',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
                            body: postObj,
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /*
                     * Delete an object from the index
                     *
                     * @param objectID the unique identifier of object to delete
                     * @param callback (optional) the result callback called with two arguments:
                     *  error: null or Error('message')
                     *  content: the server answer that contains 3 elements: createAt, taskId and objectID
                     */
                    deleteObject: function deleteObject(objectID, callback) {
                        if (typeof objectID === 'function' || typeof objectID !== 'string' && typeof objectID !== 'number') {
                            var err = new errors.AlgoliaSearchError('Cannot delete an object without an objectID');
                            callback = objectID;
                            if (typeof callback === 'function') {
                                return callback(err);
                            }

                            return this.as._promise.reject(err);
                        }

                        var indexObj = this;
                        return this.as._jsonRequest({
                            method: 'DELETE',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID),
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /*
                     * Delete several objects from an index
                     *
                     * @param objectIDs contains an array of objectID to delete
                     * @param callback (optional) the result callback called with two arguments:
                     *  error: null or Error('message')
                     *  content: the server answer that contains 3 elements: createAt, taskId and objectID
                     */
                    deleteObjects: function deleteObjects(objectIDs, callback) {
                        var indexObj = this;
                        var postObj = {
                            requests: map(objectIDs, function prepareRequest(objectID) {
                                return {
                                    action: 'deleteObject',
                                    objectID: objectID,
                                    body: {
                                        objectID: objectID
                                    }
                                };
                            })
                        };

                        return this.as._jsonRequest({
                            method: 'POST',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
                            body: postObj,
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /*
                     * Delete all objects matching a query
                     *
                     * @param query the query string
                     * @param params the optional query parameters
                     * @param callback (optional) the result callback called with one argument
                     *  error: null or Error('message')
                     */
                    deleteByQuery: function deleteByQuery(query, params, callback) {
                        var indexObj = this;
                        var client = indexObj.as;

                        if (arguments.length === 1 || typeof params === 'function') {
                            callback = params;
                            params = {};
                        }

                        params.attributesToRetrieve = 'objectID';
                        params.hitsPerPage = 1000;

                        // when deleting, we should never use cache to get the
                        // search results
                        this.clearCache();

                        // there's a problem in how we use the promise chain,
                        // see how waitTask is done
                        var promise = this.search(query, params).then(stopOrDelete);

                        function stopOrDelete(searchContent) {
                            // stop here
                            if (searchContent.nbHits === 0) {
                                // return indexObj.as._request.resolve();
                                return searchContent;
                            }

                            // continue and do a recursive call
                            var objectIDs = map(searchContent.hits, function getObjectID(object) {
                                return object.objectID;
                            });

                            return indexObj.deleteObjects(objectIDs).then(waitTask).then(doDeleteByQuery);
                        }

                        function waitTask(deleteObjectsContent) {
                            return indexObj.waitTask(deleteObjectsContent.taskID);
                        }

                        function doDeleteByQuery() {
                            return indexObj.deleteByQuery(query, params);
                        }

                        if (!callback) {
                            return promise;
                        }

                        promise.then(success, failure);

                        function success() {
                            exitPromise(function exit() {
                                callback(null);
                            }, client._setTimeout || setTimeout);
                        }

                        function failure(err) {
                            exitPromise(function exit() {
                                callback(err);
                            }, client._setTimeout || setTimeout);
                        }
                    },
                    /*
                     * Search inside the index using XMLHttpRequest request (Using a POST query to
                     * minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
                     *
                     * @param query the full text query
                     * @param args (optional) if set, contains an object with query parameters:
                     * - page: (integer) Pagination parameter used to select the page to retrieve.
                     *                   Page is zero-based and defaults to 0. Thus,
                     *                   to retrieve the 10th page you need to set page=9
                     * - hitsPerPage: (integer) Pagination parameter used to select the number of hits per page. Defaults to 20.
                     * - attributesToRetrieve: a string that contains the list of object attributes
                     * you want to retrieve (let you minimize the answer size).
                     *   Attributes are separated with a comma (for example "name,address").
                     *   You can also use an array (for example ["name","address"]).
                     *   By default, all attributes are retrieved. You can also use '*' to retrieve all
                     *   values when an attributesToRetrieve setting is specified for your index.
                     * - attributesToHighlight: a string that contains the list of attributes you
                     *   want to highlight according to the query.
                     *   Attributes are separated by a comma. You can also use an array (for example ["name","address"]).
                     *   If an attribute has no match for the query, the raw value is returned.
                     *   By default all indexed text attributes are highlighted.
                     *   You can use `*` if you want to highlight all textual attributes.
                     *   Numerical attributes are not highlighted.
                     *   A matchLevel is returned for each highlighted attribute and can contain:
                     *      - full: if all the query terms were found in the attribute,
                     *      - partial: if only some of the query terms were found,
                     *      - none: if none of the query terms were found.
                     * - attributesToSnippet: a string that contains the list of attributes to snippet alongside
                     * the number of words to return (syntax is `attributeName:nbWords`).
                     *    Attributes are separated by a comma (Example: attributesToSnippet=name:10,content:10).
                     *    You can also use an array (Example: attributesToSnippet: ['name:10','content:10']).
                     *    By default no snippet is computed.
                     * - minWordSizefor1Typo: the minimum number of characters in a query word to accept one typo in this word.
                     *D efaults to 3.
                     * - minWordSizefor2Typos: the minimum number of characters in a query word
                     * to accept two typos in this word. Defaults to 7.
                     * - getRankingInfo: if set to 1, the result hits will contain ranking
                     * information in _rankingInfo attribute.
                     * - aroundLatLng: search for entries around a given
                     * latitude/longitude (specified as two floats separated by a comma).
                     *   For example aroundLatLng=47.316669,5.016670).
                     *   You can specify the maximum distance in meters with the aroundRadius parameter (in meters)
                     *   and the precision for ranking with aroundPrecision
                     *   (for example if you set aroundPrecision=100, two objects that are distant of
                     *   less than 100m will be considered as identical for "geo" ranking parameter).
                     *   At indexing, you should specify geoloc of an object with the _geoloc attribute
                     *   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
                     * - insideBoundingBox: search entries inside a given area defined by the two extreme points
                     * of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).
                     *   For example insideBoundingBox=47.3165,4.9665,47.3424,5.0201).
                     *   At indexing, you should specify geoloc of an object with the _geoloc attribute
                     *   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
                     * - numericFilters: a string that contains the list of numeric filters you want to
                     * apply separated by a comma.
                     *   The syntax of one filter is `attributeName` followed by `operand` followed by `value`.
                     *   Supported operands are `<`, `<=`, `=`, `>` and `>=`.
                     *   You can have multiple conditions on one attribute like for example numericFilters=price>100,price<1000.
                     *   You can also use an array (for example numericFilters: ["price>100","price<1000"]).
                     * - tagFilters: filter the query by a set of tags. You can AND tags by separating them by commas.
                     *   To OR tags, you must add parentheses. For example, tags=tag1,(tag2,tag3) means tag1 AND (tag2 OR tag3).
                     *   You can also use an array, for example tagFilters: ["tag1",["tag2","tag3"]]
                     *   means tag1 AND (tag2 OR tag3).
                     *   At indexing, tags should be added in the _tags** attribute
                     *   of objects (for example {"_tags":["tag1","tag2"]}).
                     * - facetFilters: filter the query by a list of facets.
                     *   Facets are separated by commas and each facet is encoded as `attributeName:value`.
                     *   For example: `facetFilters=category:Book,author:John%20Doe`.
                     *   You can also use an array (for example `["category:Book","author:John%20Doe"]`).
                     * - facets: List of object attributes that you want to use for faceting.
                     *   Comma separated list: `"category,author"` or array `['category','author']`
                     *   Only attributes that have been added in **attributesForFaceting** index setting
                     *   can be used in this parameter.
                     *   You can also use `*` to perform faceting on all attributes specified in **attributesForFaceting**.
                     * - queryType: select how the query words are interpreted, it can be one of the following value:
                     *    - prefixAll: all query words are interpreted as prefixes,
                     *    - prefixLast: only the last word is interpreted as a prefix (default behavior),
                     *    - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
                     * - optionalWords: a string that contains the list of words that should
                     * be considered as optional when found in the query.
                     *   Comma separated and array are accepted.
                     * - distinct: If set to 1, enable the distinct feature (disabled by default)
                     * if the attributeForDistinct index setting is set.
                     *   This feature is similar to the SQL "distinct" keyword: when enabled
                     *   in a query with the distinct=1 parameter,
                     *   all hits containing a duplicate value for the attributeForDistinct attribute are removed from results.
                     *   For example, if the chosen attribute is show_name and several hits have
                     *   the same value for show_name, then only the best
                     *   one is kept and others are removed.
                     * - restrictSearchableAttributes: List of attributes you want to use for
                     * textual search (must be a subset of the attributesToIndex index setting)
                     * either comma separated or as an array
                     * @param callback the result callback called with two arguments:
                     *  error: null or Error('message'). If false, the content contains the error.
                     *  content: the server answer that contains the list of results.
                     */
                    search: function search(query, args, callback) {
                        // warn V2 users on how to search
                        if (typeof query === 'function' && (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' || (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object') {
                            // .search(query, params, cb)
                            // .search(cb, params)
                            throw new errors.AlgoliaSearchError('index.search usage is index.search(query, params, cb)');
                        }

                        if (arguments.length === 0 || typeof query === 'function') {
                            // .search(), .search(cb)
                            callback = query;
                            query = '';
                        } else if (arguments.length === 1 || typeof args === 'function') {
                            // .search(query/args), .search(query, cb)
                            callback = args;
                            args = undefined;
                        }

                        // .search(args), careful: typeof null === 'object'
                        if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object' && query !== null) {
                            args = query;
                            query = undefined;
                        } else if (query === undefined || query === null) {
                            // .search(undefined/null)
                            query = '';
                        }

                        var params = '';

                        if (query !== undefined) {
                            params += 'query=' + encodeURIComponent(query);
                        }

                        if (args !== undefined) {
                            // `_getSearchParams` will augment params, do not be fooled by the = versus += from previous if
                            params = this.as._getSearchParams(args, params);
                        }

                        return this._search(params, callback);
                    },

                    /*
                     * Browse index content. The response content will have a `cursor` property that you can use
                     * to browse subsequent pages for this query. Use `index.browseNext(cursor)` when you want.
                     *
                     * @param {string} query - The full text query
                     * @param {Object} [queryParameters] - Any search query parameter
                     * @param {Function} [callback] - The result callback called with two arguments
                     *   error: null or Error('message')
                     *   content: the server answer with the browse result
                     * @return {Promise|undefined} Returns a promise if no callback given
                     * @example
                     * index.browse('cool songs', {
                     *   tagFilters: 'public,comments',
                     *   hitsPerPage: 500
                     * }, callback);
                     * @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
                     */
                    // pre 3.5.0 usage, backward compatible
                    // browse: function(page, hitsPerPage, callback) {
                    browse: function browse(query, queryParameters, callback) {
                        var merge = require(57);

                        var indexObj = this;

                        var page;
                        var hitsPerPage;

                        // we check variadic calls that are not the one defined
                        // .browse()/.browse(fn)
                        // => page = 0
                        if (arguments.length === 0 || arguments.length === 1 && typeof arguments[0] === 'function') {
                            page = 0;
                            callback = arguments[0];
                            query = undefined;
                        } else if (typeof arguments[0] === 'number') {
                            // .browse(2)/.browse(2, 10)/.browse(2, fn)/.browse(2, 10, fn)
                            page = arguments[0];
                            if (typeof arguments[1] === 'number') {
                                hitsPerPage = arguments[1];
                            } else if (typeof arguments[1] === 'function') {
                                callback = arguments[1];
                                hitsPerPage = undefined;
                            }
                            query = undefined;
                            queryParameters = undefined;
                        } else if (_typeof(arguments[0]) === 'object') {
                            // .browse(queryParameters)/.browse(queryParameters, cb)
                            if (typeof arguments[1] === 'function') {
                                callback = arguments[1];
                            }
                            queryParameters = arguments[0];
                            query = undefined;
                        } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
                            // .browse(query, cb)
                            callback = arguments[1];
                            queryParameters = undefined;
                        }

                        // otherwise it's a .browse(query)/.browse(query, queryParameters)/.browse(query, queryParameters, cb)

                        // get search query parameters combining various possible calls
                        // to .browse();
                        queryParameters = merge({}, queryParameters || {}, {
                            page: page,
                            hitsPerPage: hitsPerPage,
                            query: query
                        });

                        var params = this.as._getSearchParams(queryParameters, '');

                        return this.as._jsonRequest({
                            method: 'GET',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/browse?' + params,
                            hostType: 'read',
                            callback: callback
                        });
                    },

                    /*
                     * Continue browsing from a previous position (cursor), obtained via a call to `.browse()`.
                     *
                     * @param {string} query - The full text query
                     * @param {Object} [queryParameters] - Any search query parameter
                     * @param {Function} [callback] - The result callback called with two arguments
                     *   error: null or Error('message')
                     *   content: the server answer with the browse result
                     * @return {Promise|undefined} Returns a promise if no callback given
                     * @example
                     * index.browseFrom('14lkfsakl32', callback);
                     * @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
                     */
                    browseFrom: function browseFrom(cursor, callback) {
                        return this.as._jsonRequest({
                            method: 'GET',
                            url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/browse?cursor=' + encodeURIComponent(cursor),
                            hostType: 'read',
                            callback: callback
                        });
                    },

                    /*
                     * Browse all content from an index using events. Basically this will do
                     * .browse() -> .browseFrom -> .browseFrom -> .. until all the results are returned
                     *
                     * @param {string} query - The full text query
                     * @param {Object} [queryParameters] - Any search query parameter
                     * @return {EventEmitter}
                     * @example
                     * var browser = index.browseAll('cool songs', {
                     *   tagFilters: 'public,comments',
                     *   hitsPerPage: 500
                     * });
                     *
                     * browser.on('result', function resultCallback(content) {
                     *   console.log(content.hits);
                     * });
                     *
                     * // if any error occurs, you get it
                     * browser.on('error', function(err) {
                     *   throw err;
                     * });
                     *
                     * // when you have browsed the whole index, you get this event
                     * browser.on('end', function() {
                     *   console.log('finished');
                     * });
                     *
                     * // at any point if you want to stop the browsing process, you can stop it manually
                     * // otherwise it will go on and on
                     * browser.stop();
                     *
                     * @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
                     */
                    browseAll: function browseAll(query, queryParameters) {
                        if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {
                            queryParameters = query;
                            query = undefined;
                        }

                        var merge = require(57);

                        var IndexBrowser = require(61);

                        var browser = new IndexBrowser();
                        var client = this.as;
                        var index = this;
                        var params = client._getSearchParams(merge({}, queryParameters || {}, {
                            query: query
                        }), '');

                        // start browsing
                        browseLoop();

                        function browseLoop(cursor) {
                            if (browser._stopped) {
                                return;
                            }

                            var queryString;

                            if (cursor !== undefined) {
                                queryString = 'cursor=' + encodeURIComponent(cursor);
                            } else {
                                queryString = params;
                            }

                            client._jsonRequest({
                                method: 'GET',
                                url: '/1/indexes/' + encodeURIComponent(index.indexName) + '/browse?' + queryString,
                                hostType: 'read',
                                callback: browseCallback
                            });
                        }

                        function browseCallback(err, content) {
                            if (browser._stopped) {
                                return;
                            }

                            if (err) {
                                browser._error(err);
                                return;
                            }

                            browser._result(content);

                            // no cursor means we are finished browsing
                            if (content.cursor === undefined) {
                                browser._end();
                                return;
                            }

                            browseLoop(content.cursor);
                        }

                        return browser;
                    },

                    /*
                     * Get a Typeahead.js adapter
                     * @param searchParams contains an object with query parameters (see search for details)
                     */
                    ttAdapter: function ttAdapter(params) {
                        var self = this;
                        return function ttAdapter(query, syncCb, asyncCb) {
                            var cb;

                            if (typeof asyncCb === 'function') {
                                // typeahead 0.11
                                cb = asyncCb;
                            } else {
                                // pre typeahead 0.11
                                cb = syncCb;
                            }

                            self.search(query, params, function searchDone(err, content) {
                                if (err) {
                                    cb(err);
                                    return;
                                }

                                cb(content.hits);
                            });
                        };
                    },

                    /*
                     * Wait the publication of a task on the server.
                     * All server task are asynchronous and you can check with this method that the task is published.
                     *
                     * @param taskID the id of the task returned by server
                     * @param callback the result callback with with two arguments:
                     *  error: null or Error('message')
                     *  content: the server answer that contains the list of results
                     */
                    waitTask: function waitTask(taskID, callback) {
                        // wait minimum 100ms before retrying
                        var baseDelay = 100;
                        // wait maximum 5s before retrying
                        var maxDelay = 5000;
                        var loop = 0;

                        // waitTask() must be handled differently from other methods,
                        // it's a recursive method using a timeout
                        var indexObj = this;
                        var client = indexObj.as;

                        var promise = retryLoop();

                        function retryLoop() {
                            return client._jsonRequest({
                                method: 'GET',
                                hostType: 'read',
                                url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/task/' + taskID
                            }).then(function success(content) {
                                loop++;
                                var delay = baseDelay * loop * loop;
                                if (delay > maxDelay) {
                                    delay = maxDelay;
                                }

                                if (content.status !== 'published') {
                                    return client._promise.delay(delay).then(retryLoop);
                                }

                                return content;
                            });
                        }

                        if (!callback) {
                            return promise;
                        }

                        promise.then(successCb, failureCb);

                        function successCb(content) {
                            exitPromise(function exit() {
                                callback(null, content);
                            }, client._setTimeout || setTimeout);
                        }

                        function failureCb(err) {
                            exitPromise(function exit() {
                                callback(err);
                            }, client._setTimeout || setTimeout);
                        }
                    },

                    /*
                     * This function deletes the index content. Settings and index specific API keys are kept untouched.
                     *
                     * @param callback (optional) the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the settings object or the error message if a failure occured
                     */
                    clearIndex: function clearIndex(callback) {
                        var indexObj = this;
                        return this.as._jsonRequest({
                            method: 'POST',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/clear',
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /*
                     * Get settings of this index
                     *
                     * @param callback (optional) the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the settings object or the error message if a failure occured
                     */
                    getSettings: function getSettings(callback) {
                        var indexObj = this;
                        return this.as._jsonRequest({
                            method: 'GET',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/settings',
                            hostType: 'read',
                            callback: callback
                        });
                    },

                    /*
                     * Set settings for this index
                     *
                     * @param settigns the settings object that can contains :
                     * - minWordSizefor1Typo: (integer) the minimum number of characters to accept one typo (default = 3).
                     * - minWordSizefor2Typos: (integer) the minimum number of characters to accept two typos (default = 7).
                     * - hitsPerPage: (integer) the number of hits per page (default = 10).
                     * - attributesToRetrieve: (array of strings) default list of attributes to retrieve in objects.
                     *   If set to null, all attributes are retrieved.
                     * - attributesToHighlight: (array of strings) default list of attributes to highlight.
                     *   If set to null, all indexed attributes are highlighted.
                     * - attributesToSnippet**: (array of strings) default list of attributes to snippet alongside the number
                     * of words to return (syntax is attributeName:nbWords).
                     *   By default no snippet is computed. If set to null, no snippet is computed.
                     * - attributesToIndex: (array of strings) the list of fields you want to index.
                     *   If set to null, all textual and numerical attributes of your objects are indexed,
                     *   but you should update it to get optimal results.
                     *   This parameter has two important uses:
                     *     - Limit the attributes to index: For example if you store a binary image in base64,
                     *     you want to store it and be able to
                     *       retrieve it but you don't want to search in the base64 string.
                     *     - Control part of the ranking*: (see the ranking parameter for full explanation)
                     *     Matches in attributes at the beginning of
                     *       the list will be considered more important than matches in attributes further down the list.
                     *       In one attribute, matching text at the beginning of the attribute will be
                     *       considered more important than text after, you can disable
                     *       this behavior if you add your attribute inside `unordered(AttributeName)`,
                     *       for example attributesToIndex: ["title", "unordered(text)"].
                     * - attributesForFaceting: (array of strings) The list of fields you want to use for faceting.
                     *   All strings in the attribute selected for faceting are extracted and added as a facet.
                     *   If set to null, no attribute is used for faceting.
                     * - attributeForDistinct: (string) The attribute name used for the Distinct feature.
                     * This feature is similar to the SQL "distinct" keyword: when enabled
                     *   in query with the distinct=1 parameter, all hits containing a duplicate
                     *   value for this attribute are removed from results.
                     *   For example, if the chosen attribute is show_name and several hits have
                     *   the same value for show_name, then only the best one is kept and others are removed.
                     * - ranking: (array of strings) controls the way results are sorted.
                     *   We have six available criteria:
                     *    - typo: sort according to number of typos,
                     *    - geo: sort according to decreassing distance when performing a geo-location based search,
                     *    - proximity: sort according to the proximity of query words in hits,
                     *    - attribute: sort according to the order of attributes defined by attributesToIndex,
                     *    - exact:
                     *        - if the user query contains one word: sort objects having an attribute
                     *        that is exactly the query word before others.
                     *          For example if you search for the "V" TV show, you want to find it
                     *          with the "V" query and avoid to have all popular TV
                     *          show starting by the v letter before it.
                     *        - if the user query contains multiple words: sort according to the
                     *        number of words that matched exactly (and not as a prefix).
                     *    - custom: sort according to a user defined formula set in **customRanking** attribute.
                     *   The standard order is ["typo", "geo", "proximity", "attribute", "exact", "custom"]
                     * - customRanking: (array of strings) lets you specify part of the ranking.
                     *   The syntax of this condition is an array of strings containing attributes
                     *   prefixed by asc (ascending order) or desc (descending order) operator.
                     *   For example `"customRanking" => ["desc(population)", "asc(name)"]`
                     * - queryType: Select how the query words are interpreted, it can be one of the following value:
                     *   - prefixAll: all query words are interpreted as prefixes,
                     *   - prefixLast: only the last word is interpreted as a prefix (default behavior),
                     *   - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
                     * - highlightPreTag: (string) Specify the string that is inserted before
                     * the highlighted parts in the query result (default to "<em>").
                     * - highlightPostTag: (string) Specify the string that is inserted after
                     * the highlighted parts in the query result (default to "</em>").
                     * - optionalWords: (array of strings) Specify a list of words that should
                     * be considered as optional when found in the query.
                     * @param callback (optional) the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the server answer or the error message if a failure occured
                     */
                    setSettings: function setSettings(settings, callback) {
                        var indexObj = this;
                        return this.as._jsonRequest({
                            method: 'PUT',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/settings',
                            hostType: 'write',
                            body: settings,
                            callback: callback
                        });
                    },
                    /*
                     * List all existing user keys associated to this index
                     *
                     * @param callback the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the server answer with user keys list
                     */
                    listUserKeys: function listUserKeys(callback) {
                        var indexObj = this;
                        return this.as._jsonRequest({
                            method: 'GET',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys',
                            hostType: 'read',
                            callback: callback
                        });
                    },
                    /*
                     * Get ACL of a user key associated to this index
                     *
                     * @param key
                     * @param callback the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the server answer with user keys list
                     */
                    getUserKeyACL: function getUserKeyACL(key, callback) {
                        var indexObj = this;
                        return this.as._jsonRequest({
                            method: 'GET',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys/' + key,
                            hostType: 'read',
                            callback: callback
                        });
                    },
                    /*
                     * Delete an existing user key associated to this index
                     *
                     * @param key
                     * @param callback the result callback called with two arguments
                     *  error: null or Error('message')
                     *  content: the server answer with user keys list
                     */
                    deleteUserKey: function deleteUserKey(key, callback) {
                        var indexObj = this;
                        return this.as._jsonRequest({
                            method: 'DELETE',
                            url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys/' + key,
                            hostType: 'write',
                            callback: callback
                        });
                    },
                    /*
                     * Add a new API key to this index
                     *
                     * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
                     *   can contains the following values:
                     *     - search: allow to search (https and http)
                     *     - addObject: allows to add/update an object in the index (https only)
                     *     - deleteObject : allows to delete an existing object (https only)
                     *     - deleteIndex : allows to delete index content (https only)
                     *     - settings : allows to get index settings (https only)
                     *     - editSettings : allows to change index settings (https only)
                     * @param {Object} [params] - Optionnal parameters to set for the key
                     * @param {number} params.validity - Number of seconds after which the key will
                     * be automatically removed (0 means no time limit for this key)
                     * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
                     * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
                     * @param {string} params.description - A description for your key
                     * @param {string[]} params.referers - A list of authorized referers
                     * @param {Object} params.queryParameters - Force the key to use specific query parameters
                     * @param {Function} callback - The result callback called with two arguments
                     *   error: null or Error('message')
                     *   content: the server answer with user keys list
                     * @return {Promise|undefined} Returns a promise if no callback given
                     * @example
                     * index.addUserKey(['search'], {
                     *   validity: 300,
                     *   maxQueriesPerIPPerHour: 2000,
                     *   maxHitsPerQuery: 3,
                     *   description: 'Eat three fruits',
                     *   referers: ['*.algolia.com'],
                     *   queryParameters: {
                     *     tagFilters: ['public'],
                     *   }
                     * })
                     * @see {@link https://www.algolia.com/doc/rest_api#AddIndexKey|Algolia REST API Documentation}
                     */
                    addUserKey: function addUserKey(acls, params, callback) {
                        if (arguments.length === 1 || typeof params === 'function') {
                            callback = params;
                            params = null;
                        }

                        var postObj = {
                            acl: acls
                        };

                        if (params) {
                            postObj.validity = params.validity;
                            postObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
                            postObj.maxHitsPerQuery = params.maxHitsPerQuery;
                            postObj.description = params.description;

                            if (params.queryParameters) {
                                postObj.queryParameters = this.as._getSearchParams(params.queryParameters, '');
                            }

                            postObj.referers = params.referers;
                        }

                        return this.as._jsonRequest({
                            method: 'POST',
                            url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/keys',
                            body: postObj,
                            hostType: 'write',
                            callback: callback
                        });
                    },

                    /**
                     * Add an existing user key associated to this index
                     * @deprecated use index.addUserKey()
                     */
                    addUserKeyWithValidity: deprecate(function deprecatedAddUserKeyWithValidity(acls, params, callback) {
                        return this.addUserKey(acls, params, callback);
                    }, deprecatedMessage('index.addUserKeyWithValidity()', 'index.addUserKey()')),

                    /**
                     * Update an existing API key of this index
                     * @param {string} key - The key to update
                     * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
                     *   can contains the following values:
                     *     - search: allow to search (https and http)
                     *     - addObject: allows to add/update an object in the index (https only)
                     *     - deleteObject : allows to delete an existing object (https only)
                     *     - deleteIndex : allows to delete index content (https only)
                     *     - settings : allows to get index settings (https only)
                     *     - editSettings : allows to change index settings (https only)
                     * @param {Object} [params] - Optionnal parameters to set for the key
                     * @param {number} params.validity - Number of seconds after which the key will
                     * be automatically removed (0 means no time limit for this key)
                     * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
                     * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
                     * @param {string} params.description - A description for your key
                     * @param {string[]} params.referers - A list of authorized referers
                     * @param {Object} params.queryParameters - Force the key to use specific query parameters
                     * @param {Function} callback - The result callback called with two arguments
                     *   error: null or Error('message')
                     *   content: the server answer with user keys list
                     * @return {Promise|undefined} Returns a promise if no callback given
                     * @example
                     * index.updateUserKey('APIKEY', ['search'], {
                    *   validity: 300,
                    *   maxQueriesPerIPPerHour: 2000,
                    *   maxHitsPerQuery: 3,
                    *   description: 'Eat three fruits',
                    *   referers: ['*.algolia.com'],
                    *   queryParameters: {
                    *     tagFilters: ['public'],
                    *   }
                    * })
                     * @see {@link https://www.algolia.com/doc/rest_api#UpdateIndexKey|Algolia REST API Documentation}
                     */
                    updateUserKey: function updateUserKey(key, acls, params, callback) {
                        if (arguments.length === 2 || typeof params === 'function') {
                            callback = params;
                            params = null;
                        }

                        var putObj = {
                            acl: acls
                        };

                        if (params) {
                            putObj.validity = params.validity;
                            putObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
                            putObj.maxHitsPerQuery = params.maxHitsPerQuery;
                            putObj.description = params.description;

                            if (params.queryParameters) {
                                putObj.queryParameters = this.as._getSearchParams(params.queryParameters, '');
                            }

                            putObj.referers = params.referers;
                        }

                        return this.as._jsonRequest({
                            method: 'PUT',
                            url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/keys/' + key,
                            body: putObj,
                            hostType: 'write',
                            callback: callback
                        });
                    },

                    _search: function _search(params, callback) {
                        return this.as._jsonRequest({
                            cache: this.cache,
                            method: 'POST',
                            url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
                            body: { params: params },
                            hostType: 'read',
                            fallback: {
                                method: 'GET',
                                url: '/1/indexes/' + encodeURIComponent(this.indexName),
                                body: { params: params }
                            },
                            callback: callback
                        });
                    },

                    as: null,
                    indexName: null,
                    typeAheadArgs: null,
                    typeAheadValueOption: null
                };

                // extracted from https://github.com/component/map/blob/master/index.js
                // without the crazy toFunction thing
                function map(arr, fn) {
                    var ret = [];
                    for (var i = 0; i < arr.length; ++i) {
                        ret.push(fn(arr[i], i));
                    }
                    return ret;
                }

                function prepareHost(protocol) {
                    return function prepare(host) {
                        return protocol + '//' + host.toLowerCase();
                    };
                }

                function notImplemented() {
                    var message = 'Not implemented in this environment.\n' + 'If you feel this is a mistake, write to support@algolia.com';

                    throw new errors.AlgoliaSearchError(message);
                }

                function deprecatedMessage(previousUsage, newUsage) {
                    var githubAnchorLink = previousUsage.toLowerCase().replace('.', '').replace('()', '');

                    return 'algoliasearch: `' + previousUsage + '` was replaced by `' + newUsage + '`. Please see https://github.com/algolia/algoliasearch-client-js/wiki/Deprecated#' + githubAnchorLink;
                }

                // Parse cloud does not supports setTimeout
                // We do not store a setTimeout reference in the client everytime
                // We only fallback to a fake setTimeout when not available
                // setTimeout cannot be override globally sadly
                function exitPromise(fn, _setTimeout) {
                    _setTimeout(fn, 0);
                }

                function deprecate(fn, message) {
                    var warned = false;

                    function deprecated() {
                        if (!warned) {
                            /* eslint no-console:0 */
                            console.log(message);
                            warned = true;
                        }

                        return fn.apply(this, arguments);
                    }

                    return deprecated;
                }

                // Prototype.js < 1.7, a widely used library, defines a weird
                // Array.prototype.toJSON function that will fail to stringify our content
                // appropriately
                // refs:
                //   - https://groups.google.com/forum/#!topic/prototype-core/E-SAVvV_V9Q
                //   - https://github.com/sstephenson/prototype/commit/038a2985a70593c1a86c230fadbdfe2e4898a48c
                //   - http://stackoverflow.com/a/3148441/147079
                function safeJSONStringify(obj) {
                    /* eslint no-extend-native:0 */

                    if (Array.prototype.toJSON === undefined) {
                        return JSON.stringify(obj);
                    }

                    var toJSON = Array.prototype.toJSON;
                    delete Array.prototype.toJSON;
                    var out = JSON.stringify(obj);
                    Array.prototype.toJSON = toJSON;

                    return out;
                }
            }).call(this, require(2));
        }, { "11": 11, "2": 2, "44": 44, "47": 47, "57": 57, "6": 6, "61": 61, "66": 66 }], 61: [function (require, module, exports) {
            'use strict';

            // This is the object returned by the `index.browseAll()` method

            module.exports = IndexBrowser;

            var inherits = require(10);
            var EventEmitter = require(1).EventEmitter;

            function IndexBrowser() {}

            inherits(IndexBrowser, EventEmitter);

            IndexBrowser.prototype.stop = function () {
                this._stopped = true;
                this._clean();
            };

            IndexBrowser.prototype._end = function () {
                this.emit('end');
                this._clean();
            };

            IndexBrowser.prototype._error = function (err) {
                this.emit('error', err);
                this._clean();
            };

            IndexBrowser.prototype._result = function (content) {
                this.emit('result', content);
            };

            IndexBrowser.prototype._clean = function () {
                this.removeAllListeners('stop');
                this.removeAllListeners('end');
                this.removeAllListeners('error');
                this.removeAllListeners('result');
            };
        }, { "1": 1, "10": 10 }], 62: [function (require, module, exports) {
            'use strict';

            // This is the standalone browser build entry point
            // Browser implementation of the Algolia Search JavaScript client,
            // using XMLHttpRequest, XDomainRequest and JSONP as fallback

            module.exports = algoliasearch;

            var inherits = require(10);
            var Promise = window.Promise || require(9).Promise;

            var AlgoliaSearch = require(60);
            var errors = require(66);
            var inlineHeaders = require(64);
            var jsonpRequest = require(65);

            function algoliasearch(applicationID, apiKey, opts) {
                var cloneDeep = require(45);

                var getDocumentProtocol = require(63);

                opts = cloneDeep(opts || {});

                if (opts.protocol === undefined) {
                    opts.protocol = getDocumentProtocol();
                }

                opts._ua = opts._ua || algoliasearch.ua;

                return new AlgoliaSearchBrowser(applicationID, apiKey, opts);
            }

            algoliasearch.version = require(67);
            algoliasearch.ua = 'Algolia for vanilla JavaScript ' + algoliasearch.version;

            // we expose into window no matter how we are used, this will allow
            // us to easily debug any website running algolia
            window.__algolia = {
                debug: require(6),
                algoliasearch: algoliasearch
            };

            var support = {
                hasXMLHttpRequest: 'XMLHttpRequest' in window,
                hasXDomainRequest: 'XDomainRequest' in window,
                cors: 'withCredentials' in new XMLHttpRequest(),
                timeout: 'timeout' in new XMLHttpRequest()
            };

            function AlgoliaSearchBrowser() {
                // call AlgoliaSearch constructor
                AlgoliaSearch.apply(this, arguments);
            }

            inherits(AlgoliaSearchBrowser, AlgoliaSearch);

            AlgoliaSearchBrowser.prototype._request = function request(url, opts) {
                return new Promise(function wrapRequest(resolve, reject) {
                    // no cors or XDomainRequest, no request
                    if (!support.cors && !support.hasXDomainRequest) {
                        // very old browser, not supported
                        reject(new errors.Network('CORS not supported'));
                        return;
                    }

                    url = inlineHeaders(url, opts.headers);

                    var body = opts.body;
                    var req = support.cors ? new XMLHttpRequest() : new XDomainRequest();
                    var ontimeout;
                    var timedOut;

                    // do not rely on default XHR async flag, as some analytics code like hotjar
                    // breaks it and set it to false by default
                    if (req instanceof XMLHttpRequest) {
                        req.open(opts.method, url, true);
                    } else {
                        req.open(opts.method, url);
                    }

                    if (support.cors) {
                        if (body) {
                            if (opts.method === 'POST') {
                                // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests
                                req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                            } else {
                                req.setRequestHeader('content-type', 'application/json');
                            }
                        }
                        req.setRequestHeader('accept', 'application/json');
                    }

                    // we set an empty onprogress listener
                    // so that XDomainRequest on IE9 is not aborted
                    // refs:
                    //  - https://github.com/algolia/algoliasearch-client-js/issues/76
                    //  - https://social.msdn.microsoft.com/Forums/ie/en-US/30ef3add-767c-4436-b8a9-f1ca19b4812e/ie9-rtm-xdomainrequest-issued-requests-may-abort-if-all-event-handlers-not-specified?forum=iewebdevelopment
                    req.onprogress = function noop() {};

                    req.onload = load;
                    req.onerror = error;

                    if (support.timeout) {
                        // .timeout supported by both XHR and XDR,
                        // we do receive timeout event, tested
                        req.timeout = opts.timeout;

                        req.ontimeout = timeout;
                    } else {
                        ontimeout = setTimeout(timeout, opts.timeout);
                    }

                    req.send(body);

                    // event object not received in IE8, at least
                    // but we do not use it, still important to note
                    function load() /*event*/{
                        // When browser does not supports req.timeout, we can
                        // have both a load and timeout event, since handled by a dumb setTimeout
                        if (timedOut) {
                            return;
                        }

                        if (!support.timeout) {
                            clearTimeout(ontimeout);
                        }

                        var out;

                        try {
                            out = {
                                body: JSON.parse(req.responseText),
                                statusCode: req.status,
                                // XDomainRequest does not have any response headers
                                headers: req.getAllResponseHeaders && req.getAllResponseHeaders() || {}
                            };
                        } catch (e) {
                            out = new errors.UnparsableJSON({
                                more: req.responseText
                            });
                        }

                        if (out instanceof errors.UnparsableJSON) {
                            reject(out);
                        } else {
                            resolve(out);
                        }
                    }

                    function error(event) {
                        if (timedOut) {
                            return;
                        }

                        if (!support.timeout) {
                            clearTimeout(ontimeout);
                        }

                        // error event is trigerred both with XDR/XHR on:
                        //   - DNS error
                        //   - unallowed cross domain request
                        reject(new errors.Network({
                            more: event
                        }));
                    }

                    function timeout() {
                        if (!support.timeout) {
                            timedOut = true;
                            req.abort();
                        }

                        reject(new errors.RequestTimeout());
                    }
                });
            };

            AlgoliaSearchBrowser.prototype._request.fallback = function requestFallback(url, opts) {
                url = inlineHeaders(url, opts.headers);

                return new Promise(function wrapJsonpRequest(resolve, reject) {
                    jsonpRequest(url, opts, function jsonpRequestDone(err, content) {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve(content);
                    });
                });
            };

            AlgoliaSearchBrowser.prototype._promise = {
                reject: function rejectPromise(val) {
                    return Promise.reject(val);
                },
                resolve: function resolvePromise(val) {
                    return Promise.resolve(val);
                },
                delay: function delayPromise(ms) {
                    return new Promise(function resolveOnTimeout(resolve /*, reject*/) {
                        setTimeout(resolve, ms);
                    });
                }
            };
        }, { "10": 10, "45": 45, "6": 6, "60": 60, "63": 63, "64": 64, "65": 65, "66": 66, "67": 67, "9": 9 }], 63: [function (require, module, exports) {
            'use strict';

            module.exports = getDocumentProtocol;

            function getDocumentProtocol() {
                var protocol = window.document.location.protocol;

                // when in `file:` mode (local html file), default to `http:`
                if (protocol !== 'http:' && protocol !== 'https:') {
                    protocol = 'http:';
                }

                return protocol;
            }
        }, {}], 64: [function (require, module, exports) {
            'use strict';

            module.exports = inlineHeaders;

            var querystring = require(5);

            function inlineHeaders(url, headers) {
                if (/\?/.test(url)) {
                    url += '&';
                } else {
                    url += '?';
                }

                return url + querystring.encode(headers);
            }
        }, { "5": 5 }], 65: [function (require, module, exports) {
            'use strict';

            module.exports = jsonpRequest;

            var errors = require(66);

            var JSONPCounter = 0;

            function jsonpRequest(url, opts, cb) {
                if (opts.method !== 'GET') {
                    cb(new Error('Method ' + opts.method + ' ' + url + ' is not supported by JSONP.'));
                    return;
                }

                opts.debug('JSONP: start');

                var cbCalled = false;
                var timedOut = false;

                JSONPCounter += 1;
                var head = document.getElementsByTagName('head')[0];
                var script = document.createElement('script');
                var cbName = 'algoliaJSONP_' + JSONPCounter;
                var done = false;

                window[cbName] = function (data) {
                    try {
                        delete window[cbName];
                    } catch (e) {
                        window[cbName] = undefined;
                    }

                    if (timedOut) {
                        return;
                    }

                    cbCalled = true;

                    clean();

                    cb(null, {
                        body: data /*,
                                   // We do not send the statusCode, there's no statusCode in JSONP, it will be
                                   // computed using data.status && data.message like with XDR
                                   statusCode*/
                    });
                };

                // add callback by hand
                url += '&callback=' + cbName;

                // add body params manually
                if (opts.jsonBody && opts.jsonBody.params) {
                    url += '&' + opts.jsonBody.params;
                }

                var ontimeout = setTimeout(timeout, opts.timeout);

                // script onreadystatechange needed only for
                // <= IE8
                // https://github.com/angular/angular.js/issues/4523
                script.onreadystatechange = readystatechange;
                script.onload = success;
                script.onerror = error;

                script.async = true;
                script.defer = true;
                script.src = url;
                head.appendChild(script);

                function success() {
                    opts.debug('JSONP: success');

                    if (done || timedOut) {
                        return;
                    }

                    done = true;

                    // script loaded but did not call the fn => script loading error
                    if (!cbCalled) {
                        opts.debug('JSONP: Fail. Script loaded but did not call the callback');
                        clean();
                        cb(new errors.JSONPScriptFail());
                    }
                }

                function readystatechange() {
                    if (this.readyState === 'loaded' || this.readyState === 'complete') {
                        success();
                    }
                }

                function clean() {
                    clearTimeout(ontimeout);
                    script.onload = null;
                    script.onreadystatechange = null;
                    script.onerror = null;
                    head.removeChild(script);

                    try {
                        delete window[cbName];
                        delete window[cbName + '_loaded'];
                    } catch (e) {
                        window[cbName] = null;
                        window[cbName + '_loaded'] = null;
                    }
                }

                function timeout() {
                    opts.debug('JSONP: Script timeout');

                    timedOut = true;
                    clean();
                    cb(new errors.RequestTimeout());
                }

                function error() {
                    opts.debug('JSONP: Script error');

                    if (done || timedOut) {
                        return;
                    }

                    clean();
                    cb(new errors.JSONPScriptError());
                }
            }
        }, { "66": 66 }], 66: [function (require, module, exports) {
            'use strict';

            // This file hosts our error definitions
            // We use custom error "types" so that we can act on them when we need it
            // e.g.: if error instanceof errors.UnparsableJSON then..

            var inherits = require(10);

            function AlgoliaSearchError(message, extraProperties) {
                var forEach = require(11);

                var error = this;

                // try to get a stacktrace
                if (typeof Error.captureStackTrace === 'function') {
                    Error.captureStackTrace(this, this.constructor);
                } else {
                    error.stack = new Error().stack || 'Cannot get a stacktrace, browser is too old';
                }

                this.name = this.constructor.name;
                this.message = message || 'Unknown error';

                if (extraProperties) {
                    forEach(extraProperties, function addToErrorObject(value, key) {
                        error[key] = value;
                    });
                }
            }

            inherits(AlgoliaSearchError, Error);

            function createCustomError(name, message) {
                function AlgoliaSearchCustomError() {
                    var args = Array.prototype.slice.call(arguments, 0);

                    // custom message not set, use default
                    if (typeof args[0] !== 'string') {
                        args.unshift(message);
                    }

                    AlgoliaSearchError.apply(this, args);
                    this.name = 'AlgoliaSearch' + name + 'Error';
                }

                inherits(AlgoliaSearchCustomError, AlgoliaSearchError);

                return AlgoliaSearchCustomError;
            }

            // late exports to let various fn defs and inherits take place
            module.exports = {
                AlgoliaSearchError: AlgoliaSearchError,
                UnparsableJSON: createCustomError('UnparsableJSON', 'Could not parse the incoming response as JSON, see err.more for details'),
                RequestTimeout: createCustomError('RequestTimeout', 'Request timedout before getting a response'),
                Network: createCustomError('Network', 'Network issue, see err.more for details'),
                JSONPScriptFail: createCustomError('JSONPScriptFail', '<script> was loaded but did not call our provided callback'),
                JSONPScriptError: createCustomError('JSONPScriptError', '<script> unable to load due to an `error` event on it'),
                Unknown: createCustomError('Unknown', 'Unknown error occured')
            };
        }, { "10": 10, "11": 11 }], 67: [function (require, module, exports) {
            module.exports = "3.7.7";
        }, {}] }, {}, [62])(62);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./resources/assets/js/vendor/bootstrap.js":
/***/ (function(module, exports) {

/*!
 * Bootstrap v3.3.2 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=9980c2379b76bb6cbd79)
 * Config saved to config.json and https://gist.github.com/9980c2379b76bb6cbd79
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery');
}
+function ($) {
  'use strict';

  var version = $.fn.jquery.split(' ')[0].split('.');
  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher');
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.2
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop';
  var toggle = '[data-toggle="dropdown"]';
  var Dropdown = function Dropdown(element) {
    $(element).on('click.bs.dropdown', this.toggle);
  };

  Dropdown.VERSION = '3.3.2';

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this);

    if ($this.is('.disabled, :disabled')) return;

    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');

    clearMenus();

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus);
      }

      var relatedTarget = { relatedTarget: this };
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));

      if (e.isDefaultPrevented()) return;

      $this.trigger('focus').attr('aria-expanded', 'true');

      $parent.toggleClass('open').trigger('shown.bs.dropdown', relatedTarget);
    }

    return false;
  };

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;

    var $this = $(this);

    e.preventDefault();
    e.stopPropagation();

    if ($this.is('.disabled, :disabled')) return;

    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus');
      return $this.trigger('click');
    }

    var desc = ' li:not(.divider):visible a';
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc);

    if (!$items.length) return;

    var index = $items.index(e.target);

    if (e.which == 38 && index > 0) index--; // up
    if (e.which == 40 && index < $items.length - 1) index++; // down
    if (!~index) index = 0;

    $items.eq(index).trigger('focus');
  };

  function clearMenus(e) {
    if (e && e.which === 3) return;
    $(backdrop).remove();
    $(toggle).each(function () {
      var $this = $(this);
      var $parent = getParent($this);
      var relatedTarget = { relatedTarget: this };

      if (!$parent.hasClass('open')) return;

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));

      if (e.isDefaultPrevented()) return;

      $this.attr('aria-expanded', 'false');
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget);
    });
  }

  function getParent($this) {
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    var $parent = selector && $(selector);

    return $parent && $parent.length ? $parent : $this.parent();
  }

  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.dropdown');

      if (!data) $this.data('bs.dropdown', data = new Dropdown(this));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.dropdown;

  $.fn.dropdown = Plugin;
  $.fn.dropdown.Constructor = Dropdown;

  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old;
    return this;
  };

  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
    e.stopPropagation();
  }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown);
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.2
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap');

    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] };
      }
    }

    return false; // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false;
    var $el = this;
    $(this).one('bsTransitionEnd', function () {
      called = true;
    });
    var callback = function callback() {
      if (!called) $($el).trigger($.support.transition.end);
    };
    setTimeout(callback, duration);
    return this;
  };

  $(function () {
    $.support.transition = transitionEnd();

    if (!$.support.transition) return;

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function handle(e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
      }
    };
  });
}(jQuery);

/***/ }),

/***/ "./resources/assets/js/vendor/hogan.js":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var Hogan = {};

(function (Hogan) {
    Hogan.Template = function (codeObj, text, compiler, options) {
        codeObj = codeObj || {};
        this.r = codeObj.code || this.r;
        this.c = compiler;
        this.options = options || {};
        this.text = text || '';
        this.partials = codeObj.partials || {};
        this.subs = codeObj.subs || {};
        this.buf = '';
    };

    Hogan.Template.prototype = {
        // render: replaced by generated code.
        r: function r(context, partials, indent) {
            return '';
        },

        // variable escaping
        v: hoganEscape,

        // triple stache
        t: coerceToString,

        render: function render(context, partials, indent) {
            return this.ri([context], partials || {}, indent);
        },

        // render internal -- a hook for overrides that catches partials too
        ri: function ri(context, partials, indent) {
            return this.r(context, partials, indent);
        },

        // ensurePartial
        ep: function ep(symbol, partials) {
            var partial = this.partials[symbol];

            // check to see that if we've instantiated this partial before
            var template = partials[partial.name];
            if (partial.instance && partial.base == template) {
                return partial.instance;
            }

            if (typeof template == 'string') {
                if (!this.c) {
                    throw new Error("No compiler available.");
                }
                template = this.c.compile(template, this.options);
            }

            if (!template) {
                return null;
            }

            // We use this to check whether the partials dictionary has changed
            this.partials[symbol].base = template;

            if (partial.subs) {
                // Make sure we consider parent template now
                if (!partials.stackText) partials.stackText = {};
                for (key in partial.subs) {
                    if (!partials.stackText[key]) {
                        partials.stackText[key] = this.activeSub !== undefined && partials.stackText[this.activeSub] ? partials.stackText[this.activeSub] : this.text;
                    }
                }
                template = createSpecializedPartial(template, partial.subs, partial.partials, this.stackSubs, this.stackPartials, partials.stackText);
            }
            this.partials[symbol].instance = template;

            return template;
        },

        // tries to find a partial in the current scope and render it
        rp: function rp(symbol, context, partials, indent) {
            var partial = this.ep(symbol, partials);
            if (!partial) {
                return '';
            }

            return partial.ri(context, partials, indent);
        },

        // render a section
        rs: function rs(context, partials, section) {
            var tail = context[context.length - 1];

            if (!isArray(tail)) {
                section(context, partials, this);
                return;
            }

            for (var i = 0; i < tail.length; i++) {
                context.push(tail[i]);
                section(context, partials, this);
                context.pop();
            }
        },

        // maybe start a section
        s: function s(val, ctx, partials, inverted, start, end, tags) {
            var pass;

            if (isArray(val) && val.length === 0) {
                return false;
            }

            if (typeof val == 'function') {
                val = this.ms(val, ctx, partials, inverted, start, end, tags);
            }

            pass = !!val;

            if (!inverted && pass && ctx) {
                ctx.push((typeof val === 'undefined' ? 'undefined' : _typeof(val)) == 'object' ? val : ctx[ctx.length - 1]);
            }

            return pass;
        },

        // find values with dotted names
        d: function d(key, ctx, partials, returnFound) {
            var found,
                names = key.split('.'),
                val = this.f(names[0], ctx, partials, returnFound),
                doModelGet = this.options.modelGet,
                cx = null;

            if (key === '.' && isArray(ctx[ctx.length - 2])) {
                val = ctx[ctx.length - 1];
            } else {
                for (var i = 1; i < names.length; i++) {
                    found = findInScope(names[i], val, doModelGet);
                    if (found !== undefined) {
                        cx = val;
                        val = found;
                    } else {
                        val = '';
                    }
                }
            }

            if (returnFound && !val) {
                return false;
            }

            if (!returnFound && typeof val == 'function') {
                ctx.push(cx);
                val = this.mv(val, ctx, partials);
                ctx.pop();
            }

            return val;
        },

        // find values with normal names
        f: function f(key, ctx, partials, returnFound) {
            var val = false,
                v = null,
                found = false,
                doModelGet = this.options.modelGet;

            for (var i = ctx.length - 1; i >= 0; i--) {
                v = ctx[i];
                val = findInScope(key, v, doModelGet);
                if (val !== undefined) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                return returnFound ? false : "";
            }

            if (!returnFound && typeof val == 'function') {
                val = this.mv(val, ctx, partials);
            }

            return val;
        },

        // higher order templates
        ls: function ls(func, cx, partials, text, tags) {
            var oldTags = this.options.delimiters;

            this.options.delimiters = tags;
            this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
            this.options.delimiters = oldTags;

            return false;
        },

        // compile text
        ct: function ct(text, cx, partials) {
            if (this.options.disableLambda) {
                throw new Error('Lambda features disabled.');
            }
            return this.c.compile(text, this.options).render(cx, partials);
        },

        // template result buffering
        b: function b(s) {
            this.buf += s;
        },

        fl: function fl() {
            var r = this.buf;this.buf = '';return r;
        },

        // method replace section
        ms: function ms(func, ctx, partials, inverted, start, end, tags) {
            var textSource,
                cx = ctx[ctx.length - 1],
                result = func.call(cx);

            if (typeof result == 'function') {
                if (inverted) {
                    return true;
                } else {
                    textSource = this.activeSub && this.subsText && this.subsText[this.activeSub] ? this.subsText[this.activeSub] : this.text;
                    return this.ls(result, cx, partials, textSource.substring(start, end), tags);
                }
            }

            return result;
        },

        // method replace variable
        mv: function mv(func, ctx, partials) {
            var cx = ctx[ctx.length - 1];
            var result = func.call(cx);

            if (typeof result == 'function') {
                return this.ct(coerceToString(result.call(cx)), cx, partials);
            }

            return result;
        },

        sub: function sub(name, context, partials, indent) {
            var f = this.subs[name];
            if (f) {
                this.activeSub = name;
                f(context, partials, this, indent);
                this.activeSub = false;
            }
        }

    };

    //Find a key in an object
    function findInScope(key, scope, doModelGet) {
        var val;

        if (scope && (typeof scope === 'undefined' ? 'undefined' : _typeof(scope)) == 'object') {

            if (scope[key] !== undefined) {
                val = scope[key];

                // try lookup with get for backbone or similar model data
            } else if (doModelGet && scope.get && typeof scope.get == 'function') {
                val = scope.get(key);
            }
        }

        return val;
    }

    function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
        function PartialTemplate() {};
        PartialTemplate.prototype = instance;
        function Substitutions() {};
        Substitutions.prototype = instance.subs;
        var key;
        var partial = new PartialTemplate();
        partial.subs = new Substitutions();
        partial.subsText = {}; //hehe. substext.
        partial.buf = '';

        stackSubs = stackSubs || {};
        partial.stackSubs = stackSubs;
        partial.subsText = stackText;
        for (key in subs) {
            if (!stackSubs[key]) stackSubs[key] = subs[key];
        }
        for (key in stackSubs) {
            partial.subs[key] = stackSubs[key];
        }

        stackPartials = stackPartials || {};
        partial.stackPartials = stackPartials;
        for (key in partials) {
            if (!stackPartials[key]) stackPartials[key] = partials[key];
        }
        for (key in stackPartials) {
            partial.partials[key] = stackPartials[key];
        }

        return partial;
    }

    var rAmp = /&/g,
        rLt = /</g,
        rGt = />/g,
        rApos = /\'/g,
        rQuot = /\"/g,
        hChars = /[&<>\"\']/;

    function coerceToString(val) {
        return String(val === null || val === undefined ? '' : val);
    }

    function hoganEscape(str) {
        str = coerceToString(str);
        return hChars.test(str) ? str.replace(rAmp, '&amp;').replace(rLt, '&lt;').replace(rGt, '&gt;').replace(rApos, '&#39;').replace(rQuot, '&quot;') : str;
    }

    var isArray = Array.isArray || function (a) {
        return Object.prototype.toString.call(a) === '[object Array]';
    };
})( true ? exports : Hogan);

(function (Hogan) {
    // Setup regex  assignments
    // remove whitespace according to Mustache spec
    var rIsWhitespace = /\S/,
        rQuot = /\"/g,
        rNewline = /\n/g,
        rCr = /\r/g,
        rSlash = /\\/g,
        rLineSep = /\u2028/,
        rParagraphSep = /\u2029/;

    Hogan.tags = {
        '#': 1, '^': 2, '<': 3, '$': 4,
        '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
        '{': 10, '&': 11, '_t': 12
    };

    Hogan.scan = function scan(text, delimiters) {
        var len = text.length,
            IN_TEXT = 0,
            IN_TAG_TYPE = 1,
            IN_TAG = 2,
            state = IN_TEXT,
            tagType = null,
            tag = null,
            buf = '',
            tokens = [],
            seenTag = false,
            i = 0,
            lineStart = 0,
            otag = '{{',
            ctag = '}}';

        function addBuf() {
            if (buf.length > 0) {
                tokens.push({ tag: '_t', text: new String(buf) });
                buf = '';
            }
        }

        function lineIsWhitespace() {
            var isAllWhitespace = true;
            for (var j = lineStart; j < tokens.length; j++) {
                isAllWhitespace = Hogan.tags[tokens[j].tag] < Hogan.tags['_v'] || tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null;
                if (!isAllWhitespace) {
                    return false;
                }
            }

            return isAllWhitespace;
        }

        function filterLine(haveSeenTag, noNewLine) {
            addBuf();

            if (haveSeenTag && lineIsWhitespace()) {
                for (var j = lineStart, next; j < tokens.length; j++) {
                    if (tokens[j].text) {
                        if ((next = tokens[j + 1]) && next.tag == '>') {
                            // set indent to token value
                            next.indent = tokens[j].text.toString();
                        }
                        tokens.splice(j, 1);
                    }
                }
            } else if (!noNewLine) {
                tokens.push({ tag: '\n' });
            }

            seenTag = false;
            lineStart = tokens.length;
        }

        function changeDelimiters(text, index) {
            var close = '=' + ctag,
                closeIndex = text.indexOf(close, index),
                delimiters = trim(text.substring(text.indexOf('=', index) + 1, closeIndex)).split(' ');

            otag = delimiters[0];
            ctag = delimiters[delimiters.length - 1];

            return closeIndex + close.length - 1;
        }

        if (delimiters) {
            delimiters = delimiters.split(' ');
            otag = delimiters[0];
            ctag = delimiters[1];
        }

        for (i = 0; i < len; i++) {
            if (state == IN_TEXT) {
                if (tagChange(otag, text, i)) {
                    --i;
                    addBuf();
                    state = IN_TAG_TYPE;
                } else {
                    if (text.charAt(i) == '\n') {
                        filterLine(seenTag);
                    } else {
                        buf += text.charAt(i);
                    }
                }
            } else if (state == IN_TAG_TYPE) {
                i += otag.length - 1;
                tag = Hogan.tags[text.charAt(i + 1)];
                tagType = tag ? text.charAt(i + 1) : '_v';
                if (tagType == '=') {
                    i = changeDelimiters(text, i);
                    state = IN_TEXT;
                } else {
                    if (tag) {
                        i++;
                    }
                    state = IN_TAG;
                }
                seenTag = i;
            } else {
                if (tagChange(ctag, text, i)) {
                    tokens.push({ tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                        i: tagType == '/' ? seenTag - otag.length : i + ctag.length });
                    buf = '';
                    i += ctag.length - 1;
                    state = IN_TEXT;
                    if (tagType == '{') {
                        if (ctag == '}}') {
                            i++;
                        } else {
                            cleanTripleStache(tokens[tokens.length - 1]);
                        }
                    }
                } else {
                    buf += text.charAt(i);
                }
            }
        }

        filterLine(seenTag, true);

        return tokens;
    };

    function cleanTripleStache(token) {
        if (token.n.substr(token.n.length - 1) === '}') {
            token.n = token.n.substring(0, token.n.length - 1);
        }
    }

    function trim(s) {
        if (s.trim) {
            return s.trim();
        }

        return s.replace(/^\s*|\s*$/g, '');
    }

    function tagChange(tag, text, index) {
        if (text.charAt(index) != tag.charAt(0)) {
            return false;
        }

        for (var i = 1, l = tag.length; i < l; i++) {
            if (text.charAt(index + i) != tag.charAt(i)) {
                return false;
            }
        }

        return true;
    }

    // the tags allowed inside super templates
    var allowedInSuper = { '_t': true, '\n': true, '$': true, '/': true };

    function buildTree(tokens, kind, stack, customTags) {
        var instructions = [],
            opener = null,
            tail = null,
            token = null;

        tail = stack[stack.length - 1];

        while (tokens.length > 0) {
            token = tokens.shift();

            if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
                throw new Error('Illegal content in < super tag.');
            }

            if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
                stack.push(token);
                token.nodes = buildTree(tokens, token.tag, stack, customTags);
            } else if (token.tag == '/') {
                if (stack.length === 0) {
                    throw new Error('Closing tag without opener: /' + token.n);
                }
                opener = stack.pop();
                if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
                    throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
                }
                opener.end = token.i;
                return instructions;
            } else if (token.tag == '\n') {
                token.last = tokens.length == 0 || tokens[0].tag == '\n';
            }

            instructions.push(token);
        }

        if (stack.length > 0) {
            throw new Error('missing closing tag: ' + stack.pop().n);
        }

        return instructions;
    }

    function isOpener(token, tags) {
        for (var i = 0, l = tags.length; i < l; i++) {
            if (tags[i].o == token.n) {
                token.tag = '#';
                return true;
            }
        }
    }

    function isCloser(close, open, tags) {
        for (var i = 0, l = tags.length; i < l; i++) {
            if (tags[i].c == close && tags[i].o == open) {
                return true;
            }
        }
    }

    function stringifySubstitutions(obj) {
        var items = [];
        for (var key in obj) {
            items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
        }
        return "{ " + items.join(",") + " }";
    }

    function stringifyPartials(codeObj) {
        var partials = [];
        for (var key in codeObj.partials) {
            partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
        }
        return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
    }

    Hogan.stringify = function (codeObj, text, options) {
        return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) + "}";
    };

    var serialNo = 0;
    Hogan.generate = function (tree, text, options) {
        serialNo = 0;
        var context = { code: '', subs: {}, partials: {} };
        Hogan.walk(tree, context);

        if (options.asString) {
            return this.stringify(context, text, options);
        }

        return this.makeTemplate(context, text, options);
    };

    Hogan.wrapMain = function (code) {
        return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
    };

    Hogan.template = Hogan.Template;

    Hogan.makeTemplate = function (codeObj, text, options) {
        var template = this.makePartials(codeObj);
        template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
        return new this.template(template, text, this, options);
    };

    Hogan.makePartials = function (codeObj) {
        var key,
            template = { subs: {}, partials: codeObj.partials, name: codeObj.name };
        for (key in template.partials) {
            template.partials[key] = this.makePartials(template.partials[key]);
        }
        for (key in codeObj.subs) {
            template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
        }
        return template;
    };

    function esc(s) {
        return s.replace(rSlash, '\\\\').replace(rQuot, '\\\"').replace(rNewline, '\\n').replace(rCr, '\\r').replace(rLineSep, '\\u2028').replace(rParagraphSep, '\\u2029');
    }

    function chooseMethod(s) {
        return ~s.indexOf('.') ? 'd' : 'f';
    }

    function createPartial(node, context) {
        var prefix = "<" + (context.prefix || "");
        var sym = prefix + node.n + serialNo++;
        context.partials[sym] = { name: node.n, partials: {} };
        context.code += 't.b(t.rp("' + esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
        return sym;
    }

    Hogan.codegen = {
        '#': function _(node, context) {
            context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' + 'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' + 't.rs(c,p,' + 'function(c,p,t){';
            Hogan.walk(node.nodes, context);
            context.code += '});c.pop();}';
        },

        '^': function _(node, context) {
            context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
            Hogan.walk(node.nodes, context);
            context.code += '};';
        },

        '>': createPartial,
        '<': function _(node, context) {
            var ctx = { partials: {}, code: '', subs: {}, inPartial: true };
            Hogan.walk(node.nodes, ctx);
            var template = context.partials[createPartial(node, context)];
            template.subs = ctx.subs;
            template.partials = ctx.partials;
        },

        '$': function $(node, context) {
            var ctx = { subs: {}, code: '', partials: context.partials, prefix: node.n };
            Hogan.walk(node.nodes, ctx);
            context.subs[node.n] = ctx.code;
            if (!context.inPartial) {
                context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
            }
        },

        '\n': function _(node, context) {
            context.code += write('"\\n"' + (node.last ? '' : ' + i'));
        },

        '_v': function _v(node, context) {
            context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
        },

        '_t': function _t(node, context) {
            context.code += write('"' + esc(node.text) + '"');
        },

        '{': tripleStache,

        '&': tripleStache
    };

    function tripleStache(node, context) {
        context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
    }

    function write(s) {
        return 't.b(' + s + ');';
    }

    Hogan.walk = function (nodelist, context) {
        var func;
        for (var i = 0, l = nodelist.length; i < l; i++) {
            func = Hogan.codegen[nodelist[i].tag];
            func && func(nodelist[i], context);
        }
        return context;
    };

    Hogan.parse = function (tokens, text, options) {
        options = options || {};
        return buildTree(tokens, '', [], options.sectionTags || []);
    };

    Hogan.cache = {};

    Hogan.cacheKey = function (text, options) {
        return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
    };

    Hogan.compile = function (text, options) {
        options = options || {};
        var key = Hogan.cacheKey(text, options);
        var template = this.cache[key];

        if (template) {
            var partials = template.partials;
            for (var name in partials) {
                delete partials[name].instance;
            }
            return template;
        }

        template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
        return this.cache[key] = template;
    };
})( true ? exports : Hogan);

/***/ }),

/***/ "./resources/assets/js/vendor/jquery.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function (a, b) {
  "use strict";
  "object" == ( false ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = a.document ? b(a, !0) : function (a) {
    if (!a.document) throw new Error("jQuery requires a window with a document");return b(a);
  } : b(a);
}("undefined" != typeof window ? window : this, function (a, b) {
  "use strict";
  var c = [],
      d = a.document,
      e = Object.getPrototypeOf,
      f = c.slice,
      g = c.concat,
      h = c.push,
      i = c.indexOf,
      j = {},
      k = j.toString,
      l = j.hasOwnProperty,
      m = l.toString,
      n = m.call(Object),
      o = {};function p(a, b) {
    b = b || d;var c = b.createElement("script");c.text = a, b.head.appendChild(c).parentNode.removeChild(c);
  }var q = "3.2.1",
      r = function r(a, b) {
    return new r.fn.init(a, b);
  },
      s = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      t = /^-ms-/,
      u = /-([a-z])/g,
      v = function v(a, b) {
    return b.toUpperCase();
  };r.fn = r.prototype = { jquery: q, constructor: r, length: 0, toArray: function toArray() {
      return f.call(this);
    }, get: function get(a) {
      return null == a ? f.call(this) : a < 0 ? this[a + this.length] : this[a];
    }, pushStack: function pushStack(a) {
      var b = r.merge(this.constructor(), a);return b.prevObject = this, b;
    }, each: function each(a) {
      return r.each(this, a);
    }, map: function map(a) {
      return this.pushStack(r.map(this, function (b, c) {
        return a.call(b, c, b);
      }));
    }, slice: function slice() {
      return this.pushStack(f.apply(this, arguments));
    }, first: function first() {
      return this.eq(0);
    }, last: function last() {
      return this.eq(-1);
    }, eq: function eq(a) {
      var b = this.length,
          c = +a + (a < 0 ? b : 0);return this.pushStack(c >= 0 && c < b ? [this[c]] : []);
    }, end: function end() {
      return this.prevObject || this.constructor();
    }, push: h, sort: c.sort, splice: c.splice }, r.extend = r.fn.extend = function () {
    var a,
        b,
        c,
        d,
        e,
        f,
        g = arguments[0] || {},
        h = 1,
        i = arguments.length,
        j = !1;for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == (typeof g === "undefined" ? "undefined" : _typeof(g)) || r.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++) {
      if (null != (a = arguments[h])) for (b in a) {
        c = g[b], d = a[b], g !== d && (j && d && (r.isPlainObject(d) || (e = Array.isArray(d))) ? (e ? (e = !1, f = c && Array.isArray(c) ? c : []) : f = c && r.isPlainObject(c) ? c : {}, g[b] = r.extend(j, f, d)) : void 0 !== d && (g[b] = d));
      }
    }return g;
  }, r.extend({ expando: "jQuery" + (q + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(a) {
      throw new Error(a);
    }, noop: function noop() {}, isFunction: function isFunction(a) {
      return "function" === r.type(a);
    }, isWindow: function isWindow(a) {
      return null != a && a === a.window;
    }, isNumeric: function isNumeric(a) {
      var b = r.type(a);return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a));
    }, isPlainObject: function isPlainObject(a) {
      var b, c;return !(!a || "[object Object]" !== k.call(a)) && (!(b = e(a)) || (c = l.call(b, "constructor") && b.constructor, "function" == typeof c && m.call(c) === n));
    }, isEmptyObject: function isEmptyObject(a) {
      var b;for (b in a) {
        return !1;
      }return !0;
    }, type: function type(a) {
      return null == a ? a + "" : "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a ? j[k.call(a)] || "object" : typeof a === "undefined" ? "undefined" : _typeof(a);
    }, globalEval: function globalEval(a) {
      p(a);
    }, camelCase: function camelCase(a) {
      return a.replace(t, "ms-").replace(u, v);
    }, each: function each(a, b) {
      var c,
          d = 0;if (w(a)) {
        for (c = a.length; d < c; d++) {
          if (b.call(a[d], d, a[d]) === !1) break;
        }
      } else for (d in a) {
        if (b.call(a[d], d, a[d]) === !1) break;
      }return a;
    }, trim: function trim(a) {
      return null == a ? "" : (a + "").replace(s, "");
    }, makeArray: function makeArray(a, b) {
      var c = b || [];return null != a && (w(Object(a)) ? r.merge(c, "string" == typeof a ? [a] : a) : h.call(c, a)), c;
    }, inArray: function inArray(a, b, c) {
      return null == b ? -1 : i.call(b, a, c);
    }, merge: function merge(a, b) {
      for (var c = +b.length, d = 0, e = a.length; d < c; d++) {
        a[e++] = b[d];
      }return a.length = e, a;
    }, grep: function grep(a, b, c) {
      for (var d, e = [], f = 0, g = a.length, h = !c; f < g; f++) {
        d = !b(a[f], f), d !== h && e.push(a[f]);
      }return e;
    }, map: function map(a, b, c) {
      var d,
          e,
          f = 0,
          h = [];if (w(a)) for (d = a.length; f < d; f++) {
        e = b(a[f], f, c), null != e && h.push(e);
      } else for (f in a) {
        e = b(a[f], f, c), null != e && h.push(e);
      }return g.apply([], h);
    }, guid: 1, proxy: function proxy(a, b) {
      var c, d, e;if ("string" == typeof b && (c = a[b], b = a, a = c), r.isFunction(a)) return d = f.call(arguments, 2), e = function e() {
        return a.apply(b || this, d.concat(f.call(arguments)));
      }, e.guid = a.guid = a.guid || r.guid++, e;
    }, now: Date.now, support: o }), "function" == typeof Symbol && (r.fn[Symbol.iterator] = c[Symbol.iterator]), r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
    j["[object " + b + "]"] = b.toLowerCase();
  });function w(a) {
    var b = !!a && "length" in a && a.length,
        c = r.type(a);return "function" !== c && !r.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a);
  }var x = function (a) {
    var b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u = "sizzle" + 1 * new Date(),
        v = a.document,
        w = 0,
        x = 0,
        y = ha(),
        z = ha(),
        A = ha(),
        B = function B(a, b) {
      return a === b && (l = !0), 0;
    },
        C = {}.hasOwnProperty,
        D = [],
        E = D.pop,
        F = D.push,
        G = D.push,
        H = D.slice,
        I = function I(a, b) {
      for (var c = 0, d = a.length; c < d; c++) {
        if (a[c] === b) return c;
      }return -1;
    },
        J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        K = "[\\x20\\t\\r\\n\\f]",
        L = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        M = "\\[" + K + "*(" + L + ")(?:" + K + "*([*^$|!~]?=)" + K + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + L + "))|)" + K + "*\\]",
        N = ":(" + L + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)",
        O = new RegExp(K + "+", "g"),
        P = new RegExp("^" + K + "+|((?:^|[^\\\\])(?:\\\\.)*)" + K + "+$", "g"),
        Q = new RegExp("^" + K + "*," + K + "*"),
        R = new RegExp("^" + K + "*([>+~]|" + K + ")" + K + "*"),
        S = new RegExp("=" + K + "*([^\\]'\"]*?)" + K + "*\\]", "g"),
        T = new RegExp(N),
        U = new RegExp("^" + L + "$"),
        V = { ID: new RegExp("^#(" + L + ")"), CLASS: new RegExp("^\\.(" + L + ")"), TAG: new RegExp("^(" + L + "|[*])"), ATTR: new RegExp("^" + M), PSEUDO: new RegExp("^" + N), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + K + "*(even|odd|(([+-]|)(\\d*)n|)" + K + "*(?:([+-]|)" + K + "*(\\d+)|))" + K + "*\\)|)", "i"), bool: new RegExp("^(?:" + J + ")$", "i"), needsContext: new RegExp("^" + K + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + K + "*((?:-\\d)?\\d*)" + K + "*\\)|)(?=[^-]|$)", "i") },
        W = /^(?:input|select|textarea|button)$/i,
        X = /^h\d$/i,
        Y = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        $ = /[+~]/,
        _ = new RegExp("\\\\([\\da-f]{1,6}" + K + "?|(" + K + ")|.)", "ig"),
        aa = function aa(a, b, c) {
      var d = "0x" + b - 65536;return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
    },
        ba = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        ca = function ca(a, b) {
      return b ? "\0" === a ? "\uFFFD" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a;
    },
        da = function da() {
      m();
    },
        ea = ta(function (a) {
      return a.disabled === !0 && ("form" in a || "label" in a);
    }, { dir: "parentNode", next: "legend" });try {
      G.apply(D = H.call(v.childNodes), v.childNodes), D[v.childNodes.length].nodeType;
    } catch (fa) {
      G = { apply: D.length ? function (a, b) {
          F.apply(a, H.call(b));
        } : function (a, b) {
          var c = a.length,
              d = 0;while (a[c++] = b[d++]) {}a.length = c - 1;
        } };
    }function ga(a, b, d, e) {
      var f,
          h,
          j,
          k,
          l,
          o,
          r,
          s = b && b.ownerDocument,
          w = b ? b.nodeType : 9;if (d = d || [], "string" != typeof a || !a || 1 !== w && 9 !== w && 11 !== w) return d;if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
        if (11 !== w && (l = Z.exec(a))) if (f = l[1]) {
          if (9 === w) {
            if (!(j = b.getElementById(f))) return d;if (j.id === f) return d.push(j), d;
          } else if (s && (j = s.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d;
        } else {
          if (l[2]) return G.apply(d, b.getElementsByTagName(a)), d;if ((f = l[3]) && c.getElementsByClassName && b.getElementsByClassName) return G.apply(d, b.getElementsByClassName(f)), d;
        }if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
          if (1 !== w) s = b, r = a;else if ("object" !== b.nodeName.toLowerCase()) {
            (k = b.getAttribute("id")) ? k = k.replace(ba, ca) : b.setAttribute("id", k = u), o = g(a), h = o.length;while (h--) {
              o[h] = "#" + k + " " + sa(o[h]);
            }r = o.join(","), s = $.test(a) && qa(b.parentNode) || b;
          }if (r) try {
            return G.apply(d, s.querySelectorAll(r)), d;
          } catch (x) {} finally {
            k === u && b.removeAttribute("id");
          }
        }
      }return i(a.replace(P, "$1"), b, d, e);
    }function ha() {
      var a = [];function b(c, e) {
        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e;
      }return b;
    }function ia(a) {
      return a[u] = !0, a;
    }function ja(a) {
      var b = n.createElement("fieldset");try {
        return !!a(b);
      } catch (c) {
        return !1;
      } finally {
        b.parentNode && b.parentNode.removeChild(b), b = null;
      }
    }function ka(a, b) {
      var c = a.split("|"),
          e = c.length;while (e--) {
        d.attrHandle[c[e]] = b;
      }
    }function la(a, b) {
      var c = b && a,
          d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;if (d) return d;if (c) while (c = c.nextSibling) {
        if (c === b) return -1;
      }return a ? 1 : -1;
    }function ma(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();return "input" === c && b.type === a;
      };
    }function na(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();return ("input" === c || "button" === c) && b.type === a;
      };
    }function oa(a) {
      return function (b) {
        return "form" in b ? b.parentNode && b.disabled === !1 ? "label" in b ? "label" in b.parentNode ? b.parentNode.disabled === a : b.disabled === a : b.isDisabled === a || b.isDisabled !== !a && ea(b) === a : b.disabled === a : "label" in b && b.disabled === a;
      };
    }function pa(a) {
      return ia(function (b) {
        return b = +b, ia(function (c, d) {
          var e,
              f = a([], c.length, b),
              g = f.length;while (g--) {
            c[e = f[g]] && (c[e] = !(d[e] = c[e]));
          }
        });
      });
    }function qa(a) {
      return a && "undefined" != typeof a.getElementsByTagName && a;
    }c = ga.support = {}, f = ga.isXML = function (a) {
      var b = a && (a.ownerDocument || a).documentElement;return !!b && "HTML" !== b.nodeName;
    }, m = ga.setDocument = function (a) {
      var b,
          e,
          g = a ? a.ownerDocument || a : v;return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), v !== n && (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ja(function (a) {
        return a.className = "i", !a.getAttribute("className");
      }), c.getElementsByTagName = ja(function (a) {
        return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length;
      }), c.getElementsByClassName = Y.test(n.getElementsByClassName), c.getById = ja(function (a) {
        return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length;
      }), c.getById ? (d.filter.ID = function (a) {
        var b = a.replace(_, aa);return function (a) {
          return a.getAttribute("id") === b;
        };
      }, d.find.ID = function (a, b) {
        if ("undefined" != typeof b.getElementById && p) {
          var c = b.getElementById(a);return c ? [c] : [];
        }
      }) : (d.filter.ID = function (a) {
        var b = a.replace(_, aa);return function (a) {
          var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");return c && c.value === b;
        };
      }, d.find.ID = function (a, b) {
        if ("undefined" != typeof b.getElementById && p) {
          var c,
              d,
              e,
              f = b.getElementById(a);if (f) {
            if (c = f.getAttributeNode("id"), c && c.value === a) return [f];e = b.getElementsByName(a), d = 0;while (f = e[d++]) {
              if (c = f.getAttributeNode("id"), c && c.value === a) return [f];
            }
          }return [];
        }
      }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;
      } : function (a, b) {
        var c,
            d = [],
            e = 0,
            f = b.getElementsByTagName(a);if ("*" === a) {
          while (c = f[e++]) {
            1 === c.nodeType && d.push(c);
          }return d;
        }return f;
      }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
        if ("undefined" != typeof b.getElementsByClassName && p) return b.getElementsByClassName(a);
      }, r = [], q = [], (c.qsa = Y.test(n.querySelectorAll)) && (ja(function (a) {
        o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + K + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + K + "*(?:value|" + J + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]");
      }), ja(function (a) {
        a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b = n.createElement("input");b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + K + "*[*^$|!~]?="), 2 !== a.querySelectorAll(":enabled").length && q.push(":enabled", ":disabled"), o.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:");
      })), (c.matchesSelector = Y.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function (a) {
        c.disconnectedMatch = s.call(a, "*"), s.call(a, "[s!='']:x"), r.push("!=", N);
      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Y.test(o.compareDocumentPosition), t = b || Y.test(o.contains) ? function (a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a,
            d = b && b.parentNode;return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
      } : function (a, b) {
        if (b) while (b = b.parentNode) {
          if (b === a) return !0;
        }return !1;
      }, B = b ? function (a, b) {
        if (a === b) return l = !0, 0;var d = !a.compareDocumentPosition - !b.compareDocumentPosition;return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? I(k, a) - I(k, b) : 0 : 4 & d ? -1 : 1);
      } : function (a, b) {
        if (a === b) return l = !0, 0;var c,
            d = 0,
            e = a.parentNode,
            f = b.parentNode,
            g = [a],
            h = [b];if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? I(k, a) - I(k, b) : 0;if (e === f) return la(a, b);c = a;while (c = c.parentNode) {
          g.unshift(c);
        }c = b;while (c = c.parentNode) {
          h.unshift(c);
        }while (g[d] === h[d]) {
          d++;
        }return d ? la(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0;
      }, n) : n;
    }, ga.matches = function (a, b) {
      return ga(a, null, null, b);
    }, ga.matchesSelector = function (a, b) {
      if ((a.ownerDocument || a) !== n && m(a), b = b.replace(S, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
        var d = s.call(a, b);if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
      } catch (e) {}return ga(b, n, null, [a]).length > 0;
    }, ga.contains = function (a, b) {
      return (a.ownerDocument || a) !== n && m(a), t(a, b);
    }, ga.attr = function (a, b) {
      (a.ownerDocument || a) !== n && m(a);var e = d.attrHandle[b.toLowerCase()],
          f = e && C.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
    }, ga.escape = function (a) {
      return (a + "").replace(ba, ca);
    }, ga.error = function (a) {
      throw new Error("Syntax error, unrecognized expression: " + a);
    }, ga.uniqueSort = function (a) {
      var b,
          d = [],
          e = 0,
          f = 0;if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
        while (b = a[f++]) {
          b === a[f] && (e = d.push(f));
        }while (e--) {
          a.splice(d[e], 1);
        }
      }return k = null, a;
    }, e = ga.getText = function (a) {
      var b,
          c = "",
          d = 0,
          f = a.nodeType;if (f) {
        if (1 === f || 9 === f || 11 === f) {
          if ("string" == typeof a.textContent) return a.textContent;for (a = a.firstChild; a; a = a.nextSibling) {
            c += e(a);
          }
        } else if (3 === f || 4 === f) return a.nodeValue;
      } else while (b = a[d++]) {
        c += e(b);
      }return c;
    }, d = ga.selectors = { cacheLength: 50, createPseudo: ia, match: V, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(a) {
          return a[1] = a[1].replace(_, aa), a[3] = (a[3] || a[4] || a[5] || "").replace(_, aa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
        }, CHILD: function CHILD(a) {
          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a;
        }, PSEUDO: function PSEUDO(a) {
          var b,
              c = !a[6] && a[2];return V.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && T.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
        } }, filter: { TAG: function TAG(a) {
          var b = a.replace(_, aa).toLowerCase();return "*" === a ? function () {
            return !0;
          } : function (a) {
            return a.nodeName && a.nodeName.toLowerCase() === b;
          };
        }, CLASS: function CLASS(a) {
          var b = y[a + " "];return b || (b = new RegExp("(^|" + K + ")" + a + "(" + K + "|$)")) && y(a, function (a) {
            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
          });
        }, ATTR: function ATTR(a, b, c) {
          return function (d) {
            var e = ga.attr(d, a);return null == e ? "!=" === b : !b || (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(O, " ") + " ").indexOf(c) > -1 : "|=" === b && (e === c || e.slice(0, c.length + 1) === c + "-"));
          };
        }, CHILD: function CHILD(a, b, c, d, e) {
          var f = "nth" !== a.slice(0, 3),
              g = "last" !== a.slice(-4),
              h = "of-type" === b;return 1 === d && 0 === e ? function (a) {
            return !!a.parentNode;
          } : function (b, c, i) {
            var j,
                k,
                l,
                m,
                n,
                o,
                p = f !== g ? "nextSibling" : "previousSibling",
                q = b.parentNode,
                r = h && b.nodeName.toLowerCase(),
                s = !i && !h,
                t = !1;if (q) {
              if (f) {
                while (p) {
                  m = b;while (m = m[p]) {
                    if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                  }o = p = "only" === a && !o && "nextSibling";
                }return !0;
              }if (o = [g ? q.firstChild : q.lastChild], g && s) {
                m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) {
                  if (1 === m.nodeType && ++t && m === b) {
                    k[a] = [w, n, t];break;
                  }
                }
              } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1) while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) {
                if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m === b)) break;
              }return t -= e, t === d || t % d === 0 && t / d >= 0;
            }
          };
        }, PSEUDO: function PSEUDO(a, b) {
          var c,
              e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function (a, c) {
            var d,
                f = e(a, b),
                g = f.length;while (g--) {
              d = I(a, f[g]), a[d] = !(c[d] = f[g]);
            }
          }) : function (a) {
            return e(a, 0, c);
          }) : e;
        } }, pseudos: { not: ia(function (a) {
          var b = [],
              c = [],
              d = h(a.replace(P, "$1"));return d[u] ? ia(function (a, b, c, e) {
            var f,
                g = d(a, null, e, []),
                h = a.length;while (h--) {
              (f = g[h]) && (a[h] = !(b[h] = f));
            }
          }) : function (a, e, f) {
            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop();
          };
        }), has: ia(function (a) {
          return function (b) {
            return ga(a, b).length > 0;
          };
        }), contains: ia(function (a) {
          return a = a.replace(_, aa), function (b) {
            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
          };
        }), lang: ia(function (a) {
          return U.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(_, aa).toLowerCase(), function (b) {
            var c;do {
              if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
            } while ((b = b.parentNode) && 1 === b.nodeType);return !1;
          };
        }), target: function target(b) {
          var c = a.location && a.location.hash;return c && c.slice(1) === b.id;
        }, root: function root(a) {
          return a === o;
        }, focus: function focus(a) {
          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
        }, enabled: oa(!1), disabled: oa(!0), checked: function checked(a) {
          var b = a.nodeName.toLowerCase();return "input" === b && !!a.checked || "option" === b && !!a.selected;
        }, selected: function selected(a) {
          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
        }, empty: function empty(a) {
          for (a = a.firstChild; a; a = a.nextSibling) {
            if (a.nodeType < 6) return !1;
          }return !0;
        }, parent: function parent(a) {
          return !d.pseudos.empty(a);
        }, header: function header(a) {
          return X.test(a.nodeName);
        }, input: function input(a) {
          return W.test(a.nodeName);
        }, button: function button(a) {
          var b = a.nodeName.toLowerCase();return "input" === b && "button" === a.type || "button" === b;
        }, text: function text(a) {
          var b;return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
        }, first: pa(function () {
          return [0];
        }), last: pa(function (a, b) {
          return [b - 1];
        }), eq: pa(function (a, b, c) {
          return [c < 0 ? c + b : c];
        }), even: pa(function (a, b) {
          for (var c = 0; c < b; c += 2) {
            a.push(c);
          }return a;
        }), odd: pa(function (a, b) {
          for (var c = 1; c < b; c += 2) {
            a.push(c);
          }return a;
        }), lt: pa(function (a, b, c) {
          for (var d = c < 0 ? c + b : c; --d >= 0;) {
            a.push(d);
          }return a;
        }), gt: pa(function (a, b, c) {
          for (var d = c < 0 ? c + b : c; ++d < b;) {
            a.push(d);
          }return a;
        }) } }, d.pseudos.nth = d.pseudos.eq;for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
      d.pseudos[b] = ma(b);
    }for (b in { submit: !0, reset: !0 }) {
      d.pseudos[b] = na(b);
    }function ra() {}ra.prototype = d.filters = d.pseudos, d.setFilters = new ra(), g = ga.tokenize = function (a, b) {
      var c,
          e,
          f,
          g,
          h,
          i,
          j,
          k = z[a + " "];if (k) return b ? 0 : k.slice(0);h = a, i = [], j = d.preFilter;while (h) {
        c && !(e = Q.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = R.exec(h)) && (c = e.shift(), f.push({ value: c, type: e[0].replace(P, " ") }), h = h.slice(c.length));for (g in d.filter) {
          !(e = V[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({ value: c, type: g, matches: e }), h = h.slice(c.length));
        }if (!c) break;
      }return b ? h.length : h ? ga.error(a) : z(a, i).slice(0);
    };function sa(a) {
      for (var b = 0, c = a.length, d = ""; b < c; b++) {
        d += a[b].value;
      }return d;
    }function ta(a, b, c) {
      var d = b.dir,
          e = b.next,
          f = e || d,
          g = c && "parentNode" === f,
          h = x++;return b.first ? function (b, c, e) {
        while (b = b[d]) {
          if (1 === b.nodeType || g) return a(b, c, e);
        }return !1;
      } : function (b, c, i) {
        var j,
            k,
            l,
            m = [w, h];if (i) {
          while (b = b[d]) {
            if ((1 === b.nodeType || g) && a(b, c, i)) return !0;
          }
        } else while (b = b[d]) {
          if (1 === b.nodeType || g) if (l = b[u] || (b[u] = {}), k = l[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b;else {
            if ((j = k[f]) && j[0] === w && j[1] === h) return m[2] = j[2];if (k[f] = m, m[2] = a(b, c, i)) return !0;
          }
        }return !1;
      };
    }function ua(a) {
      return a.length > 1 ? function (b, c, d) {
        var e = a.length;while (e--) {
          if (!a[e](b, c, d)) return !1;
        }return !0;
      } : a[0];
    }function va(a, b, c) {
      for (var d = 0, e = b.length; d < e; d++) {
        ga(a, b[d], c);
      }return c;
    }function wa(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++) {
        (f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
      }return g;
    }function xa(a, b, c, d, e, f) {
      return d && !d[u] && (d = xa(d)), e && !e[u] && (e = xa(e, f)), ia(function (f, g, h, i) {
        var j,
            k,
            l,
            m = [],
            n = [],
            o = g.length,
            p = f || va(b || "*", h.nodeType ? [h] : h, []),
            q = !a || !f && b ? p : wa(p, m, a, h, i),
            r = c ? e || (f ? a : o || d) ? [] : g : q;if (c && c(q, r, h, i), d) {
          j = wa(r, n), d(j, [], h, i), k = j.length;while (k--) {
            (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
          }
        }if (f) {
          if (e || a) {
            if (e) {
              j = [], k = r.length;while (k--) {
                (l = r[k]) && j.push(q[k] = l);
              }e(null, r = [], j, i);
            }k = r.length;while (k--) {
              (l = r[k]) && (j = e ? I(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
            }
          }
        } else r = wa(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : G.apply(g, r);
      });
    }function ya(a) {
      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ta(function (a) {
        return a === b;
      }, h, !0), l = ta(function (a) {
        return I(b, a) > -1;
      }, h, !0), m = [function (a, c, d) {
        var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));return b = null, e;
      }]; i < f; i++) {
        if (c = d.relative[a[i].type]) m = [ta(ua(m), c)];else {
          if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
            for (e = ++i; e < f; e++) {
              if (d.relative[a[e].type]) break;
            }return xa(i > 1 && ua(m), i > 1 && sa(a.slice(0, i - 1).concat({ value: " " === a[i - 2].type ? "*" : "" })).replace(P, "$1"), c, i < e && ya(a.slice(i, e)), e < f && ya(a = a.slice(e)), e < f && sa(a));
          }m.push(c);
        }
      }return ua(m);
    }function za(a, b) {
      var c = b.length > 0,
          e = a.length > 0,
          f = function f(_f, g, h, i, k) {
        var l,
            o,
            q,
            r = 0,
            s = "0",
            t = _f && [],
            u = [],
            v = j,
            x = _f || e && d.find.TAG("*", k),
            y = w += null == v ? 1 : Math.random() || .1,
            z = x.length;for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
          if (e && l) {
            o = 0, g || l.ownerDocument === n || (m(l), h = !p);while (q = a[o++]) {
              if (q(l, g || n, h)) {
                i.push(l);break;
              }
            }k && (w = y);
          }c && ((l = !q && l) && r--, _f && t.push(l));
        }if (r += s, c && s !== r) {
          o = 0;while (q = b[o++]) {
            q(t, u, g, h);
          }if (_f) {
            if (r > 0) while (s--) {
              t[s] || u[s] || (u[s] = E.call(i));
            }u = wa(u);
          }G.apply(i, u), k && !_f && u.length > 0 && r + b.length > 1 && ga.uniqueSort(i);
        }return k && (w = y, j = v), t;
      };return c ? ia(f) : f;
    }return h = ga.compile = function (a, b) {
      var c,
          d = [],
          e = [],
          f = A[a + " "];if (!f) {
        b || (b = g(a)), c = b.length;while (c--) {
          f = ya(b[c]), f[u] ? d.push(f) : e.push(f);
        }f = A(a, za(e, d)), f.selector = a;
      }return f;
    }, i = ga.select = function (a, b, c, e) {
      var f,
          i,
          j,
          k,
          l,
          m = "function" == typeof a && a,
          n = !e && g(a = m.selector || a);if (c = c || [], 1 === n.length) {
        if (i = n[0] = n[0].slice(0), i.length > 2 && "ID" === (j = i[0]).type && 9 === b.nodeType && p && d.relative[i[1].type]) {
          if (b = (d.find.ID(j.matches[0].replace(_, aa), b) || [])[0], !b) return c;m && (b = b.parentNode), a = a.slice(i.shift().value.length);
        }f = V.needsContext.test(a) ? 0 : i.length;while (f--) {
          if (j = i[f], d.relative[k = j.type]) break;if ((l = d.find[k]) && (e = l(j.matches[0].replace(_, aa), $.test(i[0].type) && qa(b.parentNode) || b))) {
            if (i.splice(f, 1), a = e.length && sa(i), !a) return G.apply(c, e), c;break;
          }
        }
      }return (m || h(a, n))(e, b, !p, c, !b || $.test(a) && qa(b.parentNode) || b), c;
    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function (a) {
      return 1 & a.compareDocumentPosition(n.createElement("fieldset"));
    }), ja(function (a) {
      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
    }) || ka("type|href|height|width", function (a, b, c) {
      if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
    }), c.attributes && ja(function (a) {
      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
    }) || ka("value", function (a, b, c) {
      if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue;
    }), ja(function (a) {
      return null == a.getAttribute("disabled");
    }) || ka(J, function (a, b, c) {
      var d;if (!c) return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
    }), ga;
  }(a);r.find = x, r.expr = x.selectors, r.expr[":"] = r.expr.pseudos, r.uniqueSort = r.unique = x.uniqueSort, r.text = x.getText, r.isXMLDoc = x.isXML, r.contains = x.contains, r.escapeSelector = x.escape;var y = function y(a, b, c) {
    var d = [],
        e = void 0 !== c;while ((a = a[b]) && 9 !== a.nodeType) {
      if (1 === a.nodeType) {
        if (e && r(a).is(c)) break;d.push(a);
      }
    }return d;
  },
      z = function z(a, b) {
    for (var c = []; a; a = a.nextSibling) {
      1 === a.nodeType && a !== b && c.push(a);
    }return c;
  },
      A = r.expr.match.needsContext;function B(a, b) {
    return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
  }var C = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
      D = /^.[^:#\[\.,]*$/;function E(a, b, c) {
    return r.isFunction(b) ? r.grep(a, function (a, d) {
      return !!b.call(a, d, a) !== c;
    }) : b.nodeType ? r.grep(a, function (a) {
      return a === b !== c;
    }) : "string" != typeof b ? r.grep(a, function (a) {
      return i.call(b, a) > -1 !== c;
    }) : D.test(b) ? r.filter(b, a, c) : (b = r.filter(b, a), r.grep(a, function (a) {
      return i.call(b, a) > -1 !== c && 1 === a.nodeType;
    }));
  }r.filter = function (a, b, c) {
    var d = b[0];return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? r.find.matchesSelector(d, a) ? [d] : [] : r.find.matches(a, r.grep(b, function (a) {
      return 1 === a.nodeType;
    }));
  }, r.fn.extend({ find: function find(a) {
      var b,
          c,
          d = this.length,
          e = this;if ("string" != typeof a) return this.pushStack(r(a).filter(function () {
        for (b = 0; b < d; b++) {
          if (r.contains(e[b], this)) return !0;
        }
      }));for (c = this.pushStack([]), b = 0; b < d; b++) {
        r.find(a, e[b], c);
      }return d > 1 ? r.uniqueSort(c) : c;
    }, filter: function filter(a) {
      return this.pushStack(E(this, a || [], !1));
    }, not: function not(a) {
      return this.pushStack(E(this, a || [], !0));
    }, is: function is(a) {
      return !!E(this, "string" == typeof a && A.test(a) ? r(a) : a || [], !1).length;
    } });var F,
      G = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
      H = r.fn.init = function (a, b, c) {
    var e, f;if (!a) return this;if (c = c || F, "string" == typeof a) {
      if (e = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : G.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);if (e[1]) {
        if (b = b instanceof r ? b[0] : b, r.merge(this, r.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), C.test(e[1]) && r.isPlainObject(b)) for (e in b) {
          r.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
        }return this;
      }return f = d.getElementById(e[2]), f && (this[0] = f, this.length = 1), this;
    }return a.nodeType ? (this[0] = a, this.length = 1, this) : r.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(r) : r.makeArray(a, this);
  };H.prototype = r.fn, F = r(d);var I = /^(?:parents|prev(?:Until|All))/,
      J = { children: !0, contents: !0, next: !0, prev: !0 };r.fn.extend({ has: function has(a) {
      var b = r(a, this),
          c = b.length;return this.filter(function () {
        for (var a = 0; a < c; a++) {
          if (r.contains(this, b[a])) return !0;
        }
      });
    }, closest: function closest(a, b) {
      var c,
          d = 0,
          e = this.length,
          f = [],
          g = "string" != typeof a && r(a);if (!A.test(a)) for (; d < e; d++) {
        for (c = this[d]; c && c !== b; c = c.parentNode) {
          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && r.find.matchesSelector(c, a))) {
            f.push(c);break;
          }
        }
      }return this.pushStack(f.length > 1 ? r.uniqueSort(f) : f);
    }, index: function index(a) {
      return a ? "string" == typeof a ? i.call(r(a), this[0]) : i.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    }, add: function add(a, b) {
      return this.pushStack(r.uniqueSort(r.merge(this.get(), r(a, b))));
    }, addBack: function addBack(a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
    } });function K(a, b) {
    while ((a = a[b]) && 1 !== a.nodeType) {}return a;
  }r.each({ parent: function parent(a) {
      var b = a.parentNode;return b && 11 !== b.nodeType ? b : null;
    }, parents: function parents(a) {
      return y(a, "parentNode");
    }, parentsUntil: function parentsUntil(a, b, c) {
      return y(a, "parentNode", c);
    }, next: function next(a) {
      return K(a, "nextSibling");
    }, prev: function prev(a) {
      return K(a, "previousSibling");
    }, nextAll: function nextAll(a) {
      return y(a, "nextSibling");
    }, prevAll: function prevAll(a) {
      return y(a, "previousSibling");
    }, nextUntil: function nextUntil(a, b, c) {
      return y(a, "nextSibling", c);
    }, prevUntil: function prevUntil(a, b, c) {
      return y(a, "previousSibling", c);
    }, siblings: function siblings(a) {
      return z((a.parentNode || {}).firstChild, a);
    }, children: function children(a) {
      return z(a.firstChild);
    }, contents: function contents(a) {
      return B(a, "iframe") ? a.contentDocument : (B(a, "template") && (a = a.content || a), r.merge([], a.childNodes));
    } }, function (a, b) {
    r.fn[a] = function (c, d) {
      var e = r.map(this, b, c);return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = r.filter(d, e)), this.length > 1 && (J[a] || r.uniqueSort(e), I.test(a) && e.reverse()), this.pushStack(e);
    };
  });var L = /[^\x20\t\r\n\f]+/g;function M(a) {
    var b = {};return r.each(a.match(L) || [], function (a, c) {
      b[c] = !0;
    }), b;
  }r.Callbacks = function (a) {
    a = "string" == typeof a ? M(a) : r.extend({}, a);var b,
        c,
        d,
        e,
        f = [],
        g = [],
        h = -1,
        i = function i() {
      for (e = e || a.once, d = b = !0; g.length; h = -1) {
        c = g.shift();while (++h < f.length) {
          f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1);
        }
      }a.memory || (c = !1), b = !1, e && (f = c ? [] : "");
    },
        j = { add: function add() {
        return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
          r.each(b, function (b, c) {
            r.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== r.type(c) && d(c);
          });
        }(arguments), c && !b && i()), this;
      }, remove: function remove() {
        return r.each(arguments, function (a, b) {
          var c;while ((c = r.inArray(b, f, c)) > -1) {
            f.splice(c, 1), c <= h && h--;
          }
        }), this;
      }, has: function has(a) {
        return a ? r.inArray(a, f) > -1 : f.length > 0;
      }, empty: function empty() {
        return f && (f = []), this;
      }, disable: function disable() {
        return e = g = [], f = c = "", this;
      }, disabled: function disabled() {
        return !f;
      }, lock: function lock() {
        return e = g = [], c || b || (f = c = ""), this;
      }, locked: function locked() {
        return !!e;
      }, fireWith: function fireWith(a, c) {
        return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this;
      }, fire: function fire() {
        return j.fireWith(this, arguments), this;
      }, fired: function fired() {
        return !!d;
      } };return j;
  };function N(a) {
    return a;
  }function O(a) {
    throw a;
  }function P(a, b, c, d) {
    var e;try {
      a && r.isFunction(e = a.promise) ? e.call(a).done(b).fail(c) : a && r.isFunction(e = a.then) ? e.call(a, b, c) : b.apply(void 0, [a].slice(d));
    } catch (a) {
      c.apply(void 0, [a]);
    }
  }r.extend({ Deferred: function Deferred(b) {
      var c = [["notify", "progress", r.Callbacks("memory"), r.Callbacks("memory"), 2], ["resolve", "done", r.Callbacks("once memory"), r.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", r.Callbacks("once memory"), r.Callbacks("once memory"), 1, "rejected"]],
          d = "pending",
          e = { state: function state() {
          return d;
        }, always: function always() {
          return f.done(arguments).fail(arguments), this;
        }, "catch": function _catch(a) {
          return e.then(null, a);
        }, pipe: function pipe() {
          var a = arguments;return r.Deferred(function (b) {
            r.each(c, function (c, d) {
              var e = r.isFunction(a[d[4]]) && a[d[4]];f[d[1]](function () {
                var a = e && e.apply(this, arguments);a && r.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [a] : arguments);
              });
            }), a = null;
          }).promise();
        }, then: function then(b, d, e) {
          var f = 0;function g(b, c, d, e) {
            return function () {
              var h = this,
                  i = arguments,
                  j = function j() {
                var a, j;if (!(b < f)) {
                  if (a = d.apply(h, i), a === c.promise()) throw new TypeError("Thenable self-resolution");j = a && ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a) && a.then, r.isFunction(j) ? e ? j.call(a, g(f, c, N, e), g(f, c, O, e)) : (f++, j.call(a, g(f, c, N, e), g(f, c, O, e), g(f, c, N, c.notifyWith))) : (d !== N && (h = void 0, i = [a]), (e || c.resolveWith)(h, i));
                }
              },
                  k = e ? j : function () {
                try {
                  j();
                } catch (a) {
                  r.Deferred.exceptionHook && r.Deferred.exceptionHook(a, k.stackTrace), b + 1 >= f && (d !== O && (h = void 0, i = [a]), c.rejectWith(h, i));
                }
              };b ? k() : (r.Deferred.getStackHook && (k.stackTrace = r.Deferred.getStackHook()), a.setTimeout(k));
            };
          }return r.Deferred(function (a) {
            c[0][3].add(g(0, a, r.isFunction(e) ? e : N, a.notifyWith)), c[1][3].add(g(0, a, r.isFunction(b) ? b : N)), c[2][3].add(g(0, a, r.isFunction(d) ? d : O));
          }).promise();
        }, promise: function promise(a) {
          return null != a ? r.extend(a, e) : e;
        } },
          f = {};return r.each(c, function (a, b) {
        var g = b[2],
            h = b[5];e[b[1]] = g.add, h && g.add(function () {
          d = h;
        }, c[3 - a][2].disable, c[0][2].lock), g.add(b[3].fire), f[b[0]] = function () {
          return f[b[0] + "With"](this === f ? void 0 : this, arguments), this;
        }, f[b[0] + "With"] = g.fireWith;
      }), e.promise(f), b && b.call(f, f), f;
    }, when: function when(a) {
      var b = arguments.length,
          c = b,
          d = Array(c),
          e = f.call(arguments),
          g = r.Deferred(),
          h = function h(a) {
        return function (c) {
          d[a] = this, e[a] = arguments.length > 1 ? f.call(arguments) : c, --b || g.resolveWith(d, e);
        };
      };if (b <= 1 && (P(a, g.done(h(c)).resolve, g.reject, !b), "pending" === g.state() || r.isFunction(e[c] && e[c].then))) return g.then();while (c--) {
        P(e[c], h(c), g.reject);
      }return g.promise();
    } });var Q = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook = function (b, c) {
    a.console && a.console.warn && b && Q.test(b.name) && a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, c);
  }, r.readyException = function (b) {
    a.setTimeout(function () {
      throw b;
    });
  };var R = r.Deferred();r.fn.ready = function (a) {
    return R.then(a)["catch"](function (a) {
      r.readyException(a);
    }), this;
  }, r.extend({ isReady: !1, readyWait: 1, ready: function ready(a) {
      (a === !0 ? --r.readyWait : r.isReady) || (r.isReady = !0, a !== !0 && --r.readyWait > 0 || R.resolveWith(d, [r]));
    } }), r.ready.then = R.then;function S() {
    d.removeEventListener("DOMContentLoaded", S), a.removeEventListener("load", S), r.ready();
  }"complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll ? a.setTimeout(r.ready) : (d.addEventListener("DOMContentLoaded", S), a.addEventListener("load", S));var T = function T(a, b, c, d, e, f, g) {
    var h = 0,
        i = a.length,
        j = null == c;if ("object" === r.type(c)) {
      e = !0;for (h in c) {
        T(a, b, h, c[h], !0, f, g);
      }
    } else if (void 0 !== d && (e = !0, r.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function b(a, _b, c) {
      return j.call(r(a), c);
    })), b)) for (; h < i; h++) {
      b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
    }return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
  },
      U = function U(a) {
    return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType;
  };function V() {
    this.expando = r.expando + V.uid++;
  }V.uid = 1, V.prototype = { cache: function cache(a) {
      var b = a[this.expando];return b || (b = {}, U(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, { value: b, configurable: !0 }))), b;
    }, set: function set(a, b, c) {
      var d,
          e = this.cache(a);if ("string" == typeof b) e[r.camelCase(b)] = c;else for (d in b) {
        e[r.camelCase(d)] = b[d];
      }return e;
    }, get: function get(a, b) {
      return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][r.camelCase(b)];
    }, access: function access(a, b, c) {
      return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b);
    }, remove: function remove(a, b) {
      var c,
          d = a[this.expando];if (void 0 !== d) {
        if (void 0 !== b) {
          Array.isArray(b) ? b = b.map(r.camelCase) : (b = r.camelCase(b), b = b in d ? [b] : b.match(L) || []), c = b.length;while (c--) {
            delete d[b[c]];
          }
        }(void 0 === b || r.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando]);
      }
    }, hasData: function hasData(a) {
      var b = a[this.expando];return void 0 !== b && !r.isEmptyObject(b);
    } };var W = new V(),
      X = new V(),
      Y = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      Z = /[A-Z]/g;function $(a) {
    return "true" === a || "false" !== a && ("null" === a ? null : a === +a + "" ? +a : Y.test(a) ? JSON.parse(a) : a);
  }function _(a, b, c) {
    var d;if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(Z, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
      try {
        c = $(c);
      } catch (e) {}X.set(a, b, c);
    } else c = void 0;return c;
  }r.extend({ hasData: function hasData(a) {
      return X.hasData(a) || W.hasData(a);
    }, data: function data(a, b, c) {
      return X.access(a, b, c);
    }, removeData: function removeData(a, b) {
      X.remove(a, b);
    }, _data: function _data(a, b, c) {
      return W.access(a, b, c);
    }, _removeData: function _removeData(a, b) {
      W.remove(a, b);
    } }), r.fn.extend({ data: function data(a, b) {
      var c,
          d,
          e,
          f = this[0],
          g = f && f.attributes;if (void 0 === a) {
        if (this.length && (e = X.get(f), 1 === f.nodeType && !W.get(f, "hasDataAttrs"))) {
          c = g.length;while (c--) {
            g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = r.camelCase(d.slice(5)), _(f, d, e[d])));
          }W.set(f, "hasDataAttrs", !0);
        }return e;
      }return "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? this.each(function () {
        X.set(this, a);
      }) : T(this, function (b) {
        var c;if (f && void 0 === b) {
          if (c = X.get(f, a), void 0 !== c) return c;if (c = _(f, a), void 0 !== c) return c;
        } else this.each(function () {
          X.set(this, a, b);
        });
      }, null, b, arguments.length > 1, null, !0);
    }, removeData: function removeData(a) {
      return this.each(function () {
        X.remove(this, a);
      });
    } }), r.extend({ queue: function queue(a, b, c) {
      var d;if (a) return b = (b || "fx") + "queue", d = W.get(a, b), c && (!d || Array.isArray(c) ? d = W.access(a, b, r.makeArray(c)) : d.push(c)), d || [];
    }, dequeue: function dequeue(a, b) {
      b = b || "fx";var c = r.queue(a, b),
          d = c.length,
          e = c.shift(),
          f = r._queueHooks(a, b),
          g = function g() {
        r.dequeue(a, b);
      };"inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
    }, _queueHooks: function _queueHooks(a, b) {
      var c = b + "queueHooks";return W.get(a, c) || W.access(a, c, { empty: r.Callbacks("once memory").add(function () {
          W.remove(a, [b + "queue", c]);
        }) });
    } }), r.fn.extend({ queue: function queue(a, b) {
      var c = 2;return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? r.queue(this[0], a) : void 0 === b ? this : this.each(function () {
        var c = r.queue(this, a, b);r._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && r.dequeue(this, a);
      });
    }, dequeue: function dequeue(a) {
      return this.each(function () {
        r.dequeue(this, a);
      });
    }, clearQueue: function clearQueue(a) {
      return this.queue(a || "fx", []);
    }, promise: function promise(a, b) {
      var c,
          d = 1,
          e = r.Deferred(),
          f = this,
          g = this.length,
          h = function h() {
        --d || e.resolveWith(f, [f]);
      };"string" != typeof a && (b = a, a = void 0), a = a || "fx";while (g--) {
        c = W.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
      }return h(), e.promise(b);
    } });var aa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      ba = new RegExp("^(?:([+-])=|)(" + aa + ")([a-z%]*)$", "i"),
      ca = ["Top", "Right", "Bottom", "Left"],
      da = function da(a, b) {
    return a = b || a, "none" === a.style.display || "" === a.style.display && r.contains(a.ownerDocument, a) && "none" === r.css(a, "display");
  },
      ea = function ea(a, b, c, d) {
    var e,
        f,
        g = {};for (f in b) {
      g[f] = a.style[f], a.style[f] = b[f];
    }e = c.apply(a, d || []);for (f in b) {
      a.style[f] = g[f];
    }return e;
  };function fa(a, b, c, d) {
    var e,
        f = 1,
        g = 20,
        h = d ? function () {
      return d.cur();
    } : function () {
      return r.css(a, b, "");
    },
        i = h(),
        j = c && c[3] || (r.cssNumber[b] ? "" : "px"),
        k = (r.cssNumber[b] || "px" !== j && +i) && ba.exec(r.css(a, b));if (k && k[3] !== j) {
      j = j || k[3], c = c || [], k = +i || 1;do {
        f = f || ".5", k /= f, r.style(a, b, k + j);
      } while (f !== (f = h() / i) && 1 !== f && --g);
    }return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e;
  }var ga = {};function ha(a) {
    var b,
        c = a.ownerDocument,
        d = a.nodeName,
        e = ga[d];return e ? e : (b = c.body.appendChild(c.createElement(d)), e = r.css(b, "display"), b.parentNode.removeChild(b), "none" === e && (e = "block"), ga[d] = e, e);
  }function ia(a, b) {
    for (var c, d, e = [], f = 0, g = a.length; f < g; f++) {
      d = a[f], d.style && (c = d.style.display, b ? ("none" === c && (e[f] = W.get(d, "display") || null, e[f] || (d.style.display = "")), "" === d.style.display && da(d) && (e[f] = ha(d))) : "none" !== c && (e[f] = "none", W.set(d, "display", c)));
    }for (f = 0; f < g; f++) {
      null != e[f] && (a[f].style.display = e[f]);
    }return a;
  }r.fn.extend({ show: function show() {
      return ia(this, !0);
    }, hide: function hide() {
      return ia(this);
    }, toggle: function toggle(a) {
      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
        da(this) ? r(this).show() : r(this).hide();
      });
    } });var ja = /^(?:checkbox|radio)$/i,
      ka = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
      la = /^$|\/(?:java|ecma)script/i,
      ma = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };ma.optgroup = ma.option, ma.tbody = ma.tfoot = ma.colgroup = ma.caption = ma.thead, ma.th = ma.td;function na(a, b) {
    var c;return c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [], void 0 === b || b && B(a, b) ? r.merge([a], c) : c;
  }function oa(a, b) {
    for (var c = 0, d = a.length; c < d; c++) {
      W.set(a[c], "globalEval", !b || W.get(b[c], "globalEval"));
    }
  }var pa = /<|&#?\w+;/;function qa(a, b, c, d, e) {
    for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++) {
      if (f = a[n], f || 0 === f) if ("object" === r.type(f)) r.merge(m, f.nodeType ? [f] : f);else if (pa.test(f)) {
        g = g || l.appendChild(b.createElement("div")), h = (ka.exec(f) || ["", ""])[1].toLowerCase(), i = ma[h] || ma._default, g.innerHTML = i[1] + r.htmlPrefilter(f) + i[2], k = i[0];while (k--) {
          g = g.lastChild;
        }r.merge(m, g.childNodes), g = l.firstChild, g.textContent = "";
      } else m.push(b.createTextNode(f));
    }l.textContent = "", n = 0;while (f = m[n++]) {
      if (d && r.inArray(f, d) > -1) e && e.push(f);else if (j = r.contains(f.ownerDocument, f), g = na(l.appendChild(f), "script"), j && oa(g), c) {
        k = 0;while (f = g[k++]) {
          la.test(f.type || "") && c.push(f);
        }
      }
    }return l;
  }!function () {
    var a = d.createDocumentFragment(),
        b = a.appendChild(d.createElement("div")),
        c = d.createElement("input");c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), o.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", o.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
  }();var ra = d.documentElement,
      sa = /^key/,
      ta = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      ua = /^([^.]*)(?:\.(.+)|)/;function va() {
    return !0;
  }function wa() {
    return !1;
  }function xa() {
    try {
      return d.activeElement;
    } catch (a) {}
  }function ya(a, b, c, d, e, f) {
    var g, h;if ("object" == (typeof b === "undefined" ? "undefined" : _typeof(b))) {
      "string" != typeof c && (d = d || c, c = void 0);for (h in b) {
        ya(a, h, c, d, b[h], f);
      }return a;
    }if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = wa;else if (!e) return a;return 1 === f && (g = e, e = function e(a) {
      return r().off(a), g.apply(this, arguments);
    }, e.guid = g.guid || (g.guid = r.guid++)), a.each(function () {
      r.event.add(this, b, e, d, c);
    });
  }r.event = { global: {}, add: function add(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q = W.get(a);if (q) {
        c.handler && (f = c, c = f.handler, e = f.selector), e && r.find.matchesSelector(ra, e), c.guid || (c.guid = r.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function (b) {
          return "undefined" != typeof r && r.event.triggered !== b.type ? r.event.dispatch.apply(a, arguments) : void 0;
        }), b = (b || "").match(L) || [""], j = b.length;while (j--) {
          h = ua.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = r.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = r.event.special[n] || {}, k = r.extend({ type: n, origType: p, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && r.expr.match.needsContext.test(e), namespace: o.join(".") }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), r.event.global[n] = !0);
        }
      }
    }, remove: function remove(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q = W.hasData(a) && W.get(a);if (q && (i = q.events)) {
        b = (b || "").match(L) || [""], j = b.length;while (j--) {
          if (h = ua.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
            l = r.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;while (f--) {
              k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
            }g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || r.removeEvent(a, n, q.handle), delete i[n]);
          } else for (n in i) {
            r.event.remove(a, n + b[j], c, d, !0);
          }
        }r.isEmptyObject(i) && W.remove(a, "handle events");
      }
    }, dispatch: function dispatch(a) {
      var b = r.event.fix(a),
          c,
          d,
          e,
          f,
          g,
          h,
          i = new Array(arguments.length),
          j = (W.get(this, "events") || {})[b.type] || [],
          k = r.event.special[b.type] || {};for (i[0] = b, c = 1; c < arguments.length; c++) {
        i[c] = arguments[c];
      }if (b.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, b) !== !1) {
        h = r.event.handlers.call(this, b, j), c = 0;while ((f = h[c++]) && !b.isPropagationStopped()) {
          b.currentTarget = f.elem, d = 0;while ((g = f.handlers[d++]) && !b.isImmediatePropagationStopped()) {
            b.rnamespace && !b.rnamespace.test(g.namespace) || (b.handleObj = g, b.data = g.data, e = ((r.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (b.result = e) === !1 && (b.preventDefault(), b.stopPropagation()));
          }
        }return k.postDispatch && k.postDispatch.call(this, b), b.result;
      }
    }, handlers: function handlers(a, b) {
      var c,
          d,
          e,
          f,
          g,
          h = [],
          i = b.delegateCount,
          j = a.target;if (i && j.nodeType && !("click" === a.type && a.button >= 1)) for (; j !== this; j = j.parentNode || this) {
        if (1 === j.nodeType && ("click" !== a.type || j.disabled !== !0)) {
          for (f = [], g = {}, c = 0; c < i; c++) {
            d = b[c], e = d.selector + " ", void 0 === g[e] && (g[e] = d.needsContext ? r(e, this).index(j) > -1 : r.find(e, this, null, [j]).length), g[e] && f.push(d);
          }f.length && h.push({ elem: j, handlers: f });
        }
      }return j = this, i < b.length && h.push({ elem: j, handlers: b.slice(i) }), h;
    }, addProp: function addProp(a, b) {
      Object.defineProperty(r.Event.prototype, a, { enumerable: !0, configurable: !0, get: r.isFunction(b) ? function () {
          if (this.originalEvent) return b(this.originalEvent);
        } : function () {
          if (this.originalEvent) return this.originalEvent[a];
        }, set: function set(b) {
          Object.defineProperty(this, a, { enumerable: !0, configurable: !0, writable: !0, value: b });
        } });
    }, fix: function fix(a) {
      return a[r.expando] ? a : new r.Event(a);
    }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
          if (this !== xa() && this.focus) return this.focus(), !1;
        }, delegateType: "focusin" }, blur: { trigger: function trigger() {
          if (this === xa() && this.blur) return this.blur(), !1;
        }, delegateType: "focusout" }, click: { trigger: function trigger() {
          if ("checkbox" === this.type && this.click && B(this, "input")) return this.click(), !1;
        }, _default: function _default(a) {
          return B(a.target, "a");
        } }, beforeunload: { postDispatch: function postDispatch(a) {
          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
        } } } }, r.removeEvent = function (a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c);
  }, r.Event = function (a, b) {
    return this instanceof r.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? va : wa, this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, b && r.extend(this, b), this.timeStamp = a && a.timeStamp || r.now(), void (this[r.expando] = !0)) : new r.Event(a, b);
  }, r.Event.prototype = { constructor: r.Event, isDefaultPrevented: wa, isPropagationStopped: wa, isImmediatePropagationStopped: wa, isSimulated: !1, preventDefault: function preventDefault() {
      var a = this.originalEvent;this.isDefaultPrevented = va, a && !this.isSimulated && a.preventDefault();
    }, stopPropagation: function stopPropagation() {
      var a = this.originalEvent;this.isPropagationStopped = va, a && !this.isSimulated && a.stopPropagation();
    }, stopImmediatePropagation: function stopImmediatePropagation() {
      var a = this.originalEvent;this.isImmediatePropagationStopped = va, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation();
    } }, r.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, "char": !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function which(a) {
      var b = a.button;return null == a.which && sa.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && ta.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which;
    } }, r.event.addProp), r.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) {
    r.event.special[a] = { delegateType: b, bindType: b, handle: function handle(a) {
        var c,
            d = this,
            e = a.relatedTarget,
            f = a.handleObj;return e && (e === d || r.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
      } };
  }), r.fn.extend({ on: function on(a, b, c, d) {
      return ya(this, a, b, c, d);
    }, one: function one(a, b, c, d) {
      return ya(this, a, b, c, d, 1);
    }, off: function off(a, b, c) {
      var d, e;if (a && a.preventDefault && a.handleObj) return d = a.handleObj, r(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) {
        for (e in a) {
          this.off(e, b, a[e]);
        }return this;
      }return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = wa), this.each(function () {
        r.event.remove(this, a, c, b);
      });
    } });var za = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
      Aa = /<script|<style|<link/i,
      Ba = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Ca = /^true\/(.*)/,
      Da = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ea(a, b) {
    return B(a, "table") && B(11 !== b.nodeType ? b : b.firstChild, "tr") ? r(">tbody", a)[0] || a : a;
  }function Fa(a) {
    return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a;
  }function Ga(a) {
    var b = Ca.exec(a.type);return b ? a.type = b[1] : a.removeAttribute("type"), a;
  }function Ha(a, b) {
    var c, d, e, f, g, h, i, j;if (1 === b.nodeType) {
      if (W.hasData(a) && (f = W.access(a), g = W.set(b, f), j = f.events)) {
        delete g.handle, g.events = {};for (e in j) {
          for (c = 0, d = j[e].length; c < d; c++) {
            r.event.add(b, e, j[e][c]);
          }
        }
      }X.hasData(a) && (h = X.access(a), i = r.extend({}, h), X.set(b, i));
    }
  }function Ia(a, b) {
    var c = b.nodeName.toLowerCase();"input" === c && ja.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue);
  }function Ja(a, b, c, d) {
    b = g.apply([], b);var e,
        f,
        h,
        i,
        j,
        k,
        l = 0,
        m = a.length,
        n = m - 1,
        q = b[0],
        s = r.isFunction(q);if (s || m > 1 && "string" == typeof q && !o.checkClone && Ba.test(q)) return a.each(function (e) {
      var f = a.eq(e);s && (b[0] = q.call(this, e, f.html())), Ja(f, b, c, d);
    });if (m && (e = qa(b, a[0].ownerDocument, !1, a, d), f = e.firstChild, 1 === e.childNodes.length && (e = f), f || d)) {
      for (h = r.map(na(e, "script"), Fa), i = h.length; l < m; l++) {
        j = e, l !== n && (j = r.clone(j, !0, !0), i && r.merge(h, na(j, "script"))), c.call(a[l], j, l);
      }if (i) for (k = h[h.length - 1].ownerDocument, r.map(h, Ga), l = 0; l < i; l++) {
        j = h[l], la.test(j.type || "") && !W.access(j, "globalEval") && r.contains(k, j) && (j.src ? r._evalUrl && r._evalUrl(j.src) : p(j.textContent.replace(Da, ""), k));
      }
    }return a;
  }function Ka(a, b, c) {
    for (var d, e = b ? r.filter(b, a) : a, f = 0; null != (d = e[f]); f++) {
      c || 1 !== d.nodeType || r.cleanData(na(d)), d.parentNode && (c && r.contains(d.ownerDocument, d) && oa(na(d, "script")), d.parentNode.removeChild(d));
    }return a;
  }r.extend({ htmlPrefilter: function htmlPrefilter(a) {
      return a.replace(za, "<$1></$2>");
    }, clone: function clone(a, b, c) {
      var d,
          e,
          f,
          g,
          h = a.cloneNode(!0),
          i = r.contains(a.ownerDocument, a);if (!(o.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || r.isXMLDoc(a))) for (g = na(h), f = na(a), d = 0, e = f.length; d < e; d++) {
        Ia(f[d], g[d]);
      }if (b) if (c) for (f = f || na(a), g = g || na(h), d = 0, e = f.length; d < e; d++) {
        Ha(f[d], g[d]);
      } else Ha(a, h);return g = na(h, "script"), g.length > 0 && oa(g, !i && na(a, "script")), h;
    }, cleanData: function cleanData(a) {
      for (var b, c, d, e = r.event.special, f = 0; void 0 !== (c = a[f]); f++) {
        if (U(c)) {
          if (b = c[W.expando]) {
            if (b.events) for (d in b.events) {
              e[d] ? r.event.remove(c, d) : r.removeEvent(c, d, b.handle);
            }c[W.expando] = void 0;
          }c[X.expando] && (c[X.expando] = void 0);
        }
      }
    } }), r.fn.extend({ detach: function detach(a) {
      return Ka(this, a, !0);
    }, remove: function remove(a) {
      return Ka(this, a);
    }, text: function text(a) {
      return T(this, function (a) {
        return void 0 === a ? r.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a);
        });
      }, null, a, arguments.length);
    }, append: function append() {
      return Ja(this, arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = Ea(this, a);b.appendChild(a);
        }
      });
    }, prepend: function prepend() {
      return Ja(this, arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = Ea(this, a);b.insertBefore(a, b.firstChild);
        }
      });
    }, before: function before() {
      return Ja(this, arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this);
      });
    }, after: function after() {
      return Ja(this, arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
      });
    }, empty: function empty() {
      for (var a, b = 0; null != (a = this[b]); b++) {
        1 === a.nodeType && (r.cleanData(na(a, !1)), a.textContent = "");
      }return this;
    }, clone: function clone(a, b) {
      return a = null != a && a, b = null == b ? a : b, this.map(function () {
        return r.clone(this, a, b);
      });
    }, html: function html(a) {
      return T(this, function (a) {
        var b = this[0] || {},
            c = 0,
            d = this.length;if (void 0 === a && 1 === b.nodeType) return b.innerHTML;if ("string" == typeof a && !Aa.test(a) && !ma[(ka.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = r.htmlPrefilter(a);try {
            for (; c < d; c++) {
              b = this[c] || {}, 1 === b.nodeType && (r.cleanData(na(b, !1)), b.innerHTML = a);
            }b = 0;
          } catch (e) {}
        }b && this.empty().append(a);
      }, null, a, arguments.length);
    }, replaceWith: function replaceWith() {
      var a = [];return Ja(this, arguments, function (b) {
        var c = this.parentNode;r.inArray(this, a) < 0 && (r.cleanData(na(this)), c && c.replaceChild(b, this));
      }, a);
    } }), r.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) {
    r.fn[a] = function (a) {
      for (var c, d = [], e = r(a), f = e.length - 1, g = 0; g <= f; g++) {
        c = g === f ? this : this.clone(!0), r(e[g])[b](c), h.apply(d, c.get());
      }return this.pushStack(d);
    };
  });var La = /^margin/,
      Ma = new RegExp("^(" + aa + ")(?!px)[a-z%]+$", "i"),
      Na = function Na(b) {
    var c = b.ownerDocument.defaultView;return c && c.opener || (c = a), c.getComputedStyle(b);
  };!function () {
    function b() {
      if (i) {
        i.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i.innerHTML = "", ra.appendChild(h);var b = a.getComputedStyle(i);c = "1%" !== b.top, g = "2px" === b.marginLeft, e = "4px" === b.width, i.style.marginRight = "50%", f = "4px" === b.marginRight, ra.removeChild(h), i = null;
      }
    }var c,
        e,
        f,
        g,
        h = d.createElement("div"),
        i = d.createElement("div");i.style && (i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", o.clearCloneStyle = "content-box" === i.style.backgroundClip, h.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", h.appendChild(i), r.extend(o, { pixelPosition: function pixelPosition() {
        return b(), c;
      }, boxSizingReliable: function boxSizingReliable() {
        return b(), e;
      }, pixelMarginRight: function pixelMarginRight() {
        return b(), f;
      }, reliableMarginLeft: function reliableMarginLeft() {
        return b(), g;
      } }));
  }();function Oa(a, b, c) {
    var d,
        e,
        f,
        g,
        h = a.style;return c = c || Na(a), c && (g = c.getPropertyValue(b) || c[b], "" !== g || r.contains(a.ownerDocument, a) || (g = r.style(a, b)), !o.pixelMarginRight() && Ma.test(g) && La.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g;
  }function Pa(a, b) {
    return { get: function get() {
        return a() ? void delete this.get : (this.get = b).apply(this, arguments);
      } };
  }var Qa = /^(none|table(?!-c[ea]).+)/,
      Ra = /^--/,
      Sa = { position: "absolute", visibility: "hidden", display: "block" },
      Ta = { letterSpacing: "0", fontWeight: "400" },
      Ua = ["Webkit", "Moz", "ms"],
      Va = d.createElement("div").style;function Wa(a) {
    if (a in Va) return a;var b = a[0].toUpperCase() + a.slice(1),
        c = Ua.length;while (c--) {
      if (a = Ua[c] + b, a in Va) return a;
    }
  }function Xa(a) {
    var b = r.cssProps[a];return b || (b = r.cssProps[a] = Wa(a) || a), b;
  }function Ya(a, b, c) {
    var d = ba.exec(b);return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b;
  }function Za(a, b, c, d, e) {
    var f,
        g = 0;for (f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0; f < 4; f += 2) {
      "margin" === c && (g += r.css(a, c + ca[f], !0, e)), d ? ("content" === c && (g -= r.css(a, "padding" + ca[f], !0, e)), "margin" !== c && (g -= r.css(a, "border" + ca[f] + "Width", !0, e))) : (g += r.css(a, "padding" + ca[f], !0, e), "padding" !== c && (g += r.css(a, "border" + ca[f] + "Width", !0, e)));
    }return g;
  }function $a(a, b, c) {
    var d,
        e = Na(a),
        f = Oa(a, b, e),
        g = "border-box" === r.css(a, "boxSizing", !1, e);return Ma.test(f) ? f : (d = g && (o.boxSizingReliable() || f === a.style[b]), "auto" === f && (f = a["offset" + b[0].toUpperCase() + b.slice(1)]), f = parseFloat(f) || 0, f + Za(a, b, c || (g ? "border" : "content"), d, e) + "px");
  }r.extend({ cssHooks: { opacity: { get: function get(a, b) {
          if (b) {
            var c = Oa(a, "opacity");return "" === c ? "1" : c;
          }
        } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": "cssFloat" }, style: function style(a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e,
            f,
            g,
            h = r.camelCase(b),
            i = Ra.test(b),
            j = a.style;return i || (b = Xa(h)), g = r.cssHooks[b] || r.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : j[b] : (f = typeof c === "undefined" ? "undefined" : _typeof(c), "string" === f && (e = ba.exec(c)) && e[1] && (c = fa(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (r.cssNumber[h] ? "" : "px")), o.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (j[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i ? j.setProperty(b, c) : j[b] = c)), void 0);
      }
    }, css: function css(a, b, c, d) {
      var e,
          f,
          g,
          h = r.camelCase(b),
          i = Ra.test(b);return i || (b = Xa(h)), g = r.cssHooks[b] || r.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = Oa(a, b, d)), "normal" === e && b in Ta && (e = Ta[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e;
    } }), r.each(["height", "width"], function (a, b) {
    r.cssHooks[b] = { get: function get(a, c, d) {
        if (c) return !Qa.test(r.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? $a(a, b, d) : ea(a, Sa, function () {
          return $a(a, b, d);
        });
      }, set: function set(a, c, d) {
        var e,
            f = d && Na(a),
            g = d && Za(a, b, d, "border-box" === r.css(a, "boxSizing", !1, f), f);return g && (e = ba.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = r.css(a, b)), Ya(a, c, g);
      } };
  }), r.cssHooks.marginLeft = Pa(o.reliableMarginLeft, function (a, b) {
    if (b) return (parseFloat(Oa(a, "marginLeft")) || a.getBoundingClientRect().left - ea(a, { marginLeft: 0 }, function () {
      return a.getBoundingClientRect().left;
    })) + "px";
  }), r.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
    r.cssHooks[a + b] = { expand: function expand(c) {
        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) {
          e[a + ca[d] + b] = f[d] || f[d - 2] || f[0];
        }return e;
      } }, La.test(a) || (r.cssHooks[a + b].set = Ya);
  }), r.fn.extend({ css: function css(a, b) {
      return T(this, function (a, b, c) {
        var d,
            e,
            f = {},
            g = 0;if (Array.isArray(b)) {
          for (d = Na(a), e = b.length; g < e; g++) {
            f[b[g]] = r.css(a, b[g], !1, d);
          }return f;
        }return void 0 !== c ? r.style(a, b, c) : r.css(a, b);
      }, a, b, arguments.length > 1);
    } });function _a(a, b, c, d, e) {
    return new _a.prototype.init(a, b, c, d, e);
  }r.Tween = _a, _a.prototype = { constructor: _a, init: function init(a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || r.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (r.cssNumber[c] ? "" : "px");
    }, cur: function cur() {
      var a = _a.propHooks[this.prop];return a && a.get ? a.get(this) : _a.propHooks._default.get(this);
    }, run: function run(a) {
      var b,
          c = _a.propHooks[this.prop];return this.options.duration ? this.pos = b = r.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : _a.propHooks._default.set(this), this;
    } }, _a.prototype.init.prototype = _a.prototype, _a.propHooks = { _default: { get: function get(a) {
        var b;return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = r.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0);
      }, set: function set(a) {
        r.fx.step[a.prop] ? r.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[r.cssProps[a.prop]] && !r.cssHooks[a.prop] ? a.elem[a.prop] = a.now : r.style(a.elem, a.prop, a.now + a.unit);
      } } }, _a.propHooks.scrollTop = _a.propHooks.scrollLeft = { set: function set(a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
    } }, r.easing = { linear: function linear(a) {
      return a;
    }, swing: function swing(a) {
      return .5 - Math.cos(a * Math.PI) / 2;
    }, _default: "swing" }, r.fx = _a.prototype.init, r.fx.step = {};var ab,
      bb,
      cb = /^(?:toggle|show|hide)$/,
      db = /queueHooks$/;function eb() {
    bb && (d.hidden === !1 && a.requestAnimationFrame ? a.requestAnimationFrame(eb) : a.setTimeout(eb, r.fx.interval), r.fx.tick());
  }function fb() {
    return a.setTimeout(function () {
      ab = void 0;
    }), ab = r.now();
  }function gb(a, b) {
    var c,
        d = 0,
        e = { height: a };for (b = b ? 1 : 0; d < 4; d += 2 - b) {
      c = ca[d], e["margin" + c] = e["padding" + c] = a;
    }return b && (e.opacity = e.width = a), e;
  }function hb(a, b, c) {
    for (var d, e = (kb.tweeners[b] || []).concat(kb.tweeners["*"]), f = 0, g = e.length; f < g; f++) {
      if (d = e[f].call(c, b, a)) return d;
    }
  }function ib(a, b, c) {
    var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l = "width" in b || "height" in b,
        m = this,
        n = {},
        o = a.style,
        p = a.nodeType && da(a),
        q = W.get(a, "fxshow");c.queue || (g = r._queueHooks(a, "fx"), null == g.unqueued && (g.unqueued = 0, h = g.empty.fire, g.empty.fire = function () {
      g.unqueued || h();
    }), g.unqueued++, m.always(function () {
      m.always(function () {
        g.unqueued--, r.queue(a, "fx").length || g.empty.fire();
      });
    }));for (d in b) {
      if (e = b[d], cb.test(e)) {
        if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
          if ("show" !== e || !q || void 0 === q[d]) continue;p = !0;
        }n[d] = q && q[d] || r.style(a, d);
      }
    }if (i = !r.isEmptyObject(b), i || !r.isEmptyObject(n)) {
      l && 1 === a.nodeType && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = q && q.display, null == j && (j = W.get(a, "display")), k = r.css(a, "display"), "none" === k && (j ? k = j : (ia([a], !0), j = a.style.display || j, k = r.css(a, "display"), ia([a]))), ("inline" === k || "inline-block" === k && null != j) && "none" === r.css(a, "float") && (i || (m.done(function () {
        o.display = j;
      }), null == j && (k = o.display, j = "none" === k ? "" : k)), o.display = "inline-block")), c.overflow && (o.overflow = "hidden", m.always(function () {
        o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2];
      })), i = !1;for (d in n) {
        i || (q ? "hidden" in q && (p = q.hidden) : q = W.access(a, "fxshow", { display: j }), f && (q.hidden = !p), p && ia([a], !0), m.done(function () {
          p || ia([a]), W.remove(a, "fxshow");for (d in n) {
            r.style(a, d, n[d]);
          }
        })), i = hb(p ? q[d] : 0, d, m), d in q || (q[d] = i.start, p && (i.end = i.start, i.start = 0));
      }
    }
  }function jb(a, b) {
    var c, d, e, f, g;for (c in a) {
      if (d = r.camelCase(c), e = b[d], f = a[c], Array.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = r.cssHooks[d], g && "expand" in g) {
        f = g.expand(f), delete a[d];for (c in f) {
          c in a || (a[c] = f[c], b[c] = e);
        }
      } else b[d] = e;
    }
  }function kb(a, b, c) {
    var d,
        e,
        f = 0,
        g = kb.prefilters.length,
        h = r.Deferred().always(function () {
      delete i.elem;
    }),
        i = function i() {
      if (e) return !1;for (var b = ab || fb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) {
        j.tweens[g].run(f);
      }return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (i || h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j]), !1);
    },
        j = h.promise({ elem: a, props: r.extend({}, b), opts: r.extend(!0, { specialEasing: {}, easing: r.easing._default }, c), originalProperties: b, originalOptions: c, startTime: ab || fb(), duration: c.duration, tweens: [], createTween: function createTween(b, c) {
        var d = r.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);return j.tweens.push(d), d;
      }, stop: function stop(b) {
        var c = 0,
            d = b ? j.tweens.length : 0;if (e) return this;for (e = !0; c < d; c++) {
          j.tweens[c].run(1);
        }return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this;
      } }),
        k = j.props;for (jb(k, j.opts.specialEasing); f < g; f++) {
      if (d = kb.prefilters[f].call(j, a, k, j.opts)) return r.isFunction(d.stop) && (r._queueHooks(j.elem, j.opts.queue).stop = r.proxy(d.stop, d)), d;
    }return r.map(k, hb, j), r.isFunction(j.opts.start) && j.opts.start.call(a, j), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always), r.fx.timer(r.extend(i, { elem: a, anim: j, queue: j.opts.queue })), j;
  }r.Animation = r.extend(kb, { tweeners: { "*": [function (a, b) {
        var c = this.createTween(a, b);return fa(c.elem, a, ba.exec(b), c), c;
      }] }, tweener: function tweener(a, b) {
      r.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(L);for (var c, d = 0, e = a.length; d < e; d++) {
        c = a[d], kb.tweeners[c] = kb.tweeners[c] || [], kb.tweeners[c].unshift(b);
      }
    }, prefilters: [ib], prefilter: function prefilter(a, b) {
      b ? kb.prefilters.unshift(a) : kb.prefilters.push(a);
    } }), r.speed = function (a, b, c) {
    var d = a && "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? r.extend({}, a) : { complete: c || !c && b || r.isFunction(a) && a, duration: a, easing: c && b || b && !r.isFunction(b) && b };return r.fx.off ? d.duration = 0 : "number" != typeof d.duration && (d.duration in r.fx.speeds ? d.duration = r.fx.speeds[d.duration] : d.duration = r.fx.speeds._default), null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function () {
      r.isFunction(d.old) && d.old.call(this), d.queue && r.dequeue(this, d.queue);
    }, d;
  }, r.fn.extend({ fadeTo: function fadeTo(a, b, c, d) {
      return this.filter(da).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d);
    }, animate: function animate(a, b, c, d) {
      var e = r.isEmptyObject(a),
          f = r.speed(b, c, d),
          g = function g() {
        var b = kb(this, r.extend({}, a), f);(e || W.get(this, "finish")) && b.stop(!0);
      };return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
    }, stop: function stop(a, b, c) {
      var d = function d(a) {
        var b = a.stop;delete a.stop, b(c);
      };return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
        var b = !0,
            e = null != a && a + "queueHooks",
            f = r.timers,
            g = W.get(this);if (e) g[e] && g[e].stop && d(g[e]);else for (e in g) {
          g[e] && g[e].stop && db.test(e) && d(g[e]);
        }for (e = f.length; e--;) {
          f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
        }!b && c || r.dequeue(this, a);
      });
    }, finish: function finish(a) {
      return a !== !1 && (a = a || "fx"), this.each(function () {
        var b,
            c = W.get(this),
            d = c[a + "queue"],
            e = c[a + "queueHooks"],
            f = r.timers,
            g = d ? d.length : 0;for (c.finish = !0, r.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) {
          f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
        }for (b = 0; b < g; b++) {
          d[b] && d[b].finish && d[b].finish.call(this);
        }delete c.finish;
      });
    } }), r.each(["toggle", "show", "hide"], function (a, b) {
    var c = r.fn[b];r.fn[b] = function (a, d, e) {
      return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gb(b, !0), a, d, e);
    };
  }), r.each({ slideDown: gb("show"), slideUp: gb("hide"), slideToggle: gb("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) {
    r.fn[a] = function (a, c, d) {
      return this.animate(b, a, c, d);
    };
  }), r.timers = [], r.fx.tick = function () {
    var a,
        b = 0,
        c = r.timers;for (ab = r.now(); b < c.length; b++) {
      a = c[b], a() || c[b] !== a || c.splice(b--, 1);
    }c.length || r.fx.stop(), ab = void 0;
  }, r.fx.timer = function (a) {
    r.timers.push(a), r.fx.start();
  }, r.fx.interval = 13, r.fx.start = function () {
    bb || (bb = !0, eb());
  }, r.fx.stop = function () {
    bb = null;
  }, r.fx.speeds = { slow: 600, fast: 200, _default: 400 }, r.fn.delay = function (b, c) {
    return b = r.fx ? r.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) {
      var e = a.setTimeout(c, b);d.stop = function () {
        a.clearTimeout(e);
      };
    });
  }, function () {
    var a = d.createElement("input"),
        b = d.createElement("select"),
        c = b.appendChild(d.createElement("option"));a.type = "checkbox", o.checkOn = "" !== a.value, o.optSelected = c.selected, a = d.createElement("input"), a.value = "t", a.type = "radio", o.radioValue = "t" === a.value;
  }();var lb,
      mb = r.expr.attrHandle;r.fn.extend({ attr: function attr(a, b) {
      return T(this, r.attr, a, b, arguments.length > 1);
    }, removeAttr: function removeAttr(a) {
      return this.each(function () {
        r.removeAttr(this, a);
      });
    } }), r.extend({ attr: function attr(a, b, c) {
      var d,
          e,
          f = a.nodeType;if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? r.prop(a, b, c) : (1 === f && r.isXMLDoc(a) || (e = r.attrHooks[b.toLowerCase()] || (r.expr.match.bool.test(b) ? lb : void 0)), void 0 !== c ? null === c ? void r.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = r.find.attr(a, b), null == d ? void 0 : d));
    }, attrHooks: { type: { set: function set(a, b) {
          if (!o.radioValue && "radio" === b && B(a, "input")) {
            var c = a.value;return a.setAttribute("type", b), c && (a.value = c), b;
          }
        } } }, removeAttr: function removeAttr(a, b) {
      var c,
          d = 0,
          e = b && b.match(L);if (e && 1 === a.nodeType) while (c = e[d++]) {
        a.removeAttribute(c);
      }
    } }), lb = { set: function set(a, b, c) {
      return b === !1 ? r.removeAttr(a, c) : a.setAttribute(c, c), c;
    } }, r.each(r.expr.match.bool.source.match(/\w+/g), function (a, b) {
    var c = mb[b] || r.find.attr;mb[b] = function (a, b, d) {
      var e,
          f,
          g = b.toLowerCase();return d || (f = mb[g], mb[g] = e, e = null != c(a, b, d) ? g : null, mb[g] = f), e;
    };
  });var nb = /^(?:input|select|textarea|button)$/i,
      ob = /^(?:a|area)$/i;r.fn.extend({ prop: function prop(a, b) {
      return T(this, r.prop, a, b, arguments.length > 1);
    }, removeProp: function removeProp(a) {
      return this.each(function () {
        delete this[r.propFix[a] || a];
      });
    } }), r.extend({ prop: function prop(a, b, c) {
      var d,
          e,
          f = a.nodeType;if (3 !== f && 8 !== f && 2 !== f) return 1 === f && r.isXMLDoc(a) || (b = r.propFix[b] || b, e = r.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
    }, propHooks: { tabIndex: { get: function get(a) {
          var b = r.find.attr(a, "tabindex");return b ? parseInt(b, 10) : nb.test(a.nodeName) || ob.test(a.nodeName) && a.href ? 0 : -1;
        } } }, propFix: { "for": "htmlFor", "class": "className" } }), o.optSelected || (r.propHooks.selected = { get: function get(a) {
      var b = a.parentNode;return b && b.parentNode && b.parentNode.selectedIndex, null;
    }, set: function set(a) {
      var b = a.parentNode;b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
    } }), r.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    r.propFix[this.toLowerCase()] = this;
  });function pb(a) {
    var b = a.match(L) || [];return b.join(" ");
  }function qb(a) {
    return a.getAttribute && a.getAttribute("class") || "";
  }r.fn.extend({ addClass: function addClass(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = 0;if (r.isFunction(a)) return this.each(function (b) {
        r(this).addClass(a.call(this, b, qb(this)));
      });if ("string" == typeof a && a) {
        b = a.match(L) || [];while (c = this[i++]) {
          if (e = qb(c), d = 1 === c.nodeType && " " + pb(e) + " ") {
            g = 0;while (f = b[g++]) {
              d.indexOf(" " + f + " ") < 0 && (d += f + " ");
            }h = pb(d), e !== h && c.setAttribute("class", h);
          }
        }
      }return this;
    }, removeClass: function removeClass(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = 0;if (r.isFunction(a)) return this.each(function (b) {
        r(this).removeClass(a.call(this, b, qb(this)));
      });if (!arguments.length) return this.attr("class", "");if ("string" == typeof a && a) {
        b = a.match(L) || [];while (c = this[i++]) {
          if (e = qb(c), d = 1 === c.nodeType && " " + pb(e) + " ") {
            g = 0;while (f = b[g++]) {
              while (d.indexOf(" " + f + " ") > -1) {
                d = d.replace(" " + f + " ", " ");
              }
            }h = pb(d), e !== h && c.setAttribute("class", h);
          }
        }
      }return this;
    }, toggleClass: function toggleClass(a, b) {
      var c = typeof a === "undefined" ? "undefined" : _typeof(a);return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : r.isFunction(a) ? this.each(function (c) {
        r(this).toggleClass(a.call(this, c, qb(this), b), b);
      }) : this.each(function () {
        var b, d, e, f;if ("string" === c) {
          d = 0, e = r(this), f = a.match(L) || [];while (b = f[d++]) {
            e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
          }
        } else void 0 !== a && "boolean" !== c || (b = qb(this), b && W.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : W.get(this, "__className__") || ""));
      });
    }, hasClass: function hasClass(a) {
      var b,
          c,
          d = 0;b = " " + a + " ";while (c = this[d++]) {
        if (1 === c.nodeType && (" " + pb(qb(c)) + " ").indexOf(b) > -1) return !0;
      }return !1;
    } });var rb = /\r/g;r.fn.extend({ val: function val(a) {
      var b,
          c,
          d,
          e = this[0];{
        if (arguments.length) return d = r.isFunction(a), this.each(function (c) {
          var e;1 === this.nodeType && (e = d ? a.call(this, c, r(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = r.map(e, function (a) {
            return null == a ? "" : a + "";
          })), b = r.valHooks[this.type] || r.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
        });if (e) return b = r.valHooks[e.type] || r.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(rb, "") : null == c ? "" : c);
      }
    } }), r.extend({ valHooks: { option: { get: function get(a) {
          var b = r.find.attr(a, "value");return null != b ? b : pb(r.text(a));
        } }, select: { get: function get(a) {
          var b,
              c,
              d,
              e = a.options,
              f = a.selectedIndex,
              g = "select-one" === a.type,
              h = g ? null : [],
              i = g ? f + 1 : e.length;for (d = f < 0 ? i : g ? f : 0; d < i; d++) {
            if (c = e[d], (c.selected || d === f) && !c.disabled && (!c.parentNode.disabled || !B(c.parentNode, "optgroup"))) {
              if (b = r(c).val(), g) return b;h.push(b);
            }
          }return h;
        }, set: function set(a, b) {
          var c,
              d,
              e = a.options,
              f = r.makeArray(b),
              g = e.length;while (g--) {
            d = e[g], (d.selected = r.inArray(r.valHooks.option.get(d), f) > -1) && (c = !0);
          }return c || (a.selectedIndex = -1), f;
        } } } }), r.each(["radio", "checkbox"], function () {
    r.valHooks[this] = { set: function set(a, b) {
        if (Array.isArray(b)) return a.checked = r.inArray(r(a).val(), b) > -1;
      } }, o.checkOn || (r.valHooks[this].get = function (a) {
      return null === a.getAttribute("value") ? "on" : a.value;
    });
  });var sb = /^(?:focusinfocus|focusoutblur)$/;r.extend(r.event, { trigger: function trigger(b, c, e, f) {
      var g,
          h,
          i,
          j,
          k,
          m,
          n,
          o = [e || d],
          p = l.call(b, "type") ? b.type : b,
          q = l.call(b, "namespace") ? b.namespace.split(".") : [];if (h = i = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !sb.test(p + r.event.triggered) && (p.indexOf(".") > -1 && (q = p.split("."), p = q.shift(), q.sort()), k = p.indexOf(":") < 0 && "on" + p, b = b[r.expando] ? b : new r.Event(p, "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b), b.isTrigger = f ? 2 : 3, b.namespace = q.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : r.makeArray(c, [b]), n = r.event.special[p] || {}, f || !n.trigger || n.trigger.apply(e, c) !== !1)) {
        if (!f && !n.noBubble && !r.isWindow(e)) {
          for (j = n.delegateType || p, sb.test(j + p) || (h = h.parentNode); h; h = h.parentNode) {
            o.push(h), i = h;
          }i === (e.ownerDocument || d) && o.push(i.defaultView || i.parentWindow || a);
        }g = 0;while ((h = o[g++]) && !b.isPropagationStopped()) {
          b.type = g > 1 ? j : n.bindType || p, m = (W.get(h, "events") || {})[b.type] && W.get(h, "handle"), m && m.apply(h, c), m = k && h[k], m && m.apply && U(h) && (b.result = m.apply(h, c), b.result === !1 && b.preventDefault());
        }return b.type = p, f || b.isDefaultPrevented() || n._default && n._default.apply(o.pop(), c) !== !1 || !U(e) || k && r.isFunction(e[p]) && !r.isWindow(e) && (i = e[k], i && (e[k] = null), r.event.triggered = p, e[p](), r.event.triggered = void 0, i && (e[k] = i)), b.result;
      }
    }, simulate: function simulate(a, b, c) {
      var d = r.extend(new r.Event(), c, { type: a, isSimulated: !0 });r.event.trigger(d, null, b);
    } }), r.fn.extend({ trigger: function trigger(a, b) {
      return this.each(function () {
        r.event.trigger(a, b, this);
      });
    }, triggerHandler: function triggerHandler(a, b) {
      var c = this[0];if (c) return r.event.trigger(a, b, c, !0);
    } }), r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (a, b) {
    r.fn[b] = function (a, c) {
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
    };
  }), r.fn.extend({ hover: function hover(a, b) {
      return this.mouseenter(a).mouseleave(b || a);
    } }), o.focusin = "onfocusin" in a, o.focusin || r.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
    var c = function c(a) {
      r.event.simulate(b, a.target, r.event.fix(a));
    };r.event.special[b] = { setup: function setup() {
        var d = this.ownerDocument || this,
            e = W.access(d, b);e || d.addEventListener(a, c, !0), W.access(d, b, (e || 0) + 1);
      }, teardown: function teardown() {
        var d = this.ownerDocument || this,
            e = W.access(d, b) - 1;e ? W.access(d, b, e) : (d.removeEventListener(a, c, !0), W.remove(d, b));
      } };
  });var tb = a.location,
      ub = r.now(),
      vb = /\?/;r.parseXML = function (b) {
    var c;if (!b || "string" != typeof b) return null;try {
      c = new a.DOMParser().parseFromString(b, "text/xml");
    } catch (d) {
      c = void 0;
    }return c && !c.getElementsByTagName("parsererror").length || r.error("Invalid XML: " + b), c;
  };var wb = /\[\]$/,
      xb = /\r?\n/g,
      yb = /^(?:submit|button|image|reset|file)$/i,
      zb = /^(?:input|select|textarea|keygen)/i;function Ab(a, b, c, d) {
    var e;if (Array.isArray(b)) r.each(b, function (b, e) {
      c || wb.test(a) ? d(a, e) : Ab(a + "[" + ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null != e ? b : "") + "]", e, c, d);
    });else if (c || "object" !== r.type(b)) d(a, b);else for (e in b) {
      Ab(a + "[" + e + "]", b[e], c, d);
    }
  }r.param = function (a, b) {
    var c,
        d = [],
        e = function e(a, b) {
      var c = r.isFunction(b) ? b() : b;d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c);
    };if (Array.isArray(a) || a.jquery && !r.isPlainObject(a)) r.each(a, function () {
      e(this.name, this.value);
    });else for (c in a) {
      Ab(c, a[c], b, e);
    }return d.join("&");
  }, r.fn.extend({ serialize: function serialize() {
      return r.param(this.serializeArray());
    }, serializeArray: function serializeArray() {
      return this.map(function () {
        var a = r.prop(this, "elements");return a ? r.makeArray(a) : this;
      }).filter(function () {
        var a = this.type;return this.name && !r(this).is(":disabled") && zb.test(this.nodeName) && !yb.test(a) && (this.checked || !ja.test(a));
      }).map(function (a, b) {
        var c = r(this).val();return null == c ? null : Array.isArray(c) ? r.map(c, function (a) {
          return { name: b.name, value: a.replace(xb, "\r\n") };
        }) : { name: b.name, value: c.replace(xb, "\r\n") };
      }).get();
    } });var Bb = /%20/g,
      Cb = /#.*$/,
      Db = /([?&])_=[^&]*/,
      Eb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Fb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      Gb = /^(?:GET|HEAD)$/,
      Hb = /^\/\//,
      Ib = {},
      Jb = {},
      Kb = "*/".concat("*"),
      Lb = d.createElement("a");Lb.href = tb.href;function Mb(a) {
    return function (b, c) {
      "string" != typeof b && (c = b, b = "*");var d,
          e = 0,
          f = b.toLowerCase().match(L) || [];if (r.isFunction(c)) while (d = f[e++]) {
        "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
      }
    };
  }function Nb(a, b, c, d) {
    var e = {},
        f = a === Jb;function g(h) {
      var i;return e[h] = !0, r.each(a[h] || [], function (a, h) {
        var j = h(b, c, d);return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1);
      }), i;
    }return g(b.dataTypes[0]) || !e["*"] && g("*");
  }function Ob(a, b) {
    var c,
        d,
        e = r.ajaxSettings.flatOptions || {};for (c in b) {
      void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
    }return d && r.extend(!0, a, d), a;
  }function Pb(a, b, c) {
    var d,
        e,
        f,
        g,
        h = a.contents,
        i = a.dataTypes;while ("*" === i[0]) {
      i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
    }if (d) for (e in h) {
      if (h[e] && h[e].test(d)) {
        i.unshift(e);break;
      }
    }if (i[0] in c) f = i[0];else {
      for (e in c) {
        if (!i[0] || a.converters[e + " " + i[0]]) {
          f = e;break;
        }g || (g = e);
      }f = f || g;
    }if (f) return f !== i[0] && i.unshift(f), c[f];
  }function Qb(a, b, c, d) {
    var e,
        f,
        g,
        h,
        i,
        j = {},
        k = a.dataTypes.slice();if (k[1]) for (g in a.converters) {
      j[g.toLowerCase()] = a.converters[g];
    }f = k.shift();while (f) {
      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i;else if ("*" !== i && i !== f) {
        if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) {
          if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));break;
          }
        }if (g !== !0) if (g && a["throws"]) b = g(b);else try {
          b = g(b);
        } catch (l) {
          return { state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f };
        }
      }
    }return { state: "success", data: b };
  }r.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: tb.href, type: "GET", isLocal: Fb.test(tb.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Kb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": r.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(a, b) {
      return b ? Ob(Ob(a, r.ajaxSettings), b) : Ob(r.ajaxSettings, a);
    }, ajaxPrefilter: Mb(Ib), ajaxTransport: Mb(Jb), ajax: function ajax(b, c) {
      "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && (c = b, b = void 0), c = c || {};var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o = r.ajaxSetup({}, c),
          p = o.context || o,
          q = o.context && (p.nodeType || p.jquery) ? r(p) : r.event,
          s = r.Deferred(),
          t = r.Callbacks("once memory"),
          u = o.statusCode || {},
          v = {},
          w = {},
          x = "canceled",
          y = { readyState: 0, getResponseHeader: function getResponseHeader(a) {
          var b;if (k) {
            if (!h) {
              h = {};while (b = Eb.exec(g)) {
                h[b[1].toLowerCase()] = b[2];
              }
            }b = h[a.toLowerCase()];
          }return null == b ? null : b;
        }, getAllResponseHeaders: function getAllResponseHeaders() {
          return k ? g : null;
        }, setRequestHeader: function setRequestHeader(a, b) {
          return null == k && (a = w[a.toLowerCase()] = w[a.toLowerCase()] || a, v[a] = b), this;
        }, overrideMimeType: function overrideMimeType(a) {
          return null == k && (o.mimeType = a), this;
        }, statusCode: function statusCode(a) {
          var b;if (a) if (k) y.always(a[y.status]);else for (b in a) {
            u[b] = [u[b], a[b]];
          }return this;
        }, abort: function abort(a) {
          var b = a || x;return e && e.abort(b), A(0, b), this;
        } };if (s.promise(y), o.url = ((b || o.url || tb.href) + "").replace(Hb, tb.protocol + "//"), o.type = c.method || c.type || o.method || o.type, o.dataTypes = (o.dataType || "*").toLowerCase().match(L) || [""], null == o.crossDomain) {
        j = d.createElement("a");try {
          j.href = o.url, j.href = j.href, o.crossDomain = Lb.protocol + "//" + Lb.host != j.protocol + "//" + j.host;
        } catch (z) {
          o.crossDomain = !0;
        }
      }if (o.data && o.processData && "string" != typeof o.data && (o.data = r.param(o.data, o.traditional)), Nb(Ib, o, c, y), k) return y;l = r.event && o.global, l && 0 === r.active++ && r.event.trigger("ajaxStart"), o.type = o.type.toUpperCase(), o.hasContent = !Gb.test(o.type), f = o.url.replace(Cb, ""), o.hasContent ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(Bb, "+")) : (n = o.url.slice(f.length), o.data && (f += (vb.test(f) ? "&" : "?") + o.data, delete o.data), o.cache === !1 && (f = f.replace(Db, "$1"), n = (vb.test(f) ? "&" : "?") + "_=" + ub++ + n), o.url = f + n), o.ifModified && (r.lastModified[f] && y.setRequestHeader("If-Modified-Since", r.lastModified[f]), r.etag[f] && y.setRequestHeader("If-None-Match", r.etag[f])), (o.data && o.hasContent && o.contentType !== !1 || c.contentType) && y.setRequestHeader("Content-Type", o.contentType), y.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Kb + "; q=0.01" : "") : o.accepts["*"]);for (m in o.headers) {
        y.setRequestHeader(m, o.headers[m]);
      }if (o.beforeSend && (o.beforeSend.call(p, y, o) === !1 || k)) return y.abort();if (x = "abort", t.add(o.complete), y.done(o.success), y.fail(o.error), e = Nb(Jb, o, c, y)) {
        if (y.readyState = 1, l && q.trigger("ajaxSend", [y, o]), k) return y;o.async && o.timeout > 0 && (i = a.setTimeout(function () {
          y.abort("timeout");
        }, o.timeout));try {
          k = !1, e.send(v, A);
        } catch (z) {
          if (k) throw z;A(-1, z);
        }
      } else A(-1, "No Transport");function A(b, c, d, h) {
        var j,
            m,
            n,
            v,
            w,
            x = c;k || (k = !0, i && a.clearTimeout(i), e = void 0, g = h || "", y.readyState = b > 0 ? 4 : 0, j = b >= 200 && b < 300 || 304 === b, d && (v = Pb(o, y, d)), v = Qb(o, v, y, j), j ? (o.ifModified && (w = y.getResponseHeader("Last-Modified"), w && (r.lastModified[f] = w), w = y.getResponseHeader("etag"), w && (r.etag[f] = w)), 204 === b || "HEAD" === o.type ? x = "nocontent" : 304 === b ? x = "notmodified" : (x = v.state, m = v.data, n = v.error, j = !n)) : (n = x, !b && x || (x = "error", b < 0 && (b = 0))), y.status = b, y.statusText = (c || x) + "", j ? s.resolveWith(p, [m, x, y]) : s.rejectWith(p, [y, x, n]), y.statusCode(u), u = void 0, l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [y, o, j ? m : n]), t.fireWith(p, [y, x]), l && (q.trigger("ajaxComplete", [y, o]), --r.active || r.event.trigger("ajaxStop")));
      }return y;
    }, getJSON: function getJSON(a, b, c) {
      return r.get(a, b, c, "json");
    }, getScript: function getScript(a, b) {
      return r.get(a, void 0, b, "script");
    } }), r.each(["get", "post"], function (a, b) {
    r[b] = function (a, c, d, e) {
      return r.isFunction(c) && (e = e || d, d = c, c = void 0), r.ajax(r.extend({ url: a, type: b, dataType: e, data: c, success: d }, r.isPlainObject(a) && a));
    };
  }), r._evalUrl = function (a) {
    return r.ajax({ url: a, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0 });
  }, r.fn.extend({ wrapAll: function wrapAll(a) {
      var b;return this[0] && (r.isFunction(a) && (a = a.call(this[0])), b = r(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
        var a = this;while (a.firstElementChild) {
          a = a.firstElementChild;
        }return a;
      }).append(this)), this;
    }, wrapInner: function wrapInner(a) {
      return r.isFunction(a) ? this.each(function (b) {
        r(this).wrapInner(a.call(this, b));
      }) : this.each(function () {
        var b = r(this),
            c = b.contents();c.length ? c.wrapAll(a) : b.append(a);
      });
    }, wrap: function wrap(a) {
      var b = r.isFunction(a);return this.each(function (c) {
        r(this).wrapAll(b ? a.call(this, c) : a);
      });
    }, unwrap: function unwrap(a) {
      return this.parent(a).not("body").each(function () {
        r(this).replaceWith(this.childNodes);
      }), this;
    } }), r.expr.pseudos.hidden = function (a) {
    return !r.expr.pseudos.visible(a);
  }, r.expr.pseudos.visible = function (a) {
    return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length);
  }, r.ajaxSettings.xhr = function () {
    try {
      return new a.XMLHttpRequest();
    } catch (b) {}
  };var Rb = { 0: 200, 1223: 204 },
      Sb = r.ajaxSettings.xhr();o.cors = !!Sb && "withCredentials" in Sb, o.ajax = Sb = !!Sb, r.ajaxTransport(function (b) {
    var _c, d;if (o.cors || Sb && !b.crossDomain) return { send: function send(e, f) {
        var g,
            h = b.xhr();if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields) for (g in b.xhrFields) {
          h[g] = b.xhrFields[g];
        }b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");for (g in e) {
          h.setRequestHeader(g, e[g]);
        }_c = function c(a) {
          return function () {
            _c && (_c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Rb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? { binary: h.response } : { text: h.responseText }, h.getAllResponseHeaders()));
          };
        }, h.onload = _c(), d = h.onerror = _c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function () {
          4 === h.readyState && a.setTimeout(function () {
            _c && d();
          });
        }, _c = _c("abort");try {
          h.send(b.hasContent && b.data || null);
        } catch (i) {
          if (_c) throw i;
        }
      }, abort: function abort() {
        _c && _c();
      } };
  }), r.ajaxPrefilter(function (a) {
    a.crossDomain && (a.contents.script = !1);
  }), r.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function textScript(a) {
        return r.globalEval(a), a;
      } } }), r.ajaxPrefilter("script", function (a) {
    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET");
  }), r.ajaxTransport("script", function (a) {
    if (a.crossDomain) {
      var b, _c2;return { send: function send(e, f) {
          b = r("<script>").prop({ charset: a.scriptCharset, src: a.url }).on("load error", _c2 = function c(a) {
            b.remove(), _c2 = null, a && f("error" === a.type ? 404 : 200, a.type);
          }), d.head.appendChild(b[0]);
        }, abort: function abort() {
          _c2 && _c2();
        } };
    }
  });var Tb = [],
      Ub = /(=)\?(?=&|$)|\?\?/;r.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
      var a = Tb.pop() || r.expando + "_" + ub++;return this[a] = !0, a;
    } }), r.ajaxPrefilter("json jsonp", function (b, c, d) {
    var e,
        f,
        g,
        h = b.jsonp !== !1 && (Ub.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Ub.test(b.data) && "data");if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = r.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Ub, "$1" + e) : b.jsonp !== !1 && (b.url += (vb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
      return g || r.error(e + " was not called"), g[0];
    }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
      g = arguments;
    }, d.always(function () {
      void 0 === f ? r(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Tb.push(e)), g && r.isFunction(f) && f(g[0]), g = f = void 0;
    }), "script";
  }), o.createHTMLDocument = function () {
    var a = d.implementation.createHTMLDocument("").body;return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length;
  }(), r.parseHTML = function (a, b, c) {
    if ("string" != typeof a) return [];"boolean" == typeof b && (c = b, b = !1);var e, f, g;return b || (o.createHTMLDocument ? (b = d.implementation.createHTMLDocument(""), e = b.createElement("base"), e.href = d.location.href, b.head.appendChild(e)) : b = d), f = C.exec(a), g = !c && [], f ? [b.createElement(f[1])] : (f = qa([a], b, g), g && g.length && r(g).remove(), r.merge([], f.childNodes));
  }, r.fn.load = function (a, b, c) {
    var d,
        e,
        f,
        g = this,
        h = a.indexOf(" ");return h > -1 && (d = pb(a.slice(h)), a = a.slice(0, h)), r.isFunction(b) ? (c = b, b = void 0) : b && "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && (e = "POST"), g.length > 0 && r.ajax({ url: a, type: e || "GET", dataType: "html", data: b }).done(function (a) {
      f = arguments, g.html(d ? r("<div>").append(r.parseHTML(a)).find(d) : a);
    }).always(c && function (a, b) {
      g.each(function () {
        c.apply(this, f || [a.responseText, b, a]);
      });
    }), this;
  }, r.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
    r.fn[b] = function (a) {
      return this.on(b, a);
    };
  }), r.expr.pseudos.animated = function (a) {
    return r.grep(r.timers, function (b) {
      return a === b.elem;
    }).length;
  }, r.offset = { setOffset: function setOffset(a, b, c) {
      var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k = r.css(a, "position"),
          l = r(a),
          m = {};"static" === k && (a.style.position = "relative"), h = l.offset(), f = r.css(a, "top"), i = r.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), r.isFunction(b) && (b = b.call(a, c, r.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
    } }, r.fn.extend({ offset: function offset(a) {
      if (arguments.length) return void 0 === a ? this : this.each(function (b) {
        r.offset.setOffset(this, a, b);
      });var b,
          c,
          d,
          e,
          f = this[0];if (f) return f.getClientRects().length ? (d = f.getBoundingClientRect(), b = f.ownerDocument, c = b.documentElement, e = b.defaultView, { top: d.top + e.pageYOffset - c.clientTop, left: d.left + e.pageXOffset - c.clientLeft }) : { top: 0, left: 0 };
    }, position: function position() {
      if (this[0]) {
        var a,
            b,
            c = this[0],
            d = { top: 0, left: 0 };return "fixed" === r.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), B(a[0], "html") || (d = a.offset()), d = { top: d.top + r.css(a[0], "borderTopWidth", !0), left: d.left + r.css(a[0], "borderLeftWidth", !0) }), { top: b.top - d.top - r.css(c, "marginTop", !0), left: b.left - d.left - r.css(c, "marginLeft", !0) };
      }
    }, offsetParent: function offsetParent() {
      return this.map(function () {
        var a = this.offsetParent;while (a && "static" === r.css(a, "position")) {
          a = a.offsetParent;
        }return a || ra;
      });
    } }), r.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, b) {
    var c = "pageYOffset" === b;r.fn[a] = function (d) {
      return T(this, function (a, d, e) {
        var f;return r.isWindow(a) ? f = a : 9 === a.nodeType && (f = a.defaultView), void 0 === e ? f ? f[b] : a[d] : void (f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e);
      }, a, d, arguments.length);
    };
  }), r.each(["top", "left"], function (a, b) {
    r.cssHooks[b] = Pa(o.pixelPosition, function (a, c) {
      if (c) return c = Oa(a, b), Ma.test(c) ? r(a).position()[b] + "px" : c;
    });
  }), r.each({ Height: "height", Width: "width" }, function (a, b) {
    r.each({ padding: "inner" + a, content: b, "": "outer" + a }, function (c, d) {
      r.fn[d] = function (e, f) {
        var g = arguments.length && (c || "boolean" != typeof e),
            h = c || (e === !0 || f === !0 ? "margin" : "border");return T(this, function (b, c, e) {
          var f;return r.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? r.css(b, c, h) : r.style(b, c, e, h);
        }, b, g ? e : void 0, g);
      };
    });
  }), r.fn.extend({ bind: function bind(a, b, c) {
      return this.on(a, null, b, c);
    }, unbind: function unbind(a, b) {
      return this.off(a, null, b);
    }, delegate: function delegate(a, b, c, d) {
      return this.on(b, a, c, d);
    }, undelegate: function undelegate(a, b, c) {
      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
    } }), r.holdReady = function (a) {
    a ? r.readyWait++ : r.ready(!0);
  }, r.isArray = Array.isArray, r.parseJSON = JSON.parse, r.nodeName = B, "function" == "function" && __webpack_require__("./node_modules/webpack/buildin/amd-options.js") && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return r;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var Vb = a.jQuery,
      Wb = a.$;return r.noConflict = function (b) {
    return a.$ === r && (a.$ = Wb), b && a.jQuery === r && (a.jQuery = Vb), r;
  }, b || (a.jQuery = a.$ = r), r;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/vendor/mousetrap.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* mousetrap v1.5.3 craig.is/killing/mice */
(function (C, r, g) {
  function t(a, b, h) {
    a.addEventListener ? a.addEventListener(b, h, !1) : a.attachEvent("on" + b, h);
  }function x(a) {
    if ("keypress" == a.type) {
      var b = String.fromCharCode(a.which);a.shiftKey || (b = b.toLowerCase());return b;
    }return l[a.which] ? l[a.which] : p[a.which] ? p[a.which] : String.fromCharCode(a.which).toLowerCase();
  }function D(a) {
    var b = [];a.shiftKey && b.push("shift");a.altKey && b.push("alt");a.ctrlKey && b.push("ctrl");a.metaKey && b.push("meta");return b;
  }function u(a) {
    return "shift" == a || "ctrl" == a || "alt" == a || "meta" == a;
  }function y(a, b) {
    var h,
        c,
        e,
        g = [];h = a;"+" === h ? h = ["+"] : (h = h.replace(/\+{2}/g, "+plus"), h = h.split("+"));for (e = 0; e < h.length; ++e) {
      c = h[e], z[c] && (c = z[c]), b && "keypress" != b && A[c] && (c = A[c], g.push("shift")), u(c) && g.push(c);
    }h = c;e = b;if (!e) {
      if (!k) {
        k = {};for (var m in l) {
          95 < m && 112 > m || l.hasOwnProperty(m) && (k[l[m]] = m);
        }
      }e = k[h] ? "keydown" : "keypress";
    }"keypress" == e && g.length && (e = "keydown");return { key: c, modifiers: g, action: e };
  }function B(a, b) {
    return null === a || a === r ? !1 : a === b ? !0 : B(a.parentNode, b);
  }function c(a) {
    function b(a) {
      a = a || {};var b = !1,
          n;for (n in q) {
        a[n] ? b = !0 : q[n] = 0;
      }b || (v = !1);
    }function h(a, b, n, f, c, h) {
      var g,
          e,
          l = [],
          m = n.type;if (!d._callbacks[a]) return [];"keyup" == m && u(a) && (b = [a]);for (g = 0; g < d._callbacks[a].length; ++g) {
        if (e = d._callbacks[a][g], (f || !e.seq || q[e.seq] == e.level) && m == e.action) {
          var k;(k = "keypress" == m && !n.metaKey && !n.ctrlKey) || (k = e.modifiers, k = b.sort().join(",") === k.sort().join(","));k && (k = f && e.seq == f && e.level == h, (!f && e.combo == c || k) && d._callbacks[a].splice(g, 1), l.push(e));
        }
      }return l;
    }function g(a, b, n, f) {
      d.stopCallback(b, b.target || b.srcElement, n, f) || !1 !== a(b, n) || (b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0);
    }function e(a) {
      "number" !== typeof a.which && (a.which = a.keyCode);var b = x(a);b && ("keyup" == a.type && w === b ? w = !1 : d.handleKey(b, D(a), a));
    }function l(a, c, n, f) {
      function e(c) {
        return function () {
          v = c;++q[a];clearTimeout(k);k = setTimeout(b, 1E3);
        };
      }function h(c) {
        g(n, c, a);"keyup" !== f && (w = x(c));setTimeout(b, 10);
      }for (var d = q[a] = 0; d < c.length; ++d) {
        var p = d + 1 === c.length ? h : e(f || y(c[d + 1]).action);m(c[d], p, f, a, d);
      }
    }function m(a, b, c, f, e) {
      d._directMap[a + ":" + c] = b;a = a.replace(/\s+/g, " ");var g = a.split(" ");1 < g.length ? l(a, g, b, c) : (c = y(a, c), d._callbacks[c.key] = d._callbacks[c.key] || [], h(c.key, c.modifiers, { type: c.action }, f, a, e), d._callbacks[c.key][f ? "unshift" : "push"]({ callback: b, modifiers: c.modifiers, action: c.action, seq: f, level: e, combo: a }));
    }var d = this;a = a || r;if (!(d instanceof c)) return new c(a);d.target = a;d._callbacks = {};d._directMap = {};var q = {},
        k,
        w = !1,
        p = !1,
        v = !1;d._handleKey = function (a, c, e) {
      var f = h(a, c, e),
          d;c = {};var k = 0,
          l = !1;for (d = 0; d < f.length; ++d) {
        f[d].seq && (k = Math.max(k, f[d].level));
      }for (d = 0; d < f.length; ++d) {
        f[d].seq ? f[d].level == k && (l = !0, c[f[d].seq] = 1, g(f[d].callback, e, f[d].combo, f[d].seq)) : l || g(f[d].callback, e, f[d].combo);
      }f = "keypress" == e.type && p;e.type != v || u(a) || f || b(c);p = l && "keydown" == e.type;
    };d._bindMultiple = function (a, b, c) {
      for (var d = 0; d < a.length; ++d) {
        m(a[d], b, c);
      }
    };t(a, "keypress", e);t(a, "keydown", e);t(a, "keyup", e);
  }var l = { 8: "backspace", 9: "tab", 13: "enter", 16: "shift", 17: "ctrl", 18: "alt",
    20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home", 37: "left", 38: "up", 39: "right", 40: "down", 45: "ins", 46: "del", 91: "meta", 93: "meta", 224: "meta" },
      p = { 106: "*", 107: "+", 109: "-", 110: ".", 111: "/", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'" },
      A = { "~": "`", "!": "1", "@": "2", "#": "3", $: "4", "%": "5", "^": "6", "&": "7", "*": "8", "(": "9", ")": "0", _: "-", "+": "=", ":": ";", '"': "'", "<": ",", ">": ".", "?": "/", "|": "\\" },
      z = { option: "alt", command: "meta", "return": "enter",
    escape: "esc", plus: "+", mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl" },
      k;for (g = 1; 20 > g; ++g) {
    l[111 + g] = "f" + g;
  }for (g = 0; 9 >= g; ++g) {
    l[g + 96] = g;
  }c.prototype.bind = function (a, b, c) {
    a = a instanceof Array ? a : [a];this._bindMultiple.call(this, a, b, c);return this;
  };c.prototype.unbind = function (a, b) {
    return this.bind.call(this, a, function () {}, b);
  };c.prototype.trigger = function (a, b) {
    if (this._directMap[a + ":" + b]) this._directMap[a + ":" + b]({}, a);return this;
  };c.prototype.reset = function () {
    this._callbacks = {};this._directMap = {};return this;
  };c.prototype.stopCallback = function (a, b) {
    return -1 < (" " + b.className + " ").indexOf(" mousetrap ") || B(b, this.target) ? !1 : "INPUT" == b.tagName || "SELECT" == b.tagName || "TEXTAREA" == b.tagName || b.isContentEditable;
  };c.prototype.handleKey = function () {
    return this._handleKey.apply(this, arguments);
  };c.init = function () {
    var a = c(r),
        b;for (b in a) {
      "_" !== b.charAt(0) && (c[b] = function (b) {
        return function () {
          return a[b].apply(a, arguments);
        };
      }(b));
    }
  };c.init();C.Mousetrap = c;"undefined" !== typeof module && module.exports && (module.exports = c);"function" === "function" && __webpack_require__("./node_modules/webpack/buildin/amd-options.js") && !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return c;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
})(window, document);

/***/ }),

/***/ "./resources/assets/js/vendor/prism.js":
/***/ (function(module, exports) {

/* http://prismjs.com/download.html?themes=prism&languages=markup+twig+css+clike+javascript+php+php-extras+scss+bash+sql+apacheconf+git+handlebars&plugins=line-numbers */
self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};var Prism = function () {
  var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i,
      t = self.Prism = { util: { encode: function encode(e) {
        return e instanceof n ? new n(e.type, t.util.encode(e.content), e.alias) : "Array" === t.util.type(e) ? e.map(t.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
      }, type: function type(e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
      }, clone: function clone(e) {
        var n = t.util.type(e);switch (n) {case "Object":
            var a = {};for (var r in e) {
              e.hasOwnProperty(r) && (a[r] = t.util.clone(e[r]));
            }return a;case "Array":
            return e.map(function (e) {
              return t.util.clone(e);
            });}return e;
      } }, languages: { extend: function extend(e, n) {
        var a = t.util.clone(t.languages[e]);for (var r in n) {
          a[r] = n[r];
        }return a;
      }, insertBefore: function insertBefore(e, n, a, r) {
        r = r || t.languages;var i = r[e];if (2 == arguments.length) {
          a = arguments[1];for (var l in a) {
            a.hasOwnProperty(l) && (i[l] = a[l]);
          }return i;
        }var o = {};for (var s in i) {
          if (i.hasOwnProperty(s)) {
            if (s == n) for (var l in a) {
              a.hasOwnProperty(l) && (o[l] = a[l]);
            }o[s] = i[s];
          }
        }return t.languages.DFS(t.languages, function (t, n) {
          n === r[e] && t != e && (this[t] = o);
        }), r[e] = o;
      }, DFS: function DFS(e, n, a) {
        for (var r in e) {
          e.hasOwnProperty(r) && (n.call(e, r, e[r], a || r), "Object" === t.util.type(e[r]) ? t.languages.DFS(e[r], n) : "Array" === t.util.type(e[r]) && t.languages.DFS(e[r], n, r));
        }
      } }, highlightAll: function highlightAll(e, n) {
      for (var a, r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), i = 0; a = r[i++];) {
        t.highlightElement(a, e === !0, n);
      }
    }, highlightElement: function highlightElement(a, r, i) {
      for (var l, o, s = a; s && !e.test(s.className);) {
        s = s.parentNode;
      }if (s && (l = (s.className.match(e) || [, ""])[1], o = t.languages[l]), o) {
        a.className = a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, s = a.parentNode, /pre/i.test(s.nodeName) && (s.className = s.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l);var g = a.textContent;if (g) {
          g = g.replace(/^(?:\r?\n|\r)/, "");var u = { element: a, language: l, grammar: o, code: g };if (t.hooks.run("before-highlight", u), r && self.Worker) {
            var c = new Worker(t.filename);c.onmessage = function (e) {
              u.highlightedCode = n.stringify(JSON.parse(e.data), l), t.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, i && i.call(u.element), t.hooks.run("after-highlight", u);
            }, c.postMessage(JSON.stringify({ language: u.language, code: u.code }));
          } else u.highlightedCode = t.highlight(u.code, u.grammar, u.language), t.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, i && i.call(a), t.hooks.run("after-highlight", u);
        }
      }
    }, highlight: function highlight(e, a, r) {
      var i = t.tokenize(e, a);return n.stringify(t.util.encode(i), r);
    }, tokenize: function tokenize(e, n) {
      var a = t.Token,
          r = [e],
          i = n.rest;if (i) {
        for (var l in i) {
          n[l] = i[l];
        }delete n.rest;
      }e: for (var l in n) {
        if (n.hasOwnProperty(l) && n[l]) {
          var o = n[l];o = "Array" === t.util.type(o) ? o : [o];for (var s = 0; s < o.length; ++s) {
            var g = o[s],
                u = g.inside,
                c = !!g.lookbehind,
                f = 0,
                h = g.alias;g = g.pattern || g;for (var p = 0; p < r.length; p++) {
              var d = r[p];if (r.length > e.length) break e;if (!(d instanceof a)) {
                g.lastIndex = 0;var m = g.exec(d);if (m) {
                  c && (f = m[1].length);var y = m.index - 1 + f,
                      m = m[0].slice(f),
                      v = m.length,
                      k = y + v,
                      b = d.slice(0, y + 1),
                      w = d.slice(k + 1),
                      O = [p, 1];b && O.push(b);var N = new a(l, u ? t.tokenize(m, u) : m, h);O.push(N), w && O.push(w), Array.prototype.splice.apply(r, O);
                }
              }
            }
          }
        }
      }return r;
    }, hooks: { all: {}, add: function add(e, n) {
        var a = t.hooks.all;a[e] = a[e] || [], a[e].push(n);
      }, run: function run(e, n) {
        var a = t.hooks.all[e];if (a && a.length) for (var r, i = 0; r = a[i++];) {
          r(n);
        }
      } } },
      n = t.Token = function (e, t, n) {
    this.type = e, this.content = t, this.alias = n;
  };if (n.stringify = function (e, a, r) {
    if ("string" == typeof e) return e;if ("[object Array]" == Object.prototype.toString.call(e)) return e.map(function (t) {
      return n.stringify(t, a, e);
    }).join("");var i = { type: e.type, content: n.stringify(e.content, a, r), tag: "span", classes: ["token", e.type], attributes: {}, language: a, parent: r };if ("comment" == i.type && (i.attributes.spellcheck = "true"), e.alias) {
      var l = "Array" === t.util.type(e.alias) ? e.alias : [e.alias];Array.prototype.push.apply(i.classes, l);
    }t.hooks.run("wrap", i);var o = "";for (var s in i.attributes) {
      o += s + '="' + (i.attributes[s] || "") + '"';
    }return "<" + i.tag + ' class="' + i.classes.join(" ") + '" ' + o + ">" + i.content + "</" + i.tag + ">";
  }, !self.document) return self.addEventListener ? (self.addEventListener("message", function (e) {
    var n = JSON.parse(e.data),
        a = n.language,
        r = n.code;self.postMessage(JSON.stringify(t.util.encode(t.tokenize(r, t.languages[a])))), self.close();
  }, !1), self.Prism) : self.Prism;var a = document.getElementsByTagName("script");return a = a[a.length - 1], a && (t.filename = a.src, document.addEventListener && !a.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll)), self.Prism;
}();"undefined" != typeof module && module.exports && (module.exports = Prism);;
Prism.languages.markup = { comment: /<!--[\w\W]*?-->/g, prolog: /<\?.+?\?>/, doctype: /<!DOCTYPE.+?>/, cdata: /<!\[CDATA\[[\w\W]*?]]>/i, tag: { pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi, inside: { tag: { pattern: /^<\/?[\w:-]+/i, inside: { punctuation: /^<\/?/, namespace: /^[\w-]+?:/ } }, "attr-value": { pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi, inside: { punctuation: /=|>|"/g } }, punctuation: /\/?>/g, "attr-name": { pattern: /[\w:-]+/g, inside: { namespace: /^[\w-]+?:/ } } } }, entity: /&#?[\da-z]{1,8};/gi }, Prism.hooks.add("wrap", function (t) {
  "entity" === t.type && (t.attributes.title = t.content.replace(/&amp;/, "&"));
});;
Prism.languages.twig = { comment: /\{#[\s\S]*?#\}/g, tag: { pattern: /(\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\})/g, inside: { ld: { pattern: /^(\{\{\-?|\{%\-?\s*\w+)/, inside: { punctuation: /^(\{\{|\{%)\-?/, keyword: /\w+/ } }, rd: { pattern: /\-?(%\}|\}\})$/, inside: { punctuation: /.*/ } }, string: { pattern: /("|')(\\?.)*?\1/g, inside: { punctuation: /^('|")|('|")$/g } }, keyword: /\b(if)\b/g, "boolean": /\b(true|false|null)\b/g, number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g, operator: /==|=|!=|<|>|>=|<=|\+|\-|~|\*|\/|\/\/|%|\*\*|\|/g, "space-operator": { pattern: /(\s)(\b(not|b\-and|b\-xor|b\-or|and|or|in|matches|starts with|ends with|is)\b|\?|:|\?:)(?=\s)/g, lookbehind: !0, inside: { operator: /.*/ } }, property: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g, punctuation: /\(|\)|\[\]|\[|\]|\{|\}|:|\.|,/g } }, other: { pattern: /[\s\S]*/, inside: Prism.languages.markup } };;
Prism.languages.css = { comment: /\/\*[\w\W]*?\*\//g, atrule: { pattern: /@[\w-]+?.*?(;|(?=\s*\{))/gi, inside: { punctuation: /[;:]/g } }, url: /url\((?:(["'])(\\\n|\\?.)*?\1|.*?)\)/gi, selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g, string: /("|')(\\\n|\\?.)*?\1/g, property: /(\b|\B)[\w-]+(?=\s*:)/gi, important: /\B!important\b/gi, punctuation: /[\{\};:]/g, "function": /[-a-z0-9]+(?=\()/gi }, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", { style: { pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/gi, inside: { tag: { pattern: /<style[\w\W]*?>|<\/style>/gi, inside: Prism.languages.markup.tag.inside }, rest: Prism.languages.css }, alias: "language-css" } }), Prism.languages.insertBefore("inside", "attr-value", { "style-attr": { pattern: /\s*style=("|').+?\1/gi, inside: { "attr-name": { pattern: /^\s*style/gi, inside: Prism.languages.markup.tag.inside }, punctuation: /^\s*=\s*['"]|['"]\s*$/, "attr-value": { pattern: /.+/gi, inside: Prism.languages.css } }, alias: "language-css" } }, Prism.languages.markup.tag));;
Prism.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\w\W]*?\*\//g, lookbehind: !0 }, { pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/g, lookbehind: !0 }], string: /("|')(\\\n|\\?.)*?\1/g, "class-name": { pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi, lookbehind: !0, inside: { punctuation: /(\.|\\)/ } }, keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g, "boolean": /\b(true|false)\b/g, "function": { pattern: /[a-z0-9_]+\(/gi, inside: { punctuation: /\(/ } }, number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g, operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/g, ignore: /&(lt|gt|amp);/gi, punctuation: /[{}[\];(),.:]/g };;
Prism.languages.javascript = Prism.languages.extend("clike", { keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g, number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|-?Infinity)\b/g, "function": /(?!\d)[a-z0-9_$]+(?=\()/gi }), Prism.languages.insertBefore("javascript", "keyword", { regex: { pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g, lookbehind: !0 } }), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", { script: { pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/gi, inside: { tag: { pattern: /<script[\w\W]*?>|<\/script>/gi, inside: Prism.languages.markup.tag.inside }, rest: Prism.languages.javascript }, alias: "language-javascript" } });;
Prism.languages.php = Prism.languages.extend("clike", { keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/gi, constant: /\b[A-Z0-9_]{2,}\b/g, comment: { pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/|#).*?(\r?\n|$))/g, lookbehind: !0 } }), Prism.languages.insertBefore("php", "keyword", { delimiter: /(\?>|<\?php|<\?)/gi, variable: /(\$\w+)\b/gi, "package": { pattern: /(\\|namespace\s+|use\s+)[\w\\]+/g, lookbehind: !0, inside: { punctuation: /\\/ } } }), Prism.languages.insertBefore("php", "operator", { property: { pattern: /(->)[\w]+/g, lookbehind: !0 } }), Prism.languages.markup && (Prism.hooks.add("before-highlight", function (e) {
  "php" === e.language && (e.tokenStack = [], e.backupCode = e.code, e.code = e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi, function (n) {
    return e.tokenStack.push(n), "{{{PHP" + e.tokenStack.length + "}}}";
  }));
}), Prism.hooks.add("before-insert", function (e) {
  "php" === e.language && (e.code = e.backupCode, delete e.backupCode);
}), Prism.hooks.add("after-highlight", function (e) {
  if ("php" === e.language) {
    for (var n, a = 0; n = e.tokenStack[a]; a++) {
      e.highlightedCode = e.highlightedCode.replace("{{{PHP" + (a + 1) + "}}}", Prism.highlight(n, e.grammar, "php"));
    }e.element.innerHTML = e.highlightedCode;
  }
}), Prism.hooks.add("wrap", function (e) {
  "php" === e.language && "markup" === e.type && (e.content = e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'));
}), Prism.languages.insertBefore("php", "comment", { markup: { pattern: /<[^?]\/?(.*?)>/g, inside: Prism.languages.markup }, php: /\{\{\{PHP[0-9]+\}\}\}/g }));;
Prism.languages.insertBefore("php", "variable", { "this": /\$this/g, global: /\$_?(GLOBALS|SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/g, scope: { pattern: /\b[\w\\]+::/g, inside: { keyword: /(static|self|parent)/, punctuation: /(::|\\)/ } } });;
Prism.languages.scss = Prism.languages.extend("css", { comment: { pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g, lookbehind: !0 }, atrule: /@[\w-]+(?=\s+(\(|\{|;))/gi, url: /([-a-z]+-)*url(?=\()/gi, selector: /([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm }), Prism.languages.insertBefore("scss", "atrule", { keyword: /@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i }), Prism.languages.insertBefore("scss", "property", { variable: /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i }), Prism.languages.insertBefore("scss", "function", { placeholder: /%[-_\w]+/i, statement: /\B!(default|optional)\b/gi, "boolean": /\b(true|false)\b/g, "null": /\b(null)\b/g, operator: /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|%)\s+/g });;
Prism.languages.bash = Prism.languages.extend("clike", { comment: { pattern: /(^|[^"{\\])(#.*?(\r?\n|$))/g, lookbehind: !0 }, string: { pattern: /("|')(\\?[\s\S])*?\1/g, inside: { property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/g } }, keyword: /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/g }), Prism.languages.insertBefore("bash", "keyword", { property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/g }), Prism.languages.insertBefore("bash", "comment", { important: /(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/g });;
Prism.languages.sql = { comment: { pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|(\/\/)|#).*?(\r?\n|$))/g, lookbehind: !0 }, string: { pattern: /(^|[^@])("|')(\\?[\s\S])*?\2/g, lookbehind: !0 }, variable: /@[\w.$]+|@("|'|`)(\\?[\s\S])+?\1/g, "function": /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/gi, keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALTER|ANALYZE|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADE|CASCADED|CASE|CHAIN|CHAR VARYING|CHARACTER VARYING|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATA|DATABASE|DATABASES|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DOUBLE PRECISION|DROP|DUMMY|DUMP|DUMPFILE|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE|ESCAPED BY|EXCEPT|EXEC|EXECUTE|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR|FOR EACH ROW|FORCE|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GEOMETRY|GEOMETRYCOLLECTION|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY|IDENTITY_INSERT|IDENTITYCOL|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEY|KEYS|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONGBLOB|LONGTEXT|MATCH|MATCHED|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTILINESTRING|MULTIPOINT|MULTIPOLYGON|NATIONAL|NATIONAL CHAR VARYING|NATIONAL CHARACTER|NATIONAL CHARACTER VARYING|NATIONAL VARCHAR|NATURAL|NCHAR|NCHAR VARCHAR|NEXT|NO|NO SQL|NOCHECK|NOCYCLE|NONCLUSTERED|NULLIF|NUMERIC|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUT|OUTER|OUTFILE|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC|PROCEDURE|PUBLIC|PURGE|QUICK|RAISERROR|READ|READS SQL DATA|READTEXT|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROWCOUNT|ROWGUIDCOL|ROWS?|RTREE|RULE|SAVE|SAVEPOINT|SCHEMA|SELECT|SERIAL|SERIALIZABLE|SESSION|SESSION_USER|SET|SETUSER|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START|STARTING BY|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLE|TABLES|TABLESPACE|TEMP(?:ORARY)?|TEMPTABLE|TERMINATED BY|TEXT|TEXTSIZE|THEN|TIMESTAMP|TINYBLOB|TINYINT|TINYTEXT|TO|TOP|TRAN|TRANSACTION|TRANSACTIONS|TRIGGER|TRUNCATE|TSEQUAL|TYPE|TYPES|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH|WITH ROLLUP|WITHIN|WORK|WRITE|WRITETEXT)\b/gi, "boolean": /\b(?:TRUE|FALSE|NULL)\b/gi, number: /\b-?(0x)?\d*\.?[\da-f]+\b/g, operator: /\b(?:ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|IS|UNIQUE|CHARACTER SET|COLLATE|DIV|OFFSET|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b|[-+]{1}|!|[=<>]{1,2}|(&){1,2}|\|?\||\?|\*|\//gi, punctuation: /[;[\]()`,.]/g };;
Prism.languages.apacheconf = { comment: /#.*/g, "directive-inline": { pattern: /^\s*\b(AcceptFilter|AcceptPathInfo|AccessFileName|Action|AddAlt|AddAltByEncoding|AddAltByType|AddCharset|AddDefaultCharset|AddDescription|AddEncoding|AddHandler|AddIcon|AddIconByEncoding|AddIconByType|AddInputFilter|AddLanguage|AddModuleInfo|AddOutputFilter|AddOutputFilterByType|AddType|Alias|AliasMatch|Allow|AllowCONNECT|AllowEncodedSlashes|AllowMethods|AllowOverride|AllowOverrideList|Anonymous|Anonymous_LogEmail|Anonymous_MustGiveEmail|Anonymous_NoUserID|Anonymous_VerifyEmail|AsyncRequestWorkerFactor|AuthBasicAuthoritative|AuthBasicFake|AuthBasicProvider|AuthBasicUseDigestAlgorithm|AuthDBDUserPWQuery|AuthDBDUserRealmQuery|AuthDBMGroupFile|AuthDBMType|AuthDBMUserFile|AuthDigestAlgorithm|AuthDigestDomain|AuthDigestNonceLifetime|AuthDigestProvider|AuthDigestQop|AuthDigestShmemSize|AuthFormAuthoritative|AuthFormBody|AuthFormDisableNoStore|AuthFormFakeBasicAuth|AuthFormLocation|AuthFormLoginRequiredLocation|AuthFormLoginSuccessLocation|AuthFormLogoutLocation|AuthFormMethod|AuthFormMimetype|AuthFormPassword|AuthFormProvider|AuthFormSitePassphrase|AuthFormSize|AuthFormUsername|AuthGroupFile|AuthLDAPAuthorizePrefix|AuthLDAPBindAuthoritative|AuthLDAPBindDN|AuthLDAPBindPassword|AuthLDAPCharsetConfig|AuthLDAPCompareAsUser|AuthLDAPCompareDNOnServer|AuthLDAPDereferenceAliases|AuthLDAPGroupAttribute|AuthLDAPGroupAttributeIsDN|AuthLDAPInitialBindAsUser|AuthLDAPInitialBindPattern|AuthLDAPMaxSubGroupDepth|AuthLDAPRemoteUserAttribute|AuthLDAPRemoteUserIsDN|AuthLDAPSearchAsUser|AuthLDAPSubGroupAttribute|AuthLDAPSubGroupClass|AuthLDAPUrl|AuthMerging|AuthName|AuthnCacheContext|AuthnCacheEnable|AuthnCacheProvideFor|AuthnCacheSOCache|AuthnCacheTimeout|AuthnzFcgiCheckAuthnProvider|AuthnzFcgiDefineProvider|AuthType|AuthUserFile|AuthzDBDLoginToReferer|AuthzDBDQuery|AuthzDBDRedirectQuery|AuthzDBMType|AuthzSendForbiddenOnFailure|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferedLogs|BufferSize|CacheDefaultExpire|CacheDetailHeader|CacheDirLength|CacheDirLevels|CacheDisable|CacheEnable|CacheFile|CacheHeader|CacheIgnoreCacheControl|CacheIgnoreHeaders|CacheIgnoreNoLastMod|CacheIgnoreQueryString|CacheIgnoreURLSessionIdentifiers|CacheKeyBaseURL|CacheLastModifiedFactor|CacheLock|CacheLockMaxAge|CacheLockPath|CacheMaxExpire|CacheMaxFileSize|CacheMinExpire|CacheMinFileSize|CacheNegotiatedDocs|CacheQuickHandler|CacheReadSize|CacheReadTime|CacheRoot|CacheSocache|CacheSocacheMaxSize|CacheSocacheMaxTime|CacheSocacheMinTime|CacheSocacheReadSize|CacheSocacheReadTime|CacheStaleOnError|CacheStoreExpired|CacheStoreNoStore|CacheStorePrivate|CGIDScriptTimeout|CGIMapExtension|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|DeflateBufferSize|DeflateCompressionLevel|DeflateFilterNote|DeflateInflateLimitRequestBody|DeflateInflateRatioBurst|DeflateInflateRatioLimit|DeflateMemLevel|DeflateWindowSize|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DTracePrivileges|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtendedStatus|ExtFilterDefine|ExtFilterOptions|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|HeartbeatAddress|HeartbeatListen|HeartbeatMaxServers|HeartbeatStorage|HeartbeatStorage|HostnameLookups|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|IndexHeadInsert|IndexIgnore|IndexIgnoreReset|IndexOptions|IndexOrderDefault|IndexStyleSheet|InputSed|ISAPIAppendLogToErrors|ISAPIAppendLogToQuery|ISAPICacheFile|ISAPIFakeAsync|ISAPILogNotSupported|ISAPIReadAheadBuffer|KeepAlive|KeepAliveTimeout|KeptBodySize|LanguagePriority|LDAPCacheEntries|LDAPCacheTTL|LDAPConnectionPoolTTL|LDAPConnectionTimeout|LDAPLibraryDebug|LDAPOpCacheEntries|LDAPOpCacheTTL|LDAPReferralHopLimit|LDAPReferrals|LDAPRetries|LDAPRetryDelay|LDAPSharedCacheFile|LDAPSharedCacheSize|LDAPTimeout|LDAPTrustedClientCert|LDAPTrustedGlobalCert|LDAPTrustedMode|LDAPVerifyServerCert|LimitInternalRecursion|LimitRequestBody|LimitRequestFields|LimitRequestFieldSize|LimitRequestLine|LimitXMLRequestBody|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|LuaHookAccessChecker|LuaHookAuthChecker|LuaHookCheckUserID|LuaHookFixups|LuaHookInsertFilter|LuaHookLog|LuaHookMapToStorage|LuaHookTranslateName|LuaHookTypeChecker|LuaInherit|LuaInputFilter|LuaMapHandler|LuaOutputFilter|LuaPackageCPath|LuaPackagePath|LuaQuickHandler|LuaRoot|LuaScope|MaxConnectionsPerChild|MaxKeepAliveRequests|MaxMemFree|MaxRangeOverlaps|MaxRangeReversals|MaxRanges|MaxRequestWorkers|MaxSpareServers|MaxSpareThreads|MaxThreads|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|MMapFile|ModemStandard|ModMimeUsePathInfo|MultiviewsMatch|Mutex|NameVirtualHost|NoProxy|NWSSLTrustedCerts|NWSSLUpgradeable|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|ProxyAddHeaders|ProxyBadHeader|ProxyBlock|ProxyDomain|ProxyErrorOverride|ProxyExpressDBMFile|ProxyExpressDBMType|ProxyExpressEnable|ProxyFtpDirCharset|ProxyFtpEscapeWildcards|ProxyFtpListOnWildcard|ProxyHTMLBufSize|ProxyHTMLCharsetOut|ProxyHTMLDocType|ProxyHTMLEnable|ProxyHTMLEvents|ProxyHTMLExtended|ProxyHTMLFixups|ProxyHTMLInterp|ProxyHTMLLinks|ProxyHTMLMeta|ProxyHTMLStripComments|ProxyHTMLURLMap|ProxyIOBufferSize|ProxyMaxForwards|ProxyPass|ProxyPassInherit|ProxyPassInterpolateEnv|ProxyPassMatch|ProxyPassReverse|ProxyPassReverseCookieDomain|ProxyPassReverseCookiePath|ProxyPreserveHost|ProxyReceiveBufferSize|ProxyRemote|ProxyRemoteMatch|ProxyRequests|ProxySCGIInternalRedirect|ProxySCGISendfile|ProxySet|ProxySourceAddress|ProxyStatus|ProxyTimeout|ProxyVia|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIPHeader|RemoteIPInternalProxy|RemoteIPInternalProxyList|RemoteIPProxiesHeader|RemoteIPTrustedProxy|RemoteIPTrustedProxyList|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|RewriteBase|RewriteCond|RewriteEngine|RewriteMap|RewriteOptions|RewriteRule|RLimitCPU|RLimitMEM|RLimitNPROC|Satisfy|ScoreBoardFile|Script|ScriptAlias|ScriptAliasMatch|ScriptInterpreterSource|ScriptLog|ScriptLogBuffer|ScriptLogLength|ScriptSock|SecureListen|SeeRequestTail|SendBufferSize|ServerAdmin|ServerAlias|ServerLimit|ServerName|ServerPath|ServerRoot|ServerSignature|ServerTokens|Session|SessionCookieName|SessionCookieName2|SessionCookieRemove|SessionCryptoCipher|SessionCryptoDriver|SessionCryptoPassphrase|SessionCryptoPassphraseFile|SessionDBDCookieName|SessionDBDCookieName2|SessionDBDCookieRemove|SessionDBDDeleteLabel|SessionDBDInsertLabel|SessionDBDPerUser|SessionDBDSelectLabel|SessionDBDUpdateLabel|SessionEnv|SessionExclude|SessionHeader|SessionInclude|SessionMaxAge|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|SSIEndTag|SSIErrorMsg|SSIETag|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSLCACertificateFile|SSLCACertificatePath|SSLCADNRequestFile|SSLCADNRequestPath|SSLCARevocationCheck|SSLCARevocationFile|SSLCARevocationPath|SSLCertificateChainFile|SSLCertificateFile|SSLCertificateKeyFile|SSLCipherSuite|SSLCompression|SSLCryptoDevice|SSLEngine|SSLFIPS|SSLHonorCipherOrder|SSLInsecureRenegotiation|SSLOCSPDefaultResponder|SSLOCSPEnable|SSLOCSPOverrideResponder|SSLOCSPResponderTimeout|SSLOCSPResponseMaxAge|SSLOCSPResponseTimeSkew|SSLOCSPUseRequestNonce|SSLOpenSSLConfCmd|SSLOptions|SSLPassPhraseDialog|SSLProtocol|SSLProxyCACertificateFile|SSLProxyCACertificatePath|SSLProxyCARevocationCheck|SSLProxyCARevocationFile|SSLProxyCARevocationPath|SSLProxyCheckPeerCN|SSLProxyCheckPeerExpire|SSLProxyCheckPeerName|SSLProxyCipherSuite|SSLProxyEngine|SSLProxyMachineCertificateChainFile|SSLProxyMachineCertificateFile|SSLProxyMachineCertificatePath|SSLProxyProtocol|SSLProxyVerify|SSLProxyVerifyDepth|SSLRandomSeed|SSLRenegBufferSize|SSLRequire|SSLRequireSSL|SSLSessionCache|SSLSessionCacheTimeout|SSLSessionTicketKeyFile|SSLSRPUnknownUserSeed|SSLSRPVerifierFile|SSLStaplingCache|SSLStaplingErrorCacheTimeout|SSLStaplingFakeTryLater|SSLStaplingForceURL|SSLStaplingResponderTimeout|SSLStaplingResponseMaxAge|SSLStaplingResponseTimeSkew|SSLStaplingReturnResponderErrors|SSLStaplingStandardCacheTimeout|SSLStrictSNIVHostCheck|SSLUserName|SSLUseStapling|SSLVerifyClient|SSLVerifyDepth|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadsPerChild|ThreadStackSize|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|VirtualDocumentRoot|VirtualDocumentRootIP|VirtualScriptAlias|VirtualScriptAliasIP|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/gim, alias: "property" }, "directive-block": { pattern: /<\/?\b(AuthnProviderAlias|AuthzProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|RequireAll|RequireAny|RequireNone|VirtualHost)\b *.*>/gi, inside: { "directive-block": { pattern: /^<\/?\w+/, inside: { punctuation: /^<\/?/ }, alias: "tag" }, "directive-block-parameter": { pattern: /.*[^>]/, inside: { punctuation: /:/, string: { pattern: /("|').*\1/g, inside: { variable: /(\$|%)\{?(\w\.?(\+|\-|:)?)+\}?/g } } }, alias: "attr-value" }, punctuation: />/ }, alias: "tag" }, "directive-flags": { pattern: /\[(\w,?)+\]/g, alias: "keyword" }, string: { pattern: /("|').*\1/g, inside: { variable: /(\$|%)\{?(\w\.?(\+|\-|:)?)+\}?/g } }, variable: /(\$|%)\{?(\w\.?(\+|\-|:)?)+\}?/g, regex: /\^?.*\$|\^.*\$?/g };;
Prism.languages.git = { comment: /^#.*$/m, string: /("|')(\\?.)*?\1/gm, command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s(--|-)\w+/m } }, coord: /^@@.*@@$/m, deleted: /^-(?!-).+$/m, inserted: /^\+(?!\+).+$/m, commit_sha1: /^commit \w{40}$/m };;
!function (e) {
  var a = /\{\{\{[\w\W]+?\}\}\}|\{\{[\w\W]+?\}\}/g;e.languages.handlebars = e.languages.extend("markup", { handlebars: { pattern: a, inside: { delimiter: { pattern: /^\{\{\{?|\}\}\}?$/gi, alias: "punctuation" }, string: /(["'])(\\?.)+?\1/g, number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g, "boolean": /\b(true|false)\b/g, block: { pattern: /^(\s*~?\s*)[#\/]\w+/gi, lookbehind: !0, alias: "keyword" }, brackets: { pattern: /\[[^\]]+\]/, inside: { punctuation: /\[|\]/g, variable: /[\w\W]+/g } }, punctuation: /[!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]/g, variable: /[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+/g } } }), e.languages.insertBefore("handlebars", "tag", { "handlebars-comment": { pattern: /\{\{![\w\W]*?\}\}/g, alias: ["handlebars", "comment"] } }), e.hooks.add("before-highlight", function (e) {
    "handlebars" === e.language && (e.tokenStack = [], e.backupCode = e.code, e.code = e.code.replace(a, function (a) {
      return e.tokenStack.push(a), "___HANDLEBARS" + e.tokenStack.length + "___";
    }));
  }), e.hooks.add("before-insert", function (e) {
    "handlebars" === e.language && (e.code = e.backupCode, delete e.backupCode);
  }), e.hooks.add("after-highlight", function (a) {
    if ("handlebars" === a.language) {
      for (var n, t = 0; n = a.tokenStack[t]; t++) {
        a.highlightedCode = a.highlightedCode.replace("___HANDLEBARS" + (t + 1) + "___", e.highlight(n, a.grammar, "handlebars"));
      }a.element.innerHTML = a.highlightedCode;
    }
  });
}(Prism);;
Prism.hooks.add("after-highlight", function (e) {
  var n = e.element.parentNode;if (n && /pre/i.test(n.nodeName) && -1 !== n.className.indexOf("line-numbers")) {
    var t,
        a = 1 + e.code.split("\n").length;lines = new Array(a), lines = lines.join("<span></span>"), t = document.createElement("span"), t.className = "line-numbers-rows", t.innerHTML = lines, n.hasAttribute("data-start") && (n.style.counterReset = "linenumber " + (parseInt(n.getAttribute("data-start"), 10) - 1)), e.element.appendChild(t);
  }
});;

/***/ }),

/***/ "./resources/assets/js/vendor/scotchPanels.js":
/***/ (function(module, exports) {

/*
* scotchPanels - v1.0.3 - 2014-09-25
* https://github.com/scotch-io/scotch-panels
* Copyright (c) 2014 Nicholas Cerminara <nick@scotch.io>
*/
// Start with Semicolon to block
;(function ($) {

    // Enable Strict Mode
    'use strict';

    // Create Panels Array

    var panels = [];

    // Has done CSS3 browser support check?
    var browserSupportTest = false;
    var has3d = false;
    var hasTransitions = false;

    // Plugin Default Settings
    var defaults = {

        // General Config
        containerSelector: 'body',
        type: 'html', // html, iframe, video, image

        // Styles
        direction: 'top', // top, left, right, bottom
        duration: 300, // ms
        transition: 'ease', // linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(P1x,P1y,P2x,P2y)

        // Browser Support
        easingPluginTransition: 'easeInCirc',
        useCSS: true, // Consider not using if have Fixed Elements
        useEasingPlugin: false, // http://gsgd.co.uk/sandbox/jquery/easing/ only for browser support

        // Image Options
        imageURL: false,

        // Iframe Options
        iframeURL: false,

        // Video Options
        autoPlayVideo: true,
        youtubeID: false,
        youTubeTheme: 'light',

        // TranslateX Options
        distanceX: '70%',

        // TranslateY Options
        forceMinHeight: false,
        minHeight: '200px',

        // Triggers
        closeAfter: 0, // ms
        startOpened: false,
        startOpenedDelay: 0, // ms

        // Event Helpers
        clickSelector: false,
        enableEscapeKey: true,
        hoverSelector: false,
        touchSelector: false,

        // Callbacks
        beforePanelOpen: function beforePanelOpen() {},
        afterPanelOpen: function afterPanelOpen() {},
        beforePanelClose: function beforePanelClose() {},
        afterPanelClose: function afterPanelClose() {}
    };

    $.fn.scotchPanel = function (options) {

        // Check to see if Default Options are Set
        if (typeof options === 'undefined') {
            options = {};
        }

        // Check to see if an element is even selected
        if (this.length === 0) return this;

        // Support selecting Panels
        if (this.length > 1) {

            // Loop through all selected scotch panels
            this.each(function () {
                // Add panel to array
                panels.push($(this).scotchPanel(options));
            });

            // Public Functions Functionality for all at once
            panels.open = function () {
                for (var i = 0; i < panels.length; i++) {
                    panels[i].open();
                }
            };
            panels.close = function () {
                for (var i = 0; i < panels.length; i++) {
                    panels[i].close();
                }
            };
            panels.toggle = function () {
                for (var i = 0; i < panels.length; i++) {
                    panels[i].toggle();
                }
            };

            // Return the Scotch Panels
            return panels;
        }

        // Create Current Scotch Panel Object
        var panel = {};
        panel = this;

        /*=========================================
        =            PRIVATE FUNCTIONS            =
        =========================================*/
        // Prep everything
        var init = function init() {

            // Do CSS3 Check!
            if (!browserSupportTest) {
                browserSupportTest = true;
                has3d = browserSupport.transition();
                hasTransitions = browserSupport.translate3d();
            }

            // Check for HTML5 data attributes instead
            for (var key in defaults) {
                if (defaults.hasOwnProperty(key)) {
                    if (panel.attr('data-' + key.toLowerCase())) {
                        options[key] = panel.data(key.toLowerCase());
                    }
                }
            }

            // Merge Custom Plugin Settings with Default
            panel.settings = $.extend({}, defaults, options);

            // Start DOM and CSS Modifications
            setup();
        };

        // DOM / CSS Changes / Make Things Happen
        var setup = function setup() {

            // Wrap the panel!
            var container = $(panel.settings.containerSelector);
            if (!container.hasClass('scotchified')) {
                container.wrapInner('<div class="scotch-panel-wrapper"><div class="scotch-panel-canvas"></div></div>').addClass('scotchified');
            }

            // Scotch Panel Wrapper CSS
            $('.scotch-panel-wrapper').css({
                'position': 'relative',
                'overflow': 'hidden',
                'width': '100%'
            });
            // Scotch Panel Canvas CSS
            $('.scotch-panel-canvas').css({
                'position': 'relative',
                'height': '100%',
                'width': '100%'
            });
            // Do 3D Stuff separate
            if (panel.settings.useCSS) {
                $('.scotch-panel-canvas').css({
                    '-moz-transform': 'translate3d(0, 0, 0)',
                    '-ms-transform': 'translate3d(0, 0, 0)',
                    '-o-transform': 'translate3d(0, 0, 0)',
                    '-webkit-transform': 'translate3d(0, 0, 0)',
                    'transform': 'translate3d(0, 0, 0)',
                    '-moz-backface-visibility': 'hidden',
                    '-ms-backface-visibility': 'hidden',
                    '-o-backface-visibility': 'hidden',
                    '-webkit-backface-visibility': 'hidden',
                    'backface-visibility': 'hidden'
                });
            }

            // Figure out which off canvas style is used (left, top, right)
            if (panel.settings.direction == 'top') {
                panel.height = panel.height();
                panel.addClass('scotch-panel-top');

                panel.css({
                    'bottom': '100%',
                    'left': '0',
                    'width': '100%',
                    'position': 'absolute',
                    'z-index': '888888',
                    'overflow': 'hidden'
                });
            }
            if (panel.settings.direction == 'bottom') {
                panel.height = panel.height();
                panel.addClass('scotch-panel-bottom');

                panel.css({
                    'top': '100%',
                    'left': '0',
                    'width': '100%',
                    'position': 'absolute',
                    'z-index': '888888',
                    'overflow': 'hidden'
                });
            }
            if (panel.settings.direction == 'left') {
                panel.addClass('scotch-panel-left');

                panel.css({
                    'top': '0',
                    'left': '-' + panel.settings.distanceX,
                    'width': panel.settings.distanceX,
                    'height': '100%',
                    'position': 'absolute',
                    'z-index': '888888',
                    'overflow': 'hidden'
                });
            }
            if (panel.settings.direction == 'right') {
                panel.addClass('scotch-panel-right');

                panel.css({
                    'top': '0',
                    'right': '-' + panel.settings.distanceX,
                    'width': panel.settings.distanceX,
                    'height': '100%',
                    'position': 'absolute',
                    'z-index': '888888',
                    'overflow': 'hidden'
                });
            }
            panel.css({
                '-moz-backface-visibility': 'hidden',
                '-ms-backface-visibility': 'hidden',
                '-o-backface-visibility': 'hidden',
                '-webkit-backface-visibility': 'hidden',
                'backface-visibility': 'hidden'
            });

            // Photo Logic
            if (panel.settings.type == 'image' && panel.settings.imageURL) {
                panel.css({
                    '-o-background-size': 'cover',
                    '-ms-background-size': 'cover',
                    '-moz-background-size': 'cover',
                    '-webkit-background-size': 'cover',
                    'background-size': 'cover',
                    'background-position': '50% 0',
                    'background-repeat': 'no-repeat',
                    'background-image': 'url(' + panel.settings.imageURL + ')'
                });

                // Update Panel Height if top or bottom
                if (panel.settings.direction == 'top' || panel.settings.direction == 'bottom') {
                    panel.css('min-height', panel.settings.minHeight);
                    panel.height = $(panel).height();
                }
            }

            // Iframe Logic
            if (panel.settings.type == 'iframe' && panel.settings.iframeURL) {
                panel.iframeIsLoaded = false;
                panel.append('<iframe frameborder="0" style="width: 100%; height: 100%; display: block; position: relative; min-height: ' + panel.settings.minHeight + '" allowfullscreen></iframe>');

                // Update Panel Height if top or bottom
                if (panel.settings.direction == 'top' || panel.settings.direction == 'bottom') {
                    panel.height = $(panel).height();
                }
            }

            // YouTube Logic
            if (panel.settings.type == 'video' && panel.settings.youtubeID) {
                panel.append('<div id="video-id-' + panel.settings.youtubeID + '" style="min-height: ' + panel.settings.minHeight + '; display: block !important;"><iframe src="//www.youtube.com/embed/' + panel.settings.youtubeID + '?enablejsapi=1&theme=' + panel.settings.youTubeTheme + '" frameborder="0" style="width: 100%; height: 100%; display: block; position: absolute; left: 0; top: 0;" allowfullscreen></iframe></div>');

                // Update Panel Height if top or bottom
                if (panel.settings.direction == 'top' || panel.settings.direction == 'bottom') {
                    panel.height = $(panel).height();
                }
            }

            // Apply CSS3 Transitions if modern browser
            if (has3d && hasTransitions) {
                applyTransition(panel.settings.transition, panel.settings.duration);
            }

            // Open on Start?
            if (panel.settings.startOpened) {
                setTimeout(function () {
                    panel.open();
                }, panel.settings.startOpenedDelay);
            }

            // Close after X milliseconds?
            if (panel.settings.closeAfter != 0) {
                setTimeout(function () {
                    panel.close();
                }, panel.settings.closeAfter);
            }
        };

        // Browser Support Object
        var browserSupport = {
            transition: function transition() {
                // IE 7 + 8 Sucks
                if (!window.getComputedStyle) {
                    return false;
                }

                var b = document.body || document.documentElement,
                    s = b.style,
                    p = 'transition';

                if (typeof s[p] == 'string') {
                    return true;
                }

                // Tests for vendor specific prop
                var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
                p = p.charAt(0).toUpperCase() + p.substr(1);

                for (var i = 0; i < v.length; i++) {
                    if (typeof s[v[i] + p] == 'string') {
                        return true;
                    }
                }

                return false;
            },
            translate3d: function translate3d() {
                // IE 7 + 8 Sucks
                if (!window.getComputedStyle) {
                    return false;
                }

                var el, has3d;

                el = document.createElement('p');
                el.style['transform'] = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
                el.style['margin'] = '0';
                document.body.insertBefore(el, document.body.lastChild);
                has3d = window.getComputedStyle(el).getPropertyValue('transform');

                if (has3d !== undefined) {
                    return has3d !== 'none';
                } else {
                    return false;
                }
            }
        };

        // Toggle YouTube State (Play / Pause)
        var toggleVideoState = function toggleVideoState(element, state) {
            var div = document.getElementById(element);
            var iframe = div.getElementsByTagName('iframe')[0].contentWindow;
            div.style.display = state == 'hide' ? 'none' : '';
            var func = state == 'hide' ? 'pauseVideo' : 'playVideo';
            iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
            div.style['display'] = 'block';
        };

        // Apply CSS Transitions
        var applyTransition = function applyTransition(transition, duration) {
            panel.parents('.scotch-panel-canvas:first').css({
                '-ms-transition': 'all ' + duration + 'ms ' + transition,
                '-moz-transition': 'all ' + duration + 'ms ' + transition,
                '-o-transition': 'all ' + duration + 'ms ' + transition,
                '-webkit-transition': 'all ' + duration + 'ms ' + transition,
                'transition': 'all ' + duration + 'ms ' + transition
            });
        };

        // Toggle Translate Y
        var translateY = function translateY(distanceY) {

            // Auto adapt height if unknown and enabled
            if (panel.settings.forceMinHeight) {
                panel.parents('.scotch-panel-canvas:first').css('min-height', distanceY);
            }

            if (has3d && hasTransitions && panel.settings.useCSS) {

                // Open/Close Before Callbacks (CSS)
                if (panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')) {
                    panel.settings.beforePanelOpen();
                } else {
                    panel.settings.beforePanelClose();
                }

                panel.parents('.scotch-panel-canvas:first').css({
                    '-ms-transform': 'translate3d(0, ' + distanceY + 'px, 0)',
                    '-moz-transform': 'translate3d(0, ' + distanceY + 'px, 0)',
                    '-o-transform': 'translate3d(0, ' + distanceY + 'px, 0)',
                    '-webkit-transform': 'translate3d(0, ' + distanceY + 'px, 0)',
                    'transform': 'translate3d(0, ' + distanceY + 'px, 0)'
                });

                setTimeout(function () {

                    // Open/Close After Callbacks (CSS)
                    if (panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')) {
                        panel.settings.afterPanelOpen();
                    } else {
                        panel.settings.afterPanelClose();
                    }
                }, panel.settings.duration);
            } else {

                // Open/Close Before Callbacks (JS)
                if (panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')) {
                    panel.settings.beforePanelOpen();
                } else {
                    panel.settings.beforePanelClose();
                }

                if (panel.settings.useEasingPlugin) {

                    panel.parents('.scotch-panel-canvas:first').animate({
                        top: distanceY + 'px'
                    }, {
                        duration: panel.settings.duration,
                        easing: panel.settings.easingPluginTransition,
                        complete: function complete() {

                            // Open/Close After Callbacks (JS EASE)
                            if (panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')) {
                                panel.settings.afterPanelOpen();
                            } else {
                                panel.settings.afterPanelClose();
                            }
                        }
                    });
                } else {

                    panel.parents('.scotch-panel-canvas:first').animate({
                        top: distanceY + 'px'
                    }, panel.settings.duration, function () {

                        // Open/Close After Callbacks (JS NO EASE)
                        if (panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')) {
                            panel.settings.afterPanelOpen();
                        } else {
                            panel.settings.afterPanelClose();
                        }
                    });
                }
            }
        };

        // Toggle Translate X
        var translateX = function translateX(distanceX) {

            if (has3d && hasTransitions && panel.settings.useCSS) {

                // Open/Close Before Callbacks (CSS)
                if (panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')) {
                    panel.settings.beforePanelOpen();
                } else {
                    panel.settings.beforePanelClose();
                }

                panel.parents('.scotch-panel-canvas:first').css({
                    '-ms-transform': 'translate3d(' + distanceX + ', 0, 0)',
                    '-moz-transform': 'translate3d(' + distanceX + ', 0, 0)',
                    '-o-transform': 'translate3d(' + distanceX + ', 0, 0)',
                    '-webkit-transform': 'translate3d(' + distanceX + ', 0, 0)',
                    'transform': 'translate3d(' + distanceX + ', 0, 0)'
                });

                setTimeout(function () {

                    // Open/Close After Callbacks (CSS)
                    if (panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')) {
                        panel.settings.afterPanelOpen();
                    } else {
                        panel.settings.afterPanelClose();
                    }
                }, panel.settings.duration);
            } else {

                // Open/Close Before Callbacks (JS)
                if (panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')) {
                    panel.settings.beforePanelOpen();
                } else {
                    panel.settings.beforePanelClose();
                }

                if (panel.settings.useEasingPlugin) {

                    panel.parents('.scotch-panel-canvas:first').animate({
                        left: distanceX
                    }, {
                        duration: panel.settings.duration,
                        easing: panel.settings.easingPluginTransition,
                        complete: function complete() {

                            // Open/Close After Callbacks (JS EASE)
                            if (panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')) {
                                panel.settings.afterPanelOpen();
                            } else {
                                panel.settings.afterPanelClose();
                            }
                        }
                    });
                } else {

                    panel.parents('.scotch-panel-canvas:first').animate({
                        left: distanceX
                    }, panel.settings.duration, function () {

                        // Open/Close After Callbacks (JS NO EASE)
                        if (panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')) {
                            panel.settings.afterPanelOpen();
                        } else {
                            panel.settings.afterPanelClose();
                        }
                    });
                }
            }
        };

        /*========================================
        =            PUBLIC FUNCTIONS            =
        ========================================*/
        // Open the Scotch Panel
        panel.open = function () {
            panel.parents('.scotch-panel-canvas:first').addClass('scotch-is-showing');

            // Load iframe if not loaded
            if (panel.settings.type == 'iframe' && panel.settings.iframeURL && !panel.iframeIsLoaded) {
                panel.iframeIsLoaded = true;
                panel.find('iframe').attr('src', panel.settings.iframeURL);
            }

            // Play YouTube Video
            if (panel.settings.type == 'video' && panel.settings.youtubeID && panel.settings.autoPlayVideo) {
                toggleVideoState('video-id-' + panel.settings.youtubeID, '');
            }

            if (panel.settings.direction == 'top') {
                translateY(panel.height);
            }

            if (panel.settings.direction == 'bottom') {
                translateY('-' + panel.height);
            }

            if (panel.settings.direction == 'left') {
                translateX(panel.settings.distanceX);
            }

            if (panel.settings.direction == 'right') {
                translateX('-' + panel.settings.distanceX);
            }
        };

        // Close ScotchPanel
        panel.close = function () {
            panel.parents('.scotch-panel-canvas:first').removeClass('scotch-is-showing');

            // Pause YouTube Video (after close...)
            setTimeout(function () {
                if (panel.settings.type == 'video' && panel.settings.youtubeID && panel.settings.autoPlayVideo) {
                    toggleVideoState('video-id-' + panel.settings.youtubeID, 'hide');
                }
            }, panel.settings.duration);

            if (panel.settings.direction == 'top' || panel.settings.direction == 'bottom') {
                translateY(0);
            }

            if (panel.settings.direction == 'left' || panel.settings.direction == 'right') {
                translateX(0);
            }
        };

        // Toggle ScotchPanel
        panel.toggle = function () {
            if (panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')) {
                panel.close();
            } else {
                panel.open();
            }
        };

        /*=========================================
        =            MAKE MAGIC HAPPEN            =
        =========================================*/
        init();

        /*===============================
        =            HELEPRS            =
        ===============================*/
        // Escape Key to Close
        $(document).keyup(function (e) {
            if (e.keyCode == 27 && panel.settings.enableEscapeKey) {
                panel.close();
            }
        });

        // Hover Helper
        if (panel.settings.hoverSelector) {
            $(panel.settings.hoverSelector).hover(function () {
                panel.open();
            }, function () {
                panel.close();
            });
        }

        // Click Helper
        if (panel.settings.clickSelector) {
            $(panel.settings.clickSelector).click(function () {
                panel.toggle();

                return false;
            });
        }

        // Touch Helper
        if (panel.settings.touchSelector) {
            $(panel.settings.touchSelector).on('touchstart', function () {
                panel.toggle();

                return false;
            });
        }

        // Return the Scotch Panel Object so Devs can do cool things with it
        return panel;
    };
})(jQuery);

/***/ }),

/***/ "./resources/assets/js/vendor/typeahead.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {/*!
 * typeahead.js 0.10.5
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

(function ($) {
    var _ = function () {
        "use strict";

        return {
            isMsie: function isMsie() {
                return (/(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false
                );
            },
            isBlankString: function isBlankString(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function escapeRegExChars(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function isString(obj) {
                return typeof obj === "string";
            },
            isNumber: function isNumber(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function isUndefined(obj) {
                return typeof obj === "undefined";
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function each(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function every(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function (key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function some(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function (key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            getUniqueId: function () {
                var counter = 0;
                return function () {
                    return counter++;
                };
            }(),
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function defer(fn) {
                setTimeout(fn, 0);
            },
            debounce: function debounce(func, wait, immediate) {
                var timeout, result;
                return function () {
                    var context = this,
                        args = arguments,
                        later,
                        callNow;
                    later = function later() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function throttle(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function later() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function () {
                    var now = new Date(),
                        remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            noop: function noop() {}
        };
    }();
    var VERSION = "0.10.5";
    var tokenizers = function () {
        "use strict";

        return {
            nonword: nonword,
            whitespace: whitespace,
            obj: {
                nonword: getObjTokenizer(nonword),
                whitespace: getObjTokenizer(whitespace)
            }
        };
        function whitespace(str) {
            str = _.toStr(str);
            return str ? str.split(/\s+/) : [];
        }
        function nonword(str) {
            str = _.toStr(str);
            return str ? str.split(/\W+/) : [];
        }
        function getObjTokenizer(tokenizer) {
            return function setKey() {
                var args = [].slice.call(arguments, 0);
                return function tokenize(o) {
                    var tokens = [];
                    _.each(args, function (k) {
                        tokens = tokens.concat(tokenizer(_.toStr(o[k])));
                    });
                    return tokens;
                };
            };
        }
    }();
    var LruCache = function () {
        "use strict";

        function LruCache(maxSize) {
            this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
            this.reset();
            if (this.maxSize <= 0) {
                this.set = this.get = $.noop;
            }
        }
        _.mixin(LruCache.prototype, {
            set: function set(key, val) {
                var tailItem = this.list.tail,
                    node;
                if (this.size >= this.maxSize) {
                    this.list.remove(tailItem);
                    delete this.hash[tailItem.key];
                }
                if (node = this.hash[key]) {
                    node.val = val;
                    this.list.moveToFront(node);
                } else {
                    node = new Node(key, val);
                    this.list.add(node);
                    this.hash[key] = node;
                    this.size++;
                }
            },
            get: function get(key) {
                var node = this.hash[key];
                if (node) {
                    this.list.moveToFront(node);
                    return node.val;
                }
            },
            reset: function reset() {
                this.size = 0;
                this.hash = {};
                this.list = new List();
            }
        });
        function List() {
            this.head = this.tail = null;
        }
        _.mixin(List.prototype, {
            add: function add(node) {
                if (this.head) {
                    node.next = this.head;
                    this.head.prev = node;
                }
                this.head = node;
                this.tail = this.tail || node;
            },
            remove: function remove(node) {
                node.prev ? node.prev.next = node.next : this.head = node.next;
                node.next ? node.next.prev = node.prev : this.tail = node.prev;
            },
            moveToFront: function moveToFront(node) {
                this.remove(node);
                this.add(node);
            }
        });
        function Node(key, val) {
            this.key = key;
            this.val = val;
            this.prev = this.next = null;
        }
        return LruCache;
    }();
    var PersistentStorage = function () {
        "use strict";

        var ls, methods;
        try {
            ls = window.localStorage;
            ls.setItem("~~~", "!");
            ls.removeItem("~~~");
        } catch (err) {
            ls = null;
        }
        function PersistentStorage(namespace) {
            this.prefix = ["__", namespace, "__"].join("");
            this.ttlKey = "__ttl__";
            this.keyMatcher = new RegExp("^" + _.escapeRegExChars(this.prefix));
        }
        if (ls && window.JSON) {
            methods = {
                _prefix: function _prefix(key) {
                    return this.prefix + key;
                },
                _ttlKey: function _ttlKey(key) {
                    return this._prefix(key) + this.ttlKey;
                },
                get: function get(key) {
                    if (this.isExpired(key)) {
                        this.remove(key);
                    }
                    return decode(ls.getItem(this._prefix(key)));
                },
                set: function set(key, val, ttl) {
                    if (_.isNumber(ttl)) {
                        ls.setItem(this._ttlKey(key), encode(now() + ttl));
                    } else {
                        ls.removeItem(this._ttlKey(key));
                    }
                    return ls.setItem(this._prefix(key), encode(val));
                },
                remove: function remove(key) {
                    ls.removeItem(this._ttlKey(key));
                    ls.removeItem(this._prefix(key));
                    return this;
                },
                clear: function clear() {
                    var i,
                        key,
                        keys = [],
                        len = ls.length;
                    for (i = 0; i < len; i++) {
                        if ((key = ls.key(i)).match(this.keyMatcher)) {
                            keys.push(key.replace(this.keyMatcher, ""));
                        }
                    }
                    for (i = keys.length; i--;) {
                        this.remove(keys[i]);
                    }
                    return this;
                },
                isExpired: function isExpired(key) {
                    var ttl = decode(ls.getItem(this._ttlKey(key)));
                    return _.isNumber(ttl) && now() > ttl ? true : false;
                }
            };
        } else {
            methods = {
                get: _.noop,
                set: _.noop,
                remove: _.noop,
                clear: _.noop,
                isExpired: _.noop
            };
        }
        _.mixin(PersistentStorage.prototype, methods);
        return PersistentStorage;
        function now() {
            return new Date().getTime();
        }
        function encode(val) {
            return JSON.stringify(_.isUndefined(val) ? null : val);
        }
        function decode(val) {
            return JSON.parse(val);
        }
    }();
    var Transport = function () {
        "use strict";

        var pendingRequestsCount = 0,
            pendingRequests = {},
            maxPendingRequests = 6,
            sharedCache = new LruCache(10);
        function Transport(o) {
            o = o || {};
            this.cancelled = false;
            this.lastUrl = null;
            this._send = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            this._get = o.rateLimiter ? o.rateLimiter(this._get) : this._get;
            this._cache = o.cache === false ? new LruCache(0) : sharedCache;
        }
        Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
            maxPendingRequests = num;
        };
        Transport.resetCache = function resetCache() {
            sharedCache.reset();
        };
        _.mixin(Transport.prototype, {
            _get: function _get(url, o, cb) {
                var that = this,
                    jqXhr;
                if (this.cancelled || url !== this.lastUrl) {
                    return;
                }
                if (jqXhr = pendingRequests[url]) {
                    jqXhr.done(done).fail(fail);
                } else if (pendingRequestsCount < maxPendingRequests) {
                    pendingRequestsCount++;
                    pendingRequests[url] = this._send(url, o).done(done).fail(fail).always(always);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp) {
                    cb && cb(null, resp);
                    that._cache.set(url, resp);
                }
                function fail() {
                    cb && cb(true);
                }
                function always() {
                    pendingRequestsCount--;
                    delete pendingRequests[url];
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get: function get(url, o, cb) {
                var resp;
                if (_.isFunction(o)) {
                    cb = o;
                    o = {};
                }
                this.cancelled = false;
                this.lastUrl = url;
                if (resp = this._cache.get(url)) {
                    _.defer(function () {
                        cb && cb(null, resp);
                    });
                } else {
                    this._get(url, o, cb);
                }
                return !!resp;
            },
            cancel: function cancel() {
                this.cancelled = true;
            }
        });
        return Transport;
        function callbackToDeferred(fn) {
            return function customSendWrapper(url, o) {
                var deferred = $.Deferred();
                fn(url, o, onSuccess, onError);
                return deferred;
                function onSuccess(resp) {
                    _.defer(function () {
                        deferred.resolve(resp);
                    });
                }
                function onError(err) {
                    _.defer(function () {
                        deferred.reject(err);
                    });
                }
            };
        }
    }();
    var SearchIndex = function () {
        "use strict";

        function SearchIndex(o) {
            o = o || {};
            if (!o.datumTokenizer || !o.queryTokenizer) {
                $.error("datumTokenizer and queryTokenizer are both required");
            }
            this.datumTokenizer = o.datumTokenizer;
            this.queryTokenizer = o.queryTokenizer;
            this.reset();
        }
        _.mixin(SearchIndex.prototype, {
            bootstrap: function bootstrap(o) {
                this.datums = o.datums;
                this.trie = o.trie;
            },
            add: function add(data) {
                var that = this;
                data = _.isArray(data) ? data : [data];
                _.each(data, function (datum) {
                    var id, tokens;
                    id = that.datums.push(datum) - 1;
                    tokens = normalizeTokens(that.datumTokenizer(datum));
                    _.each(tokens, function (token) {
                        var node, chars, ch;
                        node = that.trie;
                        chars = token.split("");
                        while (ch = chars.shift()) {
                            node = node.children[ch] || (node.children[ch] = newNode());
                            node.ids.push(id);
                        }
                    });
                });
            },
            get: function get(query) {
                var that = this,
                    tokens,
                    matches;
                tokens = normalizeTokens(this.queryTokenizer(query));
                _.each(tokens, function (token) {
                    var node, chars, ch, ids;
                    if (matches && matches.length === 0) {
                        return false;
                    }
                    node = that.trie;
                    chars = token.split("");
                    while (node && (ch = chars.shift())) {
                        node = node.children[ch];
                    }
                    if (node && chars.length === 0) {
                        ids = node.ids.slice(0);
                        matches = matches ? getIntersection(matches, ids) : ids;
                    } else {
                        matches = [];
                        return false;
                    }
                });
                return matches ? _.map(unique(matches), function (id) {
                    return that.datums[id];
                }) : [];
            },
            reset: function reset() {
                this.datums = [];
                this.trie = newNode();
            },
            serialize: function serialize() {
                return {
                    datums: this.datums,
                    trie: this.trie
                };
            }
        });
        return SearchIndex;
        function normalizeTokens(tokens) {
            tokens = _.filter(tokens, function (token) {
                return !!token;
            });
            tokens = _.map(tokens, function (token) {
                return token.toLowerCase();
            });
            return tokens;
        }
        function newNode() {
            return {
                ids: [],
                children: {}
            };
        }
        function unique(array) {
            var seen = {},
                uniques = [];
            for (var i = 0, len = array.length; i < len; i++) {
                if (!seen[array[i]]) {
                    seen[array[i]] = true;
                    uniques.push(array[i]);
                }
            }
            return uniques;
        }
        function getIntersection(arrayA, arrayB) {
            var ai = 0,
                bi = 0,
                intersection = [];
            arrayA = arrayA.sort(compare);
            arrayB = arrayB.sort(compare);
            var lenArrayA = arrayA.length,
                lenArrayB = arrayB.length;
            while (ai < lenArrayA && bi < lenArrayB) {
                if (arrayA[ai] < arrayB[bi]) {
                    ai++;
                } else if (arrayA[ai] > arrayB[bi]) {
                    bi++;
                } else {
                    intersection.push(arrayA[ai]);
                    ai++;
                    bi++;
                }
            }
            return intersection;
            function compare(a, b) {
                return a - b;
            }
        }
    }();
    var oParser = function () {
        "use strict";

        return {
            local: getLocal,
            prefetch: getPrefetch,
            remote: getRemote
        };
        function getLocal(o) {
            return o.local || null;
        }
        function getPrefetch(o) {
            var prefetch, defaults;
            defaults = {
                url: null,
                thumbprint: "",
                ttl: 24 * 60 * 60 * 1e3,
                filter: null,
                ajax: {}
            };
            if (prefetch = o.prefetch || null) {
                prefetch = _.isString(prefetch) ? {
                    url: prefetch
                } : prefetch;
                prefetch = _.mixin(defaults, prefetch);
                prefetch.thumbprint = VERSION + prefetch.thumbprint;
                prefetch.ajax.type = prefetch.ajax.type || "GET";
                prefetch.ajax.dataType = prefetch.ajax.dataType || "json";
                !prefetch.url && $.error("prefetch requires url to be set");
            }
            return prefetch;
        }
        function getRemote(o) {
            var remote, defaults;
            defaults = {
                url: null,
                cache: true,
                wildcard: "%QUERY",
                replace: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                send: null,
                filter: null,
                ajax: {}
            };
            if (remote = o.remote || null) {
                remote = _.isString(remote) ? {
                    url: remote
                } : remote;
                remote = _.mixin(defaults, remote);
                remote.rateLimiter = /^throttle$/i.test(remote.rateLimitBy) ? byThrottle(remote.rateLimitWait) : byDebounce(remote.rateLimitWait);
                remote.ajax.type = remote.ajax.type || "GET";
                remote.ajax.dataType = remote.ajax.dataType || "json";
                delete remote.rateLimitBy;
                delete remote.rateLimitWait;
                !remote.url && $.error("remote requires url to be set");
            }
            return remote;
            function byDebounce(wait) {
                return function (fn) {
                    return _.debounce(fn, wait);
                };
            }
            function byThrottle(wait) {
                return function (fn) {
                    return _.throttle(fn, wait);
                };
            }
        }
    }();
    (function (root) {
        "use strict";

        var old, keys;
        old = root.Bloodhound;
        keys = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        };
        root.Bloodhound = Bloodhound;
        function Bloodhound(o) {
            if (!o || !o.local && !o.prefetch && !o.remote) {
                $.error("one of local, prefetch, or remote is required");
            }
            this.limit = o.limit || 5;
            this.sorter = getSorter(o.sorter);
            this.dupDetector = o.dupDetector || ignoreDuplicates;
            this.local = oParser.local(o);
            this.prefetch = oParser.prefetch(o);
            this.remote = oParser.remote(o);
            this.cacheKey = this.prefetch ? this.prefetch.cacheKey || this.prefetch.url : null;
            this.index = new SearchIndex({
                datumTokenizer: o.datumTokenizer,
                queryTokenizer: o.queryTokenizer
            });
            this.storage = this.cacheKey ? new PersistentStorage(this.cacheKey) : null;
        }
        Bloodhound.noConflict = function noConflict() {
            root.Bloodhound = old;
            return Bloodhound;
        };
        Bloodhound.tokenizers = tokenizers;
        _.mixin(Bloodhound.prototype, {
            _loadPrefetch: function loadPrefetch(o) {
                var that = this,
                    serialized,
                    deferred;
                if (serialized = this._readFromStorage(o.thumbprint)) {
                    this.index.bootstrap(serialized);
                    deferred = $.Deferred().resolve();
                } else {
                    deferred = $.ajax(o.url, o.ajax).done(handlePrefetchResponse);
                }
                return deferred;
                function handlePrefetchResponse(resp) {
                    that.clear();
                    that.add(o.filter ? o.filter(resp) : resp);
                    that._saveToStorage(that.index.serialize(), o.thumbprint, o.ttl);
                }
            },
            _getFromRemote: function getFromRemote(query, cb) {
                var that = this,
                    url,
                    uriEncodedQuery;
                if (!this.transport) {
                    return;
                }
                query = query || "";
                uriEncodedQuery = encodeURIComponent(query);
                url = this.remote.replace ? this.remote.replace(this.remote.url, query) : this.remote.url.replace(this.remote.wildcard, uriEncodedQuery);
                return this.transport.get(url, this.remote.ajax, handleRemoteResponse);
                function handleRemoteResponse(err, resp) {
                    err ? cb([]) : cb(that.remote.filter ? that.remote.filter(resp) : resp);
                }
            },
            _cancelLastRemoteRequest: function cancelLastRemoteRequest() {
                this.transport && this.transport.cancel();
            },
            _saveToStorage: function saveToStorage(data, thumbprint, ttl) {
                if (this.storage) {
                    this.storage.set(keys.data, data, ttl);
                    this.storage.set(keys.protocol, location.protocol, ttl);
                    this.storage.set(keys.thumbprint, thumbprint, ttl);
                }
            },
            _readFromStorage: function readFromStorage(thumbprint) {
                var stored = {},
                    isExpired;
                if (this.storage) {
                    stored.data = this.storage.get(keys.data);
                    stored.protocol = this.storage.get(keys.protocol);
                    stored.thumbprint = this.storage.get(keys.thumbprint);
                }
                isExpired = stored.thumbprint !== thumbprint || stored.protocol !== location.protocol;
                return stored.data && !isExpired ? stored.data : null;
            },
            _initialize: function initialize() {
                var that = this,
                    local = this.local,
                    deferred;
                deferred = this.prefetch ? this._loadPrefetch(this.prefetch) : $.Deferred().resolve();
                local && deferred.done(addLocalToIndex);
                this.transport = this.remote ? new Transport(this.remote) : null;
                return this.initPromise = deferred.promise();
                function addLocalToIndex() {
                    that.add(_.isFunction(local) ? local() : local);
                }
            },
            initialize: function initialize(force) {
                return !this.initPromise || force ? this._initialize() : this.initPromise;
            },
            add: function add(data) {
                this.index.add(data);
            },
            get: function get(query, cb) {
                var that = this,
                    matches = [],
                    cacheHit = false;
                matches = this.index.get(query);
                matches = this.sorter(matches).slice(0, this.limit);
                matches.length < this.limit ? cacheHit = this._getFromRemote(query, returnRemoteMatches) : this._cancelLastRemoteRequest();
                if (!cacheHit) {
                    (matches.length > 0 || !this.transport) && cb && cb(matches);
                }
                function returnRemoteMatches(remoteMatches) {
                    var matchesWithBackfill = matches.slice(0);
                    _.each(remoteMatches, function (remoteMatch) {
                        var isDuplicate;
                        isDuplicate = _.some(matchesWithBackfill, function (match) {
                            return that.dupDetector(remoteMatch, match);
                        });
                        !isDuplicate && matchesWithBackfill.push(remoteMatch);
                        return matchesWithBackfill.length < that.limit;
                    });
                    cb && cb(that.sorter(matchesWithBackfill));
                }
            },
            clear: function clear() {
                this.index.reset();
            },
            clearPrefetchCache: function clearPrefetchCache() {
                this.storage && this.storage.clear();
            },
            clearRemoteCache: function clearRemoteCache() {
                this.transport && Transport.resetCache();
            },
            ttAdapter: function ttAdapter() {
                return _.bind(this.get, this);
            }
        });
        return Bloodhound;
        function getSorter(sortFn) {
            return _.isFunction(sortFn) ? sort : noSort;
            function sort(array) {
                return array.sort(sortFn);
            }
            function noSort(array) {
                return array;
            }
        }
        function ignoreDuplicates() {
            return false;
        }
    })(this);
    var html = function () {
        return {
            wrapper: '<span class="twitter-typeahead"></span>',
            dropdown: '<span class="tt-dropdown-menu"></span>',
            dataset: '<div class="tt-dataset-%CLASS%"></div>',
            suggestions: '<span class="tt-suggestions"></span>',
            suggestion: '<div class="tt-suggestion"></div>'
        };
    }();
    var css = function () {
        "use strict";

        var css = {
            wrapper: {
                position: "relative",
                display: "inline-block"
            },
            hint: {
                position: "absolute",
                top: "0",
                left: "0",
                borderColor: "transparent",
                boxShadow: "none",
                opacity: "1"
            },
            input: {
                position: "relative",
                verticalAlign: "top",
                backgroundColor: "transparent"
            },
            inputWithNoHint: {
                position: "relative",
                verticalAlign: "top"
            },
            dropdown: {
                position: "absolute",
                top: "100%",
                left: "0",
                zIndex: "100",
                display: "none"
            },
            suggestions: {
                display: "block"
            },
            suggestion: {
                whiteSpace: "nowrap",
                cursor: "pointer"
            },
            suggestionChild: {
                whiteSpace: "normal"
            },
            ltr: {
                left: "0",
                right: "auto"
            },
            rtl: {
                left: "auto",
                right: " 0"
            }
        };
        if (_.isMsie()) {
            _.mixin(css.input, {
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
            });
        }
        if (_.isMsie() && _.isMsie() <= 7) {
            _.mixin(css.input, {
                marginTop: "-1px"
            });
        }
        return css;
    }();
    var EventBus = function () {
        "use strict";

        var namespace = "typeahead:";
        function EventBus(o) {
            if (!o || !o.el) {
                $.error("EventBus initialized without el");
            }
            this.$el = $(o.el);
        }
        _.mixin(EventBus.prototype, {
            trigger: function trigger(type) {
                var args = [].slice.call(arguments, 1);
                this.$el.trigger(namespace + type, args);
            }
        });
        return EventBus;
    }();
    var EventEmitter = function () {
        "use strict";

        var splitter = /\s+/,
            nextTick = getNextTick();
        return {
            onSync: onSync,
            onAsync: onAsync,
            off: off,
            trigger: trigger
        };
        function on(method, types, cb, context) {
            var type;
            if (!cb) {
                return this;
            }
            types = types.split(splitter);
            cb = context ? bindContext(cb, context) : cb;
            this._callbacks = this._callbacks || {};
            while (type = types.shift()) {
                this._callbacks[type] = this._callbacks[type] || {
                    sync: [],
                    async: []
                };
                this._callbacks[type][method].push(cb);
            }
            return this;
        }
        function onAsync(types, cb, context) {
            return on.call(this, "async", types, cb, context);
        }
        function onSync(types, cb, context) {
            return on.call(this, "sync", types, cb, context);
        }
        function off(types) {
            var type;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            while (type = types.shift()) {
                delete this._callbacks[type];
            }
            return this;
        }
        function trigger(types) {
            var type, callbacks, args, syncFlush, asyncFlush;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            args = [].slice.call(arguments, 1);
            while ((type = types.shift()) && (callbacks = this._callbacks[type])) {
                syncFlush = getFlush(callbacks.sync, this, [type].concat(args));
                asyncFlush = getFlush(callbacks.async, this, [type].concat(args));
                syncFlush() && nextTick(asyncFlush);
            }
            return this;
        }
        function getFlush(callbacks, context, args) {
            return flush;
            function flush() {
                var cancelled;
                for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
                    cancelled = callbacks[i].apply(context, args) === false;
                }
                return !cancelled;
            }
        }
        function getNextTick() {
            var nextTickFn;
            if (window.setImmediate) {
                nextTickFn = function nextTickSetImmediate(fn) {
                    setImmediate(function () {
                        fn();
                    });
                };
            } else {
                nextTickFn = function nextTickSetTimeout(fn) {
                    setTimeout(function () {
                        fn();
                    }, 0);
                };
            }
            return nextTickFn;
        }
        function bindContext(fn, context) {
            return fn.bind ? fn.bind(context) : function () {
                fn.apply(context, [].slice.call(arguments, 0));
            };
        }
    }();
    var highlight = function (doc) {
        "use strict";

        var defaults = {
            node: null,
            pattern: null,
            tagName: "strong",
            className: null,
            wordsOnly: false,
            caseSensitive: false
        };
        return function hightlight(o) {
            var regex;
            o = _.mixin({}, defaults, o);
            if (!o.node || !o.pattern) {
                return;
            }
            o.pattern = _.isArray(o.pattern) ? o.pattern : [o.pattern];
            regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly);
            traverse(o.node, hightlightTextNode);
            function hightlightTextNode(textNode) {
                var match, patternNode, wrapperNode;
                if (match = regex.exec(textNode.data)) {
                    wrapperNode = doc.createElement(o.tagName);
                    o.className && (wrapperNode.className = o.className);
                    patternNode = textNode.splitText(match.index);
                    patternNode.splitText(match[0].length);
                    wrapperNode.appendChild(patternNode.cloneNode(true));
                    textNode.parentNode.replaceChild(wrapperNode, patternNode);
                }
                return !!match;
            }
            function traverse(el, hightlightTextNode) {
                var childNode,
                    TEXT_NODE_TYPE = 3;
                for (var i = 0; i < el.childNodes.length; i++) {
                    childNode = el.childNodes[i];
                    if (childNode.nodeType === TEXT_NODE_TYPE) {
                        i += hightlightTextNode(childNode) ? 1 : 0;
                    } else {
                        traverse(childNode, hightlightTextNode);
                    }
                }
            }
        };
        function getRegex(patterns, caseSensitive, wordsOnly) {
            var escapedPatterns = [],
                regexStr;
            for (var i = 0, len = patterns.length; i < len; i++) {
                escapedPatterns.push(_.escapeRegExChars(patterns[i]));
            }
            regexStr = wordsOnly ? "\\b(" + escapedPatterns.join("|") + ")\\b" : "(" + escapedPatterns.join("|") + ")";
            return caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, "i");
        }
    }(window.document);
    var Input = function () {
        "use strict";

        var specialKeyCodeMap;
        specialKeyCodeMap = {
            9: "tab",
            27: "esc",
            37: "left",
            39: "right",
            13: "enter",
            38: "up",
            40: "down"
        };
        function Input(o) {
            var that = this,
                onBlur,
                onFocus,
                onKeydown,
                onInput;
            o = o || {};
            if (!o.input) {
                $.error("input is missing");
            }
            onBlur = _.bind(this._onBlur, this);
            onFocus = _.bind(this._onFocus, this);
            onKeydown = _.bind(this._onKeydown, this);
            onInput = _.bind(this._onInput, this);
            this.$hint = $(o.hint);
            this.$input = $(o.input).on("blur.tt", onBlur).on("focus.tt", onFocus).on("keydown.tt", onKeydown);
            if (this.$hint.length === 0) {
                this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
            }
            if (!_.isMsie()) {
                this.$input.on("input.tt", onInput);
            } else {
                this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function ($e) {
                    if (specialKeyCodeMap[$e.which || $e.keyCode]) {
                        return;
                    }
                    _.defer(_.bind(that._onInput, that, $e));
                });
            }
            this.query = this.$input.val();
            this.$overflowHelper = buildOverflowHelper(this.$input);
        }
        Input.normalizeQuery = function (str) {
            return (str || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
        };
        _.mixin(Input.prototype, EventEmitter, {
            _onBlur: function onBlur() {
                this.resetInputValue();
                this.trigger("blurred");
            },
            _onFocus: function onFocus() {
                this.trigger("focused");
            },
            _onKeydown: function onKeydown($e) {
                var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
                this._managePreventDefault(keyName, $e);
                if (keyName && this._shouldTrigger(keyName, $e)) {
                    this.trigger(keyName + "Keyed", $e);
                }
            },
            _onInput: function onInput() {
                this._checkInputValue();
            },
            _managePreventDefault: function managePreventDefault(keyName, $e) {
                var preventDefault, hintValue, inputValue;
                switch (keyName) {
                    case "tab":
                        hintValue = this.getHint();
                        inputValue = this.getInputValue();
                        preventDefault = hintValue && hintValue !== inputValue && !withModifier($e);
                        break;

                    case "up":
                    case "down":
                        preventDefault = !withModifier($e);
                        break;

                    default:
                        preventDefault = false;
                }
                preventDefault && $e.preventDefault();
            },
            _shouldTrigger: function shouldTrigger(keyName, $e) {
                var trigger;
                switch (keyName) {
                    case "tab":
                        trigger = !withModifier($e);
                        break;

                    default:
                        trigger = true;
                }
                return trigger;
            },
            _checkInputValue: function checkInputValue() {
                var inputValue, areEquivalent, hasDifferentWhitespace;
                inputValue = this.getInputValue();
                areEquivalent = areQueriesEquivalent(inputValue, this.query);
                hasDifferentWhitespace = areEquivalent ? this.query.length !== inputValue.length : false;
                this.query = inputValue;
                if (!areEquivalent) {
                    this.trigger("queryChanged", this.query);
                } else if (hasDifferentWhitespace) {
                    this.trigger("whitespaceChanged", this.query);
                }
            },
            focus: function focus() {
                this.$input.focus();
            },
            blur: function blur() {
                this.$input.blur();
            },
            getQuery: function getQuery() {
                return this.query;
            },
            setQuery: function setQuery(query) {
                this.query = query;
            },
            getInputValue: function getInputValue() {
                return this.$input.val();
            },
            setInputValue: function setInputValue(value, silent) {
                this.$input.val(value);
                silent ? this.clearHint() : this._checkInputValue();
            },
            resetInputValue: function resetInputValue() {
                this.setInputValue(this.query, true);
            },
            getHint: function getHint() {
                return this.$hint.val();
            },
            setHint: function setHint(value) {
                this.$hint.val(value);
            },
            clearHint: function clearHint() {
                this.setHint("");
            },
            clearHintIfInvalid: function clearHintIfInvalid() {
                var val, hint, valIsPrefixOfHint, isValid;
                val = this.getInputValue();
                hint = this.getHint();
                valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
                isValid = val !== "" && valIsPrefixOfHint && !this.hasOverflow();
                !isValid && this.clearHint();
            },
            getLanguageDirection: function getLanguageDirection() {
                return (this.$input.css("direction") || "ltr").toLowerCase();
            },
            hasOverflow: function hasOverflow() {
                var constraint = this.$input.width() - 2;
                this.$overflowHelper.text(this.getInputValue());
                return this.$overflowHelper.width() >= constraint;
            },
            isCursorAtEnd: function isCursorAtEnd() {
                var valueLength, selectionStart, range;
                valueLength = this.$input.val().length;
                selectionStart = this.$input[0].selectionStart;
                if (_.isNumber(selectionStart)) {
                    return selectionStart === valueLength;
                } else if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart("character", -valueLength);
                    return valueLength === range.text.length;
                }
                return true;
            },
            destroy: function destroy() {
                this.$hint.off(".tt");
                this.$input.off(".tt");
                this.$hint = this.$input = this.$overflowHelper = null;
            }
        });
        return Input;
        function buildOverflowHelper($input) {
            return $('<pre aria-hidden="true"></pre>').css({
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
                fontFamily: $input.css("font-family"),
                fontSize: $input.css("font-size"),
                fontStyle: $input.css("font-style"),
                fontVariant: $input.css("font-variant"),
                fontWeight: $input.css("font-weight"),
                wordSpacing: $input.css("word-spacing"),
                letterSpacing: $input.css("letter-spacing"),
                textIndent: $input.css("text-indent"),
                textRendering: $input.css("text-rendering"),
                textTransform: $input.css("text-transform")
            }).insertAfter($input);
        }
        function areQueriesEquivalent(a, b) {
            return Input.normalizeQuery(a) === Input.normalizeQuery(b);
        }
        function withModifier($e) {
            return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
        }
    }();
    var Dataset = function () {
        "use strict";

        var datasetKey = "ttDataset",
            valueKey = "ttValue",
            datumKey = "ttDatum";
        function Dataset(o) {
            o = o || {};
            o.templates = o.templates || {};
            if (!o.source) {
                $.error("missing source");
            }
            if (o.name && !isValidName(o.name)) {
                $.error("invalid dataset name: " + o.name);
            }
            this.query = null;
            this.highlight = !!o.highlight;
            this.name = o.name || _.getUniqueId();
            this.source = o.source;
            this.displayFn = getDisplayFn(o.display || o.displayKey);
            this.templates = getTemplates(o.templates, this.displayFn);
            this.$el = $(html.dataset.replace("%CLASS%", this.name));
        }
        Dataset.extractDatasetName = function extractDatasetName(el) {
            return $(el).data(datasetKey);
        };
        Dataset.extractValue = function extractDatum(el) {
            return $(el).data(valueKey);
        };
        Dataset.extractDatum = function extractDatum(el) {
            return $(el).data(datumKey);
        };
        _.mixin(Dataset.prototype, EventEmitter, {
            _render: function render(query, suggestions) {
                if (!this.$el) {
                    return;
                }
                var that = this,
                    hasSuggestions;
                this.$el.empty();
                hasSuggestions = suggestions && suggestions.length;
                if (!hasSuggestions && this.templates.empty) {
                    this.$el.html(getEmptyHtml()).prepend(that.templates.header ? getHeaderHtml() : null).append(that.templates.footer ? getFooterHtml() : null);
                } else if (hasSuggestions) {
                    this.$el.html(getSuggestionsHtml()).prepend(that.templates.header ? getHeaderHtml() : null).append(that.templates.footer ? getFooterHtml() : null);
                }
                this.trigger("rendered");
                function getEmptyHtml() {
                    return that.templates.empty({
                        query: query,
                        isEmpty: true
                    });
                }
                function getSuggestionsHtml() {
                    var $suggestions, nodes;
                    $suggestions = $(html.suggestions).css(css.suggestions);
                    nodes = _.map(suggestions, getSuggestionNode);
                    $suggestions.append.apply($suggestions, nodes);
                    that.highlight && highlight({
                        className: "tt-highlight",
                        node: $suggestions[0],
                        pattern: query
                    });
                    return $suggestions;
                    function getSuggestionNode(suggestion) {
                        var $el;
                        $el = $(html.suggestion).append(that.templates.suggestion(suggestion)).data(datasetKey, that.name).data(valueKey, that.displayFn(suggestion)).data(datumKey, suggestion);
                        $el.children().each(function () {
                            $(this).css(css.suggestionChild);
                        });
                        return $el;
                    }
                }
                function getHeaderHtml() {
                    return that.templates.header({
                        query: query,
                        isEmpty: !hasSuggestions
                    });
                }
                function getFooterHtml() {
                    return that.templates.footer({
                        query: query,
                        isEmpty: !hasSuggestions
                    });
                }
            },
            getRoot: function getRoot() {
                return this.$el;
            },
            update: function update(query) {
                var that = this;
                this.query = query;
                this.canceled = false;
                this.source(query, render);
                function render(suggestions) {
                    if (!that.canceled && query === that.query) {
                        that._render(query, suggestions);
                    }
                }
            },
            cancel: function cancel() {
                this.canceled = true;
            },
            clear: function clear() {
                this.cancel();
                this.$el.empty();
                this.trigger("rendered");
            },
            isEmpty: function isEmpty() {
                return this.$el.is(":empty");
            },
            destroy: function destroy() {
                this.$el = null;
            }
        });
        return Dataset;
        function getDisplayFn(display) {
            display = display || "value";
            return _.isFunction(display) ? display : displayFn;
            function displayFn(obj) {
                return obj[display];
            }
        }
        function getTemplates(templates, displayFn) {
            return {
                empty: templates.empty && _.templatify(templates.empty),
                header: templates.header && _.templatify(templates.header),
                footer: templates.footer && _.templatify(templates.footer),
                suggestion: templates.suggestion || suggestionTemplate
            };
            function suggestionTemplate(context) {
                return "<p>" + displayFn(context) + "</p>";
            }
        }
        function isValidName(str) {
            return (/^[_a-zA-Z0-9-]+$/.test(str)
            );
        }
    }();
    var Dropdown = function () {
        "use strict";

        function Dropdown(o) {
            var that = this,
                onSuggestionClick,
                onSuggestionMouseEnter,
                onSuggestionMouseLeave;
            o = o || {};
            if (!o.menu) {
                $.error("menu is required");
            }
            this.isOpen = false;
            this.isEmpty = true;
            this.datasets = _.map(o.datasets, initializeDataset);
            onSuggestionClick = _.bind(this._onSuggestionClick, this);
            onSuggestionMouseEnter = _.bind(this._onSuggestionMouseEnter, this);
            onSuggestionMouseLeave = _.bind(this._onSuggestionMouseLeave, this);
            this.$menu = $(o.menu).on("click.tt", ".tt-suggestion", onSuggestionClick).on("mouseenter.tt", ".tt-suggestion", onSuggestionMouseEnter).on("mouseleave.tt", ".tt-suggestion", onSuggestionMouseLeave);
            _.each(this.datasets, function (dataset) {
                that.$menu.append(dataset.getRoot());
                dataset.onSync("rendered", that._onRendered, that);
            });
        }
        _.mixin(Dropdown.prototype, EventEmitter, {
            _onSuggestionClick: function onSuggestionClick($e) {
                this.trigger("suggestionClicked", $($e.currentTarget));
            },
            _onSuggestionMouseEnter: function onSuggestionMouseEnter($e) {
                this._removeCursor();
                this._setCursor($($e.currentTarget), true);
            },
            _onSuggestionMouseLeave: function onSuggestionMouseLeave() {
                this._removeCursor();
            },
            _onRendered: function onRendered() {
                this.isEmpty = _.every(this.datasets, isDatasetEmpty);
                this.isEmpty ? this._hide() : this.isOpen && this._show();
                this.trigger("datasetRendered");
                function isDatasetEmpty(dataset) {
                    return dataset.isEmpty();
                }
            },
            _hide: function _hide() {
                this.$menu.hide();
            },
            _show: function _show() {
                this.$menu.css("display", "block");
            },
            _getSuggestions: function getSuggestions() {
                return this.$menu.find(".tt-suggestion");
            },
            _getCursor: function getCursor() {
                return this.$menu.find(".tt-cursor").first();
            },
            _setCursor: function setCursor($el, silent) {
                $el.first().addClass("tt-cursor");
                !silent && this.trigger("cursorMoved");
            },
            _removeCursor: function removeCursor() {
                this._getCursor().removeClass("tt-cursor");
            },
            _moveCursor: function moveCursor(increment) {
                var $suggestions, $oldCursor, newCursorIndex, $newCursor;
                if (!this.isOpen) {
                    return;
                }
                $oldCursor = this._getCursor();
                $suggestions = this._getSuggestions();
                this._removeCursor();
                newCursorIndex = $suggestions.index($oldCursor) + increment;
                newCursorIndex = (newCursorIndex + 1) % ($suggestions.length + 1) - 1;
                if (newCursorIndex === -1) {
                    this.trigger("cursorRemoved");
                    return;
                } else if (newCursorIndex < -1) {
                    newCursorIndex = $suggestions.length - 1;
                }
                this._setCursor($newCursor = $suggestions.eq(newCursorIndex));
                this._ensureVisible($newCursor);
            },
            _ensureVisible: function ensureVisible($el) {
                var elTop, elBottom, menuScrollTop, menuHeight;
                elTop = $el.position().top;
                elBottom = elTop + $el.outerHeight(true);
                menuScrollTop = this.$menu.scrollTop();
                menuHeight = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10);
                if (elTop < 0) {
                    this.$menu.scrollTop(menuScrollTop + elTop);
                } else if (menuHeight < elBottom) {
                    this.$menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
                }
            },
            close: function close() {
                if (this.isOpen) {
                    this.isOpen = false;
                    this._removeCursor();
                    this._hide();
                    this.trigger("closed");
                }
            },
            open: function open() {
                if (!this.isOpen) {
                    this.isOpen = true;
                    !this.isEmpty && this._show();
                    this.trigger("opened");
                }
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$menu.css(dir === "ltr" ? css.ltr : css.rtl);
            },
            moveCursorUp: function moveCursorUp() {
                this._moveCursor(-1);
            },
            moveCursorDown: function moveCursorDown() {
                this._moveCursor(+1);
            },
            getDatumForSuggestion: function getDatumForSuggestion($el) {
                var datum = null;
                if ($el.length) {
                    datum = {
                        raw: Dataset.extractDatum($el),
                        value: Dataset.extractValue($el),
                        datasetName: Dataset.extractDatasetName($el)
                    };
                }
                return datum;
            },
            getDatumForCursor: function getDatumForCursor() {
                return this.getDatumForSuggestion(this._getCursor().first());
            },
            getDatumForTopSuggestion: function getDatumForTopSuggestion() {
                return this.getDatumForSuggestion(this._getSuggestions().first());
            },
            update: function update(query) {
                _.each(this.datasets, updateDataset);
                function updateDataset(dataset) {
                    dataset.update(query);
                }
            },
            empty: function empty() {
                _.each(this.datasets, clearDataset);
                this.isEmpty = true;
                function clearDataset(dataset) {
                    dataset.clear();
                }
            },
            isVisible: function isVisible() {
                return this.isOpen && !this.isEmpty;
            },
            destroy: function destroy() {
                this.$menu.off(".tt");
                this.$menu = null;
                _.each(this.datasets, destroyDataset);
                function destroyDataset(dataset) {
                    dataset.destroy();
                }
            }
        });
        return Dropdown;
        function initializeDataset(oDataset) {
            return new Dataset(oDataset);
        }
    }();
    var Typeahead = function () {
        "use strict";

        var attrsKey = "ttAttrs";
        function Typeahead(o) {
            var $menu, $input, $hint;
            o = o || {};
            if (!o.input) {
                $.error("missing input");
            }
            this.isActivated = false;
            this.autoselect = !!o.autoselect;
            this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
            this.$node = buildDom(o.input, o.withHint);
            $menu = this.$node.find(".tt-dropdown-menu");
            $input = this.$node.find(".tt-input");
            $hint = this.$node.find(".tt-hint");
            $input.on("blur.tt", function ($e) {
                var active, isActive, hasActive;
                active = document.activeElement;
                isActive = $menu.is(active);
                hasActive = $menu.has(active).length > 0;
                if (_.isMsie() && (isActive || hasActive)) {
                    $e.preventDefault();
                    $e.stopImmediatePropagation();
                    _.defer(function () {
                        $input.focus();
                    });
                }
            });
            $menu.on("mousedown.tt", function ($e) {
                $e.preventDefault();
            });
            this.eventBus = o.eventBus || new EventBus({
                el: $input
            });
            this.dropdown = new Dropdown({
                menu: $menu,
                datasets: o.datasets
            }).onSync("suggestionClicked", this._onSuggestionClicked, this).onSync("cursorMoved", this._onCursorMoved, this).onSync("cursorRemoved", this._onCursorRemoved, this).onSync("opened", this._onOpened, this).onSync("closed", this._onClosed, this).onAsync("datasetRendered", this._onDatasetRendered, this);
            this.input = new Input({
                input: $input,
                hint: $hint
            }).onSync("focused", this._onFocused, this).onSync("blurred", this._onBlurred, this).onSync("enterKeyed", this._onEnterKeyed, this).onSync("tabKeyed", this._onTabKeyed, this).onSync("escKeyed", this._onEscKeyed, this).onSync("upKeyed", this._onUpKeyed, this).onSync("downKeyed", this._onDownKeyed, this).onSync("leftKeyed", this._onLeftKeyed, this).onSync("rightKeyed", this._onRightKeyed, this).onSync("queryChanged", this._onQueryChanged, this).onSync("whitespaceChanged", this._onWhitespaceChanged, this);
            this._setLanguageDirection();
        }
        _.mixin(Typeahead.prototype, {
            _onSuggestionClicked: function onSuggestionClicked(type, $el) {
                var datum;
                if (datum = this.dropdown.getDatumForSuggestion($el)) {
                    this._select(datum);
                }
            },
            _onCursorMoved: function onCursorMoved() {
                var datum = this.dropdown.getDatumForCursor();
                this.input.setInputValue(datum.value, true);
                this.eventBus.trigger("cursorchanged", datum.raw, datum.datasetName);
            },
            _onCursorRemoved: function onCursorRemoved() {
                this.input.resetInputValue();
                this._updateHint();
            },
            _onDatasetRendered: function onDatasetRendered() {
                this._updateHint();
            },
            _onOpened: function onOpened() {
                this._updateHint();
                this.eventBus.trigger("opened");
            },
            _onClosed: function onClosed() {
                this.input.clearHint();
                this.eventBus.trigger("closed");
            },
            _onFocused: function onFocused() {
                this.isActivated = true;
                this.dropdown.open();
            },
            _onBlurred: function onBlurred() {
                this.isActivated = false;
                this.dropdown.empty();
                this.dropdown.close();
            },
            _onEnterKeyed: function onEnterKeyed(type, $e) {
                var cursorDatum, topSuggestionDatum;
                cursorDatum = this.dropdown.getDatumForCursor();
                topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
                if (cursorDatum) {
                    this._select(cursorDatum);
                    $e.preventDefault();
                } else if (this.autoselect && topSuggestionDatum) {
                    this._select(topSuggestionDatum);
                    $e.preventDefault();
                }
            },
            _onTabKeyed: function onTabKeyed(type, $e) {
                var datum;
                if (datum = this.dropdown.getDatumForCursor()) {
                    this._select(datum);
                    $e.preventDefault();
                } else {
                    this._autocomplete(true);
                }
            },
            _onEscKeyed: function onEscKeyed() {
                this.dropdown.close();
                this.input.resetInputValue();
            },
            _onUpKeyed: function onUpKeyed() {
                var query = this.input.getQuery();
                this.dropdown.isEmpty && query.length >= this.minLength ? this.dropdown.update(query) : this.dropdown.moveCursorUp();
                this.dropdown.open();
            },
            _onDownKeyed: function onDownKeyed() {
                var query = this.input.getQuery();
                this.dropdown.isEmpty && query.length >= this.minLength ? this.dropdown.update(query) : this.dropdown.moveCursorDown();
                this.dropdown.open();
            },
            _onLeftKeyed: function onLeftKeyed() {
                this.dir === "rtl" && this._autocomplete();
            },
            _onRightKeyed: function onRightKeyed() {
                this.dir === "ltr" && this._autocomplete();
            },
            _onQueryChanged: function onQueryChanged(e, query) {
                this.input.clearHintIfInvalid();
                query.length >= this.minLength ? this.dropdown.update(query) : this.dropdown.empty();
                this.dropdown.open();
                this._setLanguageDirection();
            },
            _onWhitespaceChanged: function onWhitespaceChanged() {
                this._updateHint();
                this.dropdown.open();
            },
            _setLanguageDirection: function setLanguageDirection() {
                var dir;
                if (this.dir !== (dir = this.input.getLanguageDirection())) {
                    this.dir = dir;
                    this.$node.css("direction", dir);
                    this.dropdown.setLanguageDirection(dir);
                }
            },
            _updateHint: function updateHint() {
                var datum, val, query, escapedQuery, frontMatchRegEx, match;
                datum = this.dropdown.getDatumForTopSuggestion();
                if (datum && this.dropdown.isVisible() && !this.input.hasOverflow()) {
                    val = this.input.getInputValue();
                    query = Input.normalizeQuery(val);
                    escapedQuery = _.escapeRegExChars(query);
                    frontMatchRegEx = new RegExp("^(?:" + escapedQuery + ")(.+$)", "i");
                    match = frontMatchRegEx.exec(datum.value);
                    match ? this.input.setHint(val + match[1]) : this.input.clearHint();
                } else {
                    this.input.clearHint();
                }
            },
            _autocomplete: function autocomplete(laxCursor) {
                var hint, query, isCursorAtEnd, datum;
                hint = this.input.getHint();
                query = this.input.getQuery();
                isCursorAtEnd = laxCursor || this.input.isCursorAtEnd();
                if (hint && query !== hint && isCursorAtEnd) {
                    datum = this.dropdown.getDatumForTopSuggestion();
                    datum && this.input.setInputValue(datum.value);
                    this.eventBus.trigger("autocompleted", datum.raw, datum.datasetName);
                }
            },
            _select: function select(datum) {
                this.input.setQuery(datum.value);
                this.input.setInputValue(datum.value, true);
                this._setLanguageDirection();
                this.eventBus.trigger("selected", datum.raw, datum.datasetName);
                this.dropdown.close();
                _.defer(_.bind(this.dropdown.empty, this.dropdown));
            },
            open: function open() {
                this.dropdown.open();
            },
            close: function close() {
                this.dropdown.close();
            },
            setVal: function setVal(val) {
                val = _.toStr(val);
                if (this.isActivated) {
                    this.input.setInputValue(val);
                } else {
                    this.input.setQuery(val);
                    this.input.setInputValue(val, true);
                }
                this._setLanguageDirection();
            },
            getVal: function getVal() {
                return this.input.getQuery();
            },
            destroy: function destroy() {
                this.input.destroy();
                this.dropdown.destroy();
                destroyDomStructure(this.$node);
                this.$node = null;
            }
        });
        return Typeahead;
        function buildDom(input, withHint) {
            var $input, $wrapper, $dropdown, $hint;
            $input = $(input);
            $wrapper = $(html.wrapper).css(css.wrapper);
            $dropdown = $(html.dropdown).css(css.dropdown);
            $hint = $input.clone().css(css.hint).css(getBackgroundStyles($input));
            $hint.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder required").prop("readonly", true).attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            });
            $input.data(attrsKey, {
                dir: $input.attr("dir"),
                autocomplete: $input.attr("autocomplete"),
                spellcheck: $input.attr("spellcheck"),
                style: $input.attr("style")
            });
            $input.addClass("tt-input").attr({
                autocomplete: "off",
                spellcheck: false
            }).css(withHint ? css.input : css.inputWithNoHint);
            try {
                !$input.attr("dir") && $input.attr("dir", "auto");
            } catch (e) {}
            return $input.wrap($wrapper).parent().prepend(withHint ? $hint : null).append($dropdown);
        }
        function getBackgroundStyles($el) {
            return {
                backgroundAttachment: $el.css("background-attachment"),
                backgroundClip: $el.css("background-clip"),
                backgroundColor: $el.css("background-color"),
                backgroundImage: $el.css("background-image"),
                backgroundOrigin: $el.css("background-origin"),
                backgroundPosition: $el.css("background-position"),
                backgroundRepeat: $el.css("background-repeat"),
                backgroundSize: $el.css("background-size")
            };
        }
        function destroyDomStructure($node) {
            var $input = $node.find(".tt-input");
            _.each($input.data(attrsKey), function (val, key) {
                _.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
            });
            $input.detach().removeData(attrsKey).removeClass("tt-input").insertAfter($node);
            $node.remove();
        }
    }();
    (function () {
        "use strict";

        var old, typeaheadKey, methods;
        old = $.fn.typeahead;
        typeaheadKey = "ttTypeahead";
        methods = {
            initialize: function initialize(o, datasets) {
                datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);
                o = o || {};
                return this.each(attach);
                function attach() {
                    var $input = $(this),
                        eventBus,
                        typeahead;
                    _.each(datasets, function (d) {
                        d.highlight = !!o.highlight;
                    });
                    typeahead = new Typeahead({
                        input: $input,
                        eventBus: eventBus = new EventBus({
                            el: $input
                        }),
                        withHint: _.isUndefined(o.hint) ? true : !!o.hint,
                        minLength: o.minLength,
                        autoselect: o.autoselect,
                        datasets: datasets
                    });
                    $input.data(typeaheadKey, typeahead);
                }
            },
            open: function open() {
                return this.each(openTypeahead);
                function openTypeahead() {
                    var $input = $(this),
                        typeahead;
                    if (typeahead = $input.data(typeaheadKey)) {
                        typeahead.open();
                    }
                }
            },
            close: function close() {
                return this.each(closeTypeahead);
                function closeTypeahead() {
                    var $input = $(this),
                        typeahead;
                    if (typeahead = $input.data(typeaheadKey)) {
                        typeahead.close();
                    }
                }
            },
            val: function val(newVal) {
                return !arguments.length ? getVal(this.first()) : this.each(setVal);
                function setVal() {
                    var $input = $(this),
                        typeahead;
                    if (typeahead = $input.data(typeaheadKey)) {
                        typeahead.setVal(newVal);
                    }
                }
                function getVal($input) {
                    var typeahead, query;
                    if (typeahead = $input.data(typeaheadKey)) {
                        query = typeahead.getVal();
                    }
                    return query;
                }
            },
            destroy: function destroy() {
                return this.each(unattach);
                function unattach() {
                    var $input = $(this),
                        typeahead;
                    if (typeahead = $input.data(typeaheadKey)) {
                        typeahead.destroy();
                        $input.removeData(typeaheadKey);
                    }
                }
            }
        };
        $.fn.typeahead = function (method) {
            var tts;
            if (methods[method] && method !== "initialize") {
                tts = this.filter(function () {
                    return !!$(this).data(typeaheadKey);
                });
                return methods[method].apply(tts, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
        $.fn.typeahead.noConflict = function noConflict() {
            $.fn.typeahead = old;
            return this;
        };
    })();
})(window.jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./resources/assets/sass/laravel.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./resources/assets/js/laravel.js");
module.exports = __webpack_require__("./resources/assets/sass/laravel.scss");


/***/ })

/******/ });