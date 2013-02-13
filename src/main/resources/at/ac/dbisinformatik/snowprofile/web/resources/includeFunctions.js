function getJSON(store, pdfFlag, drawComponent)  {
	// Initialize JSONArray
	var items = new Array();

	// Define standard values
	// Define components dimensions
	var tempMax = 26;
	var snowTopValue = 250;
	if(pdfFlag) {
		componentHeight = 1485;
		componentWidth = 1055;
		paperHeight = componentHeight - (componentHeight*0.01);
		paperWidth =  componentHeight / Math.sqrt(2);
		paperWidth = paperWidth - (paperWidth*0.01);
		xMargin = paperWidth * 0.01;
		yMargin = paperHeight * 0.01;
	}
	else {
		componentHeight = drawComponent.getHeight();
		componentWidth = drawComponent.getWidth();
		paperHeight = componentHeight - (componentHeight*0.01);
		paperWidth =  componentHeight / Math.sqrt(2);
		paperWidth = paperWidth - (paperWidth*0.01);
		xMargin = (componentWidth / 2) - (paperWidth / 2);
		yMargin = paperHeight * 0.01;
	}

	var fontSize = Math.round(paperWidth * 0.02);
	var fontSizeLegend = Math.round(paperWidth * 0.02);
	var widthImage = paperWidth * 0.02;
	var heightImage = widthImage;
	var pdfMarginY = 0;
	var pdfMarginX = 0;
	var heightMainArea = 0.88;
	var width = 0;
	var legendImageFirstRowYMargin = 0.008;
	var legendFirstRowYMargin = 0.02;
	var legendImageSecondRowYMargin = 0.038;
	var legendSecondRowYMargin = 0.05;

	// Drawing skeletal structure
	items.push(drawRectangle(paperWidth * 0.99, paperHeight * 0.03, xMargin, yMargin, 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle(paperWidth * 0.99, paperHeight * 0.03, xMargin, yMargin + (paperHeight * 0.03), 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle(paperWidth * 0.99, paperHeight * heightMainArea, xMargin, yMargin + (paperHeight * 0.11), 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle(paperWidth * 0.05, paperHeight * heightMainArea, xMargin + (paperWidth * 0.55), yMargin + (paperHeight * 0.11), 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle(paperWidth * 0.05, paperHeight * heightMainArea, xMargin + (paperWidth * 0.63), yMargin + (paperHeight * 0.11), 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle(paperWidth * 0.06, paperHeight * heightMainArea, xMargin + (paperWidth * 0.75), yMargin + (paperHeight * 0.11), 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle(paperWidth * 0.05, paperHeight * heightMainArea, xMargin + (paperWidth * 0.81), yMargin + (paperHeight * 0.11), 1, "#000000", "#ffffff", 1));

	items.push(drawText("°C", xMargin, yMargin + paperWidth * 0.1425, 0, "#000000", fontSize));
	items.push(drawText("H", xMargin + paperWidth * 0.565, yMargin + paperWidth * 0.1425, 0, "#000000", fontSize));
	items.push(drawText("Θ", xMargin + paperWidth * 0.606, yMargin + paperWidth * 0.1425, 0, "#000000", fontSize));
	items.push(drawText("F", xMargin + paperWidth * 0.65, yMargin + paperWidth * 0.1425, 0, "#000000", fontSize));
	items.push(drawText("D", xMargin + paperWidth * 0.71, yMargin + paperWidth * 0.1425, 0, "#000000", fontSize));
	items.push(drawText("K", xMargin + paperWidth * 0.775, yMargin + paperWidth * 0.1425, 0, "#000000", fontSize));
	items.push(drawText("N", xMargin + paperWidth * 0.827, yMargin + paperWidth * 0.1425, 0, "#000000", fontSize));
	items.push(drawText("Stabilitätstest", xMargin + paperWidth * 0.863, yMargin + paperWidth * 0.1425, 0, "#000000", fontSize));

	// Text for Legend First Row
	items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.01), yMargin + (paperHeight * legendImageFirstRowYMargin), "data/img/neuschnee.jpg", pdfFlag));
	items.push(drawText("Neuschnee", xMargin + (paperWidth * 0.034), yMargin + (paperHeight * legendFirstRowYMargin), 0, "#000000", fontSizeLegend));
	items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.141), yMargin + (paperHeight * legendImageFirstRowYMargin), "data/img/filziger_schnee.jpg", pdfFlag));
	items.push(drawText("Filz", xMargin + (paperWidth * 0.165), yMargin + (paperHeight * legendFirstRowYMargin), 0, "#000000", fontSizeLegend));
	items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.207), yMargin + (paperHeight * legendImageFirstRowYMargin), "data/img/rundkoerniger_schnee.jpg", pdfFlag));
	items.push(drawText("Rundkorn", xMargin + (paperWidth * 0.231), yMargin + (paperHeight * legendFirstRowYMargin), 0, "#000000", fontSizeLegend));
	items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.324), yMargin + (paperHeight * legendImageFirstRowYMargin), "data/img/kantigfoermiger_schnee.jpg", pdfFlag));
	items.push(drawText("kantig", xMargin + (paperWidth * 0.348), yMargin + (paperHeight * legendFirstRowYMargin), 0, "#000000", fontSizeLegend));
	items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.409), yMargin + (paperHeight * legendImageFirstRowYMargin), "data/img/schwimmschnee.jpg", pdfFlag));
	items.push(drawText("Tiefenreif", xMargin + (paperWidth * 0.433), yMargin + (paperHeight * legendFirstRowYMargin), 0, "#000000", fontSizeLegend));
	items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.527), yMargin + (paperHeight * legendImageFirstRowYMargin), "data/img/oberflaechenreif.jpg", pdfFlag));
	items.push(drawText("Oberflächenreif", xMargin + (paperWidth * 0.551), yMargin + (paperHeight * legendFirstRowYMargin), 0, "#000000", fontSizeLegend));
	items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.701), yMargin + (paperHeight * legendImageFirstRowYMargin), "data/img/schmelzform.jpg", pdfFlag));
	items.push(drawText("Schmelzform", xMargin + (paperWidth * 0.725), yMargin + (paperHeight * legendFirstRowYMargin), 0, "#000000", fontSizeLegend));
	items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.856), yMargin + (paperHeight * legendImageFirstRowYMargin), "data/img/eislamelle.jpg", pdfFlag));
	items.push(drawText("Eislamelle", xMargin + (paperWidth * 0.88), yMargin + (paperHeight * legendFirstRowYMargin), 0, "#000000", fontSizeLegend));

	// Text for Legend Second Row
	items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.01), yMargin + (paperHeight * legendImageSecondRowYMargin), "data/img/kantig_abgerundet.jpg", pdfFlag));
	items.push(drawText("kantig, abgerundet", xMargin + (paperWidth * 0.034), yMargin + (paperHeight * legendSecondRowYMargin), 0, "#000000", fontSizeLegend));
	items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.212), yMargin + (paperHeight * legendImageSecondRowYMargin), "data/img/graupel.jpg", pdfFlag));
	items.push(drawText("Graupel", xMargin + (paperWidth * 0.242), yMargin + (paperHeight * legendSecondRowYMargin), 0, "#000000", fontSizeLegend));
	items.push(drawText("H[cm] Höhe", xMargin + (paperWidth * 0.325), yMargin + (paperHeight * legendSecondRowYMargin), 0, "#000000", fontSizeLegend));
	items.push(drawText("Θ Feuchte", xMargin + (paperWidth * 0.445), yMargin + (paperHeight * legendSecondRowYMargin), 0, "#000000", fontSizeLegend));
	items.push(drawText("F Kornformen", xMargin + (paperWidth * 0.55), yMargin + (paperHeight * legendSecondRowYMargin), 0, "#000000", fontSizeLegend));
	items.push(drawText("D[mm] Größe", xMargin + (paperWidth * 0.685), yMargin + (paperHeight * legendSecondRowYMargin), 0, "#000000", fontSizeLegend));
	items.push(drawText("K Härte", xMargin + (paperWidth * 0.82), yMargin + (paperHeight * legendSecondRowYMargin), 0, "#000000", fontSizeLegend));
	items.push(drawText("N Nieten", xMargin + (paperWidth * 0.9), yMargin + (paperHeight * legendSecondRowYMargin), 0, "#000000", fontSizeLegend));

	// Text for Haerte
	items.push(drawRectangle("0.5", paperHeight * 0.005, xMargin + (paperWidth * 0.55 - paperWidth * 0.0137), yMargin + paperHeight * 0.11, "0.25", "#000000", "#000000", 1));
	items.push(drawText("FA", xMargin + (paperWidth * 0.55 - paperWidth * 0.0137) - 13, yMargin + (paperHeight * 0.128), 0, "#000000", fontSizeLegend));
	items.push(drawRectangle("0.5", paperHeight * 0.005, xMargin + (paperWidth * 0.55 - paperWidth * 0.041), yMargin + paperHeight * 0.11, "0.25", "#000000", "#000000", 1));
	items.push(drawText("4F", xMargin + (paperWidth * 0.55 - paperWidth * 0.041) - 13, yMargin + (paperHeight * 0.128), 0, "#000000", fontSizeLegend));
	items.push(drawRectangle("0.5", paperHeight * 0.005, xMargin + (paperWidth * 0.55 - paperWidth * 0.137), yMargin + paperHeight * 0.11, "0.25", "#000000", "#000000", 1));
	items.push(drawText("1F", xMargin + (paperWidth * 0.55 - paperWidth * 0.137) - 13, yMargin + (paperHeight * 0.128), 0, "#000000", fontSizeLegend));
	items.push(drawRectangle("0.5", paperHeight * 0.005, xMargin + (paperWidth * 0.55 - paperWidth * 0.275), yMargin + paperHeight * 0.11, "0.25", "#000000", "#000000", 1));
	items.push(drawText("B", xMargin + (paperWidth * 0.55 - paperWidth * 0.275) - 7, yMargin + (paperHeight * 0.128), 0, "#000000", fontSizeLegend));
	items.push(drawRectangle("0.5", paperHeight * 0.005, xMargin + (paperWidth * 0.55 - paperWidth * 0.426), yMargin + paperHeight * 0.11, "0.25", "#000000", "#000000", 1));
	items.push(drawText("M", xMargin + (paperWidth * 0.55 - paperWidth * 0.426) - 7, yMargin + (paperHeight * 0.128), 0, "#000000", fontSizeLegend));

	if(store) {
		var snowprofileData = store;

		// DRAWING LAYER-PROFILE/SCHICHTPROFIL
		var schichtprofilData = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.stratProfile.Layer;
		if(schichtprofilData.length >= 1) {
			var direction = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.dir;
			schichtprofilData.sort(function(a,b) {
				return parseFloat(b.depthTop_content) - parseFloat(a.depthTop_content);
			});

			// Maximum Snow Height (if higher than 250cm)
			if(schichtprofilData[0].depthTop_content > snowTopValue)
				var snowTopValue = roundUp(schichtprofilData[0].depthTop_content);

			var hoechstWert = schichtprofilData[0].depthTop_content;
			for(var i = schichtprofilData.length - 1; i >= 0; i--) {
				var nietenText = "";
				var vonHoehe = schichtprofilData[i].depthTop_content;
				if(typeof schichtprofilData[i].thickness_content != 'undefined') {
					var thickness = schichtprofilData[i].thickness_content;
					var bisHoehe = vonHoehe - thickness;
				}
				else {
					if(i < (schichtprofilData.length - 1))
						var bisHoehe = schichtprofilData[i+1].depthTop_content;
					else
						var bisHoehe = 0;
				}
				var kornform1 = schichtprofilData[i].grainFormPrimary;
				var kornform2 = schichtprofilData[i].grainFormSecondary;
				var haerte = schichtprofilData[i].hardness;
				var groesse = schichtprofilData[i].grainSize_Components_avg+"-"+schichtprofilData[i].grainSize_Components_avgMax;
				if(schichtprofilData[i].grainSize_Components_avg > 1)
					nietenText = nietenText+"*";
				var feuchte = schichtprofilData[i].lwc_content;

				if(direction == "top down") {
					var height = (heightMainArea * (vonHoehe / snowTopValue)) - (heightMainArea * (bisHoehe / snowTopValue));
					var y = (yMargin + paperHeight * 0.11) + paperHeight * heightMainArea * (bisHoehe / snowTopValue);
				}
				else {
					var height = (heightMainArea * (vonHoehe / snowTopValue)) - (heightMainArea * (bisHoehe / snowTopValue));
					var y = paperHeight - (paperHeight * heightMainArea * (vonHoehe / snowTopValue));
				}

				switch (haerte) {
					case 'F': width = paperWidth * 0.0137; nietenText = nietenText+"*"; break;
					case 'F-4F': width = paperWidth * 0.028; nietenText = nietenText+"*"; break;
					case '4F': width = paperWidth * 0.041; break;
					case '4F-1F': width = paperWidth * 0.089; break;
					case '1F': width = paperWidth * 0.137; break;
					case '1F-P': width = paperWidth * 0.206; break;
					case 'P': width = paperWidth * 0.275; break;
					case 'P-K': width = paperWidth * 0.344; break;
					case 'K': width = paperWidth * 0.426; break;
					case 'I': width = paperWidth * 0.55; break;
				}

				switch (feuchte) {
					case 'D': feuchteText = "-"; break;
					case 'M': feuchteText = "|"; break;
					case 'W': feuchteText = "||"; break;
					case 'V': feuchteText = "|||"; break;
					case 'S': feuchteText = "||||"; break;
				}

				// paint Kornformen
				yKornformen = y + ((paperHeight * height)/2) - (paperHeight * 0.011);
				switch (kornform1) {
					case 'PP':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.634), yKornformen, "data/img/neuschnee.jpg", pdfFlag));
						break;
					case 'DF':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.634), yKornformen, "data/img/filziger_schnee.jpg", pdfFlag));
						break;
					case 'RG':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.634), yKornformen, "data/img/rundkoerniger_schnee.jpg", pdfFlag));
						break;
					case 'FC':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.634), yKornformen, "data/img/kantigfoermiger_schnee.jpg", pdfFlag));
						nietenText = nietenText+"*";
						break;
					case 'FCxr':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.634), yKornformen, "data/img/kantig_abgerundet.jpg", pdfFlag));
						break;
					case 'DH':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.634), yKornformen, "data/img/schwimmschnee.jpg", pdfFlag));
						nietenText = nietenText+"*";
						break;
					case 'MF':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.634), yKornformen, "data/img/schmelzform.jpg", pdfFlag));
						break;
					case 'MFcr':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.634), yKornformen, "data/img/schneekruste.jpg", pdfFlag));
						break;
					case 'IF':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.634), yKornformen, "data/img/eislamelle.jpg", pdfFlag));
						break;
					case 'SH':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.634), yKornformen, "data/img/oberflaechenreif.jpg", pdfFlag));
						nietenText = nietenText+"*";
						break;
					case 'PPgp':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.634), yKornformen, "data/img/graupel.jpg", pdfFlag));
						break;
				}
				switch (kornform2) {
					case 'PP':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.657), yKornformen, "data/img/neuschnee.jpg", pdfFlag));
						break;
					case 'DF':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.657), yKornformen, "data/img/filziger_schnee.jpg", pdfFlag));
						break;
					case 'RG':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.657), yKornformen, "data/img/rundkoerniger_schnee.jpg", pdfFlag));
						break;
					case 'FC':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.657), yKornformen, "data/img/kantigfoermiger_schnee.jpg", pdfFlag));
						nietenText = nietenText+"*";
						break;
					case 'FCxr':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.657), yKornformen, "data/img/kantig_abgerundet.jpg", pdfFlag));
						break;
					case 'DH':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.657), yKornformen, "data/img/schwimmschnee.jpg", pdfFlag));
						nietenText = nietenText+"*";
						break;
					case 'MF':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.657), yKornformen, "data/img/schmelzform.jpg", pdfFlag));
						break;
					case 'MFcr':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.657), yKornformen, "data/img/schneekruste.jpg", pdfFlag));
						break;
					case 'IF':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.657), yKornformen, "data/img/eislamelle.jpg", pdfFlag));
						break;
					case 'SH':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.657), yKornformen, "data/img/oberflaechenreif.jpg", pdfFlag));
						nietenText = nietenText+"*";
						break;
					case 'PPgp':
						items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.657), yKornformen, "data/img/graupel.jpg", pdfFlag));
						break;
				}

				// paint Layer
				items.push(drawRectangle(width, paperHeight * height, xMargin + (paperWidth * 0.55) - width, y, 1, "#1C86EE", "#1C86EE", 0.2));

				// paint Nieten
				y = y + (paperHeight * height)/2;
				items.push(drawText(nietenText, xMargin + (paperWidth * 0.812), y, 0, "#000000", fontSize));

				// paint Groesse
				items.push(drawText(groesse, xMargin + (paperWidth * 0.685), y, 0, "#000000", fontSize));

				// paint Haerte
				items.push(drawText(haerte, xMargin + (paperWidth * 0.755), y, 0, "#000000", fontSize));

				// paint Feuchte
				items.push(drawText(feuchteText, xMargin + (paperWidth * 0.605), y, 0, "#000000", fontSize));
			}
		}

		// ZEICHNEN DER SCHNEETEMPERATUR
		var schneetemperaturData = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.tempProfile.Obs;
		if(schneetemperaturData.length >= 1) {
			schneetemperaturData.sort(function(a,b) {
				return parseFloat(b.depth) - parseFloat(a.depth);
			});
			var hoechstWertTemp = schneetemperaturData[0].depth;
			for(var i = 0; i < schneetemperaturData.length; i++) {
				vonHoehe = schneetemperaturData[i].depth;
				var temp = (schneetemperaturData[i].snowTemp);
				if(typeof schneetemperaturData[i+1] != 'undefined') {
					bisHoehe = schneetemperaturData[i+1].depth;
					var tempNext = (schneetemperaturData[i+1].snowTemp);
				}
				else {
					var tempNext = 0;
					bisHoehe = 0;
				}

				var startx = xMargin + (paperWidth * 0.55 * (1-temp/tempMax));
				var endx = xMargin + (paperWidth * 0.55 * (1-tempNext/tempMax));

				if(direction == "top down") {
					var starty = (yMargin + paperHeight * 0.11) + paperHeight * heightMainArea * (vonHoehe / snowTopValue);
					var endy = (yMargin + paperHeight * 0.11) + paperHeight * heightMainArea * (bisHoehe / snowTopValue);
				}
				else {
					var starty = paperHeight - (paperHeight * heightMainArea * (vonHoehe / snowTopValue));
					var endy = paperHeight - (paperHeight * heightMainArea * (bisHoehe / snowTopValue));
				}

				if(pdfFlag) {
					startx = startx - (componentWidth * (pdfMarginX / 100));
					endx = endx - (componentWidth * (pdfMarginX / 100));
					if(direction == "top down") {
						starty = starty + (componentHeight * (pdfMarginY / 100));
						endy = endy + (componentHeight * (pdfMarginY / 100));
					}
				}

				items.push(drawPath(startx, starty, endx, endy, "1", "#F00", "#ffffff"));
			}
		}

		// ZEICHNEN DER STABILITÄTSTESTS
		var stabilitaetstests = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.stbTests;
		var comprTest = stabilitaetstests.ComprTest;
		var x = xMargin + (paperWidth * 0.9);
		if(comprTest.length >= 1) {
			comprTest.sort(function(a,b) {
				return parseFloat(b.depth) - parseFloat(a.depth);
			});
			for(var i = 0; i < comprTest.length; i++) {
				var vonHoehe = comprTest[i].Layer_depthTop_content;
				y = paperHeight - (paperHeight * heightMainArea * (vonHoehe / snowTopValue));
				if(direction == "top down") {
					var yrblock = 10 + (heightMainArea * (vonHoehe / vonHoehe0));
					if(pdfFlag) yrblock += pdfMarginY;
				}
				items.push(drawText(comprTest[i].failedOn_Results_testScore, x, y, 0, "#000000", fontSize));
			}
		}
		var extColumntest = stabilitaetstests.ExtColumnTest;
		if(extColumntest.length >= 1) {
			extColumntest.sort(function(a,b) {
				return parseFloat(b.depth) - parseFloat(a.depth);
			});
			for(var i = 0; i < extColumntest.length; i++) {
				var vonHoehe = extColumntest[i].Layer_depthTop_content;
				y = paperHeight - (paperHeight * heightMainArea * (vonHoehe / snowTopValue));
				if(direction == "top down") {
					var yrblock = 10 + (heightMainArea * (vonHoehe / vonHoehe0));
					if(pdfFlag) yrblock += pdfMarginY;
				}
				items.push(drawText(extColumntest[i].failedOn_Results_testScore, x, y, 0, "#000000", fontSize));
			}
		}
		var rblocktest = stabilitaetstests.RBlockTest;
		if(rblocktest.length >= 1) {
			rblocktest.sort(function(a,b) {
				return parseFloat(b.depth) - parseFloat(a.depth);
			});
			for(var i = 0; i < rblocktest.length; i++) {
				var vonHoehe = rblocktest[i].Layer_depthTop_content;
				y = paperHeight - (paperHeight * heightMainArea * (vonHoehe / snowTopValue));
				if(direction == "top down") {
					var yrblock = 10 + (heightMainArea * (vonHoehe / vonHoehe0));
					if(pdfFlag) yrblock += pdfMarginY;
				}
				items.push(drawText(rblocktest[i].failedOn_Results_testScore, x, y, 0, "#000000", fontSize));
			}
		}

		// SCHICHTPROFIL-MASSSTABS
		var xSchichtprofilMassstabLink = xMargin;
		var xSchichtprofilMassstabRechts = xMargin + (paperWidth * 0.55);
		var xSchichtprofilMassstabText = xMargin + (paperWidth * 0.557);
		for(var j=0; j < snowTopValue; j=j+10) {
			var vonHoehe = snowTopValue - j;
			if(direction == "top down") {
				var text = j;
			}
			else {
				var text = vonHoehe;
			}
			if(j == 0) continue;
			if(j == snowTopValue) continue;

			var y = paperHeight - (paperHeight * heightMainArea * (vonHoehe / snowTopValue));

			// links
			items.push(drawRectangle("0.5%", "0.5", xSchichtprofilMassstabLink, y, "0.25", "#000000", "#000000", 1));

			// rechts
			items.push(drawText(text, xSchichtprofilMassstabText, y, 0, "#000", fontSize));
			items.push(drawRectangle(paperWidth * 0.005, "0.5", xSchichtprofilMassstabRechts, y, "0.25", "#000000", "#000000", 1));
		}

		// TEMPERATUR-MASSSTAB
		for(var j=2; j < tempMax; j=j+2) {
			var x = 55 - (55 * j/tempMax);
			if(j<10)
				xText = x - 0.6;
			else
				xText = x - 1;
			items.push(drawText(j, xMargin + paperWidth * (xText/100), yMargin + paperHeight * 0.1, 0, "#000000", fontSize));
			items.push(drawRectangle("0.5", paperHeight * 0.005, xMargin + paperWidth * x/100, yMargin + paperHeight * 0.105, "0.25", "#000000", "#000000", 1));
		}
	}

	return items;
}

