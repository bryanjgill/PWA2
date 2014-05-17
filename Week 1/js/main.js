/*  
	Your Project Title
	Author: Bryan J. Gill, MCNPS, S+
*/

(function($){
	
	
	/*
	===============================================
	APPLICATION FUNCTIONS	
	*/
	
	
	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				// if user, loadApp()
				// if error, loadLanding()
			}
		});
	};
	
	

	// 	============================================
	//	SETUP FOR INIT
		
/* 	var init = function(){
	
		checkLoginState();
	};
	
	
	init();
 */	
		
	/*
	===============================================
	EVENTS	
	*/
	
	
	/*	
	===============================================
	END EVENTS 
	*/
		
		
	/*
	===============================================
	Login
	*/
	$('signinButton').click(function() {
		var user = $('#user').val();
		var pass = $('#pass').val();
		console.log("This notifies you if the password is working");
		$ajax({
			url:'xhr/login.php',
			type: 'post',
			dataType: 'json',
			data: {
				username: user,
				password: pass
			},
			successful:function(response) {
					console.log("Test User");
					if(response.error) {
						alert(response.error);
					} else {
						window.location.assign('dashboard.html');
					}
				}
		});
	});
	
	/*
	===============================================
	Date Picker
	*/
	/* $( "#projectDueDate" ).datepicker({
		showOn: "button",
		buttonImage: "images/buttons/cal.jpg",
		buttonImageOnly: true
	}); */
	/*
	===============================================
	Status
	*/
	/* $( "#selectable" ).selectable();
	$( "#projectStatus" ).buttonset(); */
	/*
	===============================================
	Template for Project ID Name
	*/	
	/* $(function() {
		$( "#sortable" ).sortable();
		$( "#sortable" ).disableSelection();
	}) */
	/*
	===============================================
	Modal
	*/
	$('.modalClick').on('click', function(event) {
		event.preventDefault();
		$('#overlay')
			.fadeIn()
			.find('#modal')
			.fadeIn();
	});
	$('.close').on('click', function(event) {
		event.preventDefault();
		$('#overlay')
		.fadeOut()
		.find('#modal')
		.fadeOut();
	});
	/*
	/*
	===============================================
	Button Hover Effect
	*/
	$('.myStatus').mouseover(function() {
		$(this).fadeTo(100, 0.3);
	});
	$('.myStatus').mouseout(function() {
		$(this).fadeTo(100, 1);
	});
	/*
	===============================================
	Tabs
	*/
	$('ul.tabs').each(function(){
		var $active, $content, $links =$(this).find('a');
		$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		$active.addClass('active');
		$content = $($active[0].hash);
		$links.not($active).each(function() {
			$(this.hash).hide();
		});
		$(this).on('click', 'a', function(e) {
			$active.removeClass('active');
			$content.hide();
			$active = $(this);
			$content = $(this.hash);
			$active.addClass('active');
			$content.show();
			e.preventDefault();
		});
	});
	/*
	===============================================
	Tooltip
	*/
	$('.masterTooltip').hover(function(){
		var title = $(this).attr('title');
		$(this).data('tipText', title).removeAttr('title');
		$('<p class="tooltip"> </p>')
		.text(title)
		.appendTo('body')
		.fadeIn('slow');
	}, function() {
		$(this).attr('title', $(this).data('tipText'));
		$('.tooltip').remove();
	}).mousemove(function(e) {
		var mousex = e.pageX + 20;
		var mousey = e.pageY + 10;
		$('.tooltip')
		.css({ top: mousey, left: mousex });
	});
	
})(jQuery); // end private scope




