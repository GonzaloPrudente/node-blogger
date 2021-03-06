
/*
   Program for generating a sitemap
*/

var XML = require('xml'),
    fs = require('fs'),
    path = require('path');


function Sitemap () {
    "use strict";
    
    this.header = '<?xml version="1.0" encoding="UTF-8"?>\n';

    this.json = [{
        urlset: [ 
            {_attr: {xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'}}
        ] 
    }];
    
    return this;
}




Sitemap.prototype.add = function (post) {
    "use strict";
    
    this.json[0].urlset.push({
        url: [
            {loc: post.url}, 
            {lastmod: (new Date(post.lastmod)).toISOString().substring(0, 10)}, 
            {changefreq: 'weekly'}  
        ]
    });
};




Sitemap.prototype.create = function () {
    "use strict";
    
    var map = this.header + XML(this.json, true);
    
    try {
        fs.writeFileSync(path.resolve(__dirname, '../template/sitemap.xml'), map);
        console.log('Sitemap created!');
    } catch (error) {
        throw error;
    }
};




module.exports = new Sitemap();



