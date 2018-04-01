var searchUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&formatversion=2&search=";
//https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json&formatversion=2

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
    loadJSON(url, gotData, 'jsonp');
}

function gotData(data) {
    data = JSON.parse(data);
    console.log(data[1]);
    var len = data[1].length;
    var index = Math.floor((Math.random() * 10) + 1);//give random article
    console.log(data[1][index]);
}

$(document).ready(function() {
    /*$("input").mouseover(function() {
        $(this).focus();
    });*/
    /*$("input").mouseenter(function() {
           goWiki();
           $("ul").append("<li>" + $("input:text").val() + "</li>");
    });*/

    $('button').on('click', function() {
        $('ul').append('<li>' + $('input:text').val() + '</li>');
        goWiki();
    });

    /*$("input").change(function() {

    });*/

    
});
