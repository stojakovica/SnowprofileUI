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
	var widthImage = paperWidth * 0.03;
	var heightImage = widthImage;
	var pdfMarginY = 0;
	var pdfMarginX = 0;
	var heightMainArea = 0.88;
	
	// Drawing skeletal structure
	items.push(drawRectangle(paperWidth * 0.99, paperHeight * 0.04, xMargin, yMargin, 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle(paperWidth * 0.99, paperHeight * 0.04, xMargin, yMargin + (paperHeight * 0.04), 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle(paperWidth * 0.99, paperHeight * heightMainArea, xMargin, yMargin + (paperHeight * 0.11), 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle(paperWidth * 0.05, paperHeight * heightMainArea, xMargin + (paperWidth * 0.55), yMargin + (paperHeight * 0.11), 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle(paperWidth * 0.05, paperHeight * heightMainArea, xMargin + (paperWidth * 0.63), yMargin + (paperHeight * 0.11), 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle(paperWidth * 0.03, paperHeight * heightMainArea, xMargin + (paperWidth * 0.78), yMargin + (paperHeight * 0.11), 1, "#000000", "#ffffff", 1));
	items.push(drawRectangle(paperWidth * 0.05, paperHeight * heightMainArea, xMargin + (paperWidth * 0.81), yMargin + (paperHeight * 0.11), 1, "#000000", "#ffffff", 1));
	
	// Text for Legend
	items.push(drawImage(widthImage, heightImage, xMargin + (paperWidth * 0.01), yMargin + (paperHeight * 0.01), "data/img/neuschnee.jpg", pdfFlag));
	items.push(drawText("Neuschnee", xMargin + (paperWidth * 0.03), yMargin + (paperHeight * 0.02), 0, "#000000", fontSize));
	
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
				
				items.push(drawRectangle(width, paperHeight * height, xMargin + (paperWidth * 0.55) - width, y, 1, "#1C86EE", "#1C86EE", 0.2));
				
				// TEMPERATUR-MASSSTAB
//				yTemperaturMassstab = 9.5;
//				yTemperaturMassstabText = 8.8;
//				items.push(drawText("°C", "15%", yTemperaturMassstabText+"%", 0, "#000000", fontSize));
//				if(pdfFlag) {
//					yTemperaturMassstabText = yTemperaturMassstabText + pdfMarginY;
//					yTemperaturMassstab = yTemperaturMassstab + pdfMarginY;
//				}
//				for(var j=2; j < tempMax; j=j+2) {
//					var x = 55 - (40* j/tempMax);
//					if(pdfFlag) {
//						x = x - pdfMarginX;
//					}
//					items.push(drawText(j, (x-0.25)+"%", yTemperaturMassstabText+"%", 0, "#000000", fontSize));
//					items.push(drawRectangle("0.5", "0.5%", x+"%", yTemperaturMassstab+"%", "0.25", "#000000", "#000000", 1));
//				}
			}
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