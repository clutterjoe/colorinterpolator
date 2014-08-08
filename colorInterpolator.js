
var ColorInterpolator = function(goalposts) {
  this.defaults = {
    goalposts: ['000', 'fff']
  }

  var translateColorsToRGB = function(colorsHex) {
    colorsRGB = [];
    var hexToComponent = function(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    for (i = 0; i < colorsHex.length; i++) {
      c = colorsHex[i];
      c = c.toLowerCase();
      if (c.substr(0, 1) === '#') {
        c = c.substr(1);
      }
      if (c.length === 3) {
        c = c.substr(0, 1) + c.substr(0, 1) + c.substr(1, 1) + c.substr(1, 1) + c.substr(2, 1) + c.substr(2, 1);
      }
      c = '#' + c;
      var cRGB = hexToComponent(c);
      if (cRGB instanceof Object) {
        colorsRGB[colorsRGB.length] = cRGB;
      }
    }
  return colorsRGB;
  }
  var translateColorsToHex = function(colorsRGB) {
    var colorsHex = [];
    var componentToHex = function(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    for (var i = 0; i < colorsRGB.length; i++) {
      colorsHex[i] = "#" + componentToHex(colorsRGB[i].r) + componentToHex(colorsRGB[i].g) + componentToHex(colorsRGB[i].b);
    }
  return colorsHex;
  }
  var interpolateGoalposts = function(colorStart, colorEnd, steps) {
    var colorsInterpolated = [];
    var rIntv = Math.floor((colorEnd.r - colorStart.r) / (steps + 1));
    var gIntv = Math.floor((colorEnd.g - colorStart.g) / (steps + 1));
    var bIntv = Math.floor((colorEnd.b - colorStart.b) / (steps + 1));
    for (var i = 0; i < steps; i++) {
      var r =  colorStart.r + (rIntv * (i+1));
      var g =  colorStart.g + (gIntv * (i+1));
      var b =  colorStart.b + (bIntv * (i+1));
      r = (r > 255 ? 255: (r < 0 ? 0 : r));
      g = (g > 255 ? 255: (g < 0 ? 0 : g));
      b = (b > 255 ? 255: (b < 0 ? 0 : b));

      colorsInterpolated[i] = { 'r': r, 'g': g, 'b': b };
    }
    return colorsInterpolated;
  }

  this.init = function(goalposts) {

    if (typeof goalposts === 'undefined' || !goalposts instanceof Array) {
      goalposts = this.defaults.goalposts;
    }

    if (goalposts.length == 1) {
      goalposts[goalposts.length] = goalposts[0];
    }
    this.goalposts = translateColorsToRGB(goalposts);
  }
  this.getGoalposts = function() {
    return translateColorsToHex(this.goalposts);
  }

  this.interpolate = function(number_of_colors) {
    var colors = [];

    // dummycheck params
    if (typeof number_of_colors === 'undefined') {
      number_of_colors = this.goalposts.length;
    }

    // if the number of colors is less than the number of goalposts, return the
    // goalposts in order.
    if (number_of_colors <= this.goalposts.length) {
      for (var i = 0; i < number_of_colors; i++) {
        colors[i] = translateColorsToHex([this.goalposts[i]])[0];
      }
    }
    else {
      var currentIndex = 0;
      var goalposts = this.goalposts;
      var goalpostIndex = 0;
      if ((number_of_colors - goalposts.length) / 2 % 0) {
        var steps = Math.floor((number_of_colors - goalposts.length) / (goalposts.length - 1));
      }
      else {
        var steps = Math.ceil((number_of_colors - goalposts.length) / (goalposts.length - 1));
      }
      while (goalposts.length > 1) {
        colors[colors.length] = translateColorsToHex([goalposts[0]])[0];
        if (goalposts.length === 2) {
          steps = number_of_colors - (colors.length + 1);
        }
        if (goalposts.length > 1) {
          var gpStart = goalposts[0];
          var gpEnd = goalposts[1];
        }
        var colorsInterpolated = interpolateGoalposts(gpStart, gpEnd, steps);
        for (var i = 0; i < colorsInterpolated.length; i++) {
          colors[colors.length] = translateColorsToHex([colorsInterpolated[i]])[0];
        }
        goalposts.splice(0, 1);
      }
      colors[colors.length] = translateColorsToHex([goalposts[0]])[0];
    }
    return colors;
  }


  this.init(goalposts);
}
