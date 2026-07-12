import React from 'react';
import { Hr } from '@react-email/components';

interface Props {
  style?: React.CSSProperties;
}

export function Divider({ style }: Props) {
  return <Hr style={{ ...divider, ...style }} />;
}

const divider: React.CSSProperties = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};
