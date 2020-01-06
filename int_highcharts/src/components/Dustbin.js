import React from 'react';
import { useDrop } from 'react-dnd';
import Types from '@/utils/Types';

const style = {
  color: 'white',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
};
const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: Types.CHART_TYPE_ITEM,
    drop: () => ({ name: 'Dustbin' }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;
  let backgroundColor = 'rgba(0,0,0,.4)';
  let zIndex = '0';
  if (isActive) {
    backgroundColor = 'rgba(42,243,53,.4)';
    zIndex = 2;
  } else if (canDrop) {
    backgroundColor = 'rgba(255,31,32,.4)';
    zIndex = 2;
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor, zIndex }}>
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  );
};
export default Dustbin;
