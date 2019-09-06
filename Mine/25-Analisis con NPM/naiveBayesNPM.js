const NaiveBayes = require('ml-bayes')

const bayes = new NaiveBayes()
/*
bayes.train('Que dia feliz está hoje','Feliz')
bayes.train('Meu dia hoje foi triste','Triste')
bayes.train('Hoje meu dia foi ótimo','Feliz')
bayes.train('Hoje o dia foi ruin','Triste')

//const frase = 'Levantei de cama feliz hoje!'
const frase = 'hoje meu dia nao foi bom'

const comparacion = bayes.guess(frase)
const response = bayes.extractWinner(comparacion)

console.log({comparacion,response})
*/
/*
bayes.train('Quente, humido e ventos fortes','Lluvia')
bayes.train('Frio, seco e ventos fracos','Nublado')
bayes.train('Quente, seco e ventos fracos','Sol')

//const frase = 'Humido, ventos fracos e quente'
//const frase = 'Seco, ventos fortes e frio'
const frase = 'Ventos fortes, seco e quente'

const comparacion = bayes.guess(frase)
const response = bayes.extractWinner(comparacion)

console.log({comparacion,response})
*/
bayes.train('Olá! Tenha um bom dia!','Portugues')
bayes.train('OI! Como vai você?','Portugues')
bayes.train('O livro está sobre a mesa. Muito quente','Portugues')
bayes.train('Qual é o seu nome?','Portugues')

bayes.train('Hello! Have a nice day!','Ingles')
bayes.train('HI! How are you?','Ingles')
bayes.train('The book is on the table.','Ingles')
bayes.train('What is your name?','Ingles')

bayes.train('¡Hola! ¡Tenga un buen día!','Español')
bayes.train('HI! ¿Cómo te va?','Español')
bayes.train('El libro está sobre la mesa.','Español')
bayes.train('¿Cual es tu nombre?','Español')

bayes.train('Bonjour Passez une bonne journée!','Frances')
bayes.train('Salut Comment ça va.','Frances')
bayes.train('Le livre est sur la table.','Frances')
bayes.train('Quel est votre nom.','Frances')

bayes.train('Hallo! Ich wünsche dir einen schönen Tag!','Aleman')
bayes.train('Hi! Wie geht es dir.','Aleman')
bayes.train('Das Buch liegt auf dem Tisch.','Aleman')
bayes.train('Wie heißt du.','Aleman')

const portugues = 'Oi! Hoje está um ótimo dia para correr'
const ingles = 'Hi! Today is a great day to run.'
const español = 'Hola! Hoy es un gran día para correr.'
const frances = "Salut Aujourd'hui est un grand jour pour courir."
const aleman = 'Hi! Heute ist ein großartiger Tag zum Laufen.'

const frase = ingles

const comparacion = bayes.guess(frase)
const response = bayes.extractWinner(comparacion)

console.log({comparacion,response})