function roundUp(num) {
	var returnNum = Math.ceil(num/100);
	return returnNum * 100;
}

function drawText(text, x, y, rotate, fill, fontSize) {
	if(rotate > 0) {
		return {
			type: 'text',
	        text: text,
	        fill: fill,
	        font: fontSize+'px Arial',
	        x: x,
	        y: y,
	        rotate: {
                degrees: 270
            },
            group: 'snowprofile'
		}
	}
	else {
		return {
			type: 'text',
			text: text,
			fill: fill,
			font: fontSize+'px Arial',
			x: x,
			y: y,
			group: 'snowprofile'
		}
	}
}

function drawPath(startx, starty, endx, endy, stroke_width, stroke, fill) {
	return {
		type: "path",
		path: "M "+startx+" "+starty+" L "+endx+" "+endy,
		"stroke-width": stroke_width,
		stroke: stroke,
		fill: fill,
		group: 'snowprofile'
    }
}

function drawRectangle(width, height, x, y, stroke_width, stroke, fill, opacity) {
	return {
		type: "rect",
		width: width,
		height: height,
		x: x,
		y: y,
		"stroke-width": stroke_width,
		stroke: stroke,
		fill: fill,
		opacity: opacity,
		group: 'snowprofile'
	}
}

function drawImage(width, height, x, y, src, pdfFlag) {
	if(pdfFlag) {
		return {
			type: 'image',
			width: width+"px",
			height: height+"px",
			x: x,
			y: y,
			src: src
		};
	}
	else {
		return Ext.create('Ext.draw.Sprite', {
			type: 'image',
			width: width,
			height: height,
			x: x,
			y: y,
			src: src,
			group: 'snowprofile'
		});
	}
}

