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
		var beobachter = checkObjectDraw(store.metaDataProperty.MetaData.srcRef.Operation.contactPerson.Person.name);
		var niederschlag = checkObjectDraw(store.snowProfileResultsOf.SnowProfileMeasurements.precipTI);
		var ort = checkObjectDraw(store.locRef.ObsPoint.name);
		var region = checkObjectDraw(store.locRef.ObsPoint.description);
		var hoeheUM = checkObjectDraw(store.snowProfileResultsOf.SnowProfileMeasurements.profileDepth.content);
		var exposition = checkObjectDraw(store.locRef.ObsPoint.validAspect.AspectPosition.position);
		var koordinaten = checkObjectDraw(store.locRef.ObsPoint.pointLocation.gml_Point.gml_pos);
		var datumZeit = checkObjectDraw(store.validTime.TimeInstant.timePosition.split("T"));
		var date = new Date(datumZeit[0]);
		var datum = date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
		datum = datumZeit[0].substring(8)+"."+datumZeit[0].substring(5, 7)+"."+datumZeit[0].substring(0, 4);
		var zeit = datumZeit[1].substring(0, 5);
		var lufttemperatur = checkObjectDraw(store.snowProfileResultsOf.SnowProfileMeasurements.airTempPres.content);
		var bewoelkung = checkObjectDraw(store.snowProfileResultsOf.SnowProfileMeasurements.skyCond);
		var windrichtung = checkObjectDraw(store.snowProfileResultsOf.SnowProfileMeasurements.windDir.AspectPosition.position);
		var windgeschw = checkObjectDraw(store.snowProfileResultsOf.SnowProfileMeasurements.windSpd.content);
		var sonstiges = checkObjectDraw(store.snowProfileResultsOf.SnowProfileMeasurements.comment);
		
		switch(bewoelkung) {
			case "CLR":
				bewoelkung = "wolkenlos (0/8)";
				break;
			case "FEW":
				bewoelkung = "leicht bewölkt (1/8 - 2/8)";
				break;
			case "SCT":
				bewoelkung = "bewölkt (3/8 - 4-8)";
				break;
			case "BKN":
				bewoelkung = "stark bewölkt (5/8 - 7/8)";
				break;
			case "OVC":
				bewoelkung = "bedeckt (8/8)";
				break;
			case "X":
				bewoelkung = "Nebel";
				break;
		}
		
		switch(niederschlag) {
			case "Nil":
				niederschlag = "kein Niederschlag";
				break;
			case "SN":
				niederschlag = "Schnee";
				break;
			case "GS":
				niederschlag = "Graupel";
				break;
			case "RA":
				niederschlag = "Regen";
				break;
		}
		
		switch(windgeschw) {
			case "0":
				windgeschw = "kein Wind (0 km/h)";
				break;
			case "1_20":
				windgeschw = "schwacher Wind (1-20 km/h)";
				break;
			case "20_40":
				windgeschw = "mäßiger Wind (20-40 km/h)";
				break;
			case "40_60":
				windgeschw = "starker Wind (40-60 km/h)";
				break;
			case "60_100":
				windgeschw = "stürmischer Wind (60-100 km/h)";
				break;
			case "100":
				windgeschw = "schwerer Wind/Orkan (>100 km/h)";
				break;
		}
		
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
		items.push(drawText("Beobachter: "+beobachter, yMetaDataFirstColumn+"%", "4.5%", 0, "#000000", fontSize));
		items.push(drawText("Wetter/Niederschlag: "+niederschlag, yMetaDataFirstColumn+"%", "6%", 0, "#000000", fontSize));
		items.push(drawText("Koordinaten: "+koordinaten, yMetaDataFirstColumn+"%", "7.5%", 0, "#000000", fontSize));
		
		items.push(drawText("Ort: "+ort+" - "+region, yMetaDataSecondColumn+"%", "3%", 0, "#000000", fontSize));
		items.push(drawText("Höhe ü. M.: "+hoeheUM, yMetaDataSecondColumn+"%", "4.5%", 0, "#000000", fontSize));
		items.push(drawText("Exposition: "+exposition, yMetaDataSecondColumn+"%", "6%", 0, "#000000", fontSize));
		items.push(drawText("Wind: "+windrichtung+" / "+windgeschw, yMetaDataSecondColumn+"%", "7.5%", 0, "#000000", fontSize));
		
		items.push(drawText("Datum/Zeit: "+datum+" "+zeit, yMetaDataThirdColumn+"%", "3%", 0, "#000000", fontSize));
		items.push(drawText("Lufttemp.: "+lufttemperatur+" °C", yMetaDataThirdColumn+"%", "4.5%", 0, "#000000", fontSize));
		items.push(drawText("Bewölkung: "+bewoelkung, yMetaDataThirdColumn+"%", "6%", 0, "#000000", fontSize));
		
		items.push(drawText("Sonstiges: "+sonstiges, yMetaDataFirstColumn+"%", "10.5%", 0, "#000000", fontSize));
		
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
		var schichtprofilData = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.stratProfile.Layer;
		if(schichtprofilData.length >= 1) {
			schichtprofilData.sort(function(a,b) {
				return parseFloat(b.depthTop_content) - parseFloat(a.depthTop_content); 
			});
			var direction = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.dir;
			
			var width = 0;
			var vonHoehe0 = snowTopValue;
			if(schichtprofilData[0].depthTop_content > snowTopValue)
				var vonHoehe0 = roundUp(schichtprofilData[0].depthTop_content);
			
			var hoechstWert = schichtprofilData[0].depthTop_content;
			
			for(var i = 0; i < schichtprofilData.length; i++) {
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
				
				if(direction != "top down") {
					var temp = vonHoehe;
					vonHoehe = hoechstWert - bisHoehe;
					bisHoehe = hoechstWert - temp;
				}
				var kornform1 = schichtprofilData[i].grainFormPrimary;
				var kornform2 = schichtprofilData[i].grainFormSecondary;
				var haerte = schichtprofilData[i].hardness;
				var groesse = schichtprofilData[i].grainSize_Components_avg+"-"+schichtprofilData[i].grainSize_Components_avgMax;
				if(schichtprofilData[i].grainSize_Components_avg > 1)
					nietenText = nietenText+"*";
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
				case 'F': width = 1; nietenText = nietenText+"*"; break; 
				case 'F-4F': width = 2.05; nietenText = nietenText+"*"; break; 
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
					x = x - pdfMarginX;
					if(direction == "top down") {
						y = y + pdfMarginY;
					}
				}
				items.push(drawRectangle(width+"%", height+"%", x+"%", y+"%", 2, "#1C86EE", "#1C86EE", 0.2));
				
				// Details Rechteck fÃ¼r Form, Durchmesser und Feuchte
				items.push(drawRectangle("12%", height+"%", (58 - pdfMarginX)+"%", y+"%", 1, "#000000", "#FFFFFF", 0.2));
				
				// Vorbereitung fÃ¼r Kornformen
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
					nietenText = nietenText+"*";
					break;
				case 'FCxr':
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/kantig_abgerundet.jpg", pdfFlag));
					break;
				case 'DH': 
					items.push(drawImage(widthImageKF, heightImageKF, x_image+"%", y_image+"%", "data/img/schwimmschnee.jpg", pdfFlag));
					nietenText = nietenText+"*";
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
					nietenText = nietenText+"*";
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
				
				// Nieten Schichtgrenzen
				if(schichtprofilData[i-1] != null) {
					var groessePreSchicht = schichtprofilData[i-1].grainSize_Components_avg;
					var groesse = schichtprofilData[i].grainSize_Components_avg;
					if(groessePreSchicht - groesse > 0.75) {
						nietenText = nietenText+"*";
					}
					var haertePreSchicht = schichtprofilData[i-1].hardness;
					var haerte = schichtprofilData[i].hardness;
					switch(haertePreSchicht) {
						case 'F': haerteSchichtOben = 1; break; 
						case 'F-4F': haerteSchichtOben = 2; break;  
						case '4F': haerteSchichtOben = 3; break;  
						case '4F-1F': haerteSchichtOben = 4; break;  
						case '1F': haerteSchichtOben = 5; break;  
						case '1F-P': haerteSchichtOben = 6; break;  
						case 'P': haerteSchichtOben = 7; break;  
						case 'P-K': haerteSchichtOben = 8; break;  
						case 'K': haerteSchichtOben = 9; break;  
						case 'I': haerteSchichtOben = 10; break; 
					}
					switch(haerte) {
						case 'F': haerteSchichtUnten = 1; break; 
						case 'F-4F': haerteSchichtUnten = 2; break;  
						case '4F': haerteSchichtUnten = 3; break;  
						case '4F-1F': haerteSchichtUnten = 4; break;  
						case '1F': haerteSchichtUnten = 5; break;  
						case '1F-P': haerteSchichtUnten = 6; break;  
						case 'P': haerteSchichtUnten = 7; break;  
						case 'P-K': haerteSchichtUnten = 8; break;  
						case 'K': haerteSchichtUnten = 9; break;  
						case 'I': haerteSchichtUnten = 10; break; 
					}
					if(haerteSchichtOben - haerteSchichtUnten > 2) {
						nietenText = nietenText+"*";
					}
				}
				
				// Nieten
				x = 70.4;
				if(pdfFlag) {
					x = x - pdfMarginX;
				}
				items.push(drawText(nietenText, x+"%", y+"%", 0, "#000000", fontSize));
			}
		}
		
		// ZEICHNEN DER SCHNEETEMPERATUR
		var schneetemperaturData = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.tempProfile.Obs;
		if(schneetemperaturData.length >= 1) {
			schneetemperaturData.sort(function(a,b) {
				return parseFloat(b.depth) - parseFloat(a.depth); 
			});
			var h100 = componentHeight;
			var w100 = componentWidth;
			var h84 = h100 * (heightMainArea / 100);
			var h16 = h100 * 0.1;
			var w55 = w100 * 0.55;
			var w40 = w100 * 0.4;
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
		if(comprTest.length >= 1) {
			comprTest.sort(function(a,b) {
				return parseFloat(b.depth) - parseFloat(a.depth); 
			});
			for(var i = 0; i < comprTest.length; i++) {
				var vonHoehe = comprTest[i].Layer_depthTop_content;
				var yrblock = 100 - (heightMainArea * (vonHoehe / vonHoehe0));
				if(direction == "top down") {
					var yrblock = 10 + (heightMainArea * (vonHoehe / vonHoehe0));
					if(pdfFlag) yrblock += pdfMarginY;
				}
				items.push(drawText(comprTest[i].failedOn_Results_testScore, (77 - pdfMarginX)+"%", (yrblock)+"%", 0, "#000000", fontSize));
			}
		}
		var extColumntest = stabilitaetstests.ExtColumnTest;
		if(extColumntest.length >= 1) {
			extColumntest.sort(function(a,b) {
				return parseFloat(b.depth) - parseFloat(a.depth); 
			});
			for(var i = 0; i < extColumntest.length; i++) {
				var vonHoehe = extColumntest[i].Layer_depthTop_content;
				var yrblock = 100 - (heightMainArea * (vonHoehe / vonHoehe0));
				if(direction == "top down") {
					var yrblock = 10 + (heightMainArea * (vonHoehe / vonHoehe0));
					if(pdfFlag) yrblock += pdfMarginY;
				}
				items.push(drawText(extColumntest[i].failedOn_Results_testScore, (77 - pdfMarginX)+"%", (yrblock)+"%", 0, "#000000", fontSize));
			}
		}
		var rblocktest = stabilitaetstests.RBlockTest;
		if(rblocktest.length >= 1) {
			rblocktest.sort(function(a,b) {
				return parseFloat(b.depth) - parseFloat(a.depth); 
			});
			for(var i = 0; i < rblocktest.length; i++) {
				var vonHoehe = rblocktest[i].Layer_depthTop_content;
				var yrblock = 100 - (heightMainArea * (vonHoehe / vonHoehe0));
				if(direction == "top down") {
					var yrblock = 10 + (heightMainArea * (vonHoehe / vonHoehe0));
					if(pdfFlag) yrblock += pdfMarginY;
				}
				items.push(drawText(rblocktest[i].failedOn_Results_testScore, (77 - pdfMarginX)+"%", (yrblock)+"%", 0, "#000000", fontSize));
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