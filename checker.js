const checkSringArg = (json, arg, option = null, mandatory = true) => {
  let correct = true;
  if (arg in json) {
    if (option === null) {
    } else if (Array.isArray(option)) {
      if (!(option.includes(json[arg]))) {
        console.error("Request argument '" + arg + "' is incorrect");
        correct = false;
      }
    } else {
      console.error("Option is a list of possible value for the argument :", arg, "\nSet option parameter to null if all value is accepted for this argument.");
      correct = false;
    }
    
  } else if (mandatory) {
    console.error("Request argument '" + arg + "' is needed.\nIf this argument is optional set mandadory parameter to false (default = true)");
    correct = false;
  }
  return correct
}

const checkNumberArg = (json, arg, min = Infiniity, max = Infinity, mandatory = true) => {
  let correct = true;
  if (arg in json) {
    if (!(Number.isInteger(json[arg]))) {
      console.error("Request argument '" + arg + "' is incorrect");
      correct = false;
    } else if (json[arg] < min) {
      console.error("Request argument '" + arg + "' is too small (min = " + min + ")");
      correct = false;
    } else if (json[arg] > max) {
      console.error("Request argument '" + arg + "' is too big (max = " + max + ")");
      correct = false;
    }
  }
  else if (mandatory) {
    console.error("Request argument '" + arg + "' is needed");
    correct = false;
  }
  return correct
}

const isDataFormatCorrect = (data) => {
  let correct = true;

  correct = checkSringArg(data, 'action', ['play', 'pause', 'next', 'previous', 'stop', 'clearplaylist'], false) ? correct : false;
  correct = checkNumberArg(data, 'volume', 0, 100, false) ? correct : false;
  correct = checkNumberArg(data, 'time', 0, Infinity, false) ? correct : false;

  if ('media' in data) {
    correct = checkSringArg(data['media'], 'service', ['youtube', 'local'], true) ? correct : false;
    correct = checkSringArg(data['media'], 'position', ['now', 'next', 'end'], false) ? correct : false;
    correct = checkSringArg(data['media'], 'path', null, false) ? correct : false;
  }

  console.log("Request format :", correct)
  return correct
}

exports.isDataFormatCorrect = isDataFormatCorrect;