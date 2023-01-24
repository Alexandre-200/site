var diryJ, dirxJ, jog, velJ, pjx, pjy;
var velT;
var tamTelaW, tamTelaH;
var jogo;
var frames;
var contBombas,
  painelContBombas,
  velB,
  tmpCriaBomba,
  tmpcontrolaBomba,
  qtdBombas;
var bombasTotal;
var vidaPlaneta, barraPlaneta;
var ie, isom;
var telaMsg;


function teclaDw() {
  var tecla = event.keyCode;
 
  console.log("PJX = "+pjx);
  if (pjx > 0 && pjx < tamTelaW - 40 ) {
    if (tecla == 38) {
      // ATIRA
      atira(pjx + 17, pjy);
    } else if (tecla == 37) {
      dirxJ = -1;
      // ESQUERDA
    } else if (tecla == 39) {
      dirxJ = 1;
      // DIREITA
    }
    document.removeEventListener("keydown",teclaDw);
  }
}

function controlaJogador() {
  pjx += dirxJ * velJ;
  jog.style.left = pjx + "px";
}

function teclaUp() {
  var tecla = event.keyCode;
  if (tecla == 39) {
    dirxJ = 0;
  } else if (tecla == 37) {
    dirxJ = 0;
  }
  document.addEventListener("keydown",teclaDw);
}

function criaBomba() {
  if (jogo && qtdBombas < 5) {
    var y = 0;
    var x = Math.random() * tamTelaW - 24;

    var bomba = document.createElement("div");
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    att1.value = "bomba";
    att2.value = "top:" + y + "px; left:" + x + "px;";
    bomba.setAttributeNode(att1);
    bomba.setAttributeNode(att2);
    document.body.appendChild(bomba);
    contBombas--;
    qtdBombas++;
  }
}

function controlaBomba() {
  bombasTotal = document.getElementsByClassName("bomba");
  var tam = bombasTotal.length;
  for (var i = 0; i < tam; i++) {
    if (bombasTotal[i]) {
      var py = bombasTotal[i].offsetTop;
      var px = bombasTotal[i].offsetLeft;
      var mov;
      mov = Math.floor(Math.random() * 2);
      console.log("move " + mov);
      if (mov == 1) {
        //1 = Y
        if (px - 24 <= 0) {
          px += 50;
        } else if (px >= tamTelaW) {
          px -= 50;
        } else {
          mov = Math.floor(Math.random() * 2);
          if (mov == 1) {
            px += 50;
          } else {
            px -= 50;
          }
        }
      } else {
      }

      py += 30;
      bombasTotal[i].style.top = py + "px";
      bombasTotal[i].style.left = px + "px";
    }
  }
}

function verificaPassagemBomba() {
  bombasTotal = document.getElementsByClassName("bomba");
  var tam = bombasTotal.length;
  for (var i = 0; i < tam; i++) {
    if (bombasTotal[i]) {
      var py = bombasTotal[i].offsetTop;
      if (py > tamTelaH) {
        bombasTotal[i].remove();
        qtdBombas--;
      }
    }
  }
}

function atira(x, y) {
  var t = document.createElement("div");
  var att1 = document.createAttribute("class");
  var att2 = document.createAttribute("style");
  att1.value = "tiroJog";
  att2.value = "top:" + y + "px; left:" + x + "px";
  t.setAttributeNode(att1);
  t.setAttributeNode(att2);
  document.body.appendChild(t);
}

function controleTiros() {
  var tiros = document.getElementsByClassName("tiroJog");
  var tam = tiros.length;
  for (var i = 0; i < tam; i++) {
    if (tiros[i]) {
      var pt = tiros[i].offsetTop;
      pt -= velT;
      tiros[i].style.top = pt + "px";
      colisaoTiroBomba(tiros[i]);
      if (pt < 0) {
        //document.body.removeChild(tiros[i]);
        tiros[i].remove();
      }
    }
  }
}

function colisaoTiroBomba(tiro) {
  var tam = bombasTotal.length;
  for (var i = 0; i < tam; i++) {
    if (bombasTotal[i]) {
      if (
        tiro.offsetTop <= bombasTotal[i].offsetTop + 40 && //cima tiro com baixo bomba
        tiro.offsetTop + 6 >= bombasTotal[i].offsetTop && //baixo tiro com cima bomba
        tiro.offsetLeft <= bombasTotal[i].offsetLeft + 24 && //esquerda tiro com direita bomba
        tiro.offsetLeft + 6 >= bombasTotal[i].offsetLeft //direita tiro com esquerda bomba
      ) {
        criaExplossao(
          1,
          bombasTotal[i].offsetLeft - 25,
          bombasTotal[i].offsetTop
        );
        bombasTotal[i].remove();
        tiro.remove();
      }
    }
  }
}

