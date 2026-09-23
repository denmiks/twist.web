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

  var carousel = document.getElementById("productCarousel");
  if (carousel) {
    var slides = document.getElementById("productCarouselSlides");
    var dotsBox = document.getElementById("carouselDots");
    var prev = carousel.querySelector(".carousel-prev");
    var next = carousel.querySelector(".carousel-next");
    var dots = [];
    var slideCount = slides.children.length;
    var index = 0;

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

    prev.addEventListener("click", function () {
      index = (index - 1 + slideCount) % slideCount;
      update();
      play();
    });
    next.addEventListener("click", function () {
      index = (index + 1) % slideCount;
      update();
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
