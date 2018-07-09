import Module from './Module';

export default class VisNode extends Module {
  componentDidMount() {
    super.componentDidMount();

    const {
      vis: { nodes }
    } = this.props;
    const config = this.getModuleOptions();

    nodes.add(config);
  }

  componentDidUpdate() {
    super.componentDidUpdate();

    const {
      vis: { nodes }
    } = this.props;
    const config = this.getModuleOptions();

    nodes.update(config);
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    const {
      vis: { nodes },
      id
    } = this.props;

    nodes.remove(id);
  }
}
