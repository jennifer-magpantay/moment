window.addEventListener("load", () => {
  init();
});

function init() {
  changeBackgroundOnLoading();
  greetings();
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
  console.log("hello stramger");
}

// connect to api to get a quote when button is clicked
function displayQuote() {
  console.log("Be water - Bruce Lee");
}
