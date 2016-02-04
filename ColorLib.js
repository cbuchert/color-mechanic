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

	this.xyz = 
{		toLab: function(xyz) {
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

	this.lab = {
		// Returns the delta-e value between 2 Lab colors (how
		// similar the two colors are to the human eye).
		cie2000_deltaE: function(lab1, lab2) {
			var Lbar1 = (lab1.L + lab2.L) / 2,
				Csub1 = Math.sqrt(Math.pow(lab1.a, 2) + Math.pow(lab1.b, 2)),
				Csub2 = Math.sqrt(Math.pow(lab2.a, 2) + Math.pow(lab2.b, 2)),
				CBar = (Csub1 + Csub2) / 2,
				G = (1 - Math.sqrt(Math.pow(CBar, 7) / (Math.pow(CBar, 7) + Math.pow(25, 7)))) / 2,
				a1sub1 = lab1.a * (1 + G),
				a1sub2 = lab2.a * (1 + G),
				C1sub1 = Math.sqrt(Math.pow(a1sub1, 2) + Math.pow(lab1.b, 2)),
				C1sub2 = Math.sqrt(Math.pow(a1sub2, 2) + Math.pow(lab2.b, 2)),
				CBar1 = (C1sub1 + C1sub2) / 2,
				h1sub1 = 0.0,
				h1sub2 = 0.0,
				Hbar1 = 0.0,
				T = 0.0,
				deltah1 = 0.0,
				deltaL1 = 0.0,
				deltaC1 = 0.0,
				deltaH1 = 0.0,
				SsubL = 0.0,
				SsubC = 0.0,
				SsubH = 0.0,
				deltaTheta = 0.0,
				RsubC = 0.0,
				RsubT = 0.0,
				KsubL = 1,
				KsubC = 1,
				KsubH = 1,
				deltaE = 0;

			if (Math.atan2(lab1.b / a1sub1) >= 0) {
				h1sub1 = Math.atan2(lab1.b / a1sub1);
			} else if (Math.atan2(lab1.b / a1sub1) < 0) {
				h1sub1 = Math.atan2(lab1.b / a1sub1) + 360;
			}

			if (Math.atan2(lab2.b / a1sub2) >= 0) {
				h1sub2 = Math.atan2(lab2.b / a1sub2);
			} else if (Math.atan2(lab2.b / a1sub2) < 0) {
				h1sub2 = Math.atan2(lab2.b / a1sub2) + 360;
			}

			if (Math.abs(h1sub1 - h1sub2) > 180) {
				Hbar1 = (h1sub1 + h1sub2 + 360) / 2;
			} else if (Math.abs(h1sub1 - h1sub2) <= 180) {
				Hbar1 = (h1sub1 + h1sub2) / 2;
			}

			T = 1 - 0.17 * Math.cos(Hbar1 - 30) + 0.24 * Math.cos(2 * Hbar1) + 0.32 * Math.cos(3 * Hbar1 + 6) - 0.20 * Math.cos(4 * Hbar1 - 63);

			if (Math.abs(h1sub2 - h1sub1) <= 180) {
				deltah1 = h1sub2 - h1sub1;
			} else if ((Math.abs(h1sub2 - h1sub1) > 180) && (h1sub2 <= h1sub1)) {
				deltah1 = h1sub2 - h1sub1 + 360;
			} else if ((Math.abs(h1sub2 - h1sub1) > 180) && (h1sub2 > h1sub1)) {
				deltah1 = h1sub2 - h1sub1 - 360;
			}

			deltaL1 = lab2.L - lab1.L;

			deltaC1 = C1sub2 - C1sub1;

			deltaH1 = 2 * Math.sqrt(C1sub1 * C1sub2) * Math.sin(deltah1 / 2);

			SsubL = 1 + 0.015 * Math.pow(Lbar1 - 50, 2) / (Math.sqrt(20 + Math.pow(Lbar1 - 50, 2)));

			SsubC = 1 + 0.045 * CBar1;

			SsubH = 1 + 0.015 * CBar1 * T;

			deltaTheta = 30 * Math.exp(-1 * Math.pow((Hbar1 - 275) / 25, 2));

			RsubC = 2 * Math.sqrt(Math.pow(CBar1, 7) / (Math.pow(CBar1, 7) + Math.pow(25, 7)));

			RsubT = -1 * RsubC * Math.sin(2 * deltaTheta);

			deltaE = Math.sqrt(Math.pow(deltaL1 / (KsubL * SsubL, 2)) + Math.pow(deltaC1 / (KsubC * SsubC), 2) + Math.pow(deltaH1 / (KsubH * SsubH), 2) + RsubT * (deltaC1 / (KsubC * SsubC)) * (deltaH1 / (KsubH * SsubH)));


			console.log(Lbar1);
			console.log(Csub1);
			console.log(Csub2);
			console.log(CBar);
			console.log(G);
			console.log(a1sub1);
			console.log(a1sub2);
			console.log(C1sub1);
			console.log(C1sub2);
			console.log(CBar1);
			console.log(h1sub1);
			console.log(h1sub2);
			console.log(Hbar1);
			console.log(T);
			console.log(deltah1);
			console.log(deltaL1);
			console.log(deltaC1);
			console.log(deltaH1);
			console.log(SsubL);
			console.log(SsubC);
			console.log(SsubH);
			console.log(deltaTheta);
			console.log(RsubC);
			console.log(RsubT);
			console.log(KsubL);
			console.log(KsubC);
			console.log(KsubH);
			console.log(deltaE);


			return deltaE;
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