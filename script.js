$(document).ready(function(){
	
	DocumentAction();
	
	var Tabs = {
		'I Am'	: 'sub/iam.html',
		'I Know'	: 'sub/iknow.html',
		'I Write'	: 'sub/iwrite.html',
		'I Build'	: 'sub/ibuild.html',
		'I Design'	: 'sub/idesign.html',
		'I Exist'	: 'sub/iexist.html'
		
	}
	
	
	var z=0;
	$.each(Tabs,function(i,j){
		var tmp = $('<li><a href="#" class="tab ">'+i+' <span class="left" /><span class="right" /></a></li>');
		
		tmp.find('a').data('page',j);
		
		$('ul.tabContainer').append(tmp);
	})

	var the_tabs = $('.tab');
	
	the_tabs.click(function(e){
		var element = $(this);
		
		if(element.find('#overLine').length) return false;
		
		var bg = element.attr('class').replace('tab ','');

		$('#overLine').remove();
		
		$('<div>',{
			id:'overLine',
			css:{
				display:'none',
				width:element.outerWidth()-2
			}}).appendTo(element).fadeIn('slow');
		
		
		if(!element.data('cache'))
		{	
			$('#contentHolder').html('<div class = "grid_3 prefix_8 preloader"><img src="img/ajax_preloader.gif" width="64" height="64" /></div>');

			$.get(element.data('page'),function(msg){
				$('#contentHolder').html(msg);
				
				$.each(Tabs,function(i,j){
					$(".tab ").removeClass("activetab");
				});
				
				element.addClass("activetab");
				DocumentAction();
				
				element.data('cache',msg);
			});
		}
		else { 
			$('#contentHolder').html(element.data('cache'))
			
			$.each(Tabs,function(i,j){
				$(".tab" ).removeClass("activetab");
			});
			
			element.addClass("activetab");
			DocumentAction();
		};
		
		e.preventDefault();
	})
	
	the_tabs.eq(0).click();

	
});

