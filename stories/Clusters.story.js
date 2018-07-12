import React from 'react';
import { storiesOf } from '@storybook/react';
import leMisData from './fixtures/leMiserables';
import { Network, Edge, Node, ClusterByConnection } from '../src';
import UserIcon from 'react-feather/dist/icons/user';
import UsersIcon from 'react-feather/dist/icons/users';
import CustomIcon from './components/CustomIcon';

const style = { height: '90vh', width: '90vw' };

storiesOf('Clustering', module).add('By Connection', () => (
  <Network style={style}>
    {leMisData.nodes.map(node => (
      <Node key={node.id} {...node} icon={UserIcon} component={CustomIcon} />
    ))}
    {leMisData.edges.map(edge => <Edge key={edge.id} {...edge} />)}
    {
      // This cluster is hidden under the Valjean Cluster, order matters.
      // clusters are applied top to bottom
    }
    <ClusterByConnection
      id={'cluster:2'}
      rootNodeId={'node:57'}
      label={'Mabeuf Cluster'}
      color={'red'}
      icon={UsersIcon}
      component={CustomIcon}
    />
    <ClusterByConnection
      id={'cluster:1'}
      rootNodeId={'node:11'}
      label={'Valjean Cluster'}
      color={'red'}
      icon={UsersIcon}
      component={CustomIcon}
    />
  </Network>
));
