//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

let chanceDeErrar = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
trilha = loadSound("trilha.mp3");
ponto = loadSound("ponto.mp3");
raquetada = loadSound("raquetada.mp3");
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
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  VerificacolisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
 }
 

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
      xBolinha = 23
    }
    if (xBolinha + raio > 600){
      xBolinha = 580
    }
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
 
function verificaColisaoBorda(){
  if(xBolinha + raio > width || 
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
}
 if(yBolinha + raio > height || yBolinha - raio <0){
   velocidadeYBolinha *= -1;
}
  
 }
function mostraRaquete(x, y){
  rect (x, y, comprimentoRaquete, alturaRaquete);
  
}

function movimentaMinhaRaquete (){
  if (keyIsDown(UP_ARROW)){
    yRaquete -=10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete +=10;
  }
}
function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + comprimentoRaquete && 
     yBolinha - raio < yRaquete + alturaRaquete && 
     yBolinha + raio >yRaquete){
    velocidadeXBolinha *= -1;
     raquetada.play();
  }  
}

function colisaoMinhaRaquete(){
  colidiu = collideRectCircle(xRaquete, yRaquete,comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
  }
}

function VerificacolisaoRaquete(x,y){
  colidiu = collideRectCircle(x, y,comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
     raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - comprimentoRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150,10,40,20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255,140,0));
  rect(450,10,40,20);
  fill(255);
  text(pontosOponente, 470, 26);
  }

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;  
    ponto.play();
  }
  
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

