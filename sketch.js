var rocket, rocketImage
var star, starGroup, starImage
var asteroid, asteroidGroup, asteroidImage
var bg, backgroundImage
var fireball, fireballImage, fireballGroup
var score = 0
var lives = 3
var gameState = PLAY
var PLAY = 1, END = 0

function preload() {
    backgroundImage = loadImage("images/background.png")
    rocketImage = loadImage("images/rocket.png")
    starImage = loadImage("images/star.png")
    fireballImage = loadImage("images/fireball.png")
    asteroidImage = loadImage("images/asteroids.png")

}
function setup() {
    createCanvas(800, 600)
    bg = createSprite(400, 300)
    bg.addImage(backgroundImage)
    bg.scale = 1
    bg.velocityY = 2

    rocket = createSprite(100, 300)
    rocket.addImage(rocketImage)
    rocket.scale = 0.7

    starGroup = new Group()
    asteroidGroup = new Group()
    fireballGroup = new Group()
}




function draw() {
    background("black")

    if (gameState === PLAY) {
        if (bg.y > 500) {
            bg.y = 300
        }
        if (keyDown("space")) {
            fireball = createSprite(200, 300)
            fireball.addImage(fireballImage)
            fireball.scale = 0.1
            fireball.velocityX = 8
            fireballGroup.add(fireball)
        }

        if (keyDown("up")) {
            rocket.y += -3
        }

        if (keyDown("down")) {
            rocket.y += 3
        }

        for (var i = 0; i < starGroup.length; i++) {
            if (fireballGroup.isTouching(starGroup)) {
                starGroup.get(i).destroy()
                score += 5
            }
        }
        for (var i = 0; i < asteroidGroup.length; i++) {
            if (fireballGroup.isTouching(asteroidGroup)) {
                asteroidGroup.get(i).destroy()
                lives -= 1
            }
        }


        spawnStars()
        spawnAsteroids()
        if (lives === 0) {
            gameState = END
        }
    }
    drawSprites()
    fill("white")
    textSize(20)
    text("Score:" + score, 10, 50)
    text("Lives:" + lives, 100, 50)



    if (gameState === END) {
        text("Game Ended", 400, 300)
    }
}


function spawnStars() {
    if (frameCount % 100 === 0) {
        star = createSprite(700, -50)
        star.x = random(300, 700)
        star.addImage(starImage)
        star.scale = 0.4
        star.velocityY = 4
        starGroup.add(star)
        star.lifetime = 200
    }
}

function spawnAsteroids() {
    if (frameCount % 200 === 0) {
        asteroid = createSprite(700, -50)
        asteroid.x = random(300, 700)
        asteroid.addImage(asteroidImage)
        asteroid.scale = 0.1
        asteroid.velocityY = 4
        asteroidGroup.add(asteroid)
        asteroid.lifetime = 200
    }
}

