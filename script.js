const cep = document.querySelector('#cep');

const endereco = (dados) => {
    for (let x in dados) {
        console.log(cep)
        if(document.querySelector('#' + x)) {
            document.querySelector('#' + x).value = dados[x]
        }
    }
}

cep?.addEventListener('blur', (e) => {

    e.preventDefault

    console.log(cep)

    let search = cep.value;

    // fetch api usa promises (then, catch)
    // site de verificacao de cep
    fetch(`https://viacep.com.br/ws/${search}/json/`, {
        method: 'get', 
        mode: 'cors',
        cache: 'default'
    })
    .then(res => {
        res.json()
        .then(dados => {
            endereco(dados)
        })
    })
    .catch();
})

async function mostrarProdutos() {
    const produtos = await fetch('/api/consultarProdutos').then(res => res.json())

    function criarTabela(dadosBanco) {
        var tabelaProdutos = document.querySelector('#tabelaProdutos')

        for (let i = 0; i < produtos.length; i++) {
            var linha = document.createElement('tr')

            var celulaCodigo = document.createElement('td')
            var celulaNome = document.createElement('td')
            var celulaTipo = document.createElement('td')
            var celulaQuantidade = document.createElement('td')

            celulaCodigo.innerText = produtos[i].cod_barras
            celulaNome.innerText = produtos[i].nome
            celulaTipo.innerText = produtos[i].tipo
            celulaQuantidade.innerText = produtos[i].quantidade

            linha.appendChild(celulaCodigo)
            linha.appendChild(celulaNome)
            linha.appendChild(celulaTipo)
            linha.appendChild(celulaQuantidade)  

            tabelaProdutos.appendChild(linha)
        }
    }

    criarTabela(produtos)
}


async function mostrarPedidos() {
    const pedidos = await fetch('/api/consultarPedidos').then(res => res.json())

    function criarTabela(dadosBanco) {
        var tabelaPedidos = document.querySelector('#tabelaPedidos')

        for (let i = 0; i < pedidos.length; i++) {
            var linha = document.createElement('tr')

            var celulaId = document.createElement('td')
            var celulaValor = document.createElement('td')
            var celulaCpf = document.createElement('td')
            var celulaTamanho = document.createElement('td')
            var celulaEntrega = document.createElement('td')
            var celulaSabor1 = document.createElement('td')
            var celulaSabor2 = document.createElement('td')
            var celulaSabor3 = document.createElement('td')
            var celulaSabor4 = document.createElement('td')

            celulaId.innerText = pedidos[i].idPedido
            celulaValor.innerText = pedidos[i].valor
            celulaCpf.innerText = pedidos[i].cpf
            celulaTamanho.innerText = pedidos[i].tamanho
            celulaEntrega.innerText = pedidos[i].retiradaEntrega
            celulaSabor1.innerText = pedidos[i].sabor1
            celulaSabor2.innerText = pedidos[i].sabor2
            celulaSabor3.innerText = pedidos[i].sabor3
            celulaSabor4.innerText = pedidos[i].sabor4

            linha.appendChild(celulaId)
            linha.appendChild(celulaValor)
            linha.appendChild(celulaCpf)
            linha.appendChild(celulaTamanho)  
            linha.appendChild(celulaEntrega)
            linha.appendChild(celulaSabor1)
            linha.appendChild(celulaSabor2)
            linha.appendChild(celulaSabor3)
            linha.appendChild(celulaSabor4)

            tabelaPedidos.appendChild(linha)
        }
    }

    criarTabela(pedidos)
}

const botaoAtualizar = document.querySelector('#atualizar')
const botaoDeletar = document.querySelector('#deletar')
const formAtualizar = document.querySelector('#formAtualizar')
const formDeletar = document.querySelector('#formDeletar')
let i = 0
let j = 0

botaoAtualizar?.addEventListener('click', (e) => {
    e.preventDefault

    if (i%2 == 0) {
        formAtualizar.style.display = 'block'
        formDeletar.style.display = 'none'
        j = 0
    } else {
        formAtualizar.style.display = 'none'
    }

    i++
})

botaoDeletar?.addEventListener('click', (e) => {
    e.preventDefault

    console.log(i,j)

    if (j%2 == 0) {
        formDeletar.style.display = 'block'
        formAtualizar.style.display = 'none'
        i = 0
    } else {
        formDeletar.style.display = 'none'
    }

    j++
})