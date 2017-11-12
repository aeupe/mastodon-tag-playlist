const	express = require('express'),
		app = express(),
		port = process.argv[2] || 8080

app.use(express.static('docs'))

app.listen(port, ()=>{
	console.log('Listening on port ' + port)
})
