;(function ($) {
  $(document).ready(() => {
    const form = $("form[name='mail']")
    form.validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        fullname: "required",
        email: {
          required: true,
          // Specify that email should be validated
          // by the built-in "email" rule
          email: true,
        },
        topic: {
          required: true,
          minlength: 5,
        },
        phone: "required",
      },
      // Specify validation error messages
      messages: {
        firstname: "Please enter your Full Name or Full name is missing",
        email: "Please enter your Email or Email is missing",
        topic: {
          required: "Please provide a Topic or Email is missing",
          minlength: "Your Topic must be at least 5 characters long",
        },
        content: "Please enter message or message is missing",
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function (form) {
        console.log("SUBMITTING")
        form.valid()
        // form.submit()
      },
    })

    $("#send-mail").click((e) => {
      e.preventDefault()
      console.log("THEEEESE NUTS")
      console.log(form.valid())
    })
  })
})(window.jQuery)
