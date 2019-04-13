import React from 'react';

const SVG = (
    {
      name = '',
      style = {},
      fill = '#000',
      width = '100%',
      className = '',
      height = '100%',
      viewBox = '0 0 92 92',
    }
  ) => 
    <svg
      width={width}
      style={style}
      height={height}
      viewBox={viewBox}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
    {getPath(name, { fill })}
  </svg>;

const getPath = (name, props) => {
  switch(name) {
    case 'checkmark':
      return <path d="M34.4,72c-1.2,0-2.3-0.4-3.2-1.3L11.3,50.8c-1.8-1.8-1.8-4.6,0-6.4c1.8-1.8,4.6-1.8,6.4,0l16.8,16.7
  l39.9-39.8c1.8-1.8,4.6-1.8,6.4,0c1.8,1.8,1.8,4.6,0,6.4l-43.1,43C36.7,71.6,35.6,72,34.4,72z" {...props}/>;

    case 'cross':
      return <path d="M70.7,64.3c1.8,1.8,1.8,4.6,0,6.4c-0.9,0.9-2,1.3-3.2,1.3c-1.2,0-2.3-0.4-3.2-1.3L46,52.4L27.7,70.7
  c-0.9,0.9-2,1.3-3.2,1.3s-2.3-0.4-3.2-1.3c-1.8-1.8-1.8-4.6,0-6.4L39.6,46L21.3,27.7c-1.8-1.8-1.8-4.6,0-6.4c1.8-1.8,4.6-1.8,6.4,0
  L46,39.6l18.3-18.3c1.8-1.8,4.6-1.8,6.4,0c1.8,1.8,1.8,4.6,0,6.4L52.4,46L70.7,64.3z" {...props}/>;

    case 'chevron-left':
      return <path d="M61.8,68.1c1.6,1.5,1.6,4.1,0.1,5.7C61.1,74.6,60,75,59,75c-1,0-2-0.4-2.8-1.1l-26-25
  C29.4,48.1,29,47.1,29,46s0.4-2.1,1.2-2.9l26-25c1.6-1.5,4.1-1.5,5.7,0.1c1.5,1.6,1.5,4.1-0.1,5.7L38.8,46L61.8,68.1z" {...props}/>;

    case 'chevron-right':
      return <path id="XMLID_439_" d="M63,46c0,1.1-0.4,2.1-1.2,2.9l-26,25C35,74.6,34,75,33,75c-1.1,0-2.1-0.4-2.9-1.2c-1.5-1.6-1.5-4.1,0.1-5.7
  l23-22.1l-23-22.1c-1.6-1.5-1.6-4.1-0.1-5.7c1.5-1.6,4.1-1.6,5.7-0.1l26,25C62.6,43.9,63,44.9,63,46z" {...props}/>;
  
    default:
      return <path />;
  }
}

export default SVG;