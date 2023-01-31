var diryJ, dirxJ, jog, velJ, pjx, pjy;
var velT;
var tamTelaW, tamTelaH;
var jogo;
var frames;
var localNave;
var contBombas,
  painelContBombas,
  velB,
  tmpCriaBomba,
  tmpcontrolaBomba,
  qtdBombas;
var bombasTotal;
var vida;
var ie, isom;
var telaMsg;
var qtdTiros;

function quantidadeVida(vida) {
  let tempo = 400;
  if (vida >= 0) {
    var qv = document.getElementById("qtdVidas");
    qv.innerText = vida;

    var sofreu = document.createElement("div");

    if (vida == 0) {
      const texto = document.createTextNode("GAME - OVER");
      sofreu.appendChild(texto);
      tempo = 2000;
    }

    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    att1.value = "sofreu";
    att2.value =
      "width: 100%;" +
      "height:100%;" +
      "display: flex;" +
      "align-items:center;" +
      "justify-content: center;" +
      "left:0;" +
      "top:0;" +
      "opacity: .3;" +
      "position: absolute;" +
      "background-color:red;";

    sofreu.setAttributeNode(att1);
    sofreu.setAttributeNode(att2);
    document.body.appendChild(sofreu);

    setTimeout(() => {
      document.body.removeChild(sofreu);
    }, tempo);

    if (vida == 0) {
      setTimeout(() => {
        reinicia();
        window.scrollTo(0, document.body.scrollHeight);
        apagarMonstros();
        location.reload();
      }, 2000);
    }
  }
}

function teclaDw() {
  var tecla = event.keyCode;
  pjx = jog.offsetLeft;
  if (pjx > 0 && pjx < tamTelaW - 40) {
    if (localNave <= 2) {
      if (tecla == 65) {
        atira(pjx + 17, pjy);
      } else if (tecla == 37) {
        dirxJ = -1;
        // ESQUERDAaaaaa
      } else if (tecla == 39) {
        dirxJ = 1;
        // DIREITA
      }
    }
    pjx += dirxJ * velJ;
    jog.style.left = pjx + "px";
  } else {
    if (pjx < 10) {
      pjx = 5;
      jog.style.left = pjx + "px";
    } else if (pjx > tamTelaW - 45) {
      pjx = tamTelaW - 45;
      jog.style.left = pjx + "px";
    }
  }
}

function teclaUp() {
  var tecla = event.keyCode;
  if (tecla == 39) {
    dirxJ = 0;
  } else if (tecla == 37) {
    dirxJ = 0;
  }
}

function criaBomba() {
  //telaMsg.style.backgroundImage = "url('../img/vitoria.jpg')";
  if (jogo && qtdBombas < 10) {
    var y = 0;
    var x = Math.random() * tamTelaW - 24;
    console.log(tamTelaW - 24);
    if (x < 24) {
      x += 48;
    } else if (x >= tamTelaW - 48) {
      x -= 72;
    }
    //x = tamTelaW-72;
    var bomba = document.createElement("div");
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    att1.value = "bomba";
    att2.value =
      "top:" +
      y +
      "px; left:" +
      x +
      "px;background-image: url('../../img/et1.png');";
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
      // 1 esquerda 3 direita
      mov = Math.floor(Math.random() * 1);

      if (mov == 1) {
        if (px - 72 <= 0) {
          px += 50;
        } else if (px + 72 >= tamTelaW) {
          px -= 50;
        } else {
          mov = Math.floor(Math.random() * 2);
          if (mov == 1) {
            px += 50;
          } else {
            px -= 50;
          }
        }
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

function apagarMonstros() {
  bombasTotal = document.getElementsByClassName("bomba");
  var tam = bombasTotal.length;
  for (var i = 0; i < tam; i++) {
    if (bombasTotal[i]) {
      bombasTotal[i].remove();
    }
  }
}

function atira(x, y) {
  if (qtdTiros <= 10) {
    var t = document.createElement("div");
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    att1.value = "tiroJog";
    att2.value = "top:" + y + "px; left:" + x + "px; background-color:gray;";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t);
    qtdTiros++;
  }
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
        qtdTiros--;
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
        criaExplossao(bombasTotal[i].offsetLeft - 25, bombasTotal[i].offsetTop);
        bombasTotal[i].remove();
        tiro.remove();
      }
    }
  }
}

function colisaoNaveBomba() {
  var tam = bombasTotal.length;
  for (var i = 0; i < tam; i++) {
    if (bombasTotal[i]) {
      if (
        jog.offsetTop <= bombasTotal[i].offsetTop + 40 && //cima tiro com baixo bomba
        jog.offsetTop + 55 >= bombasTotal[i].offsetTop && //baixo tiro com cima bomba
        jog.offsetLeft <= bombasTotal[i].offsetLeft + 24 && //esquerda tiro com direita bomba
        //jog.offsetLeft <= bombasTotal[i].offsetLeft + 45 &&
        jog.offsetLeft + 55 >= bombasTotal[i].offsetLeft //direita tiro com esquerda bomba
      ) {
        criaExplossao(bombasTotal[i].offsetLeft - 25, bombasTotal[i].offsetTop);
        bombasTotal[i].remove();
        vida--;
        quantidadeVida(vida);
      }
    }
  }
}

function criaExplossao(x, y) {
  //tipo 1=AR, 2=TERRA

  if (document.getElementById("explosao" + (ie - 5))) {
    document.getElementById("explosao" + (ie - 5)).remove();
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

  att1.value = "explosaoAr";
  att2.value = "top:" + y + "px;left:" + x + "px;";
  att3.value = "explosao" + ie;
  att4.value = "../img/explosao_ar.gif?" + new Date();

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

  ie++;
  isom++;
  qtdBombas--;
}

function gerenciaGame() {
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
    //controlaJogador();
    controleTiros();
    verificaPassagemBomba();
    colisaoNaveBomba();
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

  clearInterval(tmpCriaBomba);
  clearInterval(tmpcontrolaBomba);
  cancelAnimationFrame(frames);
  vidaPlaneta = 300;
  pjx = tamTelaW / 2;
  pjy = tamTelaH - 95;
  //jog.style.top = pjy + "px";
  //jog.style.left = pjx + "px";
  contBombas = 150;
  qtdBombas = 0;
  vida = 5;
  qtdTiros = 0;
  jogo = true;
  tmpCriaBomba = setInterval(criaBomba, 500);
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

  //jog.style.top = pjy + "px";
  // jog.style.left = "50%";

  //controle de bombas
  qtdBombas = 0;
  qtdTiros = 0;
  contBombas = 150;
  velB = 3;

  //controles do planeta

  //controle explsao
  ie = 0;
  isom = 0;
  vida = 5;
  //telas
  telaMsg = document.getElementById("telaMsg");
  reinicia();
  //telaMsg.style.display = "block";
  //document.getElementById("btnJogar").addEventListener("click", reinicia);
}

window.addEventListener("load", () => {
  window.scrollTo(0, document.body.scrollHeight);
});
document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);

window.addEventListener("scroll", function () {
  let doc = document.documentElement;

  let value = parseInt(
    (100 * doc.scrollTop) / (doc.scrollHeight - doc.clientHeight)
  );
  localNave = value;
  if (value <= 10) {
    const title = document.title;
    if (title === "Nave-Game") {
      inicia();
    }
  } else if (value >= 40) {
    apagarMonstros();
  }
});
