import beautify from "xml-beautifier";

export function colorful_language(word) {

  if (word.length === 0 ) {
    return 'black';
  }
  var sanitized = word.replace(/[^A-Za-z]/, '');
  var letters = sanitized.split('');

  //Determine the hue
  var hue = Math.floor((letters[0].toLowerCase().charCodeAt() - 96) / 26 * 360);
  var ord = '';
  for (var i in letters) {
    ord = letters[i].charCodeAt();
    if ((ord >= 65 && ord <= 90) || (ord >= 97 && ord <= 122)) {
      hue += ord - 64;
    }
  }

  hue = hue % 360;

  //Determine the saturation
  var vowels = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u'];
  var count_cons = 0;

  //Count the consonants
  for (i in letters) {
    if (vowels.indexOf(letters[i]) === -1) {
      count_cons++;
    }
  }

  //Determine what percentage of the word is consonants and weight to 95% being fully saturated.
  var saturation = count_cons / letters.length / 0.95 * 100;
  if (saturation > 100) saturation = 100;

  //Determine the luminosity
  var ascenders = ['t', 'd', 'b', 'l', 'f', 'h', 'k'];
  var descenders = ['q', 'y', 'p', 'g', 'j'];
  var luminosity = 50;
  var increment = 1 / letters.length * 50;

  for (i in letters) {
    if (ascenders.indexOf(letters[i]) !== -1) {
      luminosity += increment;
    } else if (descenders.indexOf(letters[i]) !== -1) {
      luminosity -= increment * 2;
    }
  }
  if (luminosity > 100) luminosity = 100;
  return {
    hue,
    saturation,
    luminosity
  };
  //return "hsla(" + hue + ", " + saturation + "%, " + luminosity + "%, " + opacity + ")";
}

export function fetchFromObject(obj, prop) {
  if (typeof obj === 'undefined') {
    return "-";
  }

  var _index = prop.indexOf('.')
  if (_index > -1) {
    return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
  }

  return obj[prop];
}

export const fileToBase64 = (file, cb) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    cb(null, reader.result)
  }
  reader.onerror = function (error) {
    cb(error, null)
  }
}

export const NewlineText = (value , ind) => {
  const text = value;
  const newText = text.split('\n').map(str => <p key={ind}>{str}</p>);
  return newText;
}

export const prettyformat = (value) => {
  const xml = beautify(value);
  return xml;
}

export const hexToRgba = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  }
  return "rgb(" + r + ", " + g + ", " + b + ")";
}