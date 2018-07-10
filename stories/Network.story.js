import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import graphData from './fixtures/graphData';
import { Network, Edge, Node } from '../src';
import UserIcon from 'react-feather/dist/icons/user';
import XCircleIcon from 'react-feather/dist/icons/x-circle';
import CustomIcon from './components/CustomIcon';

const decoratorStyles = {
  border: 'solid 1px #2B7CE9',
  color: 'white',
  borderRadius: 2,
  backgroundColor: '#5596ed'
};

const Decorator = props => {
  return (
    <button
      style={decoratorStyles}
      onClick={action(`${props.id} decorator clicked`)}
    >
      Click Me
    </button>
  );
};

Decorator.propTypes = {
  id: PropTypes.string
};

const style = { height: '90vh', width: '90vw' };
const networkProps = {
  style,
  options: {
    layout: {
      randomSeed: 42
    }
  }
};

storiesOf('Network', module)
  .add('Basic setup', () => (
    <Network {...networkProps}>
      {graphData.nodes.map(node => <Node key={node.id} {...node} />)}
      {graphData.edges.map(edge => <Edge key={edge.id} {...edge} />)}
    </Network>
  ))
  .add('Custom SVG Component', () => (
    <Network {...networkProps}>
      {graphData.nodes.map(node => (
        <Node key={node.id} {...node} icon={UserIcon} component={CustomIcon} />
      ))}
      {graphData.edges.map(edge => <Edge key={edge.id} {...edge} />)}
    </Network>
  ))
  .add('Node decorators', () => (
    <Network {...networkProps}>
      {graphData.nodes.map(node => (
        <Node
          key={node.id}
          {...node}
          icon={XCircleIcon}
          component={CustomIcon}
          decorator={Decorator}
        />
      ))}
      {graphData.edges.map(edge => <Edge key={edge.id} {...edge} />)}
    </Network>
  ));
