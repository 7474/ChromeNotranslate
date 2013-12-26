/*
 * Chrome Notranslateの主スクリプト。
 * 設定にもとづいてChromeの翻訳対象外要素を設定する。
 */

/** オプション設定 */
var options;

// ドキュメント準備完了時に実行
$(document).ready(function() {
	// 設定を取得
	chrome.extension.sendRequest({
		method : "getChromeNotranslateOptions"
	}, function(response) {
		log("getChromeNotranslateOptions reponse Start.");

		// 取得した設定を保持
		options = response;

		// 要素の追加時にnotranslate設定実行
		$("body").bind("DOMNodeInserted", function(e) {
			var element = e.target;
			setTimeout(function() {
				log("body DOMNodeInserted Start.");
				setNotranslate(options.selectors, element);
				log("body DOMNodeInserted End.");
			}, 100); // TODO 実行タイミングの精査
		});

		// オプション取得後に初期notranslate設定
		setNotranslate(options.selectors);

		log("getChromeNotranslateOptions response End.");
	});
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