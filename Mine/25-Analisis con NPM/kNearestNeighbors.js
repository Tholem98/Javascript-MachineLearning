const KNearestNeighbor = require('ml-knn')
const idades = [[11],[12],[17],[18],[64],[65]]
const rangos = ['crianza','adolecente','adolecente','adulto','adulto','idoso']

const knn = new KNearestNeighbor(idades,rangos,{k:1})
/*
const edad = 9
const rango = knn.predict([edad])
console.log(`Una persona de ${edad} corresponde a ${rango}`)
*//*
const edad = 15
const rango = knn.predict([edad])
console.log(`Una persona de ${edad} corresponde a ${rango}`)
*//*
const edad = 21
const rango = knn.predict([edad])
console.log(`Una persona de ${edad} corresponde a ${rango}`)
*//*
const edad = 70
const rango = knn.predict([edad])
console.log(`Una persona de ${edad} corresponde a ${rango}`)
*/