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

function initGraph() {
	return {
		xtype: 'draw',
		viewBox: true,
		autoSize: true,
		flex: 1,
		width: "100%",
		height: "100%"
		//renderTo: document.body
	}
}

function drawGraph(store, drawComponent) {
	var surface = drawComponent.surface
	//var snowprofileData = store.data.items[0];
	var snowprofileData = store.data.getAt(0);
	
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
		drawRectangle("40%", "0.5", "15%", "11%", "0.25"),
		drawRectangle("0.5", "91%", "64%", "10%", "0.25"),
		drawText("+ Neuschnee", "16%", "2.3%", 0),
		drawText("< Schwimmschnee", "16%", "4.7%", 0),
		drawText("/ filzig", "29%", "2.3%", 0),
		drawText("o Schmelzform", "29%", "4.7%", 0),
		drawText("o rundkörnig", "42%", "2.3%", 0),
		drawText("> Oberflächenreif", "42%", "4.7%", 0),
		drawText("o kantig", "56%", "2.3%", 0),
		drawText("- Eislamelle", "56%", "4.7%", 0),
		drawText("o Graupel", "70%", "2.3%", 0),
		drawText("Feuchte", "70%", "11%", 270),
		drawText("Kristalle", "62.5%", "7.5%", 0),
		drawText("Form", "60%", "14%", 0),
		drawText("Durchm.", "65.5%", "14%", 0),    
		drawText("Rutschblock", "77%", "14%", 0)       
	]);
	
	// ZEICHNEN DES SCHICHTPROFILS
	//var schichtprofilData = snowprofileData.snowProfileResultsOfStore.data.items[0].SnowProfileMeasurementsStore.data.items[0].stratProfileStore.data.items[0].LayerStore.data.items;
	var schichtprofilData = []; //= snowprofileData.getSnowProfileData.snowProfileResultsOf.SnowProfileMeasurements.stratProfile.Layer.raw;
	store.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
		snowProfileResultOf.getSnowProfileMeasurements(function(snowProfileMeassurements) {
			var stratProfilesStore = snowProfileMeassurements.stratProfiles(); 
			for(var i=0; i < stratProfilesStore.data.items.length; ++i) {
				schichtprofilData.push(stratProfilesStore.data.items[i].getData(true));
			}
			/*var schichtProfileStore = this.getSchichtprofilStore();
			schichtProfileStore.getProxy().clear();
			schichtProfileStore.add(originalStratProfiles.data.items);*/
		}, this);
	}, this);
    	//this.getSchichtprofilStore().loadRawData(store.proxy.reader.jsonData.SnowProfile.snowProfileResultsOf.SnowProfileMeasurements.stratProfile.Layer);
    
	
	var width = 0;

	// Höhenkontrollen
	/*
	for(var i=schichtprofilData.length; i>0; i--) {
		if(i < schichtprofilData.length) {
			if(schichtprofilData[i].depthTopStore.data.items[0].content + schichtprofilData[i].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].position > schichtprofilData[i-1].depthTop.data.items[0].content) {
				schichtprofilData[i-1].depthTopStore.data.items[0].content + schichtprofilData[i-1].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].position = schichtprofilData[i].depthTop.data.items[0].content;
			}
		}
		if(i > 1) {
			if(schichtprofilData[i-2].depthTopStore.data.items[0].data.content + schichtprofilData[i-2].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].data.position <= schichtprofilData[i-1].depthTopStore.data.items[0].data.content + schichtprofilData[i-1].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].data.position) {
				schichtprofilData[i-1].depthTopStore.data.items[0].data.content + schichtprofilData[i-1].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].data.position = schichtprofilData[i-2].depthTopStore.data.items[0].data.content + schichtprofilData[i-2].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].data.position - 1;
			}
			if(schichtprofilData[i-2].depthTop.data.items[0].data.content < schichtprofilData[i-1].depthTopStore.data.items[0].data.content + schichtprofilData[i-1].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].data.position) {
				schichtprofilData[i-2].depthTop.data.items[0].data.content = schichtprofilData[i-1].depthTopStore.data.items[0].data.content + schichtprofilData[i-1].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].data.position;
			}
		}
	}
	*/
	//TODO temporary
	//var vonHoehe0 = schichtprofilData[0].depthTop.content;
	var vonHoehe0 = schichtprofilData[0].depthTop;
	for(var i = 0; i < schichtprofilData.length; i++) {
		//TODO temporary
		//var vonHoehe = schichtprofilData[i].depthTop.content;
		var vonHoehe = schichtprofilData[i].depthTop;
		var thickness = schichtprofilData[i].thickness;
		if(Ext.isObject(thickness)) {
			var bisHoehe = vonHoehe - thickness.content;
		}
		else {
    		if(i < (schichtprofilData.length - 1))
    			//TODO temporary
    			//var bisHoehe = schichtprofilData[i+i].depthTop.content;
    			var bisHoehe = schichtprofilData[i+1].depthTop;
    		else 
    			var bisHoehe = 0;
		}
		var kornform1 = schichtprofilData[i].grainFormPrimary;
		var kornform2 = schichtprofilData[i].grainFormSecondary;
		var haerte = schichtprofilData[i].hardness;
		var groesse = "1-2"//TODO: schichtprofilData[i].grainSize.Components.avg + "-" + schichtprofilData[i].grainSize.Components.avgMax;
		var feuchte = 0.5;//TODO: schichtprofilData[i].lwc.content;

		var height = (84 * (vonHoehe / vonHoehe0)) - (84 * (bisHoehe / vonHoehe0));
		var y = 100 - (84 * (vonHoehe / vonHoehe0));
		
		switch (haerte) { 
            case 'F': width = 1; break; 
            case 'F-4F': width = 2; break; 
            case '4F': width = 4; break; 
            case '4F-1F': width = 8; break; 
            case '1F': width = 12; break; 
            case '1F-P': width = 16; break; 
            case 'P': width = 20; break; 
            case 'P-K': width = 24; break; 
            case 'K': width = 28; break; 
            case 'I': width = 32; break; 
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
		x = "60%";
		x_circle = "60.3%";
		x_image = "59.6%";
		y = (y + (y + height)) / 2;
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
		
		x = "62%";
		x_circle = "62.3%";
		x_image = "61.6%";
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
	
	/*// ZEICHNEN DER SCHNEETEMPERATUR
	var schneetemperaturData = snowprofileData.snowProfileResultsOf().data.getAt(0).SnowProfileMeasurements().data.getAt(0).tempProfile().data.getAt(0).Obs().data;
	var h100 = drawComponent.getHeight();
	var w100 = drawComponent.getWidth();
	for(var i = 0; i < schneetemperaturData.items.length; i++) {
		var h84 = h100 * 0.84;
		var w55 = w100 * 0.55;
		vonHoehe = schneetemperaturData.getAt(i).data.depth;
		var temp = schneetemperaturData.getAt(i).data.snowTemp;
		if(Ext.isObject(schneetemperaturData.getAt(i+1))) {
			bisHoehe = schneetemperaturData.getAt(i+1).data.depth;
			var tempNext = schneetemperaturData.getAt(i+1).data.snowTemp;
		}
		else {
			var tempNext = 0;
			bisHoehe = 0;
		}
		
		var startx = w55 - temp;
		var starty = h100 - (h84 * vonHoehe / vonHoehe0);
		var endx = w55 - tempNext;
		var endy = h100 - (h84 * bisHoehe / vonHoehe0);
		
		surface.add({
			type: "path",
			path: "M "+startx+" "+starty+" L "+endx+" "+endy,
			"stroke-width":"1",
			stroke:"#F00",
			fill:"#fff",
			group: 'paths'
		});
	}*/
	
	// ZEICHNEN DES MASSSTABS
	for(var j=0; j < 85; j=j+5) {
		var y = 100 - j;
		
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
	
	text = surface.getGroup('text');
	rectangles = surface.getGroup('rectangles');
	paths = surface.getGroup('paths');
	text.show(true);
	rectangles.show(true);
	paths.show(true);
}