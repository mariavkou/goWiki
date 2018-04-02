$(document).ready(function() {

    var searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&formatversion=2&search=';
    var contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&origin=*&format=json&formatversion=2&titles=';

    function loadJSON(file, callback) {   
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);  
    }

    function goWiki() {
        var term = $('input:text').val();
        var url = searchUrl + term;
        loadJSON(url, gotSearch, 'jsonp');
    }

    function gotSearch(data) {
        data = JSON.parse(data);
        console.log(data);
        var len = data[1].length;
        var index = Math.floor(Math.random() * len);//give random article
        var title = data[1][index];
        title = title.replace(/\s+/g, '_');
        console.log('Querying ' + title);
        var url = contentUrl + title;
        loadJSON(url, gotContent, 'jsonp');
    }

    function gotContent(data) {
        data = JSON.parse(data);
        var page = data.query.pages;
        var pageId = Object.keys(data.query.pages)[0];
        var content = page[pageId].revisions[0];
        console.log(content);
        var wordRegex = /\b\w{4,}\b/g;
        var words = String(content).match(wordRegex);
        console.log(words);
    }

    $('button').on('click', function() {
        $('ul').append('<li>' + $('input:text').val() + '</li>');
        goWiki();
    });
   
});
