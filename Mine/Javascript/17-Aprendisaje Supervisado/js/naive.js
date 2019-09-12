document.getElementById('si').checked = true
let diabetes = 'si'

function setDiabetes(value=''){
    diabetes = value.toString().toLowerCase().trim()
}


function cadastrar(){
    entradas.push(document.getElementById('entrada').value.toString().trim())
    clases.push(diabetes.toUpperCase())
   
    let linhas = '';
    for(let i=0;i<entradas.length;i++){
        linhas += 
        `<tr>
            <td> ${entradas[i]} </td>
            <td> ${clases[i]} </td>
        </tr>
        `
    }

    let opcoes = `<option value=""></option>`
    let nomeEntradas = eliminaDuplicados(entradas)
    for(let i=0;i<nomeEntradas.length;i++){
        opcoes += `<option value="${nomeEntradas[i]}">${nomeEntradas[i]}</option>`
    }

    document.getElementById('linhas').innerHTML = linhas
    document.getElementById('sel_entrada').innerHTML = opcoes

}

function executar(){
    train({input: entradas, output: clases})

    const selEntrada = document.getElementById('sel_entrada').value.toString().trim()
    let retorno = ''

    if(selEntrada.toString().trim().length > 0){

            const arrJson = predict(selEntrada)
            for(let i=0;i<arrJson.length;i++){
                retorno += `
                <strong> ${arrJson[i].class}: </strong> ${arrJson[i].probability}% -`
            }
            retorno = `: ${retorno}#`
            retorno = retorno.replace('-#','')

    }else{
        retorno = ': 0'
    }

    document.getElementById('resultado').innerHTML = retorno
}