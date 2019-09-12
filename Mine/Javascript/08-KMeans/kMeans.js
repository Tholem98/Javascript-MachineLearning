let eixoX=[],
eixoY=[],
grupos=2,
centroideX=[],
centroideY=[],
grupoID_Anterior=[]

function mediaGrupoX(IDs=[],grupoIDs=0){
    let suma = 0
    let qtdGrupo = 0
    for(let i=0;i<IDs.length;i++){
        if(IDs[i] == grupoIDs){
            suma += eixoX[i]
            qtdGrupo++
        }
    }
    return suma / qtdGrupo
}

function mediaGrupoY(IDs=[],grupoIDs=0){
    let suma = 0
    let qtdGrupo = 0
    for(let i=0;i<IDs.length;i++){
        if(IDs[i] == grupoIDs){
            suma += eixoY[i]
            qtdGrupo++
        }
    }
    return suma / qtdGrupo
}

function actualizaCentX(){
    if(centroideX.length <= 0){
        centroideX[0] = eixoX[0]
        for(let i=1;i<grupos;i++){
            centroideX[i] = eixoX[(eixoX.length-1)-i]
        }
    }else{
        for(let i=0;i<grupos;i++){
            centroideX[i] = mediaGrupoX(grupoID_Anterior,i)
        }
    }
}

function actualizaCentY(){
    if(centroideY.length <= 0){
        centroideY[0] = eixoY[0]
        for(let i=1;i<grupos;i++){
            centroideY[i] = eixoY[(eixoY.length-1)-i]
        }
    }else{
        for(let i=0;i<grupos;i++){
            centroideY[i] = mediaGrupoY(grupoID_Anterior,i)
        }
    }
}

function minimo(arr=[]){
    Array.prototype.min = function(){
        return Math.min.apply(null,this)
    }
    return arr.min()
}

function grupo(distancias=[],menorDistancia=0){
    return distancias.indexOf(menorDistancia)
}

function comparaGrupos(arr1=[],arr2=[]){
    let retorno = true
    for(let i=0;i<arr1.length;i++){
        if(arr1[i] != arr2[i]){
            returno = false
        }
    }
    return retorno
}

function actualizaGrupo(){
    actualizaCentX()
    actualizaCentY()

    let retorno = true,
    grupoID = [],
    distancias = [],
    distanciasMenores = []

    for(let i=0;i<eixoX.length;i++){
        for(let j=0;j<grupos;j++){
            distancias[j] = Math.sqrt(Math.pow(eixoX[i]-centroideX[j],2)+Math.pow(eixoY[i]-centroideY[j],2))
        }
        distanciasMenores[i] = minimo(distancias)
        grupoID[i] = grupo(distancias,distanciasMenores[i])
    }

    if(grupoID_Anterior.length <= 0){
        grupoID_Anterior = grupoID
    }else{
        if(comparaGrupos(grupoID_Anterior,grupoID)){
            retorno = false
        }else{
            grupoID_Anterior = grupoID
            retorno = true
        }
    }
    return retorno
}

function retornaElGrupo(arrGrupos=[]){
    let matrizGrupos = []
    for(let i=0;i<grupos;i++){
        let divisionGrupos = []
        for(let j=0;j<arrGrupos.length;j++){
            if(arrGrupos[j] == i){
                divisionGrupos.push([eixoX[j],eixoY[j]])
            }
        }

        matrizGrupos.push(divisionGrupos)
    }
    return matrizGrupos
}

function train(config={}){
    if(config.x) eixoX = config.x; else eixoX = []
    if(config.y) eixoY = config.y; else eixoY = []
    if(config.groups) grupos = config.groups; else grupos = 2
}

function predict(){
    centroideX = []
    centroideY = []
    grupoID_Anterior = []

    if((grupos > 1)&&(grupos < eixoX.length)){
        if(eixoX.length > 2){
            while(actualizaGrupo()){}
            const matriz = retornaElGrupo(grupoID_Anterior)
            return matriz
        }else { 
            return []
        }
    }else{
        return []
    }
}

// train({
//     x: [1,3,5,25,45,65],
//     y: [2,4,6,35,55,75],
//     groups : 2
// })

// console.log(predict())