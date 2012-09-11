function getJSON(store)  {
	var items = new Array();
	
	items.push(drawRectangle("70%", "99%", "15%", "1%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("70%", "5%", "15%", "1%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("70%", "10%", "15%", "6%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("3%", "10%", "55%", "6%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("3%", "84%", "55%", "16%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("3%", "10%", "70%", "6%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("3%", "84%", "70%", "16%", 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle("40%", "0.5", "15%", "9%", "0.25", "#000000", "#ffffff", 1));
	items.push(drawRectangle("0.5", "91%", "64%", "10%", "0.25", "#000000", "#ffffff", 1));
	items.push(drawRectangle("0.5", "86%", "24.25%", "15%", "0.25", "#000000", "#ffffff", 1));
	items.push(drawRectangle("0.5", "86%", "35%", "15%", "0.25", "#000000", "#ffffff", 1));
	items.push(drawRectangle("0.5", "86%", "45%", "15%", "0.25", "#000000", "#ffffff", 1));
	items.push(drawRectangle("0.5", "86%", "52%", "15%", "0.25", "#000000", "#ffffff", 1));
	items.push(drawRectangle("0.5", "86%", "53.9%", "15%", "0.25", "#000000", "#ffffff", 1));
	items.push(drawText("Neuschnee", "17%", "2.3%", 0, "#000000"));
	items.push(drawText("Schwimmschnee", "17%", "4.7%", 0, "#000000"));
	items.push(drawText("filzig", "30%", "2.3%", 0, "#000000"));
	items.push(drawText("Schmelzform", "30%", "4.7%", 0, "#000000"));
	items.push(drawText("rundkörnig", "43%", "2.3%", 0, "#000000"));
	items.push(drawText("Oberflächenreif", "43%", "4.7%", 0, "#000000"));
	items.push(drawText("kantig", "57%", "2.3%", 0, "#000000"));
	items.push(drawText("Eislamelle", "57%", "4.7%", 0, "#000000"));
	items.push(drawText("Graupel", "71%", "2.3%", 0, "#000000"));
	items.push(drawText("Feuchte", "70%", "11%", 270, "#000000"));
	items.push(drawText("Kristalle", "62.5%", "7.5%", 0, "#000000"));
	items.push(drawText("Form", "60%", "14%", 0, "#000000"));
	items.push(drawText("Durchm.", "65.5%", "14%", 0, "#000000"));    
	items.push(drawText("Rutschblock", "77%", "14%", 0, "#000000"));       
	items.push(drawText("M", "23.95%", "14%", 270, "#000000"));
	items.push(drawText("B", "34.75%", "14%", 270, "#000000"));
	items.push(drawText("1F", "44.65%", "14%", 270, "#000000"));
	items.push(drawText("4F", "51.65%", "14%", 270, "#000000"));
	items.push(drawText("FA", "53.5%", "14%", 270, "#000000"));
	
	var snowprofileData = store;
	var schichtprofilData = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.stratProfile.Layer;
	
	var width = 0;
	vonHoehe0 = 240;
	if(schichtprofilData[0].depthTop_content > 240)
		var vonHoehe0 = roundUp(schichtprofilData[0].depthTop_content);
	
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
		var kornform1 = schichtprofilData[i].grainFormPrimary;
		var kornform2 = schichtprofilData[i].grainFormSecondary;
		var haerte = schichtprofilData[i].hardness;
		var groesse = schichtprofilData[i].grainSize_Components_avg+"-"+schichtprofilData[i].grainSize_Components_avgMax;
		var feuchte = schichtprofilData[i].lwc_content;

		var height = (84 * (vonHoehe / vonHoehe0)) - (84 * (bisHoehe / vonHoehe0));
		var y = 100 - (84 * (vonHoehe / vonHoehe0));
		
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
	        group: 'text'
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
			group: 'text'
		}
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
    	group: 'rectangles'
    }
}