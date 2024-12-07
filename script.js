const botaoAdicionar = document.querySelectorAll('.produto-item a')
const produtoItemNome = document.querySelectorAll('.produto-item h2')
const produtoItemPreco = document.querySelectorAll('.produto-item .preco')
let carrinho = obterTodosProdutos()
somaItensCarrinho(carrinho)

for (let index = 0; index < 4; index++) {
    botaoAdicionar[index].addEventListener('click', (evento) =>{
    evento.preventDefault()//para evitar q o link v apara outra página
    let produtoExiste = false
    for (let i = 0; i < carrinho.length; i++) {
        let produto = carrinho[i];
        if (produto.nome == produtoItemNome[index].textContent) {
            produto.quantidade ++
            produtoExiste = true
        }
    }
    if (!produtoExiste) {
        let produto = {
        "nome": produtoItemNome[index].textContent,
        "preco": produtoItemPreco[index].textContent,
        "quantidade": 1
        }
        carrinho.push(produto)
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
    somaItensCarrinho(carrinho)

    })  
}

function obterTodosProdutos(){
    let carrinho = JSON.parse(localStorage.getItem('carrinho'))
    if(carrinho == null || carrinho.length < 1){
        carrinho = []
    }
    return carrinho
}

function somaItensCarrinho(carrinho){
    const contador = document.querySelector('.contador')
    let somaQuantidade = 0
    for (let index = 0; index < carrinho.length; index++) {
        somaQuantidade += carrinho[index].quantidade
    }
    return contador.textContent = somaQuantidade
}



