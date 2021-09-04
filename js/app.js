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
    let img = document.getElementById('urlImg').value;
    let titulo = document.getElementById('titulo').value;
    let descricao = document.getElementById('descricao').value;
    let card = criarCard(img, titulo, descricao);
    card.addEventListener('dblclick', function() {
        this.classList.toggle('excluir-card');
    })
    document.getElementById('card-container').appendChild(card);
    fecharPopup(); 
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
    card.children[0].src = document.getElementById('urlImg').value;
    card.children[1].innerText = document.getElementById('titulo').value;
    card.children[2].innerText = document.getElementById('descricao').value;
}
function checarCardEditar() {
    let cards = document.querySelectorAll('.card');
    let cardOuFalso = qntdCardsEditar(cards);  
    for(card of cards) {
        if(card.classList.contains("editar-card")) {
            if(!cardOuFalso) {
                alert('Edite apenas um card por vez');
            } else {
                let botao = document.getElementById('btnEnviar');
                botao.innerText = "Editar card";
                botao.setAttribute('onclick',`editarCard()`);
                abrirPopup();
            }

            
        }
    }
}

