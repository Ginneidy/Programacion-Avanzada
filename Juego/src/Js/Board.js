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
	context.strokeStyle = "black";
	context.fillRect(token.x, token.y, token_widht, token_height);
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
				Math.abs(token.x - space.x) < token_widht / 1.5 &&
				Math.abs(token.y - space.y) < token_height / 1.5
			) {
				token.x = space.x;
				token.y = space.y;
				didMatch = true;
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
	for (let index = 0; index < 168; index += 25) {
		spaces.push({
			x: window.innerHeight,
			y: 105,
			token: null,
		});
	}
	state.spaces = spaces;
	state.tokens = tokens;
	window.onresize();
	drawSpaces();
	drawTokens();
}
window.onload = function () {
	start();
};
