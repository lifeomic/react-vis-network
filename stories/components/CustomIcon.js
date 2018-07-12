import React from 'react';
import PropTypes from 'prop-types';

const CustomIcon = ({ icon, color = '#5596ed' }) => {
  const viewBox = 36;
  const iconSize = 20;
  const pad = (viewBox - iconSize) / 2;
  const center = viewBox / 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBox} ${viewBox}`}
    >
      <g>
        <circle cx={center} cy={center} r={16} fill={color} />
        <g transform={`translate(${pad}, ${pad})`}>
          {React.createElement(icon, { color: 'white', size: iconSize })}
        </g>
      </g>
    </svg>
  );
};

CustomIcon.propTypes = {
  icon: PropTypes.node,
  color: PropTypes.string
};

export default CustomIcon;
