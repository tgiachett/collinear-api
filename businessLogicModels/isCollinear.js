




const repl = require('repl');

// all points connected to the same point with the same slope are collinear
// calculate the slopes of each line created with point i and count the segments
// eliminating the cases where the number of points is under n
// and also eliminate repeat cases of the same line

function qcollinear (set, n,) {
    
    // if(set < n || n === 0 || n === 1) {
    // 	return [];
    // }
    
    // keep track of repeat cases with p
    let p = 0;
    let lines = [];

    // keep track of the coordinates of the lines that satisfy collinear points N
    //iterate through each point
    for (let i = 0; i < set.length; i++) {
	//empty array that will store all lines and their slopes
	const points = [];

	//determine the slope of this point and every OTHER point, and store these in an array with corresponding line coordinates 
	for (let k = p; k < set.length; k++) {
	    //only check angles with other points
	    
	    if (set[i][0] === set[k][0] && set[i][1] === set[k][1]) {
	    } else {
		
		// get the slope of the focal point i and each other point k with a helper function
		const slope = getSlope(set[i][0],set[i][1], set[k][0], set[k][1]);
		
		// store the value of the slope as well as the points that make up that slope
		const point = [set[k], slope];
		
		points.push(point);

	    }
	}

	
	p++;
	// run the collinear determination with atleast n on the set of points with their slopes
	determineLinesCollinearWithFocal(set[i], points, lines, n);

    }
    // if no Collinear points are found then return
    if(!lines[0]) {
	return [];
    } else {
	let totals = [];

	lines.sort(function(a,b){return a[0]-b[0];});
	sublist(lines, totals);

	//find longest for each sublist (collinear set) and push those to the results array
	
	let result = [];
	totals.forEach(set => {
	    let longest = getLongestCollinearDistance(set);
	    result.push([longest[1],longest[2]]);
	});
	
	return result;
    }
    
}

function determineLinesCollinearWithFocal (focal, points, lines, n) {
    
    // sort the slopes in order to find duplicates ( duplicates will be next to each other)
    points.sort(function(a,b){return a[1]-b[1];});
    //account for how many extra points have to be included to satisfy n
    // if n is 2 every point collinear with point focal is collinear
    const nFactor = n-2;
    for(let l = 0; l < points.length; l++) {
	let coLine = [];
	// skip ahead to the index that would satisfy slope collinear condition
	if (points[l+nFactor] && points[l][1] === points[l+nFactor][1]) {

	    coLine.push(points[l][1]);
	    coLine.push(points[l][0]);
	    coLine.push(points[l+nFactor][0]);
	    coLine.push(focal);
	    lines.push(coLine);
	    
	}
	
    }
    return lines;
}



function sublist (lines, totals) {
    if(lines.length ===1) {
	totals.push(lines);
	return totals;
    }

    const subtotals = [];
    for(let i = lines.length-1; i >= 0; i--) {
	
	if(lines[i-1] &&
	    lines[i-1][0] === lines[i][0] &&
	   hasDupes(lines[i-1],lines[i]))
	{	   
	  
	    subtotals.push(lines[i]);
	    lines.pop();
	    // console.log("tripped1", lines[i-1]);
	} else if (

	    (subtotals[0] &&
		subtotals[0][0] && lines[i][0] === subtotals[0][0]) &&
		hasDupes(lines[i], subtotals[0])
	)
	{
	    subtotals.push(lines[i]);
	    lines.pop();
	    
	} else if (lines[i] === lines[lines.length-1]) {
	    subtotals.push(lines[i]);
	    totals.push(subtotals);
	    lines.pop();
	    return sublist(lines, totals);
	}
	    if(lines.length > 0 &&
       lines.length <= 1) {
    
    	subtotals.push(lines[0]);
    	totals.push(subtotals);
    	return totals;
    }
    }
    
    totals.push(subtotals);
    return sublist(lines, totals);

}




// function sublist (lines, totals) {
//     console.log("lines input",lines);
//     // const tempLines = lines;
//     const subtotals = [];
//     for(let i = lines.length-1; i >= 0; i--) {
// 	console.log("before",lines[i]);
	
// 	if(lines[i-1] &&
// 	    lines[i-1][0] === lines[i][0] &&
// 	   hasDupes(lines[i-1],lines[i]))
// 	{	   
// 	    console.log("tripped 1", lines[i]);
// 	    subtotals.push(lines[i-1]);
// 	    lines.pop();
// 	    // console.log("tripped1", lines[i-1]);
// 	} else if (

// 	    (subtotals[0] &&
// 		subtotals[0][0] && lines[i][0] === subtotals[0][0]) &&
// 		hasDupes(lines[i], subtotals[0])
// 	)
// 	{
// 	    console.log("tripped2", lines[i]);
// 	    subtotals.push(lines[i]);
// 	    lines.pop();
	    
