function getJSON(store, pdfFlag, drawComponent)  {
	// Define standard values
	// Define components dimensions
	var tempMax = 26;
	var snowTopValue = 250;
	if(pdfFlag) {
		componentHeight = 1000;
		componentWidth = 1000;
	}
	else {
		componentHeight = drawComponent.getHeight();
		componentWidth = drawComponent.getWidth();
	}
	
	// Definitions for Image in Legend
	var widthImage = componentWidth * 0.012; 
	var heightImage = widthImage;
	var yLegendFirstRow = "2.25%";
	var yLegendFirstRowImage = "1.55%";
	
	var items = new Array();

	items.push(drawRectangle("70%", "2.5%", "15%", "1%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("70%", "2.5%", "15%", "3.5%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("70%", "90%", "15%", "10%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("3%", "90%", "55%", "10%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("3%", "90%", "60%", "10%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("2%", "90%", "68%", "10%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("3%", "90%", "70%", "10%", 1, "#000000", "#ffffff", 1));
	items.push(drawImage(widthImage, heightImage, "15.5%", yLegendFirstRowImage, "data/img/new/neuschnee.jpg", pdfFlag));
	items.push(drawText("Neuschnee", "17%", yLegendFirstRow, 0, "#000000"));
	items.push(drawImage(widthImage, heightImage, "22.6%", yLegendFirstRowImage, "data/img/new/filziger_schnee.jpg", pdfFlag));
	items.push(drawText("Filz", "24.1%", yLegendFirstRow, 0, "#000000"));
	items.push(drawImage(widthImage, heightImage, "26.3%", yLegendFirstRowImage, "data/img/new/rundkoerniger_schnee.jpg", pdfFlag));
	items.push(drawText("kleine Runde", "27.7%", yLegendFirstRow, 0, "#000000"));
	items.push(drawImage(widthImage, heightImage, "34.2%", yLegendFirstRowImage, "data/img/new/kantigfoermiger_schnee.jpg", pdfFlag));
	items.push(drawText("kantig", "35.7%", yLegendFirstRow, 0, "#000000"));
	items.push(drawImage(widthImage, heightImage, "39%", yLegendFirstRowImage, "data/img/new/schwimmschnee.jpg", pdfFlag));
	items.push(drawText("Tiefenreif", "40.5%", yLegendFirstRow, 0, "#000000"));
	items.push(drawImage(widthImage, heightImage, "45.4%", yLegendFirstRowImage, "data/img/new/oberflaechenreif.jpg", pdfFlag));
	items.push(drawText("Oberflächenreif", "46.7%", yLegendFirstRow, 0, "#000000"));
	items.push(drawImage(widthImage, heightImage, "54.3%", yLegendFirstRowImage, "data/img/new/schmelzform.jpg", pdfFlag));
	items.push(drawText("Schmelzform", "55.8%", yLegendFirstRow, 0, "#000000"));
	items.push(drawImage(widthImage, heightImage, "62.3%", yLegendFirstRowImage, "data/img/new/eislamelle.jpg", pdfFlag));
	items.push(drawText("Eislamelle", "63.8%", yLegendFirstRow, 0, "#000000"));
	items.push(drawImage(widthImage, heightImage, "68.7%", yLegendFirstRowImage, "data/img/new/kantig_abgerundet.jpg", pdfFlag));
	items.push(drawText("kantig, abgerundet", "70%", yLegendFirstRow, 0, "#000000"));
	items.push(drawImage(widthImage, heightImage, "79%", yLegendFirstRowImage, "data/img/new/graupel.jpg", pdfFlag));
	items.push(drawText("Graupel", "80.5%", yLegendFirstRow, 0, "#000000"));
	
	items.push(drawText("H", "56%", "9%", 0, "#000000"));
	items.push(drawText("Θ", "58.7%", "9%", 0, "#000000"));
	items.push(drawText("F", "61%", "9%", 0, "#000000"));
	items.push(drawText("D", "65%", "9%", 0, "#000000"));
	items.push(drawText("K", "68.7%", "9%", 0, "#000000"));
	items.push(drawText("Niete", "70.5%", "9%", 0, "#000000"));
	items.push(drawText("Stabilitätstests", "76%", "9%", 0, "#000000"));
	items.push(drawRectangle("0.5", "0.5%", "24.25%", "10%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("0.5", "0.5%", "35%", "10%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("0.5", "0.5%", "45%", "10%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("0.5", "0.5%", "52%", "10%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("0.5", "0.5%", "54%", "10%", 1, "#000000", "#ffffff", 1));
	items.push(drawText("M", "23.95%", "11.5%", 270, "#000000"));
	items.push(drawText("B", "34.75%", "11.5%", 270, "#000000"));
	items.push(drawText("1F", "44.65%", "11.5%", 270, "#000000"));
	items.push(drawText("4F", "51.65%", "11.5%", 270, "#000000"));
	items.push(drawText("FA", "53.5%", "11.5%", 270, "#000000"));
	
	var snowprofileData = store;
	var schichtprofilData = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.stratProfile.Layer;
	var direction = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.dir;
//	direction = "down top";
	
	var width = 0;
	vonHoehe0 = snowTopValue;
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
			var height = (90 * (vonHoehe / vonHoehe0)) - (90 * (bisHoehe / vonHoehe0));
			var y = 10 + (90 * (bisHoehe / vonHoehe0));
		}
		else {
			var height = (90 * (vonHoehe / vonHoehe0)) - (90 * (bisHoehe / vonHoehe0));
			var y = 100 - (90 * (vonHoehe / vonHoehe0));
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
		items.push(drawRectangle(width+"%", height+"%", x+"%", y+"%", 2, "#1C86EE", "#1C86EE", 0.2));
		
		// Details Rechteck für Form, Durchmesser und Feuchte
		items.push(drawRectangle("12%", height+"%", "58%", y+"%", 1, "#000000", "#FFFFFF", 0.2));
		
		// Vorbereitung für Kornformen
		x = "59.4%";
		x_circle = "59.7%";
		x_image = "59%";
		y = ((y + (y + height)) / 2) + 0.2;
		y_image = y - 0.8;
		y_rect = y - 0.5;
		var text = "";
		// TODO: Kornformen, switch-case
		
		
		// Text zu Durchmesser
		x = "64.5%";
		items.push(drawText(groesse, x, y+"%", 0, "#000000"));
		
		// Feuchte
		x = "58.7%";
		switch (feuchte) {
            case 'D': text = "-"; break;
            case 'M': text = "|"; break;
            case 'W': text = "||"; x = "58.6%"; break;
            case 'V': text = "|||"; x = "58.5%"; break;
            case 'S': text = "||||"; x = "58.4%"; break;
		}
		items.push(drawText(text, x, y+"%", 0, "#000000"));
	}
	
	// ZEICHNEN DER SCHNEETEMPERATUR
	var schneetemperaturData = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.tempProfile.Obs;
	
	var h100 = componentHeight;
	var w100 = componentWidth;
	var h84 = h100 * 0.90;
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
		
		items.push(drawPath(startx, starty, endx, endy, "1", "#F00", "fff"));
	}
	
	// SCHICHTPROFIL-MASSSTABS
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

		var y = 100 - (90 * (vonHoehe / vonHoehe0));
		
		// links
		items.push(drawRectangle("0.5%", "0.5", "15%", y+"%", "0.25", "#000000", "#000000", 1));
		
		// rechts
		items.push(drawText(text, "55.7%", y+"%", 0, "#000"));
		items.push(drawRectangle("0.5%", "0.5", "55%", y+"%", "0.25", "#000000", "#000000", 1));
	}
	
	// TEMPERATUR-MASSSTAB
	for(var j=2; j < tempMax; j=j+2) {
		var x = 55 - (40* j/tempMax);
		
		items.push(drawText(j, (x-0.25)+"%", "8.8%", 0, "#000"));
		items.push(drawRectangle("0.5", "0.5%", x+"%", "9.5%", "0.25", "#000000", "#000000", 1));
	}

	return items;
}

function roundUp(num) {
	var returnNum = Math.ceil(num/100);
	return returnNum * 100;
}

function drawText(text, x, y, rotate, fill) {
	if(rotate > 0) {
		return {
			type: 'text',
	        text: text,
	        fill: 'fill',
	        font: '8px Arial',
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
			fill: '#000',
			font: '8px Arial',
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