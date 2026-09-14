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
    var index = 0;
    var dots = [];

    for (var d = 0; d < slides.children.length; d++) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to slide " + (d + 1));
      dot.addEventListener("click", (function (i) {
        return function () { index = i; update(); play(); };
      })(d));
      dotsBox.appendChild(dot);
      dots.push(dot);
    }

    function perView() {
      return 1;
    }

    function update() {
      var per = perView();
      carousel.setAttribute("data-per-view", per);
      var item = slides.querySelector(".carousel-item");
      var step = item ? item.getBoundingClientRect().width : 0;
      var maxIndex = slides.children.length - per;
      if (index > maxIndex) index = maxIndex;
      if (index < 0) index = 0;
      slides.style.transform = "translateX(-" + index * step + "px)";
      prev.disabled = index === 0;
      next.disabled = index === maxIndex;
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.toggle("active", i === index);
      }
      return maxIndex;
    }

    var timer;
    function play() {
      stop();
      timer = setInterval(function () {
        var maxIndex = slides.children.length - perView();
        index = index >= maxIndex ? 0 : index + 1;
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
      index--;
      update();
      play();
    });
    next.addEventListener("click", function () {
      index++;
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
