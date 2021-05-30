module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // false 不用任和polyfill相關的代碼
        // usage 代碼中需要哪些polyfill，就引入哪些
        // entry 手動在代碼中入口文件導入core-js/regenerator-runtime，根據目標瀏覽器引入所有對應的polyfill
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    ['@babel/preset-react'],
  ],
  // plugins: [
  //   ["@babel/plugin-transform-runtime", {
  //     corejs: 3
  //   }]
  // ]
};
