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
  var maxHp;
  var maxHpZombie = 200;

  var playGame = false;
  var score;
  var bullets;
  var zombie, zombieGreen;
  var player;
  var bossSpawn;

  var Player = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var imgBullet = new Image();
  imgBullet.src = "src/1-fire-gun.png";

  var imgHero = new Image();
  var imgZombie = new Image();
  var imgZombieGreen = new Image();

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

  //Button
  var btnMulai = $("#btnMulai");
  var btnInfo = $("#btnInfo");
  var btnExit = $("#btnExit");
  var btnBack = $("#btnBack");
  var btnStart = $("#btnStart");
  var btnHome = $("#btnHome");

  //Stat Value
  var valueScore = $("#valueScore");

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

  function draw_bullet(x, y) {
    context.drawImage(imgBullet, x, y, 50, 50);
  }

  function init() {
    guiMenu();
  }
  init();

  function gameStart() {
    if (!playGame) {
      playGame = true;
    }

    valueScore.html("0");
    score = 0;
    bossSpawn = 0;
    maxHp = 100;
    zombieSpeed = 3;

    bullets = new Array();
    zombie = new Array();
    zombieGreen = new Array();
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

    player = new Player(-50, 510);
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
      if (tmpBullet.y >= canvasHeight) {
        var idxBullet = bullets.indexOf(tmpBullet);
        bullets.splice(idxBullet, 1);
        break;
      }
    }
  }

  function spawnMonster() {
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
          maxHp -= 10;
        }
        break;
      }
      if (tmpZombie.y >= canvasHeight - 120) {
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

    if (bossSpawn > 30) {
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
            maxHp -= 10;
          }
          break;
        }
        if (tmpZombieGreen.y >= canvasHeight - 120) {
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

    if (player.x < 150) {
      player.x = 150;
    } else if (player.x > canvasWidth - 250) {
      player.x = canvasWidth - 250;
    }

    if (player.y < 10) {
      player.y = 10;
    } else if (player.y > canvasHeight - 150) {
      player.y = canvasHeight - 150;
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
    }
  }

  function difficult() {
    if (bossSpawn < 60) {
      bossSpawn++;
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
      bossSpawn = 60;
    }
    setTimeout(difficult, 1000);
  }

  function guiMenu() {
    btnMulai.click(function (e) {
      e.preventDefault();
      uiZone.hide();
      menuZone.hide();
      scoreZone.show();
      gameZone.css("background-image", "url(src/bg/bg2.png)");
      console.log("game mulai");
      gameStart();
    });
    btnInfo.click(function (e) {
      e.preventDefault();
      menuZone.hide();
      infoZone.show();
      console.log("masuk info");
    });
    btnBack.click(function (e) {
      e.preventDefault();
      menuZone.show();
      infoZone.hide();
      console.log("kembali info");
    });
    btnStart.click(function (e) {
      e.preventDefault();
      uiZone.hide();
      gameOver.hide();
      scoreZone.show();
      console.log("Mulai lagi");
      gameStart();
    });
    btnHome.click(function (e) {
      e.preventDefault();
      menuZone.show();
      uiZone.show();
      gameOver.hide();
      scoreZone.hide();
      playGame = false;
      console.log("kembali home");
    });
  }
});