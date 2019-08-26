let entradas = []
let classes = []

function prepararCadastro(){
    document.getElementById('entrada').value=''
    document.getElementById('classe').value=''
}

function cadastrar(){
    const entry = document.getElementById('entrada').value
    const classe = document.getElementById('classe').value

    entradas.push(entry.toString().trim())
    classes.push(classe.toString().trim())

    let linhas = ''
    for(let i=0;i<entradas.length;i++){
        linhas += `
            <tr>
                <td>${entradas[i]}</td>
                <td>${classes[i]}</td>
            </tr>
        `
    }

    let opcoes = "<option value=''></option>"
    /*let nomeEntradas = eliminaDuplicados(entradas)
    for(let i=0;nomeEntradas;i++){
        opcoes += `<option value="${nomeEntradas[i]}">${nomeEntradas[i]}</option>`
    }*/

    document.getElementById('linhas').innerHTML = linhas
    //document.getElementById('sel_entrada').innerHTML = opcoes
}