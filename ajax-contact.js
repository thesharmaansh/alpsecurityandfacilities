$(document).ready(function () {

	$("#formail").submit(function (e) {

		e.preventDefault();

		var valid = '';
		var isr = ' is required.';
		var name = $("#name").val();
		var email = $("#email").val();
		var phone = $("#phone").val();
		var query = $("#query").val();

		if (name.length < 1) {
			valid += '<br />Full Name' + isr;
		}
		if (!email.match(/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$)/i)) {
			valid += '<br />A valid email' + isr;
		}
		if (!phone.match(/^[0-9\-()+ ]+$/)) {
			valid += '<br />A valid contact number' + isr;
		}

		if (query.length < 1) {
			valid += '<br />Message' + isr;
		}
		//alert(valid);
		if (valid != "") {
			$("#response").fadeIn("slow");
			$("#response").html("Error!" + valid);

		} else {

			dataString = $("#formail").serialize();
			$.ajax({
				type: "POST",
				url: "sw-send-contact.php",
				data: dataString,
				dataType: "json",
				success: function (data) {

					if (data.value == "Error") {
						$("#response").css("display", "block");
						$("#response").html("<p>Error! Fill the Captcha</p>");
					} else if (data.value == "Yes") {
						$("#response").fadeIn("slow");
						$("#response").css("display", "block");
						$("#response").html("<p>Your message has been sent successfully.</p>");
						setTimeout('$("#response").fadeOut("slow")', 10000);
						$("#name").val("");
						$("#email").val("");
						$("#phone").val("");
						$("#query").val("");
					} else {
						$("#response").html("<p>Error! All fields are mandatory.</p>");
					}
				}
			});
		}
	});
});