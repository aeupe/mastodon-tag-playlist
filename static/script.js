$(function(){
	$('form').submit(function(e){
		$('.progress').removeClass('hidden');
		var route = "/" +
			$('#instance').val() + '/' +
			$('#tag').val() + '/' +
			$('#pages').val() + '/' +
			$('#offset').val();
		$.get(route).done(function(url){
			if ( $('#new_tab:checked').length ) {
				window.open(url);
			} else location.href = url;
		}).always(function(){
			$('.progress').addClass('hidden');
		})
		e.preventDefault();
	});
	Materialize.updateTextFields();
});
