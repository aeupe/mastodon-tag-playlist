$(function(){
	$('form').submit(function(e){
		location.href = "/" +
			$('#instance').val() + '/' +
//			$('#token').val() + '_/' +
			$('#tag').val() + '/' +
			$('#pages').val() + '/' +
			$('#offset').val();
		e.preventDefault();
	});
	Materialize.updateTextFields();
});
