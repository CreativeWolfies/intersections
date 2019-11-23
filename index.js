const canvas = document.getElementById("out");
const ctx = canvas.getContext("2d");
const methods_ul = document.getElementById("methods");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let a = [0, 0];
let b = [0, 0];
let c = [0, 0];
let d = [0, 0];

let intersections = [];
let method_buttons = [];
let active_method = 0;

function randomize() {
  a[0] = Math.floor(Math.random() * 16) + 1;
  b[0] = Math.floor(Math.random() * 16) + 1;
  c[0] = Math.floor(Math.random() * 16) + 1;
  d[0] = Math.floor(Math.random() * 16) + 1;
  a[1] = Math.floor(Math.random() * 16) + 1;
  b[1] = Math.floor(Math.random() * 16) + 1;
  c[1] = Math.floor(Math.random() * 16) + 1;
  d[1] = Math.floor(Math.random() * 16) + 1;
}

function display() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;

  if (intersections[active_method]) {
    ctx.fillStyle = "rgb(240, 240, 240)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    methods_ul.className = "intersects";
  } else {
    ctx.fillStyle = "rgb(32, 32, 32)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    methods_ul.className = "";
  }

  for (let n = 0; n < methods.length; n++) {
    if (intersections[n] !== intersections[active_method]) {
      method_buttons[n].className = "error";
    } else if (n !== active_method) {
      method_buttons[n].className = "";
    }
  }

  let offset_x = (canvas.width - 16 * 20) / 2;
  let offset_y = (canvas.height - 16 * 20) / 2;

  ctx.strokeStyle = "rgb(148, 89, 129)";
  ctx.beginPath();
  ctx.moveTo(offset_x + a[0] * 20, offset_y + a[1] * 20);
  ctx.lineTo(offset_x + b[0] * 20, offset_y + b[1] * 20);
  ctx.stroke();

  ctx.strokeStyle = "rgb(132, 126, 168)";
  ctx.beginPath();
  ctx.moveTo(offset_x + c[0] * 20, offset_y + c[1] * 20);
  ctx.lineTo(offset_x + d[0] * 20, offset_y + d[1] * 20);
  ctx.stroke();
}

function edge_cases(A, B, C, D) {
  if (A[0] === B[0] && A[1] === B[1]) {
    if (C[0] === D[0] && C[1] === D[1]) {
      return A[0] === C[0] && A[1] === C[1];
    }
    // We check colinearity by calculating the determinant of the matrix [CA, CD]
    let a2 = A[0] - C[0]; // [[!, ][ , ]]
    let b2 = D[0] - C[0]; // [[ ,!][ , ]]
    let c2 = A[1] - C[1]; // [[ , ][!, ]]
    let d2 = D[1] - C[1]; // [[ , ][ ,!]]

    if (a2*d2 - b2*c2 !== 0) return false;
    return Math.min(C[0], D[0]) <= A[0] && Math.max(C[0], D[0]) >= A[0] && Math.min(C[1], D[1]) <= A[1] && Math.max(C[1], D[1]) >= A[1];
  } else if (C[0] === D[0] && C[1] === D[1]) {
    // We check colinearity by calculating the determinant of the matrix [AC, AB]

    let a2 = C[0] - A[0]; // [[!, ][ , ]]
    let b2 = B[0] - A[0]; // [[ ,!][ , ]]
    let c2 = C[1] - A[1]; // [[ , ][!, ]]
    let d2 = B[1] - A[1]; // [[ , ][ ,!]]

    if (a2*d2 - b2*c2 !== 0) return false;
    return Math.min(A[0], B[0]) <= C[0] && Math.max(A[0], B[0]) >= C[0] && Math.min(A[1], B[1]) <= C[1] && Math.max(A[1], B[1]) >= C[1];
  }
  return null;
}

canvas.onclick = function() {
  randomize();
  intersections = methods.map(x => x(a, b, c, d));
  display();
}

window.onkeydown = function(evt) {
  if (evt.key === " ") {
    randomize();
    intersections = methods.map(x => x(a, b, c, d));
    display();
  }
}

function set_active(n) {
  for (let o = 0; o < methods.length; o++) {
    method_buttons[o].className = o === n ? "active" : "";
  }
  active_method = n;
  intersections = methods.map(x => x(a, b, c, d));
  display();
}

for (let n = 0; n < methods.length; n++) {
  let button = document.createElement("li");
  if (n === active_method) {
    button.className = "active";
  }
  button.innerText = "Method " + (n + 1);

  button.onclick = () => set_active(n);

  method_buttons.push(button);
  methods_ul.appendChild(button);
}

randomize();
intersections = methods.map(x => x(a, b, c, d));
display();
