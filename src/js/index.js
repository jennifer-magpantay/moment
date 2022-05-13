import { linearGradient } from "../data/gradient.js";
import { getApi } from "../services/getApi.js";
import { getHour } from "../services/getHour.js";

window.addEventListener("load", () => {
  init();
});

function init() {
  changeBackgroundOnLoading();
  greetings();

  // events
  generateQuote();
}

// changing background gradient when the page is loded
function changeBackgroundOnLoading() {
  console.log("changing background");
  const body = document.querySelector("body");

  const data = linearGradient.map((item) => item);
  const index = generateRandomIndex(data.length);
  const gradientBackground = getDataAtIndex(data, index);

  console.log(gradientBackground);

  body.style.backgroundImage = `linear-gradient(${gradientBackground.gradient})`;
}

// greeting user according to the time of the day
function greetings() {
  const greeting = document.querySelector("#greeting");
  const currentHour = getHour();

  let salution = "";
  if (currentHour < 12) {
    salution = "Good morning";
  }
  if (currentHour > 12 || currentHour < 18) {
    salution = "Good afternoon";
  } else {
    salution = "Good Evening";
  }

  greeting.textContent = salution;
}

// connect to api to get a quote when button is clicked
function generateQuote() {
  const buttonQuoteGenerator = document.querySelector(
    "#button-quote-generator"
  );

  buttonQuoteGenerator.addEventListener("click", handleGenerateQuote);
}

async function handleGenerateQuote() {
  // connect to API to generate the quote and display on card-content div
  const cardContent = document.querySelector("#content");

  const blockquote = createNodeElement("blockquote");
  const qt = createNodeElement("quote");
  const cite = createNodeElement("cite");

  cardContent.innerHTML = "";

  const results = await getApi();
  const data = results.map((item) => item);
  const index = generateRandomIndex(data.length);

  const quote = getDataAtIndex(data, index);

  qt.textContent = quote.text;
  cite.textContent = quote.author;

  blockquote.appendChild(qt);
  blockquote.appendChild(cite);
  cardContent.appendChild(blockquote);
}

function getDataAtIndex(data, index) {
  return data[index];
}

function createNodeElement(element) {
  return document.createElement(element);
}

function generateRandomIndex(number) {
  return Math.ceil(Math.random() * (number - 0)) + 0;
}
