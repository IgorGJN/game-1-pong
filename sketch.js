//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//variáveis oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
//  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  movimentaMultiplayer();
//  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro)
}  

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura)
}

function movimentaMinhaRaquete(){
  if (keyIsDown (87)){
    yRaquete -=10;
  }
  if (keyIsDown (83)){
    yRaquete +=10;
  }
}
function movimentaMultiplayer(){
  if (keyIsDown (UP_ARROW)){
    yRaqueteOponente -=10;
  }
  if (keyIsDown (DOWN_ARROW)){
    yRaqueteOponente +=10;
  }
}
  
function verificaColisaoRaquete(x, y){
  colidiu = 
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
} 

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento /2 - 30;
  yRaqueteOponente += velocidadeYOponente
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(0,255,0))
  rect(130,10, 40, 20);  
  fill(255);
  text(meusPontos, 150, 27);
  fill(color(0,255,0))
  rect(430, 10, 40, 20);  
  fill(255);
  text(pontosOponente, 450, 27);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 300
    }    
  if (xBolinha - raio > 591){
    xBolinha = 300
    }
}