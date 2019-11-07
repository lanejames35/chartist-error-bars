# Error Bar plugin for Chartist.js
A simple plugin that draws an error bar on top of a Chartist.js chart.

This plugin works with both bar charts (`Chartist.Bar`) and line charts (`Chartist.Line`).

# Available options and their defaults
```javascript
var defaultOptions = {
  errorClass: 'ct-error',
  orientation: 'horizontal', // or 'vertical', only applies to bar charts
  confidenceLimit: {
	upper: [], 
	lower: []
	}
 };
```

# Example with Chartist.js
```javascript
var chart = new Chartist.Bar('.ct-chart', {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  series: [
	[5, 2, 4, 2, 0],
	[7, 4, 6, 1, null]
  ]}, {
  plugins: [ 
	Chartist.plugins.errorBars({
      errorClass: 'ct-error',
      orientation: 'horizontal',
	  confidenceLimit: { 
	  upper: [
	    [6,3,5,3,0],
		[8,5,7,1.5,0]
	  ],
	  lower: [
		[4,1,3,1,0],
		[6,3,5,0.5,0]
	  ]}
	})
  ]
});	
```
