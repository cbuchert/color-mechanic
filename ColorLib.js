var ColorLib = function() {
	// Set the bit color depth.
	var bitColorDepth = 8;

	// Set the divisor as per the bitColorDepth.
	var bitColorDepthDivisor = Math.pow(2, bitColorDepth) - 1;

	this.rgb = {
		// Separate hex rgb values and convert to base 10.
		toBase10: function(rgb) {
			// Remove any leading pound signs.
			if (rgb.substring(0, 1) === '#') {
				rgb = rgb.substring(1);
			}

			// Make sure the rgb value is the correct length.
			if (rgb.length != 6) {
				console.log(rgb + ' is not a valid rgb value.');
			}

			else {
				return {
					r: parseInt(rgb.substring(0, 2), 16),
					g: parseInt(rgb.substring(2, 4), 16),
					b: parseInt(rgb.substring(4), 16)
				};
			}
		},


		// rgb to hsb
		toHSV: function(rgb) {
			// Convert rgb values from integers up to the bitColorDepthDivisor to
			// percentages between 0 and 1.
			
			// Convert the hex rgb value to our usable format.
			rgb = this.toBase10(rgb);
			
			rgb.r = rgb.r / bitColorDepthDivisor;
			rgb.g = rgb.g / bitColorDepthDivisor;
			rgb.b = rgb.b / bitColorDepthDivisor;

			var cMax = Math.max(rgb.r, rgb.g, rgb.b),
				cMin = Math.min(rgb.r, rgb.g, rgb.b),
				delta = cMax - cMin,
				h = 0,
				s = 0.0,
				v = 0.0;

			// Calculate the hue.
			// Make sure that we won't be dividing by zero at any time...
			if (rgb.r != rgb.g || rgb.r != rgb.b) {
				switch(cMax) {
					case 0:
						h = 0;
						break;

					case rgb.r:
						h = (rgb.g - rgb.b) / delta;
						break;

					case rgb.g:
						h = ((rgb.b - rgb.r) / delta) + 2;
						break;
						
					case rgb.b:
						h = ((rgb.r - rgb.g) / delta) + 4;
						break;
				}
			}

			// Convert hue to degrees.
			h *= 60;

			// Make sure that the hue isn't negative.
			if (h < 0) {
				h += 360;
			}

			// Calculate the saturation.
			if (delta != 0) {
				s = delta / cMax;
			}

			// Calculate the value.
			v = cMax;

			return {
				h: h,
				s: s,
				v: v
			};
		},

		// rgb to hsl
		toHSL: function(rgb) {

		},

		// rgb to cmyk
		toCMYK: function(rgb) {

		},

		// rgb to cl
		toCL: function(rgb) {

		},

		toXYZ: function(rgb) {
			rgb = this.toBase10(rgb);

			var r = rgb.r / bitColorDepthDivisor;
			var g = rgb.g / bitColorDepthDivisor;
			var b = rgb.b / bitColorDepthDivisor;

			if (r > 0.04045) {
				r = Math.pow(((r + 0.055) / 1.055), 2.4);
			} else {
				r = r / 12.92;
			}

			if (g > 0.04045) {
				g = Math.pow(((g + 0.055) / 1.055), 2.4);
			} else {
				g = g / 12.92;
			}

			if (b > 0.04045) {
				b = Math.pow(((b + 0.055) / 1.055), 2.4);
			} else {
				b = b / 12.92;
			}

			r = r * 100;
			g = g * 100;
			b = b * 100;

			return {
				x: r * 0.4124 + g * 0.3576 + b * 0.1805,
				y: r * 0.2126 + g * 0.7152 + b * 0.0722,
				z: r * 0.0193 + g * 0.1192 + b * 0.9505
			};
		}
	};

	this.xyz = {
		toLab: function(xyz) {
			var x = xyz.x / 95.047;
			var y = xyz.y / 100;
			var z = xyz.z / 108.883;

			if (x > 0.008856) {
				x = Math.pow(x, (1 / 3));
			} else {
				x = (x * 7.787) + (16 / 116);
			}
			if (y > 0.008856) {
				y = Math.pow(y, (1 / 3));
			} else {
				y = (y * 7.787) + (16 / 116);
			}
			if (z > 0.008856) {
				z = Math.pow(z, (1 / 3));
			} else {
				z = (z * 7.787) + (16 / 116);
			}

			return {
				L: (y * 116) - 16,
				a: (x - y) * 500,
				b: (y - z) * 200
			};
		}
	},

	this.hsv = {
		toRGB: function(hsv) {
			var chroma = hsv.v * hsv.s,
				x = chroma * (1 - Math.abs(((hsv.h / 60) % 2) - 1)),
				m = hsv.v - chroma,
				r = 0,
				g = 0,
				b = 0;

			if (0 <= hsv.h && hsv.h < 60) {
				r = chroma;
				g = x;
				b = 0
			} else if (60 <= hsv.h && hsv.h < 120) {
				r = x;
				g = chroma;
				b = 0;
			} else if (120 <= hsv.h && hsv.h < 180) {
				r = 0;
				g = chroma;
				b = x;
			} else if (180 <= hsv.h && hsv.h < 240) {
				r = 0;
				g = x;
				b = chroma;
			} else if (240 <= hsv.h && hsv.h < 300) {
				r = x;
				g = 0;
				b = chroma;
			} else if (300 <= hsv.h && hsv.h < 360) {
				r = chroma;
				g = 0;
				b = x
			}

			r = Math.ceil((r + m) * 255);
			g = Math.ceil((g + m) * 255);
			b = Math.ceil((b + m) * 255);

			return {
				r: r,
				g: g,
				b: b,
				hex: r.toString(16) + g.toString(16) + b.toString(16)
			};
		}
	};

	this.hsl = {
		toRGB: function(hsl) {
			var chroma = (1 - Math.abs(2 * hsl.l - 1) * hsl.s),
				x = chroma * (1 - Math.abs(hsl.h / 60) % 2 - 1),
				m = hsl.l - chroma / 2,
				r = 0,
				g = 0,
				b = 0;

			if (0 <= hsv.h && hsv.h < 60) {
				r = chroma;
				g = x;
				b = 0
			} else if (60 <= hsv.h && hsv.h < 120) {
				r = x;
				g = chroma;
				b = 0;
			} else if (120 <= hsv.h && hsv.h < 180) {
				r = 0;
				g = chroma;
				b = x;
			} else if (180 <= hsv.h && hsv.h < 240) {
				r = 0;
				g = x;
				b = chroma;
			} else if (240 <= hsv.h && hsv.h < 300) {
				r = x;
				g = 0;
				b = chroma;
			} else if (300 <= hsv.h && hsv.h < 360) {
				r = chroma;
				g = 0;
				b = x
			}

			r = Math.ceil((r + m) * 255);
			g = Math.ceil((g + m) * 255);
			b = Math.ceil((b + m) * 255);

			return {
				r: r,
				g: g,
				b: b,
				hex: r.toString(16) + g.toString(16) + b.toString(16)
			};
		}
	};
};