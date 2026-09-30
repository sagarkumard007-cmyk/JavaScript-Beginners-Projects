const result = document.getElementById("count");
const decreaseBtn = document.getElementById("decrease");
const reset = document.getElementById("reset");
const increaseBtn = document.getElementById("increase");
let count = 0;
decreaseBtn.addEventListener("click", () => {
  if (count > 0) {
    count--;
    result.innerHTML = count;
  }
});
increaseBtn.addEventListener("click",()=>{
  count++;
  result.innerHTML=count;
})
reset.addEventListener("click",()=>{
  result.innerHTML="0"
})
