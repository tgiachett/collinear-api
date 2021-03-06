
const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = normalizePort(process.env.PORT || '8080');
const router = express.Router();
const models = require("./models");
const debug = require('debug')('express-sequelize');
const http = require('http');
const collinear = require("./businessLogicModels/isCollinear.js");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get("/space", (req, res) => {

    models.Point.findAll({}).then((space) => {
	const pointsArr = [];
	
	space.forEach(point => {
	    let objectPoint = {x: point.dataValues.x,
			       y: point.dataValues.y};
	    pointsArr.push(objectPoint);
	    
	});
	res.json(pointsArr);
    });
});

app.post("/point", (req, res) => {
    if(req.body instanceof Array ||  isNaN(req.body.x) || isNaN(req.body.y)) {
	
	res.json({Error: `Validation error`}); 


    } else {

	models.Point.findAll({
	    where: {
		x: req.body.x,
		y: req.body.y
	    }
	}).then((data) => {
	    if(data[0]) {
		res.json({Error: "Point already exists"});
	    } else {

		models.Point.create({
		    x: parseFloat(req.body.x),
		    y: parseFloat(req.body.y)
		}).then((data) => {
		    
		    res.json({x: data.x,
			      y: data.y});

		}).catch(function(err) {
		    // print the error details
		    const errorsList = [];
		    err.errors.forEach(err => {
			let jsonErr = {Error: err.message};
			errorsList.push(jsonErr);
		    });
		    res.json(errorsList);
		});
	    } 
	});
	


    }
    
});

app.post("/lines/:n", (req, res) => {
    let n = req.params.n;
    
    if(isNaN(n)) {
	res.json({Error: `Validation error`}); 
    } else {
	models.Point.findAll({}).then((space) => {
	    let processedToArray = [];

	    space.forEach(point => {
		processedToArray.push([point.dataValues.x, point.dataValues.y]);
	    });
	    
	    console.log(processedToArray);
	    let resultArr = [];
	    
	    const intermediateList = collinear.qcollinear(processedToArray, n);
	    console.log(intermediateList);
	    if(intermediateList.length === 0 || !intermediateList[0] || null) {
		res.json({Error: "No valid output"});
		return;
	    }
	    intermediateList.forEach(coordPair => {
		let coordsArr = [];
		coordPair.forEach( coord => {

		    let coordsObject = {
      			x: coord[0],
      			y: coord[1]};
      		    coordsArr.push(coordsObject);
		});
		resultArr.push(coordsArr);
	    });
	    res.json(resultArr);		      
	    
	    
	});
	
    };

    
});

app.delete("/space", (req, res) => {
    models.Point.destroy({
	where: {},
	truncate: true
    }).then((data) => {
	res.json({Message: "Successfuly removed all points from the space"});
    });
});



var server = http.createServer(app);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
	// named pipe
	return val;
    }

    if (port >= 0) {
	// port number
	return port;
    }

    return false;
}

models.sequelize.sync().then(function() {
    
    server.listen(port, function() {
	console.log(`listening on port ${port}`);
	
    });
    
});



module.exports = app;
