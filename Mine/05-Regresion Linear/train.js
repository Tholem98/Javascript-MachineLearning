const regresionLinear = require('./regresionLinear-Class');

const config = {
    input: [1,2,3,4],
    output: [10,20,30,40]
}

const regresion = new regresionLinear()
regresion.train(config)
regresion.saveModel('./model-regression.json')