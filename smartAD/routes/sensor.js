function auto_refresh() {
    $(document).ready(function(){
        $.ajax({
            type : "GET",
            url : "http://192.168.99.25",
            headers: {
                'Access-Control-Allow-Origin':'*',
            },
            dataType : "text",
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
setInterval('auto_refresh()', 30000);