function getJSON()  {
	return {
	gradients: [{
		id: 'grad1',
		angle: 100,
		stops: {
		0: {
		color: '#AACE36'
	},
	100: {
		color: '#2FA042'
	}
	}
	}, {
		id: 'grad2',
		angle: 21,
		stops: {
		0: {
		color: '#79A933'
	},
	13: {
		color: '#70A333'
	},
	34: {
		color: '#559332'
	},
	58: {
		color: '#277B2F'
	},
	86: {
		color: '#005F27'
	},
	100: {
		color: '#005020'
	}
	}
	}, {
		id: 'grad3',
		angle: 55,
		stops: {
		0: {
		color: '#79AB35'
	},
	53: {
		color: '#7CBA3D'
	},
	100: {
		color: '#00AA4B'
	}
	}
	}],
	items: [
        {
        	type: "rect",
        	width: "70%",
        	height: "99%",
        	x: "15%",
        	y: "1%",
        	"stroke-width": 1,
        	stroke:"#000000",
        	fill:"#ffffff",
        	group: 'rectangles'
        }]
	};
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