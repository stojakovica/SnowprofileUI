function drawGraph(store, drawComponent) {
	var surface = drawComponent.surface
	var snowprofileData = store.SnowProfile;
	var direction = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.dir; 
//	direction = "down top";
	
	// LÖSCHEN UM GRAFIK NEU ZU ZEICHNEN
	surface.removeAll();
	
	// GRUNDGERÜST ZEICHNEN
	surface.add([
		drawRectangle("70%", "99%", "15%", "1%", 1),
		drawRectangle("70%", "5%", "15%", "1%", 1),
		drawRectangle("70%", "10%", "15%", "6%", 1),
		drawRectangle("3%", "10%", "55%", "6%", 1),
		drawRectangle("3%", "84%", "55%", "16%", 1),
		drawRectangle("3%", "10%", "70%", "6%", 1),
		drawRectangle("3%", "84%", "70%", "16%", 1),
		drawRectangle("40%", "0.5", "15%", "9%", "0.25"),
		drawRectangle("0.5", "91%", "64%", "10%", "0.25"),
		drawRectangle("0.5", "86%", "24.25%", "15%", "0.25"),
		drawRectangle("0.5", "86%", "35%", "15%", "0.25"),
		drawRectangle("0.5", "86%", "45%", "15%", "0.25"),
		drawRectangle("0.5", "86%", "52%", "15%", "0.25"),
		drawRectangle("0.5", "86%", "53.9%", "15%", "0.25"),
		drawText("Neuschnee", "17%", "2.3%", 0),
		drawText("Schwimmschnee", "17%", "4.7%", 0),
		drawText("filzig", "30%", "2.3%", 0),
		drawText("Schmelzform", "30%", "4.7%", 0),
		drawText("rundkörnig", "43%", "2.3%", 0),
		drawText("Oberflächenreif", "43%", "4.7%", 0),
		drawText("kantig", "57%", "2.3%", 0),
		drawText("Eislamelle", "57%", "4.7%", 0),
		drawText("Graupel", "71%", "2.3%", 0),
		drawText("Feuchte", "70%", "11%", 270),
		drawText("Kristalle", "62.5%", "7.5%", 0),
		drawText("Form", "60%", "14%", 0),
		drawText("Durchm.", "65.5%", "14%", 0),    
		drawText("Rutschblock", "77%", "14%", 0),       
		drawText("M", "23.95%", "14%", 270),
		drawText("B", "34.75%", "14%", 270),
		drawText("1F", "44.65%", "14%", 270),
		drawText("4F", "51.65%", "14%", 270),
		drawText("FA", "53.5%", "14%", 270)     
	]);

	var width_image = drawComponent.getHeight() * 0.012; 
	var height_image = width_image;
	var spriteImg = Ext.create('Ext.draw.Sprite', {
		type: 'svg',
		width: width_image,
		height: 10,
		x: "16%",
		y: "1.7%",
		src: "data/img/eislamelle.svg",
		group: 'rectangles'
	});
	surface.add(spriteImg);
	
	var spriteImg = Ext.create('Ext.draw.Sprite', {
		type: 'image',
		width: width_image,
		height: height_image,
		x: "16%",
		y: "4.1%",
		src: "data/img/up.jpg",
		group: 'rectangles'
	});
	surface.add(spriteImg);
	
	var spriteImg = Ext.create('Ext.draw.Sprite', {
		type: 'image',
		width: width_image,
		height: height_image,
		x: "29%",
		y: "1.7%",
		src: "data/img/slash.jpg",
		group: 'rectangles'
	});
	surface.add(spriteImg);
	
	var spriteImg = Ext.create('Ext.draw.Sprite', {
		type: 'image',
		width: width_image,
		height: height_image,
		x: "29%",
		y: "4.1%",
		src: "data/img/ring.jpg",
		group: 'rectangles'
	});
	surface.add(spriteImg);
	
	var spriteImg = Ext.create('Ext.draw.Sprite', {
		type: 'image',
		width: width_image,
		height: height_image,
		x: "42%",
		y: "1.7%",
		src: "data/img/punkt.jpg",
		group: 'rectangles'
	});
	surface.add(spriteImg);
	
	var spriteImg = Ext.create('Ext.draw.Sprite', {
		type: 'image',
		width: width_image,
		height: height_image,
		x: "42%",
		y: "4.1%",
		src: "data/img/down.jpg",
		group: 'rectangles'
	});
	surface.add(spriteImg);
	
	var spriteImg = Ext.create('Ext.draw.Sprite', {
		type: 'image',
		width: width_image,
		height: height_image,
		x: "56%",
		y: "1.7%",
		src: "data/img/viereck.jpg",
		group: 'rectangles'
	});
	surface.add(spriteImg);
	
	var spriteImg = Ext.create('Ext.draw.Sprite', {
		type: 'image',
		width: width_image,
		height: height_image,
		x: "56%",
		y: "4.1%",
		src: "data/img/strich.jpg",
		group: 'rectangles'
	});
	surface.add(spriteImg);
	
	var spriteImg = Ext.create('Ext.draw.Sprite', {
		type: 'image',
		width: width_image,
		height: height_image,
		x: "70%",
		y: "1.7%",
		src: "data/img/graupel.jpg",
		group: 'rectangles'
	});
	surface.add(spriteImg);
	
	// ZEICHNEN DES SCHICHTPROFILS
	var schichtprofilData = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.stratProfile.Layer;
	
	var width = 0;
	
	vonHoehe0 = snowTopValue;
	if(schichtprofilData[0].depthTop_content > snowTopValue)
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
		
		// Schicht
		surface.add({
	    	type: "rect",
	    	width: width+"%",
	    	height: height+"%",
	    	x: x+"%",
	    	y: y+"%",
	    	"stroke-width": 2,
	    	stroke:"#1C86EE",
	    	fill:"#1C86EE",
	    	group: 'rectangles',
	    	opacity: 0.2
	    });
		
		// Details Rechteck für Form, Durchmesser und Feuchte
		surface.add({
			type: "rect",
			width: "12%",
			height: height+"%",
			x: "58%",
			y: y+"%",
			"stroke-width": 1,
			stroke:"#000",
			fill:"#FFF",
			group: 'rectangles',
			opacity: 0.2
		});
		
		// Text zu Form
		x = "59.4%";
		x_circle = "59.7%";
		x_image = "59%";
		y = ((y + (y + height)) / 2)-0.2;
		y_image = y - 0.8;
		y_rect = y - 0.5;
		var text = "";
		switch (kornform1) { 
    		case 'PP': 
    			var spriteImg = Ext.create('Ext.draw.Sprite', {
    				type: 'image',
    				width: 16,
    				height: 16,
    				x: x_image,
    				y: y_image+"%",
    				src: "data/img/plus.jpg",
    				group: 'rectangles'
    			});
    			surface.add(spriteImg);
    			break;
    		case 'DF':  
    			var spriteImg = Ext.create('Ext.draw.Sprite', {
    				type: 'image',
    				width: 16,
    				height: 16,
    				x: x_image,
    				y: y_image+"%",
    				src: "data/img/slash.jpg",
    				group: 'rectangles'
    			});
    			surface.add(spriteImg);
    			break;
    		case 'RG': 
    			var spriteImg = Ext.create('Ext.draw.Sprite', {
    				type: 'image',
    				width: 16,
    				height: 16,
    				x: x_image,
    				y: y_image+"%",
    				src: "data/img/punkt.jpg",
    				group: 'rectangles'
    			});
    			surface.add(spriteImg);
    		case 'FC': 
    			var spriteImg = Ext.create('Ext.draw.Sprite', {
    				type: 'image',
    				width: 16,
    				height: 16,
    				x: x_image,
    				y: y_image+"%",
    				src: "data/img/viereck.jpg",
    				group: 'rectangles'
    			});
    			surface.add(spriteImg);
    			break;
    		case 'FCxr':
    			var spriteImg = Ext.create('Ext.draw.Sprite', {
    				type: 'image',
    				width: 16,
    				height: 16,
    				x: x_image,
    				y: y_image+"%",
    				src: "data/img/fcxr.jpg",
    				group: 'rectangles'
    			});
    			surface.add(spriteImg);
    			break;
    		case 'DH': 
    			var spriteImg = Ext.create('Ext.draw.Sprite', {
    				type: 'image',
    				width: 16,
    				height: 16,
    				x: x_image,
    				y: y_image+"%",
    				src: "data/img/up.jpg",
    				group: 'rectangles'
    			});
    			surface.add(spriteImg);
    			break;
    		case 'MF':
    			var spriteImg = Ext.create('Ext.draw.Sprite', {
    				type: 'image',
    				width: 16,
    				height: 16,
    				x: x_image,
    				y: y_image+"%",
    				src: "data/img/ring.jpg",
    				group: 'rectangles'
    			});
    			surface.add(spriteImg);
    			break;
    		case 'MFcr':
    			var spriteImg = Ext.create('Ext.draw.Sprite', {
    				type: 'image',
    				width: 16,
    				height: 9,
    				x: x_image,
    				y: y_image+"%",
    				src: "data/img/mfcr.jpg",
    				group: 'rectangles'
    			});
    			surface.add(spriteImg);
    			break;
    		case 'IF':
    			var spriteImg = Ext.create('Ext.draw.Sprite', {
    				type: 'image',
    				width: 16,
    				height: 16,
    				x: x_image,
    				y: y_image+"%",
    				src: "data/img/strich.jpg",
    				group: 'rectangles'
    			});
    			surface.add(spriteImg);
    			break;
    		case 'SH':
    			var spriteImg = Ext.create('Ext.draw.Sprite', {
    				type: 'image',
    				width: 16,
    				height: 16,
    				x: x_image,
    				y: y_image+"%",
    				src: "data/img/down.jpg",
    				group: 'rectangles'
    			});
    			surface.add(spriteImg);
    			break;
    		case 'PPgp':
    			var spriteImg = Ext.create('Ext.draw.Sprite', {
    			      type: 'image',
    			      width: 15,
    			      height: 16,
    			      x: x_image,
    			      y: y_image+"%",
    			      src: "data/img/graupel.jpg",
    			      group: 'rectangles'
    	         });
    			surface.add(spriteImg);
    			break;
		}
		
		x = "61.8%";
		x_circle = "62.1%";
		x_image = "61.4%";
		switch (kornform2) { 
			case 'PP': 
				var spriteImg = Ext.create('Ext.draw.Sprite', {
					type: 'image',
					width: 16,
					height: 16,
					x: x_image,
					y: y_image+"%",
					src: "data/img/plus.jpg",
					group: 'rectangles'
				});
				surface.add(spriteImg);
				break;
			case 'DF':  
				var spriteImg = Ext.create('Ext.draw.Sprite', {
					type: 'image',
					width: 16,
					height: 16,
					x: x_image,
					y: y_image+"%",
					src: "data/img/slash.jpg",
					group: 'rectangles'
				});
				surface.add(spriteImg);
				break;
			case 'RG': 
				var spriteImg = Ext.create('Ext.draw.Sprite', {
					type: 'image',
					width: 16,
					height: 16,
					x: x_image,
					y: y_image+"%",
					src: "data/img/punkt.jpg",
					group: 'rectangles'
				});
				surface.add(spriteImg);
			case 'FC': 
				var spriteImg = Ext.create('Ext.draw.Sprite', {
					type: 'image',
					width: 16,
					height: 16,
					x: x_image,
					y: y_image+"%",
					src: "data/img/viereck.jpg",
					group: 'rectangles'
				});
				surface.add(spriteImg);
				break;
			case 'FCxr':
				var spriteImg = Ext.create('Ext.draw.Sprite', {
					type: 'image',
					width: 16,
					height: 16,
					x: x_image,
					y: y_image+"%",
					src: "data/img/fcxr.jpg",
					group: 'rectangles'
				});
				surface.add(spriteImg);
				break;
			case 'DH': 
				var spriteImg = Ext.create('Ext.draw.Sprite', {
					type: 'image',
					width: 16,
					height: 16,
					x: x_image,
					y: y_image+"%",
					src: "data/img/up.jpg",
					group: 'rectangles'
				});
				surface.add(spriteImg);
				break;
			case 'MF':
				var spriteImg = Ext.create('Ext.draw.Sprite', {
					type: 'image',
					width: 16,
					height: 16,
					x: x_image,
					y: y_image+"%",
					src: "data/img/ring.jpg",
					group: 'rectangles'
				});
				surface.add(spriteImg);
				break;
			case 'MFcr':
				var spriteImg = Ext.create('Ext.draw.Sprite', {
					type: 'image',
					width: 16,
					height: 9,
					x: x_image,
					y: y_image+"%",
					src: "data/img/mfcr.jpg",
					group: 'rectangles'
				});
				surface.add(spriteImg);
				break;
			case 'IF':
				var spriteImg = Ext.create('Ext.draw.Sprite', {
					type: 'image',
					width: 16,
					height: 16,
					x: x_image,
					y: y_image+"%",
					src: "data/img/strich.jpg",
					group: 'rectangles'
				});
				surface.add(spriteImg);
				break;
			case 'SH':
				var spriteImg = Ext.create('Ext.draw.Sprite', {
					type: 'image',
					width: 16,
					height: 16,
					x: x_image,
					y: y_image+"%",
					src: "data/img/down.jpg",
					group: 'rectangles'
				});
				surface.add(spriteImg);
				break;
			case 'PPgp':
				var spriteImg = Ext.create('Ext.draw.Sprite', {
				      type: 'image',
				      width: 15,
				      height: 16,
				      x: x_image,
				      y: y_image+"%",
				      src: "data/img/graupel.jpg",
				      group: 'rectangles'
		         });
				surface.add(spriteImg);
				break;
		}
		
		// Text zu Durchmesser
		x = "65.5%";
		
		surface.add({
			type: 'text',
			text: groesse,
			fill: '#000',
			font: '8px Arial',
			x: x,
			y: y+"%",
			group: 'text'
		});
		
		// Feuchte
		x = "71.25%";
		switch (feuchte) {
            case 'D': text = "-"; break;
            case 'M': text = "|"; break;
            case 'W': text = "||"; x = "71%"; break;
            case 'V': text = "|||"; x = "70.8%"; break;
            case 'S': text = "||||"; x = "70.6%"; break;
		}
		
		
		surface.add({
			type: 'text',
			text: text,
			fill: '#000',
			font: '8px Arial',
			x: x,
			y: y+"%",
			group: 'text'
		});
	}
	
	// ZEICHNEN DER SCHNEETEMPERATUR
	var schneetemperaturData = snowprofileData.snowProfileResultsOf.SnowProfileMeasurements.tempProfile.Obs;
	
	var h100 = drawComponent.getHeight();
	var w100 = drawComponent.getWidth();
	var h84 = h100 * 0.84;
	var w55 = w100 * 0.55;
	var w40 = w100 * 0.4;
	for(var i = 0; i < schneetemperaturData.length; i++) {
		vonHoehe = schneetemperaturData[i].depth;
		var temp = (schneetemperaturData[i].snowTemp/10);
		if(Ext.isObject(schneetemperaturData[i+1])) {
			bisHoehe = schneetemperaturData[i+1].depth;
			var tempNext = (schneetemperaturData[i+1].snowTemp/10);
		}
		else {
			var tempNext = 0;
			bisHoehe = 0;
		}
		
		var startx = w55 - (w40 * temp/tempMax);
		var starty = h100 - (h84 * vonHoehe / vonHoehe0);
		var endx = w55 - (w40 * tempNext/tempMax);
		var endy = h100 - (h84 * bisHoehe / vonHoehe0);
		
		surface.add({
			type: "path",
			path: "M "+startx+" "+starty+" L "+endx+" "+endy,
			"stroke-width":"1",
			stroke:"#F00",
			fill:"#fff",
			group: 'paths'
		});
	}
	
	// SCHICHTPROFIL-MASSSTABS
	for(var j=0; j < vonHoehe0; j=j+50) {
		var vonHoehe = vonHoehe0 - j;
		if(direction == "top down") {
			if(j == 0) continue;
			var text = vonHoehe;
		}
		else {
			if(j == vonHoehe0) continue;
			var text = j;
		}

		var y = 100 - (84 * (vonHoehe / vonHoehe0));

		// links
		surface.add({
			type: "rect",
			width: "0.5%",
			height: "0.5",
			x: "15%",
			y: y+"%",
			"stroke-width": "0.25",
			stroke:"#000",
			fill:"#000",
			group: 'rectangles',
		});

		// rechts
		surface.add({
			type: 'text',
			text: text,
			fill: '#000',
			font: '8px Arial',
			x: "55.7%",
			y: y+"%",
			group: 'text'
		});
		
		surface.add({
			type: "rect",
			width: "0.5%",
			height: "0.5",
			x: "55%",
			y: y+"%",
			"stroke-width": "0.25",
			stroke:"#000",
			fill:"#000",
			group: 'rectangles',
		});
	}

	// TEMPERATUR-MASSSTAB
	for(var j=2; j < tempMax; j=j+2) {
		var x = 55 - (40* j/tempMax);
		surface.add({
			type: "rect",
			width: "0.5",
			height: "1%",
			x: x+"%",
			y: "8.5%",
			"stroke-width": "0.25",
			stroke:"#000",
			fill:"#000",
			group: 'rectangles',
		});
		
		// Text
		surface.add({
			type: 'text',
			text: j,
			fill: '#000',
			font: '8px Arial',
			x: (x-0.4)+"%",
			y: "7.5%",
			group: 'text'
		});
	}
	
	text = surface.getGroup('text');
	rectangles = surface.getGroup('rectangles');
	paths = surface.getGroup('paths');
	text.show(true);
	rectangles.show(true);
	paths.show(true);
}

function roundUp(num) {
	var returnNum = Math.ceil(num/100);
	return returnNum * 100;
}

function drawText(text, x, y, rotate) {
	if(rotate > 0) {
		return {
			type: 'text',
	        text: text,
	        fill: '#000',
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

function drawRectangle(width, height, x, y, stroke_width) {
	return {
    	type: "rect",
    	width: width,
    	height: height,
    	x: x,
    	y: y,
    	"stroke-width": stroke_width,
    	stroke:"#000000",
    	fill:"#ffffff",
    	group: 'rectangles'
    }
}