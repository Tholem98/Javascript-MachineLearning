let eixoX = [],
eixoY = [].
clase = []

function eliminaDuplicados(arr=[]){
    arr = [...new Set(arr)]
    return arr
}

function retornaClases(){
    let arr = clase
    arr = eliminaDuplicados(arr)
    return arr
}

function proporsiones(_eixo='',_valor='',_clase=''){
    _eixo = _eixo.toString().toLowerCase().trim()
    _valor = _valor.toString().trim()
    _clase = _clase.toString().trim()

    let suma = 0
    if(_eixo == 'x'){
        for(let i=0;i<eixoX.length;i++){
            if(_clase.length > 0){
                if((eixoX[i] == _valor)&&(clase[i]==_clase)) suma++
            }else{
                if(eixoX[i]== _valor) suma++
            }
        }
    }else if(_eixo == 'y'){
        for(let i=0;i<eixoY.length;i++){
            if(_clase.length > 0){
                if((eixoY[i] == _valor)&&(clase[i]==_clase)) suma++
            }else{
                if(eixoY[i]== _valor) suma++
            }
        }
    }else{
        if(_clase.length > 0){
            for(let i=0;i<clase.length;i++){
            if(clase[i]==_clase) suma++
            }
        }else{
            suma = clase.length
        }
    }
    return suma
} 

function divisiones(_eixo='',_valor='',_clase=''){
    _eixo = _eixo.toString().toLowerCase().trim()
    _valor = _valor.toString().trim()
    _clase = _clase.toString().trim()
    
    const sumaClase = proporsiones(_eixo,_valor,_clase)
    const sumaTotal = proporsiones(_eixo,_valor,'')
    const division = sumaClase / sumaTotal
    if(isNaN(division)) division = 0
    return division.toFixed(4)
}

function logaritmos(_eixo='',_valor='',_clase=''){
    _eixo = _eixo.toString().toLowerCase().trim()
    _valor = _valor.toString().trim()
    _clase = _clase.toString().trim()

    const divisionClase = divisiones(_eixo,_valor,_clase)
    const log2 = Math.log2(divisionClase)

    if(isNaN(log2)) log2 = 0
    return log2.toFixed(4)
}

function multiplicaciones(_eixo='',_valor='',_clase=''){
    _eixo = _eixo.toString().toLowerCase().trim()
    _valor = _valor.toString().trim()
    _clase = _clase.toString().trim()

    const divisionClase = divisiones(_eixo,_valor,_clase)
    const logaritmoClase = logaritmos(_eixo,_valor,_clase)
    
    let indiceClase = 0
    const clasesUnicas = retornaClases()
    for(let i=0;i<clasesUnicas.length;i++){
        if(clase[i] == _clase){
            indiceClase = i
        }
    }
    let multiplicacion = 0
    if(indiceClase % 2 != 0){
        multiplicacion = (divisionClase * -1) * logaritmoClase
    }else{
        multiplicacion = divisionClase * logaritmoClase
    }
    if(isNaN(multiplicacion)) multiplicacion = 0
    return multiplicacion.toFixed(4)
}

function entropia(_eixo='',_valor=''){
    _eixo = _eixo.toString().toLowerCase().trim()
    _valor = _valor.toString().trim()

    let clasesUnicas = retornaClases()
    clasesUnicas.reverse()
    let multiplicacion = []
    for(let i=0;i<clasesUnicas.length;i++){
        multiplicacion.push(multiplicaciones(_eixo,_valor,clasesUnicas[i]))
    }

    let str = ''
    for(let i=0;i<multiplicacion.length;i++){
        str += multiplicacion[i] + '-'
        //console.log({str})
    }
    str = str + '0'

    let subtracciones = eval(Number(str))
    if(isNaN(subtracciones)) subtracciones = 0
    return subtracciones.toFixed(4)   
}

