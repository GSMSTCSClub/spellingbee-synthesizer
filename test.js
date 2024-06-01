var wordnik_key = "ovjzj7nuoxeemkomgl5byw5alrbe2ga5gdz2hkp2n6ic74iph";

const openMediaPlayer = () => {
	const cell = SpreadsheetApp.getActiveSheet().getActiveCell().getValue();
	let response;
	try {
		var link = "https://hexfactor.academy/" + cell + "/gen";
		response = UrlFetchApp.fetch(link).getContentText();
		if (link == "https://hexfactor.academy//gen") {
			Logger.log("Error fetching URL:", error);
			SpreadsheetApp.getUi().alert("Error fetching URL. Make sure you highlight a cell before using Pronounce!");
			return;
		}
	} catch (error) {
		Logger.log("Error fetching URL:", error);
		SpreadsheetApp.getUi().alert("Error fetching URL. Make sure you highlight a cell before using Pronounce!");
		return;
	}
	if (response === "\n" || response.indexOf("not found!") !== -1) {
		const continueAnyway = SpreadsheetApp.getUi().alert("The definition for the word " + cell + " wasn't found. Try pronouncing anyway?", SpreadsheetApp.getUi().ButtonSet.YES_NO);
		if (continueAnyway === SpreadsheetApp.getUi().Button.YES) {} else {
			return;
		}
	}
	const url = "https://hexfactor.academy/static/output.mp3";
	const cacheBuster = Date.now(); // Generate cache busting query parameter using current timestamp
	const urlWithCacheBuster = `${url}?cache=${cacheBuster}`;
	const html = `<iframe src="${urlWithCacheBuster}" width="480" height="180" frameborder="0" scrolling="no"></iframe>`;
	const dialog = HtmlService.createHtmlOutput(html).setTitle('Play').setWidth(500).setHeight(200);
	SpreadsheetApp.getUi().showModelessDialog(dialog, 'Play Media');
}

function populateData() {
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
	const words = sheet.getRange('B:B');
	const values = words.getValues();
	var data = [];
	for (let i = 0; i < values.length; i++) {
		const word = values[i][0];
		if (word) {
			data.push([word]);
		}
	}
	data = data.flat()
	data.shift();
	for (var i = 0; i < data.length; i++) {
		var word = data[i];
		response = UrlFetchApp.fetch("https://hexfactor.academy/" + word).getContentText();
		if (response === "\n" || response.indexOf("not found!") !== -1) {
			sheet.getRange(i + 6, 2, 1, 1).setBackground("red");
			sheet.getRange(i + 6, 4, 1, 1).setBackground("red");
			continue;
		} else {
			var definitionIndex = 1;
			if (sheet.getRange(i + 6, 3).getValue() != "") {
				definitionIndex = parseInt(sheet.getRange(i + 6, 3).getValue());
			}
			var definitions = response.split("\n");
			Logger.log(word);
			Logger.log(definitions);
			if (definitionIndex < 1 || definitionIndex >= definitions.length) {
				sheet.getRange(i + 6, 4).setValue("Invalid Definition Index!");
				sheet.getRange(i + 6, 3, 1, 2).setBackground("red");
				continue;
			}
			var definition = definitions[definitionIndex - 1];
			sheet.getRange(i + 6, 4).setValue(definition);
		}
	}
}

function getAlternateDefinitions() {
	const word = SpreadsheetApp.getActiveSheet().getActiveCell().getValue();
	var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	var sheet = spreadsheet.insertSheet(word);
	var response = UrlFetchApp.fetch("https://hexfactor.academy/" + word).getContentText();
	var definitions = response.split("\n");
	sheet.getRange(1, 1).setValue("Definitions for " + word + ":");
	sheet.getRange(1, 2).setValue("Definition Index:")
	for (var i = 0; i < definitions.length - 1; i++) {
		sheet.getRange(i + 2, 1).setValue(definitions[i]);
		sheet.getRange(i + 2, 2).setValue(i + 1);
	}
	sheet.autoResizeColumn(1);
}

function populateSelectedWords() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getActiveRange();
  var data = range.getValues();
  data = data.flat();
  var rowOffset = range.getRow();
	for (var i = 0; i < data.length; i++) {
		var word = data[i];
		response = UrlFetchApp.fetch("https://hexfactor.academy/" + word).getContentText();
		if (response === "\n" || response.indexOf("not found!") !== -1) {
			sheet.getRange(i + rowOffset, 2, 1, 1).setBackground("red");
			sheet.getRange(i + rowOffset, 4, 1, 1).setBackground("red");
			continue;
		} else {
			var definitionIndex = 1;
			if (sheet.getRange(i + rowOffset, 3).getValue() != "") {
				definitionIndex = parseInt(sheet.getRange(i + rowOffset, 3).getValue());
			}
			var definitions = response.split("\n");
			Logger.log(word);
			Logger.log(definitions);
			if (definitionIndex < 1 || definitionIndex >= definitions.length) {
				sheet.getRange(i + rowOffset, 4).setValue("Invalid Definition Index!");
				sheet.getRange(i + rowOffset, 3, 1, 2).setBackground("red");
				continue;
			}
			var definition = definitions[definitionIndex - 1];
			sheet.getRange(i + rowOffset, 4).setValue(definition);
      var exampleSentence = getExampleSentence(word);
      sheet.getRange(i + rowOffset, 5).setValue(exampleSentence);
		}
	}
}

function getExampleSentence(word) {
  var url = "https://api.wordnik.com/v4/word.json/" + word + "/examples?includeDuplicates=false&useCanonical=false&limit=1&api_key=" + wordnik_key;
  var response = UrlFetchApp.fetch(url).getContentText();
  var json = JSON.parse(response);
  return json.examples[0].text;
}