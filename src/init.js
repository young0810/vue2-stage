import { observe } from "./observe/index";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    // 初始化

    const vm = this;
    // 挂载用户选项
    vm.$options = options;

    // 初始化状态
    initState(vm);
  };
}

function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
}


function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key];
    },
    set(newValue) {
      vm[target][key] = newValue;
    }
  })
}

function initData(vm) {
  let data = vm.$options.data;

  data = typeof data === "function" ? data.call(vm) : data;
  vm._data = data;
  observe(data);

  for(let key in data) {
    proxy(vm, '_data', key);
  }
}
