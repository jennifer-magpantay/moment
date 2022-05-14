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

// changing gradient background when the page is loded
function changeBackgroundOnLoading() {
  const body = document.querySelector("body");
  // save the data into a variable
  const data = linearGradient.map((item) => item);
  // generate a random index based on data length
  const index = generateRandomIndex(data.length);
  // get the data at the generated index
  const gradientBackground = getDataAtIndex(data, index);
  // add it as style prop in the body
  body.style.backgroundImage = gradientBackground.gradient;
}

// greeting user according to the time of the day
function greetings() {
  const greeting = document.querySelector("#greeting");
  // get the current hours
  const currentHour = getHour();
  // set conditions to display the salution according to the period pf the day
  let salution = "";
  if (currentHour < 12) {
    salution = "Good morning";
  }
  if (currentHour > 12 || currentHour < 18) {
    salution = "Good afternoon";
  } else {
    salution = "Good Evening";
  }
  // add the result to the as text content
  greeting.textContent = salution;
}

// connect to api to get a quote when button is clicked
function generateQuote() {
  const buttonQuoteGenerator = document.querySelector(
    "#button-quote-generator"
  );
  // add events to button: to display the quote and to expand the container
  buttonQuoteGenerator.addEventListener("click", () => {
    handleGenerateQuote(), handleContentExpanding();
  });
}

// connect to API to generate the quote and display on card-content div
async function handleGenerateQuote() {
  const cardContent = document.querySelector("#content");

  const blockquote = createNodeElement("blockquote");
  const qt = createNodeElement("quote");
  const cite = createNodeElement("cite");

  cardContent.innerHTML = "";
  // connect to the api
  const results = await getApi();
  // save the results into a variable
  const data = results.map((item) => item);
  // generate a random index based on data length
  const index = generateRandomIndex(data.length);
  // get quote at the generated index
  const quote = getDataAtIndex(data, index);
  // display on elements
  qt.textContent = quote.text;
  cite.textContent = quote.author === null ? "Unknown" : quote.author;

  blockquote.appendChild(qt);
  blockquote.appendChild(cite);
  cardContent.appendChild(blockquote);
}

// smoothly expand the content container
function handleContentExpanding() {
  const card = document.querySelector("#card");
  const greeting = document.querySelector("#card--greeting");
  const button = document.querySelector("#button-quote-generator");

  // add/remove classes for style and disabled elements when button is clicked
  card.classList.add("expand");
  greeting.style.margin = "0 0 1rem 0";
  // button.setAttribute("disabled", true);

  // set a timeout to reset elements after 15s time
  const removeClasses = () => {
    card.classList.remove("expand");
    greeting.style.margin = "0 0 0 0";
    button.removeAttribute("disabled", false);
  };

  setTimeout(removeClasses, 15000);
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
