// Acessa o node_modules, dentro da pasta @inquirer, a pasta prompts e extraindo
const {select, input, checkbox} = require('@inquirer/prompts')

const fs = require("fs").promises

let mensagem = "Bem vindo ao app de metas!";


let metas




// CARREGAR METAS COM JSON

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}





// CADASTRAR METAS

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta:"})

    if(meta.length == 0) {
        mensagem = "A meta não pode ser vazia."
        return
    }

    metas.push(
        { value: meta, checked: false },
    )

    mensagem = "Meta cadastrada com sucesso!"
}





// LISTAR METAS

if(metas.length == 0) {
    mensagem = "Não existem metas"
    return
}
const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar esta etapa.",
        choices: [...metas]
        })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada"
        return
    }

    
    
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) concluída(s)!"
}





// METAS REALIZADAS

const metasRealizadas = async () => {

    if(metas.length == 0) {
        mensagem = "Não existem metas"
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        mensagem = "Não existem metas realizadas :("
        return
    }
    
    await select({
        message: "Metas realizadas:" + realizadas.length,
        choices: [...realizadas]
    })
}





// METAS ABERTAS

const metasAbertas = async () => {
    
    if(metas.length == 0) {
        mensagem = "Não existem metas"
        return
    }
    
    
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0) {
        mensagem = "Não existem metas abertas :)"
        return
    }

    await select({
        message: "Metas abertas:" + abertas.length,
        choices: [...abertas]
    })
}





// REMOVER METAS

const removerMetas = async () => {


    if(metas.length == 0) {
        mensagem = "Não existem metas"
        return
    }
    
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const metasARemover = await checkbox({
        message: "Selecione um item para remover.",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(metasARemover.length == 0) {
        mensagem = "Nenhuma meta para remover!"
        return
    }

    metasARemover.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Metas removidas com sucesso!"
}





//  MENSAGENS

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}





// START SYSTEM

const start = async () => {
    await carregarMetas()
    
    while(true) {
        mostrarMensagem()
        await salvarMetas()
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Remover metas",
                    value: "remover"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case 'cadastrar':
                await cadastrarMeta()
                break
            case 'listar':
                await listarMetas()
                break
            case 'realizadas':
                await metasRealizadas()
                break
            case 'abertas':
                await metasAbertas()
                break
            case 'remover':
                await removerMetas()
                break
            case 'sair':
                console.log('Até a próxima!')
                return
        }
    }
}

start()