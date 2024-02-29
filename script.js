let musicas = [
    {titulo: "Construção", artista: "Chico Buarque", src:"musicas/contrucao_chico.mp3", img: "imagens/chico_buarque.png"},
    {titulo: "Conversatios", artista: "Juice WRLD", src:"musicas/conversations_juice.mp3", img: "imagens/conversations_juice.png"},
    {titulo: "Somebody to love", artista: "Justin Bieber", src:"musicas/somebody_to_love_jb.mp3", img: "imagens/somebody_to_love_jb.png"},
    {titulo: "The real Slim Shady", artista: "Eminem", src:"musicas/the_real_slim_shady.mp3", img: "imagens/slim_shady.png"}
    
];

//variaveis

let musica = document.querySelector("audio"); //tags são selecionadas sem o ponto
let indexMusica = 0;
let imagem = document.querySelector("img"); //seleciona a imagem
let nomeMusica = document.querySelector(".descricao h2"); //pega a tag "h2" dentro da classe "descricao"
let nomeArtista = document.querySelector(".descricao i"); //pega a tag "i" dentro da classe "descricao"
let duracaoMusica = document.querySelector(".fim");

renderizarMusica(indexMusica);


//eventos

document.querySelector(".botao-play").addEventListener("click", tocarMusica); //classes são selecionadas com o ponto "."

document.querySelector(".botao-pause").addEventListener("click", pausarMusica);

musica.addEventListener("timeupdate", atualizarBarra); //Atualiza a barra de progresso por meio do evento "timeupdate"

document.querySelector(".anterior").addEventListener("click", () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 3
    }
    renderizarMusica(indexMusica);
    tocarMusica();
});

document.querySelector(".proxima").addEventListener("click", () => {
    indexMusica++;
    if (indexMusica > 3) {
        indexMusica = 0
    }
    renderizarMusica(indexMusica);
    tocarMusica();
});


// funções

function renderizarMusica(index) {
    musica.setAttribute("src", musicas[index].src);
    musica.addEventListener("loadeddata", () => {
        nomeMusica.textContent= musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

setTimeout(function() {
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
}, 30); // 30 milissegundos = 0.03 segundos

function tocarMusica() {
    musica.play();
    document.querySelector(".botao-pause").style.display = "block";
    document.querySelector(".botao-play").style.display = "none";
} 

function pausarMusica() {
    musica.pause();
    document.querySelector(".botao-pause").style.display = "none";
    document.querySelector(".botao-play").style.display = "block";
} 

function atualizarBarra() {
    let barra = document.querySelector("progress");
    barra.style.width = `${Math.floor((musica.currentTime / musica.duration) * 100)}%`; // porcentagem da percorrida da música

    let tempoDecorrido = document.querySelector(".inicio");
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(`${musica.currentTime}`));

}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos/60);
    let campoSegundos = segundos % 60;

    if (campoSegundos < 10){
        campoSegundos = `0${campoSegundos}`
    }
    
    return `${campoMinutos}:${campoSegundos}`;
} 


