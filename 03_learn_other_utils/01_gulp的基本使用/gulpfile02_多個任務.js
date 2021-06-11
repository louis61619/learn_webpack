const { series, parallel } = require("gulp")

const task1 = (cb) => {
  console.log("task1")
  cb()
}

const task2 = (cb) => {
  console.log("task2")
  cb()
}

const task3 = (cb) => {
  console.log("task3")
  cb()
}

// 依序執行任務
const seriesTask = series(task1, task2, task3)

// 並行執行任務
const parallelTask = parallel(task1, task2, task3)

// 依序執行前兩個任務
const composeTask = series(seriesTask, parallelTask)


module.exports = {
  seriesTask,
  parallelTask,
  composeTask
}