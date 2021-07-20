import "./styles/main.scss";

let iteration = 0;

setInterval(() => {
  const heading = document.querySelector(".heading");
  heading.textContent = `Webpack Template ${iteration}`;
  ++iteration;
}, 5000);
