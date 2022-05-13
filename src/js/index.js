import { linearGradient } from "../data/gradient.js";
import { getApi } from "../services/getApi.js";
import { getDate } from "../services/getDate.js";

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
  body.style.backgroundImage =
    "linear-gradient(to right, #fa709a 0%, #fee140 100%)";
}

// greeting user according to the time of the day
function greetings() {
  const greeting = document.querySelector("#greeting");
  greeting.textContent = "Good morning or good night";
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

  const quote = getQuoteAtIndex(data, index);

  qt.textContent = quote.text;
  cite.textContent = quote.author;
  console.log(qt, cite);

  blockquote.appendChild(qt);
  blockquote.appendChild(cite);
  cardContent.appendChild(blockquote);
}

function getQuoteAtIndex(data, index) {
  return data[index];
}

function createNodeElement(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function generateRandomIndex(number) {
  return Math.ceil(Math.random() * (number - 0)) + 0;
}
