$(document).ready(function(){

    $.ajax({
        url: "/data",
        type: "GET",
        dataType: "JSON",
        success: function(data){

            var str = "";
            var arr = [ "albaniaTravelVoyage",
                        "eTour",
                        "flyTravel",
                        "globalTravel",
                        "globusTravel",
                        "kalemiTravel",
                        "noLimits",
                        "unionTravel"];

            function agjensia(emri){

                str = "";

                for(var i=0; i<data[emri]["links"].length; i++){

                    if(i%3==0||i==0) str +=`<div class="row container-fluid">`;

                    str += `<div class="col-md-3 col-sm-5 mr-auto fushat container"><a href="` + data[emri]["links"][i] + `">
                            <img class="images" src="` + data[emri]["img"][i] + `">
                            <h3 class="title">` + data[emri]["titulli"][i] + `</h3>
                            <p class="description">` + data[emri]["pershkrimi"][i] + `</p>
                            </a></div>`;

                    if(i%3==2) str +=`</div>`;

                }

                str+=`</div>`;

                $("#"+emri).html(str);

            }

            for (var j=0; j<arr.length; j++){
                agjensia(arr[j]);
            }

        }
    });

});
