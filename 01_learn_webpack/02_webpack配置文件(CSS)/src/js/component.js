function compoenent() {
  const element = document.createElement('div')

  element.innerHTML = ['home', 'me'].join(" ")
  element.className = "content"

  return element

}

document.body.appendChild(compoenent())