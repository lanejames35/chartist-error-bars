/**
 * 
 */
 /**
* Chartist.js plugin to display a data label on top of the points in a line chart.
*
*/
/* global Chartist */
(function (window, document, Chartist) {
  'use strict';

  Chartist.plugins = Chartist.plugins || {};
  Chartist.plugins.errorBars = function () {
	  
	function addErrorBar(upper, lower){
		// Create a SVG line element that draws an error bar at the top of each bar
		var errorLine = new Chartist.Svg('line', { x1: [data.x1], y1: [lower], x2: [data.x2], y2: [upper] }, 'ct-error');
		// With data.element we get the current SVG element - <line> 
		// We want to apply our new line to the parent element - <g>
		data.element.parent().append(errorLine);
	}  

	return function errorBars(chart){
		switch (chart.constructor.name){
			case 'Line':
				chart.on('draw', function(data) {
					// When the bar event is triggered from drawing a bar on the chart
					if (data.type === 'point'){
						// TODO
						// Check for values that are zero or undefined
						// Test this implementation with different scenarios
						// Add a cap to each error bar
						// Make margin of error variable
						var lcl = data.y2 + 10;
						var	ucl = data.y2 - 10;
						// Do not allow the error bar to drop below the axis
						if (lcl < data.y1){
							addErrorBar(ucl, lcl);
						}
					}
				});	
			case 'Bar':
				chart.on('draw', function(data) {
					// When the bar event is triggered from drawing a bar on the chart
					if (data.type === 'bar'){
						// TODO
						// Check for values that are zero or undefined
						// Test this implementation with different scenarios
						// Add a cap to each error bar
						// Make margin of error variable
						var lcl = data.y2 + 10;
						var	ucl = data.y2 - 10;
						// Do not allow the error bar to drop below the axis
						if (lcl < data.y1){
							addErrorBar(ucl, lcl);
						}
					}
				});	
		}
	}
  };
} (window, document, Chartist));