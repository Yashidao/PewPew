let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 40;
let minRadius = 5;

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(event);
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'red';
        c.stroke();
    }

    this.update = function () {

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivité
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }

        } else if (this.radius > minRadius) {
            this.radius -= 1;
        }


        this.draw();
    }

}

let arrCircle = [];

function init() {

    arrCircle = [];

    for (i = 0; i < 100; i++) {
        let radius = 30;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerWidth - radius * 2) + radius;
        let dx = (Math.random() - 0.5); // velocité
        let dy = (Math.random() - 0.5);

        arrCircle.push(new Circle(x, y, dx, dy, radius));
    }

}

function animate() {

    requestAnimationFrame(animate); // boucle de fonction
    c.clearRect(0, 0, innerWidth, innerHeight); // clear le canvas a chaque appel

    for (i = 0; i < arrCircle.length; i++) {
        arrCircle[i].update();

    }

}

init();
animate();




// c.fillStyle = "rgba(255,0,0)";
// c.fillRect(100, 100, 100, 100); // x y posX posY
// c.fillStyle = "rgba(255,255,0)";
// c.fillRect(400, 100, 100, 100); // x y posX posY
// c.fillStyle = "rgba(255,0,255)";
// c.fillRect(100, 400, 100, 100); // x y posX posY

// c.beginPath();
// c.moveTo(50, 300); // posX posY
// c.lineTo(300, 100); // posX posY
// c.lineTo(400, 300);
// c.strokeStyle = "blue";
// c.stroke(); // afficher

// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false); // posX posY radius "debut de l'angle" "la fin de l'angle en radian" "le sens du cercle"
// c.strokeStyle = 'red';
// c.stroke();

// for (i = 0; i < 30; i++) {
//     let x = Math.random()* window.innerWidth;
//     let y = Math.random()* window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = 'red';
//     c.stroke();
// }
