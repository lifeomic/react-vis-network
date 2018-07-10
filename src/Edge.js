import Module from './Module';

export default class VisEdge extends Module {
  updateDecorator() {
    // Edges don't support decorators, override super class
  }

  componentDidMount() {
    super.componentDidMount();

    const {
      vis: { edges }
    } = this.props;
    const config = this.getModuleOptions();

    edges.add(config);
  }

  componentDidUpdate() {
    super.componentDidUpdate();

    const {
      vis: { edges }
    } = this.props;
    const config = this.getModuleOptions();

    edges.update(config);
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    const {
      vis: { edges },
      id
    } = this.props;

    edges.remove(id);
  }
}
