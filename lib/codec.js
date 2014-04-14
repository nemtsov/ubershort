/**
 * Algoritm from:
 * http://stackoverflow.com/questions/742013/how-to-code-a-url-shortener
 */

var alphabet = 'abcdefghijklmnopqrstuvwxyz' + 
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
    '0123456789'.split(''),
  base = alphabet.length;

exports.encode = function (i) {
  var s = '';
  if (i === 0) return alphabet[0];
  while (i > 0) {
    s += alphabet[i % base];
    i = parseInt(i / base, 10);
  }
  return s.split('').reverse().join('');
};

exports.decode = function (s) {
  var num, i, len;
  for (num = 0, i = 0, len = s.length; i < len; i++) {
    num = num * base + alphabet.indexOf(s[i]);
  }
  return num;
};
