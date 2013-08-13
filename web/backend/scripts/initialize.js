$.initialize = function() {
	// --------------- Overlay initialization ----------------
	$("body").append('<div id="overlays"></div>');
	$("#overlays.dark").live("tap", function() {
		$(this).removeClass("dark");
		$("#overlays .modal").remove();
	});
	// -------------------------------------------------------
		
	// Update
	if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
		// IE8 doesn't like HTML!
	} else {
		window.addEventListener("load", function (a) {
		    window.applicationCache.addEventListener("updateready", function (a) {
		        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
		            window.applicationCache.swapCache();
		            
		            $.notification( 
		            	{
		            		title: 'An update has been installed!',
		            		content: 'Click here to reload.',
		            		icon: "u",
		            		click: function() {
		            			window.location.reload();
		            		}
		            	}
		            );
		            
		        }
		    }, false);
	    
		    window.applicationCache.addEventListener("downloading", function (a) {
		        if (window.applicationCache.status == window.applicationCache.DOWNLOADING) {
		    		$.notification( 
		    			{
		    				title: 'Latest version is being cached',
		    				content: 'Only takes a few seconds.',
		    				icon: "H"
		    			}
		    		);
		    	}
		    }, false);
	
		}, false);
	



	}
	
	// --------------- Navigation ----------------------------
	$('a').bind("tap", function(e) {
		if($(this).attr("rel") != "external") {
			if(!$(this).data("href")) {
				return false;
			}
			var element = $( $(this).data("href") );
			if(!$(this).parents("ul.tabs").length>0) {
				if ($(this).data("href").charAt( 0 ) == '#' ) {
					if( $(this).hasAttr('data-reveal') ) {
						if( element.is(":hidden") ) {
							element.fadeIn(200);
						} else {
							element.fadeOut(200);
						}	
					} else if ( $(this).hasAttr('data-modal') ) {
						if(element.size()>0) {
							element.modal();
						} else {
							$.info({desc: "The hash <strong>"+$(this).data("href")+"</strong> is not valid"});
						}
					} else {
						var page = $(this).data("href");
						var title = element.data("title");
						
						if(title==undefined) {
							title = $(this).text();
						}
						$.change(page, title);
					}
				} else {
					if ( $(this).hasAttr('data-modal') ) {
						$.fn.modal(
							{
								url: $(this).data("href")
							}
						);
					}
				}
			} else {
				var tab = $("div.tabs > " + $(this).data("href"));
				if(tab.length>0) {
					$(this).parents("ul.tabs, .section").children("div.tabs").children(".tab.current").removeClass("current");
					$(this).parents("ul.tabs, .section").children("div.tabs").children($(this).data("href")).addClass("current");
					$(this).parents("ul.tabs").children("li.current").removeClass("current");
					$(this).parents("li").addClass("current");
				} else {
					$.info({desc: "The hash <strong>"+$(this).data("href")+"</strong> is not valid"});
				}
			}
			e.preventDefault();
		} else {
			window.location.href = $(this).attr("data-href");
		}
	});
	if (window.location.hash) {
		var url = location.hash;
		var caption = $(url).data("title");
		window.location.hash = "";
		$.change(url, caption);
	} else {
		var url = "#" + $(".section.current").attr("id");
		var caption = $(url).data("title");
		$.change(url, caption, true);
	}
	$(window).hashchange( function(){
	    var page = location.hash;
	    var title = $(page).data("title");
	    if($(page).length>0) {
		    if(title==undefined) {
		    	document.title = "Dashboard"
		    } else {
		    	document.title = title + " - Dashboard";
		    }
		    $(".section.current").removeClass("current").hide();
		    $('a[data-href*="#"].current').removeClass("current");
		    
		    $('a[data-href*="' + page + '"]').addClass("current");
		    $(page).addClass("current").show();
		    $(document).scrollTop(0);
	    } else {
	    	$.info({desc: "The page <strong>"+page+"</strong> was not found."});
	    }
	});	
	// -------------------------------------------------------
	
	
	// --------------- Add class to body ---------------
	$("body").addClass("dashboard");
	// -------------------------------------------------------
	

	// --------------- Check for touch devices ---------------
	if (window.Touch) {
		// Do
	};
	// -------------------------------------------------------


	// --------------- Span image replace --------------------
	$("#header ul li > ul > li > img.avatar").each(function() {
		$(this).replaceWith( $('<span />').addClass("avatar").css("background-image", "url("+$(this).attr("src")+")") );
	});
	$("#header ul li.avatar, .comment .avatar").each(function() {
		var src = $(this).children("img").attr("src");
		$(this).children("img").remove();
		$(this).css("background-image", "url("+src+")");
	});
	// -------------------------------------------------------
	
	
	// --------------- Checkbox toggle replace ---------------
	$("input:checkbox").each(function () {
		$(this).checkbox();
	});
	
	
	
	$(".checkbox input").change(function () {
		$(this).parents("span").toggleClass("checked");
	});
	// -------------------------------------------------------
	
	
	// --------------- File input replace --------------------
	$('input[type="file"]').file();
	// -------------------------------------------------------
	
	
	// --------------- Tabs in carton ------------------------
	$(".carton, .carton .column").each(function() {
		if($(this).children(".content").length>1) {
			var len = $(this).children(".content").length;
			$(this).addClass("multiple");
			$(this).children(".content:first").addClass("current");
			
			var round = $('<ul class="round" />');
			
			for (var i = 0; i < len; i++) {
				$('<li />').appendTo(round);
			}
			
			round.children("li:first").addClass("current");
			
			$('ul.round li', this).live("tap", function() {
				var index = $(this).index();
				var carton = $(this).parent("ul").parent();
				
				carton.children("ul").children("li.current").removeClass("current");
				$(this).addClass("current");
				
				carton.children(".content.current").removeClass("current");
				carton.children(".content").eq(index).addClass("current");
			})
			
			$(this).append(round);
			
		}
	});
	// -------------------------------------------------------
	
	
	// --------------- Select replace ------------------------
	$("select").chosen();
	// -------------------------------------------------------
	
	
	// --------------- Menu elements -------------------------
	$("#header > ul > li").bind("tap", function() {
		var menu = $(this).children("ul");
		$("#header").removeClass("inactive");
		
		if(menu.length>0) {
			$("#header > ul > li").removeClass("active");
			$(this).addClass("active");
			$("#header > ul > li > ul").not(menu).hide();
			$("#header").addClass("inactive");
			if(menu.is(":hidden")) {
				menu.show();
			} else {
				menu.hide();
				$(this).removeClass("active");
				$("#header").removeClass("inactive");
			} 	
			
		} else {
			$("#header > ul > li > ul").hide();
			$("#header").removeClass("inactive");
			$("#header > ul > li").removeClass("active");
		}
		return false;
	});
	$("body").bind("tap", function() {
		$("#header > ul > li > ul").hide();
		$("#header").removeClass("inactive");
		$("#header > ul > li").removeClass("active");
	});
	// -------------------------------------------------------
	
	
	// --------------- Removal of title attribute ------------
	$('[title]').attr('title', function(i, title) {
	    $(this).data('title', title).removeAttr('title');
	});
	
	$('a[href]').attr('href', function(i, title) {
		$(this).data('href', title).removeAttr('href').attr('data-href', title);
	});
	// -------------------------------------------------------
	
	
	// --------------- Tooltip initialization ----------------
	$(".tooltip").tooltip();
	// -------------------------------------------------------

	// --------------- Tabs initialization -------------------
	$("ul.tabs").each(function() {
		var hash = $(this).children("li.current").children("a").data("href");
		var tab = $(this).siblings("div.tabs").children(hash);
		if(tab.length>0) {
			tab.addClass("current");
		} else {
			tab = $(this).siblings("div.tabs").children("div.tab:first-child");
			href = "#" + tab.attr("id");
			$(this).children("li.current").removeClass("current");
			$('li a[data-href="'+href+'"]', this).parent("li").addClass("current");
			tab.addClass("current");
		}
	});
	// -------------------------------------------------------
	
	
	// --------------- Pull to refresh -----------------------
	if ($.browser.webkit && navigator.platform=='MacIntel') {
		var distance;
		$('body').append('<div class="pull"><span class="icon">w</span><div>Pull <span>to refresh</span></div></div>');
		$(window).scroll(function () {
			if($(window).scrollTop() < 0) {
				distance = -$(window).scrollTop()*1.6;
				$("#stream").addClass("hide");
				if(distance < 2) {
					distance = 0;
					$("#stream").removeClass("hide");
				}
				if(distance > 62) {
					$('.pull div').html('Release <span>to refresh</span>');
					$('.pull .icon').addClass('release');
				} else {
					$('.pull div').html('Pull <span> to refresh</span>');
					$('.pull .icon').removeClass('release');
				}
				
				if(distance > 300) {
					distance = 300;
				}
				
				$("#dashboard").css("-webkit-transform", "translateY("+distance+"px"+")");
			} else if ($(window).scrollTop() > 0) {
				$("#stream").removeClass("hide");
			} else {
				$("dashboard").css("-webkit-transform", "translateY(0)");
			}
		});
	}
	// -------------------------------------------------------
	
	
};

