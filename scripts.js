var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var list
var X0, Y0, X1, Y1, TX, TY, S;
var increment_7 = 6;
var increment_6 = 5;
var increment_5 = 4;
var increment_4 = 3;
var increment_3 = 2;
var increment_2 = 1;
var increment_1 = 0;

window.onload = function(){
	context.translate(canvas.width/2,canvas.height/2);
	context.fillStyle = "black";
	context.beginPath();
	context.moveTo(0,-300);
	context.lineTo(0,300);
	context.stroke();
	context.moveTo(300,0);
	context.lineTo(-300,0);
	context.stroke();
	context.closePath();
	context.fillStyle = "blue";
	document.getElementById('basictranslate').setAttribute('onclick', 'basicTranslate()');
	document.getElementById('basicscale').setAttribute('onclick', 'basicScale()');
	document.getElementById('basicrotate').setAttribute('onclick', 'basicRotate()');
	document.getElementById('generalscale').setAttribute('onclick', 'generalScale()');
	document.getElementById('generalrotate').setAttribute('onclick', 'generalRoatate()');
	document.getElementById('inputfile').addEventListener('change', function() { 
		var file = this.files[0];
		var reader = new FileReader();
		reader.onload = function (progressEvent) {
			// Entire file
			console.log(this.result);
			// By lines
			var lines = this.result.replace( /\n/g, " " ).split( " " )
			list = [];
			for (var line = 0; line < lines.length; line++) {
				list.push(lines[line]);
			}
			console.log(list);
		};
		reader.readAsText(file);
	})
}

function getCoordinates(){
	var x0 = parseInt(document.getElementById('xValue0').value, 10);
	var x1 = parseInt(document.getElementById('xValue1').value, 10);
	var y0 = parseInt(document.getElementById('yValue0').value, 10);
	var y1 = parseInt(document.getElementById('yValue1').value, 10);
	drawLine(x0,y0,x1,y1);
}

function generateLines(){
	var iterations = parseInt(document.getElementById('iterations').value, 10);
	for(var i = 0; i < iterations; i++){
		var x0 = Math.floor(Math.random() * (300 - -300) + -300);
		var y0 = Math.floor(Math.random() * (300 - -300) + -300);
		var x1 = Math.floor(Math.random() * (300 - -300) + -300);
		var y1 = Math.floor(Math.random() * (300 - -300) + -300);
		drawLine(x0,y0,x1,y1);
		//console.log("Line " + i + ": (" + x0 + "," + y0 + ") to (" + x1 + "," + y1 + ")");
	}
}

function drawLine(x0,y0,x1,y1){
	//change in value
	
	var deltaX = x1 - x0;
	var deltaY = y1 - y0;
	
	//used as a loop to have the maximum possible length to avoid cutting off the line
	//and will create the slope
	var step = Math.abs(deltaX) > Math.abs(deltaY)? Math.abs(deltaX):Math.abs(deltaY);
	//Slope is only used to determine positive or negative intger and the unverse of the slope
	var xSlope = deltaX/step;
	var ySlope = deltaY/step;
	

	//loop that will determine the floor of the the value and fill the area
	for(var i = 0; i < step; i++){
		X = Math.floor((xSlope * i) + x0);
		Y = Math.floor((ySlope * i) + y0);
		context.beginPath();
		context.fillRect(X,-Y,1,1);
		console.log("X: "+ X);
		console.log("Y: "+Y);
		context.closePath();
		
	}
}


function applyTransformation(){
	
	if(list.length % 6 ==0 ){

		X0 = parseInt(list[increment_1]);
		increment_1+=6;
		Y0 = parseInt(list[increment_2]);
		increment_2+=6;
		X1 = parseInt(list[increment_3]);
		increment_3+=6;
		Y1 = parseInt(list[increment_4]);
		increment_4+=6;
		TX = parseInt(list[increment_5]);
		increment_5+=6;
		TY = parseInt(list[increment_6]);
		increment_6+=6;
		console.log("S wrong place : "+S);

	}
	else if(list.length % 7 == 0){

		 
		X0 = parseInt(list[increment_1]);
		increment_1+=7;
		Y0 = parseInt(list[increment_2]);
		increment_2+=7;
		X1 = parseInt(list[increment_3]);
		increment_3+=7;
		Y1 = parseInt(list[increment_4]);
		increment_4+=7;
		TX = parseInt(list[increment_5]);
		increment_5+=7;
		TY = parseInt(list[increment_6]);
		increment_6+=7;
		S = parseInt(list[increment_7]);
		increment_7+=7;

		console.log("S: "+S);
	


	}
	else {
		console.log("ERROR: wrong input format");
	}
	console.log("X0: "+X0);
	console.log("Y0: "+Y0);
	console.log("X1: "+X1);
	console.log("Y1: "+Y1);
	console.log("TX: "+TX);
	console.log("TY: "+TY);
	
	
}

