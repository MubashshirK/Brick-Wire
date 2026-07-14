import React from 'react';
import { View } from '@react-email/ui';
import { Text, Link } from '@react-email/components';

interface Props {
  title: string;
  excerpt: string;
  slug: string;
  category?: string;
  sponsored?: boolean;
  baseUrl?: string;
}

export function ArticleBlock({ title, excerpt, slug, category, sponsored, baseUrl: propBaseUrl }: Props) {
  const baseUrl = propBaseUrl || process.env.SITE_URL || 'https://brickwire.com';

  return (
    <View style={article}>
      {sponsored && <Text style={sponsoredBadge}>Sponsored</Text>}
      {category && <Text style={categoryLabel}>{category}</Text>}
      <Link href={`${baseUrl}/briefs/${slug}/`} style={titleStyle}>
        {title}
      </Link>
      <Text style={excerptStyle}>{excerpt}</Text>
    </View>
  );
}

const article: React.CSSProperties = {
  marginBottom: 24,
  paddingBottom: 24,
  borderBottom: '1px solid #e5e7eb',
};

const sponsoredBadge: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  color: '#ca4825',
  margin: '0 0 4px',
};

const categoryLabel: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  color: '#ca4825',
  margin: '0 0 4px',
};

const titleStyle: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: 18,
  fontWeight: 600,
  color: '#1a1a1a',
  textDecoration: 'none',
  lineHeight: 1.3,
  display: 'block',
  marginBottom: 6,
};

const excerptStyle: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: 14,
  color: '#6b7280',
  lineHeight: 1.5,
  margin: 0,
};
