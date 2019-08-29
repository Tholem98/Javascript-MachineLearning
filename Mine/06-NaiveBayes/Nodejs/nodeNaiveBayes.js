let entradas = []
let clases = []

function eliminaDuplicados(arr=[]){
    arr = [...new Set(arr)]
    return arr
}

function retornaClases(){
    let arr = clases
    arr = eliminaDuplicados(arr)
    return arr
}

function contaTexto(text='',procura=''){
    return text.split(procura).length - 1
}

function organizar(){
    let params = {}

    for(let i=0;i<entradas.length;i++){
        let carac = ''
        if(i<(entradas.length-1)) {
            carac = '-'
        }
        if(params[clases[i]]){
            params[clases[i]] += entradas[i] + carac
        }else{
            params[clases[i]] = entradas[i] + carac
        }

    }

    let str = JSON.stringify(params)
    str = str.replace(/-"/g,'"')
    str = str.replace(/-/g,',')
    params = JSON.parse(str)

    return params
}

function frecuencia(){
    let categorias = []
    let params = {}
    const objeto = organizar()
    const labels = retornaClases()

    for(let i=0;i<entradas.length;i++){
        params['Entrada'] = entradas[i]
        
        for(let j=0;j<labels.length;j++){
            params[labels[j]] = contaTexto(objeto[labels[j]],entradas[i])
        }
        categorias[i] = JSON.stringify(params)
    }

    categorias = eliminaDuplicados(categorias)

    for(let i=0;i<categorias.length;i++){
        categorias[i] = JSON.parse(categorias[i])
    }

    return categorias
}

function cantidadClases(){
    const categorias = frecuencia()
    return parseInt(Object.keys(categorias[0].length-1))
}

function sumarClases(arr=[]){
    let suma = 0
    for(let i=0;i<arr.length;i++){
        suma += parseInt(arr[i])
    }
    return suma
} 

function totalClases(){
    let total = []
    const nombreClases = retornaClases()
    const str_clases = JSON.stringify(clases)

    for(let i=0;i<nombreClases.length;i++){
        total[nombreClases[i]] = contaTexto(str_clases,nombreClases[i])
    }
    return total
}

function sumaTotalClases(){
    const vetTemp = Object.values(totalClases())
    let suma = 0
    for(let i=0;i<vetTemp.length;i++){
        suma += parseFloat(vetTemp[i])
    }
    return suma
}

function claseEntrada(_entrada='',_clase=''){
    const categorias = frecuencia()
    let retorno = 0
    categorias.forEach(item=>{
        if(item['Entrada'] == _entrada){
            retorno = parseFloat(item[_clase])
        }
    })
    return retorno
}

function naiveBayes(_entrada=''){
    const nombreClases = retornaClases()
    const total = totalClases()

    const categorias = frecuencia()
    let suma = 0
    categorias.forEach(item=>{
        if(item['Entrada'] == _entrada){
            for(let i=0;i<nombreClases.length;i++){
                suma += parseFloat(item[nombreClases[i]])
            }
        }
    })
    let probabilidad =  []
    for(let i=0;i<nombreClases.length;i++){
        probabilidad[nombreClases[i]] = 
        (claseEntrada(_entrada,nombreClases[i])/total[nombreClases[i]])
        *
        (total[nombreClases[i]] / sumaTotalClases())
        /
        (suma / sumaTotalClases())
        // console.log({
        //     primero:claseEntrada(_entrada,nombreClases[i]),
        //     divido1:total[nombreClases[i]],
        //     multiplicado2:total[nombreClases[i]],
        //     dividido2:sumaTotalClases(),
        //     dividido3:suma,
        //     divididopor3:sumaTotalClases()
        // })
    }
    return probabilidad
}

function train(config={}){
    if(config.input){entradas = config.input}else{entradas = ['']}
    if(config.output){clases = config.output}else{clases = ['']}
}

function predict(selecEntrada=''){
    const nombreClases = retornaClases()
    let probabilidades = []
    if(selecEntrada.toString().trim().length>0){
        const naive = naiveBayes(selecEntrada)
        
        for(let i=0;i<nombreClases.length;i++){
            const porcentual = Number(parseFloat(naive[nombreClases[i]] * 100).toFixed(4))
            probabilidades.push({class: nombreClases[i], probability:porcentual})
        }
    }else{
        probabilidades.push({class:'',probability:0})
    }

  return probabilidades  
        
}

train({
    input:['bom','mau','indiferente','indiferente'],
    output:['positivo','negativo','positivo','negativo']}
)

console.log(predict('mau'))