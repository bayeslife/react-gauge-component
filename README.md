# react-gauge-component React UI Component    

## When to use this component

Use this when the application needs to display a single axis measurement such as Dig Rate, Truck Load Time. 

## About this component
This project is intended to publish a react component library project to npm along with an example to github pages. 

It has unit test for the component based on [this](https://medium.com/javascript-scene/unit-testing-react-components-aeda9a44aae2)

## D3 usage 

This component uses D3 to render the gauge.

[This page](https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71) was a helpful reference in creating this component and describes a couple approaches to integrating D3 and React which are in some wasy inconsistent.

This implementation keeps the rendering of the gauge in D3 while React simply established the element which is passed to D3 as a reference 

## How to use

```
npm install
```

### To Develop

Develop the component by running the server
```
npm run start
```

### To Build

This builds the artefact which can be published to npm
```
npm run build
```

### To Test

This test the components by rendering them can checking generated dom.
```
npm run test
```

### To Deploy
This deploys the artefact to git hubs page.
```
npm run deploy
```