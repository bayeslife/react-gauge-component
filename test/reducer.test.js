import { describe } from 'riteway';
import { reducer, measurement } from '../src/gauge-reducer';

describe('gauge reducer', async assert => {

        assert({
            given: 'no arguments',
            should: 'return the valid initial state',
            actual: reducer(),
            expected: 0
        });

        // assert({
        //     given: 'initial state and a click action',
        //     should: 'return zero',
        //     actual: reducer(undefined, measurement(5)),
        //     expected: 5
        // });
        // assert({
        //     given: 'a some initial state',
        //     should: 'return that state',
        //     actual: reducer(3, measurement(5)),
        //     expected: 5
        // });

});