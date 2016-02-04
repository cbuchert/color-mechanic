var clib = new ColorLib;

$(document).ready(function(){
	$('#cie2000_deltaE').click(function(){
		var color1 = $('#color1').val(),
			color2 = $('#color2').val();

		// RGB to XYZ
		color1 = clib.rgb.toXYZ(color1);
		color2 = clib.rgb.toXYZ(color2);

		// XYZ to Lab
		color1 = clib.xyz.toLab(color1);
		color2 = clib.xyz.toLab(color2);

		console.log(clib.lab.cie2000_deltaE(color1, color2));
	});

});