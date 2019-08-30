// function auto_refresh() {
//     $(document).ready(function(){
//         $.ajax({
//             type : "GET",
//             url : "http://192.168.99.25",
//             crossOrigin: null,
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': 'GET'
//             } ,
//             dataType : "html",
//             error : function(){
//                 alert("통신실패!!!!");
//             },
//             success : function(data){
//                 // $("#temperature").html(data); //div에 받아온 값을 넣는다.
//                 console.log(data);
//                 data_final = $(data).find("#temperature");
//                 alert("통신 데이터 값 : " + data_final);
//             }
//         });
//     });
// };
// setInterval('auto_refresh()',30000);

function auto_refresh() {
    $(document).ready(function(){
        $.ajax({
            type : "GET",
            url : "http://192.168.99.25",
            crossOrigin: null,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000/main',
                'Access-Control-Allow-Methods': 'GET'
            } ,
            // dataType : "html",
            error : function(){
                console.log("통신 실패!");
            },
            success : function(result){
                console.log(result);
                var data_result = $("#temperature").html(result).find('div'); //div에 받아온 값을 넣는다.
                console.log(data_result);
                $("#temperature").html(data_result);

            }
        });
    });
};

setInterval('auto_refresh()',10000);