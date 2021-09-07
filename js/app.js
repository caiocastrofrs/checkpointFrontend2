//RECUPERANDO POP UP DE INSERIR CARD
let divInserirCard = document.getElementById('pop-up');
window.addEventListener('load',function() {
    divInserirCard.style.display = "none";
})
//PREVENINDO O RECARREGAMENTO DA PÁGINA AO DAR SUBMIT
divInserirCard.addEventListener('submit', function(e){
    e.preventDefault();
})
//ABRIR FORM
function abrirPopup() {
    divInserirCard.style.display = "flex";
}
//FECHAR FORM
function fecharPopup() {
    divInserirCard.style.display = "none";
    resetBotaoInserirCard();
}
//FUNÇÃO PARA CRIAR TODOS OS ELEMENTOS DO CARD
function criarCard(caminhoImagem, tituloH2, descricaoP) {
    let card = document.createElement('section');
    let titulo = document.createElement('h2');
    let img = document.createElement('img');
    let descricao = document.createElement('p');

    card.classList.add('card');
    card.setAttribute('onclick', "addEditSelecao(this)");
    img.src = caminhoImagem;
    img.alt = `poster do filme ${titulo}`;
    titulo.innerText = tituloH2;
    descricao.innerText = descricaoP;
    card.appendChild(img);
    card.appendChild(titulo);
    card.appendChild(descricao);

    return card;
}
//FUNÇÃO PARA INSERIR O CARD NA PÁGINA
function inserirCard() {
    let img;
    let titulo;
    let descricao;
    let card;
    if(checarCamposVazios()) {
        img = document.getElementById('urlImg').value;
        titulo = document.getElementById('titulo').value;
        descricao = document.getElementById('descricao').value;
        card = criarCard(img, titulo, descricao);

        card.addEventListener('dblclick', function() {
            this.classList.toggle('excluir-card');
        })
        card.style.animationName = "animacaoCriarCard";
        document.getElementById('card-container').appendChild(card);
        limparCampos();
        fecharPopup(); 
    } else {
        alert("Preencha todos os campos!");
    }
}
//FUNÇÃO PARA EXCLUIR O CARD
function excluirCard(card) {
    card.style.animationDuration = ".3s";
    card.style.animationName = "animacaoExcluirCard";
    setTimeout(function() {
        document.getElementById('card-container').removeChild(card);
    },290);

}
//FUNÇÃO PARA CHECAR SE EXISTEM CAMPOS VAZIOS NO MOMENTO DA INSERÇÃO DOS DADOS DO CARD
function checarCamposVazios() {
    if((document.getElementById('urlImg').value.length > 0) && 
    (document.getElementById('titulo').value.length > 0) && 
    (document.getElementById('descricao').value.length > 0)) {
        return true;
    } else {
        return false;
    }
}
//FUNÇÃO PARA ADICIONAR A SELEÇÃO DE EDIÇÃO DO CARD
function addEditSelecao(card) {
    if(card.classList.contains('excluir-card')) {
        card.classList.remove('excluir-card');
    } else if (card.classList.contains('editar-card')) { 
        card.classList.remove('editar-card');
    }else {
        card.classList.toggle("editar-card");
    }
}
//FUNÇÃO PARA RETORNAR UM ARRAY CONTENDO TODOS OS CARDS PRESENTES NA PÁGINA
function getArrayCards() {
    let cards = document.querySelectorAll('.card');
    return cards;
}
//FUNÇÃO PARA EXCLUIR TODO CARD QUE ESTIVER COM A SELEÇÃO DE EXCLUIR
function checarCardsSelecaoExcluir() {
    let cards = getArrayCards();
    for(card of cards) {
        if(card.classList.contains("excluir-card")) {
            excluirCard(card);
        }
    }
}
//FUNÇÃO PARA RETORNAR FALSO CASO TENHA MAIS DE UM CARD COM A SELEÇÃO DE EDIÇÃO OU RETORNA O CARD SELECIONADO
function checkQntdCardsEditar(arrayCards) {
    let cardSelecionado;
    let cont = 0;
    for(card of arrayCards) {
        if(card.classList.contains("editar-card")) {
            cont++;
            cardSelecionado = card;
        } 
    }
    if(cont > 1) {
        return false;
    }else {
        return cardSelecionado;
    }   
}
//FUNÇÃO PARA MUDAR O BOTÃO DE INSERIR FILME PARA EDITAR CARD E SETAR A FUNÇÃO editarCard() NO BOTÃO
function popUpEditar() {
    let cards = getArrayCards();
    let cardOuFalse = checkQntdCardsEditar(cards); 
    console.log(cards);
    if(cards.length == 0) {
        alert("Não há cards!")
    } else if(!cardOuFalse) {
        alert('Edite apenas um card por vez');
    }else {
        let botao = document.getElementById('btnEnviar');
        botao.innerText = "Editar card";
        botao.setAttribute('onclick',`editarCard()`);
        abrirPopup();
    }
}
//FUNÇÃO PARA EDITAR AS INFORMAÇÕES DO CARD
function editarCard() {
    let card = document.querySelector(".editar-card");
    if(document.getElementById('urlImg').value.length > 0) {
        card.children[0].src = document.getElementById('urlImg').value;
    }
    if(document.getElementById('titulo').value.length > 0) {
        card.children[1].innerText = document.getElementById('titulo').value;
    }
    if(document.getElementById('descricao').value.length > 0) {
        card.children[2].innerText = document.getElementById('descricao').value;
    }
    resetBotaoInserirCard();
    fecharPopup();
    limparCampos();
}
//FUNÇÃO PARA FORMATAR O BOTÃO DO FORM DE EDITAR CARD PARA INSERIR CARD
//É NECESSARIO POIS ESTOU UTILIZANDO O MESMO FORMULÁRIO PARA CRIAR E EDITAR CARD
//QUANDO O BOTÃO CRIAR CARD É CLICADO, O BOTÃO "INSERIR FILME" VEM COM A FUNÇÃO inserirCard();
//QUANDO O BOTÃO EDITAR CARD É CLICADO, O BOTÃO "INSERIR FILME" VEM COM A FUNÇÃO editarCard();
function resetBotaoInserirCard() {
    let botao = document.getElementById('btnEnviar');
    botao.innerText = "Inserir filme";
    botao.setAttribute('onclick',`inserirCard()`);
}
//FUNÇÃO PARA LIMPAR OS CAMPOS QUANDO O POP UP É FECHADO
function limparCampos() {
    document.getElementById('urlImg').value = "";
    document.getElementById('titulo').value = "";
    document.getElementById('descricao').value = "";
}

