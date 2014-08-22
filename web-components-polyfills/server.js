var http= require('http');
var cgi = require('ngi');
var fs  = require('fs');

var id_url = {
    js: {
        'x-md': 'doc/tag/x-md.js'
    },
    css: {
        'x-md': 'doc/tag/x-md.css'
    }
};

function get_url(id, id_url) {
    var urls = [];
    for(var i in id) {
        var url = id_url[id[i]];
        url && urls.push(url);
    }
    return urls;
}

function concat(files, res) {
    (function output() {
        var f = files.shift();
        if(f) {
            var reader = fs.createReadStream(f);
            reader.pipe(res, {end: false});
            reader.on('end', output);
        }
        else res.end();
    })();
}

var map = {
    bin : {
        '/components.js': function(req, res) {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            concat(get_url(req.body.id.split(','), id_url.js), res);
        },
        '/components.css': function(req, res) {
            res.writeHead(200, {'Content-Type': 'text/css'});
            concat(get_url(req.body.id.split(','), id_url.css), res);
        }
    },
    exp : {
    },
    doc : 'doc'
};

http.createServer(cgi.route(map)).listen(80);
