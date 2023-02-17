var diryJ, dirxJ, jog, velJ, pjx, pjy;
var nave_mae,
  tmpControlaNaveMae,
  pos,
  posicao = 1;
var velT, velocidadeNaveMae;
var tamTelaW, tamTelaH;
var jogo;
var frames;
var localNave;
var tmpCriaEts, tmpcontrolaEts;

var EtsTotal;
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
        apagarEts();
        destroiNaveMae();
        location.reload();
      }, 2000);
    }
  }
}

function quantidadeVidaNaveMae(vidaNaveMae) {
  let tempo = 400;
  if (vidaNaveMae >= 0) {
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
        apagarEts();
        location.reload();
      }, 2000);
    }

    if (vidaNaveMae == 7) {
      velociadeNaveMae--;
    }

    if (vidaNaveMae == 5) {
      velociadeNaveMae--;
    }
    if (vidaNaveMae == 3) {
      velociadeNaveMae--;
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

function teclaUpMobile(tecla) {
  if (tecla == 39) {
    dirxJ = 0;
  } else if (tecla == 37) {
    dirxJ = 0;
  } else if (tecla == 65) {
    atira(pjx + 17, pjy);
  }
}

function teclaDwMobile(tecla) {
  if (tecla) {
    pjx = jog.offsetLeft;
    if (pjx > 0 && pjx < tamTelaW - 40) {
      if (localNave <= 2) {
        if (tecla == 37) {
          dirxJ = -5;
          // ESQUERDAaaaaa
        } else if (tecla == 39) {
          dirxJ = 5;
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
}

function criaEts() {
  nave_mae = document.getElementById("qtd-vidas-nave");
  var tamanho_nave_mae = nave_mae.getBoundingClientRect().bottom;

  if (tamanho_nave_mae > 0) {
    if (jogo) {
      var x = nave_mae.offsetLeft + 40;
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
    }
  }
}

function criaNaveMae() {
  nave_mae = document.getElementById("qtd-vidas-nave");

  if (jogo) {
    var nm = document.createElement("div");
    var att1 = document.createAttribute("id");
    var att2 = document.createAttribute("style");
    att1.value = "nave_mae";
    att2.value =
      "width: 100%;" +
      "height: 100%;" +
      "background-image: url('../../img/nave-mae.png');";
    nm.setAttributeNode(att1);
    nm.setAttributeNode(att2);
    nave_mae.appendChild(nm);
  }
}

function destroiNaveMae() {
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
    pos += velocidadeNaveMae;
    nave_mae.style.left = pos + "px";
    if (pos >= tamTelaW - 100) {
      posicao = 2;
    }
  } else if (pos >= 0 && posicao == 2) {
    pos -= velocidadeNaveMae;
    nave_mae.style.left = pos + "px";
    if (pos <= 0) {
      posicao = 1;
    }
  }
}

function controlaEts() {
  EtsTotal = document.getElementsByClassName("bomba");
  var tam = EtsTotal.length;
  for (var i = 0; i < tam; i++) {
    if (EtsTotal[i]) {
      var py = EtsTotal[i].offsetTop;
      py += 6;
      EtsTotal[i].style.top = py + "px";
    }
  }
}

function verificaPassagemEts() {
  EtsTotal = document.getElementsByClassName("bomba");
  var tam = EtsTotal.length;
  for (var i = 0; i < tam; i++) {
    if (EtsTotal[i]) {
      var py = EtsTotal[i].offsetTop;
      if (py > tamTelaH) {
        EtsTotal[i].remove();
        qtdEts--;
      }
    }
  }
}

function apagarEts() {
  EtsTotal = document.getElementsByClassName("bomba");
  var tam = EtsTotal.length;
  for (var i = 0; i < tam; i++) {
    if (EtsTotal[i]) {
      EtsTotal[i].remove();
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
      colisaoTiroEts(tiros[i]);
      colisaoTiroNaveMae(tiros[i]);
      if (pt < 0) {
        tiros[i].remove();
        qtdTiros--;
      }
    }
  }
}

function colisaoTiroEts(tiro) {
  var tam = EtsTotal.length;
  for (var i = 0; i < tam; i++) {
    if (EtsTotal[i]) {
      if (
        tiro.offsetTop <= EtsTotal[i].offsetTop + 40 && //cima tiro com baixo bomba
        tiro.offsetTop + 6 >= EtsTotal[i].offsetTop && //baixo tiro com cima bomba
        tiro.offsetLeft <= EtsTotal[i].offsetLeft + 24 && //esquerda tiro com direita bomba
        tiro.offsetLeft + 6 >= EtsTotal[i].offsetLeft //direita tiro com esquerda bomba
      ) {
        criaExplossao(EtsTotal[i].offsetLeft - 25, EtsTotal[i].offsetTop);
        EtsTotal[i].remove();
        tiro.remove();
      }
    }
  }
}

function colisaoTiroNaveMae(tiro) {
  nave_mae = document.getElementById("qtd-vidas-nave");
  if (nave_mae.offsetTop != undefined) {
    if (
      tiro.offsetTop <= nave_mae.offsetTop + 70 && //cima tiro com baixo bomba
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

function colisaoNaveEts() {
  var tam = EtsTotal.length;
  for (var i = 0; i < tam; i++) {
    if (EtsTotal[i]) {
      if (
        jog.offsetTop <= EtsTotal[i].offsetTop + 40 && //cima tiro com baixo bomba
        jog.offsetTop + 55 >= EtsTotal[i].offsetTop && //baixo tiro com cima bomba
        jog.offsetLeft <= EtsTotal[i].offsetLeft + 24 && //esquerda tiro com direita bomba
        //jog.offsetLeft <= bombasTotal[i].offsetLeft + 45 &&
        jog.offsetLeft + 55 >= EtsTotal[i].offsetLeft //direita tiro com esquerda bomba
      ) {
        criaExplossao(EtsTotal[i].offsetLeft - 25, EtsTotal[i].offsetTop);
        EtsTotal[i].remove();
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
  qtdEts--;
}

function gameLoop() {
  if (jogo) {
    controleTiros();
    verificaPassagemEts();
    colisaoNaveEts();
    controlaEts();
  }
  frames = requestAnimationFrame(gameLoop);
}

function reinicia() {
  EtsTotal = document.getElementsByClassName("bomba");
  var tam = EtsTotal.length;
  for (var i = 0; i < tam; i++) {
    if (EtsTotal[i]) {
      EtsTotal[i].remove();
    }
  }
  destroiNaveMae();
  criaNaveMae();
  clearInterval(tmpCriaEts);
  clearInterval(tmpControlaNaveMae);
  clearInterval(tmpcontrolaEts);
  cancelAnimationFrame(frames);
  velocidadeNaveMae = 5;
  pjx = tamTelaW / 2;
  pjy = tamTelaH - 95;
  //jog.style.top = pjy + "px";
  //jog.style.left = pjx + "px";

  vida = 3;
  vidaNaveMae = 10;

  jogo = true;
  tmpCriaEts = setInterval(criaEts, 500);
  tmpControlaNaveMae = setInterval(controlaNaveMae, 15);
  tmpcontrolaEts = setInterval(controlaEts, 1000);

  gameLoop();
}

function inicia() {
  velocidadeNaveMae = 5;
  jogo = true;
  tamTelaH = window.innerHeight;
  tamTelaW = window.innerWidth;

  dirxJ = 0;
  pjx = tamTelaW / 2;

  velJ = velT = 5;
  jog = document.getElementById("barraVida");

  qtdEts = 0;
  qtdTiros = 0;
  contEts = 150;
  velB = 3;
  ie = 0;
  isom = 0;
  vida = 3;
  vidaNaveMae = 10;
  //telas
  telaMsg = document.getElementById("telaMsg");

  reinicia();
}

window.addEventListener("load", () => {
  window.scrollTo(0, document.body.scrollHeight);
});

document.getElementById("btn-esquerda").onclick = () => {
  teclaDwMobile(37);
};

document.getElementById("btn-direita").onclick = () => {
  teclaDwMobile(39);
};

document.getElementById("btn-tiro").onclick = () => {
  teclaUpMobile(65);
};

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
    apagarEts();
    destroiNaveMae();
  }
});

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    jogo = false;
  } else {
    jogo = true;
  }
});
