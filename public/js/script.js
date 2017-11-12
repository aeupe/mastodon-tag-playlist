$(()=>{
	$('form').submit(e=>{
		$('.progress').removeClass('hidden');
		window.mastoSearch(
			$('#instance').val(),
			$('#tag').val(),
			$('#pages').val(),
			$('#offset').val(),
			url=>{
				if ( url ) {
					if ( $('#new_tab:checked').length ) {
						window.open(url)
					} else location.href = url
				} else Materialize.toast(`Couldn't find any content`, 1000)
				$('.progress').addClass('hidden')
			}, 
			()=>{
				Materialize.toast('Error', 1000)
				$('.progress').addClass('hidden')
			}
		)
		e.preventDefault()
	})
	Materialize.updateTextFields()
})