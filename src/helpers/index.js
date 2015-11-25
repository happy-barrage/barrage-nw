/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function getRandomColor() {
  let colors = [
    'red', 'orange', 'yellow',
    'olive', 'green', 'teal',
    'blue', 'violet', 'purple',
    'pink', 'brown', 'grey',
    'black'
  ];
  return colors[getRandomInt(0, colors.length - 1)];
}


export function fetchCheckStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response.json();
    throw error;
  }
}

export function fetchParseJSON(response) {
  return response.json();
}