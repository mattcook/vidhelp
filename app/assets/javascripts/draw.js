var drawFunction = (function () {
  //Set up some globals
  var pixSize = 4, lastPoint = null, currentColor = "000", mouseDown = 0;

  //Create a reference to the pixel data for our drawing.
  var pixelDataRef = new Firebase('https://xn0cgz0p8l0.firebaseio-demo.com/drawing/1');

  // Set up our canvas
  var myCanvas = document.getElementById('drawing-canvas');

  var myContext = myCanvas.getContext ? myCanvas.getContext('2d') : null;
  if (myContext == null) {
    alert("You must use a browser that supports HTML5 Canvas to run this demo.");
    return;
  }

  window.addEventListener('resize', resizeCanvas, false);

  //Setup each color palette & add it to the screen
  var colors = ["fff","000","c0392b","e67e22","f1c40f","2ecc71","9b59b6"];
  for (c in colors) {
    var item = $('<div/>').css("background-color", '#' + colors[c]).addClass("colorbox");
    item.click((function () {
      var col = colors[c];
      return function () {
        currentColor = col;
      };
    })());
    item.appendTo('#colorholder');
  }

  function resizeCanvas() {
    var va = document.getElementById('remoteVideos').childNodes
    var videoContainerInnerVideo = va[va.length -1]
    var videoWidth = videoContainerInnerVideo.offsetWidth
    var videoHeight = videoContainerInnerVideo.offsetHeight
    myCanvas.width = videoWidth;
    myCanvas.height = videoHeight;

    drawStuff();
  }
  resizeCanvas();

  function drawStuff() {
    //Keep track of if the mouse is up or down
    myCanvas.onmousedown = function () {mouseDown = 1;};
    myCanvas.onmouseout = myCanvas.onmouseup = function () {
      mouseDown = 0; lastPoint = null;
    };

    //Draw a line from the mouse's last position to its current position
    var drawLineOnMouseMove = function(e) {
      if (!mouseDown) return;

      e.preventDefault();

      // Bresenham's line algorithm. We use this to ensure smooth lines are drawn
      var offset = $('canvas').offset();
      var x1 = Math.floor((e.pageX - offset.left) / pixSize - 1),
        y1 = Math.floor((e.pageY - offset.top) / pixSize - 1);
      var x0 = (lastPoint == null) ? x1 : lastPoint[0];
      var y0 = (lastPoint == null) ? y1 : lastPoint[1];
      var dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
      var sx = (x0 < x1) ? 1 : -1, sy = (y0 < y1) ? 1 : -1, err = dx - dy;
      while (true) {
        //write the pixel into Firebase, or if we are drawing white, remove the pixel
        var xcords = (x0/window.innerWidth).toString().replace('.', '-');
        var ycords = (y0/window.innerHeight).toString().replace('.', '-');
        pixelDataRef.child(xcords + ":" + ycords).set(currentColor === "fff" ? null : currentColor);

        if (x0 == x1 && y0 == y1) break;
        var e2 = 2 * err;
        if (e2 > -dy) {
          err = err - dy;
          x0 = x0 + sx;
        }
        if (e2 < dx) {
          err = err + dx;
          y0 = y0 + sy;
        }
      }
      lastPoint = [x1, y1];
    };
    $(myCanvas).mousemove(drawLineOnMouseMove);
    $(myCanvas).mousedown(drawLineOnMouseMove);

    // Add callbacks that are fired any time the pixel data changes and adjusts the canvas appropriately.
    // Note that child_added events will be fired for initial pixel data as well.
    var drawPixel = function(snapshot) {
      var coords = snapshot.key().split(":");
      var drawxcords = parseFloat(coords[0].replace('-', '.')) * window.innerWidth;
      var drawycords = parseFloat(coords[1].replace('-', '.')) * window.innerHeight;
      myContext.fillStyle = "#" + snapshot.val();
      myContext.fillRect(parseInt(drawxcords) * pixSize, parseInt(drawycords) * pixSize, pixSize, pixSize);
    };
    var clearPixel = function(snapshot) {
      var coords = snapshot.key().split(":");
      var drawxcords = parseFloat(coords[0].replace('-', '.')) * window.innerWidth;
      var drawycords = parseFloat(coords[1].replace('-', '.')) * window.innerHeight;
      myContext.clearRect(parseInt(drawxcords) * pixSize, parseInt(drawycords) * pixSize, pixSize, pixSize);
    };
    pixelDataRef.on('child_added', drawPixel);
    pixelDataRef.on('child_changed', drawPixel);
    pixelDataRef.on('child_removed', clearPixel);
  }

  $('#clear-drawing').on('click', function(){
    pixelDataRef.remove();
    clearPixel();
  });
});
