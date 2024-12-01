const getNeighbors = (a, b) => {
  const neighbors = [
    [a + 1, b + 2],
    [a + 1, b - 2],
    [a + 2, b + 1],
    [a + 2, b - 1],
    [a - 1, b + 2],
    [a - 1, b - 2],
    [a - 2, b + 1],
    [a - 2, b - 1],
  ];
  let i = 0;
  while (i < neighbors.length) {
    if (
      neighbors[i][0] < 0 ||
      neighbors[i][0] > 7 ||
      neighbors[i][1] < 0 ||
      neighbors[i][1] > 7
    ) {
      neighbors.splice(i, 1);
    } else {
      i++;
    }
  }
  return neighbors;
};

const knightMoves = (currentPosition, targetPosition) => {
  if (currentPosition.toString() === targetPosition.toString()) {
    return "You're already there.";
  }

  let validCoordinates = true;
  currentPosition.forEach((coordinate) => {
    if (coordinate > 7 || coordinate < 0) {
      validCoordinates = false;
    }
  });
  targetPosition.forEach((coordinate) => {
    if (coordinate > 7 || coordinate < 0) {
      validCoordinates = false;
    }
  });
  if (!validCoordinates) {
    return "Incorrect coordinates.";
  }

  let visited = [];
  let queue = [];
  let counter = 0;
  let moves = [targetPosition];

  queue.push(currentPosition);
  while (queue.length > 0) {
    if (queue[0].toString() === targetPosition.toString()) {
      let target = queue[0];
      queue = [];
      let i = 0;
      while (visited.length > 0) {
        if (target.toString() == visited[i].toString()) {
          visited = [];
        } else {
          // check if the target is a direct neighbor to a visited item
          getNeighbors(visited[i][0], visited[i][1]).forEach((neighbor) => {
            if (neighbor.toString() == target.toString()) {
              target = visited[i]; // set the new target to the direct neighbor we found in the visited array
              visited.splice(i, visited.length - i); // when we find a direct neighbor we delete the rest of the array
              moves.push(target);
              counter++;
              i = -1; // reset the loop
            }
          });
        }
        i++;
      }
    } else {
      visited.push(queue[0]);
      let neighbors = getNeighbors(queue[0][0], queue[0][1]);
      queue = queue.concat(neighbors);
      queue.shift();
    }
  }

  const prettyPrintMoves = () => {
    moves.reverse();
    let prettyString = ``;
    for (i = 0; i < moves.length; i++) {
      prettyString += `${moves[i]} => `;
    }
    return prettyString.slice(0, -4);
  };

  return `You did it in ${counter} moves and they were: 
  ${prettyPrintMoves()}`;
};

const calculateButton = document.querySelector(".button-calculate");

calculateButton.addEventListener("click", () => {
  const xCoordinates = [document.querySelector("#x-1"), document.querySelector("#x-2")];
  const yCoordinates = [document.querySelector("#y-1"), document.querySelector("#y-2")]
  const result = knightMoves(xCoordinates, yCoordinates)
  document.querySelector(".result").textContent = `${result}`;
})

// console.log(knightMoves([0, 0], [7, 7]));
