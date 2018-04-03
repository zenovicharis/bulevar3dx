import '../style/main.scss';
import '../favicon.ico';
import '../../node_modules/lightbox2/dist/css/lightbox.css';
import '../../node_modules/lightbox2/dist/js/lightbox.js';
import '../../node_modules/jquery-validation/dist/jquery.validate.js';

$(document).ready(function () {

  $("body").css("display", "block");

  $(".menu-container").on("click", function (e) {
    $(".select-drop").slideToggle();
  });

  var views = $(".spheric");
  views.hide();

  $("#first").show().css("overflow", "hidden");
  $(".modal-content").css("padding", "7px")
    .css(`
    padding-bottom:0;
    width:940px;
    height:650px;
    `);

  $("#ordinacija").on("click", openFirstLink);
  $("#xray").on("click", openFirstLink);


  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 150) {
        $("header").addClass("small-header");
    } else {
        $("header").removeClass("small-header");
    }
})
  // $("#right").attr('style', styleRightArrow);
  // $("#left").attr('style', styleLeftArrow);

  var currentPhoto = 0;
  $("#left").on("click", function (e) {
    e.preventDefault()
    console.log("left");
    changePhoto("right")
  })

  $("#right").on("click", function (e) {
    e.preventDefault()
    console.log("right");
    changePhoto("right");
  })

  function changePhoto(direction) {
    var spheres = $(".spheric");
    spheres.css("display", "none");
    var next;
    var nextSlide;
    if (direction == "right") {
      nextSlide = currentPhoto + 1 >= spheres.length ? 0 : currentPhoto + 1
      next = $(".spheric")[nextSlide];
    } else {
      nextSlide = currentPhoto - 1 <= 0 ? spheres.length - 1 : currentPhoto - 1
      next = $(".spheric")[nextSlide];
    }
    currentPhoto = nextSlide;
    $(next).css("display", "block");
  }

  function openFirstLink() {
    console.log("Clicked");
    var link = $(this).find('a');
    link[0].click();
  }


  $("#contactForm").validate({
    rules: {
      // simple rule, converted to {required:true}
      "cname": "required",
      // compound rule
      "cemail": {
        required: true,
        email: true
      }
    },
    submitHandler: function (form) {
      console.log("hello")
      // $(form).ajaxSubmit();
    }
  });


  // Select all links with hashes
  $('a.link')
    // Remove links that don't actually link to anything
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
})