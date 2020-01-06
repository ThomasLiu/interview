import React from 'react';
import { useDrag } from 'react-dnd';
import Types from '@/utils/Types';

const styles = {
  wrap: {
    border: '1px dashed gray',
    backgroundColor: 'white',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    cursor: 'move',
    width: '4rem',
    height: '4rem',
  },
  img: {
    width: '100%',
    height: 'auto',
  },
};

const ChartTypeItem = ({ name, img }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: Types.CHART_TYPE_ITEM },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ ...styles.wrap, opacity }}>
      <img src={img} alt={name} style={styles.img} />
    </div>
  );
};

export default ChartTypeItem;
