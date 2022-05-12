window.addEventListener("load", () => {
  console.log("loading page");
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
  console.log("call api and save it into html tags");
  // connect to API to generate the quote and display on card-content div
  const cardContent = document.querySelector("#card-content");
  const blockquote = document.createElement("blockquote");
  const q = document.createElement("q");
  const cite = document.createElement("cite");

  const results = await getQuotes();
  const data = results.map((item) => item);
  getQuoteAtIndex(data, 3);
}

function getQuoteAtIndex(data, index) {
  console.log(data[index]);
}

function getQuotes() {
  const URL = "https://type.fit/api/quotes";
  return returnFetchJson(URL);
}

// set a function that will deal with the errors and return the data JSON
async function returnFetchJson(url) {
  try {
    const response = await fetch(url);
    // if response is ok, then return response.json
    if (response.ok) {
      return response.json();
    } else {
      // throw a error
      throw new Error(response.statusText);
    }
  } catch (error) {
    throw error;
  }
}

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}
