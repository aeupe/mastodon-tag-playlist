const	urlParser = require('js-video-url-parser'),
		max_ids = 50,
		max_offset = 25,
		max_pages = 25

window.mastoSearch = function(instance, tag, pages, offset, done, fail){
	offset = Math.min(offset, max_offset)
	pages = Math.min(pages, max_pages)
	let i=0, max_id, ids=[], 
		url = 'https://' + instance + 
		'/api/v1/timelines/tag/' + tag +
		'?limit=40'
	function get(){
		$.ajax(max_id ? url + '&max_id=' + max_id : url).done(toots=>{
			toots.forEach(toot=>{
				if ( ids.length >= max_ids ) return
				if ( i >= offset ) {
					$($.parseHTML(toot.content)).find('a').each((i,e)=>{
						let href = $(e).attr('href'), o = urlParser.parse(href)
						if ( o && o.provider == 'youtube' && 
								o.id && ids.length < max_ids ) {
							ids.push(o.id)
						}
					})
				}
				max_id = toot.id
			})
			if ( ids.length >= max_ids || ++i >= offset + pages || !toots.length ) {
				let yt_url = 'http://www.youtube.com/watch_videos?video_ids=' + ids.join(',')
				done(yt_url)
			} else get()
		}).fail(fail)
	}
	get()
}