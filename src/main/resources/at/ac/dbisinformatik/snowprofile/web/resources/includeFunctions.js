function getJSON(store, pdfFlag, drawComponent)  {
	// Initialize JSONArray 
	var items = new Array();
	
	// Define standard values
	// Define components dimensions
	var tempMax = 26;
	var snowTopValue = 250;
	if(pdfFlag) {
		componentHeight = 1500;
		componentWidth = 1500;
	}
	else {
		componentHeight = drawComponent.getHeight();
		componentWidth = drawComponent.getWidth();
	}
	var fontSize = Math.round(componentWidth * 0.01);
	
	// Definitions for Image in Legend
	var pdfMarginY = 0;
	var pdfMarginX = 0;
	if(pdfFlag) {
		pdfMarginY = 12.5;
		pdfMarginX = 14;
	}
	
	var widthImage = componentWidth * 0.012;
	var heightImage = widthImage;
	var yLegendFirstRow = 2.27;
	var yLegendSecondRow = 4.8;
	var yLegendFirstRowImage = 1.55;
	var yHardnessText = 11.5;
	var yDescriptionText = 9;
	var yLegendFirstRowRec = 1;
	var yLegendSecondRowRec = 3.5;
	var yGraphMainArea = 10;
	var heightMainArea = 90;
	if(pdfFlag) {
//		var beobachter = store.SnowProfile.metaDataProperty.MetaData.srcRef.Operation.contactPerson.Person.name;
		
		yLegendFirstRow = yLegendFirstRow + pdfMarginY;
		yLegendSecondRow = yLegendSecondRow + pdfMarginY;
		yLegendFirstRowImage = yLegendFirstRowImage + pdfMarginY;
		yHardnessText = yHardnessText + pdfMarginY;
		yDescriptionText = yDescriptionText + pdfMarginY;
		yLegendFirstRowRec = yLegendFirstRowRec + pdfMarginY;
		yLegendSecondRowRec = yLegendSecondRowRec + pdfMarginY;
		yGraphMainArea = yGraphMainArea + pdfMarginY;
		
		heightMainArea = heightMainArea - pdfMarginY;
		
		var yMetaDataFirstColumn = 1;
		var yMetaDataSecondColumn = 26;
		var yMetaDataThirdColumn = 51;
		items.push(drawText("Schneeprofil: ", yMetaDataFirstColumn+"%", "3%", 0, "#000000", fontSize));
		items.push(drawText("Beobachter:", yMetaDataFirstColumn+"%", "4.5%", 0, "#000000", fontSize));
		items.push(drawText("Profilnr:", yMetaDataFirstColumn+"%", "6%", 0, "#000000", fontSize));
		items.push(drawText("LKNr:", yMetaDataFirstColumn+"%", "7.5%", 0, "#000000", fontSize));
		items.push(drawText("Gesamtwasserwert:", yMetaDataFirstColumn+"%", "9%", 0, "#000000", fontSize));
		items.push(drawText("Wetter/Niederschlag:", yMetaDataFirstColumn+"%", "10.5%", 0, "#000000", fontSize));
		items.push(drawText("Bemerkungen:", yMetaDataFirstColumn+"%", "12%", 0, "#000000", fontSize));
		
		items.push(drawText("Ort:", yMetaDataSecondColumn+"%", "3%", 0, "#000000", fontSize));
		items.push(drawText("Höhe ü. M.:", yMetaDataSecondColumn+"%", "4.5%", 0, "#000000", fontSize));
		items.push(drawText("Exposition:", yMetaDataSecondColumn+"%", "6%", 0, "#000000", fontSize));
		items.push(drawText("Koordinaten:", yMetaDataSecondColumn+"%", "7.5%", 0, "#000000", fontSize));
		
		items.push(drawText("Datum/Zeit:", yMetaDataThirdColumn+"%", "3%", 0, "#000000", fontSize));
		items.push(drawText("Lufttemp.:", yMetaDataThirdColumn+"%", "4.5%", 0, "#000000", fontSize));
		items.push(drawText("Bewölkung:", yMetaDataThirdColumn+"%", "6%", 0, "#000000", fontSize));
		items.push(drawText("Wind:", yMetaDataThirdColumn+"%", "7.5%", 0, "#000000", fontSize));
	}
	

	items.push(drawRectangle("70%", "2.5%", (15 - pdfMarginX)+"%", yLegendFirstRowRec+"%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("70%", "2.5%", (15 - pdfMarginX)+"%", yLegendSecondRowRec+"%", 1, "#000000", "#ffffff", 1));
	
	items.push(drawRectangle("70%", heightMainArea+"%", (15 - pdfMarginX)+"%", yGraphMainArea+"%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("3%", heightMainArea+"%", (55 - pdfMarginX)+"%", yGraphMainArea+"%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("3%", heightMainArea+"%", (60 - pdfMarginX)+"%", yGraphMainArea+"%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("2%", heightMainArea+"%", (68 - pdfMarginX)+"%", yGraphMainArea+"%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("3%", heightMainArea+"%", (70 - pdfMarginX)+"%", yGraphMainArea+"%", 1, "#000000", "#ffffff", 1));
	
	items.push(drawImage(widthImage, heightImage, (15.5 - pdfMarginX)+"%", yLegendFirstRowImage+"%", "data/img/neuschnee.jpg", pdfFlag));
	items.push(drawText("Neuschnee", (17 - pdfMarginX)+"%", yLegendFirstRow+"%", 0, "#000000", fontSize));
	items.push(drawImage(widthImage, heightImage, (22.4 - pdfMarginX)+"%", yLegendFirstRowImage+"%", "data/img/filziger_schnee.jpg", pdfFlag));
	items.push(drawText("Filz", (23.9 - pdfMarginX)+"%", yLegendFirstRow+"%", 0, "#000000", fontSize));
	items.push(drawImage(widthImage, heightImage, (26.6 - pdfMarginX)+"%", yLegendFirstRowImage+"%", "data/img/rundkoerniger_schnee.jpg", pdfFlag));
	items.push(drawText("kleine Runde", (28 - pdfMarginX)+"%", yLegendFirstRow+"%", 0, "#000000", fontSize));
	items.push(drawImage(widthImage, heightImage, (34.4 - pdfMarginX)+"%", yLegendFirstRowImage+"%", "data/img/kantigfoermiger_schnee.jpg", pdfFlag));
	items.push(drawText("kantig", (35.9 - pdfMarginX)+"%", yLegendFirstRow+"%", 0, "#000000", fontSize));
	items.push(drawImage(widthImage, heightImage, (39.2 - pdfMarginX)+"%", yLegendFirstRowImage+"%", "data/img/schwimmschnee.jpg", pdfFlag));
	items.push(drawText("Tiefenreif", (40.7 - pdfMarginX)+"%", yLegendFirstRow+"%", 0, "#000000", fontSize));
	items.push(drawImage(widthImage, heightImage, (45.6 - pdfMarginX)+"%", yLegendFirstRowImage+"%", "data/img/oberflaechenreif.jpg", pdfFlag));
	items.push(drawText("Oberflächenreif", (46.9 - pdfMarginX)+"%", yLegendFirstRow+"%", 0, "#000000", fontSize));
	items.push(drawImage(widthImage, heightImage, (54.3 - pdfMarginX)+"%", yLegendFirstRowImage+"%", "data/img/schmelzform.jpg", pdfFlag));
	items.push(drawText("Schmelzform", (55.8 - pdfMarginX)+"%", yLegendFirstRow+"%", 0, "#000000", fontSize));
	items.push(drawImage(widthImage, heightImage, (62.3 - pdfMarginX)+"%", yLegendFirstRowImage+"%", "data/img/eislamelle.jpg", pdfFlag));
	items.push(drawText("Eislamelle", (63.8 - pdfMarginX)+"%", yLegendFirstRow+"%", 0, "#000000", fontSize));
	items.push(drawImage(widthImage, heightImage, (68.7 - pdfMarginX)+"%", yLegendFirstRowImage+"%", "data/img/kantig_abgerundet.jpg", pdfFlag));
	items.push(drawText("kantig, abgerundet", (70 - pdfMarginX)+"%", yLegendFirstRow+"%", 0, "#000000", fontSize));
	items.push(drawImage(widthImage, heightImage, (79 - pdfMarginX)+"%", yLegendFirstRowImage+"%", "data/img/graupel.jpg", pdfFlag));
	items.push(drawText("Graupel", (80.5 - pdfMarginX)+"%", yLegendFirstRow+"%", 0, "#000000", fontSize));
	
	items.push(drawText("H[cm] Höhe", (15.5 - pdfMarginX)+"%", yLegendSecondRow+"%", 0, "#000000", fontSize));
	items.push(drawText("Θ Feuchte", (22.5 - pdfMarginX)+"%", yLegendSecondRow+"%", 0, "#000000", fontSize));
	items.push(drawText("F Kornformen", (28.8 - pdfMarginX)+"%", yLegendSecondRow+"%", 0, "#000000", fontSize));
	items.push(drawText("D[mm] Größe", (36.5 - pdfMarginX)+"%", yLegendSecondRow+"%", 0, "#000000", fontSize));
	items.push(drawText("K Härte", (44.3 - pdfMarginX)+"%", yLegendSecondRow+"%", 0, "#000000", fontSize));
	
	items.push(drawText("H", (56 - pdfMarginX)+"%", yDescriptionText+"%", 0, "#000000", fontSize));
	items.push(drawText("Θ", (58.7 - pdfMarginX)+"%", yDescriptionText+"%", 0, "#000000", fontSize));
	items.push(drawText("F", (61 - pdfMarginX)+"%", yDescriptionText+"%", 0, "#000000", fontSize));
	items.push(drawText("D", (65 - pdfMarginX)+"%", yDescriptionText+"%", 0, "#000000", fontSize));
	items.push(drawText("K", (68.7 - pdfMarginX)+"%", yDescriptionText+"%", 0, "#000000", fontSize));
	items.push(drawText("Niete", (70.5 - pdfMarginX)+"%", yDescriptionText+"%", 0, "#000000", fontSize));
	items.push(drawText("Stabilitätstests", (76 - pdfMarginX)+"%", yDescriptionText+"%", 0, "#000000", fontSize));
	
	items.push(drawRectangle("0.5", "0.5%", (24.25 - pdfMarginX)+"%", yGraphMainArea+"%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("0.5", "0.5%", (35 - pdfMarginX)+"%", yGraphMainArea+"%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("0.5", "0.5%", (45 - pdfMarginX)+"%", yGraphMainArea+"%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("0.5", "0.5%", (52 - pdfMarginX)+"%", yGraphMainArea+"%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("0.5", "0.5%", (54 - pdfMarginX)+"%", yGraphMainArea+"%", 1, "#000000", "#ffffff", 1));
	
	items.push(drawText("M", (23.95 - pdfMarginX)+"%", yHardnessText+"%", 0, "#000000", fontSize));
	items.push(drawText("B", (34.75 - pdfMarginX)+"%", yHardnessText+"%", 0, "#000000", fontSize));
	items.push(drawText("1F", (44.65 - pdfMarginX)+"%", yHardnessText+"%", 0, "#000000", fontSize));
	items.push(drawText("4F", (51.6 - pdfMarginX)+"%", yHardnessText+"%", 0, "#000000", fontSize));
	items.push(drawText("FA", (53.5 - pdfMarginX)+"%", yHardnessText+"%", 0, "#000000", fontSize));
	
	if(store) {
		var snowprofileData = store;
		
		// DRAWING LAYER-PROFILE/SCHICHTPROFIL
		if(snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.stratProfile.Layer.length >= 1) {
			var schichtprofilData = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.stratProfile.Layer;
			var direction = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.dir;
			
			var width = 0;
			var vonHoehe0 = snowTopValue;
			if(schichtprofilData[0].depthTop_content > snowTopValue)
				var vonHoehe0 = roundUp(schichtprofilData[0].depthTop_content);
			
			var hoechstWert = schichtprofilData[0].depthTop_content;
			
			for(var i = 0; i < schichtprofilData.length; i++) {
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
				
				if(direction != "top down") {
					var temp = vonHoehe;
					vonHoehe = hoechstWert - bisHoehe;
					bisHoehe = hoechstWert - temp;
				}
				var kornform1 = schichtprofilData[i].grainFormPrimary;
				var kornform2 = schichtprofilData[i].grainFormSecondary;
				var haerte = schichtprofilData[i].hardness;
				var groesse = schichtprofilData[i].grainSize_Components_avg+"-"+schichtprofilData[i].grainSize_Components_avgMax;
				var feuchte = schichtprofilData[i].lwc_content;
				
				if(direction == "top down") {
					var height = (heightMainArea * (vonHoehe / vonHoehe0)) - (heightMainArea * (bisHoehe / vonHoehe0));
					var y = 10 + (heightMainArea * (bisHoehe / vonHoehe0));
				}
				else {
					var height = (heightMainArea * (vonHoehe / vonHoehe0)) - (heightMainArea * (bisHoehe / vonHoehe0));
					var y = 100 - (heightMainArea * (vonHoehe / vonHoehe0));
				}
				
				
				switch (haerte) {
				case 'F': width = 1; break; 
				case 'F-4F': width = 2.05; break; 
				case '4F': width = 3; break; 
				case '4F-1F': width = 6.5; break; 
				case '1F': width = 10; break; 
				case '1F-P': width = 15; break; 
				case 'P': width = 20; break; 
				case 'P-K': width = 25; break; 
				case 'K': width = 31.05; break; 
				case 'I': width = 40; break; 
				}
				
				x = 55 - width;
				if(pdfFlag) {
					y = y + pdfMarginY;
					x = x - pdfMarginX;
				}
				items.push(drawRectangle(width+"%", height+"%", x+"%", y+"%", 2, "#1C86EE", "#1C86EE", 0.2));
				
				// Details Rechteck für Form, Durchmesser und Feuchte
				items.push(drawRectangle("12%", height+"%", (58 - pdfMarginX)+"%", y+"%", 1, "#000000", "#FFFFFF", 0.2));
				
				// Vorbereitung für Kornformen
				var widthImageKF = componentWidth * 0.009;
				var heightImageKF = widthImageKF;
				
				x_image = 60.3;
				y = ((y + (y + height)) / 2) + 0.2;
				y_image = y - 0.8;
				if(pdfFlag) {
					x_image = x_image - pdfMarginX;
				}
				var text = "";
				switch (kornform1) { 
				case 'PP': 
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/neuschnee.jpg", pdfFlag));
					break;
				case 'DF':  
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/filziger_schnee.jpg", pdfFlag));
					break;
				case 'RG': 
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/rundkoerniger_schnee.jpg", pdfFlag));
					break;
				case 'FC': 
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/kantigfoermiger_schnee.jpg", pdfFlag));
					break;
				case 'FCxr':
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/kantig_abgerundet.jpg", pdfFlag));
					break;
				case 'DH': 
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/schwimmschnee.jpg", pdfFlag));
					break;
				case 'MF':
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/schmelzform.jpg", pdfFlag));
					break;
				case 'MFcr':
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/schneekruste.jpg", pdfFlag));
					break;
				case 'IF':
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/eislamelle.jpg", pdfFlag));
					break;
				case 'SH':
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/oberflaechenreif.jpg", pdfFlag));
					break;
				case 'PPgp':
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/graupel.jpg", pdfFlag));
					break;
				}
				
				x_image = 61.6;
				if(pdfFlag) {
					x_image = x_image - pdfMarginX;
				}
				switch (kornform2) { 
				case 'PP': 
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/neuschnee.jpg", pdfFlag));
					break;
				case 'DF':  
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/filziger_schnee.jpg", pdfFlag));
					break;
				case 'RG': 
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/rundkoerniger_schnee.jpg", pdfFlag));
					break;
				case 'FC': 
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/kantigfoermiger_schnee.jpg", pdfFlag));
					break;
				case 'FCxr':
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/kantig_abgerundet.jpg", pdfFlag));
					break;
				case 'DH': 
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/schwimmschnee.jpg", pdfFlag));
					break;
				case 'MF':
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/schmelzform.jpg", pdfFlag));
					break;
				case 'MFcr':
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/schneekruste.jpg", pdfFlag));
					break;
				case 'IF':
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/eislamelle.jpg", pdfFlag));
					break;
				case 'SH':
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/oberflaechenreif.jpg", pdfFlag));
					break;
				case 'PPgp':
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/graupel.jpg", pdfFlag));
					break;
				}
				
				
				// Text zu Durchmesser
				x = 64.5;
				if(pdfFlag) {
					x = x - pdfMarginX;
				}
				items.push(drawText(groesse, x+"%", y+"%", 0, "#000000", fontSize));
				
				// Feuchte
				x = 58.7;
				switch (feuchte) {
				case 'D': text = "-"; break;
				case 'M': text = "|"; break;
				case 'W': text = "||"; x = 58.6; break;
				case 'V': text = "|||"; x = 58.5; break;
				case 'S': text = "||||"; x = 58.4; break;
				}
				if(pdfFlag) {
					x = x - pdfMarginX;
				}
				items.push(drawText(text, x+"%", y+"%", 0, "#000000", fontSize));
			}
		}
		
		// ZEICHNEN DER SCHNEETEMPERATUR
		if(snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.tempProfile.Obs.length >= 1) {
			var schneetemperaturData = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.tempProfile.Obs;
			
			var h100 = componentHeight;
			var w100 = componentWidth;
			var h84 = h100 * (heightMainArea / 100);
			var h16 = h100 * 0.1;
			var w55 = w100 * 0.55;
			var w40 = w100 * 0.4;
			var hoechstWertTemp = schneetemperaturData[0].depth;
			for(var i = 0; i < schneetemperaturData.length; i++) {
				vonHoehe = schneetemperaturData[i].depth;
				var temp = (schneetemperaturData[i].snowTemp/10);
				if(typeof schneetemperaturData[i+1] != 'undefined') {
					bisHoehe = schneetemperaturData[i+1].depth;
					var tempNext = (schneetemperaturData[i+1].snowTemp/10);
				}
				else {
					var tempNext = 0;
					bisHoehe = 0;
				}
				
				var startx = w55 - (w40 * temp/tempMax);
				var endx = w55 - (w40 * tempNext/tempMax);
				
				if(direction == "top down") {
					var starty = h16 + (h84 * vonHoehe / vonHoehe0);
					var endy = h16 + (h84 * bisHoehe / vonHoehe0);
				}
				else {
					var starty = h100 - (h84 * vonHoehe / vonHoehe0);
					var endy = h100 - (h84 * bisHoehe / vonHoehe0);
				}
				
				if(pdfFlag) {
					startx = startx - (componentWidth * (pdfMarginX / 100));
					endx = endx - (componentWidth * (pdfMarginX / 100));
					starty = starty + (componentHeight * (pdfMarginY / 100));
					endy = endy + (componentHeight * (pdfMarginY / 100));
				}
				
				items.push(drawPath(startx, starty, endx, endy, "1", "#F00", "fff"));
			}
		}
		
		// SCHICHTPROFIL-MASSSTABS
		var xSchichtprofilMassstabLink = 15;
		var xSchichtprofilMassstabRechts = 55;
		var xSchichtprofilMassstabText = 55.7;
		if(pdfFlag) {
			xSchichtprofilMassstabLink = xSchichtprofilMassstabLink - pdfMarginX;
			xSchichtprofilMassstabRechts = xSchichtprofilMassstabRechts - pdfMarginX;
			xSchichtprofilMassstabText = xSchichtprofilMassstabText - pdfMarginX;
		}
		for(var j=0; j < vonHoehe0; j=j+50) {
			var vonHoehe = vonHoehe0 - j;
			if(direction == "top down") {
				var text = j;
			}
			else {
				var text = vonHoehe;
			}
			if(j == 0) continue;
			if(j == vonHoehe0) continue;
			
			var y = 100 - (heightMainArea * (vonHoehe / vonHoehe0));
			
			// links
			items.push(drawRectangle("0.5%", "0.5", xSchichtprofilMassstabLink+"%", y+"%", "0.25", "#000000", "#000000", 1));
			
			// rechts
			items.push(drawText(text, xSchichtprofilMassstabText+"%", y+"%", 0, "#000", fontSize));
			items.push(drawRectangle("0.5%", "0.5", xSchichtprofilMassstabRechts+"%", y+"%", "0.25", "#000000", "#000000", 1));
		}
		
		// TEMPERATUR-MASSSTAB
		yTemperaturMassstab = 9.5;
		yTemperaturMassstabText = 8.8;
		if(pdfFlag) {
			yTemperaturMassstabText = yTemperaturMassstabText + pdfMarginY;
			yTemperaturMassstab = yTemperaturMassstab + pdfMarginY;
		}
		for(var j=2; j < tempMax; j=j+2) {
			var x = 55 - (40* j/tempMax);
			if(pdfFlag) {
				x = x - pdfMarginX;
			}
			items.push(drawText(j, (x-0.25)+"%", yTemperaturMassstabText+"%", 0, "#000", fontSize));
			items.push(drawRectangle("0.5", "0.5%", x+"%", yTemperaturMassstab+"%", "0.25", "#000000", "#000000", 1));
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
			src: src,
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