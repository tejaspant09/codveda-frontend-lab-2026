import { changeCount } from "./logic.js";

let count = 0;
const output = document.querySelector("#count");
const decrement = document.querySelector("#decrement");

function render() {
  output.textContent = count;
  decrement.disabled = count === 0;
}

document.querySelector("#increment").addEventListener("click", () => {
  count = changeCount(count, 1);
  render();
});
decrement.addEventListener("click", () => {
  count = changeCount(count, -1);
  render();
});
document.querySelector("#reset").addEventListener("click", () => {
  count = 0;
  render();
});
render();
