import React from 'react';
import { View, Text, Img, Section } from '@react-email/components';

interface Props {
  previewText?: string;
  baseUrl?: string;
}

export function EmailHeader({ previewText, baseUrl: propBaseUrl }: Props) {
  const baseUrl = propBaseUrl || process.env.BASE_URL || 'https://brickwire.com';

  return (
    <Section style={headerSection}>
      {previewText && (
        <Text style={preview}>{previewText}</Text>
      )}
      <View style={logoRow}>
        <Img
          src={`${baseUrl}/images/brick-wire-logo.png`}
          alt="Brick Wire"
          width="48"
          height="48"
          style={logo}
        />
        <Text style={brandName}>Brick Wire<sup style={reg}>&reg;</sup></Text>
      </View>
      <Text style={tagline}>Your daily edge in real estate</Text>
    </Section>
  );
}

const headerSection: React.CSSProperties = {
  padding: '32px 0 24px',
  borderBottom: '2px solid #ca4825',
  marginBottom: 24,
};

const preview: React.CSSProperties = {
  display: 'none',
  fontSize: 1,
  lineHeight: 1,
  color: '#ffffff',
  margin: 0,
};

const logoRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 4,
};

const logo: React.CSSProperties = {
  borderRadius: 8,
};

const brandName: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: 28,
  fontWeight: 700,
  color: '#1a1a1a',
  margin: 0,
  lineHeight: 1,
};

const reg: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: 12,
  verticalAlign: 'super',
};

const tagline: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: 13,
  color: '#6b7280',
  margin: 0,
  letterSpacing: '0.05em',
};
