let eixoX =[]
let eixoY =[],
 clase=[],

 entradaX = 0,
 entradaY = 0

 function subtraerX(){
    let subt=[]
    
    for(let i=0;i<eixoX.length;i++){
        subt[i] = eixoX[i] - entradaX
    }
    return subt
 }

 function subtraerY(){
    let subt=[]
    
    for(let i=0;i<eixoY.length;i++){
        subt[i] = eixoY[i] - entradaY
    }
    return subt
 }

 function cuadradosX(){
     const subt = subtraerX()
     let cuadrados = []
    for(let i=0;i<subt.length;i++){
        cuadrados[i] = subt[i] * subt[i]
    }
    return cuadrados
 }

 function cuadradosY(){
    const subt = subtraerY()
    let cuadrados = []
    for(let i=0;i<subt.length;i++){
        cuadrados[i] = subt[i] * subt[i]
   }
   return cuadrados
}

function sumaCuadrados(){
    const cuadradoX = cuadradosX()
    const cuadradoY = cuadradosY()
    let suma = []
    for(let i=0;i<cuadradoX.length;i++){
        suma[i]=cuadradoX[i] + cuadradoY[i]
    }
    return suma
}

function raices(){
    const suma = sumaCuadrados()
    let raices = []
    for(let i=0;i<suma.length;i++){
        raices[i] = Math.sqrt(suma[i])
    }
    return raices
}

function train(config={}){
    if(config.x) eixoX = config.x;else eixoX = [0]
    if(config.y) eixoY = config.y;else eixoY = [0]
    if(config.clase) clase = config.clase;else clase = ['']
}

function predict(_entradaX=0,_entradaY=0){
    entradaX = _entradaX
    entradaY = _entradaY

    let entradaClase = 0;
    const raiz = raices()

    let indiceMenor = -1
    let menor = Infinity

    for(let i=0;i<raiz.length;i++){
        if(raiz[i] <= menor){
            menor = raiz[i]
            indiceMenor = i    
        }
    }
    entradaClase = clase[indiceMenor]
    return entradaClase
}

// train({
//     x: [1,2,30,40],
//     y: [3,4,50,60],
//     clase: [1,1,2,2]
// })

// console.log(predict(120,190))


