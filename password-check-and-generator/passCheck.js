const { weak, medium, strong } = PASS_GRADE_PARAMS;

const SPECIAL_CHARS = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

const passCheck = document.querySelector(".pass-check");
const strengthGrade = passCheck.querySelector(".strength-grade");

function showPassStrength() {
  const pass = passCheck.querySelector("input[id=\"pass\"]").value;
  const grade = getPassStrength(pass);
  changeStrengthGradeStyles(grade);
}

function changeStrengthGradeStyles(grade) {
  strengthGrade.innerText = PASS_GRADE_PARAMS[grade].text;
  strengthGrade.style.color = PASS_GRADE_PARAMS[grade].color;
}

function getPassStrength(pass) {
  const lenScore = evaluateLenScore(pass.length);
  const charsScore = evaluateCharScore(pass);
  const totalScore = lenScore + charsScore;

  return evaluatePassStrength(totalScore);
}

function evaluateLenScore(len) {
  if (typeof len !== "number") {
    throw new Error("Expected number in evaluateLenScore");
  } else if (len < 0) {
    throw new Error("Length can't be neither negative or 0");
  }

  if (len >= 16) {
    return strong.subScore;
  } else if (len >= 8 && len < 16) {
    return medium.subScore;
  }
  return weak.subScore;
}

function evaluateCharScore(str) {
  if (typeof str !== "string") {
    throw new Error("Expected string in evaluateCharScore().");
  }

  if (strHasAllChars(str)) {
    return strong.subScore;
  } else if (strHasLettersAndNumbers(str)) {
    return medium.subScore;
  }
  return weak.subScore;
}

function evaluatePassStrength(totalScore) {
  if (totalScore > strong.totalScore) {
    throw new Error("Total score can't be greater than 6");
  } else if (totalScore < 0) {
    throw new Error("Total score can't be negative");
  }

  const isWeak =
    totalScore > 0 &&
    totalScore <= weak.totalScore;
  const betweenWeakAndMedium =
    totalScore > weak.totalScore &&
    totalScore <= medium.totalScore;

  if (isWeak) {
    return weak.key;
  } else if (betweenWeakAndMedium) {
    return medium.key;
  }
  return strong.key;
}

function strHasAllChars(str) {
  return strHasLettersAndNumbers(str) && SPECIAL_CHARS.test(str);
}

function strHasLettersAndNumbers(str) {
  return /[A-Z]/.test(str) && /[a-z]/.test(str) && /\d/.test(str);
}

function getJSON(path) {
  return fetch(path).then(response => response.json());
}