function checkObjectDraw(object) {
	if(Object.prototype.toString.call( object ) === '[object Object]' )
		return "";
	else
		return object;
}

function showLoadingMask(loadingMessage) {
	if (Ext.isEmpty(loadingMessage))
		loadText = 'Loading... Please wait';
	else
		loadText = loadingMessage;
	Ext.Ajax.on('beforerequest', function() {
		Ext.getBody().mask(loadText, 'loading')
	}, Ext.getBody());
	Ext.Ajax.on('requestcomplete', Ext.getBody().unmask, Ext.getBody());
	Ext.Ajax.on('requestexception', Ext.getBody().unmask, Ext.getBody());
}

function getLocationHash() {
	var hashString = location.hash;
    var nvPairs = hashString.split("#");
    var nvPair = new Array();
    for(var i=1; i<=nvPairs.length; i++) {
    	if(nvPairs[i] != null) {
    		temp = nvPairs[i].split("=");
    		nvPair.push(temp);
    	}
    }
    return nvPair
}

function checkObject(object) {
	if(Ext.isObject(object))
		return "";
	else
		return object;
}

function checkDir(object) {
	if(object == "top down")
		return "on";
	else
		return "";
}

function renderValue(datastore) {
    return function(value, metaData, record, rowIndex, colIndex, store, view) {
        var rec = datastore.findRecord('value', value);
        return rec ? rec.get('display') : value;
    };
};