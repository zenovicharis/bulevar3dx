;(function ($) {
  $(document).ready(() => {
    var lastId
    var topMenu = $("#header")
    var topMenuHeight = topMenu.outerHeight() + 15

    var menuItems = topMenu.find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"))
        if (item.length) {
          return item
        }
      })
    // Bind to scroll
    $(window).scroll(function () {
      // Get container scroll position
      var fromTop = $(this).scrollTop() + topMenuHeight

      // Get id of current scroll item
      var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop) return this
      })
      // Get the id of the current element
      cur = cur[cur.length - 1]
      var id = cur && cur.length ? cur[0].id : ""

      if (lastId !== id) {
        lastId = id
        // Set/remove active class
        menuItems
          .removeClass("active")
          .filter("[href='#" + id + "']")
          .addClass("active")
      }
    })

    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .not('[href="#tab-residential"]')
      .not('[href="#tab-commercial"]')
      .not('[href="#tab-buildings"]')
      .not('[href="#carousel-desktop"]')
      .not('[href="#carousel-mobile"]')
      .not('[href="#banner-slider-captions"]')
      .click(function (event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash)
          target = target.length
            ? target
            : $("[name=" + this.hash.slice(1) + "]")
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault()
            $("html, body").animate(
              {
                scrollTop: target.offset().top,
              },
              1000,
              function () {
                // Callback after animation
                // Must change focus!
                var $target = $(target)
                $target.focus()
                if ($target.is(":focus")) {
                  // Checking if the target was focused
                  return false
                } else {
                  $target.attr("tabindex", "-1") // Adding tabindex for elements not focusable
                  $target.focus() // Set focus again
                }
              }
            )
          }
        }
      })
  })
})(window.jQuery)
