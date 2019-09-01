const CSV = require('./csv')
const LinearRegression = require('../05-Regresion Linear/NodeJs/regresionLinear-Class')
const MultivariableRegression = require('../05-Regresion Linear/Regresion-Linear-Multivariada/regresionLinearMultivariada')
const NaiveBayes = require('../06-NaiveBayes/Nodejs/naiveBayesClass')
const KNearestN = require('../07-K-Nearest Neighbors/KNearestN-Class')
//const KMeans = require('../08-KMeans/') realizar la clase KMeans
// const DecisionTree= require('../10-Arbol de Decision/arbolDecision') realizar clase de DecisionTree
const Perceptron = require('../11-Red Neuronal Perceptron/perceptronClass')


const csv = new CSV()
// let config = csv.csvToJsonIO('../../Portugues/Recursos/13-Manipulacao-de-arquivos-csv/regressao-simples.csv')
// let config = csv.csvToJsonIO('../../Portugues/Recursos/13-Manipulacao-de-arquivos-csv/regressao-multivariada.csv')
// let config = csv.csvToJsonIO('../../Portugues/Recursos/13-Manipulacao-de-arquivos-csv/naive-bayes.csv')
// let config = csv.csvToJsonXY('../../Portugues/Recursos/13-Manipulacao-de-arquivos-csv/k-nearest-neighbors.csv')
// let config = csv.csvToJsonXY('../../Portugues/Recursos/13-Manipulacao-de-arquivos-csv/k-means.csv')
// let config = csv.csvToJsonXY('../../Portugues/Recursos/13-Manipulacao-de-arquivos-csv/decision-tree.csv')
let config = csv.csvToArray('../../Portugues/Recursos/13-Manipulacao-de-arquivos-csv/perceptron.csv')

/*
const regresionLineal = new LinearRegression()
regresionLineal.train(config)
console.log(regresionLineal.predecir([5,6,7,8]))
*/
/*
const multivariada = new MultivariableRegression()
multivariada.train(config)
console.log(multivariada.predict([[5,6,1],[6,7,1]]))
*/
/*
const naive = new NaiveBayes()
naive.train(config)
console.log(naive.predict('indiferente'))
*/
/*
const knn = new KNearestN()
knn.train(config)
console.log(knn.predict(55,37))
*/
/*
const kMeans = new KMeans()
config.groups = 2
kMeans.train(config)
console.log(kMeans.predict(55,37))
*/
/*
const tree = new DecisionTree()
tree.train(config)
console.log(tree.predict('sol','anormal'))
*/
const mainConf ={
    Epochs:10,
    Activation:'tanh',
    hiddenLayers: 2,
    hiddenNodes: 4,
    bias: 1
}
const perceptron = new Perceptron(mainConf)
perceptron.train(config)
console.log(`0 por 0: ${perceptron.predict([0,0])}`)
console.log(`0 por 1: ${perceptron.predict([0,1])}`)
console.log(`1 por 0: ${perceptron.predict([1,0])}`)
console.log(`1 por 1: ${perceptron.predict([1,1])}`)

// console.log(config)