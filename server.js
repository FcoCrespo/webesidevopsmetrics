const express = require('express');
const path = require('path');
const app = express();
app.disable("x-powered-by");
app.use(express.static(__dirname + '/dist/myesidevopsmetrics'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/myesidevopsmetrics/index.html'));});
app.listen(process.env.PORT || 8080);