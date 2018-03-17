var params={};
params.orderTypeWt="asc";
params.orderTypePc="asc";
params.productsTotal=24;
params.pageIndex=1;
params.symmetry="";
params.polish="";
params.fluorescence="";
params.calibrated_x="";
params.report="";
function shows(obj){
	if(obj.style.display=="none"){
		obj.style.display="";
	}else{
		obj.style.display="none";
		params.symmetry="";
		params.polish="";
		params.fluorescence="";
		params.report="";
	}
}

function chkClick(img){
    if(img.src.indexOf("gj1.jpg") ==-1){
	    	params.symmetry="";
			params.polish="";
			params.fluorescence="";
			params.report="";
	        img.src="http://cj.bavlo.com/web/images/diamond/gj1.jpg";
    }else{
            img.src="http://cj.bavlo.com/web/images/diamond/gj2.jpg";
    }
}
function setParam(){
	params.shape="";
	$(".shape_h").each(function(){
		params.shape+=$(this).attr("shape")+",";
	})
	params.color="";
	$(".color_h").each(function(){
		params.color+=$(this).attr("color")+",";
	})
	params.clarity="";
	$(".clarity_h").each(function(){
		params.clarity+=$(this).attr("clarity")+",";
	})
	params.cut="";
	$(".cut_h").each(function(){
		params.cut+=$(this).attr("cut")+",";
	})
	if($(".row8").find("img").attr("src").indexOf("gj1.jpg") !=-1){
		params.symmetry="";
		$(".symmetry_h").each(function(){
			params.symmetry+=$(this).attr("symmetry")+",";
		})
		params.polish="";
		$(".polish_h").each(function(){
			params.polish+=$(this).attr("polish")+",";
		})
		params.fluorescence="";
		$(".fluorescence_h").each(function(){
			params.fluorescence+=$(this).attr("fluorescence")+",";
		})
		params.report="";
		$(".report_h").each(function(){
			params.report+=$(this).attr("report")+",";
		})
		params.calibrated_x=$(".calibrated_x").val();
	}
	params.minWeight=$("#weight_min").val();
	params.maxWeight=$("#weight_max").val();
	params.minPrice=$("#price_min").val();
	params.maxPrice=$("#price_max").val();
	params.pageIndex=1;
}


function joinFilter(pparams) {
	var joinFilterString = ''
	for(var i=0;i<pparams.length ;i++){
		console.log(pparams[i])
		var value = params[pparams[i]]
		if(value!='' && value!=undefined){
			joinFilterString+=value+','
		}
	}
	return joinFilterString
}

function loadResult(){
	setParam();
	var filter = joinFilter(['clarity','color','cut','fluorescence','polish','report','symmetry','report','shape'])
	console.log(filter)
	console.log(params)

	var href = "/diamondSearch?orderTypePc="+params.orderTypePc+"&orderTypeWt="+params.orderTypeWt+"&nowpage="+params.pageIndex+"&attriFilter="+filter+"&pagecount="+params.productsTotal+"&weight="+params.minWeight+","+params.maxWeight+"&lst_price="+params.minPrice+","+params.maxPrice
	console.log(href)
	window.location.href = href
}
function search(){
	setParam();
	loadResult();
}
function reset(){
	params.shape="";
	params.color="";
	params.clarity="";
	params.cut="";
	params.symmetry="";
	params.polish="";
	params.fluorescence="";
	params.report="";
	$(".shape_h").each(function(){
		var src=$(this).find("img").attr("src");
		$(this).find("img").attr("src",src.replace("_h.png",".png"))
	});
	$(".shape_h").attr("class","shape");
	$(".color_h").attr("class","color");
	$(".clarity_h").attr("class","clarity");
	$(".cut_h").attr("class","cut");
	$(".polish_h").attr("class","polish");
	$(".fluorescence_h").attr("class","fluorescence");
	$(".report_h").attr("class","report");
	$(".symmetry_h").attr("class","symmetry");
}
$(function(){
	//loadResult();
	$(".calibrated_x").blur(function(){
		var reg = new RegExp("^[1-9]\d*\.\d*|0\.\d*|[1-9]\d*|0$");
		var calibrated=$(this).val();
		if(!reg.test(calibrated)){
			$(".calibrated_x").focus();
		    $(".calibrated_x").val("");
		    return;
		}
	})
	$(".shape").click(function(){
		var src=$(this).find("img").attr("src");
		if($(this).attr("class")=="shape"){
			var src_h=$(".shape_h").find("img").attr("src");
			if(src_h!=null){
				$(".shape_h").find("img").attr("src",src_h.replace("_h.png",".png"));
				$(".shape_h").attr("class","shape");
			}
			$(this).attr("class","shape_h");
			$(this).find("img").attr("src",src.replace(".png","_h.png"));
		}else{
			$(this).attr("class","shape");
			$(this).find("img").attr("src",src.replace("_h.png",".png"));
		}
	})
	$(".color,.clarity,.cut,.symmetry,.polish,.fluorescence,.report").click(function(){
		if($(this).attr("class").indexOf("_")==-1){
			$(this).attr("class",$(this).attr("class")+"_h");
		}else{
			$(this).attr("class",$(this).attr("class").replace("_h",""));
		}
	})
//	var diff=$(".para").offset().left;
//	$("#weight_left").mousedown(function(e){
//		var xx = e.originalEvent.x || e.originalEvent.layerX || 0;
//
//
//		document.onmousemove=function(ev){
//			var oEvent = ev||event;
//
//			$("#min_weight").val(oEvent.clientX);
//			var Left = oEvent.clientX - diff;
//			$("#weight_left").css({
//				left : Left+"px"
//			});
//		};
//	})
//	document.onmouseup=function(e){
//		document.onmousemove=null;
//	}
	$("#weight").noUiSlider({
		 range: [0.20, 5.00],
		 start: [0.20, 5.00],
		 connect: true,
		 serialization: {
			 mark: '.',
			 resolution: 0.01,
			 to: [ $("#weight_min"),$("#weight_max"),
				  [$('#value-span'), 'html'] ]
		}

	});
	$("#price").noUiSlider({
		 range: [1600, 200000],
		 start: [1600, 200000],
		 connect: true,
		 serialization: {
			 mark: ',',
			 resolution: 1,
			 to: [ $("#price_min"),$("#price_max"),
				  [$('#value-span'), 'html'] ]
		}

	});


	var npage = $(".xuanze").attr("nowpage")



	$("#pagination").whjPaging({
  		//静态数据已知的总页数
  			totalPage: Number($(".xuanze").attr("allpage")),

            showPageNum: npage,
            isShowFL: true,
            isShowPageSizeOpt: true,
            isShowSkip: false,
            isShowRefresh: false,
            isShowTotalPage: false,
            isResetPage: false,
	  	callBack: function(currPage,pageSize){
	   	// loadData(currPage, pageSize);
		}
	});


//	$(".zsxz li")




})