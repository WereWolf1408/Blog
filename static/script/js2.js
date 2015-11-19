function pagination_step(){
	return 9;
}
function ButtonClick(){
	var click = false;

	return {
		setClick: function(value){
			click = value;
		},

		getClick: function(){
			return click;
		}
	}
}

var buttonClick = ButtonClick();

function check_user_auth(){
	var login = $('#user_auth_log').val();
	var pass = $('#user_auth_pass').val();

	if(login == ""){
		$('#user_auth_log_lab').addClass('mark_red');
		$('#user_auth_log_lab').text("Null!");
	} else{
		$('#user_auth_log_lab').removeClass('mark_red');
		$('#user_auth_log_lab').text("Login");
	}
	if(pass == ""){
		$('#user_auth_pass_lab').addClass('mark_red');
		$('#user_auth_pass_lab').text("Null!");
	} else {
		$('#user_auth_pass_lab').removeClass('mark_red');
		$('#user_auth_pass_lab').text("Password");
	}
	return false;
}

// pagination functions

function press_first_button(){
	for (var i = 1; i < 9; i++){
		$('.pagination li:nth-child(' + i + ')').find('a').text(i);
	}
	$('.pagination li:nth-child(9)').find('a').text('...');
}

function press_last_button(){
	var last_element = $('.pagination li:last-child').text();
	var current_value = (last_element - 7) - 3;

	for (var i = 3; i <= 9; i++){
		$('.pagination li:nth-child(' + i + ')').find('a').text(current_value + i);
		console.log("i = ", current_value + i);
	}
	$('.pagination li:nth-child(2)').find('a').text('...');
}

function press_next_button(){
	var last_button_click = Number($('.pagination li:nth-child(8)').text());
	var last_button = Number($('.pagination li:last-child').text());
	console.log(last_button_click);
	
	if (last_button - (last_button_click + 6) <= 2){
		press_last_button();
	} else {
		for (var i = 3; i < 9; i++){
			$('.pagination li:nth-child(' + i + ')').find('a').text(last_button_click + 1);
			last_button_click = Number($('.pagination li:nth-child(' + i + ')').text());
		}
		$('.pagination li:nth-child(2)').find('a').text("...");	
	}
}

function press_prev_button(){
	var last_button_click = Number($('.pagination li:nth-child(3)').text());
	console.log(last_button_click);
	if (last_button_click - 6 <= 3){
		press_first_button();
	} else {
		for (var i = 8, q = 1; i >= 3; i--, q++){
			$('.pagination li:nth-child(' + i + ')').find('a').text(last_button_click - q);
			// last_button_click = Number($('.pagination li:nth-child(' + i + ')').text());
		}
		$('.pagination li:nth-child(9)').find('a').text("...");	
	} 
}