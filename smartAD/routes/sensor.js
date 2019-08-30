function auto_refresh() {
    $(document).ready(function(){
        $.ajax({
            type : "GET",
            url : "http://192.168.99.25",
            crossOrigin: null,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET'
            } ,
            dataType : "html",
            error : function(){
                alert("통신실패!!!!");
            },
            success : function(data){   
                $("#temperature").html(data); //div에 받아온 값을 넣는다.
                alert("통신 데이터 값 : " + data);
            }
        });
    });
};
setInterval('auto_refresh()',30000);