function producto(x=[],y=[]){
    let temp = []
    for(let i=0;i<x.length;i++){
        temp.push(parseFloat(x[i])*parseFloat(y[i]))
    }
    return temp
}

function cuadrados(x=[]){
    let temp = []
    for(let i = 0;i<x.length;i++){
        temp.push(parseFloat(x[i])*parseFloat(x[i]))
    }
    return temp
}

function sumatoria(x=[]){
    let temp = 0
    for(let i = 0;i<x.length;i++){
        temp += parseFloat(x[i])
    }
    return temp
}

function media(x=[]){
    return sumatoria(x) / x.length
}

function resultados(x=[],y=[],p=0){
    const resultado1 = (sumatoria(x) * sumatoria(y)) / x.length
    const resultado2 = (sumatoria(x) * sumatoria(x)) / x.length 
    const resultado3 = sumatoria(producto(x,y)) - resultado1
    const resultado4 = resultado3 / (sumatoria(cuadrados(x)) - resultado2)
    const resultado5 = media(y) - (resultado4 * media(x))

    return ((resultado4 * p) + resultado5).toFixed(8)
} 

function regresionLinear(eixoX=[], eixoY=[]){
    const tamx = eixoX.length
    const tamy = eixoY.length
    // console.log({eixoX,eixoY})
    const tempX = eixoX.slice(0,tamy)
    const tempY = eixoY
    // console.log({tempX,tempY})
    
    const dif = tamx - tamy
    if(dif>0){
        let regresiones = []
        for(let i=0;i<dif;i++){
            let temp= Number(resultados(tempX,tempY,eixoX[tamy+i]))
            ult=eixoX[tamy+i]
            console.log({ult,temp})
            regresiones.push(temp)
        }
        const novoY = tempY.concat(regresiones)
        // console.log(`eixo x: ${eixoX}\neixo y: ${novoY}`)
        return regresiones
        // return novoY
    }else{
        return 0
        // return eixoX
    }

}

// regresionLinear(
//     [1,2,3,4,1],
//     [10,20,30,40]
// )

