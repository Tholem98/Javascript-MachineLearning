const NaiveBayes = require('./naiveBayesClass')

const config = {
    input:['bom','mau','indiferente','indiferente'],
    output:['positivo','negativo','positivo','negativo']
}

const naiveBayes = new NaiveBayes()

naiveBayes.train(config)

const result = naiveBayes.predict('indiferente')
console.log(result)