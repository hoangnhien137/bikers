$(document).ready(function() {
	// --------------- File input replace --------------------
	$('input[type="file"]').file();
	// -------------------------------------------------------
	
	// --------------- Select replace ------------------------
	$("select").chosen();
	// -------------------------------------------------------
	
	// Toggle Active Menu
	$('#current-menu').on('click','.single-menu .menu-collapse',function(e){
		$(this).parent().toggleClass('active');
	});
	// Menu
	$('#add-menu-btn').click(function(){
		//$('#add-menu-form').show();
		$('#add-menu-form').toggleClass('dynamic-form');
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
			  //$('#add-menu-form').hide();
			  $('#add-menu-form').toggleClass('dynamic-form');
			  var $htmlNewMenu = $('#clone-container .single-menu').clone();
			  $htmlNewMenu.data('menuid', data.id);
			  $htmlNewMenu.find('.menu-title').html(data.name);
			  $htmlNewMenu.find('input[name=_menuid]').val(data.id);
			  $htmlNewMenu.find('.input-file-ca').append('<input type="file" name="_itemimage" data-text="Choose an <strong>image</strong>" />');
			  $htmlNewMenu.find('input[name=_itemimage]').file();
			  console.log($htmlNewMenu.data('menuid'));
			  $('#current-menu').append(
					  $htmlNewMenu
			  );
		  },
		});
	});
	// Delete menu
	$('#current-menu').on('click','.remove', function(e){
		var r=confirm("Do you really want to delete this menu category?")
		if (r==false){
			console.log( 'cancel remove');
			return false;
		}
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
	$('#current-menu').on('click','.cancel-add-item', function(e){
		e.preventDefault();
		console.log('cancel add item');
		var self = $(this);
		self.parent().parent().parent().parent().hide();
	});
	// Add Item
	$('#current-menu').on('submit','.add-item-form', function(e){
		console.log('add item');
		var self = $(this);
		e.preventDefault();
		
		// set form data
		var formdata = false;
		if (window.FormData) {
	  		formdata = new FormData();
		}
		self.find('input').each(function(key,value){
			formdata.append($(value).attr('name'), $(value).val());
		});
		self.find('textarea').each(function(key,value){
			formdata.append($(value).attr('name'), $(value).val());
		});
		// set form img
		var imgForm = $(this).find(':file')[0];
		console.log(imgForm.files);

		var i = 0, len = imgForm.files.length, img, reader, file;
		for ( ; i < len; i++ ) {
			file = imgForm.files[i];
			console.log(file);
			if (!!file.type.match(/image.*/)) {
				if (formdata) {
					formdata.append("_itemimagefile", file);
				}
			}	
		}
		
		$.ajax({
		  type: "POST",
		  url: window.globalAjax,
		  //data: $(this).serialize(),
		  data: formdata,
		  processData: false,
		  contentType: false,
		  success: function(response){
			  response = JSON.parse(response);
			  self.hide();
			  var data = response['data'];
			  var $htmlNewItem = $('#clone-container .single-item').clone();
			  $htmlNewItem.data('itemid', data.id);
			  $htmlNewItem.find('.item-title').html(data.name);
			  $htmlNewItem.find('.item-action').data('itemid', data.id);
			  $htmlNewItem.find('input[name=_menuid]').val(data.menuid);
			  $htmlNewItem.find('input[name=_itemid]').val(data.id);
			  $htmlNewItem.find('input[name=_itemname]').val(data.name);
			  $htmlNewItem.find('input[name=_itemprice]').val(data.price);
			  
			  if(data.image == null){
				  $htmlNewItem.find('.item-image-preview').html('No Image');
			  } else {
				  //$htmlNewItem.find('.item-image-preview').html('Image');
				  $htmlNewItem.find('.item-image-preview').append('<img src="'+data.image+'" alt="img" />');
			  }
			  $htmlNewItem.find('.input-file-ca').append('<input type="file" name="_itemimage" />');
			  $htmlNewItem.find('input[name=_itemimage]').data('text',data.image);
			  $htmlNewItem.find('input[name=_itemimage]').file();
			  $htmlNewItem.find('textarea[name=_itemdescription]').html(data.description);
			  
			  self.parent().parent().find('.current-items').append($htmlNewItem);
			  
		  },
		});
	});
	// Delete Item
	$('#current-menu').on('click','.delete-item', function(e){
		var r=confirm("Do you really want to delete this item ?");
		if (r==false){
			console.log( 'cancel delete');
			return false;
		}
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
				self.parent().parent().parent().remove();  
			  }
			  
		  },
		});
	});
	$('#current-menu').on('click','.disable-item', function(e){
		console.log('toggle item status');
		var self = $(this);
		var iItemId = self.parent().data('itemid');
		if(iItemId == 'undefined') return false;
		$.ajax({
		  type: "POST",
		  url: window.globalAjax,
		  data: {
		         '_action': 'toggleItemStatus',
		         '_itemid': iItemId
		  },
		  success: function(response){
			  console.log(response);
			  response = JSON.parse(response);
			  if(response['status'] == true){
				  if(response['data'].enable==true){
					  self.removeClass('disable');
				  } else {
					  self.addClass('disable');
				  }
				  
			  }
			  
		  },
		});
	});
	// Edit Item
	$('#current-menu').on('click','.edit-item', function(e){
		console.log('edit item');
		var self = $(this);
		self.parent().parent().parent().find('.item-expand').show();
	});
	$('#current-menu').on('click','.cancel-edit-item', function(e){
		e.preventDefault();
		console.log('cancel edit item');
		var self = $(this);
		self.parent().parent().parent().hide();
		
	});
	$('#current-menu').on('submit','.edit-item-form', function(e){
		console.log('edit item');
		var self = $(this);
		e.preventDefault();
		
		// set form data
		var formdata = false;
		if (window.FormData) {
	  		formdata = new FormData();
		}
		self.find('input').each(function(key,value){
			formdata.append($(value).attr('name'), $(value).val());
		});
		self.find('textarea').each(function(key,value){
			formdata.append($(value).attr('name'), $(value).val());
		});
		// set form img
		var imgForm = $(this).find(':file')[0];
		console.log(imgForm.files);

		var i = 0, len = imgForm.files.length, img, reader, file;
		for ( ; i < len; i++ ) {
			file = imgForm.files[i];
			console.log(file);
			if (!!file.type.match(/image.*/)) {
				if (formdata) {
					formdata.append("_itemimagefile", file);
				}
			}	
		}
		
		$.ajax({
		  type: "POST",
		  url: window.globalAjax,
		  //data: self.serialize(),
		  data: formdata,
		  processData: false,
		  contentType: false,
		  success: function(response){
			  console.log(response);
			  self.parent().hide();
			  response = JSON.parse(response);
			  var data = response['data'];
			  if(data.image != null){
				  self.find('.item-image-preview').empty().append('<img src="'+data.image+'" alt="img" />');
			  }
			  self.parent().parent().find('.item-title').html(data.name);
		  },
		});
	});
	/*===============================================================*/
	// Toggle Add User Form
	$('.add-user-btn').click(function(){
		$(this).parent().parent().find('.add-user-form').toggleClass('dynamic-form');
	});
	$('.cancel-add-user-btn').on('click', function(e){
		e.preventDefault();
		$(this).parent().parent().toggleClass('dynamic-form');
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
			  self.toggleClass('dynamic-form');
			  console.log(response);
			  var data = response['data'];
			  if(response['status'] == true){
				  var $htmlNewItem = $('.clone-container table.table-users-clone tr').clone();
				  $htmlNewItem.data('userid', data.id);
				  $htmlNewItem.find('.col-username').html(data.username);
				  $htmlNewItem.find('.col-email').html(data.email);
				  $htmlNewItem.find('.col-highestrole').html(data.highestrole);
				  self.parent().parent().parent().find('table.table-users tbody').append($htmlNewItem);
			  }
		  },
		});
	});
	// Delete User
	$('.table-users').on('click','.delete-item', function(e){
		var r=confirm("Do you really want to delete this user ?");
		if (r==false){
			console.log( 'cancel delete');
			return false;
		}
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
		$(this).parent().parent().find('.add-customer-form').toggleClass('dynamic-form');;
	});
	$('.cancel-add-customer').on('click', function(e){
		e.preventDefault();
		$(this).parent().parent().toggleClass('dynamic-form');
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
				  $htmlNewItem.data('userid', data.id);
				  $htmlNewItem.find('.col-username').html(data.username);
				  $htmlNewItem.find('.col-email').html(data.email);
				  self.parent().parent().parent().find('table.table-customers tbody').append($htmlNewItem);  
			  }
		  },
		});
	});
	// Delete Item
	$('.table-customers').on('click','.delete-item', function(e){
		var r=confirm("Do you really want to delete this customer ?");
		if (r==false){
			console.log( 'cancel delete');
			return false;
		}
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
	
/*******************************************************************************
 * @author: Hoang Nhien <hoangnhien137@gmail.com>
 * Custom js for Language
 ******************************************************************************/
	// Toggle Add Language Form
	$('.add-language-btn').click(function(){
		$(this).parent().parent().find('.add-language-form').toggleClass('dynamic-form');;
	});
	$('.cancel-add-language').on('click', function(e){
		e.preventDefault();
		$(this).parent().parent().toggleClass('dynamic-form');
	});
	$('#page-language').on('submit','.add-language-form', function(e){
		var self = $(this);
		e.preventDefault();
		$.ajax({
		  type: "POST",
		  url: window.globalAjax,
		  data: $(this).serialize(),
		  success: function(response){
			  response = JSON.parse(response);
			  self.toggleClass('dynamic-form');
			  console.log(response);
			  var data = response['data'];
			  if(response['status'] == true){
				  var $htmlNewItem = $('.clone-container table.table-languages-clone tr').clone();
				  $htmlNewItem.data('languageid', data.id);
				  $htmlNewItem.find('.col-languagename').html(data.name);
				  $htmlNewItem.find('.col-languagecode').html(data.code);
				  self.parent().parent().parent().find('table.table-languages tbody').append($htmlNewItem);  
			  }
		  },
		});
	});
	// Delete Item
	$('.table-languages').on('click','.btn-delete', function(e){
		var r=confirm("Do you really want to delete this language ?");
		if (r==false){
			return false;
		}
		var self = $(this);
		var iLanguageId = self.parent().parent().data('languageid');
		if(iLanguageId == 'undefined') return false;
		$.ajax({
		  type: "POST",
		  url: window.globalAjax,
		  data: {
		         '_action': 'deleteLanguage',
		         '_languageid': iLanguageId
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
	// Disable Item
	$('.table-languages').on('click','.btn-disable', function(e){
		var self = $(this);
		var iLanguageId = self.parent().parent().data('languageid');
		if(iLanguageId == 'undefined') return false;
		$.ajax({
		  type: "POST",
		  url: window.globalAjax,
		  data: {
		         '_action': 'toggleLanguageStatus',
		         '_languageid': iLanguageId
		  },
		  success: function(response){
			  console.log(response);
			  response = JSON.parse(response);
			  if(response['status'] == true){
				  if(response['data'].enable==true){
					  self.removeClass('disable');
				  } else {
					  self.addClass('disable');
				  }
			  }
		  },
		});
	});
	
	
	
});