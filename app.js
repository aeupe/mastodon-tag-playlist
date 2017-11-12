const	express = require('express'),
		app = express(),
		port = process.argv[2] || 8080

app.use(express.static('public'))

app.listen(port, ()=>{
	console.log('Listening on port ' + port)
})
