// components/Tooltip.js
import { useState } from 'react';
import styles from './Tooltip.module.css';

const Tooltip = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(true);

  const getTooltipStyle = () => {
    switch (position) {
      case 'top':
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '10px' };
      case 'bottom':
        return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '10px' };
      case 'left':
        return { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '10px' };
      case 'right':
        return { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '10px' };
      default:
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '10px' };
    }
  };

  return (
    <div className={styles.tooltipContainer}>
      <div
        className={styles.targetElement}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(true)}
      >
        {children}
      </div>
      {isVisible && (
        <div className={styles.tooltip} style={getTooltipStyle()}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;