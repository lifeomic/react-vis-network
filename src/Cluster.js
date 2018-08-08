import Module from './Module';

export default class Cluster extends Module {
  updateCluster = () => {
    const {
      id,
      vis: { network }
    } = this.props;

    // Initial load, skip and wait for network
    if (!network) {
      return;
    }

    const config = this.getModuleOptions();

    if (network.isCluster(id)) {
      network.clustering.updateClusteredNode(id, config);
    } else {
      network.clustering.cluster({
        joinCondition(node) {
          return config.nodes.indexOf(node.id) > -1;
        },
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
    if (network.clustering && network.isCluster(id)) {
      network.openCluster(id);
    }
  }
}
