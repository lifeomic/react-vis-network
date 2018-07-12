# React Vis Network

[![Build Status](https://travis-ci.org/lifeomic/react-vis-network.svg?branch=master)](https://travis-ci.org/lifeomic/react-vis-network)

## Overview

react-vis-network uses a declarative approach to defining [vis.js](https://github.com/almende/vis) networks. This allows developers to work in React using normal stateful approaches like [Redux](https://github.com/reduxjs/redux) and have the underlying network chart manage it's own lifecycle.

## Example

```js
import React, { Component } from 'react';
import { Network, Node, Edge } from 'react-vis-network';

class MyNetwork extends Component {
  render() {
    return (
      <Network>
        <Node id="vader" label="Darth Vader" />
        <Node id="luke" label="Luke Skywalker" />
        <Node id="leia" label="Leia Organa" />
        <Edge id="1" from="vader" to="luke" />
        <Edge id="2" from="vader" to="leia" />
      </Network>
    );
  }
}
```

## API

### < Network />

`<Network />` is the top level component that defines your network. All `Node`s, `Edge`s and `Cluster*` components need to be inside a `Network` to work properly.

#### Props

`options`: Object of [vis options](http://visjs.org/docs/network/#options) to configure the look and feel, physics, and interaction patterns in the graph. All options are passed directly to vis and can be overriden on a case by case bases by setting individual options on each `Node` or `Edge`

`scale`: [Zoom scale](http://visjs.org/docs/network/#event_zoom) of the network. Defined as a number from 0-1 where 1 is 100% zoomed and 0 is zoomed out infinitely. As returned from `network.getScale`.

`position`: Object (`{ x, y }`) containing coordinates of the central focus point. As returned from `network.getViewPosition`.

`style`/`className`: Normal style and className props to enable styling the network's wrapping element. **NB:** Overidding `position: relative` and `overflow: hidden` will result in wonky node `decorator` behavior.

### < Node />

A `Node` represents a vis.js [network node](http://visjs.org/docs/network/nodes.html). As props, a `Node` accepts [all options](http://visjs.org/docs/network/nodes.html#optionTable) accepted in normal configuration. It also accepts two special props `component` and `decorator`.

`component`: SVG element to be rendered as the Node in the Network. `component` is a [render prop](https://reactjs.org/docs/render-props.html) recieves all of the props passed to `Node` and returns a <svg> react component. The svg will be rendered as the `image` of the node. Helpful tip, you can pass additional props to `node` that can be used in your render prop to dynamically change your image.

```js
const CustomIcon = ({ icon, color = '#5596ed' }) => {
  const viewBox = 36;
  const iconSize = 20;
  const pad = (viewBox - iconSize) / 2;
  const center = viewBox / 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBox} ${viewBox}`}
    >
      <g>
        <circle cx={center} cy={center} r={16} fill={color} />
        <g transform={`translate(${pad}, ${pad})`}>
          {React.createElement(icon, { color: 'white', size: iconSize })}
        </g>
      </g>
    </svg>
  );
};

// Use your render prop and custom props passed to `Node` to
// Generate differnt icons per node
const MyNetwork = () => (
  <Network>
    <Node
      id="vader"
      label="Darth Vader"
      component={CustomIcon}
      color="black"
      icon={Sith}
    />
    <Node
      id="luke"
      label="Luke Skywalker"
      component={CustomIcon}
      color="white"
      icon={Jedi}
    />
    <Node
      id="leia"
      label="Leia Organa"
      component={CustomIcon}
      color="gold"
      icon={Princess}
    />
    <Edge id="1" from="vader" to="luke" />
    <Edge id="2" from="vader" to="leia" />
  </Network>
);
```

**NB:** This is simply syntactic sugar over [using HTML in Nodes](https://github.com/almende/vis/blob/master/examples/network/nodeStyles/HTMLInNodes.html) and will end up being a data+image. You will not recieve dom events through this component, use `Network`'s event system or `decorator`s instead.

`decorator`: A react element positioned at the top center of rendered `Node`. A decorator is similar to `component` in that it's a [render prop](https://reactjs.org/docs/render-props.html) that recieves the props of a the node, and returns a react element. This element however doesn't need to be an svg.

```js
const Decorator = props => {
  return (
    <button
      style={decoratorStyles}
      onClick={() => console.log(`You clicked ${props.label}`}
    >
      Click Me
    </button>
  );
};

// Use your render prop and custom props passed to `Node` to
// cause differnet actions in your Decorator
const MyNetwork = () => (
  <Network>
    <Node id='vader' label='Darth Vader' decorator={Decorator} />
    <Node id='luke' label='Luke Skywalker' decorator={Decorator} />
    <Node id='leia' label='Leia Organa' decorator={Decorator} />
    <Edge id='1' from='vader' to='luke' />
    <Edge id='1' from='vader' to='leia' />
  </Network>
);
```

**NB:** Because this is a positioned HTML element, it can recieve DOM events like `click` and `input`. While fairly performant in positioning and rendering, it can be straining if many nodes have decorators and should be used sparingly. For static (non-interactable) content, it would be better to use a `component` with a changing prop to re-render it.

### < Edge />

An `Edge` represents a [vis.js edge](http://visjs.org/docs/network/edges.html) and connects nodes together.

Edges accept all of the [options](http://visjs.org/docs/network/edges.html#optionTable) vis exposes for edges as props. One specific note, vis doesn't require that edges have an `id`, react-vis-network does in order to keep the network updated.

### < ClusterByConnection />

A `ClusterByConnection` is a representation of a [vis.js cluster](http://visjs.org/docs/network/#methodClustering). This particular cluster implementation collapses all nodes around, and including, it's `rootNodeId` into a cluster.

`ClusterByConnection` takes all props that `Node` does including `component` and `decorator`.

`rootNodeId`: `id` of a `Node` for which to cluster around.

### Performance Considerations

All exported components are [Pure Components](https://reactjs.org/docs/react-api.html#reactpurecomponent). It's important to not define anonymous functions and objects inside the render function as it will cause unnecessary re-renders.

```js
// bad, re-renders every time
render () {
  return <Node component={() => <SomeIcon />} />
}

// good, only re-renders when other props change
renderSomeIcon = () => <SomeIcon />

render () {
  return <Node component={this.renderSomeIcon} />
}
```

Use `decorators` on `Node`s sparingly, if you can do it in the `component` you should.

### Extending, custom clusters, and custom modules

> ⚠️ Advanced topics, here be dragons.

Want to write a custom Cluster component? Want to add a bit to the lifecycle of a node?

The base of `Node`s and `Cluster`s is a `Module`. Take a peak at the [source](https://github.com/lifeomic/react-vis-network/blob/master/src/Module.js) and create your own class that extends the Module (if you want `decorator` and `compoment` support anyway) and use it.

The design of each component is to manage it's lifecycle inside the vis network with react lifecycle methods. Every `child` inside a `Network` is passed as props a `network` (vis.Network), `edges` (vis.Dataset) and `nodes` (vis.Dataset).

#### Helpers

In order to help you roll your own lifecycle methods, the internal converter for `component` and `decorator` is exposed as `reactToSvgImageUrl`.

`reactToSvgImageUrl (element) -> String`: Accepts a JSX element and returns it rendered as a data:image string.

### Accessing the underlying vis `network`

> ⚠️ This is an escape hatch, if you find yourself needing to do this, it's likely that the package authors simply haven't thought of your use-case. We would like to! Please open an issue and we can work to build a supported solution.

The `Network` component has, as instance properties, `network` (a vis.js network), `edges` (a vis.js Dataset representing it's edges), and `nodes` a vis.js Dataset representing it's nodes).

You can access these by [creating a `ref`](https://reactjs.org/docs/react-api.html#reactcreateref) to the mounted `Network`.
