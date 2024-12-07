
const botaoAdicionar = document.querySelectorAll('.produto-item a')
const produtoItemNome = document.querySelectorAll('.produto-item h2')
const produtoItemPreco = document.querySelectorAll('.produto-item .preco')
let contador = document.querySelector('.contador')



for (let index = 0; index < 4; index++) {
    let totais = somarProdutos();
    contador.innerText = totais.somaQuantidade;
    botaoAdicionar[index].addEventListener('click', (evento) =>{
    evento.preventDefault()//para evitar q o link v apara outra página
    let carrinho = obterTodosProdutos()
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
    totais = somarProdutos();
    contador.innerText = totais.somaQuantidade;
    })  
}




//funções q eu quero reutilizar

function obterTodosProdutos() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    if (carrinho === null || carrinho.length < 1) {
        carrinho = [];
    }
    return carrinho;
}

function atualizarContador() {
    let totais = somarProdutos();
    return totais.somaQuantidade;
}

function adicionarProdutoAoCarrinho(nome, preco) {
    let carrinho = obterTodosProdutos();
    let produtoExiste = false;

    for (let i = 0; i < carrinho.length; i++) {
        let produto = carrinho[i];
        if (produto.nome === nome) {
            produto.quantidade++;
            produtoExiste = true;
        }
    }

    if (!produtoExiste) {
        let produto = {
            "nome": nome,
            "preco": preco,
            "quantidade": 1
        };
        carrinho.push(produto);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}
function somarProdutos(){
    let somaPreco = 0
    let somaQuantidade = 0
    let carrinho = obterTodosProdutos()
        carrinho.forEach(produto => {
            let precoNumerico = produto.preco.replace(/[^\d.-]/g, '');//teve que colocar ali pra ele substituir os caracteres, pq o valor fica dando NaN aaaaa peguei no chat pq tava boiando
            
            precoNumerico = parseFloat(precoNumerico); // Converte para número
            somaPreco += precoNumerico * produto.quantidade;
            somaQuantidade += produto.quantidade;
        })
    return {somaPreco, somaQuantidade}
}

