import React from 'react';
import { Html, Head, Body, Container, Section, Text, Link } from '@react-email/components';
import { EmailHeader } from './components/EmailHeader';
import { EmailFooter } from './components/EmailFooter';

interface Props {
  firstName?: string;
  unsubscribeToken?: string;
  baseUrl?: string;
}

export default function Welcome({ firstName = 'there', unsubscribeToken, baseUrl: propBaseUrl }: Props) {
  const baseUrl = propBaseUrl || process.env.SITE_URL || 'https://brickwire.com';
  const unsubscribeUrl = unsubscribeToken ? `${baseUrl}/api/unsubscribe?token=${unsubscribeToken}` : undefined;

  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <EmailHeader previewText="Welcome to Brick Wire — your daily edge in real estate." baseUrl={baseUrl} />

          <Section style={section}>
            <Text style={greeting}>Hi {firstName},</Text>
            <Text style={paragraph}>
              Welcome to <strong>Brick Wire</strong> — your daily edge in commercial real estate.
            </Text>
            <Text style={paragraph}>
              Every day, we bring you the most important news, trends, and analysis from across
              the CRE landscape. From multifamily and industrial to office, retail, and proptech,
              we've got you covered.
            </Text>
            <Text style={paragraph}>Here's what you can expect:</Text>
            <ul style={list}>
              <li style={listItem}><strong style={strong}>Daily Briefs</strong> — The top stories you need to know</li>
              <li style={listItem}><strong style={strong}>Market Reports</strong> — In-depth analysis by sector and region</li>
              <li style={listItem}><strong style={strong}>Product Reviews</strong> — Honest reviews of CRE software and services</li>
              <li style={listItem}><strong style={strong}>No Cap Podcast</strong> — Conversations with industry leaders</li>
            </ul>
          </Section>

          <Section style={ctaSection}>
            <Link href={`${baseUrl}/briefs/`} style={cta}>
              Read the Latest Briefs
            </Link>
          </Section>

          <Section style={section}>
            <Text style={paragraph}>
              Want to dive deeper? Check out our{' '}
              <Link href={`${baseUrl}/newsletters/national/`} style={accentLink}>National Newsletter</Link>
              {' '}or explore by{' '}
              <Link href={`${baseUrl}/market/texas/`} style={accentLink}>market</Link> or{' '}
              <Link href={`${baseUrl}/sectors/industry-news/`} style={accentLink}>sector</Link>.
            </Text>
          </Section>

          <EmailFooter baseUrl={baseUrl} unsubscribeUrl={unsubscribeUrl} />
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  backgroundColor: '#f9fafb',
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  maxWidth: 560,
  margin: '0 auto',
  padding: '0 24px',
  backgroundColor: '#ffffff',
};

const section: React.CSSProperties = {
  padding: '8px 0',
};

const greeting: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  color: '#1a1a1a',
  margin: '0 0 16px',
};

const paragraph: React.CSSProperties = {
  fontSize: 15,
  color: '#374151',
  lineHeight: 1.6,
  margin: '0 0 12px',
};

const list: React.CSSProperties = {
  padding: '0 0 0 20px',
  margin: '0 0 16px',
};

const listItem: React.CSSProperties = {
  fontSize: 15,
  color: '#374151',
  lineHeight: 1.8,
};

const strong: React.CSSProperties = {
  fontWeight: 600,
};

const ctaSection: React.CSSProperties = {
  textAlign: 'center',
  padding: '24px 0',
};

const cta: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  display: 'inline-block',
  padding: '14px 32px',
  backgroundColor: '#ca4825',
  color: '#ffffff',
  fontSize: 15,
  fontWeight: 600,
  textDecoration: 'none',
  borderRadius: 8,
};

const accentLink: React.CSSProperties = {
  color: '#ca4825',
  textDecoration: 'underline',
};
