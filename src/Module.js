import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RafDebouncer from '../util/RafDebouncer';
import { reactToSvgImageUrl } from './util';

const style = {
  position: 'absolute',
  top: 0,
  left: 0
};

export default class VisModule extends PureComponent {
  decoratorRef = React.createRef();
  drawDebouncer = new RafDebouncer();
  hasAfterDrawingListener = false;

  updateNetwork = () => {
    const {
      decorator,
      vis: { network }
    } = this.props;

    if (!this.hasAfterDrawingListener && decorator) {
      this.hasAfterDrawingListener = true;
      network.on('afterDrawing', this.moveDecorator);
    }

    if (this.hasAfterDrawingListener && !decorator) {
      network.off('afterDrawing', this.moveDecorator);
      this.hasAfterDrawingListener = false;
    }

    if (this.hasAfterDrawingListener) {
      this.moveDecorator();
    }
  };

  moveDecorator = () =>
    this.drawDebouncer.requestAnimationFrame(() => {
      const {
        id,
        vis: { network }
      } = this.props;

      if (network && this.decoratorRef.current) {
        const boundingBox = network.getBoundingBox(id);
        const networkPositions = network.getPositions([id]);

        // Injection from same source
        /* eslint-disable security/detect-object-injection */
        if (networkPositions && networkPositions[id]) {
          const contextPos = { x: networkPositions[id].x, y: boundingBox.top };
          const { x, y } = network.canvasToDOM(contextPos);

          this.decoratorRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
        /* eslint-enable security/detect-object-injection */
      }
    });

  updateDecoratorListener = () => {
    const {
      vis: { network },
      decorator
    } = this.props;

    // Initial load, skip
    if (!network) {
      return;
    }

    if (!this.hasAfterDrawingListener && decorator) {
      this.hasAfterDrawingListener = true;
      network.on('afterDrawing', this.moveDecorator);
    }

    if (this.hasAfterDrawingListener && !decorator) {
      network.off('afterDrawing', this.moveDecorator);
      this.hasAfterDrawingListener = false;
    }

    if (this.hasAfterDrawingListener) {
      this.moveDecorator();
    }
  };

  getModuleOptions() {
    const { component, ...entityOptions } = this.props;
    const options = { ...entityOptions };

    if (component) {
      options.image = reactToSvgImageUrl(component(this.props));
      options.shape = 'image';
    }

    return options;
  }

  componentDidMount() {
    this.updateDecoratorListener();
  }

  componentDidUpdate() {
    this.updateDecoratorListener();
  }

  componentWillUnmount() {
    const {
      vis: { network }
    } = this.props;

    if (this.hasAfterDrawingListener) {
      network.off('afterDrawing', this.moveDecorator);
    }
  }

  render() {
    const {
      decorator,
      vis: { network }
    } = this.props;

    return (
      <>
        {network &&
          decorator && (
            <div style={style} ref={this.decoratorRef}>
              {decorator(this.props)}
            </div>
          )}
      </>
    );
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    decorator: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    vis: PropTypes.shape({
      nodes: PropTypes.object.isRequired,
      edges: PropTypes.object.isRequired,
      network: PropTypes.object
    })
  };
}
