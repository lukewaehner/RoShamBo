const parallax_el = document.querySelectorAll(".parallax");

let isResizing = false;

let xValue = 0,
  yValue = 0;

let rotateDegree = 0;

function update(cursorPosition) {
  if (isResizing) {
    return;
  }
  parallax_el.forEach((el) => {
    let speedx = parseFloat(el.dataset.speedx);
    let speedy = parseFloat(el.dataset.speedy);
    let speedz = parseFloat(el.dataset.speedz);
    let rotateSpeed = el.dataset.rotation;

    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue =
      (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

    el.style.transform = `translateX(calc(-50% + ${
      -xValue * speedx
    }px)) rotateY(${rotateDegree * rotateSpeed}deg) translateY(calc(-50% + ${
      yValue * speedy
    }px)) perspective(2300px) translateZ(${zValue * speedz}px)`;
  });
}

update(0);

//wrap this
window.addEventListener("mousemove", (e) => {
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  update(e.clientX);
});
//wrap this

let timeline = gsap.timeline();

parallax_el.forEach((el) => {
  let distance = parseFloat(el.dataset.distance);
  if (isNaN(distance)) {
    distance = 0;
  }

  timeline.from(
    el,
    {
      top: `${el.offsetHeight / 2 + distance}px`,
      duration: 2,
    },
    0
  );
});

// Perfomance tinkering

function debounce(func, delay) {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
}

// Debounced resize event listener
window.addEventListener(
  "resize",
  debounce(function () {
    // When resizing is done
    isResizing = false;
  }, 1000)
); // 500ms debounce period

// Non-debounced resize event listener to set the resizing flag
window.addEventListener("resize", function () {
  isResizing = true;
});
