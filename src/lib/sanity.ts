import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
});

export const BRIEFS_QUERY = `*[_type == "brief"] | order(date desc)`;
export const BRIEF_QUERY = `*[_type == "brief" && slug.current == $slug][0]`;
export const NEWSLETTERS_QUERY = `*[_type == "newsletter"] | order(issueDate desc)`;
export const REVIEWS_QUERY = `*[_type == "review"] | order(date desc)`;
export const REVIEW_QUERY = `*[_type == "review" && slug.current == $slug][0]`;
export const PODCAST_EPISODES_QUERY = `*[_type == "podcastEpisode"] | order(episodeDate desc)`;
export const TESTIMONIALS_QUERY = `*[_type == "testimonial"]`;
export const EVENTS_QUERY = `*[_type == "event"] | order(date asc)`;
export const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]`;
