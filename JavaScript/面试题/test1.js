exports.name = {a:1}

setTimeout(() => {
  exports.name.a = 'zzp4'
  console.log(exports.name)
}, 1000)