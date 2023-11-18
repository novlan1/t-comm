const storeData: any = {};


/**
 * 函数式调用组件
 * @param {Object} vueInstance 页面Vue实例（一般为页面this）
 * @param {Object} dialogComponent 弹窗组件，支持静态导入import Dialog from '..'和动态导入const Dialog = () => import('...')两种形式
 * @param {Object} dialogOptions 弹窗参数Object
 * @returns Promise 回调组件实例
 *
 * @example
 * ```ts
 * function showDateTimePicker(this: any, {
 *   onConfirm,
 *   currentDate,
 * }) {
 *   showFunctionalComponent(
 *     this, () => import('src/local-component/ui/gp-match-horz/date-picker'),
 *     {
 *       currentDate,
 *       minDate: new Date(new Date().getTime() + 30 * 60 * 1000),
 *       onClickConfirm: (date) => {
 *         const dateNumber =  Math.floor(date.getTime());
 *         onConfirm(date, dateNumber);
 *       },
 *     },
 *   );
 * }
 * ```
 */
export function showFunctionalComponent(vueInstance, dialogComponent, dialogOptions) {
  return new Promise((resolve) => {
    if (typeof dialogComponent === 'function') {
      dialogComponent()
        .then((dialog) => {
          const component = showDialog(vueInstance, dialog.default, dialogOptions);
          if (component) {
            resolve(component);
          }
        })
        .catch((err) => {
          console.error('[showFunctionalComponent] error: ', err);
        });
    } else {
      const component = showDialog(vueInstance, dialogComponent, dialogOptions);
      if (component) {
        resolve(component);
      }
    }
  });
}


function showDialog(vueInstance, dialogComponent, dialogOptions) {
  const scopeId = dialogComponent._scopeId;
  const storeComponent = storeData[scopeId];
  if (scopeId && storeComponent) {
    if (dialogOptions) {
      Object.keys(dialogOptions).forEach((key) => {
        storeComponent.$set(storeComponent.$props, key, dialogOptions[key]);
      });
    }
    return storeComponent;
  }

  const dialogId = `functional-component-dialog-id-${new Date().getTime()}`;
  if (document.getElementById(dialogId)) {
    console.error('component dialog id is existed');
    return;
  }

  const dialogRootDiv = document.createElement('div');
  dialogRootDiv.id = dialogId;
  document.body.appendChild(dialogRootDiv);

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  let vue = require('vue');
  vue = vue.default || vue;

  const VueComponent = vue.extend(dialogComponent);
  const component: any =  new VueComponent({
    propsData: dialogOptions,
  }).$mount(dialogRootDiv);

  // eslint-disable-next-line no-inner-declarations
  function removeComponent() {
    if (component) {
      if (component.$destroy) {
        component.$destroy();
      }
      if (document.body.contains(component.$el)) {
        document.body.removeChild(component.$el);
      }
      storeData[scopeId] = null;
    }
  }

  component.removeComponent = removeComponent;
  storeData[scopeId] = component;

  if (vueInstance) {
    // 兼容keep-alive组件
    vueInstance.$once('hook:deactivated', () => {
      removeComponent();
    });
    vueInstance.$once('hook:destroyed', () => {
      removeComponent();
    });

    // 部分动态弹框的时候vueInstance为父组件，子组件自销毁则无法监听到，导致storeData中的数据无法删除，会影响到弹框无法弹出
    // （出现问题的地方在task-dialog中需要弹出订阅弹框）
    component.$once('hook:deactivated', () => {
      removeComponent();
    });
    component.$once('hook:destroyed', () => {
      removeComponent();
    });
  }


  return component;
}

/**
 * @description 根据弹窗队列（dialogList）依次弹出
 * @param {object} context Vue 页面 Vue实例上下文（一般为页面this、window.app、new Vue() 等）
 * @param {array} dialogList 弹窗列表
 * @param {Object} dialogComponent 弹窗组件，支持静态导入 import Dialog from '..' 和动态导入 const Dialog = () => import('...') 两种形式
 */
export function showFunctionalComponentQueue(context, dialogList, dialogComponent) {
  const showDialog = () => {
    if (dialogList.length > 0) {
      const dialogInfo = dialogList.pop();
      if (dialogInfo?.id) {
        showFunctionalComponent(context, dialogComponent, {
          show: true,
          dialogId: dialogInfo.id,
          isShowByFunction: true,
          propsData: dialogInfo,
          closeCallback: () => {
            showDialog(); // 取出下一个弹窗自动弹出
          },
        });
      }
    }
  };

  showDialog();
}
