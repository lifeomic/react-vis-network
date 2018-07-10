import ReactDOMServer from 'react-dom/server.browser';

const svgToDataURI = svg => {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};

export const reactToSvgImageUrl = element => {
  const svgString = ReactDOMServer.renderToStaticMarkup(element);
  return svgToDataURI(svgString);
};
