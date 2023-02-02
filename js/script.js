var diryJ, dirxJ, jog, velJ, pjx, pjy;
var nave_mae,
  tmpControlaNaveMae,
  pos,
  posicao = 1;
var velT;
var tamTelaW, tamTelaH;
var jogo;
var frames;
var localNave;
var contBombas,
  painelContBombas,
  velB,
  tmpCriaMonstros,
  tmpcontrolaBomba,
  qtdBombas;
var bombasTotal;
var vida, vidaNaveMae;
var ie, isom;
var telaMsg;

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

function quantidadeVidaNaveMae(vidaNaveMae) {
  let tempo = 400;
  if (vidaNaveMae > 0) {
    var qv = document.getElementById("qtdVidas-nave");
    qv.innerText = vidaNaveMae;
  }

  if (vidaNaveMae == 0) {
    var sofreu = document.createElement("div");

    if (vidaNaveMae == 0) {
      const texto = document.createTextNode("PARABENS");
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
      "background-color:blue;";

    sofreu.setAttributeNode(att1);
    sofreu.setAttributeNode(att2);
    document.body.appendChild(sofreu);

    setTimeout(() => {
      document.body.removeChild(sofreu);
    }, tempo);

    if (vidaNaveMae == 0) {
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
      if (tecla == 37) {
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
  } else if (tecla == 65) {
    atira(pjx + 17, pjy);
  }
}

function criaMonstros() {
  //telaMsg.style.backgroundImage = "url('../img/vitoria.jpg')";

  nave_mae = document.getElementById("qtd-vidas-nave");
  var tamanho_nave_mae = nave_mae.getBoundingClientRect().bottom;

  if (tamanho_nave_mae > 0) {
    const naveInimiga = document.getElementById("qtd-vidas-nave");
    if (jogo && qtdBombas < 10) {
      var x = naveInimiga.offsetLeft + 40;
      /*
    var x = Math.random() * tamTelaW - 24;
    console.log(tamTelaW - 24);
    if (x < 24) {
      x += 48;
    } else if (x >= tamTelaW - 48) {
      x -= 72;
    }
    //x = tamTelaW-72;
    */
      var y = 60;

      var et = document.createElement("div");
      var att1 = document.createAttribute("class");
      var att2 = document.createAttribute("style");
      att1.value = "bomba";
      att2.value =
        "top:" +
        y +
        "px; left:" +
        x +
        "px;background-image: url('../../img/nave-filha.png');";
      et.setAttributeNode(att1);
      et.setAttributeNode(att2);
      document.body.appendChild(et);
      contBombas--;
      qtdBombas++;
    }
  }
}

function criaNaveMae() {
  //telaMsg.style.backgroundImage = "url('../img/vitoria.jpg')";

  var dnm = document.getElementById("qtd-vidas-nave");

  if (jogo) {
    var nave_mae = document.createElement("div");
    var att1 = document.createAttribute("id");
    var att2 = document.createAttribute("style");
    att1.value = "nave_mae";
    att2.value =
      "width: 100%;" +
      "height: 100%;" +
      "background-image: url('../../img/nave-mae.png');";
    nave_mae.setAttributeNode(att1);
    nave_mae.setAttributeNode(att2);
    dnm.appendChild(nave_mae);
    contBombas--;
    qtdBombas++;
  }
}

function destroiNaveMae() {
  //telaMsg.style.backgroundImage = "url('../img/vitoria.jpg')";

  if (jogo) {
    nave_mae = document.getElementById("nave_mae");
    if (nave_mae) {
      nave_mae.remove();
    }
  }
}

function controlaNaveMae() {
  nave_mae = document.getElementById("qtd-vidas-nave");

  pos = nave_mae.offsetLeft;

  if (pos <= tamTelaW - 100 && posicao == 1) {
    pos += 5;
    nave_mae.style.left = pos + "px";
    if (pos >= tamTelaW - 100) {
      posicao = 2;
    }
  } else if (pos >= 0 && posicao == 2) {
    pos -= 5;
    nave_mae.style.left = pos + "px";
    if (pos <= 0) {
      posicao = 1;
    }
  }
}

function controlaBomba() {
  bombasTotal = document.getElementsByClassName("bomba");
  var tam = bombasTotal.length;
  for (var i = 0; i < tam; i++) {
    if (bombasTotal[i]) {
      var py = bombasTotal[i].offsetTop;
      py += 6;
      bombasTotal[i].style.top = py + "px";
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
  var t = document.createElement("div");
  var att1 = document.createAttribute("class");
  var att2 = document.createAttribute("style");
  att1.value = "tiroJog";
  att2.value = "top:" + y + "px; left:" + x + "px; background-color:gray;";
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
      colisaoTiroNaveMae(tiros[i]);
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

function colisaoTiroNaveMae(tiro) {
  nave_mae = document.getElementById("qtd-vidas-nave");
  if (nave_mae) {
    if (
      tiro.offsetTop <= nave_mae.offsetTop + 100 && //cima tiro com baixo bomba
      tiro.offsetTop + 6 >= nave_mae.offsetTop && //baixo tiro com cima bomba
      tiro.offsetLeft <= nave_mae.offsetLeft + 70 && //esquerda tiro com direita bomba
      tiro.offsetLeft + 6 >= nave_mae.offsetLeft //direita tiro com esquerda bomba
    ) {
      criaExplossao(nave_mae.offsetLeft - 25, nave_mae.offsetTop);
      vidaNaveMae--;
      quantidadeVidaNaveMae(vidaNaveMae);
      tiro.remove();
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
    clearInterval(tmpCriaMonstros);
    //telaMsg.style.backgroundImage = "url('../img/vitoria.jpg')";
    //telaMsg.style.display = "block";
  }
  if (vidaPlaneta <= 0) {
    jogo = false;
    clearInterval(tmpCriaMonstros);

    // telaMsg.style.display = "block";
    //telaMsg.style.backgroundImage = "url('./img/derrota.jpg')";
  }
}

function gameLoop() {
  if (jogo) {
    //funcoes de controle
    //controlaJogador();
    controleTiros();
    verificaPassagemBomba();
    colisaoNaveBomba();
    controlaBomba();
    //controlaNaveMae();
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
  destroiNaveMae();
  criaNaveMae();
  clearInterval(tmpCriaMonstros);
  clearInterval(tmpControlaNaveMae);
  clearInterval(tmpcontrolaBomba);
  cancelAnimationFrame(frames);
  vidaPlaneta = 300;
  pjx = tamTelaW / 2;
  pjy = tamTelaH - 95;
  //jog.style.top = pjy + "px";
  //jog.style.left = pjx + "px";
  contBombas = 150;
  qtdBombas = 0;
  vida = 3;
  vidaNaveMae = 10;
  qtdTiros = 0;
  jogo = true;
  tmpCriaMonstros = setInterval(criaMonstros, 500);
  tmpControlaNaveMae = setInterval(controlaNaveMae, 15);
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
  jog = document.getElementById("barraVida");

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
  vida = 3;
  vidaNaveMae = 10;
  //telas
  telaMsg = document.getElementById("telaMsg");

  reinicia();
  //telaMsg.style.display = "block";
  //document.getElementById("btnJogar").addEventListener("click", reinicia);
}

function conflito() {
  alert(tamanho_nave_mae.bottom);
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
  if (localNave <= 5) {
    const title = document.title;
    if (title === "Nave-Game") {
      inicia();
    }
  } else {
    apagarMonstros();
    destroiNaveMae();
  }
});