//This $.demo function can easily be deleted without hurting core functionality - just be aware that demo won't function properly.
$.demo = function() {
	//Prospect to færdige funktioner
	$("li.layer > ul").bind("tap", function() {
		if( !$(this).hasClass("turn") ) {
			$("li.layer > ul.turn").addClass("back").delay(800).queue(function(){ 
				$(this).removeClass("turn");
				$(this).removeClass("back");
				$(this).clearQueue();
			});
			$(this).addClass("turn");
		} else {
			$(this).addClass("back").delay(800).queue(function(){ 
				$(this).removeClass("turn");
				$(this).removeClass("back");
				$(this).clearQueue();
			});
		}
	});
	$("li.todo").each(function() {
		$(this).prepend('<span class="box" />');
	});
	$("li.todo span").bind("tap", function() {
		if( !$(this).parent("li.todo").hasClass("unchecked") ) {
			$(this).parent("li.todo").removeClass("checked").addClass("unchecked");
		} else {
			$(this).parent("li.todo").removeClass("unchecked").addClass("checked");
		}
		return false;	
	});
	// PROSPECT END
	
	// --------------- Validator -----------------------------
	$('form#demo').isHappy({
		fields: {
			'#firstname': {
			  required: true,
			  message: 'Might we at least inquire your first name?'
			},
			'#username': {
			  required: true,
			  message: 'A username is required'
			},
			'#key': {
			  required: true,
			  message: 'A password is required'
			}
		}
	});
	// ------------------------------------------------------- 
	
	// Animation & Modal demo
	var animation = "flipInX";
	$("#modals button").bind("tap", function() {
		var attr = $(this).attr("data-function");
		var options;
		
		switch(attr) {
		
			case "default-theme":
				options = { animation: animation, content: "<strong>Standard</strong> modal" };
				break;
				
			case "dark-theme":
				options =  { animation: animation, theme: "dark", content: "<strong>Dark</strong> modal" };
				break;
				
			case "blue-theme":
				options = { animation: animation, theme: "blue", content: "<strong>Blue</strong> modal" };
				break;
				
			case "elastic-layout":
				options = { animation: animation, layout: "elastic"};
				$.fn.maps(
							{
								place: "magasin du nord, kongens nytorv, copenhagen", 
								zoom: 16, 
								caption: "Magasin du Nord, <span>Copenhagen</span>",
								texture: false,
								modal: {animation: animation, padding: 0, layout: "elastic", close: "light"}
							}
				);
				return false;
				
			case "no-padding":
				$.fn.maps(
							{
								place: "magasin du nord, kongens nytorv, copenhagen", 
								zoom: 16, 
								caption: "Magasin du Nord, <span>Copenhagen</span>",
								texture: false,
								modal: {animation: animation, padding: 0, width: "1100", close: "light"}
							}
				);
				return false;
				
			case "ajax-load":
				options = {animation: animation, url: "static/demo/ajax.html"};
				break;
				
			case "full-overlay":
				if(animation=="flipInX") {
					var n_animation = "fadeInDown";
				} else {
					n_animation = animation;
				}
				$("#typography").overlay("<span>Thin</span> header", undefined, n_animation);
				$.notification( 
					{
						title: 'Full overlay',
						content: 'Press <strong>escape</strong> to exit',
						icon: "O"				
					}
				);
				return false;
				
			default:
				return false;
		}
		
		$("#buttons").modal(options);
		
	});
	$("#select-animations").change(function() {
		var animate = $(this).children('option:selected').text();
		$("#typography").modal({animation: animate});
		
		if( $("#animationDemo").attr("checked") ) {
			animation = animate;
		}
	})
	$("#animationDemo").change(function() {
		if( $(this).attr("checked") ) {
			animation = $("#select-animations").children('option:selected').text();
		} else {
			animation = "flipInX";
		}
	});
	
	// Notifications demo
	$("#alerts button").bind("tap", function() {
		var attr = $(this).attr("data-function");
		var options;
		
		switch(attr) {
		
			case "standard":
				options = {title: 'Standard notification', content: 'This is the content area. Even <strong>HTML</strong>-tags are allowed!', img: "static/demo/avatar92.jpg"}
				break;
				
			case "time":
				options = {title: 'Time notification', content: 'You can easily include time tags on every notification.', showTime: true, img: "static/demo/boy_avatar.jpg"}
				break;
				
			case "timeout":
				options = {title: 'Timeout notification', content: 'This notification will close itself in five seconds!', timeout: 5000, img: "static/demo/obama.jpg"}
				break;
				
			case "callback":
				options = 
					{
						title: 'Callback', 
						content: 'By clicking on the notification, you can call a function.', 
						img: "static/demo/avatar.jpg",
						click: function() {
							$.notification(
	                            {
	                                content: 'This notification was just created.',
	                                title: 'Callback!',
	                                icon: "I"
	                            }
	                        );
						}
					}
				break;
			
			case "border":
				options = {title: 'Borderless image', content: 'Notice how the cloud does not have a border.', img: "static/demo/cloud.png", border: false}
				break;
				
			case "fill":
				options = {title: 'Image fill', content: 'Image fills out the entire left section of the notification.', img: "static/demo/avatar2.jpg", fill: true}
				break;
				
			case "icon":
				options = {title: 'Notification with icon', content: 'An image is not even neccesary. Pastel includes an icon font.', icon: '&amp;'}
				break;
				
			case "error":
				options = {title: 'Error notification', content: 'Easily catch the attention of the user.', error: true }
				break;
			
			default:
				return false;
		}
		
		$.notification(options);
		
	});
	
	$("#more a").bind("tap", function() {
		$("#more").hide();
	});
	
	// Error pages demo
	$("#errors button").bind("tap", function() {
		var attr = $(this).attr("data-function");
		var options;
		
		switch(attr) {
		
			case "standard":
				options = {}
				break;
				
			case "black":
				options = {theme: "black"}
				break;
				
			case "rose":
				options = {theme: "rose"}
				break;
				
			case "white":
				options = {theme: "blues", particles: "FFFFFF"}
				break;
				
			case "icon":
				options = {icon: "N"}
				break;
			
			default:
				return false;
		}
		
		$.info(options);
		
	});
	
	// Tooltip demo
	$("#tooltips button").each(function() {
		var attr = $(this).attr("data-function");
		var options;
		var content = 'Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit. Suspendisse cursu turpis.<br><br>Phasellus ac nunc turpis, a euismod diam.';
		
		switch(attr) {
			case "top":
				options = {content: content, maxWidth: "320px", defaultPosition: "top", edgeOffset: 10}
				break;
				
			case "bottom":
				options = {content: content, maxWidth: "320px", defaultPosition: "bottom", edgeOffset: 10}
				break;
				
			case "left":
				options = {content: content, maxWidth: "320px", defaultPosition: "left", edgeOffset: 10}
				break;
				
			case "right":
				options = {content: "Here!", maxWidth: "90px", defaultPosition: "right", edgeOffset: 10}
				break;
				
			case "title":
				options = {content: content, title: "Lorem ipsum dolor", defaultPosition: "top", edgeOffset: 10}
				break;
				
			case "edge":
				options = {content: content, defaultPosition: "top", edgeOffset: 80}
				break;
			
			default:
				return false;
		}
		
		$(this).tooltip(options);
		//$.notification(options);
		
	});
	
	// Maps demo
	$('ul.tabs li a.mapdemo').bind("tap", function() {
		if(!$(this).hasAttr('data-toggle')) {
			var section = $($(this).data('href'));
			var attr = section.attr('id');
			var options;
			$(this).attr('data-toggle', 'true');
			
			switch(attr) {
			
				case "roadmap":
					options = {
						texture: false, 
						place: "kongens nytorv, copenhagen", 
						type: "roadmap", 
						caption: "King's New Square, <span>Copenhagen</span>"
					};
					break;
					
				case "satellite":
					options = {
						place: "kongens nytorv, copenhagen", 
						zoom: 16, 
						caption: "King's New Square, <span>Copenhagen</span>",
						texture: false
					};
					break;
					
				case "hybrid":
					options = {
						texture: false, 
						place: "kongens nytorv, copenhagen", 
						type: "hybrid", 
						caption: "King's New Square, <span>Copenhagen</span>"
					};
					break;
					
				case "currentlocation":
					options = {
						geo: true, 
						caption: "<span>Your</span> current <span>location</span>"
					};
					break;
				
				default:
					return false;
			}
			
			section.maps(options);
		}
	});
	$('#mapmodals button').bind("tap", function() {
		var attr = $(this).attr('data-function');
		var options;
		
		switch(attr) {
		
				
			case "standard":
				options = {
					place: "kongens nytorv, copenhagen", 
					zoom: 16, 
					caption: "King's New Square, <span>Copenhagen</span>",
					texture: false
				};
				break;
			
			case "roadmap":
				options = {
					texture: false, 
					place: "kongens nytorv, copenhagen", 
					type: "roadmap", 
					caption: "King's New Square, <span>Copenhagen</span>"
				};
				break;
				
			case "current":
				options = {
					geo: true, 
					caption: "<span>Your</span> current <span>location</span>"
				};
				break;
				
			case "custom":
				options = {
					texture: false, 
					place: "marmorkirken, copenhagen", 
					type: "hybrid", 
					zoom: 15,
					caption: "Marble Church, <span>Copenhagen</span>",
					modal: {padding: 0, layout: "elastic", animation: "bounceInDown", close: "light"},
				};
				break;
			
			default:
				return false;
		}
		
		$.fn.maps(options);
	});
	
	// Chat demo
	$(".text-con textarea").keydown(function(event) {
		if (event.which == 13) {
			$(this).parent().children("button").click();
			event.preventDefault();	
		}
	});
	$(".text-con.demo button").bind("tap", function() {
		var textarea = $(this).parent().children("textarea");
		var value = textarea.val();
		if(value.length>0) {
			$(window).scrollTop($(document).height());
			var theme = $(this).attr("data-theme");
			var comment = $('<div class="com-con right '+theme+'"><div class="comment"><p>'+value+'</p><div class="avatar"></div></div><div class="byline"><strong>You</strong> Just now</div></div>');
			comment.hide();
			comment.appendTo( $(this).parent().parent() );
			comment.fadeIn();
			textarea.val('');
		}
	});
	
	// Datepicker
	$("input#date").date();
	
	//Tags
	$("#tags").tags();
	
	// Table initialization
	$("table")
	.table()
	.pagination();
	
	$("#home").append('<ul class="round"><li class="current">Page one</li><li>Page two</li><li>Page three</li></ul>');
	
	// Bind events to the tiles
	$("#article").bind("tap", function() {
		$.editor("static/demo/editor.txt", "#editor-textarea", "#editor-preview");
		$.change("#text");	
	});

	$("#comment").bind("tap", function() {
		$.fn.gallery("static/demo/montage.html");
		
		if(!$(this).attr("data-toggle")) {
			$.notification( 
				{
					title: 'The Photo Montage',
					content: 'Please wait while it\'s loading. The montage can be closed at any time, simply by pressing <strong>Escape</strong>',
					icon: "3"				
				}
			);
			$(this).attr("data-toggle", "true")
		}
	});
	
	// Icon demo
	$("#icons .icons span").hover(function() {
		var icon = $(this).text();
		$("#big span.icon").html(icon);
		$("#big span.character").html("Character: <strong>" + icon + "</strong>");
	});
	
	// Change theme, temporary function
	$("#footer").bind("tap", function() {
		if($("body").hasClass("feather")) {
			$("body").removeClass("feather");
		} else {
			$("body").addClass("feather");
		}
	});
	
	//Documentation
	$("#docs ul.tabs li a").bind("tap", function() {
		if(!$(this).hasAttr("data-loaded") && $(this).data("href")!="#introduction") {
			var element = $( $(this).data("href") );
			var reference = "docs/reference/" + $(this).data("href").replace(/^#docs_+/, "") + ".md";
			$(this).attr("data-loaded", "true");
					
			$.get(reference + "?time=" + (new Date()).getTime(), function(data){
				var docs = new Showdown.converter();
				
				var text = $(docs.makeHtml(data));
				text.find('pre').addClass('prettyprint');
				text.find('p code').addClass('prettyprint');
				text.find('code').each(function() {
				    $(this).html(prettyPrintOne($(this).html()));
				});
				element.html(text);	
				$(document).scrollTop(0);
			}).error(function() {
				$.notification( 
					{
						title: 'Reference was not found',
						content: 'The reference <strong>' + reference + "</strong> was not found",
						error: true
					}
				);	
			});
		}
	})
	
	//Retina demo
		var left = 0;
        var top = 0;
        var sizes = { 
						retina: { width:190, height:190 },
		        		app:	{ width:220, height:330 } 
					};
        var retina;
    	$("#iphone_con .retina").css("background-image","url(static/demo/screen.jpg)");
    	$("#iphone_small_white .retina").css("background-image","url(static/demo/todo.jpg)");
    	$("#iphone_small .retina").css("background-image","url(static/demo/maps.jpg)");
        $('.screenshot').mousemove(function(e){
        
            offset  = { left: $(this).offset().left, top: $(this).offset().top };
            title = $(this).attr('title');
            retina  = $(this).children(".retina");
            left = (e.pageX-offset.left);
            top = (e.pageY-offset.top);
            if(retina.is(':not(:animated):hidden')){
                $(this).trigger('mouseenter');
            }
    
            if(left<0 || top<0 || left > sizes.app.width ||
                top > sizes.app.height)
            {
    
                if(!retina.is(':animated')){
                    $(this).trigger('mouseleave');
                }
                return false;
            }
    
            retina.css({
                left                : left - sizes.retina.width/2,
                top                 : top - sizes.retina.height/2,
                backgroundPosition  : '-'+(2.15*left)+'px -'+(2.5*top)+'px'
            });
    
        }).mouseleave(function(){
            $(this).children(".retina").fadeOut('fast');
        }).mouseenter(function(){
            $(this).children(".retina").hide();
            $(this).children(".retina").fadeIn('fast');
    });	
	
	$("#orbit_1").orbit(
		{
			animation: "rollIn",
			one: {color: "#F6BCAD", tooltip: "Research In Motion", speed: 10},
			two: {color: "#C3C48D", tooltip: "Apple", speed: 1},
			three: {color: "#7BB392"},
			four: {color: "#343738"}
		}
	);
	
	$("#orbit_2").orbit(
		{
			animation: "bounceInDown",
			texture: false,
			one: {color: "#bbb", tooltip: "Research In Motion", speed: 50},
			two: {color: "#999", tooltip: "Apple", speed: 21},
			three: {color: "#666"},
			four: {color: "#333"}
		}
	);
	
	$("#orbit_3").orbit();
	
	
//	-------------------------------------------------------------------------------------------------------------------------------------------

// Chart
	
	
//	-------------------------------------------------------------------------------------------------------------------------------------------
	$.notification( 
		{
			title: 'Welcome to Pastel!',
			content: '<strong>Please</strong> take a look around, I hope you like it!',
			img: "static/demo/alone.jpg",
			fill: true
		}
	);
	
	$.notification( 
		{
			title: 'This is the notification area',
			content: 'Check the <em>Notifications</em> section for more information.',
			icon: '&amp;'
		}
	);
	
	
	
	
}

// Initializing of the Pastel Dashboard!
$(document).ready(function() {
	$.initialize();
	//$.demo();
});