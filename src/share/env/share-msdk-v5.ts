export function msdkShareV5(type: 1 | 2 | 3 | 4, dict: Record<string, any>) {
  const json = {
    1: {
      method: 'sendMsgWebView',
      channel: 'WeChat',
    },
    2: {
      method: 'shareWebView',
      channel: 'WeChat',
    },
    3: {
      method: 'sendMsgWebView',
      channel: 'QQ',
    },
    4: {
      method: 'shareWebView',
      channel: 'QQ',
    },
  };
  const obj = JSON.stringify({
    MsdkMethod: json[type].method,
    actionReport: 'MSG_INVITE',
    channel: json[type].channel,
    desc: dict.desc,
    imagePath: dict.imgUrl  || dict.icon,
    link: dict.url || dict.link,
    messageExt: 'messageExt',
    tailLogo: 'WECHAT_SNS_JUMP_APP',
    thumbPath: dict.imgUrl || dict.icon,
    title: dict.title,
    type: 10001,
    user: '',
  });
  msdkCall(obj);
}

function connectWebViewJavascriptBridge(callback: Function) {
  if (window?.WebViewJavascriptBridge) {
    callback(window.WebViewJavascriptBridge);
  } else {
    document?.addEventListener('WebViewJavascriptBridgeReady', () => {
      callback(window.WebViewJavascriptBridge);
    }, false);
  }
}


function isiOS() {
  const agent = navigator.userAgent;
  return !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
}

// 原生方法调用
function msdkCall(data: any) {
  let msdkiOSHandler: any;

  connectWebViewJavascriptBridge((bridge: any) => {
    bridge.init((message: any, responseCallback: any) => {
      console.log('JS got a message', message);
      const data = {
        'Javascript Responds': 'Wee!',
      };
      console.log('JS responding with', data);
      responseCallback(data);
    });
    bridge.registerHandler('msdkNativeCallback', (data: any) => {
      window.msdkNativeCallback?.(data);
    });
    msdkiOSHandler = bridge.callHandler;
  });


  if (isiOS()) {
    msdkiOSHandler('MSDKCall', data, null);
  } else {
    if (data.indexOf('nativeCallJS') > -1) {
      alert(data);
    } else {
      prompt(data);
    }
  }
}
