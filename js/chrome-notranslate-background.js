/*
 * Chrome Notranslateのバックグラウンド動作スクリプト。
 * オプション設定の保持と提供を行う。
 */

/**
 * 翻訳対象外とする要素のデフォルトセレクタ(Sizzle)。
 */
var defailtSelectors = [ "pre", "code", ".line", ".lines" ];

/**
 * オプション設定。
 */
var options = {
	/** 翻訳対象外とする要素のセレクタ */
	selectors : defailtSelectors,
	/** 設定を保存する。 */
	save : function() {
		localStorage.setItem("selectors", JSON.stringify(this.selectors));
	},
	/** 設定を読み込む。 */
	load : function() {
		var localSelectors = localStorage.getItem("selectors");
		if (localSelectors) {
			this.selectors = JSON.parse(localSelectors);
		}
	},
	/** 設定をデフォルトに戻す。 */
	reset : function() {
		this.selectors = defailtSelectors;
		localStorage.removeItem("selectors");
	}
};

// 設定の取得用I/Fを設定
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "getChromeNotranslateOptions") {
		sendResponse(options);
	} else {
		sendResponse(undefined);
	}
});

// 保存されている設定をロード
options.load();
