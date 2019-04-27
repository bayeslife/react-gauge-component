import React from 'react';
import { render} from 'react-dom';

import ContainerComponent from '../../src';

const App = () => (
    <ContainerComponent name="testgauge" measurement="5"/>
);
render(<App />, document.getElementById("root"));