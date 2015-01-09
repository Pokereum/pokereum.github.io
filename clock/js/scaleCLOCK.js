function scaleCoordinates(delta) {
	//                        X   Y  R                       
	//1) area circle coords="849,341,5"
	//    $('#ContentPlaceHolder1_graphImageMap :area[shape="circle"]').each(function () {
	//         var coords = $(this).attr('coords').split(',');
	//     });
	//                           0  1     2  3     4  5     6  7
	//                      X1 Y1    X2 Y2    X3 Y3    X4 Y4
	//2) area poly coords="720,339, 752,339, 752,343, 720,343"
	if (delta != 0) {
		$('#ContentPlaceHolder1_graphImageMap area[shape="circle"]').each(function () {
			var coords = $(this).attr('coords').split(',');
			if (coords.length == 3) {
				coords[0] = +coords[0] + Math.round((delta * coords[0]) / 900);
			//    coords[2] = '7';
			}
			else if (coords.length == 4) {
			//    coords[0] = +coords[0] + delta;
				//    coords[2] = +coords[2] + delta;

			}
			else if (coords.length == 8) {
			//    coords[0] = +coords[0] + delta;
			//    coords[2] = +coords[2] + delta;
			//    coords[4] = +coords[4] + delta;
			//    coords[6] = +coords[6] + delta;
			}

			var newcoords = '';
			for (var i = 0; i < coords.length; i++) {
				newcoords += coords[i] + ',';
			}
			//coords[0] + ',' + coords[1] + ',' + coords[3];
			newcoords = newcoords.substr(0, newcoords.length - 1);
			$(this).attr('coords', newcoords);
		});
	}
}


$(document).ready(function () {		
	$('#ContentPlaceHolder1_graphImageMap area[shape="poly"]').remove();
	var delta = 0;
	var curWidth = $('#ContentPlaceHolder1_graph').width();
	if (curWidth != null) {
		delta = curWidth - 900;
		scaleCoordinates(delta);
	}
	
	$('#ContentPlaceHolder1_graph').resize(function () {
		if ($(this).width() != curWidth) {
			delta = +($(this).width()) - curWidth;
			curWidth = $(this).width();
			//  console.log(width);
			scaleCoordinates(delta);
			//    console.log('width = ' + $(this).width() + ' | delta = ' + delta);
		}
    });
	
});