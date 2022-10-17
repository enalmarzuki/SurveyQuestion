import React from 'react';

interface IGapProps {
  height?: number;
  width?: number;
}

export const Gap: React.FC<IGapProps> = ({ height, width }) => {
  return <div style={{ width, height }} />;
};
