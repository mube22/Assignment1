var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    if (frame > 9) {
        frame = 18 - frame;
    }
    xindex = frame % 5;
    yindex = Math.floor(frame / 5);

    console.log(frame + " " + xindex + " " + yindex);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth,
                 this.frameHeight);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "Grey";
    ctx.fillRect(0,600,800, 200);
    Entity.prototype.draw.call(this);
}

function MushroomDude(game, spritesheet) {
    this.animation = new Animation(spritesheet, 110, 110, 0.05, 18, true, false);
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.ctx = game.ctx;
}

MushroomDude.prototype.draw = function () {
//    console.log("drawing");
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

MushroomDude.prototype.update = function() {


    if(this.y <= 700 && this.x < 400){
         this.y += 1;
         this.x += 1;
    }else if(this.x < 695 && this.x >= 400) {
        this.x += 1;
        this.y -= 1;
    } else {
        this.x -= 1    
    }
//      
//     switch(this.game.keyCode) {
//         case 37:
//             // left key pressed
//             this.x -= 2;
//             break;
//         case 38:
//             // up key pressed
//             this.y -= 2;
//             break;
//         case 39:
//             // right key pressed
//             this.x += 2;
//             break;
//         case 40:
//             // down key pressed
//             this.y += 2;
//             break;  
//     }   
// }
   
}


AM.queueDownload("./img/RobotUnicorn.png");
//AM.queueDownload("./img/guy.png");
AM.queueDownload("./img/mushroomdude.png");
AM.queueDownload("./img/runningcat.png");
//AM.queueDownload("./img/notthere.png");
AM.queueDownload("./img/mube.png");
AM.queueDownload("./img/bird.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

//    var img = AM.getAsset("./img/mushroomdude.png");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new MushroomDude(gameEngine, AM.getAsset("./img/bird.png")));

    var bg = new Background(gameEngine);
    //var unicorn = new Unicorn(gameEngine);

    gameEngine.addEntity(bg);

    console.log("All Done!");
});