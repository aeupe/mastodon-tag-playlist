$(()=>{
	$('form').submit(e=>{
		$('.progress').removeClass('hidden');
		window.mastoSearch(
			$('#instance').val(),
			$('#tag').val(),
			$('#pages').val(),
			$('#offset').val(),
			url=>{
				if ( $('#new_tab:checked').length ) {
					window.open(url)
				} else location.href = url
			}, 
			()=>{Materialize.toast('Error', 1000)},
			()=>{$('.progress').addClass('hidden')}
		)
		e.preventDefault()
	})
	Materialize.updateTextFields()
})