function derivada(n){
    return n * (1-n)
}

function tanhiperbolica(n){
    return Math.tanh(n)
}

function sigmoide(n){
    return 1/ (1+Math.pow(Math.E,-n))
}

function relu(n){
    return Math.max(n,0)
}

function activacion(n){
    let funcion = document.getElementById('ativacao').value
    console.log(document.getElementById('ativacao').value)
    if(funcion === '0'){
        return tanhiperbolica(n)
    }else if(funcion === '1'){
        return sigmoide(n)
    }else if(funcion === '2'){
        return relu(n)
    }
}

function executar(){
    let linhas = document.getElementById('linhas')
    linhas.innerHTML=''

    let input = document.getElementById('entrada').value
    let target = document.getElementById('busca').value
    let weight = Math.random();
    let epochs = document.getElementById('epocas').value
    
    let lines = ''
    
    for(let i=1;i<=epochs;i++){
        let output = activacion(input * weight)
        let error = target - output
        weight += input * derivada(error) * 1.5 //con un bias de 1.5 es 3 veces mas rapido

        lines +=`
        <tr>
            <td>${i}</td>
            <td>${zeros(Math.abs(error.toFixed(4)))}</td>
            <td>${output.toFixed(8)}</td>
        </tr>
        `
        if(corte(parseFloat(output),parseFloat(target))){
            i = parseInt(epochs)+1
        }

    }
    linhas.innerHTML=lines

    document.getElementById('desc_entrada').innerText = `entrada: ${input}`
    document.getElementById('desc_busca').innerText = `busca: ${target}`
    document.getElementById('desc_epocas').innerText = `epocas: ${epochs}`
}

function corte(a,b){
    if(a.toFixed(7)== b.toFixed(7)){
        return true
    }else{
        return false
    }
}


function zeros(n){
    if(n===0){
        return '0.0000'
    }else{
        let str = n.toString().trim()
        let length = str.length
        let dif = 6 - length
        if(dif>0){
        for(let i =0;i<dif;i++){
            str+='0'
            }
        }
        n = str
        return n
    }
}