const presets = [
  ["@babel/preset-env"],
  ["@babel/preset-react"],
]

const plugins = [
]

const isProdution = process.env.NODE_ENV === "production"

if (!isProdution) {
  plugins.push(["react-refresh/babel"])
}

module.exports = {
  presets,
  plugins, 
}