/*обрабатывает события браузера такие как назатие на клавиши "вперед" "назад"
back*/
window.addEventListener('popstate', function(event) {
	if(event.state == null){
		console.log(url);
		window.location.href = '/blog';
	} else {
		var url = event.state.url;
		var data = event.state.data;
		console.log(url, data);
		
		$.ajax({
			url: url,
			type: "POST",
			data: {page: data},
			success: function(data){
				console.log(data);
				$('.progress').css({"display": "none"})
				$('#body_action').html(data);
			},
			beforeSend: function(){
				$('.progress').css({"display": "block"})
			}
		})
	}
})

$('.pagination').click(function(event){
	elem = event.target;
	$.ajax({
		url:'page',
		type:'POST',
		data:{page:elem.text},
		success:function(data){
			console.log(data);
			history.pushState({data: elem.text, url: 'blog/page'}, null, "page?page=" + elem.text);
			$('.progress').css({"display": "none"})
			$('#body_action').html(data);
			$("html, body").animate({"scrollTop": $('#body_action').offset().top}, 0);
		},
		beforeSend: function(){
			$('.progress').css({"display": "block"})
			
		}
	})
})

$('.close').click(function(event){
	 $(".user_registration").animate({opacity: 0}, 500, 
	 	function(){
	 		$(".user_registration").removeClass('visible');	
	 	});
	return false;
})

$('#registration').click(function(event){
	$('.user_registration').addClass('visible');
	$('.user_registration').animate({opacity:1}, 500);
	return false;
})

$('#send_user_auth').click(function(event){
	check_user_auth();
	return false;
})

$('.pagination').click(function(event){
	elem = event.target;
	press_button = elem.text
	first_button = $('.pagination li:first-child').text();
	last_button = $('.pagination li:last-child').text();
	prev_button = $('.pagination li:nth-child(3)').text();
	next_button = $('.pagination li:nth-child(8)').text();
	points_next_button = $('.pagination li:nth-child(9)').text();
	points_prev_button = $('.pagination li:nth-child(2)').text();
	// console.log("press button = ", press_button);
	// console.log("first button = ", first_button);
	// console.log("last button = ", last_button);
	// console.log("prev button = ", prev_button);
	// console.log("next button = ", next_button);

	if (press_button == first_button){
		console.log("function first button");
		press_first_button();
	} else if (press_button == last_button) {
		console.log("function last button");
		press_last_button();
	} else if (press_button == prev_button && points_prev_button == "..."){
		console.log("function prev");
		press_prev_button();
	} else if (press_button == next_button && points_next_button == "..."){
		console.log("function next");
		press_next_button();
	} 
})

$('#login').click(function(event){
	console.log('login click')
	 $('.user_authentication').addClass('visible');
	 $('.user_authentication').animate({opacity:1}, 500)
	return false;
})

$('.close_user_auth').click(function(event){
	$('.user_authentication').animate({opacity:0}, 500,
		function(){
			$(".user_authentication").removeClass('visible');	
		});
	return false;
})

$('.send_user_auth').click(function(event){
	var login = $('#user_auth_log').val();
	var pass = $('#user_auth_pass').val();

	$.ajax({
		url:'login_user',
		type:'POST',
		data:{login: login, pass: pass},
		success: function(data){
			$('.progress').css({"display": "none"})
			if(data == 'ok'){
				window.location.href = 'blog'
			}
		},
		beforeSend: function(){
			$('.progress').css({"display": "block"})
		}
	})
	return false;
})

$('#logout').on('click', function(event){
	$.ajax({
		url: "logout",
		type: "POST",
		success: function(data){
			console.log(data)
			if(data == 'logout'){
				$('.progress').css({"display": "none"})
				console.log(data)
				window.location.href = 'blog';
			}
		},
		beforeSend: function(){
			$('.progress').css({"display": "block"})
		}
	})

	return false;
})

$('#body_action').on('click', function(event){
	if ($(event.target).html() == 'More'){
		var pub_id = $(event.target).attr('name');
		$.ajax({
			url: "/body_more/",
			type: "POST",
			data: {publication_id: pub_id},
			success: function(data){
				console.log(data);
				$('.progress').css({"display": "none"})
				$('#body_action').html(data)
				$("html, body").animate({"scrollTop": $('#body_action').offset().top}, 0);
				history.pushState({data: pub_id, url: "body_more"}, null, 'body_more');
			},
			beforeSend: function(){
				$('.progress').css({"display": "block"})
			}
		})
	}
	return false;
})



$('.header_right_button_group').on('click', function(event){
	if ($(event.target).html() == 'Search'){
		console.log('search');
		if(buttonClick.getClick() == false){
			$('.search').css({"display": "block"});
			buttonClick.setClick(true);
			$('.search').animate({"opacity": "1"}, 500);	
		} else {
			$('.search').animate({"opacity": "0"}, 500, 
			function(){
				$('.search').css({"display": "none"});
				buttonClick.setClick(false);
			});
		}
	}
	return false;
})

/*seach*/
$('.search_button').on('click', function(event){
	var value = $("#search_text").val(); 
	if(value != ""){
		$.ajax({
		url: "search",
		type: "POST",
		data:{value: value},
		success: function(data){
			console.log(data)
			}
		})	
	}
	return false;
})
/*end search*/
$('#body_action').on('click', function(){
	if ($(event.target).html() == 'Send'){
		var value = $('#coment_text').val();
		var pub_id = $('#sc_button').attr('name');
		console.log('coment_send');
		$.ajax({
			url: "save_coment",
			type: "POST",
			data: {comentText: value, publication_id: pub_id},
			success: function(data){
				$('.progress').css({"display": "none"})
				console.log(data);
				$('#past_coment_body').html(data)
			},
			beforeSend: function(){
				$('.progress').css({"display": "block"})
			}
		})
	}
	return false;
})

$('#main_Page').on('click', function(){
	window.location.href = "/blog";
	return false;
})

$('#cool_click').on('click', function(event){
	$.ajax({
		url: "cool",
		type: "POST",
		success: function(data){
			console.log(data);
		}

	})
	return false;
})