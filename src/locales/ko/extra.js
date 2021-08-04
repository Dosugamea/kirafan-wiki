const NumberWithFinal = ['2', '3', '4', '5', '6', '7', '8', '9', '0']; // 하나, 둘 ...

const AlphabetWithFinal = ['L', 'M', 'N', 'R'];

const HangulCodeStart = '가'.charCodeAt(0);

const HangulInitialNumber = 19; // ㄱ - ㅎ

const HangulVowelNumber = 21; // ㅏ - ㅣ

const HangulFinalNumber = 28; // X, ㄱ - ㅎ

const HangulCodeEnd =
  HangulCodeStart + HangulInitialNumber * HangulVowelNumber * HangulFinalNumber;

function isHangul(charCode) {
  return charCode >= HangulCodeStart && charCode <= HangulCodeEnd;
}

function isHangulWithFinal(charCode) {
  return (
    isHangul(charCode) && (charCode - HangulCodeStart) % HangulFinalNumber !== 0
  );
}

function processKorean(str) {
  function replaceParticle(match, particle0, particle1, offset) {
    if (
      !isHangul(particle0.charCodeAt(0)) ||
      !isHangul(particle1.charCodeAt(0))
    ) {
      return match;
    }

    let isPrefixWithFinal = false;
    while (offset >= 1) {
      offset -= 1;

      if (str[offset] === ' ') continue;

      if (str[offset] === '　') continue;

      if (isHangul(str.charCodeAt(offset))) {
        isPrefixWithFinal = isHangulWithFinal(str.charCodeAt(offset));
        break;
      }

      isPrefixWithFinal =
        NumberWithFinal.includes(str[offset]) ||
        AlphabetWithFinal.includes(str[offset]);
      break;
    }
    return isPrefixWithFinal ? particle0 : particle1;
  }
  return str.replace(/(.)\((.)\)/, replaceParticle);
}

export default processKorean;
