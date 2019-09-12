const regresionLinear = require('./regresionLinear-Class');

const regresion = new regresionLinear()
regresion.loadModel('./model-regression.json')

const result = regresion.predecir([5,6,7,8])
console.log(result)