$(document).ready(function() {

	// E-mail Ajax Send
	$(".design-form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "../js/email/mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	$(".development-form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "../js/email/mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});
