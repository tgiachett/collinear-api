




// const repl = require('repl');

// all points connected to the same point with the same slope are collinear
// calculate the slopes of each line created with point i and count the segments
// eliminating the cases where the number of points is under n
// and also eliminate repeat cases of the same line

function qcollinear (set, n, linesOrSegmentsFunction) {
    // keep track of repeat cases
    let p = 0;
    
    // keep track of the coordinates of the lines that satisfy collinear points N
    const lines = [];
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
		
	
		//store them in an array for compare later
		points.push(point);
		
	    }
	}
	
	// sort the slopes in order to find duplicates ( duplicates will be next to each other)
	points.sort(function(a,b){return a[1]-b[1];});

	//three colinear points will be two lines with duplicate slopes so if the slopes at adjoining indexes are the same then
	
//set up a function to determine which sets of points are collinear
function determineLinesCollinearWithFocal (focal, points) {
    //account for how many extra points have to be included to satisfy n
    // if n is 2 every point collinear with point focal is collinear
	const nFactor = n-2;
	for(let l = 0; l < points.length; l++) {
	    // skip ahead to the index that would satisfy collinear condition
	    if (points[l+nFactor] && points[l][1] === points[l+nFactor][1]) {
		
		let coLine = [];

		coLine.push(points[l][0]);
		coLine.push(points[l+nFactor][0]);
		coLine.push(focal);
		// this only needs to be included in the longest line function
		coLine.sort(function(a,b){return a[0]-b[0];});
		
		// retain slope for each collinear set
		coLine.push(points[l][1]);
		//add the results to the complete line segments array
		lines.push(coLine);
	    }
	    
	}
    // sort by slope to prepare for further processing
    lines.sort(function(a,b){return a[3]-b[3];});
    return lines;

}

	//increment the repeat cases counter to avoid repeat cases
	p++;
	// run the collinear determination function
	determineLinesCollinearWithFocal(set[i], points);
	
    }

    return lines;
    
 
}

// a line only has to have two points
// set up a function that gets rid of other collinear segments
 function reduceLines (lines) {
	const shortListLines = [];
	shortListLines.push([lines[0][0],lines[0][1]]);
	// determine results that lie on the same line
	for(let i = 0; i < lines.length-1; i++) {
	    if(lines[i][3] !== lines[i+1][3] && !lines[i].every(e =>lines[i+1].includes(e))) {
		shortListLines.push([lines[i][0], lines[i][1]]);
	    }
	}
	return shortListLines;
	
}





// helper function that gets the slope
function getSlope(x1, y1, x2, y2) {
    return (y2 - y1)/(x2 -x1);
};


//distance helper function ;input is two point arrays
 function getDistance (pointOne, pointTwo) {
    const a = pointOne[0] - pointTwo[0];
    const b = pointOne[1] - pointTwo[1];
    return Math.sqrt( a*a + b*b );
}

//make sublists before adding distances

 function createSublist (theLines, listsArr) {
    let linesWithDistance = theLines;
    let shallowList = [];
    let subList = [];
    
    let i = 0;
    // console.log(linesWithDistance);
    if (linesWithDistance.length === 1) {
	subList.push(linesWithDistance[0]);
	listsArr.push(subList);
	return listsArr;
    }
    for (let i = 0; i < linesWithDistance.length; i++) {
    if(linesWithDistance[i+1] &&
	  (hasDupes(linesWithDistance[i], linesWithDistance[i+1]) || hasDupes(linesWithDistance[i], linesWithDistance[i-1])) &&
	  ((linesWithDistance[i][3] === linesWithDistance[i+1][3]) || (linesWithDistance[i][3] === linesWithDistance[i-1][3])) &&
	  i < linesWithDistance.length
	 ) {
	subList.push(linesWithDistance[i]);
    } else {
	shallowList.push(linesWithDistance[i]);
    }
    }
    
    // console.log(subList);
    listsArr.push(subList);
    console.log(listsArr);
    return createSublist(shallowList, listsArr);
    
}

 function getLongestSingleDistance (set) {
 
    let linesWithDistance = set;
    for(let i = 0; i < set.length; i++) {
	let dist = getDistance(set[i][0], set[i][2]);
	// console.log(dist);
	linesWithDistance[i].push(dist);
	// console.log(linesWithDistance[i]);
	
    }
    
    // console.log(linesWithDistance);
    linesWithDistance.sort(function(a,b){return a[4]-b[4];});
    // console.log(linesWithDistance[linesWithDistance.length-1]);
    return linesWithDistance[linesWithDistance.length-1];
}




