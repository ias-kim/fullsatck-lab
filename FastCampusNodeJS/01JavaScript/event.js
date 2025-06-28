window.onload = function () {
  // 문서가 load 될 때 이 함수를 실행
  let text = document.getElementById('text');
  // 아이디가 'text'인 요소를 return

  text.innerText = '문서가 로드 되었다.';
};

const aElement = document.querySelector('a');

aElement.addEventListener('click', () => {
  alert('엘리먼트 클릭!');
});

const btnElement = document.querySelector('.btn');
btnElement.addEventListener('click', (event) => {
  let val;
  val = event.target;
  val = event.target.id;
  val = event.target.className;
  val = event.target.classList;

  val = event.type;

  // 윈도우로부터의 거리 좌표
  val = event.clientY;
  // 요소로부터 거리 좌표
  val = event.offsetY;

  console.log(val);
});

const submitBtn = document.querySelector('.submit-btn');
const form = document.querySelector('.form');
const title = document.querySelector('h2');

// click event
submitBtn.addEventListener('click', handleEvent);
submitBtn.addEventListener('dblclick', handleEvent);
submitBtn.addEventListener('mousedown', handleEvent);
submitBtn.addEventListener('mouseup', handleEvent);
submitBtn.addEventListener('mouseenter', handleEvent);
submitBtn.addEventListener('mouseleave', handleEvent);
submitBtn.addEventListener('mousemove', handleEvent);

// form event
const emailInput = document.getElementById('email');
form.addEventListener('submit', handleEvent);
emailInput.addEventListener('keydown', handleEvent);
emailInput.addEventListener('keyup', handleEvent);
emailInput.addEventListener('keypress', handleEvent);

// event
function handleEvent(e) {
  if (e.type === 'submit') {
    e.preventDefault();
  }
  console.log(`Event type: ${e.type}`);
  // title.textContent = `MousX: ${e.offsetX} MouseY: ${e.offsetY}`;
  title.textContent = e.target.value;
}
