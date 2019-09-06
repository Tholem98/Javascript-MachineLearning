const MultivariateRegression = require('ml-regression-multivariate-linear')
/*
const x = [[1],[2],[3],[4]]
const y = [[8],[14],[24],[32]]

const mlr = new MultivariateRegression(x,y)

const result = mlr.predict([5])
const output = parseFloat(result).toFixed(7)
console.log(output)
*/
/*
const x = [[1,2],[2,3],[3,4],[4,5]]
const y = [[6],[10],[14],[18]]
const mlr = new MultivariateRegression(x,y)

const result = mlr.predict([5,6])
const output = parseFloat(result).toFixed(7)
console.log(output)
*/
const x = [[10,12,14],[22,24,50],[50,80,30],[40,10,14]]
const y = [[5,6,7],[11,12,25],[25,40,15],[20,5,7]]
const mlr = new MultivariateRegression(x,y)
const result = mlr.predict([12,20,30])
let output = []
for(let i=0;i<result.length;i++){
    output.push(Number(parseFloat(result[i]).toFixed(7)))
}
console.log(output)
