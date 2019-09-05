function prever(){
    const idade = Number(document.getElementById('idade').value)
    const area = Number(document.getElementById('area').value)

    const config = {
        input:[[10,45,],[20,55],[15,75],[30,95]],
        output: [109000,211000,165000,319000]
    }
    const regression = new RegresionLinearMult()
    regression.train(config)

    const result = regression.predict([[idade,area]])[0]
console.log(result)
    plot(idade,area,result)
}

plot()
function plot(idade=0,area=0,result=0){
    let trace = null
    if(result > 0){
        trace = {
            x: [10,20,15,30,idade],
            y: [104500,205500,157500,309500,result],
            node : 'markers',
            marker:{
                size:[45,55,75,95,area]
            }
        }
    }else{
        trace = {
            x: [10,20,15,30],
            y: [109000,211000,165000,319000],
            node : 'markers',
            marker:{
                size:[45,55,75,95]
            }
        }
    }

    const data = [trace]
    Plotly.newPlot('grafico',data,{},{showSendToCloud: true})
}