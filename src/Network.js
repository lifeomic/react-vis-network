import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { DataSet, Network } from 'vis/dist/vis-network.min';

const defaultStyles = {
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden'
};

const eventPattern = /^on([A-Z])(.*)$/;

export default class VisNetwork extends PureComponent {
  visContainerRef = createRef();

  edges = new DataSet([]);
  nodes = new DataSet([]);

  state = {
    edges: this.edges,
    nodes: this.nodes
  };

  componentDidMount() {
    const { options } = this.props;

    this.network = new Network(
      this.visContainerRef.current,
      {
        edges: this.edges,
        nodes: this.nodes
      },
      options
    );

    Object.keys(this.props)
      .filter(prop => prop.match(eventPattern))
      .forEach(prop => {
        const event = prop.replace(
          eventPattern,
          (match, p1, rest) => p1.toLowerCase() + rest
        );

        // Props controlled by developer
        // eslint-disable-next-line security/detect-object-injection
        this.network.on(event, this.props[prop]);
      });

    this.setState({
      network: this.network
    });
  }

  componentWillUnmount() {
    this.network.destroy();
  }

  componentDidUpdate(prevProps) {
    const { options, scale, position } = this.props;
    const network = this.network;

    network.setOptions(options);

    if (scale !== prevProps.scale || position !== prevProps.position) {
      network.moveTo({
        scale: scale || network.getScale(),
        position: position || network.getViewPosition()
      });
    }
  }

  render() {
    const { style, children } = this.props;

    const appliedStyles = {
      ...defaultStyles,
      ...style
    };

    const extendedChildren = React.Children.map(children, child =>
      React.cloneElement(child, {
        vis: this.state
      })
    );

    return (
      <>
        <div
          ref={this.visContainerRef}
          className={this.props.className}
          style={appliedStyles}
        >
          {extendedChildren}
        </div>
      </>
    );
  }

  static defaultProps = {
    options: {},
    style: {}
  };

  static propTypes = {
    children: PropTypes.node,
    options: PropTypes.object,
    scale: PropTypes.number,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    style: PropTypes.object,
    className: PropTypes.string
  };
}
