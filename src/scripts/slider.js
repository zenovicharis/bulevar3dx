;(function ($) {
  $.fn.slider = function () {
    // const $leftArrow
    const self = this
    const [leftArrow] = $(this).find("#left")
    const [rightArrow] = $(this).find("#right")
    const [row] = $(this).find(".row-promo")

    let elements = $(this).find(".elements")
    let firstElement = elements[0]
    $(firstElement)
      .clone()
      .attr("class", "")
      .addClass("elements element-4")
      .appendTo(row)
    const lastElement = elements[elements.length - 1]
    $(lastElement)
      .clone()
      .attr("class", "")
      .addClass("elements element-0")
      .prependTo(row)
    this.clearDoubles = () => {
      let zero = $(this).find(".element-0")

      if (zero.length > 1) {
        $(zero).first().remove()
      }
      let fourth = $(this).find(".element-4")

      if (fourth.length > 1) {
        $(fourth).last().remove()
      }
    }

    $(leftArrow).click(() => {
      this.clearDoubles()
      let currentElements = $(this).find(".elements")
      let currentFirstElement = currentElements.first()
      currentElements = currentElements.toArray()
      currentElements.shift()

      for (let [i, element] of currentElements.entries()) {
        $(element).attr("class", "")
        $(element).addClass(`elements element-${i}`)
      }
      $(currentFirstElement)
        .clone()
        .attr("class", "")
        .addClass("elements element-4")
        .appendTo(row)
    })

    $(rightArrow).click(() => {
      this.clearDoubles()
      let currentElements = $(this).find(".elements")
      let currentLastElement = currentElements.last()
      currentElements = currentElements.toArray()
      currentElements.pop()

      for (let [i, element] of currentElements.entries()) {
        $(element).attr("class", "")
        $(element).addClass(`elements element-${i + 1}`)
      }
      $(currentLastElement)
        .clone()
        .attr("class", "")
        .addClass("elements element-0")
        .prependTo(row)
    })

    return this
  }
})(window.jQuery)
