// 重写数组方法

let oldArrayProto = Array.prototype; // 数组原型

export let newArrayProto = Object.create(oldArrayProto);

let methods = ["push", "pop", "shift", "unshift", "reverse", "sort", "splice"];

methods.forEach((method) => {
  // 重写
  newArrayProto[method] = function (...args) {
    const result = oldArrayProto[method].call(this, ...args);

    // 插入内容监听
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      this.__ob__.observeArray(inserted);
    }
    return result;
  };
});