function basicTranslate(){

	applyTransformation();
	drawLine(X0,Y0,X1,Y1);
	X0 = X0 + TX;
	Y0 = Y0 + TY;
	X1 = X1 + TX;
	Y1 = Y1 + TY;
	drawLine(X0,Y0,X1,Y1);

	


}

function basicScale(){

	applyTransformation();
	drawLine(X0,Y0,X1,Y1);
	X0 = X0 * TX;
	Y0 = Y0 * TY;
	X1 = X1 * TX;
	Y1 = Y1 * TY;
	drawLine(X0,Y0,X1,Y1);




}

function basicRotate(){

	applyTransformation();
	drawLine(X0,Y0,X1,Y1);
	X0 = X0 * Math.cos(TX) + Y0 * Math.sin(TX);
	Y0 = -X0 * Math.sin(TX) + Y0 * Math.cos(TX);
	X1 = X1 * Math.cos(TX) + Y1 * Math.sin(TX);
	Y1 = -X1 * Math.sin(TX) + Y1 * Math.cos(TX);
	drawLine(X0,Y0,X1,Y1);

	


}


function generalScale(){

	applyTransformation();

	var translateArray_1 = [
		[1,0,0],
		[0,1,0],
		[-TX, -TY, 1]
	];

	var basicScaleArray = [
		[S,0,0],
		[0,S,0],
		[0,0,1]

	];
	
	var translateArray_2 = [
		[1,0,0],
		[0,1,0],
		[TX, TY, 1]
	];

	var originalArray_1 = [
		[X0, Y0, 1]

	];

	var originalArray_2 = [
		[X1, Y1, 1]

	];

	console.log(basicScaleArray);
		var aNumRows = translateArray_1.length, aNumCols = translateArray_1[0].length,
		bNumRows =  basicScaleArray.length, bNumCols =  basicScaleArray[0].length,
		m = new Array(aNumRows);  // initialize array of rows
	for (var r = 0; r < aNumRows; ++r) {
		m[r] = new Array(bNumCols); // initialize the current row
		for (var c = 0; c < bNumCols; ++c) {
			m[r][c] = 0;             // initialize the current cell
				for (var i = 0; i < aNumCols; ++i) {
					m[r][c] += translateArray_1[r][i] *  basicScaleArray[i][c];
				}
		}
	}
	console.log(m);

	var aRowsPart_2 = m.length, aColsPart_2 = m[0].length,
		bRowsPart_2 =  translateArray_2.length, bColsPart_2 =  translateArray_2[0].length,
		matricePart_2 = new Array(aRowsPart_2);  // initialize array of rows
	for (var r = 0; r < aRowsPart_2; ++r) {
		matricePart_2[r] = new Array(bColsPart_2); // initialize the current row
		for (var c = 0; c < bColsPart_2; ++c) {
			matricePart_2[r][c] = 0;             // initialize the current cell
				for (var i = 0; i < aColsPart_2; ++i) {
					matricePart_2[r][c] += m[r][i] *  translateArray_2[i][c];
				}
		}
	}
	console.log(matricePart_2);




	var aRowsPart_3 = originalArray_1.length, aColsPart_3 = originalArray_1[0].length,
		bRowsPart_3 =  matricePart_2.length, bColsPart_3 =  matricePart_2[0].length,
		matricePart_3 = new Array(aRowsPart_3);  // initialize array of rows
	for (var r = 0; r < aRowsPart_3; ++r) {
		matricePart_3[r] = new Array(bColsPart_3); // initialize the current row
		for (var c = 0; c < bColsPart_3; ++c) {
			matricePart_3[r][c] = 0;             // initialize the current cell
				for (var i = 0; i < aColsPart_3; ++i) {
					matricePart_3[r][c] += originalArray_1[r][i] *  matricePart_2[i][c];
				}
		}
	}
	console.log(matricePart_3);

	var aRowsPart_4 = originalArray_2.length, aColsPart_4 = originalArray_2[0].length,
		bRowsPart_4 =  matricePart_2.length, bColsPart_4 =  matricePart_2[0].length,
		matricePart_4 = new Array(aRowsPart_4);  // initialize array of rows
	for (var r = 0; r < aRowsPart_4; ++r) {
		matricePart_4[r] = new Array(bColsPart_4); // initialize the current row
		for (var c = 0; c < bColsPart_4; ++c) {
			matricePart_4[r][c] = 0;             // initialize the current cell
				for (var i = 0; i < aColsPart_4; ++i) {
					matricePart_4[r][c] += originalArray_2[r][i] *  matricePart_2[i][c];
				}
		}
	}
	console.log(matricePart_4);


	drawLine(matricePart_3[0][0],matricePart_3[0][1],matricePart_4[0][0],matricePart_4[0][1]);

}


