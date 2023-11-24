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
    return "Incorrect coordinates";
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
          // check if the target is a direct neighbor to a visited square
          getNeighbors(visited[i][0], visited[i][1]).forEach((neighbor) => {
            if (neighbor.toString() == target.toString()) {
              target = visited[i]; // we change the target to be the direct neighbor we found in the visited array
              if (visited[i] == visited[0]) {
                visited = [];
              } else {
                visited.splice(i, visited.length - i); // when we find a direct neighbor we delete the remaining array elements from that point on
              }
              moves.push(target);
              counter++;
              i = -1; // we reset i so we can run the loop again for remaining visited elements with the new target
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

  moves.reverse();
  const prettyPrintMoves = () => {
    let prettyString = ``;
    for (i = 0; i < moves.length; i++) {
      prettyString += `${moves[i]} => `;
    }
    return prettyString.slice(0, -4);
  };

  return `You did it in ${counter} moves and they were: 
  ${prettyPrintMoves()}`;
};

console.log(knightMoves([7, 7], [0, 0]));
