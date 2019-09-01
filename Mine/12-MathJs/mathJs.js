const math = require('mathjs')

console.log('minimo', math.min([2,1,3]))

console.log('miximo', math.max([2,1,3]))

console.log('suma', math.sum([2,1,3]))

console.log('media', math.mean([2,1,3]))

console.log('mediana', math.median([2,1,3]))

console.log('producto', math.prod([2,1,3]))

console.log('cuadrado', math.square([2,1,3]))

console.log('cubo', math.cube([2,1,3]))

console.log('absoluto', math.abs([2,1,3]))

console.log('varianza', math.variance([2,4],'uncorrected'))

console.log('varianza tendencia', math.variance([2,4],'biased'))

console.log('varianza sin tendencia', math.variance([2,4],'unbiased'))

console.log('desvio padron', math.std([2,4],'uncorrected'))

console.log('desvio tendencioso', math.std([2,4],'biased'))

console.log('desvio sin tendencia', math.std([2,4],'unbiased'))

console.log('raiz cuadrada', math.sqrt([9,81]))

console.log('multiplicacion convencional', math.dotMultiply([1,2],[2,3]))

console.log('multiplicacion matricial', math.multiply([1,2],[2,3]))

console.log('resta', math.subtract([5,3],[3,1]))

console.log('transposicion', math.transpose([[1,2],[3,4]]))

console.log('seleccion aleatoria', math.random([2,2]))

console.log('adicion', math.add([3,1],[2,4]))

console.log('division', math.dotDivide([10,12],[2,3]))

console.log('logaritmo', math.log([10,12]))

console.log('logaritmo base 2', math.log2([10,12]))

console.log('redondeo hacia abajo', math.floor([1.2,2.5,3.9]))

console.log('aproximacion', math.round([1.2,2.5,3.9],0))

console.log('aproximacion hacia arriba', math.ceil([1.2,2.5,3.9]))

console.log('expresion', math.evaluate(['(2+3)*2']))

console.log('filtro', math.filter([1,2,2,3], new RegExp(2)))
