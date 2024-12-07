let carrinho = obterTodosProdutos();
const botaoExcluir = document.querySelectorAll('button');

somaItensCarrinho(carrinho);
somaValorCarrinho(carrinho);

for (let index = 0; index < carrinho.length; index++) {
    criarItemCarrinho(carrinho[index]);
}
//fiz assim pq n tinha ideia de como pegar cada input q eu cliquei se eles tem id e n entendi nada
document.querySelectorAll('input[type="number"]').forEach((input, index) => {
    input.addEventListener('input', (evento) => {
        carrinho = obterTodosProdutos();
        const produtoItemNome = document.querySelectorAll('.item-info h2');
        let nomeProduto = produtoItemNome[index].textContent;
        let novaQuantidade = parseInt(evento.target.value);//ele pega onde eu cliquei e o valor

        console.log(nomeProduto);
        carrinho.forEach((produto, indexProduto) => {
            if (produto.nome === nomeProduto) {
                produto.quantidade = novaQuantidade;
            }
        });
        somaItensCarrinho(carrinho);
        somaValorCarrinho(carrinho);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    });
});

function criarItemCarrinho(itemProduto) {
    //daqui pra baixo fizemos em sala
    const itemCarrinho = document.createElement('div');
    itemCarrinho.classList.add('item-carrinho');

    const item = document.createElement('div');
    item.classList.add('item');

    const itemImg = document.createElement('img');
    itemImg.src = 'https://picsum.photos/300/500';
    itemImg.alt = 'Imagem do Produto';
    itemImg.classList.add('item-img');

    const itemInfo = document.createElement('div');
    itemInfo.classList.add('item-info');

    const nomeProduto = document.createElement('h2');
    nomeProduto.textContent = itemProduto.nome;

    const preco = document.createElement('p');
    preco.classList.add('preco');
    preco.textContent = itemProduto.preco;

    const botao = document.createElement('button');
    botao.textContent = 'Remover';
    botao.classList.add('botao-remover');
    botao.addEventListener('click', () => {
        removerItemCarrinho(itemProduto);
    });

    item.appendChild(itemImg);
    itemInfo.appendChild(nomeProduto);
    itemInfo.appendChild(preco);
    item.appendChild(itemInfo);

    itemCarrinho.appendChild(item);
    itemCarrinho.appendChild(botao);

    const quantidade = document.createElement('label');
    quantidade.textContent = 'Quantidade:';
    const inputQuantidade = document.createElement('input');
    inputQuantidade.type = 'number';
    inputQuantidade.id = 'quantidade';
    inputQuantidade.value = itemProduto.quantidade;
    inputQuantidade.min = '1';
    itemInfo.appendChild(quantidade);
    quantidade.appendChild(inputQuantidade);

    let carrinhoContainer = document.querySelector('.carrinho');
    carrinhoContainer.prepend(itemCarrinho);//esse prepend aqui ajuda mt pq o total tava ficando em cima de tudp,ai o prepend faz q o item seja add no cmc do carrinho
}

function removerItemCarrinho(produto) {
    carrinho = obterTodosProdutos();
    carrinho = carrinho.filter(item => item.nome !== produto.nome);//aqui ele cria basicamene um novo array só com os produtos que eu n vou excluir, fiz isso por conta do infice q ficava dando problema na hora de excluir e tudo
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinhoContainer = document.querySelector('.carrinho');
    carrinhoContainer.innerHTML = ''//limpa tudo e depous ja cria o total dvc e os items pq o indice tava dando projlema ali
    carrinhoContainer.innerHTML = '<div class="total">' +
        '<p>Total: R$ 00,00</p>' +
        '<button class="botao-comprar">Finalizar Compra</button>' +
        '</div>';
    
        carrinho.forEach((itemProduto) => {
            criarItemCarrinho(itemProduto);
        });
        somaItensCarrinho(carrinho);
        somaValorCarrinho(carrinho);
}
    


function obterTodosProdutos() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    if (!carrinho) {
        carrinho = [];
    }
    return carrinho;
}

function somaItensCarrinho(carrinho) {
    const contador = document.querySelector('.contador');
    let somaQuantidade = 0;
    for (let index = 0; index < carrinho.length; index++) {
        somaQuantidade += carrinho[index].quantidade;
    }
    contador.textContent = somaQuantidade;
}

function somaValorCarrinho(carrinho) {
    const valor = document.querySelector('.total p');
    let somaValor = 0;
    for (let index = 0; index < carrinho.length; index++) {
        const precoLimpo = parseFloat(carrinho[index].preco.replace('R$', '').trim());//tem que tiear o bgl R$ pra poder calcular
        somaValor += carrinho[index].quantidade * precoLimpo;
    }
    valor.textContent = `R$ ${somaValor.toFixed(2)}`;
}
