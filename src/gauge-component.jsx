import React, { useEffect, useState } from 'react';

import { format } from 'd3-format'
import { interpolateHsl}  from 'd3-interpolate'
import {pie, line, arc} from 'd3-shape'
import {select} from 'd3-selection'
import {rgb} from 'd3-color'
import {scaleLinear} from 'd3-scale'
import {range} from 'd3-array'
import {transition} from 'd3-transition'

const GaugeComponent =  ({ name,measurement, onClick }) => {

  const [theGauge, setGauge] = useState(null);
  let thegauge = theGauge
  let setup = () => {
	  if(!theGauge){
		thegauge = gauge(`#${name}`, {
			size: 300,
			clipWidth: 300,
			clipHeight: 300,
			ringWidth: 60,
			maxValue: 10,
			transitionMs: 2000,
		  });
		  thegauge.render();
		  setGauge(thegauge)
	  }
	  thegauge.update(measurement)
  }

  var gauge = function(container, configuration) {
	var that = {};
	var config = {
		size						: 200,
		clipWidth					: 200,
		clipHeight					: 110,
		ringInset					: 20,
		ringWidth					: 20,
		
		pointerWidth				: 10,
		pointerTailLength			: 5,
		pointerHeadLengthPercent	: 0.9,
		
		minValue					: 0,
		maxValue					: 10,
		
		minAngle					: -90,
		maxAngle					: 90,
		
		transitionMs				: 750,
		
		majorTicks					: 5,
		labelFormat					: format('0'),
		labelInset					: 10,
		
		arcColorFn					: interpolateHsl(rgb('#e8e2ca'), rgb('#3e6c0a'))
	};
	var rnge = undefined;
	var r = undefined;
	var pointerHeadLength = undefined;
	var value = 0;
	
	var svg = undefined;
	var anArc = undefined;
	var scale = undefined;
	var ticks = undefined;
	var tickData = undefined;
	var pointer = undefined;

	var donut = pie();
	
	function deg2rad(deg) {
		return deg * Math.PI / 180;
	}
	
	function newAngle(d) {
		var ratio = scale(d);
		var newAngle = config.minAngle + (ratio * rnge);
		return newAngle;
	}
	
	function configure(configuration) {
		var prop = undefined;
		for ( prop in configuration ) {
			config[prop] = configuration[prop];
		}
		
		rnge = config.maxAngle - config.minAngle;
		r = config.size / 2;
		pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

		// a linear scale that maps domain values to a percent from 0..1
		scale = scaleLinear()
			.range([0,1])
			.domain([config.minValue, config.maxValue]);
			
		ticks = scale.ticks(config.majorTicks);
		tickData = range(config.majorTicks).map(function() {return 1/config.majorTicks;});
		
		anArc = arc()
			.innerRadius(r - config.ringWidth - config.ringInset)
			.outerRadius(r - config.ringInset)
			.startAngle(function(d, i) {
				var ratio = d * i;
				return deg2rad(config.minAngle + (ratio * rnge));
			})
			.endAngle(function(d, i) {
				var ratio = d * (i+1);
				return deg2rad(config.minAngle + (ratio * rnge));
			});
	}
	that.configure = configure;
	
	function centerTranslation() {
		return 'translate('+r +','+ r +')';
	}
	
	function isRendered() {
		return (svg !== undefined);
	}
	that.isRendered = isRendered;
	
	function render(newValue) {
		svg = select(container)
			.append('svg:svg')
				.attr('class', 'gauge')
				.attr('width', config.clipWidth)
				.attr('height', config.clipHeight)
		
		var centerTx = centerTranslation();
		
		var arcs = svg.append('g')
				.attr('class', 'arc')
				.attr('transform', centerTx)
				.on('click', onClick)

		
		arcs.selectAll('path')
				.data(tickData)
			.enter().append('path')
				.attr('fill', function(d, i) {
					return config.arcColorFn(d * i);
				})
				.attr('d', anArc);
		
		var lg = svg.append('g')
				.attr('class', 'label')
				.attr('transform', centerTx);
		lg.selectAll('text')
				.data(ticks)
			.enter().append('text')
				.attr('transform', function(d) {
					var ratio = scale(d);
					var newAngle = config.minAngle + (ratio * rnge);
					return 'rotate(' +newAngle +') translate(0,' +(config.labelInset - r) +')';
				})
				.text(config.labelFormat);

		var lineData = [ [config.pointerWidth / 2, 0], 
						[0, -pointerHeadLength],
						[-(config.pointerWidth / 2), 0],
						[0, config.pointerTailLength],
						[config.pointerWidth / 2, 0] ];
    var pointerLine = line()
      //.curve();
		var pg = svg.append('g').data([lineData])
				.attr('class', 'pointer')
				.attr('transform', centerTx);
				
		pointer = pg.append('path')
			.attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/ )
			.attr('transform', 'rotate(' +config.minAngle +')');
			
		update(newValue === undefined ? 0 : newValue);
	}
	that.render = render;
	
	function update(newValue, newConfiguration) {
		if ( newConfiguration  !== undefined) {
			configure(newConfiguration);
		}
		var ratio = scale(newValue);
		var newAngle = config.minAngle + (ratio * rnge);
		
		pointer
		.transition()
			.duration(config.transitionMs)
			//.ease('elastic')
		.attr('transform', 'rotate(' +newAngle +')');
		
	}
	that.update = update;

	configure(configuration);
	
	return that;
  };

  useEffect(setup)
  
  return <div id={name}></div>
}



export default GaugeComponent

