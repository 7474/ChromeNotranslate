/*
 * Chrome Notranslateのオプション設定用スクリプト。
 */

$(function() {
	// イベント設定
	$("#button-add").click(function() {
		addSelectorInputBox();
	});
	$("#button-reset").click(function() {
		options.reset();
		loadOption();
	});
	$("#button-load").click(function() {
		loadOption();
	});
	$("#button-save").click(function() {
		saveOption();
	});

	loadOption();
});

/**
 * 設定を読み込みオプション画面上に表示する。
 */
function loadOption() {
	options.load();
	$("#input-selector-container").empty();
	$.each(options.selectors, function() {
		var value = this;
		addSelectorInputBox().find("input").val(value);
	})
}

/**
 * オプション画面上の設定を保存する。
 */
function saveOption() {
	var newSelectors = [];
	$(".input-selector").each(function(i) {
		var value = $.trim($(this).val());
		if (value.length > 0) {
			newSelectors.push(value);
		}
	});
	options.selectors = newSelectors;
	options.save();
}

/**
 * 画面上に設定入力項目を追加する。
 *
 * @returns 追加された設定入力項目のjQueryオブジェクト。オブジェクトには1つのinput要素が含まれる。
 *
 * TODO inputが含まれることはHTMLの実装に依存する
 */
function addSelectorInputBox() {
	return $("#template .input-selector-li").clone().appendTo(
			$("#input-selector-container"));
}