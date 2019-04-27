import { describe } from 'riteway';
import render from 'riteway/render-component';
import React from 'react';

import GaugeComponent from '../src/gauge-component';
    
import reactDom from 'react-dom/server';


describe('GaugeComponent should render properly', async (assert) => {

  //let s = reactDom.renderToString(<GaugeComponent name="testgauge" measurement="5" />)
  //console.log(s)

  const createGauge = (name, measurement) =>
    render(<GaugeComponent name={name} measurement={measurement} />)

  const name = 'testgauge'
  const measurement = 5;
  const $ = createGauge(name,measurement);

    assert({
      given: 'a gauge component and measurement of 5',
      should: 'render correctly.',
      actual: $(`#${name}`)
        .html()
        .trim(),
      expected: ''
    });
});
