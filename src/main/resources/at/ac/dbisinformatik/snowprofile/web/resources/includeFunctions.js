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

function drawGraph() {
	return {
		xtype: 'draw',
		width: "100%",
		height: "98%",
		renderTo: document.body,
		items: [
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
	        drawText("Feuchte", "72%", "12.5%", 270),
	        drawText("Kristalle", "62.5%", "7.5%", 0),
	        drawText("Form", "60%", "14%", 0),
	        drawText("Durchm.", "65.5%", "14%", 0)
        ]
	}
}