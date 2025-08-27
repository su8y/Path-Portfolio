"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPointAtRatio = getPointAtRatio;
exports.getTotalLengthVector = getTotalLengthVector;
var _Vector2D = require("./Vector2D.js");
// src/core/geometry.js

function getTotalLengthVector(lineString) {
  var totalLength = 0;
  for (var i = 0; i < lineString.length - 1; i++) {
    var v1 = new _Vector2D.Vector2D(lineString[i][0], lineString[i][1]);
    var v2 = new _Vector2D.Vector2D(lineString[i + 1][0], lineString[i + 1][1]);
    var segment = v2.subtract(v1);
    totalLength += segment.length();
  }
  return totalLength;
}
function getPointAtRatio(lineString, ratio) {
  if (ratio <= 0) return lineString[0];
  if (ratio >= 1) return lineString[lineString.length - 1];
  var totalLength = getTotalLengthVector(lineString);
  var targetDistance = totalLength * ratio;
  var runningDistance = 0;
  for (var i = 0; i < lineString.length - 1; i++) {
    var v1 = new _Vector2D.Vector2D(lineString[i][0], lineString[i][1]);
    var v2 = new _Vector2D.Vector2D(lineString[i + 1][0], lineString[i + 1][1]);
    var segment = v2.subtract(v1);
    var segmentLength = segment.length();
    if (runningDistance + segmentLength >= targetDistance) {
      var remainingDistance = targetDistance - runningDistance;
      var segmentRatio = remainingDistance / segmentLength;
      var resultVector = v1.add(segment.multiply(segmentRatio));
      return resultVector.toArray();
    }
    runningDistance += segmentLength;
  }
  return lineString[lineString.length - 1];
}