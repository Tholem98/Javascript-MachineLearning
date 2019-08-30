let eixoX=[],
eixoY=[],
grupos=2,
centroideX=[],
centroideY=[],
grupoID_Anterior=[]

function mediaGrupoX(IDs=[],grupoIDs=0){
    let suma = 0
    let qtdGrupo = 0
    for(let i=0;i<ID.length;i++){
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
    for(let i=0;i<ID.length;i++){
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
    Array.prototype.min = ()=>{
        return Math.min.apply(null,this)
    }
    return arr.min()
}

function grupo(distancias=[],menorDistancia=0){
    return distancias.indexOf(menorDistancia)
}