const RgLM = require('./regresionLinearMultivariada')

const config = {
    input: [[1,2,1],[2,3,1],[3,4,1],[4,5,1]],
    output: [4,6,8,10]
}

const regresion = new RgLM
regresion.train(config)

const result = regresion.predecir([[5,6,1],[6,7,1]])
console.log(result)