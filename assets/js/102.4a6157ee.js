(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{514:function(t,a,s){"use strict";s.r(a);var r=s(25),e=Object(r.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#resolveurlparams-url-key"}},[t._v("resolveUrlParams([url], [key])")])]),a("li",[a("a",{attrs:{href:"#formaturlparams-url-keepparamsobj-forcehistorymode"}},[t._v("formatUrlParams(url, keepParamsObj, [forceHistoryMode])")])]),a("li",[a("a",{attrs:{href:"#extendurlparams-url-extparamsobj-forcehistorymode"}},[t._v("extendUrlParams(url, extParamsObj, [forceHistoryMode])")])]),a("li",[a("a",{attrs:{href:"#removeurlparams-url-removekeyarr"}},[t._v("removeUrlParams(url, removeKeyArr)")])]),a("li",[a("a",{attrs:{href:"#keepurlparams-url-keepkeyarr-forcehistorymode"}},[t._v("keepUrlParams(url, keepKeyArr, [forceHistoryMode])")])]),a("li",[a("a",{attrs:{href:"#filterurlparams-params"}},[t._v("filterUrlParams([params])")])]),a("li",[a("a",{attrs:{href:"#getqueryobj-url"}},[t._v("getQueryObj(url)")])]),a("li",[a("a",{attrs:{href:"#composeurlquery-url-queryobj"}},[t._v("composeUrlQuery(url, queryObj)")])]),a("li",[a("a",{attrs:{href:"#encodeurlparam-obj"}},[t._v("encodeUrlParam(obj)")])]),a("li",[a("a",{attrs:{href:"#decodeurlparam-obj"}},[t._v("decodeUrlParam(obj)")])]),a("li",[a("a",{attrs:{href:"#geturlpara-paraname-search"}},[t._v("getUrlPara(paraName, search)")])])])]),a("p"),t._v(" "),a("h2",[t._v("引入")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  resolveUrlParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  formatUrlParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  extendUrlParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  removeUrlParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  keepUrlParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  filterUrlParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  getQueryObj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  composeUrlQuery"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  encodeUrlParam"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  decodeUrlParam"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  getUrlPara\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'t-comm'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// or")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  resolveUrlParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  formatUrlParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  extendUrlParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  removeUrlParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  keepUrlParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  filterUrlParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  getQueryObj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  composeUrlQuery"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  encodeUrlParam"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  decodeUrlParam"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  getUrlPara\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'t-comm/lib/url/index'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"resolveurlparams-url-key"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#resolveurlparams-url-key"}},[t._v("#")]),t._v(" "),a("code",[t._v("resolveUrlParams([url], [key])")])]),t._v(" "),a("p",[a("strong",[t._v("描述")]),t._v("：")]),a("p",[t._v("提取链接参数，兼容hash模式和history模式，以及拼接异常情况")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("参数")]),t._v("：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数名")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th",[t._v("默认值")]),t._v(" "),a("th",[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("[url]")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[a("code",[t._v("\"''\"")])]),t._v(" "),a("td",[a("p",[t._v("地址")])])]),t._v(" "),a("tr",[a("td",[t._v("[key]")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[a("code",[t._v("\"''\"")])]),t._v(" "),a("td",[a("p",[t._v("可选，若不为空，则提取返回该key对应的参数值")])])])])]),t._v(" "),a("p",[a("strong",[t._v("返回")]),t._v(": ")]),a("p",[t._v("地址参数对象，或者是指定参数值")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" url "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://igame.qq.com?name=mike&age=18#/index?from=china&home=china'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" params "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolveUrlParams")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// { from: 'china', home: 'china', name: 'mike', age: 18 }")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" paramsAge "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolveUrlParams")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'age'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 18")]),t._v("\n")])])]),a("p",[a("a",{attrs:{name:"formatUrlParams"}})]),t._v(" "),a("h2",{attrs:{id:"formaturlparams-url-keepparamsobj-forcehistorymode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#formaturlparams-url-keepparamsobj-forcehistorymode"}},[t._v("#")]),t._v(" "),a("code",[t._v("formatUrlParams(url, keepParamsObj, [forceHistoryMode])")])]),t._v(" "),a("p",[a("strong",[t._v("描述")]),t._v("：")]),a("p",[t._v("根据传入的参数，移除原来的所有参数，根据传入的 keepParamsObj 进行重新拼接地址，以 hash 模式返回")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("参数")]),t._v("：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数名")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th",[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("url")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[a("p",[t._v("地址")])])]),t._v(" "),a("tr",[a("td",[t._v("keepParamsObj")]),t._v(" "),a("td",[a("code",[t._v("object")])]),t._v(" "),a("td",[a("p",[t._v("参数对象")])])]),t._v(" "),a("tr",[a("td",[t._v("[forceHistoryMode]")]),t._v(" "),a("td",[a("code",[t._v("boolean")])]),t._v(" "),a("td",[a("p",[t._v("是否强制 history 模式")])])])])]),t._v(" "),a("p",[a("strong",[t._v("返回")]),t._v(": ")]),a("p",[t._v("只有传入参数的地址")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" url1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("formatUrlParams")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://www.test.com?a=1&b=2&c=3'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// http://www.test.com/#/?e=5")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" url2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("formatUrlParams")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://www.test.com?a=1&b=2&c=3#/detail?d=4'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" f"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// http://www.test.com/#/detail?f=5")]),t._v("\n")])])]),a("p",[a("a",{attrs:{name:"extendUrlParams"}})]),t._v(" "),a("h2",{attrs:{id:"extendurlparams-url-extparamsobj-forcehistorymode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#extendurlparams-url-extparamsobj-forcehistorymode"}},[t._v("#")]),t._v(" "),a("code",[t._v("extendUrlParams(url, extParamsObj, [forceHistoryMode])")])]),t._v(" "),a("p",[a("strong",[t._v("描述")]),t._v("：")]),a("p",[t._v("拼接额外参数")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("参数")]),t._v("：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数名")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th",[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("url")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[a("p",[t._v("地址")])])]),t._v(" "),a("tr",[a("td",[t._v("extParamsObj")]),t._v(" "),a("td",[a("code",[t._v("object")])]),t._v(" "),a("td",[a("p",[t._v("待添加的参数对象")])])]),t._v(" "),a("tr",[a("td",[t._v("[forceHistoryMode]")]),t._v(" "),a("td",[a("code",[t._v("boolean")])]),t._v(" "),a("td",[a("p",[t._v("是否强制 history 模式")])])])])]),t._v(" "),a("p",[a("strong",[t._v("返回")]),t._v(": ")]),a("p",[t._v("重新拼接的地址")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" url1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("extendUrlParams")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://www.test.com?a=1&b=2&c=3#/detail?d=4'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'http://www.test.com/#/detail?a=1&b=2&c=3&d=4&e=5'")]),t._v("\n")])])]),a("p",[a("a",{attrs:{name:"removeUrlParams"}})]),t._v(" "),a("h2",{attrs:{id:"removeurlparams-url-removekeyarr"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#removeurlparams-url-removekeyarr"}},[t._v("#")]),t._v(" "),a("code",[t._v("removeUrlParams(url, removeKeyArr)")])]),t._v(" "),a("p",[a("strong",[t._v("描述")]),t._v("：")]),a("p",[t._v("移除参数")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("参数")]),t._v("：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数名")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th",[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("url")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[a("p",[t._v("地址")])])]),t._v(" "),a("tr",[a("td",[t._v("removeKeyArr")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[a("p",[t._v("待移除的参数名集合")])])])])]),t._v(" "),a("p",[a("strong",[t._v("返回")]),t._v(": ")]),a("p",[t._v("重新拼接的地址")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" url "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeUrlParams")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://www.test.com/#/detail?a=1&b=2&c=3'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'b'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'http://www.test.com/#/detail?c=3'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" url2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeUrlParams")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://www.test.com?d=4&f=6#/detail?a=1&b=2&c=3'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'d'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'http://www.test.com/#/detail?b=2&c=3&f=6'")]),t._v("\n")])])]),a("p",[a("a",{attrs:{name:"keepUrlParams"}})]),t._v(" "),a("h2",{attrs:{id:"keepurlparams-url-keepkeyarr-forcehistorymode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#keepurlparams-url-keepkeyarr-forcehistorymode"}},[t._v("#")]),t._v(" "),a("code",[t._v("keepUrlParams(url, keepKeyArr, [forceHistoryMode])")])]),t._v(" "),a("p",[a("strong",[t._v("描述")]),t._v("：")]),a("p",[t._v("除保留参数外，一律移除")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("参数")]),t._v("：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数名")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th",[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("url")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[a("p",[t._v("地址")])])]),t._v(" "),a("tr",[a("td",[t._v("keepKeyArr")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[a("p",[t._v("待保留的参数名集合")])])]),t._v(" "),a("tr",[a("td",[t._v("[forceHistoryMode]")]),t._v(" "),a("td",[a("code",[t._v("boolean")])]),t._v(" "),a("td",[a("p",[t._v("是否强制 history 模式")])])])])]),t._v(" "),a("p",[a("strong",[t._v("返回")]),t._v(": ")]),a("p",[t._v("重新拼接的地址")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" url "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("keepUrlParams")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://www.test.com?a=1&b=2&c=3#/detail?d=4'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'d'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'http://www.test.com/#/detail?a=1&d=4'")]),t._v("\n")])])]),a("p",[a("a",{attrs:{name:"filterUrlParams"}})]),t._v(" "),a("h2",{attrs:{id:"filterurlparams-params"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#filterurlparams-params"}},[t._v("#")]),t._v(" "),a("code",[t._v("filterUrlParams([params])")])]),t._v(" "),a("p",[a("strong",[t._v("描述")]),t._v("：")]),a("p",[t._v("根据地址长度，进行过滤地址参数，允许指定保留特定参数")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("参数")]),t._v("：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数名")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th",[t._v("默认值")]),t._v(" "),a("th",[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("[params]")]),t._v(" "),a("td",[a("code",[t._v("object")])]),t._v(" "),a("td",[a("code",[t._v("{ limit: 1024 }")])]),t._v(" "),a("td",[a("p",[t._v("参数")])])]),t._v(" "),a("tr",[a("td",[t._v("params.url")]),t._v(" "),a("td",[a("code",[t._v("number")])]),t._v(" "),a("td"),t._v(" "),a("td",[a("p",[t._v("待过滤地址，默认当前页面地址")])])]),t._v(" "),a("tr",[a("td",[t._v("params.limit")]),t._v(" "),a("td",[a("code",[t._v("number")])]),t._v(" "),a("td"),t._v(" "),a("td",[a("p",[t._v("参数长度限制")])])]),t._v(" "),a("tr",[a("td",[t._v("params.keepKey")]),t._v(" "),a("td",[a("code",[t._v("array")])]),t._v(" "),a("td"),t._v(" "),a("td",[a("p",[t._v("指定保留的参数，比如业务参数、框架参数（登录态、统计上报等）")])])])])]),t._v(" "),a("p",[a("a",{attrs:{name:"getQueryObj"}})]),t._v(" "),a("h2",{attrs:{id:"getqueryobj-url"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getqueryobj-url"}},[t._v("#")]),t._v(" "),a("code",[t._v("getQueryObj(url)")])]),t._v(" "),a("p",[a("strong",[t._v("描述")]),t._v("：")]),a("p",[t._v("url参数变对象")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("参数")]),t._v("：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数名")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th",[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("url")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[a("p",[t._v("输入URL")])])])])]),t._v(" "),a("p",[a("strong",[t._v("返回")]),t._v(": "),a("code",[t._v("Object")]),a("br")]),t._v(" "),a("p",[t._v("search对象")]),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" res "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getQueryObj")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://igame.qq.com?name=mike&age=18&feel=cold&from=China'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mike'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  age"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'18'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  feel"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"cold"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  from"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'China'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[a("a",{attrs:{name:"composeUrlQuery"}})]),t._v(" "),a("h2",{attrs:{id:"composeurlquery-url-queryobj"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#composeurlquery-url-queryobj"}},[t._v("#")]),t._v(" "),a("code",[t._v("composeUrlQuery(url, queryObj)")])]),t._v(" "),a("p",[a("strong",[t._v("描述")]),t._v("：")]),a("p",[t._v("组装"),a("code",[t._v("url")]),t._v("参数，将search参数添加在后面")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("参数")]),t._v("：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数名")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th",[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("url")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[a("p",[t._v("输入URL")])])]),t._v(" "),a("tr",[a("td",[t._v("queryObj")]),t._v(" "),a("td",[a("code",[t._v("Object")])]),t._v(" "),a("td",[a("p",[t._v("search对象")])])])])]),t._v(" "),a("p",[a("strong",[t._v("返回")]),t._v(": "),a("code",[t._v("string")]),a("br")]),t._v(" "),a("p",[t._v("组装后的url")]),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("composeUrlQuery")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://baidu.com'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mike'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  feel"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'cold'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  age"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'18'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  from"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'test'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// https://baidu.com?name=mike&feel=cold&age=18&from=test")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("composeUrlQuery")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://baidu.com?gender=male'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mike'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  feel"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'cold'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  age"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'18'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  from"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'test'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// https://baidu.com?gender=male&name=mike&feel=cold&age=18&from=test")]),t._v("\n")])])]),a("p",[a("a",{attrs:{name:"encodeUrlParam"}})]),t._v(" "),a("h2",{attrs:{id:"encodeurlparam-obj"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#encodeurlparam-obj"}},[t._v("#")]),t._v(" "),a("code",[t._v("encodeUrlParam(obj)")])]),t._v(" "),a("p",[a("strong",[t._v("描述")]),t._v("：")]),a("p",[t._v("将对象字符串化")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("参数")]),t._v("：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数名")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th",[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("obj")]),t._v(" "),a("td",[a("code",[t._v("object")])]),t._v(" "),a("td",[a("p",[t._v("输入对象")])])])])]),t._v(" "),a("p",[a("strong",[t._v("返回")]),t._v(": "),a("code",[t._v("string")]),a("br")]),t._v(" "),a("p",[t._v("字符串")]),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("encodeUrlParam")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// '%7B%22a%22%3A1%7D'")]),t._v("\n")])])]),a("p",[a("a",{attrs:{name:"decodeUrlParam"}})]),t._v(" "),a("h2",{attrs:{id:"decodeurlparam-obj"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decodeurlparam-obj"}},[t._v("#")]),t._v(" "),a("code",[t._v("decodeUrlParam(obj)")])]),t._v(" "),a("p",[a("strong",[t._v("描述")]),t._v("：")]),a("p",[t._v("将字符串解码，与"),a("code",[t._v("encodeUrlParam")]),t._v("相对")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("参数")]),t._v("：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数名")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th",[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("obj")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[a("p",[t._v("输入字符串")])])])])]),t._v(" "),a("p",[a("strong",[t._v("返回")]),t._v(": "),a("code",[t._v("object")]),a("br")]),t._v(" "),a("p",[t._v("对象")]),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("decodeUrlParam")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'%7B%22a%22%3A1%7D'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// { a: 1 }")]),t._v("\n")])])]),a("p",[a("a",{attrs:{name:"getUrlPara"}})]),t._v(" "),a("h2",{attrs:{id:"geturlpara-paraname-search"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#geturlpara-paraname-search"}},[t._v("#")]),t._v(" "),a("code",[t._v("getUrlPara(paraName, search)")])]),t._v(" "),a("p",[a("strong",[t._v("描述")]),t._v("：")]),a("p",[t._v("获取 Url 参数")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("参数")]),t._v("：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数名")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th",[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("paraName")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[a("p",[t._v("参数 key")])])]),t._v(" "),a("tr",[a("td",[t._v("search")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[a("p",[t._v("url search 部分")])])])])]),t._v(" "),a("p",[a("strong",[t._v("返回")]),t._v(": ")]),a("p",[t._v("paraValue")]),a("p"),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getUrlPara")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'gender'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'?gender=male&name=mike&feel=cold&age=18&from=test'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// male")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getUrlPara")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'age'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'?gender=male&name=mike&feel=cold&age=18&from=test'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 18")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);