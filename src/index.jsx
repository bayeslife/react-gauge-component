import React, { useReducer } from 'react';

import GaugeComponent from './gauge-component';
import { measurementAction,reducer } from './gauge-reducer';

const ContainerComponent = ( { name, measurement}) => {
  const [currentmeasurement, dispatch] = useReducer(reducer, parseInt(measurement));
  return <GaugeComponent
    name={name}
    measurement={currentmeasurement}
    onClick={() => dispatch(measurementAction(currentmeasurement))}
  />
}

export default ContainerComponent
