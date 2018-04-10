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
  points = 0,
  ball = {}, // Ball object
  paddles = [2], // Array containing two paddles
  mouse = {}; // Object to store mouse position

// Add mousemove and mousedown events to the canvas
canvas.addEventListener("mousemove", trackPosition, true);


// Track the position of mouse cursor
function trackPosition(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY - 110;
}


// Move the paddles on mouse move
if (mouse.y) {
  for (var i = 1; i < paddles.length; i++) {
    p = paddles[i];
    p.y = (mouse.y - p.h / 2);
  }
}


// Ball object
ball = {
  x: 10,
  y: 50,
  r: 5,
  c: "white",
  vx: 4,
  vy: 6,

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

// Move the ball
ball.x += ball.vx;
ball.y += ball.vy;

// Collision with paddles
p1 = paddles[1];
p2 = paddles[2];

//Function to check collision between ball and one of
//the paddles
function collides(b, p) {
  if (b.y + ball.r >= p.y && b.y - ball.r <= p.y + p.h) {
    if (b.x >= (p.x - p.w) && p.x > 0) {
      return true;
    } else if (b.x <= p.w && p.x == 0) {
      return true;
    } else return false;
  }
}

function action(ball, p) {

  ball.vx = -ball.vx;
  ball.vy = -ball.vy;
  points++;
  increaseSpd();

  if (collision) {
    if (points > 0)
      collision.pause();

    collision.currentTime = 0;
    collision.play();
  }
}

// function for posting live score
function updateScore() {
  c.fillStlye = "white";
  c.font = "16px Arial, sans-serif";
  c.textAlign = "left";
  c.textBaseline = "top";
  c.fillText("Score: " + points, 20, 20);
}

// Function to run when the game overs
function gameOver() {
  c.fillStlye = "white";
  c.font = "20px Arial, sans-serif";
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.fillText("Game Over - You scored " + points + " points!", W / 2, H / 2 + 25);


  // Stop the Animation
  cancelRequestAnimFrame(init);
}

// Function to increase speed after every 3 points
function increaseSpd() {
  if (points % 2 == 0) {
    if (Math.abs(ball.vx) < 10) {
      ball.vx += (ball.vx > 0) ? .5 : -.5;
      ball.vy += (ball.vy > 0) ? 1 : -1;
    }
  }
}

function update() {

  // Update scores
  updateScore();

  // Move the ball
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.x + ball.r > 800 || ball.x - ball.r < 0) {
    gameOver();
  }

  if (ball.y + ball.r > 400 || ball.y - ball.r < 0) {
    ball.vy = -ball.vy;
  }

  if (mouse.x && mouse.y) {
    for (var i = 1; i < paddles.length; i++) {
      p = paddles[i];
      p.y = mouse.y;
    }
  }

  // If the ball strikes with paddles,
  // invert the x-velocity vector of ball,
  // increment the points

  if (collides(ball, p1)) {
    action(ball, p1);
  } else if (collides(ball, p2)) {
    action(ball, p2);
  }

}

animloop();
