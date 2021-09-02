const render = function (template, data) {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => data[key.trim()])
}

const template = 'Hello {{ name }}!'
const data = { name: 'zzp' }

console.log(render(template, data))
