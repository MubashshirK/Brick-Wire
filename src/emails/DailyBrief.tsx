import React from 'react';
import { Html, Head, Body, Container, Section, Text, Link } from '@react-email/components';
import { EmailHeader } from './components/EmailHeader';
import { EmailFooter } from './components/EmailFooter';
import { ArticleBlock } from './components/ArticleBlock';
import { Divider } from './components/Divider';

const baseUrl = process.env.BASE_URL || 'https://brickwire.com';

interface Article {
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  sponsored?: boolean;
}

interface Props {
  edition?: string;
  date?: string;
  articles?: Article[];
  sponsorMessage?: string;
  unsubscribeLink?: string;
}

export default function DailyBrief({
  edition = 'National',
  date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  articles = defaultArticles,
  sponsorMessage,
  unsubscribeLink,
}: Props) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <EmailHeader previewText={`${edition} Brief — ${date}`} />

          <Section style={editionSection}>
            <Text style={editionLabel}>{edition} Brief</Text>
            <Text style={dateLabel}>{date}</Text>
          </Section>

          <Section style={articlesSection}>
            {articles.map((article, i) => (
              <ArticleBlock key={i} {...article} />
            ))}
          </Section>

          {sponsorMessage && (
            <>
              <Divider />
              <Section style={sponsorSection}>
                <Text style={sponsorLabel}>Presented by</Text>
                <Text style={sponsorMessageStyle}>{sponsorMessage}</Text>
              </Section>
            </>
          )}

          <Divider />

          <Section style={linksSection}>
            <Link href={`${baseUrl}/briefs/`} style={footerLink}>View all briefs</Link>
            <Link href={`${baseUrl}/newsletters/${edition.toLowerCase()}/`} style={footerLink}>Browse {edition} archives</Link>
          </Section>

          <EmailFooter unsubscribeLink={unsubscribeLink} />
        </Container>
      </Body>
    </Html>
  );
}

const defaultArticles: Article[] = [
  {
    title: 'Airbnb Buys Manhattan Office Despite NYC Rental Crackdown',
    slug: 'airbnb-buys-manhattan-office',
    excerpt: "Airbnb's $81.5M acquisition of a landmark NYC office signals a long-term presence in a city with strict short-term rental laws.",
    category: 'Office',
  },
  {
    title: 'Dallas and Miami Challenge New York as US Financial Hub',
    slug: 'dallas-miami-financial-hub',
    excerpt: 'Sunbelt cities are gaining ground as financial firms relocate and expand outside of traditional hubs.',
    category: 'Investments',
  },
  {
    title: 'US Retailers Bet on Mini Products as Shoppers Scale Back',
    slug: 'retailers-mini-products',
    excerpt: 'Shrinking product sizes reflect changing consumer behavior amid persistent inflation concerns.',
    category: 'Retail',
  },
  {
    title: 'Foreclosure Spike Unlocks Discounted Housing Deals For CRE',
    slug: 'foreclosure-spike-discounts',
    excerpt: 'Rising foreclosure rates are creating acquisition opportunities for institutional investors.',
    category: 'Industry News',
    sponsored: true,
  },
];

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

const editionSection: React.CSSProperties = {
  marginBottom: 24,
};

const editionLabel: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  textTransform: 'uppercase',
  color: '#ca4825',
  margin: '0 0 4px',
  letterSpacing: '0.05em',
};

const dateLabel: React.CSSProperties = {
  fontSize: 13,
  color: '#6b7280',
  margin: 0,
};

const articlesSection: React.CSSProperties = {
  padding: '8px 0',
};

const sponsorSection: React.CSSProperties = {
  padding: '8px 0',
  textAlign: 'center',
};

const sponsorLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  color: '#9ca3af',
  margin: '0 0 8px',
  letterSpacing: '0.05em',
};

const sponsorMessageStyle: React.CSSProperties = {
  fontSize: 14,
  color: '#374151',
  lineHeight: 1.5,
  margin: 0,
  fontStyle: 'italic',
};

const linksSection: React.CSSProperties = {
  padding: '16px 0',
  display: 'flex',
  gap: 24,
};

const footerLink: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: 13,
  color: '#ca4825',
  textDecoration: 'none',
  fontWeight: 600,
};
