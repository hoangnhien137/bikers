$(document).ready(function() {
	// Toggle Active Menu
	$('#current-menu').on('click','.single-menu .menu-collapse',function(e){
		$(this).parent().toggleClass('active');
	});
	// Menu
	$('#add-menu-btn').click(function(){
		$('#add-menu-form').show();
	})
	$("#add-menu-form").submit(function(e) {
		e.preventDefault();
		console.log('submit');
		$.ajax({
		  type: "POST",
		  url: window.globalAjax,
		  data: $(this).serialize(),
		  success: function(response){
			  response = JSON.parse(response);
			  var data = response['data'];
			  $('#add-menu-form').hide();
			  var $htmlNewMenu = $('#clone-container .single-menu').clone();
			  $htmlNewMenu.data('menuid', data.id);
			  $htmlNewMenu.find('.menu-title').html(data.name);
			  $htmlNewMenu.find('input[name=_menuid]').val(data.id);
			  console.log($htmlNewMenu.data('menuid'));
			  $('#current-menu').append(
					  $htmlNewMenu
			  );
		  },
		});
	});
	$('#current-menu').on('click','.remove', function(e){
		console.log('remove menu');
		var self = $(this);
		var iMenuId = self.parent().parent().data('menuid');
		if(iMenuId == 'undefined') return false;
		$.ajax({
		  type: "POST",
		  url: window.globalAjax,
		  data: {
		         '_action': 'removeMenu',
		         'iMenuId': iMenuId
		  },
		  success: function(response){
			  console.log(response);
			  response = JSON.parse(response);
			  if(response['status'] == true){
				self.parent().parent().remove();  
			  }
			  
		  },
		});
	});
	
	/*===============================================================*/
	// Toggle Add Item Form
	$('#current-menu').on('click','.add-item-btn',function(){
		console.log('toogle add item');
		console.log($(this).parent().parent().find('.add-item-form'));
		$(this).parent().parent().find('.add-item-form').show();
	});
	// Add Item
	$('#current-menu').on('submit','.add-item-form', function(e){
	//$('.add-item-form').submit(function(e) {
		var self = $(this);
		e.preventDefault();
		$.ajax({
		  type: "POST",
		  url: window.globalAjax,
		  data: $(this).serialize(),
		  success: function(response){
			  response = JSON.parse(response);
			  self.hide();
			  var data = response['data'];
			  var $htmlNewItem = $('#clone-container .single-item').clone();
			  $htmlNewItem.find('.item-title').html(data.name);
			  $htmlNewItem.find('.item-action').data('itemid', data.id);
			  self.parent().parent().parent().find('.current-items').append($htmlNewItem);
			  /*$('#current-menu').append(
					$('<li></li>')
						.data('menuid', data.id)
						.html(data.name)
						.append($('<span></span>').addClass('remove').html('x'))
			  );*/
		  },
		});
	});
	// Delete Item
	$('#current-menu').on('click','.delete-item', function(e){
		console.log('remove item');
		var self = $(this);
		var iItemId = self.parent().data('itemid');
		if(iItemId == 'undefined') return false;
		$.ajax({
		  type: "POST",
		  url: window.globalAjax,
		  data: {
		         '_action': 'deleteItem',
		         'iItemId': iItemId
		  },
		  success: function(response){
			  console.log(response);
			  response = JSON.parse(response);
			  if(response['status'] == true){
				self.parent().parent().remove();  
			  }
			  
		  },
		});
	});
	
	/*===============================================================*/
	// Toggle Add User Form
	$('.add-user-btn').click(function(){
		$(this).parent().parent().find('.add-user-form').show();
	});
	$('#page-user').on('submit','.add-user-form', function(e){
		var self = $(this);
		e.preventDefault();
		$.ajax({
		  type: "POST",
		  url: window.globalAjax,
		  data: $(this).serialize(),
		  success: function(response){
			  response = JSON.parse(response);
			  self.hide();
			  console.log(response);
			  var data = response['data'];
			  if(response['status'] == true){
				  var $htmlNewItem = $('.clone-container table.table-users-clone tr').clone();
				  $htmlNewItem.find('.col-username').html(data.username);
				  $htmlNewItem.find('.col-email').html(data.email);
				  $htmlNewItem.find('.col-highestrole').html(data.highestrole);
				  self.parent().parent().parent().find('table.table-users tbody').append($htmlNewItem);
			  }
		  },
		});
	});
	// Delete Item
	$('.table-users').on('click','.delete-item', function(e){
		console.log('remove item');
		var self = $(this);
		var iUserId = self.parent().parent().data('userid');
		if(iUserId == 'undefined') return false;
		$.ajax({
		  type: "POST",
		  url: window.globalAjax,
		  data: {
		         '_action': 'deleteUser',
		         'iUserId': iUserId
		  },
		  success: function(response){
			  console.log(response);
			  response = JSON.parse(response);
			  if(response['status'] == true){
				self.parent().parent().remove();  
			  }
			  
		  },
		});
	});
	/*===============================================================*/
	// Toggle Add Customer Form
	$('.add-customer-btn').click(function(){
		$(this).parent().parent().find('.add-customer-form').show();
	});
	$('#page-user').on('submit','.add-customer-form', function(e){
		var self = $(this);
		e.preventDefault();
		$.ajax({
		  type: "POST",
		  url: window.globalAjax,
		  data: $(this).serialize(),
		  success: function(response){
			  response = JSON.parse(response);
			  self.hide();
			  console.log(response);
			  var data = response['data'];
			  if(response['status'] == true){
				  var $htmlNewItem = $('.clone-container table.table-customers-clone tr').clone();
				  $htmlNewItem.find('.col-username').html(data.username);
				  $htmlNewItem.find('.col-email').html(data.email);
				  self.parent().parent().parent().find('table.table-customers tbody').append($htmlNewItem);  
			  }
		  },
		});
	});
	// Delete Item
	$('.table-customers').on('click','.delete-item', function(e){
		console.log('remove item');
		var self = $(this);
		var iCustomerId = self.parent().parent().data('customerid');
		if(iCustomerId == 'undefined') return false;
		$.ajax({
		  type: "POST",
		  url: window.globalAjax,
		  data: {
		         '_action': 'deleteCustomer',
		         'iCustomerId': iCustomerId
		  },
		  success: function(response){
			  console.log(response);
			  response = JSON.parse(response);
			  if(response['status'] == true){
				self.parent().parent().remove();  
			  }
			  
		  },
		});
	});
	
});