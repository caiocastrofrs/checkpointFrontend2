let divInserirCard = document.getElementById('pop-up');

window.addEventListener('load',function() {
    divInserirCard.style.display = "none";
})

divInserirCard.addEventListener('submit', function(e){
    e.preventDefault();
})

function abrirPopup() {
    divInserirCard.style.display = "flex";
}
function fecharPopup() {
    divInserirCard.style.display = "none";
}

function excluirCard(card) {
    let cardContainer = document.getElementById('card-container');
    cardContainer.removeChild(card);
}
function criarCard(caminhoImagem, tituloH2, descricaoP) {
    let card = document.createElement('section');
    card.classList.add('card');
    card.setAttribute('onclick', "selecionarCard(this)");
    let titulo = document.createElement('h2');
    titulo.innerText = tituloH2
    let img = document.createElement('img');
    img.src = caminhoImagem;
    img.alt = `poster do filme ${titulo}`
    let descricao = document.createElement('p');
    descricao.innerText = descricaoP

    card.appendChild(img);
    card.appendChild(titulo);
    card.appendChild(descricao);

    return card;

}
function inserirCard() {
    let img;
    let titulo;
    let descricao;
    if((document.getElementById('urlImg').value.length > 0) && (document.getElementById('titulo').value.length > 0) && (document.getElementById('descricao').value.length > 0)) {
        img = document.getElementById('urlImg').value;
        titulo = document.getElementById('titulo').value;
        descricao = document.getElementById('descricao').value;
        let card = criarCard(img, titulo, descricao);
        card.addEventListener('dblclick', function() {
            this.classList.toggle('excluir-card');
        })
        document.getElementById('card-container').appendChild(card);
        limparCampos();
        fecharPopup(); 
    } else {
        document.getElementById('pop-up-alerta').style.animation = "popUpShowUp 1s both";
    }

}

function selecionarCard(card) {
    if(card.classList.contains('excluir-card')) {
        card.classList.remove('excluir-card');
    } else if (card.classList.contains('editar-card')) { 
        card.classList.remove('editar-card');
    }else {
        card.classList.toggle("editar-card");
    }
    
}

function checarCardsExcluir() {
    let cards = document.querySelectorAll('.card');
    for(card of cards) {
        if(card.classList.contains("excluir-card")) {
            excluirCard(card);
        }
    }
}

function qntdCardsEditar(arrayCards) {
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
    fecharPopup();
    limparCampos();
    resetBotaoInserirCard();
}

function limparCampos() {
    document.getElementById('urlImg').value = "";
    document.getElementById('titulo').value = "";
    document.getElementById('descricao').value = "";
}
function resetBotaoInserirCard() {
    let botao = document.getElementById('btnEnviar');
    botao.innerText = "Inserir filme";
    botao.setAttribute('onclick',`inserirCard()`);
}
function checarCardEditar() {
    let cards = document.querySelectorAll('.card');
    let cardOuFalso = qntdCardsEditar(cards);  
    for(card of cards) {
        if(card.classList.contains("editar-card")) {
            if(!cardOuFalso) {
                alert('Edite apenas um card por vez');
                break;
            } else {
                let botao = document.getElementById('btnEnviar');
                botao.innerText = "Editar card";
                botao.setAttribute('onclick',`editarCard()`);
                abrirPopup();
            }
        }
    }
}

