// 参考：
// http://www.casleyconsulting.co.jp/blog-engineer/chrome/chrome%E6%8B%A1%E5%BC%B5%E6%A9%9F%E8%83%BD%E3%81%AE%E4%BD%9C%E6%88%90%E6%96%B9%E6%B3%95-2/
// http://blog.fenrir-inc.com/jp/2012/09/jquery-chrome-extension.html
// http://dev.screw-axis.com/doc/chrome_extensions/

// 設定を取得
var options;
chrome.extension.sendRequest({
	method : "getChromeNotranslateOptions"
}, function(response) {
	options = response;
});

// ドキュメント準備完了時に実行
$(document).ready(function() {
	log("document ready Start.");
	setNotranslate(options.selectors);
	log("document ready End.");
});

// 要素の追加時に実行
$("body").bind("DOMNodeInserted", function(e) {
	var element = e.target;
	setTimeout(function() {
		log("body DOMNodeInserted Start.");
		setNotranslate(options.selectors, element);
		log("body DOMNodeInserted End.");
	}, 100); // TODO 実行タイミングの精査
	log("body DOMNodeInserted Set.");
});

/**
 * 指定したセレクタ配列に一致する要素がChromeで翻訳されないように設定する。
 *
 * @param selectors
 *            翻訳対象外とする要素のセレクタ(Sizzle)の配列
 * @param context
 *            翻訳対象外とする要素のコンテキスト(省略時<c>document</d>)
 */
function setNotranslate(selectors, context) {
	if (!context) {
		context = document
	}
	var i;
	var elms;
	for (i = 0; i < selectors.length; i++) {
		elms = $(selectors[i], context).addClass("notranslate");
		log("Set 'notranslate' class to " + elms.length + " elements by '"
				+ selectors[i] + "'.");
	}
}

/**
 * コンソールにログを出力する。
 *
 * TODO デベロッパーモードかどうかの判定及びdebug実装
 *
 * @param logValue
 *            出力内容
 */
function log(logValue) {
	// console.log("chrome-notranslate, " + (new Date()) + "," + logValue);
	console.log("chrome-notranslate, " + logValue);
}