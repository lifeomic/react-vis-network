import Module from './Module';

export default class ClusterByConnection extends Module {
  updateCluster = () => {
    const {
      id,
      rootNodeId,
      vis: { network }
    } = this.props;

    // Initial load, skip and wait for network
    if (!network) {
      return;
    }

    const config = this.getModuleOptions();

    if (network.findNode(id).length > 0) {
      network.clustering.updateClusteredNode(id, config);
    } else {
      network.clusterByConnection(rootNodeId, {
        clusterNodeProperties: config
      });
    }
  };

  componentDidMount() {
    super.componentDidMount();

    this.updateCluster();
  }

  componentDidUpdate() {
    super.componentDidUpdate();

    this.updateCluster();
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    const {
      id,
      vis: { network }
    } = this.props;

    // Storybook HMR is a bit weird and this prevents strange errors
    if (network.clustering) {
      network.openCluster(id);
    }
  }
}
