var API = 'http://ju1115kr.iptime.org:9009/api/v1.0';

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

function ajaxTest(){
    var SendInfo = { author_id:"123", context:"test", x:0, y:0 };

    //ajaxQuery(type='get', apiURL='/particle', dataset=SendInfo);

    //$.ajax({
    //    type: 'post',
    //    url: 'http://ju1115kr.iptime.org:9009/api/v1.0/particle',
    //    data: JSON.stringify(SendInfo),
    //    contentType: "application/json; charset=utf-8",
    //    traditional: true,
    //    success: function(data, response){
    //        console.log(data);
    //        console.log(response);
    //    }
    //});

    //$.ajax({
    //    type: 'get',
    //    url: 'http://ju1115kr.iptime.org:9009/api/v1.0/particle',
    //    contentType: 'application/json; charset=utf-8',
    //    traditional: true,
    //    success: function(data, response){
    //        if (data !== "[]") {
    //            console.log(data.particles);
    //            for(i=0; i<data.particles.length; i++) {
    //                var date = new Date(data.particles[i].created_at);
    //                console.log(date.toLocaleDateString());
    //                console.log(date.toLocaleTimeString());
    //            }
    //        }
    //        else { console.log("No data inside"); }
    //    }
    //});
}

