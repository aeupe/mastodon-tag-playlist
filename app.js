const	express = require('express'),
		app = express(),
		Mastodon = require('mastodon-api'),
		cheerio = require('cheerio'),
		urlParser = require('js-video-url-parser'),
		port = process.argv[2] ? process.argv[2] : 8080,
		max_ids = 50,
		max_offset = 25,
		max_pages = 25

app.use(express.static('static'))

app.get('/:instance/:tag/:pages/:offset', (req,res)=>{
	req.params.offset = parseInt(req.params.offset)
	req.params.pages = parseInt(req.params.pages)
	if ( isNaN(req.params.offset) ) req.params.offset = 0
	else req.params.offset = Math.min(req.params.offset, max_offset)
	if ( isNaN(req.params.pages) ) req.params.pages = 1
	else req.params.pages = Math.min(req.params.pages, max_pages)
	var M = new Mastodon({
  		access_token: '0',
  		timeout_ms: 60*1000,
  		api_url: 'https://' + req.params.instance + '/api/v1/'
	})
	let opts = {
		limit: 40
	}, i=0, ids=[]
	function get(){
		M.get('timelines/tag/' + req.params.tag, opts).then(toots=>{
			toots.data.forEach(toot=>{
				if ( ids.length >= max_ids ) return
				if ( i >= req.params.offset ) {
					let $ = cheerio.load(toot.content)
					$('a').each((i,e)=>{
						let	href = $(e).attr('href'),
							o = urlParser.parse(href)
						if ( o && o.provider == 'youtube' && o.id && ids.length < max_ids ) {
							ids.push(o.id)
						}
					})
				}
				opts.max_id = toot.id
			})
			if ( ids.length >= max_ids || ++i >= req.params.offset + req.params.pages || !toots.data.length ) {
				res.redirect('http://www.youtube.com/watch_videos?video_ids=' + ids.join(','))
			} else get()
		})
	}
	get()
})

process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
});

app.listen(port, ()=>{
	console.log('Listening on port ' + port)
})
