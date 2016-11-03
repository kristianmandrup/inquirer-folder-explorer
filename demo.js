const chooseFolder = require('./src');

try {
  chooseFolder({}).then((folder) => {
    console.log('chosen', folder)
  })
} catch (err) {
  console.log('err', err)
}


try {
  chooseFolder({title: 'Please choose a folder', basePath: './'}).then((folder) => {
    console.log('chosen', folder)
  })
} catch (err) {
  console.log('err', err)
}

