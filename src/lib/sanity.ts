import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { toHTML } from '@portabletext/to-html';

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function toHTMLBody(blocks: unknown[]) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return '';
  return toHTML(blocks, {});
}

export interface SanitySlug {
  current: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface MarketRef {
  name: string;
  slug: SanitySlug;
}

export interface SectorRef {
  name: string;
  slug: SanitySlug;
}

export interface Brief {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  body: unknown[];
  image?: SanityImage;
  date: string;
  market?: MarketRef;
  sector?: SectorRef;
  author?: string;
  sponsored?: boolean;
  sponsorName?: string;
  sponsorDescription?: string;
}

export interface Newsletter {
  _id: string;
  title: string;
  slug: SanitySlug;
  edition: 'national' | 'texas' | 'new-york';
  issueDate: string;
  body: unknown[];
  image?: SanityImage;
}

export interface Review {
  _id: string;
  title: string;
  slug: SanitySlug;
  productName: string;
  rating: number;
  pricing?: string;
  body: unknown[];
  pros: string[];
  cons: string[];
  author: string;
  date: string;
  image?: SanityImage;
  categories: string[];
  tags: string[];
}

export interface PodcastEpisode {
  _id: string;
  title: string;
  slug: SanitySlug;
  guest?: string;
  guestTitle?: string;
  guestBio?: string;
  episodeDate: string;
  description?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  appleUrl?: string;
  albumArt?: SanityImage;
}

export interface Testimonial {
  _id: string;
  name: string;
  title?: string;
  company?: string;
  quote: string;
  rating?: number;
}

export interface MarketReport {
  _id: string;
  title: string;
  publisher?: string;
  assetClass?: string;
  city?: string;
  state?: string;
  reportDate: string;
  file?: { asset: { _ref: string } };
  coverImage?: SanityImage;
}

export interface Event {
  _id: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
  link?: string;
  image?: SanityImage;
}

export interface Page {
  _id: string;
  title: string;
  slug: SanitySlug;
  body: unknown[];
  image?: SanityImage;
  seoDescription?: string;
}

export interface Market {
  _id: string;
  name: string;
  slug: SanitySlug;
}

export interface Sector {
  _id: string;
  name: string;
  slug: SanitySlug;
}

export interface Term {
  _id: string;
  name: string;
  slug: SanitySlug;
  definition: unknown[];
  category?: string;
  abbreviation?: string;
  relatedTerms?: Array<{ _ref: string }>;
}

export interface Partner {
  _id: string;
  name: string;
  slug: SanitySlug;
  description?: string;
  logo?: SanityImage;
  url?: string;
  category?: string;
  featured?: boolean;
}

export const BRIEFS_QUERY = `*[_type == "brief"] | order(date desc) { ..., market-> { name, slug }, sector-> { name, slug } }`;
export const BRIEF_QUERY = `*[_type == "brief" && slug.current == $slug][0] { ..., market-> { name, slug }, sector-> { name, slug } }`;
export const NEWSLETTERS_QUERY = `*[_type == "newsletter"] | order(issueDate desc)`;
export const NEWSLETTERS_BY_EDITION_QUERY = `*[_type == "newsletter" && edition == $edition] | order(issueDate desc)`;
export const NEWSLETTER_QUERY = `*[_type == "newsletter" && slug.current == $slug][0]`;
export const REVIEWS_QUERY = `*[_type == "review"] | order(date desc)`;
export const REVIEW_QUERY = `*[_type == "review" && slug.current == $slug][0]`;
export const PODCAST_EPISODES_QUERY = `*[_type == "podcastEpisode"] | order(episodeDate desc)`;
export const PODCAST_EPISODE_QUERY = `*[_type == "podcastEpisode" && slug.current == $slug][0]`;
export const TESTIMONIALS_QUERY = `*[_type == "testimonial"]`;
export const EVENTS_QUERY = `*[_type == "event"] | order(date asc)`;
export const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]`;
export const BRIEFS_BY_MARKET_QUERY = `*[_type == "brief" && market->slug.current == $market] | order(date desc) { ..., market-> { name, slug }, sector-> { name, slug } }`;
export const BRIEFS_BY_SECTOR_QUERY = `*[_type == "brief" && sector->slug.current == $sector] | order(date desc) { ..., market-> { name, slug }, sector-> { name, slug } }`;
export const MARKET_REPORTS_QUERY = `*[_type == "marketReport"] | order(reportDate desc)`;
export const TERMS_QUERY = `*[_type == "term"] | order(name asc) { ..., "relatedTerms": relatedTerms[]-> { name, slug } }`;
export const TERMS_BY_CATEGORY_QUERY = `*[_type == "term" && category == $category] | order(name asc) { ..., "relatedTerms": relatedTerms[]-> { name, slug } }`;
export const PARTNERS_QUERY = `*[_type == "partner"] | order(featured desc, name asc) { ..., "logo": logo }`;
