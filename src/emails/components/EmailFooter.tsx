import React from 'react';
import { View, Text, Link, Hr } from '@react-email/components';

interface Props {
  unsubscribeUrl?: string;
  baseUrl?: string;
}

export function EmailFooter({ unsubscribeUrl, baseUrl: propBaseUrl }: Props) {
  const baseUrl = propBaseUrl || process.env.BASE_URL || 'https://brickwire.com';

  return (
    <View style={footer}>
      <Hr style={hr} />
      <Text style={address}>
        Brick Wire LLC<br />
        123 Market Street, Suite 400<br />
        New York, NY 10001
      </Text>
      <View style={links}>
        <Link href={`${baseUrl}/about-us/`} style={link}>About</Link>
        <Link href={`${baseUrl}/advertise/`} style={link}>Advertise</Link>
        <Link href={`${baseUrl}/privacy-policy/`} style={link}>Privacy</Link>
        <Link href={`${baseUrl}/terms-of-use/`} style={link}>Terms</Link>
        <Link href={`${baseUrl}/contact-us/`} style={link}>Contact</Link>
      </View>
      {unsubscribeUrl && (
        <Text style={unsubscribe}>
          <Link href={unsubscribeUrl} style={unsubscribeLinkStyle}>Unsubscribe</Link>
          {' '}from this newsletter.
        </Text>
      )}
      <Text style={copyright}>
        &copy; {new Date().getFullYear()} Brick Wire. All rights reserved.
      </Text>
    </View>
  );
}

const footer: React.CSSProperties = {
  marginTop: 32,
  paddingTop: 24,
};

const hr: React.CSSProperties = {
  borderColor: '#e5e7eb',
  margin: '0 0 24px',
};

const address: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: 12,
  color: '#9ca3af',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const links: React.CSSProperties = {
  display: 'flex',
  gap: 16,
  marginBottom: 16,
};

const link: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: 12,
  color: '#ca4825',
  textDecoration: 'none',
};

const unsubscribe: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: 11,
  color: '#9ca3af',
  margin: '0 0 8px',
};

const unsubscribeLinkStyle: React.CSSProperties = {
  color: '#9ca3af',
  textDecoration: 'underline',
};

const copyright: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: 11,
  color: '#9ca3af',
  margin: 0,
};
