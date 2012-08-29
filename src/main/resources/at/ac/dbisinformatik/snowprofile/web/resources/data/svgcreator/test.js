function getJSON()  {
	return {
	items: [
//		drawRectangle("70%", "99%", "15%", "1%", 1),
//		drawRectangle("70%", "5%", "15%", "1%", 1),
//		drawRectangle("70%", "10%", "15%", "6%", 1),
//		drawRectangle("3%", "10%", "55%", "6%", 1),
//		drawRectangle("3%", "84%", "55%", "16%", 1),
//		drawRectangle("3%", "10%", "70%", "6%", 1),
//		drawRectangle("3%", "84%", "70%", "16%", 1),
//		drawRectangle("40%", "0.5", "15%", "9%", "0.25"),
//		drawRectangle("0.5", "91%", "64%", "10%", "0.25"),
//		drawRectangle("0.5", "86%", "24.25%", "15%", "0.25"),
//		drawRectangle("0.5", "86%", "35%", "15%", "0.25"),
//		drawRectangle("0.5", "86%", "45%", "15%", "0.25"),
//		drawRectangle("0.5", "86%", "52%", "15%", "0.25"),
//		drawRectangle("0.5", "86%", "53.9%", "15%", "0.25"),
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
        ]
	};
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