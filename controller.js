$(document).ready(function () {
  var canvas = $("#gameCanvas");
  var context = canvas.get(0).getContext("2d");
  var canvasWidth = canvas.width();
  var canvasHeight = canvas.height();

  var stepX = 8;
  var stepY = 8;
  var zombieSpeed;
  var keySpace = 32;
  var arrowLeft = 37;
  var arrowUp = 38;
  var arrowRight = 39;
  var arrowDown = 40;

  var currentFrame = 0;
  var maxHp = 0;
  var maxHpBoss = 0;

  var playGame = false;
  var score;
  var bullets;
  var zombie, zombieGreen, zombieBoss;
  var player;
  var bossSpawn = 0;

  var Player = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var imgBullet = new Image();
  imgBullet.src = "src/1-fire-gun.png";

  var imgHero = new Image();
  var imgZombie = new Image();
  var imgZombieGreen = new Image();
  var imgZombieBoss = new Image();

  var Bullet = function (x, y) {
    this.x = x;
    this.y = y;
    this.vX = 15;
    this.vY = -15;
  };

  var Zombie = function (x, y) {
    this.x = x;
    this.y = y;
  };

  //GUI
  var gameZone = $("#gameZone");
  var uiZone = $("#uiZone");
  var menuZone = $("#menuZone");
  var infoZone = $("#infoZone");
  var gameOver = $("#gameOver");
  var scoreZone = $("#scoreZone");
  var gameCanvas = $("#gameCanvas");
  var gameWin = $("#gameWin");

  //Button
  var btnMulai = $("#btnMulai");
  var btnInfo = $("#btnInfo");
  var btnExit = $("#btnExit");
  var btnBack = $("#btnBack");
  var btnStart = $(".btnStart");
  var btnHome = $(".btnHome");

  //Stat Value
  var valueScore = $("#valueScore");
  var valueLevel = $("#valueLevel");
  var tabDarah = $("#tabDarah");

  //Sound Game
  var gamebgMusic = $("#gamebgMusic").get(0);
  var gamebgMusic2 = $("#gamebgMusic2").get(0);
  var gameSfxGun = $("#gameSfxGun").get(0);
  var gameSfxZombieRoar = $("#gameSfxZombieRoar").get(0);
  var gameSfxDragonRoar = $("#gameSfxDragonRoar").get(0);
  var gameSfxSelect = $("#gameSfxSelect").get(0);
  var gameSfxWin = $("#gameSfxWin").get(0);
  var gameSfxPrepare = $("#gameSfxPrepare").get(0);
  var gameSfxRound1 = $("#gameSfxRound1").get(0);
  var gameSfxRound2 = $("#gameSfxRound2").get(0);
  var gameSfxRoundFinal = $("#gameSfxRoundFinal").get(0);
  var gameSfxGameOver = $("#gameSfxGameOver").get(0);

  function draw_hero(x, y) {
    if (currentFrame == 3) {
      imgHero.src = "src/hero/survivor-reload_rifle_0.png";
    } else if (currentFrame == 6) {
      imgHero.src = "src/hero/survivor-reload_rifle_2.png";
    } else if (currentFrame == 9) {
      imgHero.src = "src/hero/survivor-reload_rifle_4.png";
    } else if (currentFrame == 12) {
      imgHero.src = "src/hero/survivor-reload_rifle_6.png";
    } else if (currentFrame == 15) {
      imgHero.src = "src/hero/survivor-reload_rifle_8.png";
    } else if (currentFrame == 18) {
      imgHero.src = "src/hero/survivor-reload_rifle_10.png";
    } else if (currentFrame == 21) {
      imgHero.src = "src/hero/survivor-reload_rifle_12.png";
    } else if (currentFrame == 24) {
      imgHero.src = "src/hero/survivor-reload_rifle_14.png";
    } else if (currentFrame == 27) {
      imgHero.src = "src/hero/survivor-reload_rifle_16.png";
    } else if (currentFrame == 30) {
      currentFrame = 0;
    }
    context.drawImage(imgHero, x, y, 100, 100);
  }

  function draw_zombie(x, y) {
    if (currentFrame == 3) {
      imgZombie.src = "src/zombie/skeleton-move_2.png";
    } else if (currentFrame == 6) {
      imgZombie.src = "src/zombie/skeleton-move_4.png";
    } else if (currentFrame == 9) {
      imgZombie.src = "src/zombie/skeleton-move_6.png";
    } else if (currentFrame == 12) {
      imgZombie.src = "src/zombie/skeleton-move_8.png";
    } else if (currentFrame == 15) {
      imgZombie.src = "src/zombie/skeleton-move_10.png";
    } else if (currentFrame == 18) {
      imgZombie.src = "src/zombie/skeleton-move_12.png";
    } else if (currentFrame == 21) {
      imgZombie.src = "src/zombie/skeleton-move_14.png";
    } else if (currentFrame == 24) {
      imgZombie.src = "src/zombie/skeleton-move_16.png";
    } else if (currentFrame == 27) {
      currentFrame = 0;
    }
    context.drawImage(imgZombie, x, y, 100, 100);
  }

  function draw_zombieGreen(x, y) {
    if (currentFrame == 3) {
      imgZombieGreen.src = "src/zombie-green/green-skeleton-attack_0.png";
    } else if (currentFrame == 6) {
      imgZombieGreen.src = "src/zombie-green/green-skeleton-attack_1.png";
    } else if (currentFrame == 9) {
      imgZombieGreen.src = "src/zombie-green/green-skeleton-attack_3.png";
    } else if (currentFrame == 12) {
      imgZombieGreen.src = "src/zombie-green/green-skeleton-attack_4.png";
    } else if (currentFrame == 15) {
      imgZombieGreen.src = "src/zombie-green/green-skeleton-attack_5.png";
    } else if (currentFrame == 18) {
      imgZombieGreen.src = "src/zombie-green/green-skeleton-attack_6.png";
    } else if (currentFrame == 21) {
      imgZombieGreen.src = "src/zombie-green/green-skeleton-attack_7.png";
    } else if (currentFrame == 24) {
      imgZombieGreen.src = "src/zombie-green/green-skeleton-move_2.png";
    } else if (currentFrame == 27) {
      currentFrame = 0;
    }
    context.drawImage(imgZombieGreen, x, y, 100, 100);
  }

  function draw_zombieBoss(x, y) {
    if (currentFrame == 5) {
      imgZombieBoss.src = "src/boss/boss-1.png";
    } else if (currentFrame == 10) {
      imgZombieBoss.src = "src/boss/boss-2.png";
    } else if (currentFrame == 15) {
      imgZombieBoss.src = "src/boss/boss-3.png";
    } else if (currentFrame == 20) {
      imgZombieBoss.src = "src/boss/boss-4.png";
    } else if (currentFrame == 25) {
      currentFrame = 0;
    }
    context.drawImage(imgZombieBoss, x, y, 470, 430);
  }

  function draw_bullet(x, y) {
    context.drawImage(imgBullet, x, y, 50, 50);
  }

  function init() {
    gamebgMusic.play();
    guiMenu();
  }
  init();

  function gameStart() {
    if (!playGame) {
      playGame = true;
    }
    gameSfxPrepare.play();
    gamebgMusic.pause();
    gamebgMusic2.play();
    valueScore.html("0");

    score = 0;
    level = 0;
    bossSpawn = 0;
    maxHp = 80;
    maxHpBoss = 100;
    zombieSpeed = 3;

    bullets = new Array();
    zombie = new Array();
    zombieGreen = new Array();
    zombieBoss = new Array();
    numZombie = 3;

    for (var i = 0; i < 3; i++) {
      var x = Math.floor(
        Math.random() * (Math.random() * Math.random() + 260) + 150
      );
      var y =
        Math.floor(Math.random() * (Math.random() * Math.random() - 200)) - 50;
      zombie.push(new Zombie(x, y));
    }
    zombieGreen.push(new Zombie(300, -100));
    zombieBoss.push(new Zombie(180, -500));

    player = new Player(350, 500);
    $(window).keydown(function (e) {
      var keyCode = e.keyCode;
      if (keyCode == arrowRight) {
        player.moveRight = true;
      } else if (keyCode == arrowUp) {
        player.moveUp = true;
      } else if (keyCode == arrowDown) {
        player.moveDown = true;
      } else if (keyCode == arrowLeft) {
        player.moveLeft = true;
      }
    });
    $(window).keyup(function (e) {
      var keyCode = e.keyCode;
      if (keyCode == arrowRight) {
        player.moveRight = false;
      } else if (keyCode == arrowUp) {
        player.moveUp = false;
      } else if (keyCode == arrowDown) {
        player.moveDown = false;
      } else if (keyCode == arrowLeft) {
        player.moveLeft = false;
      } else if (keyCode == keySpace) {
        bullets.push(new Bullet(player.x + 45, player.y - 40));
      }
    });

    difficult();
    resetCanvas();
  }

  function resetCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    darahBar();
    spawnHero();
    moveHero();
    spawnMonster();
    spawnTembakan();
    gameDie();

    if (playGame) {
      setTimeout(resetCanvas, 35);
    }
  }

  function spawnTembakan() {
    var bulletsLength = bullets.length;
    for (var i = 0; i < bulletsLength; i++) {
      var tmpBullet = bullets[i];
      draw_bullet(tmpBullet.x, tmpBullet.y);
      tmpBullet.y += tmpBullet.vY;
      gameSfxGun.play();
      if (tmpBullet.y <= 10) {
        var idxBullet = bullets.indexOf(tmpBullet);
        bullets.splice(idxBullet, 1);
        gameSfxGun.pause();
        break;
      }
    }
  }

  function spawnMonster() {
    gameSfxZombieRoar.play();
    if (bossSpawn > 0) {
      valueLevel.html("LEVEL 1");
      var zombieLength = zombie.length;
      for (var i = zombieLength - 1; i > -1; i--) {
        var tmpZombie = zombie[i];
        draw_zombie(tmpZombie.x, tmpZombie.y);
        zombie[i].y = zombie[i].y + (zombieSpeed - 1);
        var bulletsLength = bullets.length;
        for (var j = bulletsLength - 1; j > -1; j--) {
          var tmpBullet = bullets[j];
          if (
            tmpZombie.x + 80 >= tmpBullet.x &&
            tmpZombie.x + 0 < tmpBullet.x + 20 &&
            tmpZombie.y + 50 >= tmpBullet.y &&
            tmpZombie.y + 0 < tmpBullet.y + 50
          ) {
            var idxZombie = zombie.indexOf(tmpZombie);
            var idxBullet = bullets.indexOf(tmpBullet);
            zombie.splice(idxZombie, 1);
            bullets.splice(idxBullet, 1);
            valueScore.html((score += 2));
            break;
          }
        }
        if (
          tmpZombie.x + 50 >= player.x &&
          tmpZombie.x + 0 < player.x + 50 &&
          tmpZombie.y + 50 >= player.y &&
          tmpZombie.y + 0 < player.y + 50
        ) {
          var idxZombie = zombie.indexOf(tmpZombie);
          zombie.splice(idxZombie, 1);
          if (maxHp > 0) {
            maxHp -= 20;
          }
          break;
        }
        if (tmpZombie.y >= canvasHeight - 50) {
          var idxZombie = zombie.indexOf(tmpZombie);
          zombie.splice(idxZombie, 1);
          break;
        }
        while (zombie.length < numZombie) {
          var x = Math.floor(
            Math.random() * (Math.random() * Math.random() + 260) + 150
          );
          var y =
            Math.floor(Math.random() * (Math.random() * Math.random() - 260)) -
            50;
          var x1 = Math.floor(
            Math.random() * (Math.random() * Math.random() + 260) + 300
          );
          var y1 =
            Math.floor(Math.random() * (Math.random() * Math.random() - 260)) -
            50;
          zombie.push(new Zombie(x1, y1));
          zombie.push(new Zombie(x, y));
        }
      }
    }

    if (bossSpawn > 30) {
      valueLevel.html("LEVEL 2");
      var zombieLength2 = zombieGreen.length;
      for (var i = zombieLength2 - 1; i > -1; i--) {
        var tmpZombieGreen = zombieGreen[i];
        draw_zombieGreen(tmpZombieGreen.x, tmpZombieGreen.y);
        zombieGreen[i].y = zombieGreen[i].y + zombieSpeed;
        var zombieLength2 = bullets.length;
        for (var j = zombieLength2 - 1; j > -1; j--) {
          var tmpBullet = bullets[j];
          if (
            tmpZombieGreen.x + 80 >= tmpBullet.x &&
            tmpZombieGreen.x + 0 < tmpBullet.x + 20 &&
            tmpZombieGreen.y + 50 >= tmpBullet.y &&
            tmpZombieGreen.y + 0 < tmpBullet.y + 50
          ) {
            var idxZombie = zombieGreen.indexOf(tmpZombieGreen);
            var idxBullet = bullets.indexOf(tmpBullet);
            zombieGreen.splice(idxZombie, 1);
            bullets.splice(idxBullet, 1);
            valueScore.html((score += 2));
            break;
          }
        }
        if (
          tmpZombieGreen.x + 50 >= player.x &&
          tmpZombieGreen.x + 0 < player.x + 50 &&
          tmpZombieGreen.y + 50 >= player.y &&
          tmpZombieGreen.y + 0 < player.y + 50
        ) {
          var idxZombie = zombieGreen.indexOf(tmpZombieGreen);
          zombieGreen.splice(idxZombie, 1);
          if (maxHp > 0) {
            maxHp -= 20;
          }
          break;
        }
        if (tmpZombieGreen.y >= canvasHeight - 50) {
          var idxZombie = zombieGreen.indexOf(tmpZombieGreen);
          zombieGreen.splice(idxZombie, 1);
          break;
        }
        while (zombieGreen.length < 3) {
          var x = Math.floor(
            Math.random() * (Math.random() * Math.random() + 260) + 250
          );
          var y =
            Math.floor(Math.random() * (Math.random() * Math.random() - 260)) -
            50;
          zombieGreen.push(new Zombie(x, y));
        }
      }
    }

    if (bossSpawn >= 60) {
      gameSfxZombieRoar.pause();
      gameSfxDragonRoar.play();
      valueLevel.html("RAAJJAAA MOONSTEER!!!");
      zombie.splice(zombie);
      zombieGreen.splice(zombieGreen);
      var zombieLength3 = zombieBoss.length;
      for (var i = zombieLength3 - 1; i > -1; i--) {
        var tmpZombieBoss = zombieBoss[i];
        draw_zombieBoss(tmpZombieBoss.x, tmpZombieBoss.y);
        zombieBoss[i].y = zombieBoss[i].y + 0.5;
        var zombieLength3 = bullets.length;
        for (var j = zombieLength3 - 1; j > -1; j--) {
          var tmpBullet = bullets[j];
          if (
            tmpZombieBoss.x + 350 >= tmpBullet.x &&
            tmpZombieBoss.x + 0 < tmpBullet.x + 20 &&
            tmpZombieBoss.y + 250 >= tmpBullet.y &&
            tmpZombieBoss.y + 0 < tmpBullet.y + 50
          ) {
            var idxZombie = zombieBoss.indexOf(tmpZombieBoss);
            var idxBullet = bullets.indexOf(tmpBullet);
            bullets.splice(idxBullet, 1);
            maxHpBoss -= 10;
            break;
          }
        }
        if (
          tmpZombieBoss.x + 350 >= player.x &&
          tmpZombieBoss.x + 0 < player.x + 50 &&
          tmpZombieBoss.y + 250 >= player.y &&
          tmpZombieBoss.y + 0 < player.y + 50
        ) {
          var idxZombie = zombieBoss.indexOf(tmpZombieBoss);
          zombieBoss.splice(idxZombie, 1);
          playGame = false;
          uiZone.show();
          gameOver.show();
          gameSfxGameOver.play();
          gameSfxDragonRoar.pause();
          gamebgMusic2.pause();
          gamebgMusic.play();
          break;
        }
        if (maxHpBoss <= 0) {
          zombieBoss.splice(zombieBoss);
          valueScore.html((score += 100));
          playGame = false;
          uiZone.show();
          gameWin.show();
          gameSfxWin.play();
          gameSfxDragonRoar.pause();
          gamebgMusic2.pause();
          gamebgMusic.play();
          break;
        }
      }
    }
  }

  function moveHero() {
    if (player.moveUp) {
      player.y = player.y - stepY;
    }
    if (player.moveDown) {
      player.y = player.y + stepY;
    }

    if (player.moveLeft) {
      player.x = player.x - stepX;
    }
    if (player.moveRight) {
      player.x = player.x + stepX;
    }

    if (player.x < 140) {
      player.x = 140;
    } else if (player.x > canvasWidth - 250) {
      player.x = canvasWidth - 250;
    }

    if (player.y < 10) {
      player.y = 10;
    } else if (player.y > canvasHeight - 100) {
      player.y = canvasHeight - 100;
    }
  }

  function spawnHero() {
    currentFrame++;
    draw_hero(player.x, player.y);
  }

  function gameDie() {
    if (maxHp <= 0) {
      playGame = false;
      uiZone.show();
      gameOver.show();
      gameSfxGameOver.play();
      gamebgMusic2.pause();
      gamebgMusic.play();
    }
  }

  function difficult() {
    if (bossSpawn < 100) {
      bossSpawn++;
      if (bossSpawn > 2) {
        gameSfxRound1.play();
      }
      if (bossSpawn > 4) {
        gameSfxRound1.pause();
      }
      if (bossSpawn > 32) {
        gameSfxRound2.play();
      }
      if (bossSpawn > 34) {
        gameSfxRound2.pause();
      }
      if (bossSpawn > 62) {
        gameSfxRoundFinal.play();
      }
      if (bossSpawn > 66) {
        gameSfxRoundFinal.pause();
      }
      if (bossSpawn > 10) {
        zombieSpeed = 4;
      }
      if (bossSpawn > 20) {
        zombieSpeed = 5;
      }
      if (bossSpawn > 30) {
        zombieSpeed = 6;
      }
      if (bossSpawn > 40) {
        zombieSpeed = 7;
      }
      if (bossSpawn > 50) {
        zombieSpeed = 8;
      }
      if (bossSpawn > 60) {
        zombieSpeed = 9;
      }
    } else {
      zombieSpeed = 10;
      bossSpawn = 100;
    }
    setTimeout(difficult, 1000);
  }

  function darahBar() {
    if (maxHp == 80) {
      tabDarah.css("background-image", "url(src/darah-bar/heath-bar-1.png)");
    } else if (maxHp == 60) {
      tabDarah.css("background-image", "url(src/darah-bar/heath-bar-2.png)");
    } else if (maxHp == 40) {
      tabDarah.css("background-image", "url(src/darah-bar/heath-bar-3.png)");
    } else if (maxHp == 20) {
      tabDarah.css("background-image", "url(src/darah-bar/heath-bar-4.png)");
    } else if (maxHp == 0) {
      tabDarah.css("background-image", "url(src/darah-bar/heath-bar-5.png)");
    }
  }

  function guiMenu() {
    btnMulai.click(function (e) {
      e.preventDefault();
      gameSfxSelect.play();
      uiZone.hide();
      menuZone.hide();
      scoreZone.show();
      gameZone.css("background-image", "url(src/bg/bg2.png)");
      console.log("game mulai");
      gameStart();
    });
    btnInfo.click(function (e) {
      e.preventDefault();
      gameSfxSelect.play();
      menuZone.hide();
      infoZone.show();
      console.log("masuk info");
    });
    btnBack.click(function (e) {
      e.preventDefault();
      gameSfxSelect.play();
      menuZone.show();
      infoZone.hide();
      console.log("kembali info");
    });
    btnStart.click(function (e) {
      e.preventDefault();
      gameSfxSelect.play();
      uiZone.hide();
      gameOver.hide();
      gameWin.hide();
      scoreZone.show();
      console.log("Mulai lagi");
      gameStart();
    });
    btnHome.click(function (e) {
      e.preventDefault();
      gameSfxSelect.play();
      menuZone.show();
      uiZone.show();
      gameOver.hide();
      gameWin.hide();
      scoreZone.hide();
      playGame = false;
      console.log("kembali home");
    });
  }
});
