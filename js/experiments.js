var trianglify = function(element) {

  var colors = [
    "#67889e", "#39425a", "#4b2728", 
    "#453b41", "#3b463b", "#645f3c", "#d7ca20"
  ];

  // bounds are rectangular:
  // { x, y, x2, y2 }
  var makeTriangle = function() {

    var sides = ["N","W","E","S"];

    return function(bounds) {
      // we need to pick three points. To do that, 
      // we're going to pick 3 out of the four sides.
      var s = [], side;
      while (s.length < 3) {
        side = Math.round(Math.random() * 3);
        if (s.indexOf(side) === -1) {
          s.push(side);
        }
      }

      // triangle points.
      var points = [];

      // now, for each point, generate a random value.
      // fix the value of which ever axis we're looking at.
      s.forEach(function(side_index) {

        var point = { x : 0, y : 0 }
        side = sides[side_index];

        var fix;
        switch (side) {
          case "N":
            point.y = bounds.y;  
            fix = "y";
            break;
          case "S":
            point.y = bounds.y2;
            fix = "y";
            break;
          case "W":
            point.x = bounds.x;
            fix = "x";
            break;
          case "E":
            point.x = bounds.x2;
            fix = "x";
            break;
        }

        if (fix === "y") {
          point.x = Math.round(Math.random() * (bounds.x2 - bounds.x)) + bounds.x;
        }
        else if (fix === "x") {
          point.y = Math.round(Math.random() * (bounds.y2 - bounds.y)) + bounds.y;
        }
        
        points.push(point);
      });

      return points;    
    }
  }();

  function stopPainting() {
    // stop painting
    for(var j = 0; j < paintingTimeouts.length; j++) {
      clearTimeout(paintingTimeouts[j]);  
      paintingTimeouts[j] = null;
    }
    paintingTimeouts = _.compact(paintingTimeouts);
  }

  function clearCanvas() {
    

    var total = triangles.length, processed = 0;

    function clearTriangle(i) {
      clearingTimeout = setTimeout(function() {

        // stop painting
        stopPainting();

        if (i > triangles.length) {
          i = 0;
        }
        var t = triangles[i];
        if (t) {
          t.animate({ opacity : 0 }, 50, "linear", function() {
            t.remove();
            processed++;
            triangles[i] = null;

            if (processed+1 >= total) {
              clearTimeout(clearingTimeout);
              paintTriangle(center);
              triangles = _.compact(triangles);
            }
          });
        } else {
          processed++;
          if (processed+1 >= total) {
            clearTimeout(clearingTimeout);
            paintTriangle(center);
            triangles = _.compact(triangles);
          }
        }
        clearTriangle(i+1);  
      }, 50);
    }

    clearTriangle(0);
  }

  function inBounds(point) {
    return ((point.x > 0 && point.x < paper.width) &&
           (point.y > 0 && point.y < paper.height))
  }
  function pathifyTriangle(points) {

    return path = "M" + points[0].x + " " + points[0].y + "L" +
        points[1].x + " " + points[1].y + "L" +
        points[2].x + " " + points[2].y + "L" +
        points[0].x + " " + points[0].y + "Z";
  }

  function findTriangleCenter(points) {
    var minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;
    for(var i = 0; i < points.length; i++) {
      if (points[i].x < minX) minX = points[i].x;
      if (points[i].x > maxX) maxX = points[i].x;
      if (points[i].y < minY) minY = points[i].y;
      if (points[i].y > maxY) maxY = points[i].y;
    }

    return { x : (maxX - minX) / 2 + minX, y : (maxY - minY) / 2 + minY };
  };

  var paper = Raphael(element);
  var center = { x : paper.width / 2, y : (paper.height / 3) * 2 };
      width = 100, 
      height = 100,
      num = 100,
      easing = 0.9,
      delay = 1000,
      triangles = [], 
      triangle = null,
      paintingTimeouts = [],
      clearingTimeout = null;

  var paintTriangle = function(center) {
    delay = delay * easing;
    if (delay < 50) {
      easing = easing * 1.1;
    }
    if (delay > 300) {
      easing = easing * 0.9;
    }
    paintingTimeout = setTimeout(function() {
      var bounds = {
        x : center.x - width/2, y : center.y - height/2,
        x2 : center.x + width/2, y2 : center.y + height/2
      };
      
      var colorIndex = Math.round(Math.random() * (colors.length - 1));
      var points = makeTriangle(bounds);
      triangle = paper.path(
        pathifyTriangle(points)
      ).attr({ 
        fill : colors[colorIndex],
        opacity: (Math.random() * 0.4) + 0.1,
        stroke: "none"
      });
      triangles.push(triangle);

      if (triangles.length > 50) {
        stopPainting();
        clearCanvas();
      } else {
        var newCenter = findTriangleCenter(points);
        paintTriangle(points[Math.round(Math.random() * 2)]);  
      }
    }, delay);

    paintingTimeouts.push(paintingTimeout);
  }

  paintTriangle(center);

  $('.sidenav .stop').click(function() {
    if ($('a', this).text() === "x stop") {
      paintingTimeouts.forEach(function(t) {
        clearTimeout(t);
      });
      clearTimeout(clearingTimeout);
      $('a', this).text("+ start");  
    } else {
      paintTriangle(center);
      $('a', this).text("x stop");  
    }
    
  });

};