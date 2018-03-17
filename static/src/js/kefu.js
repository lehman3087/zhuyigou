function search_result(){
	var search_str = document.getElementById("search_key").value;
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
function enterSearch(){
	var event=arguments.callee.caller.arguments[0]||window.event;
	if (event.keyCode == 13){
		search_result();
    }
}
$(document).ready(function(){
	var $backToTopTxt = "", $backToTopEle = $('<div class="back"></div>').appendTo($("body"))
	.text($backToTopTxt).attr("title", $backToTopTxt).click(function() {
		$("html, body").animate({ scrollTop: 0 }, 120);
	}), $backToTopFun = function() {
		var st = $(document).scrollTop(), winh = $(window).height();
		(st > 0)? $backToTopEle.show(): $backToTopEle.hide();
		//IE6锟铰的讹拷位
		if (!window.XMLHttpRequest) {
			$backToTopEle.css("top", st + winh - 33);
			$backToTopEle.css("right", 131);
		}
	};
	$(window).bind("scroll", $backToTopFun);
	$(function() { $backToTopFun(); });

	var html1 = '<div class="qqbox" id="divQQbox" style="top: 250px; ">'
			  + '<div class="qqlv" id="meumid2" style="display: none; ">'
			  + '<a class="qqa3"><img src="http://cj.bavlo.com/web/images/kefu/1_01.jpg" width="25px" height="15px" alt="瀹㈡湇"/></a>'
			  + '<a href="tencent://message/?uin=2366746022&Site=瀹濈彂缃�&Menu=yes" class="qqa1"><img src="http://cj.bavlo.com/web/images/kefu/1_02.jpg" width="25px" height="91px" alt="瀹㈡湇"/></a>'
			  + '<a href="tencent://message/?uin=2366746022&Site=瀹濈彂缃�&Menu=yes" class="qqa2"><img src="http://cj.bavlo.com/web/images/kefu/1_03.jpg"  width="25px" height="72px" alt="瀹㈡湇"/></a>'
			  + '</div>'
			  + '<div class="qqkf" style=" " id="contentid">'
			  + '<div class="qqkfbt" id="qq-1"><img src="http://cj.bavlo.com/web/images/kefu/2.gif" width="10px" height="8px" alt="瀹㈡湇" style="position:relative;top:6px;right:10px"></div>'
			  + '<div id="K1" style="text-align: center; display: block; ">'
			  + '<div class="qqkfhm ">'
			  + '<a href="tencent://message/?uin=2366746022&Site=瀹濈彂缃�&Menu=yes"><img border="0" src="http://cj.bavlo.com/web/images/kefu/3.gif" width="74px" height="23px" alt="瀹㈡湇" title="鍦ㄧ嚎瀹㈡湇"></a>'
			  + '<a href="tencent://message/?uin=2366746022&Site=瀹濈彂缃�&Menu=yes"><img border="0" src="http://cj.bavlo.com/web/images/kefu/4.gif"  width="74px" height="23px" alt="瀹㈡湇" title="鍞悗鏈嶅姟"></a>'
			  + '<div class=" bgdh">'
			  + '<input class="qqtext" style="border:none;background:none;" type="text" onkeypress="enterSearch()" id="search_key" value="'+$('#search_str').val()+'" maxlength="5">'
			  + '<input class="qqso" onclick="search_result()" style="border:none;background:none;" type="button" title="鎼滅储" value="">'
			  + '</div>'
			  + '</div>'
			  + '<div class="qqkfhm ">'
			  + '<img border="0" src="http://cj.bavlo.com/web/images/kefu/6.gif" width="77px" height="76px" alt="瀹㈡湇" title="瀹㈡湇" style="margin:5px auto">	 '
	          + '鍔犲井淇�  閫佺彔瀹�            '
			  + '<a target="_blank" href="../web/weixin.html" style="color:#8c0000">璇︽儏>></a>'
			  + '</div>'
			  + '<div class="qqkfhm " style="background:#BBB;">'
			  + '<iframe allowtransparency="" border="0" frameborder="0" height="22" marginheight="0" marginwidth="0" scrolling="no" src="http://widget.weibo.com/relationship/followbutton.php?width=200&amp;height=22&amp;uid=2611818705&amp;style=5&amp;btn=red&amp;dpc=1" style="width: 64px; height: 22px;" width="200"></iframe>'
			  + '</div></div></div></div>';

	var html = '<div id="float">'
			 + '<div id="kefu1">'
			 + '<div class="click_a1"><a id="onlineSales" href="tencent://message/?uin=2366746022&Site=瀹濈彂缃�&Menu=yes"></a></div>'
			 + '<div class="click_a2"><a id="AfterService" href="tencent://message/?uin=312438272&Site=瀹濈彂缃�&Menu=yes"></a></div>'
			 + '<div id="click_btn">'
			 + '<input type="button" onclick="search_result()">'
			 + '</div>'
			 + '<div id="input_text">'
			 + '<input type="text" onkeypress="enterSearch()" id="search_key" value="'+$('#search_str').val()+'" maxlength="5">'
			 + '</div>'
			 + '<div id="guanzhu"><iframe allowtransparency="" border="0" frameborder="0" height="22" marginheight="0" marginwidth="0" scrolling="no" src="http://widget.weibo.com/relationship/followbutton.php?width=200&amp;height=22&amp;uid=2611818705&amp;style=5&amp;btn=red&amp;dpc=1" style="width: 64px; height: 22px;" width="200"></iframe></div>'
			 + '<div id="hide"><a style="cursor:pointer;"></a></div>'
			 + '</div>'
			 + '<div id="kefu2">'
			 + '<div id="show"><a style="cursor:pointer;"><img src="http://cj.bavlo.com/web/images/fanhuizuo.jpg?version=2" width="26" height="15"></a></div>'
			 + '<div style="margin-top:1px;"><a id="onlineSales" href="tencent://message/?uin=2366746022&Site=瀹濈彂缃�&Menu=yes"><img src="http://cj.bavlo.com/web/images/zaixiankefushutiao.jpg?version=2" width="26" height="92"></a></div>'
			 + '<div style="margin-top:1px;"><a id="AfterService" href="tencent://message/?uin=312438272&Site=瀹濈彂缃�&Menu=yes"><img src="http://cj.bavlo.com/web/images/shouhoufuwshutiao.jpg?version=2" width="26" height="92"></a></div>'
			 + '</div>'
			 + '</div>';



	var $backToTopKF1 = "", $backToTopKFEle1 = $(html1).appendTo($("body"));

$(function(){
	$('#contentid').hide();
	$('#meumid2').show();
	$('#qq-1').click(function(){
		$('#contentid').hide();
		$('#meumid2').show();
	});
	$('.qqa3').click(function(){
		$('#meumid2').hide();
		$('#contentid').show();
	});
});
});
