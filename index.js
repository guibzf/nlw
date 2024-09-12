// Acessa o node_modules, dentro da pasta @inquirer, a pasta prompts e extraindo
const {select} = require('@inquirer/prompts')


const start = async () => {
    
    while(true) {
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case 'cadastrar':
                console.log('vamos cadastrar')
                break
            case 'listar':
                console.log('vamos listar')
                break
            case 'sair':
                console.log('Até a próxima!')
                return
        }
    }
}

start()