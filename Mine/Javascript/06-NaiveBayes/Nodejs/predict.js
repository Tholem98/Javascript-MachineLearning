const NaiveBayes = require('./naiveBayesClass')

const naiveBayes = new NaiveBayes()
naiveBayes.loadModel()

const result = naiveBayes.predict('indiferente')
console.log(result)