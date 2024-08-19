// Player enums
const Player = {
  Human: "human",
  Computer: "computer",
};
const grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let whoseTurn = Player.Human;
let gameStopped = false;

function mathRandomInt(a, b) {
  if (a > b) {
    // Swap a and b to ensure a is smaller.
    var c = a;
    a = b;
    b = c;
  }
  return Math.floor(Math.random() * (b - a + 1) + a);
}

[...document.querySelectorAll(".board")].forEach((board) =>
  board.addEventListener("click", ({ target }) => {
    if (gameStopped || !target.classList.contains("square")) {
      return;
    }

    let row = target.dataset.row - 1;
    let column = target.dataset.column - 1;

    if (grid[row][column] !== 0 || whoseTurn !== Player.Human) {
      return;
    }

    grid[row][column] = whoseTurn;

    const icon = document.createElement("i");
    icon.classList.add("bi", "bi-x");

    target.appendChild(icon);
    // Change whoseTurn to the computer
    whoseTurn = Player.Computer;
    let winner = getWinner();

    if (winner) {
      setTimeout(() => {
        alert(`${winner} won!`);
      }, 0);
      gameStopped = true;
      return;
    }

    const unique = [...new Set(grid.flat())];

    if (!unique.includes(0)) {
      setTimeout(() => {
        alert("draw!");
      }, 0);
      gameStopped = true;
      return;
    }

    let found = false;

    while (!found) {
      row = mathRandomInt(0, 2);
      column = mathRandomInt(0, 2);
      if (grid[row][column] === 0) {
        found = true;
        grid[row][column] = whoseTurn;

        const icon = document.createElement("i");
        icon.classList.add("bi", "bi-circle");

        board
          .querySelector(
            `.square[data-row="${row + 1}"][data-column="${column + 1}"]`
          )
          .appendChild(icon);

        winner = getWinner();

        if (winner) {
          setTimeout(() => {
            alert(`${winner} won!`);
          }, 0);
          gameStopped = true;
          return;
        }

        whoseTurn = Player.Human;
      }
    }
  })
);

function getWinner() {
  const candidates = [[], [], [], [], [], ...grid];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      candidates[i].push(grid[j][i]);

      if (i === j) {
        candidates[3].push(grid[i][j]);
      }

      if (2 - i === j) {
        candidates[4].push(grid[i][j]);
      }
    }
  }

  for (const candidate of candidates) {
    const unique = [...new Set(candidate)];

    if (unique.length === 1 && unique[0] !== 0) {
      return unique[0];
    }
  }

  return undefined;
}
