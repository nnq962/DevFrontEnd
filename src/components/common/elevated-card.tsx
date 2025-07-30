import React from 'react';
import { Card } from 'antd';
import type { CardProps } from 'antd';

interface ElevatedCardProps extends CardProps {
  children?: React.ReactNode;
  elevation?: 'low' | 'medium' | 'high';
}

const ElevatedCard: React.FC<ElevatedCardProps> = ({ 
  children, 
  elevation = 'medium',
  style,
  ...props 
}) => {
  const elevationStyles = {
    low: {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    },
    medium: {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    high: {
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
    }
  };

  const cardStyle = {
    borderRadius: '12px',
    ...elevationStyles[elevation],
    ...style
  };

  return (
    <Card
      {...props}
      style={cardStyle}
      className={`elevated-card ${props.className || ''}`}
    >
      {children}
    </Card>
  );
};

export default ElevatedCard; 