// https://www.youtube.com/watch?v=MCVU0w73uKI
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth - 3;
canvas.height = window.innerHeight - 3;

class Player {
    constructor() {

        this.velocity = {
            x: 0,
            y: 0
        }
        this.rotation = 0

        const image = new Image()
        image.src = './assets/images/ship.png'
        image.onload = () => {
            const scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.save()
        c.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
        )
        c.rotate(this.rotation)

        c.translate(
            -player.position.x - player.width / 2,
            -player.position.y - player.height / 2
        )

        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        c.restore()

    }
    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}

class Projectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity

        this.radius = 3
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Invader {
    constructor({ position }) {

        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = './assets/images/invader.png'
        image.onload = () => {
            const scale = 1
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }

    draw() {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

    }
    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
}

class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }
        this.velocity = {
            x: 0,
            y: 0
        }
 //////ERRRRRRRRRRRROOOOOOOOORRRRRR
        this.invaders = []
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                this.invaders.push(new Invader({
                    position: {
                        x: x * 40,
                        y: y * 40
                    }
                }))
            }
        }
    }
    update() {

    }
}
const player = new Player()
let projectiles = []
const grids = [new Grid]
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()

    projectiles.forEach((projectile, index) => {

        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)

        } else {
            projectile.update()
        }

    })

    grids.forEach(grid => {
        grid.update()
        grid.invaders.forEach(invader => {
            invader.update()
        })
    })


    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -7
        player.rotation = -0.15
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
        player.rotation = 0.15
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }
}

animate()

window.addEventListener('keydown', ({ key }) => {

    switch (key) {
        case 'q':

            keys.a.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
        case ' ':
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            })
            )
            break
    }

})

window.addEventListener('keyup', ({ key }) => {

    switch (key) {
        case 'q':

            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case ' ':

            break
    }

})





































// window.addEventListener('resize', () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     init();
// });

// let arrCircle = [];

// function init() {

//     arrCircle = [];

//     let space = window.innerWidth / 15;
//     let a = space;
//     console.log(space)

//     for (i = 0; i < 10; i++) {
//         let radius = 30;
//         let x = space;
//         let y = 200;
//         let dx = 4; // velocité
//         let dy = (Math.random() - 0.5);

//         arrCircle.push(new Circle(x, y, dx, dy, radius));

//         space += a;
//     }

// }

// function Circle(x, y, dx, dy, radius) {
//     this.x = x;
//     this.y = y;
//     this.dx = dx;
//     this.dy = dy;
//     this.radius = radius;

//     this.draw = function () {
//         c.beginPath();
//         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//         c.strokeStyle = 'red';
//         c.stroke();
//     }

//     this.update = function () {

//         if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {

//             this.dx = -this.dx;
//         }
//         // if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
//         //     this.dy = -this.dy;
//         // }

//         this.x += this.dx;
//         // this.y += this.dy;

//         this.draw();
//     }

// }

// let bottom = window.innerHeight - 4;

// let x = 0;

// class Canon {
//     draw() {
//         // canon
//         c.beginPath();
//         c.lineTo(x, bottom);
//         c.lineTo(x + 100, bottom);
//         c.lineTo(x + 100, bottom - 50);
//         c.lineTo(x + 60, bottom - 50);
//         c.lineTo(x + 60, bottom - 70);
//         c.lineTo(x + 40, bottom - 70);
//         c.lineTo(x + 40, bottom - 50);
//         c.lineTo(x, bottom - 50);
//         c.lineTo(x, bottom);
//         c.fillStyle = 'blue';
//         c.fill();
//         c.strokeStyle = "blue";
//         c.stroke();
//     }
// }

// let canon = new Canon;


// let move = 0;


// function animate() {
//     requestAnimationFrame(animate); // boucle de fonction
//     c.clearRect(0, 0, innerWidth, innerHeight); // clear le canvas a chaque appel
//     canon.draw();
//     for (i = 0; i < arrCircle.length; i++) {
//         arrCircle[i].update();
//     }
// }

// function moveCanon() {
//     window.addEventListener('keydown', (event) => {
//         if (event.keyCode == "37") {
//             if (move > 0) {
//                 animate();
//                 move -= 5;
//             }

//         }
//         if (event.keyCode == "39") {
//             if (move < window.innerWidth - 105) {
//                 animate();
//                 move += 5;
//             }

//         }
//     });
// }

// init();
// animate();
// moveCanon();