// 	} else if (lines[i] === lines[lines.length-1]) {
// 	    subtotals.push(lines[i]);
// 	    totals.push(subtotals);
// 	    lines.pop();
// 	    return sublist(lines, totals);
// 	}
// 	    if(lines.length > 0 &&
//        lines.length <= 1) {
//     	console.log("tripped last");
//     		console.log(lines[0]);
// 		console.log("last sub",subtotals);
//     	subtotals.push(lines[0]);
//     	totals.push(subtotals);
//     	console.log(totals);
//     	return totals;
//     }
//     }
    
//     totals.push(subtotals);
//     console.log("loop",lines);
//     return sublist(lines, totals);

// }

function getLongestCollinearDistance (set) {
    
    let distances = [];
    for(let i = 0; i < set.length; i++) {
	distances.push(subDistance(set[i]));
    }
    
    distances.sort(function(a,b){return a[0]-b[0];});
    
    return distances[distances.length-1];
    
}


// helper function that gets the slope
function getSlope(x1, y1, x2, y2) {
    let calc = (y2 - y1)/(x2 -x1);
    if(calc === -Infinity) {
	return Math.abs(calc);
    } else {
	return calc;
    }
    
};



function getDistance (pointOne, pointTwo) {
    const a = pointOne[0] - pointTwo[0];
    const b = pointOne[1] - pointTwo[1];
    return Math.sqrt( a*a + b*b );
}

//make sublists before adding distances

function subDistance (set) {
    

    let distOne = getDistance(set[1], set[2]);
    let distTwo = getDistance(set[1],set[3]);
    let distThree = getDistance(set[2],set[3]);
    let distances = [[distOne,set[1],set[2]] , [distTwo,set[1],set[3]], [distThree,set[2],set[3]]];
    distances.sort(function(a,b){return a[0]-b[0];});

    return distances[distances.length-1];
    
    
}




function hasDupes (A,B) {
    for (let i = 0; i < A.length; i++) {
	for (let p = 0; p < B.length; p++) {
	    if(Array.isArray(A[i]) && Array.isArray(B[p])) {
		A[i].equals(B[p]);
		return true;
	    }
	}
    }
    return false;
}

let load = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}

Array.prototype.arrEquals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "arrEquals", {enumerable: false});

function hasDupes (A,B) {
    for (let i = 0; i < A.length; i++) {
	for (let p = 0; p < B.length; p++) {
	    if(Array.isArray(A[i]) && Array.isArray(B[p])) {
		if(A[i].arrEquals(B[p])) {
		    return true;
		}
	    }
	}
    }
    return false;
}

global.sublist = sublist;
global.getDistance = getDistance;
global.hasDupes = hasDupes;
global.qcollinear = qcollinear;
global.slope = getSlope;
global.set = [[1,1],[2,2],[3,3],[4,4]];
global.set2 = [[1,1],[1,3],[2,2],[3,3],[3,1]];
global.set3 = [[1,1],[2,2],[3,3],[4,4],[5,5]];
global.set4 = [[1,1],[1,3],[2,2],[3,3],[3,1],[0,4],[4,0]];

global.set5 = [[2,2],[3,1],[4,0],[1,1],[1,3],[0,4],[3,3]];
global.arrayEquals = load;


global.set6 = [ [ 3, 3 ], [ 1, 1 ], [ 2, 2 ], [ 4, 4 ], [ 5, 5 ], [ 1, 3 ],[ 3, 1 ]];
global.set7 = [[1,3,],[2,2],[1,1],[4,4]];
global.set8 = [[1,1],[1,3],[2,2],[3,3],[3,1],[0,4],[4,0],[2,0],[2,4]];
global.set9 = [[1,3,],[2,2],[1,1],[4,4],[9,11]];
global.set10 = [[1,3,],[2,2],[1,1],[4,4],[9,11], [(1/3), 3], [(1/3), 0], [(1/3), 6]];




repl.start('>');


const testSets  = [[[1,1],[2,2],[3,3],[4,4]], [[1,1],[1,3],[2,2],[3,3],[3,1]], [[1,1],[2,2],[3,3],[4,4],[5,5]], [[1,1],[1,3],[2,2],[3,3],[3,1],[0,4],[4,0]], [[2,2],[3,1],[4,0],[1,1],[1,3],[0,4],[3,3]], [ [ 3, 3 ], [ 1, 1 ], [ 2, 2 ], [ 4, 4 ], [ 5, 5 ], [ 1, 3 ],[ 3, 1 ]], [[1,3,],[2,2],[1,1],[4,4]], [[1,1],[1,3],[2,2],[3,3],[3,1],[0,4],[4,0],[2,0],[2,4]], [[1,3,],[2,2],[1,1],[4,4],[9,11]], [[1,3,],[2,2],[1,1],[4,4],[9,11], [(1/3), 3], [(1/3), 0], [(1/3), 6]]];

for( let i = 0; i < testSets.length; i++) {
    console.log(qcollinear(testSets[i], 3));
}

module.exports = {qcollinear, getSlope, getDistance, subDistance, determineLinesCollinearWithFocal, sublist, getLongestCollinearDistance , hasDupes};