function criaExplossao(tipo, x, y) {
  //tipo 1=AR, 2=TERRA
  if (document.getElementById("explosao" + ie - 5)) {
    document.getElementById("explosao" + ie - 5).removeAttributeNode();
  }
  var explosao = document.createElement("div");
  var img = document.createElement("img");
  var som = document.createElement("audio");

  var att1 = document.createAttribute("class");
  var att2 = document.createAttribute("style");
  var att3 = document.createAttribute("id");

  var att4 = document.createAttribute("src");

  var att5 = document.createAttribute("src");
  var att6 = document.createAttribute("id");

  att3.value = "explosao" + ie;
  if (tipo == 1) {
    att1.value = "explosaoAr";
    att2.value = "top:" + y + "px;left:" + x + "px";
    att4.value = "../img/explosao_ar.gif?" + new Date();
  } else {
    att1.value = "explosaoChao";
    att2.value = "top:" + (tamTelaH - 57) + "px;left:" + (x - 17) + "px";
    att4.value = "../img/explosao_chao.gif?" + new Date();
  }
  att5.value = "../img/exp1.mp3?" + new Date();
  att6.value = "som" + isom;

  explosao.setAttributeNode(att1);
  explosao.setAttributeNode(att2);
  explosao.setAttributeNode(att3);

  img.setAttributeNode(att4);
  som.setAttributeNode(att5);
  som.setAttributeNode(att6);
  explosao.appendChild(img);
  explosao.appendChild(som);

  document.body.appendChild(explosao);
  document.getElementById("som" + isom).play();
  isom++;
  ie++;
  qtdBombas--;
}

function gerenciaGame() {
  barraPlaneta.style.width = vidaPlaneta + "px";
  if (contBombas <= 0) {
    jogo = false;
    clearInterval(tmpCriaBomba);
    telaMsg.style.backgroundImage = "url('../img/vitoria.jpg')";
    telaMsg.style.display = "block";
  }
  if (vidaPlaneta <= 0) {
    jogo = false;
    clearInterval(tmpCriaBomba);

    telaMsg.style.display = "block";
    telaMsg.style.backgroundImage = "url('./img/derrota.jpg')";
  }
}

function gameLoop() {
  if (jogo) {
    //funcoes de controle
    controlaJogador();
    controleTiros();
    verificaPassagemBomba();
    //controlaBomba();
  }
  gerenciaGame();
  frames = requestAnimationFrame(gameLoop);
}

function reinicia() {
  bombasTotal = document.getElementsByClassName("bomba");
  var tam = bombasTotal.length;
  for (var i = 0; i < tam; i++) {
    if (bombasTotal[i]) {
      bombasTotal[i].remove();
    }
  }
  telaMsg.style.display = "none";
  clearInterval(tmpCriaBomba);
  clearInterval(tmpcontrolaBomba);
  cancelAnimationFrame(frames);
  vidaPlaneta = 300;
  pjx = tamTelaW / 2;
  pjy = tamTelaH - 80;
  jog.style.top = pjy + "px";
  jog.style.lft = pjx + "px";
  contBombas = 150;
  qtdBombas = 0;
  jogo = true;
  tmpCriaBomba = setInterval(criaBomba, 1700);
  tmpcontrolaBomba = setInterval(controlaBomba, 1000);
  gameLoop();
}

function inicia() {
  jogo = true;
  //Ini tela
  tamTelaH = window.innerHeight;
  tamTelaW = window.innerWidth;

  //Ini jogador
  dirxJ = 0;
  pjx = tamTelaW / 2;

  velJ = velT = 5;
  jog = document.getElementById("navJog");

  jog.style.top = pjy + "px";
  jog.style.left = "50%";

  //controle de bombas
  qtdBombas = 0;
  contBombas = 150;
  velB = 3;

  //controles do planeta
  vidaPlaneta = 300;
  barraPlaneta = document.getElementById("barraPlaneta");
  barraPlaneta.style.width = vidaPlaneta + "px";
  //controle explsao
  ie = isom = 0;

  //telas
  telaMsg = document.getElementById("telaMsg");
  telaMsg.style.backgroundImage = "url('../img/intro.jpg')";
  telaMsg.style.display = "block";
  document.getElementById("btnJogar").addEventListener("click", reinicia);
}

window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);
