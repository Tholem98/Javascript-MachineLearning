// const KMeans = require('ml-kmeans')
const SKMeans = require('skmeans')
/*
const data = [[1],[2],[3],[10],[11],[12],[100],[101],[102]]

const group = KMeans(data,3)
console.log(group.clusters)
*//*
const data = [[1,2,1],[2,1,2],[50,20,10],[30,20,40],[0,2,1]]

const group = KMeans(data,2)
console.log(group.clusters)
*/
const data = [1,2,3,10,11,12,50,55,70]

const result = SKMeans(data,3)
console.log(result)