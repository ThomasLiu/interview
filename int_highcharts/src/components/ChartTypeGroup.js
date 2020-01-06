import React from 'react';
import ChartTypeItem from './ChartTypeItem';

const style = {};

const ChartTypeGroup = ({ name, list = [] }) => {
  return (
    <div style={style}>
      <h6>{name}</h6>
      <div className="flex wrap">
        {list.map(item => (
          <ChartTypeItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ChartTypeGroup;
