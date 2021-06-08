const {
  SyncHook,
  SyncBailHook,
  SyncLoopHook,
  SyncWaterfallHook,
  AsyncSeriesHook,
  AsyncParallelHook
} = require("tapable");

let counter = 0;

class HYLearnTapable {
  constructor() {
    this.hooks = {
      // bail: 在某一個事件監聽的函數中，如果有返回值，就不會繼續執行了
      // loop: 在某一個事件監聽的函數中，返回為true時，回調函數會反覆執行
      // waterfall: 當返回值不為undefined的時候，會成為給下一個監聽函數的參數

      // syncHook: new SyncHook(["name", "age"]),
      // syncHook: new SyncBailHook(["name", "age"]),
      // syncHook: new SyncLoopHook(["name", "age"])
      syncHook: new SyncWaterfallHook(["name", "age"]),

      // series: 在一個hook中，監聽了多次事件(兩個回調函數)，回調函數是串行執行的
      // Parel: 在一個hook中，監聽了多個事件，回調函數是並行執行的
      // asyncHook: new AsyncSeriesHook(["name", "age"]),
      asyncHook: new AsyncParallelHook(["name", "age"]),
    };

    // this.hooks.syncHook.tap("event1", (name, age) => {
    //   console.log("event1", name, age, counter)
    //   return "event1"
    //   // return "123"
    // })

    // this.hooks.syncHook.tap("event2", (name, age) => {
    //   console.log("event2", name, age)
    // })

    // this.hooks.asyncHook.tapAsync("event1", (name, age, callback) => {
    //   setTimeout(() => {
    //     console.log("event1", name, age);
    //     callback();
    //   }, 2000);
    // });

    // this.hooks.asyncHook.tapAsync("event2", (name, age, callback) => {
    //   setTimeout(() => {
    //     console.log("event2", name, age);
    //     callback();
    //   }, 2000);
    // });

    this.hooks.asyncHook.tapPromise("event", (name, age) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("event", name, age)
          resolve()
        }, 2000)
      })
    })

    this.hooks.asyncHook.tapPromise("event2", (name, age) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("event2", name, age)
          resolve()
        }, 2000)
      })
    })
  }

  emit() {
    // this.hooks.syncHook.call("why", 18)
    // this.hooks.syncHook.call("Rennt", 26)

    // this.hooks.asyncHook.callAsync("Kobe", 23, () => {
    //   console.log("第一次事件執行完成");
    // });

    this.hooks.asyncHook.promise("james", 22).then(() => {
      console.log("事件監聽完成")
    })
  }
}

const lt = new HYLearnTapable();
lt.emit();