function getLongestLineInSublist (lines) {
    //calculate the distance of


    let listsArr = [];
    let finalLongestList = [];
    // populate the lists array with sublists of collinear sets
    createSublist(lines, listsArr);
    // console.log(listsArr);
    for(let i = 0; i < listsArr.length; i++) {
    	let longest = getLongestSingleDistance(listsArr[i]);
    	finalLongestList.push([longest[0],longest[2]]);
    }
    return finalLongestList;
    

    
 

}

    
    // 	if(linesWithDistance[i+1] &&
    // 	   linesWithDistance[i][3] === linesWithDistance[i+1][3] && //slopes are same
    // 	   (hasDupes(linesWithDistance[i], linesWithDistance[i+1]) || hasDupes(linesWithDistance[i], linesWithDistance[i+1]))   // contain atleast one similar point
    // 	   // linesWithDistance[i][4] < linesWithDistance[i+1][4] // distance is greater
	   
    // 	  ) {
    // 	    let line = linesWithDistance.splice(i,1);
    // 	    subList.push(line);
    // 	}
    // }
    // return subList;



    
    // let temp = [];
    // let p = 0;
    // // separate out collinear sets
    // for(let i = 0; i < linesWithDistance.length; i++) {
	
    // 	if(linesWithDistance[i+1] &&
    // 	   linesWithDistance[i][3] === linesWithDistance[i+1][3] && //slopes are same
    // 	   (hasDupes(linesWithDistance[i], linesWithDistance[i+1]) || hasDupes(linesWithDistance[i], linesWithDistance[i+1]))   // contain atleast one similar point
    // 	    // linesWithDistance[i][4] < linesWithDistance[i+1][4] // distance is greater
    // 	  ) {
	    
    // 	    console.log("passed");
    // 	    temp[p]++;
    // 	//     console.log("push largest");
    // 	//     // push the greatest distance line segment
    // 	//     longestLines.splice()
    // 	    //     // longestLines.push([linesWithDistance[i+1][0], linesWithDistance[i+1][2]]);
    //  	} else {
    // 	    console.log("else");
    // 	    longestLines.push(linesWithDistance[temp[p]]);
    // 	    p++;
    // 	}
    // }
    // // console.log(temp);
    
    // // longestLines.push(temp);
    // // if(lines[i][3] === lines[i+1][3] && lines[i].every(e =>lines[i+1].includes(e))) {
    // // 	    //compare distances between collinear sets (excluding point in the middle)
    // // 	    longestLines.push(
    // // 	  }
//     return longestLines; // output is array of collinear point arrays
    
// }

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



Array.prototype.equals = function (array) {
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
Object.defineProperty(Array.prototype, "equals", {enumerable: false});


// // global.setRandomPointsP = setRandomPointsP;
// // global.randSet = setRandomPointsP(10, 20);
// global.createSublist = createSublist;
// global.hasDupes = hasDupes;
// global.qcollinear = qcollinear;
// global.slope = getSlope;
// global.getLongestLineInSublist = getLongestLineInSublist;
// global.set = [[1,1],[2,2],[3,3],[4,4]];
// global.set2 = [[1,1],[1,3],[2,2],[3,3],[3,1]];
// global.set3 = [[1,1],[2,2],[3,3],[4,4],[5,5]];
// global.set4 = [[1,1],[1,3],[2,2],[3,3],[3,1],[0,4],[4,0]];
// global.set5 = [[2,2],[3,1],[4,0],[1,1],[1,3],[0,4],[3,3]];
// global.testLines = qcollinear(global.set5,3);
// global.everyLine = reduceLines;
// // global.collinear = collinear;

// repl.start('>');




// export default { hasDupes,
// 		 getLongestLineInSublist,
// 		 getLongestSingleDistance,
// 		 createSublist,
// 		 getDistance,
// 		 getSlope,
// 		 reduceLines,
// 		 qcollinear
// 	       };
		 
module.exports = {hasDupes, getLongestLineInSublist, getLongestSingleDistance, createSublist, getDistance, getSlope, reduceLines, qcollinear};
