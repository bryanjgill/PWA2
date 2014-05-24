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
		
 	var init = function(){
		checkLoginState();
	};
	init();
		
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
	$('#signinButton').click(function() {
		var user = $('#user').val();
		var pass = $('#pass').val();
		$.ajax({
			url:'xhr/login.php',
			type: 'post',
			dataType: 'json',
			data: {
				username: user,
				password: pass
			},
			success:function(response) {
					console.log("Test User");
					if(response.error) {
						alert(response.error);
					} else {
						window.location.assign('dashboard.html')
					};
				}
		});
	});
	
	/*
	===============================================
	Display Username
	*/
	$.getJSON("xhr/check_login.php", function (data){
		$.each(data, function(key, val){
			$(".userid").html("Welcome: " + val.first_name);
		})
	});
	/*
	===============================================
	Logout
	*/	
	$('#logOut').click(function(e){
		e.preventDefault;
		$.get('xhr/logout.php', function(){
			window.location.assign('index.html')
		})
	});
	/*
	===============================================
	Registration
	*/
	$('#register').on('click', function(){
		var	firstname = $('#firstname').val(),
				lastname = $('#lastname').val(),
				username = $('#username').val(),
				email = $('#email').val(),
				password = $('#password').val();
		$.ajax({
			url: 'xhr/register.php',
			type: 'post',
			dataType: 'json',
			data: {
				firstname: firstname,
				lastname: lastname,
				username: username,
				email: email,
				password: password,
			},
				success: function(response){
					if (response.error) {
						alert(response.error);
				} else {
					window.location.assign('dashboard.html')
				};
			}
		});
	});
	/*
	===============================================
	Go to projects page
	*/	
	$('.projectsbtn').on('click', function(e){
		e.preventDefault();
		window.location.assign('projects.html');
	});
	/*
	===============================================
	Go to add projects page
	*/
	$('.addbtn').on('click', function(e){
		e.preventDefault();
		window.location.assign('add.html');
	});
	/*
	===============================================
	Go to admin page
	*/
	$('.dashboard').on('click', function(e){
		e.preventDefault();
		window.location.assign('dashboard.html');
	});
	/*
	===============================================
	Go to users page
	*/
	$('.users').on('click', function(e){
		e.preventDefault();
		window.location.assign('users.html');
	});
	/*
	===============================================
	Go to tasks page
	*/
	$('.tasks').on('click', function(e){
		e.preventDefault();
		window.location.assign('tasks.html');
	});
		/*
	===============================================
	Delete button
	*/
	$('.delete').on('click', function(e){
		e.preventDefault();
		window.location.assign('projects.html');
	});
	/*
	===============================================
	New Projects
	*/
	$('#addButton').on('click', function (e){
		e.preventDefault();
		var	projName = $('#projectName').val(),
				projDesc = $('#projectDescription').val(),
				projDue = $('#projectDueDate').val(),
				status = $('#projectStatus').val();
		
		$.ajax({
			url: "xhr/new_project.php",
			type: 'post',
			dataType: 'json',
			data: {
				projectName: projName,
				projectDescription: projDesc,
				dueDate: projDue,
				status: status
			},
			success: function(response) {
				if(response.error) {
					alert(response.error);
				} else {
					window.location.assign("projects.html");
				};
			}
		});
	});
		/*
	===============================================
	New Tasks
	*/
	$('#addButton').on('click', function (e){
		e.preventDefault();
		var	taskName = $('#taskName').val(),
				taskDesc = $('#taskDescription').val(),
				taskDue = $('#taskDueDate').val(),
				status = $('#taskStatus').val();
		
		$.ajax({
			url: "xhr/new_task.php",
			type: 'post',
			dataType: 'json',
			data: {
				taskName: taskName,
				taskDescription: taskDesc,
				dueDate: taskDue,
				status: status
			},
			success: function(response) {
				if(response.error) {
					alert(response.error);
				} else {
					window.location.assign("tasks.html");
				};
			}
		});
	});
	/*
	===============================================
	Get Projects
	*/
	var projects = function () {
		$.ajax({
			url: 'xhr/get_projects.php',
			type: 'get',
			dataType: 'json',
			success: function (response) {
				if (response.error){
					console.log(response);
			} else {
				for(var i=0, j=response.projects.length; i < j; i++){
					var result = response.projects[i];
					$(".projects").append(
						'<div style="border: 1px solid black; text-align: left;">' + " Project ID: " + result.id + "<br>" + " Project Name: " + result.projectName + "<br>" + " Project Description: " + result.projectDescription + "<br>" + " Project Status: " + result.status + "<br>" + '<button class="deletebtn">Delete</button>' + '</div> <br>'
					);
				};
				$('.deletebtn').on('click', function (e) {
					console.log('test delete');
					$.ajax({
						url: 'xhr/delete_project.php',
						data: {
							projectID: result.id
						},
						type: 'post',
						dataType: 'json',
						success: function (response){
							if (response.error) {
								alert(response.error);
							} else {
								window.location.assign("projects.html");
							};
						}
					});
				});
			}
			}
		})
	}
	projects();
	/*
	===============================================
	Get Tasks
	*/
	var tasks = function () {
		$.ajax({
			url: 'xhr/get_tasks.php',
			type: 'get',
			dataType: 'json',
			success: function (response) {
				if (response.error){
					console.log(response);
			} else {
				for(var i=0, j=response.tasks.length; i < j; i++){
					var result = response.tasks[i];
					$(".tasks").append(
						'<div style="border: 1px solid black; text-align: left;">' + " Task ID: " + result.id + "<br>" + " Task Name: " + result.taskName + "<br>" + " Task Description: " + result.taskDescription + "<br>" + " Task Status: " + result.status + "<br>" + '<button class="deletebtn">Delete</button>' + '</div> <br>'
					);
				};
				$('.deletebtn').on('click', function (e) {
					console.log('test delete');
					$.ajax({
						url: 'xhr/delete_task.php',
						data: {
							taskID: result.id
						},
						type: 'post',
						dataType: 'json',
						success: function (response){
							if (response.error) {
								alert(response.error);
							} else {
								window.location.assign("tasks.html");
							};
						}
					});
				});
			}
			}
		})
	}
	tasks();
	/*
	===============================================
	Date Picker
	*/
	
	/*
	===============================================
	Status
	
	/*
	===============================================
	Template for Project ID Name
	*/	
	
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




