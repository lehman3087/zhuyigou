function s(s){if(!$('#' + s))return;$('#' + s).show();}
function h(s){if(!$('#' + s))return;$('#' + s).hide();}
var scroll_status=0;
$(document).ready(function() {
    var scCookie = $.cookie('scData');
    if (scCookie != null) {
        scData = $.parseJSON(scCookie);
        var num=7;
        if(scData.scRecords.length<7){
            num=scData.scRecords.length;
        }
        for ( var i = 0; i < num; i++) {
            $(".c_cont1").append("<div class='pics'><a href='"+scData.scRecords[i].url+"' target='_blank'>" +
                "<img src='http://stylepics.bavlo.com/NewStylePic/"+scData.scRecords[i].pic+"!sm' width='120' height='100' title='"+scData.scRecords[i].name+"' alt='"+scData.scRecords[i].name+"'/>" +
                "<span>¥"+scData.scRecords[i].price+"元</span></a><em><a href='javascript:void(0)' class='"+scData.scRecords[i].closeType+"' sid='"+scData.scRecords[i].id+"'></a></em></div>")
        }
        var length=scData.scRecords.length;
        var totalPage=length%7==0?length/7:parseInt(length/7)+1;
        $("#collectChange").attr("totalPage",totalPage);
        $(".closespan").bind("click",collectRemove);
    }
    var hsCookie = $.cookie('hsData');
    if (hsCookie != null) {
        hsData = $.parseJSON(hsCookie);
        var num=7;
        if(hsData.history.length<7){
            num=hsData.history.length;
        }
        for ( var i = 0; i < num; i++) {
            $(".ScrCont").append("<div class='pics'><a href='"+hsData.history[i].url+"' target='_blank'>" +
                "<img src='http://stylepics.bavlo.com/NewStylePic/"+hsData.history[i].pic+"!sm' width='120' height='100' title='"+hsData.history[i].name+"' alt='"+hsData.history[i].name+"'/></a>" +
                "</div>")
        }
        var length= hsData.history.length;
        var totalPage=length%7==0?length/7:parseInt(length/7)+1;
        $("#historyChange").attr("totalPage",totalPage);
    }
    var userId=$("#userId").val();
    if(userId!=""){
        loadShoppingCart(userId);
    }
})
$(function(){
    //滚动广告
    //$("#scrollobj").bind("mouseover",mouseoverscroll);
    //$("#scrollobj").bind("mouseout",mouseoutscroll);
    //setInterval("scrollObj(document.getElementById('scrollobj'))",20);
    $(".closespan").bind("click",collectRemove);
    $("#loversJewelry,#base_content_folw").hover(function(){
        $("#base_content_folw").css({
            left : $("#loversJewelry").offset().left-18  ,
            top : $("#loversJewelry").offset().top + 40
        });
        $("#base_content_folw").css("display","block")
    },function(){
        $("#base_content_folw").css("display","none");
    })
    $(".sear_ch_input,.qqtext").click(function(){
        $(this).val("");
        $(this).css("color","black");
    })
})
function scrollObj(obj) {
    if(scroll_status==0){
        var tmp = (obj.scrollLeft)++;
        //当滚动条到达右边顶端时
        if (obj.scrollLeft==tmp) obj.innerHTML += obj.innerHTML;
        //当滚动条滚动了初始内容的宽度时滚动条回到最左端
        // if (obj.scrollLeft>=obj.firstChild.offsetWidth) obj.scrollLeft=0;
    }
}
function mouseoverscroll(){
    scroll_status=1;
}
function mouseoutscroll(){
    scroll_status=0;
}
function pageTurning(type){
    var indexPage=$("#collectChange").attr("indexPage");
    var totalPage=$("#collectChange").attr("totalPage");
    if(type=="left"){
        indexPage--;
    }else{
        indexPage++;
    }
    if(indexPage==0||indexPage>totalPage){
        return false;
    }else{
        var scCookie = $.cookie('scData');
        if (scCookie != null) {
            scData = $.parseJSON(scCookie);
            $(".c_cont1").empty();
            var num=indexPage*7;
            if(scData.scRecords.length<num){
                num=scData.scRecords.length;
            }
            for ( var i=(indexPage-1)*7; i < num; i++) {
                $(".c_cont1").append("<div class='pics'><a href='"+scData.scRecords[i].url+"' target='_blank'>" +
                    "<img src='http://stylepics.bavlo.com/NewStylePic/"+scData.scRecords[i].pic+"!sm' width='120' height='100' title='"+scData.scRecords[i].name+"' alt='"+scData.scRecords[i].name+"'/>" +
                    "<span>¥"+scData.scRecords[i].price+"元</span></a><em><a href='javascript:void(0)' class='"+scData.scRecords[i].closeType+"' sid='"+scData.scRecords[i].id+"'></a></em></div>")
            }
            $("#collectChange").attr("indexPage",indexPage);
            $(".closespan").bind("click",collectRemove);
        }
    }
}
function hsPageTurning(type){
    var indexPage=$("#historyChange").attr("indexPage");
    var totalPage=$("#historyChange").attr("totalPage");
    if(type=="left"){
        indexPage--;
    }else{
        indexPage++;
    }
    if(indexPage==0||indexPage>totalPage){
        return false;
    }else{
        var hsCookie = $.cookie('hsData');
        if (hsCookie != null) {
            hsData = $.parseJSON(hsCookie);
            $(".ScrCont").empty();
            var num=indexPage*7;
            if(hsData.history.length<num){
                num=hsData.history.length;
            }
            for ( var i = (indexPage-1)*7; i < num; i++) {
                $(".ScrCont").append("<div class='pics'><a href='"+hsData.history[i].url+"' target='_blank'>" +
                    "<img src='http://stylepics.bavlo.com/NewStylePic/"+hsData.history[i].pic+"!sm' width='120' height='100' title='"+hsData.history[i].name+"' alt='"+hsData.history[i].name+"'/>" +
                    "</div>");
            }
            $("#historyChange").attr("indexPage",indexPage);
        }
    }
}
function addStyleCollect() {
    var id = $(this).attr('styleId');
    var price = parseInt($(this).attr('price'));
    var name=$(this).attr('styleName');
    var pic=$(this).attr('picUrl');
    var url="../web/detail_"+id+".html";
    var closeType="closespan";
    var scCookie = $.cookie('scData');
    var scData = {
        count : 0,
        scRecords : []
    };
    if (scCookie != null) {
        scData = $.parseJSON(scCookie);
    }
    var collected = false;
    for ( var i = 0; i < scData.scRecords.length; i++) {
        var _id = scData.scRecords[i].id;
        // collected then remove
        if (id == _id) {
            scData.scRecords.splice(i, 1);
            scData.count = scData.count - 1;
            collected = true;
            if($("#products_price"+id+" span")!=""){
                $("#products_price"+id+" span").bind("mouseover",xingMouseOver);
                $("#products_price"+id+" span").bind("mouseout",xingMouseOut);
                $("#products_price"+id+" span").removeClass("xing_hover")
                $("#products_price"+id+" span").addClass('xing');
                $("#products_price"+id+" span").removeAttr('title');
            }
        }
    }
    // not collected
    if (!collected) {
        scData.scRecords.push({
            id : id,
            price : price,
            name:name,
            pic:pic,
            url:url,
            closeType:closeType
        });
        scData.count = scData.count + 1;
    }
    $.cookie('scData', JSON.stringify(scData), {
        path : '/',
        expires:30
    });
    $('.c_cont1').empty();
    var num=7;
    if(scData.scRecords.length<7){
        num=scData.scRecords.length;
    }
    for ( var i = 0; i < num; i++) {
        $(".c_cont1").append("<div class='pics'><a href='"+scData.scRecords[i].url+"' target='_blank'>" +
            "<img src='http://stylepics.bavlo.com/NewStylePic/"+scData.scRecords[i].pic+"!sm' width='120' height='100' title='"+scData.scRecords[i].name+"' alt='"+scData.scRecords[i].name+"'/>" +
            "<span>¥"+scData.scRecords[i].price+"元</span></a><em><a href='javascript:void(0)' class='"+scData.scRecords[i].closeType+"' sid='"+scData.scRecords[i].id+"'></a></em></div>")
    }
    var length=scData.scRecords.length;
    var totalPage=length%7==0?length/7:parseInt(length/7)+1;
    scroll(0,0);
    $("#collectChange").attr("totalPage",totalPage);
    $(".closespan").bind("click",collectRemove);
    $('#collect').addClass('rt_menu3');
    $("#set_sub1").slideDown(800, function() {
        $("#set_sub1").slideUp(800, function() {
            $('#collect').removeClass('rt_menu3');
        });
    });
    if (!collected) {
        $("#products_price"+id+" span").attr('class','xing_hover');
        $("#products_price"+id+" span").attr('title','取消收藏');
        $("#products_price"+id+" span").unbind('mouseover mouseout');
    }
}
function collectRemove() {
    var id = $(this).attr("sid");
    var cookie = $.cookie('scData');
    var scData = $.parseJSON(cookie);
    for ( var i = 0; i < scData.scRecords.length; i++) {
        if (scData.scRecords[i].id == id) {
            scData.scRecords.splice(i, 1);
            scData.count = scData.count - 1;
            $.cookie('scData', JSON.stringify(scData), {
                path : '/'
            });
            break;
        }
    }
    var length=scData.scRecords.length;
    var totalPage=length%7==0?length/7:parseInt(length/7)+1;
    $("#collectChange").attr("totalPage",totalPage);
    $(this).parent().parent().remove();
}
function search_all(){
    var search_str = document.getElementById("search_str").value;
    search_str = search_str.replace(/\ /g,'');
    if(search_str == ''){
        return false;
    }
    var url = window.location+'';
    if(url.indexOf('web/searchResult.html') > -1){
        window.location = '../web/searchResult.html?search_key='+encodeURI(search_str);
    }else{
        window.open('../web/searchResult.html?search_key='+encodeURI(search_str));
    }
}
function enterSumbit(){
    var event=arguments.callee.caller.arguments[0]||window.event;
    if (event.keyCode == 13){
        search_all();
    }
}
function loadShoppingCart(userId){
    $.ajax({
        url : '../order/loadShoppingCart',
        type : 'POST',
        data : {"userId" : userId},
        dataType : 'json',
        success : function(data, sts) {
            var list=data.map.list;
            var html="";
            if(list.length>0){
                for(var i=0;i<list.length;i++){
                    if(list[i].diyStyleId==""||list[i].diyStyleId==null){
                        html+="<dl class='dl_s'><dt><img src='http://cj.bavlo.com"+list[i].pic+"' width='120' height='100' alt='购物车商品' onclick='showDiamondDetail("+list[i].diamondId+")'/></dt>" +
                            "<dd><span>"+list[i].quantity+" 件</span>" +
                            "<span>￥"+list[i].price+" 元</span><span class='rmShoppingCart' onclick='removeShoppingCart("+list[i].id+")'><img src='http://cj.bavlo.com/web/image/header/x.gif' /></span></dd></dl>";
                    }else{
                        html+="<dl class='dl_s'><dt><img src='http://stylepics.bavlo.com"+list[i].pic+"!sm' width='120' height='100' alt='购物车商品' onclick='showOrderDetail("+list[i].diyStyleId+")'/></dt>" +
                            "<dd><span>"+list[i].quantity+" 件</span>" +
                            "<span>￥"+list[i].price+" 元</span><span class='rmShoppingCart' onclick='removeShoppingCart("+list[i].id+")'><img src='http://cj.bavlo.com/web/image/header/x.gif' /></span></dd></dl>";
                    }

                }
                html+='<p class="s2">￥'+data.map.totalPrice+' 元</p><div class="bnt">'+
                    '<input type="button" value="去结账" onclick="toPay()" class="input" onmouseover="this.className=\'input_hover\'" onmouseout="this.className=\'input\'"/> '+
                    '<input type="button" value="继续购物" onclick="toBuy()" class="input" onmouseover="this.className=\'input_hover\'" onmouseout="this.className=\'input\'"/></div>';
                $(".gouwu").empty();
                $(".gouwu").append(html);
            }else{
                html+="<p style='color: #E3D1B6;text-align: center; font-size: 16px;'>购物车中无商品</p>";
                $(".gouwu").empty();
                $(".gouwu").append(html);
            }
        }
    })
}
function removeShoppingCart(id){
    var userId=$("#userId").val();
    $.ajax({
        url : '../order/removeShoppingCart',
        type : 'POST',
        data : {
            "id" : id
        },
        success : function(data, sts) {
            loadShoppingCart(userId);
        }
    })
}
function toPay(){
    window.location="/order";

    if($('#set_sub2 dl').size()==0){
        alert('购物车里没有商品');
        return false;
    }
    $.ajax({
        url : '../order/checkCartDia',
        type : 'POST',
        success : function(data) {
            window.location="../order/updateShoppingCart";
        }
    })

}
function toBuy(){
    $('#shoppingCart').trigger('mouseout');
}
function showOrderDetail(id){
    TINY.box.show('../order/orderDetail?id='+id,1,0,0,1)
}
function showDiamondDetail(id){
    TINY.box.show('../order/diamondOrderDetail?id='+id,1,0,0,1)
}
//登录页面
function logout(){
    $.ajax({
        url : '../web/logout',
        type : 'POST',
        success : function(data) {
            window.location.href= "http://"+window.location.host;
        }
    });
}
function closeThis(){
    TINY.box.hide();
}
function xingMouseOver(){
    $(this).removeClass("xing");
    $(this).addClass("xing_hover");
}
function xingMouseOut(){
    $(this).removeClass("xing_hover");
    $(this).addClass("xing");
}