/**
* Chartist.js plugin to display an error bar at each data point or bar.
*
*/
/* global Chartist */
(function (window, document, Chartist) {
  'use strict';
  
	var defaultOptions = {
		confidenceLimit: {
			upper: [],
			lower: []
		}
	};

  Chartist.plugins = Chartist.plugins || {};
  Chartist.plugins.errorBars = function (options) {
	    
	options = Chartist.extend({}, defaultOptions, options);
	
	function addErrorBar(data){
		// Create a SVG line element that draws an error bar at the top of each bar / point
		var errorLine = new Chartist.Svg('line', { x1: data.hasOwnProperty('x1') ? [data.x1] : [data.x],
												   y1: [data.lcl],
												   x2: data.hasOwnProperty('x2') ? [data.x2] : [data.x],
												   y2: [data.ucl]
												   },
												   'ct-error');
		// With data.element we get the current SVG element - <line> 
		// We want to apply our new line to the parent element - <g>
		data.element.parent().append(errorLine);
	}	

	return function errorBars(chart){
		if(chart instanceof Chartist.Line){
			chart.on('draw', function(data) {
				// When the bar event is triggered from drawing a bar on the chart
				if (data.type === 'point'){
					// TODO
					// Add a cap to each error bar
					data.ucl = data.axisY.chartRect.y1 - Chartist.projectLength( data.axisY.axisLength, options.confidenceLimit.upper[data.seriesIndex][data.index], data.axisY.bounds ); 
					data.lcl = data.axisY.chartRect.y1 - Chartist.projectLength( data.axisY.axisLength, options.confidenceLimit.lower[data.seriesIndex][data.index], data.axisY.bounds );
					// Do not allow the error bar to drop below the axis
					if (data.lcl <= data.axisY.axisLength){
						addErrorBar(data);
					}
				}
			});	
		}
		else if(chart instanceof Chartist.Bar){
			chart.on('draw', function(data) {
				// When the bar event is triggered from drawing a bar on the chart
				if (data.type === 'bar'){
					// TODO
					// Add a cap to each error bar
					data.ucl = data.axisY.chartRect.y1 - Chartist.projectLength( data.axisY.axisLength, options.confidenceLimit.upper[data.seriesIndex][data.index], data.axisY.bounds );
					data.lcl = data.axisY.chartRect.y1 - Chartist.projectLength( data.axisY.axisLength, options.confidenceLimit.lower[data.seriesIndex][data.index], data.axisY.bounds );
					// Do not allow the error bar to drop below the axis
					if (data.lcl <= data.y1){
						addErrorBar(data);

					}
				}
			});	
		}
	}
  };
} (window, document, Chartist));