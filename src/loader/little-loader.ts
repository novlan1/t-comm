const pendingScripts: Record<string, any> = {};
let scriptCounter = 0;

const addScript = function (script: any) {
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
export const loader = function (src: string, callback: any, charset = 'utf-8', context = null) {
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
          addScript(script);
        }


        if (firstState === 'loaded') {
          // The act of accessing the property should change the script's
          // `readyState`.
          //
          // And, oh yeah, this hack is so hacky-ish we need the following
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
      addScript(script);
    }
  }
};

