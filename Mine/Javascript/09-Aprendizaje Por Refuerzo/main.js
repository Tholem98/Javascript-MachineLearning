const KMeans = require('./aprendizajePorRefuerzo')

const config = {
    x: [1,3,5,25,45,65],
    y: [2,4,6,35,55,75],
    groups : 2
}

const kMeans = new KMeans
kMeans.train(config)

kMeans.predict()