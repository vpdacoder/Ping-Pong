
let c = canvas.getContext('2d');



//Middle Line
c.beginPath();
c.moveTo(0,0);
c.lineTo(200,800);
c.strokeStyle = 'white';
c.stroke();



let x = 400;
let y = 200;
let dy = (Math.random() - 0.5) * 10;
let dx = (Math.random() - 0.5) * 10;
let radius = 6;


// Circle Two
let x2 = 200;
let y2 = 200;
let dy2 = (Math.random() - 0.5) * 5;
let dx2 = (Math.random() - 0.5) * 5;
let radius2 = 6;



function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,800,400);

  c.beginPath();
  c.strokeStyle = "black";
  c.arc(x,y,radius,0,Math.PI * 2,false);
  c.stroke();
  c.fillStyle = "black";
  c.fill();

  c.beginPath();
  c.strokeStyle = "black";
  c.arc(x2,y2,radius2,0,Math.PI * 2,false);
  c.stroke();
  c.fillStyle = "white";
  c.fill();

  if (x + radius > 800 || x - radius < 0) {
    dx = -dx;
  }

  if (y + radius > 400 || y - radius < 0) {
    dy = -dy;
  }

  x += dx;
  y += dy;


  if (x2 + radius2 > 800 || x2 - radius2 < 0) {
    dx2 = -dx2;
  }

  if (y2 + radius2 > 400 || y2 - radius2 < 0) {
    dy2 = -dy2;
  }

  x2 += dx2;
  y2 += dy2;
}

animate();
//
// let x1 = 200;
// let y1 = 200;
// let dy1 = (Math.random() - 0.5) * 5;
// let dx1 = (Math.random() - 0.5) * 5;
// let radius1 = 6;


// function animateTwo() {
//   requestAnimationFrame(animate);
//   c.clearRect(0,0,800,400);
//
//   c.beginPath();
//   c.strokeStyle = "blue";
//   c.arc(20,20,radius1,0,Math.PI * 2,false);
//   c.stroke();
//
//   if (x1 + radius1 > 800 || x1 - radius1 < 0) {
//     dx = -dx;
//   }
//
//   if (y1 + radius1 > 400 || y1 - radius1 < 0) {
//     dy1 = -dy1;
//   }
//
//   x1 += dx1;
//   y1 += dy1;
// }
//
// animateTwo();
