let eixoX = [],
eixoY = [].
clase = []

function eliminaDuplicados(arr=[]){
    arr = [...new Sey(arr)]
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
    
    const sumaClase = proporsiones(_eixo,_valor_clase)
    const sumaTotal = proporsiones(_eixo,_valor,'')
    const division = sumaClase / sumaTotal
    if(isNaN(division)) division = 0
    return division.toFixed(4)
}

function logaritmos(_eixo='',_valor='',_clase=''){
    _eixo = _eixo.toString().toLowerCase().trim()
    _valor = _valor.toString().trim()
    _clase = _clase.toString().trim()

    const divisionClase = divisiones(_eixo,_valor_clase)
    const log2 = Math.log2(divisionClase)

    if(isNaN(log2)) log2 = 0
    return log2.toFixed(4)
}

function multiplicaciones(_eixo='',_valor='',_clase=''){
    _eixo = _eixo.toString().toLowerCase().trim()
    _valor = _valor.toString().trim()
    _clase = _clase.toString().trim()

    const divisionClase = divisiones(_eixo,_valor_clase)
    const logaritmoClase = logaritmos(_eixo,_valor_clase)
    
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
    }
    str = str + '0'

    let subtracciones = eval(str)
    if(isNaN(subtracciones)) subtracciones = 0
    return subtracciones.toFixed(4)   
}

