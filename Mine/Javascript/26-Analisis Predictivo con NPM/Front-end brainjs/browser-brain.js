/*
function executar(){
    const config = {
        hiddenLayers: [30],
        leaningRate: 0.5,
        activation:'tanh'
    }
    const net =  new brain.NeuralNetwork(config)
    net.train([
        {input: [0,0],output:[0]},
        {input: [0,1],output:[0]},
        {input: [1,0],output:[0]},
        {input: [1,1],output:[1]},
    ])
    
    const entrada1 = Number(document.getElementById('entrada1').value)
    const entrada2 = Number(document.getElementById('entrada2').value)
    const output = parseFloat(net.run([entrada1,entrada2])).toFixed(6)
    
    document.getElementById('saida').value = output
}
*/
function executar(){
    const config = {
        hiddenLayers: [30],
        leaningRate: 0.5,
        activation:'tanh'
    }
    const net =  new brain.NeuralNetwork(config)
    net.train([
        {input: [0,0],output:[0]},
        {input: [0,1],output:[0]},
        {input: [1,0],output:[0]},
        {input: [1,1],output:[1]},
    ])
    
    const entrada1 = Number(document.getElementById('entrada1').value)
    const entrada2 = Number(document.getElementById('entrada2').value)
    const output = parseFloat(net.run([entrada1,entrada2])).toFixed(6)
    
    document.getElementById('saida').value = output
    

}