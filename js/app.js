/* document.getElementById('deletar').offsetParent.style.display = 'none'; */
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
//FUNÇÃO PARA RECUPERAR O CARD QUE TEM QUE SER EXCLUIDO E CHAMAR A FUNÇÃO DE EXCLUIR PASSANDO O CARD COMO PARAMETRO
function excluirCard(imagem) {
    let cardContainer = document.getElementById('card-container');
    var card = imagem.parentElement;
    cardContainer.removeChild(card);
}
function aparecerX(param){
    param.children[0].style.display = "inline-block";
}
function removerX(param){
    param.children[0].style.display = "none";
}
function inserirCard() {
    let img = document.getElementById('urlImg').value;
    let titulo = document.getElementById('titulo').value;
    let descricao = document.getElementById('descricao').value;
    document.getElementById('card-container').innerHTML += 
    `<section class="card" onmouseover="aparecerX(this)" onmouseout="removerX(this)">
        <img src="./icons/cancel.png" id="excluir" name="btnExcluir" onclick="excluirCard(this)"/>
        <img src="${img}"alt="poster do filme ${titulo}"/>
        <h2>${titulo}</h2>
        <p>${descricao}</p>
    </section>`
    fecharPopup(); 
}


