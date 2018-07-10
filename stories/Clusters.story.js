import React from 'react';
import { storiesOf } from '@storybook/react';
import graphData from './fixtures/graphData';
import { Network, Edge, Node, ClusterByConnection } from '../src';
import UserIcon from 'react-feather/dist/icons/user';
import UsersIcon from 'react-feather/dist/icons/users';
import CustomIcon from './components/CustomIcon';

const style = { height: '90vh', width: '90vw' };

const networkProps = {
  style,
  options: {
    layout: {
      randomSeed: 42
    }
  }
};

storiesOf('Clustering', module).add('By Connection', () => (
  <Network {...networkProps}>
    {graphData.nodes.map(node => (
      <Node key={node.id} {...node} icon={UserIcon} component={CustomIcon} />
    ))}
    {graphData.edges.map(edge => <Edge key={edge.id} {...edge} />)}
    <ClusterByConnection
      id={'cluster:1'}
      rootNodeId={0}
      label={'0 Cluster'}
      color={'red'}
      icon={UsersIcon}
      component={CustomIcon}
    />
    <ClusterByConnection
      id={'cluster:2'}
      rootNodeId={15}
      label={'15 Cluster'}
      color={'red'}
      icon={UsersIcon}
      component={CustomIcon}
    />
  </Network>
));
