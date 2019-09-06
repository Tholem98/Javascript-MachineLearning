function executar(){
    const area = Number(document.getElementById('area').value)
console.log(area)
    const result= regresionLinear(
        [45,50,75,100,area],
        [225000,250000,375000,500000]

    )
    document.getElementById('precio').value = parseFloat(result[0]).toFixed(0)
}



// function converteArray(array){
//     let temp = []
//     for(let i=0;i<array.length;i++){
//         temp.push(parseFloat(array[i].toString().trim()))
//     }
//     return temp

// }

// function regressaoLinear(arrX,arrY,p){
//     let x = arrX
//     let y = arrY

//    let resultado1 = (somatorio(x) * somatorio(y)) / x.length,
//     resultado2 = (somatorio(x) * somatorio(x)) / x.length,
//     resultado3 = somatorio(produto(x,y)) - resultado1,
//     resultado4 = resultado3 / (somatorio(quadrados(x)) -resultado2),
//     resultado5 = media(y) - (resultado4 * media(x))

//     return ((resultado4 * p) + resultado5).toFixed(0)
// }

// function produto(x,y){
//     let temp = []
//     for(let i=0;i<x.length;i++){
//         temp.push(parseFloat(x[i]) * parseFloat(y[i]))
//     }
//     return temp
// }

// function quadrados(x){
//     let temp = []
//     for(let i=0;i<x.length;i++){
//         temp.push(parseFloat(x[i]) * parseFloat(x[i]))
//     }
//     return temp
// }

// function somatorio(x){
//     let temp = 0
//     for(let i=0;i<x.length;i++){
//         temp += parseFloat(x[i])
//     }
//     return temp
// }

// function media(x){
//     return somatorio(x) / x.length
// }

// function executar(){
//     let eixoX = document.getElementById('eixoX').value
//     let eixoY = document.getElementById('eixoY').value
//     let vectorX = eixoX.split(',')
//     let vectorY = eixoY.split(',')
    
//     vectorX = converteArray(vectorX)
//     vectorY = converteArray(vectorY)
    
//     let tamX = vectorX.length
//     let tamY = vectorY.length
    
//     let tempX = vectorX.slice(0,tamY) 
//     let tempY = vectorY
    
//     let dif = tamX - tamY
//     console.log({tamX,tamY})
//     console.log(dif)
    
//     if(dif > 0){
//         let regressoes = []
//         for(let i=0;i<dif;i++){
//             let temp = regressaoLinear(tempX,tempY,vectorX[tamY+i])
//             regressoes.push(temp)
//         }
//         let novoY = tempY.concat(regressoes)
//         let stringY = novoY.join(', ')
//         console.log(stringY)
//         document.getElementById('eixoY').value = stringY
//     }
// }
