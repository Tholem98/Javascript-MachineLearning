const NaiveBayes = require('./naiveBayesClass')

const config = {
    input:['bom','mau','indiferente','indiferente'],
    output:['positivo','negativo','positivo','negativo']
}

const naiveBayes = new NaiveBayes()
naiveBayes.train(config)
naiveBayes.saveModel()

console.log('modelo guardado exitosamente')