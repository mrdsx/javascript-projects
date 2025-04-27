const SYMBOLS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  digit: "0123456789",
  special: "!@#$%^&*()-_=+[]{}|;:,.<>?"
};
const MAX_PASS_LEN = 128;

const copyBtnContents = {
  copy: "Скопировать",
  copied: "Скопировано!"
};

const BTN_COLORS = {
  default: "rgb(240, 240, 240)",
  hover: "#fff"
};

const randomPassField = document.getElementById("random-pass");
const passSymbolOptions = document.querySelector(".pass-symbols-options");
const passRange = document.getElementById("pass-length-range");

const genPassBtn = document.querySelector("button[id=\"copy-pass\"]");
addActionsToGenPassBtn();

const charTypes = ["uppercase", "lowercase", "digit", "special"];
charTypes.forEach(setupCheckbox);

function showPass() {
  const passParams = getPassParams();
  const pass = generatePass(passParams);
  randomPassField.value = pass;
}

function generatePass(passParams) {
  const { len, uppercase, lowercase, digit, special } = passParams;

  const paramsValid = validatePassParams({ len, uppercase, lowercase, digit, special });
  if (!paramsValid) return "";

  const chars = getChars({ uppercase, lowercase, digit, special });
  const pass = getPass(len, chars);

  return pass;
}

function copyPass(e) {
  const copyText = randomPassField;
  if (!copyText.value) return;

  navigator.clipboard.writeText(copyText.value)
    .then(showCopySuccess(e))
    .catch((err) => {
      console.error("Ошибка при копировании пароля!");
      throw new Error(err);
    });
}

function showCopySuccess(e) {
  const { copy, copied } = copyBtnContents;

  const elem = e.srcElement;
  elem.innerText = copied;

  setTimeout(() => {
    elem.innerText = copy;
  }, 1000);
}

// password parameters aren't available as a global object
function getPassParams() {
  let passParams = {
    len: passRange.value
  };

  charTypes.forEach((type) => {
    passParams[type] = passSymbolOptions.querySelector(`#${type}-symbols`).checked;
  });
  return passParams;
}

// SAFELY gets random int
function getRandomInt(max) {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % (max + 1);
}

function validatePassParams(passParams) {
  const { len, uppercase, lowercase, digit, special } = passParams;

  if (len <= 0) {
    alert("Длина должна быть больше 0!");
    return false;
  } else if (len > MAX_PASS_LEN) {
    alert("Длина должна быть меньше 128!");
    return false;
  } else if (!uppercase && !lowercase && !digit && !special) {
    alert("Выберите символы, которые будут в пароле");
    return false;
  }
  return true;
}

function getChars(includedCharTypes) {
  let chars = "";
  for (let type in includedCharTypes) {
    if (includedCharTypes[type]) chars += SYMBOLS[type];
  }
  return chars;
}

function getPass(len, chars) {
  let pass = "";
  for (let i = 0; i < len; i++) {
    const randIndex = getRandomInt(chars.length - 1);
    pass += chars[randIndex];
  }
  return pass;
}

function setupCheckbox(type) {
  const passParams = getPassParams();
  const checkbox = passSymbolOptions.querySelector(`#${type}-symbols`);
  passParams[type] = checkbox.checked;

  checkbox.addEventListener("change", () => {
    passParams[type] = checkbox.checked;
  });
}

function addActionsToGenPassBtn() {
  genPassBtn.addEventListener("click", (e) => copyPass(e));
  genPassBtn.addEventListener("mouseover", () => {
    genPassBtn.style.background = BTN_COLORS.default;
  });
  genPassBtn.addEventListener("mouseout", () => {
    genPassBtn.style.background = BTN_COLORS.hover;
  });
}
