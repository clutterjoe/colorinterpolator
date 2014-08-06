## Color Interpolator

Pass an array of hexidecimal RGB color values to the ColorInterpolator, and it will use those colors as goalposts and return an array of interpolated colors between them.

ci = new ColorInterpolator(['#f00', '#ccdd43', 0f0', '000', '#ff0']);

colors = ci.interpolate(20);
