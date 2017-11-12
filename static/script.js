$(function(){
	$('form').submit(function(e){
		$('.progress').removeClass('hidden');
		var route = "/" +
			$('#instance').val() + '/' +
			$('#tag').val() + '/' +
			$('#pages').val() + '/' +
			$('#offset').val();
		$.get(route).done(function(url){
			if ( url ) {
				if ( $('#new_tab:checked').length ) {
					window.open(url);
				} else location.href = url;
			} else Materialize.toast('Couldn\'t find any content', 1000);
		}).fail(function(){
			Materialize.toast('Error', 1000);
		}).always(function(){
			$('.progress').addClass('hidden');
		})
		e.preventDefault();
	});
	Materialize.updateTextFields();
});
