let MEASUREMENT_ACTION = 'gauge/measurement' 

const measurementAction = (measurementvalue) => ({
    measurement: measurementvalue,
    type: MEASUREMENT_ACTION,
})

const reducer = (state = 0, { type, measurement } = {}) => {
    switch (type) {
        case MEASUREMENT_ACTION: {
            state = Date.now() % 10
            return state
        }
        default: return state;
    }
}

export { reducer, measurementAction };
