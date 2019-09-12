const MultivariateRegression = require('ml-regression-multivariate-linear')

const area_idade = [[45,10],[75,15],[80,10],[95,20],[100,30]]
const preco = [[175000],[300000],[350000],[375000],[350000]]

const mlr = new MultivariateRegression(area_idade,preco)

const area = 55
const idade = 12

const result = mlr.predict([area,idade])
console.log(Number(result[0].toFixed(7)))