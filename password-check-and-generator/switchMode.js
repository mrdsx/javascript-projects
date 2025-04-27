const MODES = {
  passGen: {
    tabClass: "pass-gen",
    text: "генерация пароля"
  },
  passCheck: {
    tabClass: "pass-check",
    text: "проверка пароля"
  }
};
let activeMode = MODES.passGen;

const passAppTabList = document.querySelectorAll(".app-tab");

const switchBtn = document.getElementById("switch-btn");
switchBtn.addEventListener("click", () => {
  toggleActiveMode();
  toggleTab(passAppTabList);
  changeSwitchBtnContent();
});
const switchBtnSpan = switchBtn.querySelector("span");

function toggleActiveMode() {
  if (activeMode === MODES.passGen) {
    activeMode = MODES.passCheck;
  } else {
    activeMode = MODES.passGen;
  }
}

function toggleTab(tabList) {
  showAllTabs(tabList);
  showSpecificTab(tabList);
}
toggleTab(passAppTabList);

function showAllTabs(tabList) {
  tabList.forEach((tab) => {
    tab.style.display = "flex";
  });
}

function showSpecificTab(tabList) {
  tabList.forEach(tab => {
    if (!tab.classList.contains(activeMode.tabClass)) {
      tab.style.display = "none";
    }
  });
}

function changeSwitchBtnContent() {
  switchBtnSpan.innerText = activeMode.text;
}
