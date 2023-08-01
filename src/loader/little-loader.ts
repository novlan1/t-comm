/**
 * @module tools/little-loader
 * @description  用户程序化在页面加载js文件，修改https://github.com/walmartlabs/little-loader，支持指定编码，支持排重
 * 这个文件比较好的地方在于支持IE<10的js加载后回调，IE<10占比再小一点的话，可以去掉。
 */

/**
 * Script loading is difficult thanks to IE. We need callbacks to fire
 * immediately following the script's execution, with no other scripts
 * running in between. If other scripts on the page are able to run
 * between our script and its callback, bad things can happen, such as
 * `jQuery.noConflict` not being called in time, resulting in plugins
 * latching onto our version of jQuery, etc.
 *
 * For IE<10 we use a relatively well-documented "preloading" strategy,
 * which ensures that the script is ready to execute *before* appending
 * it to the DOM. That way when it is finally appended, it is
 * executed immediately.
 *
 * References:
 * - http://www.html5rocks.com/en/tutorials/speed/script-loading/
 * - http://blog.getify.com/ie11-please-bring-real-script-preloading-back/
 * - https://github.com/jrburke/requirejs/issues/526
 * - https://connect.microsoft.com/IE/feedback/details/729164/
 *           ie10-dynamic-script-element-fires-loaded-readystate-prematurely
 */
// Global state.
const pendingScripts: Record<string, any> = {};
let scriptCounter = 0;

const _addScript = function (script: any) {
  // Get the first script element, we're just going to use it
  // as a reference for where to insert ours. Do NOT try to do
  // this just once at the top and then re-use the same script
  // as a reference later. Some weird loaders *remove* script
  // elements after the browser has executed their contents,
  // so the same reference might not have a parentNode later.
  const firstScript = document.getElementsByTagName('script')[0];

  // Append the script to the DOM, triggering execution.
  firstScript?.parentNode?.insertBefore(script, firstScript);
};

/**
   * 加载js文件
   * @param {String}          src  js文件路径
   * @param {Function|Object} callback  加载回调
   * @param {String}          charset  指定js的字符集
   * @param {Object}          context Callback context
   */
// eslint-disable-next-line max-statements
export const loader = function (src: string, callback: any, charset = 'utf-8', context = null) {
  /* eslint max-statements: [2, 32]*/
  let setup;

  if (callback && typeof callback !== 'function') {
    context = callback.context || context;
    setup = callback.setup;
    callback = callback.callback;
  }

  let done = false;
  let err: any;
  let _cleanup: any; // _must_ be set below.

  /**
     * Final handler for error or completion.
     *
     * **Note**: Will only be called _once_.
     *
     * @returns {void}
     */
  const _finish = function () {
    // Only call once.
    if (done) {
      return;
    }
    done = true;

    // Internal cleanup.
    _cleanup?.();

    // Callback.
    if (callback) {
      callback.call(context, err);
    }
  };

  /**
     * Error handler
     *
     * @returns {void}
     */
  const _error = function () {
    err = new Error(src || 'EMPTY');
    _finish();
  };

  const curScript = document.querySelector(`script[src="${src}"]`) as any;
  if (curScript) {
    const tc = setInterval(() => {
      if (curScript.isready) { // 判断js加载完成
        _finish();
        clearInterval(tc);
      }
    }, 20);
  } else {
    const script = document.createElement('script') as any;
    script.isready = false;

    if (script.readyState && !('async' in script)) {
      /* eslint-disable consistent-return*/

      // This section is only for IE<10. Some other old browsers may
      // satisfy the above condition and enter this branch, but we don't
      // support those browsers anyway.

      scriptCounter = scriptCounter + 1;
      const id = scriptCounter;
      const isReady: Record<string, any> = { loaded: true, complete: true };
      let inserted = false;

      // Clear out listeners, state.
      _cleanup = function () {
        script.onreadystatechange = null;
        script.onerror = null;
        pendingScripts[id] = void 0;
      };

      // Attach the handler before setting src, otherwise we might
      // miss events (consider that IE could fire them synchronously
      // upon setting src, for example).
      script.onreadystatechange = function () {
        const firstState = script.readyState;

        // Protect against any errors from state change randomness.
        if (err) {
          return;
        }

        if (!inserted && isReady[firstState]) {
          inserted = true;

          // Append to DOM.
          _addScript(script);
        }

        // --------------------------------------------------------------------
        //                       GLORIOUS IE8 HACKAGE!!!
        // --------------------------------------------------------------------
        //
        // Oh IE8, how you disappoint. IE8 won't call `script.onerror`, so
        // we have to resort to drastic measures.
        // See, e.g. http://www.quirksmode.org/dom/events/error.html#t02
        //
        // As with all things development, there's a Stack Overflow comment that
        // asserts the following combinations of state changes in IE8 indicate a
        // script load error. And crazily, it seems to work!
        //
        // http://stackoverflow.com/a/18840568/741892
        //
        // The `script.readyState` transitions we're interested are:
        //
        // * If state starts as `loaded`
        // * Call `script.children`, which _should_ change state to `complete`
        // * If state is now `loading`, then **we have a load error**
        //
        // For the reader's amusement, here is HeadJS's catalog of various
        // `readyState` transitions in normal operation for IE:
        // https://github.com/headjs/headjs/blob/master/src/2.0.0/load.js#L379-L419
        if (firstState === 'loaded') {
          // The act of accessing the property should change the script's
          // `readyState`.
          //
          // And, oh yeah, this hack is so hacky-ish we need the following
          // eslint disable...
          /* eslint-disable no-unused-expressions*/
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          script.children;

          if (script.readyState === 'loading') {
            // State transitions indicate we've hit the load error.
            //
            // **Note**: We are not intending to _return_ a value, just have
            // a shorter short-circuit code path here.
            return _error();
          }
        }

        // It's possible for readyState to be "complete" immediately
        // after we insert (and execute) the script in the branch
        // above. So check readyState again here and react without
        // waiting for another onreadystatechange.
        if (script.readyState === 'complete') {
          script.isready = true;
          _finish();
        }
      };

      // Onerror handler _may_ work here.
      script.onerror = _error;

      // Since we're not appending the script to the DOM yet, the
      // reference to our script element might get garbage collected
      // when this function ends, without onreadystatechange ever being
      // fired. This has been witnessed to happen. Adding it to
      // `pendingScripts` ensures this can't happen.
      pendingScripts[id] = script;

      // call the setup callback to mutate the script tag
      if (setup) {
        setup.call(context, script);
      }

      // This triggers a request for the script, but its contents won't
      // be executed until we append it to the DOM.
      script.src = src;

      // In some cases, the readyState is already "loaded" immediately
      // after setting src. It's a lie! Don't append to the DOM until
      // the onreadystatechange event says so.
    } else {
      // This section is for modern browsers, including IE10+.

      // Clear out listeners.
      _cleanup = function () {
        script.onload = null;
        script.onerror = null;
      };

      script.onerror = _error;
      script.onload = () => {
        script.isready = true;
        _finish();
      };
      script.async = true;
      script.charset = charset || 'utf-8';

      // call the setup callback to mutate the script tag
      if (setup) {
        setup.call(context, script);
      }

      script.src = src;

      // Append to DOM.
      _addScript(script);
    }
  }
};