function ganhos(_eixo=''){
    let ganho = []
    _eixo = _eixo.toString().toLowerCase().trim()
    const entropiaGeral = entropia()
    
    if(_eixo == 'x'){
        let X = eliminaDuplicados(eixoX)
        let divisionesX = []
        const totalGeral = proporsiones()
        let entropias = []
        for(let i=0;i<X.length;i++){
            let totalLocal = proporsiones('x',X[i],'')
            divisionesX.push(totalLocal/totalGeral)
            entropias.push(entropia('x',X[i]))
        }

        let multiplicacionesX = []
        for(let i=0;i<divisionesX.length;i++){
            multiplicacionesX.push(entropias[i] * divisionesX[i])
        }
       let sumas = 0
       for(let i=0;i<multiplicacionesX.length;i++){
            sumas += multiplicacionesX[i]
       }
       ganho.push('x')
       ganho.push((entropiaGeral - sumas).toFixed(4))
    }else if(_eixo == 'y'){
        let Y = eliminaDuplicados(eixoY)
        let divisionesY = []
        const totalGeral = proporsiones()
        let entropias = []
        for(let i=0;i<Y.length;i++){
            let totalLocal = proporsiones('y',Y[i],'')
            divisionesY.push(totalLocal/totalGeral)
            entropias.push(entropia('y',Y[i]))
        }

        let multiplicacionesY = []
        for(let i=0;i<divisionesY.length;i++){
            multiplicacionesY.push(entropias[i] * divisionesY[i])
        }
       let sumas = 0
       for(let i=0;i<multiplicacionesY.length;i++){
            sumas += multiplicacionesY[i]
       }
       ganho.push('x')
       ganho.push((entropiaGeral - sumas).toFixed(4))
    }else{
        const ganhoX = ganhos('x')
        const ganhoY = ganhos('y')
        const razonX = ganhoX[1] / entropiaGeral
        const razonY = ganhoY[1] / entropiaGeral

        let mayorRazon = Math.max(razonX,razonY)

        if(mayorRazon == razonX){
            ganho.push('x')
        }else{
            ganho.push('y')
        }
        ganho.push(mayorRazon.toFixed(4))
    }
    return ganho
}

function train(config={}){
    if(config.x) eixoX = config.x; else eixoX =[0]
    if(config.y) eixoY = config.y; else eixoY =[0]
    if(config.clase) clase = config.clase; else clase =['']


}

function predict(entradaX=0,entradaY=0){
    let folha = ''
    const ganhoInfo = ganhos()
    let raiz = ganhoInfo[0]
    raiz = raiz.toString().toLowerCase().trim()

    let arrayRaiz = []
    if(raiz == 'x'){
        arrayRaiz = eixoX
    }else{
        arrayRaiz = eixoY
    }
    const ramas = eliminaDuplicados(arrayRaiz)
    let ramaSemNo= []
    for(let i=0;i<ramas.length;i++){
        let clasesRaiz = ''
        let clasesDiferentes = 0
        for(let j=0;j<arrayRaiz.length;j++){
            if(ramas[i] == arrayRaiz[j]){
                if(clasesRaiz != clase[j]){
                    clasesRaiz = clase[j]
                    clasesDiferentes++
                }
            }
        }
        if(clasesDiferentes < 2){
            ramaSemNo.push(ramas[i])
        }
    }
    let claseSemNo = []
    for(let i=0;i<ramaSemNo.length;i++){
        const indiceSemNo = arrayRaiz.indexOf(ramaSemNo[i])
        claseSemNo.push(clase[indiceSemNo])
    }

    for(let i=0;i<ramaSemNo.length;i++){
        if((entradaX == ramaSemNo[i])||(entradaY == ramaSemNo[i])){
            folha = claseSemNo[i]
        }
    }

    let indiceClasificado = ramaSemNo.indexOf(entradaX)
    if(indiceClasificado < 0){
        indiceClasificado = ramaSemNo.indexOf(entradaY)
    }

    if(indiceClasificado < 0){
        let indicesX = []
        for(let i=0;i<eixoX.length;i++){
            if(eixoX[i] == entradaX){
                indicesX.push(i)
            }
        }
        for(let i=0;i<indicesX.length;i++){
            if(eixoY[indicesX[i]] == entradaY){
                folha = clase[indicesX[i]]
            }
        }
        let claseRepetida = []
        if(folha.toString().trim().length <=0){
            let claseTemp = retornaClases()
            for(let i=0;i<claseTemp.length;i++){
                for(let j=0;j<clase.length;j++){
                    if(claseTemp[i] == clase[j]){
                        if(claseRepetida[i] != undefined){
                            claseRepetida[i]++
                        }else{
                            claseRepetida[i] = 1
                        }
                    }
                }
            }
            let  mayorNumero = 0
            let indiceMayorRepe = 0
            for(let i=0;i<claseRepetida.length;i++){
                if(claseRepetida[i] > mayorNumero){
                    mayorNumero = claseRepetida[i]
                    indiceMayorRepe = i
                }
            }
            folha = claseTemp[indiceMayorRepe]
        }
    }else{
        folha = claseSemNo[indiceClasificado]
    }
    return folha
}

train({
    x:['sol','nublado','lluvia','lluvia','sol','nublado'],
    y:['anormal','normal','anormal','normal','normal','anormal'],
    clase:['no','si','no','no','si','si'],
})

console.log(predict('lluvia','normal'))