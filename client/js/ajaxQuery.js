var API = 'https://meonzzi.newslabfellows.com:9000/api/v1.0';
//var API = 'http://ju1115kr.iptime.org:9009/api/v1.0';


function ajaxQuery(type, apiURL, dataset) {
    var result = "";
    $.ajax({type: type,
        url: API + apiURL,
        contentType: 'application/json; charset=utf-8',
        traditional: true,
        async: false,
        //data: JSON.stringify(dataset),
        data: dataset,
        success: function(data){
            //console.log(data);
            result = data;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status, ajaxOptions, thrownError);
            return false;
        }
    });
    return result;
}

