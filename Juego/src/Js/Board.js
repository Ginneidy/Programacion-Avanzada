const token_widht = 20;
const token_height = 20;
const img = new Image();
img.src = "../../assest/img/tablero.png";
function byId(id) {
	return document.getElementById(id);
}

const canvases = {
	spaces: byId("spaces"),
	drag: byId("drag"),
	tokens: byId("tokens"),
};

const context = {
	spaces: canvases.spaces.getContext("2d"),
	drag: canvases.drag.getContext("2d"),
	tokens: canvases.tokens.getContext("2d"),
};

const state = {
	spaces: [],
	tokens: [],
	holdingToken: null,
	isMouseDown: false,
	cursorOffset: null,
	initialice: false,
};
function drawSpace(space) {
	const ctx = context.spaces;
	ctx.fillStyle = "black";
	ctx.lineWidht = 2;
	ctx.strokeStyle = "#FFE212";
	ctx.fillRect(space.x, space.y, token_widht, token_height);
	ctx.strokeRect(space.x, space.y, token_widht, token_height);
}
const setSpaces = i => {
	state.spaces.push({
		x: 0 + i,
		y: 0 + i,
		token: null,
	});
};
function drawSpaces() {
	state.spaces.map(space => {
		drawSpace(space);
	});
}
function drawToken(token, context) {
	context.fillStyle = token.color;
	context.lineWidht = 3;
	context.strokeStyle = "black";
	context.fillRect(token.x, token.y, token_widht, token_height);
	context.strokeRect(token.x, token.y, token_widht, token_height);
}
function drawTokens() {
	context.tokens.clearRect(0, 0, canvases.tokens.width, canvases.tokens.height);
	state.tokens.map(token => {
		if (token !== state.holdingToken) {
			drawToken(token, context.tokens);
		}
	});
}
drawSpace({
	x: 100,
	y: 200,
});

window.onresize = function () {
	const w = window.innerWidth;
	const h = window.innerHeight;

	for (var key in canvases) {
		canvases[key].width = w;
		canvases[key].height = h;
	}
};

canvases.drag.onmousedown = function (e) {
	var token;
	state.isMouseDown = true;
	for (let index = 0; index < state.tokens.length; index++) {
		token = state.tokens[index];

		if (
			e.clientX >= token.x &&
			e.clientX < token_widht + token.x &&
			e.clientY >= token.y &&
			e.clientY < token_height + token.y
		) {
			state.holdingToken = token;
			state.cursorOffset = {
				x: e.clientX - token.x,
				y: e.clientY - token.y,
			};

			drawTokens();
			context.drag.clearRect(0, 0, canvases.drag.width, canvases.drag.height);
			drawToken(state.holdingToken, context.drag);
			break;
		}
	}
};
canvases.drag.onmouseup = function () {
	state.isMouseDown = false;
	var didMatch = false;

	if (state.cursorOffset) {
		const token = state.holdingToken;
		state.cursorOffset = null;
		for (let index = 0; index < state.spaces.length; index++) {
			var space = state.spaces[index];
			if (
				Math.abs(token.x - space.x) < token_widht / 0.7 &&
				Math.abs(token.y - space.y) < token_height / 0.9
			) {
				token.x = space.x;
				token.y = space.y;
				didMatch = true;
				console.log(space.position);
				state.holdingToken = null;
				break;
			}
		}
	}
	//Minuto 40
	if (didMatch) {
		context.tokens.clearRect(
			0,
			0,
			canvases.tokens.width,
			canvases.tokens.height
		);
		context.drag.clearRect(0, 0, canvases.tokens.width, canvases.tokens.height);
		drawTokens();
	}
};

