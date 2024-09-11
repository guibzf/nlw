// hello world

// let mensagem = "olá, mundo!"
// console.log(mensagem);
// console.log(mensagem);
// console.log(mensagem);
// console.log(mensagem);

//  arrays, objetos

// let metas = ["gui", "alo"]
// console.log(metas[1] + ", " + metas[0] + "!!!");


// let meta = {
//     value: "ler um livro por mês",
//     checked: false
// }
// console.log(meta.value)

// // named function // arrow function

// function criarMeta() {}
// const criarMeta = () => {}


const start = () => {
    
    while(true) {
        let opcao = 'cadastrar'
        switch(opcao) {
            case 'cadastrar':
                console.log('vamos cadastrar')
                break
            case 'listar':
                console.log('vamos listar')
                break
            case 'sair':
                return
        }
    }
}

start()