function generalRotate(){

	applyTransformation();

	var translateArray_1 = [
		[1,0,0],
		[0,1,0],
		[-TX, -TY, 1]
	];

	var basicRotateArray = [
		[S,0,0],
		[0,S,0],
		[0,0,1]

	];
	
	var translateArray_2 = [
		[1,0,0],
		[0,1,0],
		[TX, TY, 1]
	];

	var originalArray_1 = [
		[X0, Y0, 1]

	];

	var originalArray_2 = [
		[X1, Y1, 1]

	];

	console.log(basicRotateArray);
		var aNumRows = translateArray_1.length, aNumCols = translateArray_1[0].length,
		bNumRows =  basicRotateArray.length, bNumCols =  basicRotateArray[0].length,
		m = new Array(aNumRows);  // initialize array of rows
	for (var r = 0; r < aNumRows; ++r) {
		m[r] = new Array(bNumCols); // initialize the current row
		for (var c = 0; c < bNumCols; ++c) {
			m[r][c] = 0;             // initialize the current cell
				for (var i = 0; i < aNumCols; ++i) {
					m[r][c] += translateArray_1[r][i] *  basicRotateArray[i][c];
				}
		}
	}
	console.log(m);

	var aRowsPart_2 = m.length, aColsPart_2 = m[0].length,
		bRowsPart_2 =  translateArray_2.length, bColsPart_2 =  translateArray_2[0].length,
		matricePart_2 = new Array(aRowsPart_2);  // initialize array of rows
	for (var r = 0; r < aRowsPart_2; ++r) {
		matricePart_2[r] = new Array(bColsPart_2); // initialize the current row
		for (var c = 0; c < bColsPart_2; ++c) {
			matricePart_2[r][c] = 0;             // initialize the current cell
				for (var i = 0; i < aColsPart_2; ++i) {
					matricePart_2[r][c] += m[r][i] *  translateArray_2[i][c];
				}
		}
	}
	console.log(matricePart_2);




	var aRowsPart_3 = originalArray_1.length, aColsPart_3 = originalArray_1[0].length,
		bRowsPart_3 =  matricePart_2.length, bColsPart_3 =  matricePart_2[0].length,
		matricePart_3 = new Array(aRowsPart_3);  // initialize array of rows
	for (var r = 0; r < aRowsPart_3; ++r) {
		matricePart_3[r] = new Array(bColsPart_3); // initialize the current row
		for (var c = 0; c < bColsPart_3; ++c) {
			matricePart_3[r][c] = 0;             // initialize the current cell
				for (var i = 0; i < aColsPart_3; ++i) {
					matricePart_3[r][c] += originalArray_1[r][i] *  matricePart_2[i][c];
				}
		}
	}
	console.log(matricePart_3);

	var aRowsPart_4 = originalArray_2.length, aColsPart_4 = originalArray_2[0].length,
		bRowsPart_4 =  matricePart_2.length, bColsPart_4 =  matricePart_2[0].length,
		matricePart_4 = new Array(aRowsPart_4);  // initialize array of rows
	for (var r = 0; r < aRowsPart_4; ++r) {
		matricePart_4[r] = new Array(bColsPart_4); // initialize the current row
		for (var c = 0; c < bColsPart_4; ++c) {
			matricePart_4[r][c] = 0;             // initialize the current cell
				for (var i = 0; i < aColsPart_4; ++i) {
					matricePart_4[r][c] += originalArray_2[r][i] *  matricePart_2[i][c];
				}
		}
	}
	console.log(matricePart_4);


	drawLine(matricePart_3[0][0],matricePart_3[0][1],matricePart_4[0][0],matricePart_4[0][1]);


}

