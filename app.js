// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = (function() {
  return window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout
})();

let c = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;
W = canvas.width;
H = canvas.height;
particles = [], // Array containing particles
ball = {}, // Ball object
paddles = [2], // Array containing two paddles
mouse = {}; // Object to store mouse position

// Add mousemove and mousedown events to the canvas
  canvas.addEventListener("mousemove", trackPosition, true);
// canvas.addEventListener("mousedown", btnClick, true);


// Track the position of mouse cursor
function trackPosition(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY-110;
}


// Move the paddles on mouse move
if (mouse.y) {
  for (var i = 1; i < paddles.length; i++) {
    p = paddles[i];
    p.y = (mouse.y - p.h/2);
  }
}





  // Ball object
  ball = {
    x: 50,
    y: 50,
    r: 5,
    c: "white",
    vx: 4,
    vy: 8,

    // Function for drawing ball on canvas
    draw: function() {
      c.beginPath();
      c.fillStyle = this.c;
      c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      c.fill();
    }
  };


// Function for creating paddles
function Paddle(pos) {
  // Height and width
  this.h = 75;
  this.w = 12;

  // Paddle's position
  this.y = 0;
  this.x = (pos == "left") ? 0 : W - this.w;
}

// Push two new paddles into the paddles[] array
paddles.push(new Paddle("left"));
paddles.push(new Paddle("right"));


// Draw everything on canvas
function draw() {
  c.clearRect(0, 0, 800, 400);
  // paintCanvas();
  for (var i = 0; i < paddles.length; i++) {
    p = paddles[i];

    c.fillStyle = "blue";
    c.fillRect(p.x, p.y, p.w, p.h);
  }

  ball.draw();
  update();
}

// Function for running the whole animation
function animloop() {
  init = requestAnimFrame(animloop);
  draw();
}


// If the ball strikes with paddles,
// invert the x-velocity vector of ball,
// increment the points, play the collision sound,
// save collision's position so that sparks can be
// emitted from that position, set the flag variable,
// and change the multiplier


//Function to check collision between ball and one of
//the paddles
function collides(b, p) {
  if (b.x + ball.r >= p.x && b.x - ball.r <= p.x + p.w) {
    if (b.y >= (p.y - p.h) && p.y > 0) {
      paddleHit = 1;
      return true;
    } else if (b.y <= p.h && p.y == 0) {
      paddleHit = 2;
      return true;
    } else return false;
  }
}


function update() {

  // Move the ball
  ball.x += ball.vx;
  ball.y += ball.vy;

  // if (ball.x + ball.r > 800 || ball.x - ball.r < 0) {
  //   gameOver();
  // }

  if (ball.x + ball.r > 800 || ball.x - ball.r < 0) {
    ball.vx = -ball.vx;
  }

  if (ball.y + ball.r > 400 || ball.y - ball.r < 0) {
    ball.vy = -ball.vy;
  }

  ball.x += ball.vx;
  ball.y += ball.vy;


  if (mouse.x && mouse.y) {
    for (var i = 1; i < paddles.length; i++) {
      p = paddles[i];
      p.y = mouse.y;
    }
  }
}

animloop();







// //Do this when collides == true
// function collideAction(ball, p) {
//   ball.vy = -ball.vy;
//
//   if (paddleHit == 1) {
//     ball.y = p.y - p.h;
//     particlePos.y = ball.y + ball.r;
//     multiplier = -1;
//   } else if (paddleHit == 2) {
//     ball.y = p.h + ball.r;
//     particlePos.y = ball.y - ball.r;
//     multiplier = 1;
//   }
// }


// let x = 400;
// let y = 200;
// let dy = (Math.random() - 0.5) * 10;
// let dx = (Math.random() - 0.5) * 10;
// let radius = 6;
//
//
// // Circle Two
// let x2 = 200;
// let y2 = 200;
// let dy2 = (Math.random() - 0.5) * 5;
// let dx2 = (Math.random() - 0.5) * 5;
// let radius2 = 6;



// function animate() {
//   requestAnimationFrame(animate);
//   c.clearRect(0, 0, 800, 400);
//
//   c.beginPath();
//   c.strokeStyle = "black";
//   c.arc(x, y, radius, 0, Math.PI * 2, false);
//   c.stroke();
//   c.fillStyle = "black";
//   c.fill();
//
//   c.beginPath();
//   c.strokeStyle = "black";
//   c.arc(x2, y2, radius2, 0, Math.PI * 2, false);
//   c.stroke();
//   c.fillStyle = "white";
//   c.fill();
//
//   if (x + radius > 800 || x - radius < 0) {
//     dx = -dx;
//   }
//
//   if (y + radius > 400 || y - radius < 0) {
//     dy = -dy;
//   }
//
//   x += dx;
//   y += dy;
//
//
//   if (x2 + radius2 > 800 || x2 - radius2 < 0) {
//     dx2 = -dx2;
//   }
//
//   if (y2 + radius2 > 400 || y2 - radius2 < 0) {
//     dy2 = -dy2;
//   }
//
//   x2 += dx2;
//   y2 += dy2;
// }
//
// animate();
