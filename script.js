document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }

  var form = document.getElementById("inquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = document.getElementById("form-success");
      form.style.display = "none";
      if (success) success.classList.add("show");
    });
  }

  var heroButtons = document.querySelectorAll(".hero-actions a");
  for (var i = 0; i < heroButtons.length; i++) {
    heroButtons[i].addEventListener("click", function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      window.location.href = this.getAttribute("href");
    });
  }

  var carousel = document.getElementById("productCarousel");
  if (carousel) {
    var slides = document.getElementById("productCarouselSlides");
    var dotsBox = document.getElementById("carouselDots");
    var prev = carousel.querySelector(".carousel-prev");
    var next = carousel.querySelector(".carousel-next");
    var dots = [];
    var slideCount = slides.children.length;
    var index = 0;
    var dragStartX = 0;
    var dragCurrentX = 0;
    var isDragging = false;

    for (var d = 0; d < slideCount; d++) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to slide " + (d + 1));
      dot.addEventListener("click", (function (i) {
        return function () { index = i; update(); play(); };
      })(d));
      dotsBox.appendChild(dot);
      dots.push(dot);
    }

    function update() {
      for (var i = 0; i < slides.children.length; i++) {
        slides.children[i].classList.toggle("active", i === index);
      }

      for (var j = 0; j < dots.length; j++) {
        dots[j].classList.toggle("active", j === index);
      }
    }

    function goToNext() {
      index = (index + 1) % slideCount;
      update();
      play();
    }

    function goToPrevious() {
      index = (index - 1 + slideCount) % slideCount;
      update();
      play();
    }

    var timer;
    function play() {
      stop();
      timer = setInterval(function () {
        index = (index + 1) % slideCount;
        update();
      }, 4000);
    }
    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    if (prev) {
      prev.addEventListener("click", function () {
        goToPrevious();
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        goToNext();
      });
    }

    carousel.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (event.target.closest && event.target.closest("a, button")) return;
      isDragging = true;
      dragStartX = event.clientX;
      dragCurrentX = event.clientX;
      stop();
      if (carousel.setPointerCapture) {
        carousel.setPointerCapture(event.pointerId);
      }
    });

    carousel.addEventListener("pointermove", function (event) {
      if (!isDragging) return;
      dragCurrentX = event.clientX;
    });

    carousel.addEventListener("pointerup", function () {
      if (!isDragging) return;
      var delta = dragCurrentX - dragStartX;
      if (Math.abs(delta) > 55) {
        if (delta < 0) {
          goToNext();
        } else {
          goToPrevious();
        }
      } else {
        play();
      }
      isDragging = false;
    });

    carousel.addEventListener("pointerleave", function () {
      if (!isDragging) return;
      isDragging = false;
      play();
    });

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", play);
    window.addEventListener("resize", function () {
      update();
      play();
    });
    update();
    play();
  }
});
