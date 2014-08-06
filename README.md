Pass an array of hexidecimal RGB color values to the object, and the object will use those colors as goalposts and return an array of interpolated colors.

ci = new ColorInterpolator(['f00', '0f0', '000', 'ff0']);
colors = ci.interpolate(20);
