var params={};
var spCartParams={};
spCartParams.price=$(".jiage").find("b").text();
$(document).ready(function(){
    $("#bannerleft").cycle({
        fx: 'fade',
        speed: 1000,
        timeout: 4000,
        pause: 1,
        prev: '#rightbtn',
        next: '#leftbtn',
        pager: '.bottonleft',
        pauseOnPagerHover: 1
    });
    $('#link').hover(function(){
        $(this).css('height','auto');
    },function(){
        $(this).css('height','25px');
    });
});
$(function(){
    $(".plaything").click(function(){
        $("#playthingGem_"+$(this).siblings(".plaything_sel").attr("pid")).hide();
        $("#playthingGem_"+$(this).attr("pid")).show();
        $(this).addClass("plaything_sel");
        $(this).siblings(".plaything_sel").removeClass("plaything_sel");

    })
    $(".loadingStyleImgs").lazyload({
        effect : "fadeIn",
        load :function(){
            $(this).removeClass('loadingStyleImgs');
            $(this).addClass('lazyLoadImage');
        }
    });
    params.cameraName="RightFront";
    $('#addShoppingCart').click(function(){
        addToCart();
    });
    $("#fontStyle").change(function(){
        $("#diyText").css("fontFamily",$("#fontStyle").val());
        $("#parameterFont").find("p span:last").css("fontFamily",$("#fontStyle").val());;
    })
    $(".font_btn").click(function(){
        var _parent=$(this).parent().parent().parent();
        $(_parent).prev().removeClass("select_s_hover");
        $(_parent).prev().addClass("select_s");
        $(_parent).prev().bind("mouseover",onmouseover);
        $(_parent).prev().bind("mouseout",onmouseout);
        $(_parent).css("display","none");
    })
    $(".login").click(function(){
        $(this).css({display:"none"});
    })
    $("#login_t").hover(function(){
        $(".login").unbind("click");
    },function(){
        $(".login").click(function(){
            $(this).css({display:"none"});
        })
    })
    $(".d_put").hover(function(){
        $(this).removeClass("d_put");
        $(this).addClass("d_put_hover");
    },function(){
        $(this).removeClass("d_put_hover");
        $(this).addClass("d_put");
    })
    $(".metalImg").bind("click",metalClick);
    $(".metalImg").bind("mouseover",metalmouseover);
    $(".metalImg").bind("mouseout",metalmouseout);
    $("#addCollect").bind("click",addStyleCollect);
    if (!window.XMLHttpRequest){
        $(".gem_ico").find("img").remove();
    }
    //2013.7.26

    $("#ringSizeSelect").change(function(){
        $("#ringSizeView").text($(this).val());
        mergePic();
    })
    $("input[name='priceConfig']").click(function(){
        window.location="/web/"+$(this).val()+"_detail_"+$("#styleId").val()+".html";
    })
    $(".det_ch_left li span").click(function(){
        window.location="/web/"+$(this).prev().val()+"_detail_"+$("#styleId").val()+".html";
    })
    $(".cameraName").click(function(){
        params.cameraName=$(this).attr("cameraName");
        mergePic();
    })
    $(".select_s ,.select_s_hover").click(function(){
        $(".btn_diy_over").css("display","none");
        var display=true;
        if($(this).next("div").css("display")!="none"){
            display=false;
            $(this).removeClass("select_s_hover");
            $(this).addClass("select_s");
            $(this).bind("mouseover",onmouseover);
            $(this).bind("mouseout",onmouseout);
        }else{
            $(".select_s_hover").bind("mouseover",onmouseover);
            $(".select_s_hover").bind("mouseout",onmouseout);
            $(".select_s_hover").addClass("select_s");
            $(".select_s_hover").removeClass("select_s_hover");
            $(this).addClass("select_s_hover");
            $(this).removeClass("select_s");
            $(this).unbind("mouseover mouseout");
        }
        $(this).siblings("div").css("display","none");
        if(display){
            $(this).next("div").css("display","block");
            $(this).find(".btn_diy_over").css("display","block");
        }
        else{
            $(this).next("div").css("display","none");
            $(this).find(".btn_diy_over").css("display","none");
        }
    })
    $(".select_s").bind("mouseover",onmouseover);
    $(".select_s").bind("mouseout",onmouseout);
    $("ul[name='gem_select']").click(function(){
        var layerId=$(this).attr("layerId");
        var gemId=$(this).attr("gemId");
        var gemType=$(this).attr("gemType");
        if($("#status"+layerId).val()!='unload'){
            var html="<ul class='list_ul2'>";
            $.ajax({
                url : '../web/loadDetailGemList',
                type : 'POST',
                data :{'layerId' : layerId},
                success : function(data, sts) {
                    var json=eval(data);
                    html+="<input type='hidden' id='status"+layerId+"' value='unload'>";
                    for(var i=0;i<json.length;i++){
                        if(gemId==json[i].id&&gemType==json[i].type){
                            html+="<input type='hidden' id='selectId' value='"+json[i].id+"'>";
                            html+="<li class='gemImgSelected' gemId='"+json[i].id+"' layerId='"+layerId+"' type='"+json[i].type+"' weight='"+json[i].weight+"' color='"+json[i].color+"' pic='http://img.bavlo.com/GemPics/"+json[i].shape+"_"+json[i].colorId+".png'><a>";
                            if (window.ActiveXObject) {
                                var ua = navigator.userAgent.toLowerCase();
                                var ie=ua.match(/msie ([\d.]+)/)[1]
                                if(ie==6.0){
                                    html+="<span style=\"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://img.bavlo.com/GemPics/"+json[i].shape+"_"+json[i].colorId+".png',sizingMethod='image')\"></span>";
                                    html+="<img style='display:none;' class='gemImg_mouseOver' id='imgGem"+json[i].id+""+layerId+"' src='http://img.bavlo.com/GemPics/"+json[i].shape+"_"+json[i].colorId+".png'>";
                                }else{
                                    html+="<img class='gemImg_mouseOver' id='imgGem"+json[i].id+""+layerId+"' src='http://img.bavlo.com/GemPics/"+json[i].shape+"_"+json[i].colorId+".png'>";
                                }
                            }else{
                                html+="<img class='gemImg_mouseOver' id='imgGem"+json[i].id+""+layerId+"' src='http://img.bavlo.com/GemPics/"+json[i].shape+"_"+json[i].colorId+".png'>";
                            }
                            html+="</a><span>"+json[i].name+"</span></li>";
                        }else{
                            html+="<li class='gemImg' gemId='"+json[i].id+"'  layerId='"+layerId+"' type='"+json[i].type+"' weight='"+json[i].weight+"' color='"+json[i].color+"' pic='http://img.bavlo.com/GemPics/"+json[i].shape+"_"+json[i].colorId+".png'><a >" ;
                            if (window.ActiveXObject) {
                                var ua = navigator.userAgent.toLowerCase();
                                var ie=ua.match(/msie ([\d.]+)/)[1]
                                if(ie==6.0){
                                    html+="<span style=\"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://img.bavlo.com/GemPics/"+json[i].shape+"_"+json[i].colorId+".png',sizingMethod='image')\"></span>";
                                    html+="<img style='display:none;' class='gemImg_mouseOut' id='imgGem"+json[i].id+""+layerId+"' src='http://img.bavlo.com/GemPics/"+json[i].shape+"_"+json[i].colorId+".png'>";
                                }else{
                                    html+="<img class='gemImg_mouseOut' id='imgGem"+json[i].id+""+layerId+"' src='http://img.bavlo.com/GemPics/"+json[i].shape+"_"+json[i].colorId+".png'>";
                                }
                            }else{
                                html+="<img class='gemImg_mouseOut' id='imgGem"+json[i].id+""+layerId+"' src='http://img.bavlo.com/GemPics/"+json[i].shape+"_"+json[i].colorId+".png'>";
                            }
                            html+="</a><span>"+json[i].name+"</span></li>";
                        }
                    }
                    html+="</ul>"
                    for(var i=0;i<json.length;i++){
                        if(gemId==json[i].id&&gemType==json[i].type){
                            html+="<div class='ruby' id='ruby"+json[i].id+""+layerId+"' style='display:block;'>";
                        }else{
                            html+="<div class='ruby' id='ruby"+json[i].id+""+layerId+"' style='display:none;'>";
                        }
                        html+="<div class='ruby1'><h6>"+json[i].name+"</h6><p>"+json[i].introduce+"</p></div></div>";
                    }
                    $("#gemList_div"+layerId).html(html);
                    gemBindClick(layerId);
                }
            })
        }else{
            return;
        }
    })
})
function textCount(){
    var evt = window.event || arguments.callee.caller.arguments[0]; //
    if(evt.keyCode==37||evt.keyCode==39){
        return;
    }
    var strVal=$('#diyText').val();
    var cToken=0;
    var strReturn="";
    var str="";
    //遍历并判断字符串中的每个字符是否是双字节的
    for(var i=0;i<strVal.length;i++){
        str=strVal.substring(i,i+1);
        if(strVal.charCodeAt(i) > 255&&strVal.charCodeAt(i)!=9829){
            cToken+=2;
        }else{
            cToken+=1;
        }
        if(cToken<=12){
            strReturn+=str;
        }
        if(cToken>=12){
            $('#diyText').val(strReturn);
        }
    }
    $("#parameterFont").find("p span:last").html(strReturn);
}
function viewaddClick(type){
    var el=document.getElementById("diyText");
    if (document.selection) {
        el.focus();
        sel = document.selection.createRange();
        if(type=="and"){
            sel.text = "&";
        }else if(type=="heart"){
            sel.text = "♥";
        }
    }else {
        if(type=="and"){
            el.value+= "&";
        }else if(type=="heart"){
            el.value+= "♥";
        }
    }
    textCount();
}
function onmouseover(){
    $(this).removeClass("select_s");
    $(this).addClass("select_s_hover");
}
function onmouseout(){
    $(this).removeClass("select_s_hover");
    $(this).addClass("select_s");
}
function gemClick(){
    $(this).siblings(".gemImgSelected").addClass("gemImg");
    var id=$(this).siblings(".gemImgSelected").attr("gemId");
    var layerId=$(this).attr("layerId");
    $(".ruby").css("display","none");
    $("#ruby"+$(this).attr("gemId")).css("display","block");
    $("#imgGem"+id+""+layerId).removeClass("gemImg_mouseOver");
    $("#imgGem"+id+""+layerId).addClass("gemImg_mouseOut");
    $("#selectId").val($(this).attr("gemId"));
    $("#imgGem"+$(this).attr("gemId")+""+layerId).removeClass("gemImg_mouseOut");
    $("#imgGem"+$(this).attr("gemId")+""+layerId).addClass("gemImg_mouseOver");
    $(this).siblings(".gemImgSelected").bind("click",gemClick);
    $(this).siblings(".gemImgSelected").bind("mouseover",gemImgOver);
    $(this).siblings(".gemImgSelected").bind("mouseout",gemImgOut);
    $(this).siblings(".gemImgSelected").removeClass("gemImgSelected");
    $(this).removeClass("gemImg");
    $(this).addClass("gemImgSelected");
    $(this).unbind("click mouseover mouseout");
    $(".select_s_hover").attr("gemid",$(this).attr("gemId"));
    $(".select_s_hover").attr("gemtype",$(this).attr("type"));
    $("#parameter"+layerId).find("#gemName").text($(this).find("span").text());
    $("#parameter_ico"+layerId).find("span").remove();
    $("#parameter_ico"+layerId).find("img").attr("src",$(this).attr("pic"));
    if (window.ActiveXObject) {
        var ua = navigator.userAgent.toLowerCase();
        var ie=ua.match(/msie ([\d.]+)/)[1]
        if(ie==6.0){
            var src=$(this).attr("pic");
            var html="<span style=\"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"',sizingMethod='image')\"></span>";
            $("#parameter_ico"+layerId).html(html);
        }
    }
    mergePic();
}
function metalClick(){
    $(this).siblings(".metalImgSelected").addClass("metalImg");
    $(this).siblings(".metalImgSelected").find("img").attr("src","http://cj.bavlo.com/web/images/detail/metal"+$(this).siblings(".metalImgSelected").attr("id")+".gif")
    $(this).siblings(".metalImgSelected").bind("click",metalClick);
    $(this).siblings(".metalImgSelected").bind("mouseover",metalmouseover);
    $(this).siblings(".metalImgSelected").bind("mouseout",metalmouseout);
    $(this).siblings(".metalImgSelected").removeClass("metalImgSelected");
    $(this).removeClass("metalImg");
    $(this).addClass("metalImgSelected");
    $(this).unbind("click mouseover mouseout");
    $(this).find("img").attr("src","http://cj.bavlo.com/web/images/detail/metal"+$(this).attr("id")+"_h.gif")
    $("#parameter"+$(this).attr("layerId")).find("#metalName").text($(this).attr("metalName"));
    $("#parameter_ico"+$(this).attr("layerId")).find("img").attr("src","http://cj.bavlo.com/web/images/detail/metal"+$(this).attr("id")+".gif");
    mergePic();
}
function metalmouseover(){
    var metalId=$(this).attr("id");
    $(this).find("img").attr("src","http://cj.bavlo.com/web/images/detail/metal"+metalId+"_h.gif")
}
function metalmouseout(){
    var metalId=$(this).attr("id");
    $(this).find("img").attr("src","http://cj.bavlo.com/web/images/detail/metal"+metalId+".gif")
}
function gemImgOver(){
    var id=$(this).attr("gemId");
    var layerId=$(this).attr("layerId");
    $(".ruby").css("display","none");
    $("#ruby"+id+""+layerId).css("display","block");
    $("#imgGem"+id+""+layerId).removeClass("gemImg_mouseOut");
    $("#imgGem"+id+""+layerId).addClass("gemImg_mouseOver");
}
function gemImgOut(){
    var id=$(this).attr("gemId");
    var layerId=$(this).attr("layerId");
    $(".ruby").css("display","none");
    $("#ruby"+$("#selectId").val()+""+layerId).css("display","block");
    $("#imgGem"+id+""+layerId).removeClass("gemImg_mouseOver");
    $("#imgGem"+id+""+layerId).addClass("gemImg_mouseOut");
}
function gemBindClick(layerId){
    $(".gemImg").bind("click",gemClick);
    $(".gemImg").bind("mouseover",gemImgOver);
    $(".gemImg").bind("mouseout",gemImgOut);
}
function mergePic(){
    params.styleId=$("#styleId").val();
    params.ringSize=$("#ringSizeSelect").find("option:selected").attr("sizeCode");
    params.chain="";
    params.diyType="index";
    var gemConfig="";
    var metalConfig="";
    $("ul:[name='gem_select']").each(function(){
        gemConfig+=$(this).attr("layerId")+","+$(this).attr("gemId")+","+$(this).attr("gemType")+";"
    })
    $(".metalImgSelected").each(function(){
        metalConfig+=$(this).attr("layerId")+","+$(this).attr("id")+","+$(this).attr("metalType")+";"
    })
    params.gemConfig=gemConfig;
    params.metalConfig=metalConfig;
    $.ajax({
        url : '../web/mergePicture',
        type : 'POST',
        data : params,
        dataType : 'json',
        success : function(data, sts) {
            spCartParams.price=data.price;
            $(".show_ring").attr("src","http://stylepics.bavlo.com/NewStylePic/Ring/"+params.styleId+"/"+params.cameraName+"/"+data.pic+"!max");
            $(".jiage").find("b").text(data.price);
        }
    })
}
function addToCart(){
    var userId=$("#userId").val();
    if(userId==""){
        $(".login").css('display','block');
        return;
    }
    spCartParams.styleId=$("#styleId").val();
    spCartParams.ringSize=$("#ringSizeSelect").find("option:selected").attr("sizeCode");
    spCartParams.chain="";
    var gemConfig="";
    var metalConfig="";
    $("ul:[name='gem_select']").each(function(){
        gemConfig+=$(this).attr("layerId")+","+$(this).attr("gemId")+","+$(this).attr("gemType")+";"
    })
    $(".metalImgSelected").each(function(){
        metalConfig+=$(this).attr("layerId")+","+$(this).attr("id")+","+$(this).attr("metalType")+";"
    })
    spCartParams.gemConfig=gemConfig;
    spCartParams.metalConfig=metalConfig;
    spCartParams.diyText=$("#diyText").val();
    spCartParams.fontStyle=$("#fontStyle").val();;
    spCartParams.userId=userId;
    $.ajax({
        url : '../order/addShoppingCart',
        type : 'POST',
        data : spCartParams,
        success : function(data, sts) {
            loadShoppingCart(userId);
            window.scrollTo(0,0);
            $('#shoppingCart').addClass('rt_menu5');
            $("#set_sub2").slideDown(800, function() {
            });

        }
    })
}
//宝石
function show_menuone(index){
    $(".tab_cont").hide();
    $("#contid"+index).show();
    $(".hao1").removeClass("hao1");
    $("#typeid"+index).addClass("hao1");
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
function refush(obj){
    obj.attr('src','../web/imgValidate?'+Math.random());
}
function login(e){
    $("#costomerLoginForm").validationEngine('attach');
    if($("#costomerLoginForm").validationEngine('validate')){
        $(this).ajaxSubmit({
            dataType: 'json',
            success:function(data,sts){
                var strResult=data.map.strResult;
                var customer=data.map.customer;
                if(strResult!="true"){
                    $('#msg1').show();
                    $('#msg1').html(data.map.message);
                    return false;
                }
                $(".login").css('display','none');
                $(".li01").html("<span>Hi,<a href='../account/myprofile.html'>"+customer.realName+"</a>"+
                    "</span><span><a href='#' onclick='logout()'>注销</a></span>"+
                    "<span><a href='../account/myorders.html'>我的订单</a></span>"+
                    "<input type='hidden' id='userId' value='"+customer.id+"'/>");
                addToCart();
                window.scrollTo(0,0);
            }
        });
    }

    if($('#remember').is(':checked')){
        $.cookie('username', $('#Lusername').val(),{path:'/',expires:30});
        $.cookie('password', $('#Lpassword').val(),{path:'/',expires:30});
    }else{
        $.cookie('username',null,{path:'/'});
        $.cookie('password', null,{path:'/'});
    }
    $("#costomerLoginForm").validationEngine('detach');
    $('#costomerLoginForm').bind('submit',login);
    return false;
}
function reg(e){
    $("#coustomerRegForm").validationEngine('attach');
    if($("#coustomerRegForm").validationEngine('validate')){
        $(this).ajaxSubmit({
            dataType: 'json',
            success:function(data){
                var strResult=data.map.strResult;
                if(strResult == 'error1'){
                    $('#msg3').hide();
                    $('#msg2').show();
                    $('#msg2').html('邮箱已注册!');
                    return false;
                }else if(strResult == 'error2'){
                    $('#msg2').hide();
                    $('#msg3').show();
                    $('#msg3').html('验证码错误!');
                }else{
                    alert('注册成功。');
                    var customer=data.map.customer;
                    $(".login").css('display','none');
                    $(".li01").html("<span>Hi,<a href='../account/myprofile.html'>"+customer.realName+"</a>"+
                        "</span><span><a href='#' onclick='logout()'>注销</a></span>"+
                        "<span><a href='../account/myorders.html'>我的订单</a></span>"+
                        "<input type='hidden' id='userId' value='"+customer.id+"'/>");
                    addToCart();
                    window.scrollTo(0,0);
                }
            }
        });
    }

    $("#coustomerRegForm").validationEngine('detach');
    $('#coustomerRegForm').bind('submit', reg);
    return false;
}
function forgetPwd(e){
    $('#error').html('');
    $("#forgetPwdForm").validationEngine('attach');
    if($("#forgetPwdForm").validationEngine('validate')){
        $(this).ajaxSubmit({
            success:function(data){
                if(data == 'error'){
                    $('#error').html('该Email没有注册用户');
                }else{
                    alert('密码已重置，已发送至您的邮箱。');
                }
            }
        });
    }

    $("#forgetPwdForm").validationEngine('detach');
    $('#forgetPwdForm').bind('submit', forgetPwd);
    return false;
}
$(function(){
    var lefts=(document.body.offsetWidth-885) / 2;
    $("#login_t").css('margin-left',lefts);
    $("#coustomerRegForm").validationEngine({
        //	validationEventTrigger:'click'
    }) ;
    $('#Lpassword').keypress(function(event) {
        if (event.which == 13) {
            login;
        }
    })
    $('#ReRpassword').keypress(function(event) {
        if (event.which == 13) {
            reg;
        }
    });

    //$('#registercontent :input').not(':button').val('');
    if ($.cookie('username')) {
        $('#Lusername').val($.cookie('username'));
    }
    if ($.cookie('password')) {
        $('#Lpassword').val($.cookie('password'));
        $('#remember').attr('checked', 'checked');
    }
    $('#msg1').hide();
    $('#msg2').hide();
    $('#Lusername').focus();

    $('#forgetPwdForm').validationEngine('hideAll');
    $('#costomerLoginForm').validationEngine('hideAll');
    $('#coustomerRegForm').validationEngine('hideAll');

    $('#costomerLoginForm').bind('submit',login);
    $("#costomerLoginForm").validationEngine('init');
    $('#coustomerRegForm').bind('submit',reg);
    $("#coustomerRegForm").validationEngine('init');
    $('#forgetPwdForm').bind('submit',forgetPwd);
    $("#forgetPwdForm").validationEngine('init');
});