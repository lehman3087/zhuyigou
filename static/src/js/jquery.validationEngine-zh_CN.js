(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* 姝ゅ涓嶅彲绌虹櫧",
                    "alertTextCheckboxMultiple": "* 璇烽€夋嫨涓€涓」鐩�",
                    "alertTextCheckboxe": "* 鎮ㄥ繀椤婚挬閫夋鏍�",
                    "alertTextDateRange": "* 鏃ユ湡鑼冨洿涓嶅彲绌虹櫧"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "* 鏃犳晥鐨� ",
                    "alertText2": " 鏃ユ湡鑼冨洿"
                },
                "checkPhone": {
                    "regex": "none",
                    "alertText": "* 鎵嬫満鍙锋牸寮忎笉姝ｇ‘"
                },
                "checkZipcode":{
                	 "regex": "none",
                     "alertText": "* 閭紪鏍煎紡涓嶆纭�"
                },
                "checkPassword":{
                	 "regex": "none",
                     "alertText": "* 瀵嗙爜闀垮害鍙兘鍦�6-16浣嶅瓧绗︿箣闂�"
                },
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "* 鏃犳晥鐨� ",
                    "alertText2": " 鏃堕棿鑼冨洿"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* 鏈€灏� ",
                    "alertText2": " 涓瓧绗�"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* 鏈€澶� ",
                    "alertText2": " 涓瓧绗�"
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": "* 浣犲繀闇€閫夊～鍏朵腑涓€涓爮浣�"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* 鏈€灏忓€肩偤 "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* 鏈€澶у€间负 "
                },
                "past": {
                    "regex": "none",
                    "alertText": "* 鏃ユ湡蹇呴渶鏃╀簬 "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* 鏃ユ湡蹇呴渶鏅氫簬 "
                },
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* 鏈€澶氶€夊彇 ",
                    "alertText2": " 涓」鐩�"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* 璇烽€夋嫨 ",
                    "alertText2": " 涓」鐩�"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* 璇疯緭鍏ヤ笌涓婇潰鐩稿悓鐨勫瘑鐮�"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
                    "alertText": "* 鏃犳晥鐨勭數璇濆彿鐮�"
                },
                "email": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
//                	"regex": /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
                	"alertText": "* 閭欢鍦板潃鏃犳晥"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* 涓嶆槸鏈夋晥鐨勬暣鏁�"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
                    "alertText": "* 鏃犳晥鐨勬暟瀛�"
                },
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText": "* 鏃犳晥鐨勬棩鏈燂紝鏍煎紡蹇呴渶涓� YYYY-MM-DD"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* 鏃犳晥鐨� IP 鍦板潃"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* Invalid URL"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* 鍙兘濉暟瀛�"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* 鍙帴鍙楄嫳鏂囧瓧姣嶅ぇ灏忓啓"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "* 涓嶆帴鍙楃壒娈婂瓧绗�"
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* 姝ゅ悕绉板凡琚叾浠栦汉浣跨敤",
                    "alertTextLoad": "* 姝ｅ湪纭鍚嶇О鏄惁鏈夊叾浠栦汉浣跨敤锛岃绋嶇瓑銆�"
                },
				"ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* 姝ゅ笎鍙峰悕绉板彲浠ヤ娇鐢�",
                    "alertText": "* 姝ゅ悕绉板凡琚叾浠栦汉浣跨敤",
                    "alertTextLoad": "* 姝ｅ湪纭甯愬彿鍚嶇О鏄惁鏈夊叾浠栦汉浣跨敤锛岃绋嶇瓑銆�"
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* 姝ゅ悕绉板彲浠ヤ娇鐢�",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* 姝ゅ悕绉板凡琚叾浠栦汉浣跨敤",
                    // speaks by itself
                    "alertTextLoad": "* 姝ｅ湪纭鍚嶇О鏄惁鏈夊叾浠栦汉浣跨敤锛岃绋嶇瓑銆�"
                },
				 "ajaxNameCallPhp": {
	                    // remote json service location
	                    "url": "phpajax/ajaxValidateFieldName.php",
	                    // error
	                    "alertText": "* 姝ゅ悕绉板凡琚叾浠栦汉浣跨敤",
	                    // speaks by itself
	                    "alertTextLoad": "* 姝ｅ湪纭鍚嶇О鏄惁鏈夊叾浠栦汉浣跨敤锛岃绋嶇瓑銆�"
	                },
                "validate2fields": {
                    "alertText": "* 璇疯緭鍏� HELLO"
                },
	            //tls warning:homegrown not fielded
                "dateFormat":{
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "* 鏃犳晥鐨勬棩鏈熸牸寮�"
                },
                //tls warning:homegrown not fielded
				"dateTimeFormat": {
	                "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "* 鏃犳晥鐨勬棩鏈熸垨鏃堕棿鏍煎紡",
                    "alertText2": "鍙帴鍙楃殑鏍煎紡锛� ",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM 鎴� ",
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
	            }
            };

        }
    };
    $.validationEngineLanguage.newLang();
})(jQuery);