 window.addEventListener('popstate', function(e) {
 	var url = location.pathname;
 	console.log(url)
 	$.ajax({
    	url: url,
    	type: 'POST',
    	success: function(data){
    		console.log(data);
    	}
    })
 })
$('#button1').on('click', function(event){
    $.ajax({
    	url: 'example/page1',
    	type: 'POST',
    	success: function(data){
    		history.pushState({value: "enot"}, null, "example/page1");
    		console.log(data);
    	}
    })
	return false;
})
$('#button2').on('click', function(event){
	 $.ajax({
    	url: 'example/page2',
    	type: 'POST',
    	success: function(data){
    		history.pushState({value: "enot"}, null, "example/page2");
    		console.log(data);
    	}
    })
	return false;
})
$('#button3').on('click', function(event){
	 $.ajax({
    	url: 'example/page3',
    	type: 'POST',
    	success: function(data){
    		history.pushState({value: "enot"}, null, 'example/page3');
    		console.log(data);
    	}
    })
	return false;
})