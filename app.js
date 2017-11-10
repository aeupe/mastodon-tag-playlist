const	express = require('express'),
		app = express(),
		request = require('request'),
		cheerio = require('cheerio'),
		urlParser = require('js-video-url-parser'),
		port = process.argv[2] || 8080,
		max_ids = 50,
		max_offset = 25,
		max_pages = 25

app.use(express.static('static'))

app.get('/:instance/:tag/:pages(\\d\\d?)/:offset(\\d\\d?)', (req,res)=>{
	req.params.offset = Math.min(req.params.offset, max_offset)
	req.params.pages = Math.min(req.params.pages, max_pages)
	let		opts = {
				body: {limit: 40},
				json: true,
				timeout: 60 * 1000
			}, 
			i=0, ids=[],
			url = 'https://' + req.params.instance + 
				'/api/v1/timelines/tag/' + req.params.tag +
				'?limit=40'
	function get(){
		request.get(url, (err,_res,body)=>{
			if ( err || _res.statusCode != 200 ) {
				res.sendStatus(500)
			} else {
				let toots = JSON.parse(body)
				toots.forEach(toot=>{
					if ( ids.length >= max_ids ) return
					if ( i >= req.params.offset ) {
						let $ = cheerio.load(toot.content)
						$('a').each((i,e)=>{
							let	href = $(e).attr('href'),
								o = urlParser.parse(href)
							if ( o && o.provider == 'youtube' && 
									o.id && ids.length < max_ids ) {
								ids.push(o.id)
							}
						})
					}
					opts.body.max_id = toot.id
				})
				if ( ids.length >= max_ids || 
						++i >= req.params.offset + req.params.pages || 
						!toots.length ) {
					res.redirect('http://www.youtube.com/watch_videos?video_ids=' + 
						ids.join(','))
				} else get()
			}
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
