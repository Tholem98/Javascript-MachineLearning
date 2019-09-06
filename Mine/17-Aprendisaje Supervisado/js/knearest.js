document.getElementById('si').checked = true
let seguridad = 'si'

function setSeguridad(value=''){
    seguridad = value.toString().toLowerCase().trim()
}

function prepararCadastro(){
    document.getElementById('eixoX').value = 1
    document.getElementById('eixoY').value = 0
}

function cadastrar(){
    eixoX.push(Number(document.getElementById('eixoX').value))
    eixoY.push(Number(document.getElementById('eixoY').value))
    let seguro = 'Seguro'
    if(seguridad == 'no') seguro = 'No Seguro' 

    clase.push(seguro)

    let linhas = ''
    for(let i=0;i<eixoX.length;i++){
        linhas += 
        `<tr>
            <td>${eixoX[i]}</td>
            <td>${eixoY[i]}</td>
            <td>${clase[i]}</td>
        </tr>
        `
    }

    document.getElementById('linhas').innerHTML = linhas
}

function retornaClasse(){
    train({x:eixoX, y:eixoY, clase: clase})
    const entradaX = Number(document.getElementById('entradaX').value)
    const entradaY = Number(document.getElementById('entradaY').value)
    const result = predict(entradaX,entradaY)
    document.getElementById('entradaC').value = result
}