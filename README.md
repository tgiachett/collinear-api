# Collinear API

## Overview

Computer vision involves analyzing patterns in visual images and reconstructing the real world objects that produced them. The process in often broken up into two phases: feature detection and pattern recognition. Feature detection involves selecting important features of the image; pattern recognition involves discovering patterns in the features. We will investigate a particularly clean pattern recognition problem involving points and line segments. This kind of pattern recognition arises in many other applications, for example statistical data analysis.

Collinear API is a REST API Service that determines lines that contain at least N or more collinear points.

## Usage


- ### Add a point to the space

`POST /point with body { "x": ..., "y": ... }`



- ### Get all points in the space

`GET /space`


Example response

`[
{"x": 2, "y": 3},
{"x": -2, "y": 1023},
{"x": 3.2, "y": 0},
...
]`


- ### Get the longest line segment passing through at least N points.

`GET /lines/{n}`

Example
Request: GET /lines/2

`[
[
{"x": 2, "y": 3},
{"x": -2, "y": 1023}
],
[
{"x": 3.2, "y": 0},
{"x": -2, "y": 1023}
],
...
]`


- ### Remove all points from the space

`DELETE /space`

## Installation and Deploy

1. Install the latest versions of node and npm.

2. Install npm dependencies using `npm install`.

3. Install mysql and mysql server

4. Create a .env file with `DB_PASS='$yourmysqlpasshere'`

- alternatively you can configure the database manually using the config file in the config folder

5. Run tests with `npm test` (also starts the sever)

6. start the server with `node app.js` from the root folder

- Note that the default server port is `8080` and the default host is `'localhost'`

7. Send test requests to `http://localhost:8080` ( for example `http://localhost:8080/space` )

8. Please post issues if you find bugs or see areas of improvement


