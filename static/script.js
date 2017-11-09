$(function(){
	$('form').submit(function(e){
		var url = "/" +
			$('#instance').val() + '/' +
			$('#tag').val() + '/' +
			$('#pages').val() + '/' +
			$('#offset').val();
		if ( $('#new_tab:checked').length ) {
			window.open(url);
		} else location.href = url;
		e.preventDefault();
	});
	Materialize.updateTextFields();
});
