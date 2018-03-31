import '../style/main.scss';
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
    .css("padding-bottom", "0");
  
    $("#ordinacija").on("click", openFirstLink);
  $("#xray").on("click", openFirstLink);

  $("#right").attr('style',styleRightArrow);
  $("#left").attr('style', styleLeftArrow);

  var currentPhoto = 0;
  $("#left").on("click",function(e){
    e.preventDefault()
    console.log("left");
    changePhoto("right")
  })

  $("#right").on("click",function(e){
    e.preventDefault()
    console.log("right");
    changePhoto("right");
  })

  function changePhoto(direction){
    var spheres = $(".spheric");
    spheres.css("display","none");
    var next;
    var nextSlide;
    if(direction == "right"){
      nextSlide = currentPhoto + 1 >= spheres.length ? 0 : currentPhoto + 1
      next = $(".spheric")[nextSlide];
    }
    else{
      nextSlide = currentPhoto - 1 <= 0 ? spheres.length - 1 : currentPhoto - 1
      next = $(".spheric")[nextSlide];
    }
    currentPhoto = nextSlide;
    $(next).css("display","block");
  }

  function openFirstLink() {
    console.log("Clicked");
    var link = $(this).find('a');
    link[0].click();
  }
  var styleRightArrow = 
  `position: absolute;
    top: 0em;
    right: 1em;
    padding: 4em 1em;
    font-size: 2em;
    color:#fff;`;

  var styleLeftArrow = 
    `position: absolute;
    top: 0em;
    left: 1em;
    font-size: 2em;
    padding: 4em 1em;
    color:#fff;
    -webkit-transform: scaleX(-1);transform: scaleX(-1);`;


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
      submitHandler: function(form) {
        console.log("hello")
        // $(form).ajaxSubmit();
      }
    });
})