canvases.drag.onmousemove = function (e) {
	if (state.cursorOffset && state.holdingToken) {
		const token = state.holdingToken;
		token.x = e.clientX - state.cursorOffset.x;
		token.y = e.clientY - state.cursorOffset.y;

		context.drag.clearRect(0, 0, canvases.drag.width, canvases.drag.height);
		drawToken(token, context.drag);
	}
};
function start() {
	state.initialice = true;
	const tokens = [];
	const spaces = [];
	var changeX = 190;
	var changeY = 10;
	var color = "#80a5b5";
	for (var index = 0; index < 24; index++) {
		tokens.push({
			x: window.innerWidth / 2 + changeX,
			y: window.innerHeight / 2 + changeY,
			color: color,
		});
		if (index == 19) {
			changeX = 40;
			changeY = 250;
			color = "#dcc369";
		} else if (index > 19) {
			changeY += 25;
			color = "#dcc369";
		} else if (index == 15) {
			changeX = -230;
			changeY = 260;
			color = "#bc75d1";
		} else if (index > 15 && index < 19) {
			changeY += 25;
			color = "#bc75d1";
		} else if (index == 11) {
			changeX = -380;
			changeY = 0;
			color = "#e9895f";
		} else if (index > 11 && index < 15) {
			changeX += -25;
			changeY += -15;
			color = "#e9895f";
		} else if (index == 7) {
			changeX = -250;
			changeY = -230;
			color = "#5a805b";
		} else if (index > 7 && index < 11) {
			changeY += -25;
			color = "#5a805b";
		} else if (index === 3) {
			changeX = 40;
			changeY = -230;
			color = "#c25050";
		} else if (index > 3 && index < 7) {
			changeY += -20;
			changeX += 35;
			color = "#c25050";
		} else {
			changeX += 25;
			color = "#80a5b5";
		}
	}
	var changeX = 0;
	var changeY = 0
	var pos = 1
	for (let index = 0; index < 168; index += 1) {

		spaces.push({
			x: (window.innerHeight - 145) + changeX,
			y: 225 + changeY,
			token: null,
			position: pos,
		});
		if(index == 107){
			changeX += -215
			changeY += 45
			pos == 88
		}else if(index >107){
			changeX += 26
			changeY += -15
			pos -=1
		}
		else if (index == 99){
			changeX += -3
			changeY += -45
			pos +=1
		}else if (index > 99){
			changeX += 26
			changeY += -15
			pos+=1
		}
		else if (index == 91){
			changeX += 35
			changeY += -65
			pos = 65
		}else if (index > 91 ){
			changeX += -26
			changeY += -15
			pos+=1
		}
		else if (index == 83){
			changeX += -150
			changeY += -165
			pos = 71
		}else if (index > 83){
			changeX += 26
			changeY += 15
			pos -=1
		}
		else if (index == 75){
			changeX += 40
			changeY += -20
			pos += 1
		} else if (index > 75){
			changeX += 26
			changeY += 15
			pos +=1
		}
		else if  (index == 67){
			changeX += 70
			changeY += 0
			pos = 48
		}else if (index >67 && index < 75){
			changeY += -30
			pos += 1
		}
		else if (index == 59) {
			changeX += 67	
			changeY += -210
			pos = 54
		} else if (index > 59 && index <67) {
			changeY += 30
			pos -= 1
		} else if (index == 51) {
			changeX += 45
			changeY += 25
			pos += 1
		} else if (index > 51 && index < 59) {
			changeY += 30
			pos += 1
		}
		else if (index == 43) {
			changeX += 37
			changeY += 65
			pos = 31
		} else if (index > 43 && index < 51) {
			changeX += 25
			changeY += -17
			pos += 1
		} else if (index == 35) {
			changeX += 210
			changeY += -55
			pos = 37
		} else if (index > 35 && index < 43) {
			changeX += -25
			changeY += 16
			pos -= 1
		}
		else if (index == 27) {
			changeX += -5
			changeY += 45
			pos += 1
		} else if (index > 27 && index < 35) {
			changeX += -25
			changeY += 16
			pos += 1
		}
		else if (index == 19) {
			changeX += -40
			changeY += 65
			pos = 14

		} else if (index > 19) {
			changeX += 27
			changeY += 15
			pos += 1
		} else if (index == 11) {
			changeY += 165
			changeX += 160
			pos = 20
		} else if (index > 11 && index < 19) {
			changeX += -27
			changeY += -15
			pos -= 1
		}
		else if (index == 3) {
			changeX = -35
			changeY += 20
			pos += 1
		} else if (index > 3 && index < 11) {
			changeX += -27
			changeY += -15
			pos += 1
		}
		else {
			changeY += 30
			pos += 1
		}

	}
	state.spaces = spaces;
	state.tokens = tokens;
	console.log(spaces);
	window.onresize();
	drawSpaces();
	drawTokens();

}
window.onload = function () {
	start();
};
