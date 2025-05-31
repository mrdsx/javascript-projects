const COLOR_HEX_LENGTH = 6;
const quotes = [
  "You're doing great, stop thinking about her.",
  "404: feelings not found.",
  "You're not behind, you're just healing.",
  "She's not your main quest. You're the main character.",
  "Romantic thoughts.exe crashed successfully.",
  "Heart's on cooldown. Come back later.",
  "Cannot find name 'emotions'",
  "System overload: too many memories.",
];

const changeColorBtn = document.getElementById(
  "change-color-btn"
) as HTMLInputElement;
setupChangeColorBtnEvents();
const bgHex = sessionStorage.getItem("bg__hex");
if (bgHex) changeColorBtn.style.background = bgHex;
else adjustElementBackground(changeColorBtn);

const quoteParagraph = document.getElementById(
  "quote-paragraph"
) as HTMLParagraphElement;
const quoteParagraphText = sessionStorage.getItem("quote");
if (quoteParagraphText) quoteParagraph.textContent = quoteParagraphText;
else adjustElementText(quoteParagraph);

function setupChangeColorBtnEvents(): void {
  changeColorBtn.addEventListener("click", () => {
    adjustElementBackground(changeColorBtn);
    adjustElementText(quoteParagraph);
  });
}

function adjustElementBackground(element: HTMLElement): void {
  const bgHex = generateRandomColorHex(COLOR_HEX_LENGTH);
  element.style.background = bgHex;
  sessionStorage.setItem("bg__hex", bgHex);
}

function adjustElementText(element: HTMLElement): void {
  const quote = generateQuote();
  element.textContent = quote;
  sessionStorage.setItem("quote", quote);
}

function generateRandomColorHex(size: number): string {
  const hexCode = [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
  return `#${hexCode}`;
}

function generateQuote(): string {
  const index = Math.round(Math.random() * (quotes.length - 1));
  return quotes[index];
}
