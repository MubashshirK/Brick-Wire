export const prerender = false;
import type { APIRoute } from 'astro';
import { client } from '../../lib/sanity';

export const GET: APIRoute = async ({ url }) => {
  const q = url.searchParams.get('q')?.trim() || '';

  if (!q || q.length < 2) {
    return new Response(JSON.stringify({ query: q, results: {}, total: 0 }), { status: 200 });
  }

  try {
    const [briefs, reviews, newsletters, episodes] = await Promise.all([
      client.fetch<Array<{
        _type: 'brief';
        title: string;
        slug: { current: string };
        excerpt?: string;
        date: string;
        sector?: { name: string };
        market?: { name: string };
      }>>(
        `*[_type == "brief" && (title match $q + "*" || pt::text(body) match $q + "*" || excerpt match $q + "*")] | order(date desc) [0...5] { title, slug, excerpt, date, sector-> { name }, market-> { name } }`,
        { q }
      ),
      client.fetch<Array<{
        _type: 'review';
        title: string;
        slug: { current: string };
        productName: string;
        rating: number;
        date: string;
      }>>(
        `*[_type == "review" && (title match $q + "*" || productName match $q + "*")] | order(date desc) [0...5] { title, slug, productName, rating, date }`,
        { q }
      ),
      client.fetch<Array<{
        _type: 'newsletter';
        title: string;
        slug: { current: string };
        edition: string;
        issueDate: string;
      }>>(
        `*[_type == "newsletter" && (title match $q + "*" || pt::text(body) match $q + "*")] | order(issueDate desc) [0...5] { title, slug, edition, issueDate }`,
        { q }
      ),
      client.fetch<Array<{
        _type: 'podcastEpisode';
        title: string;
        slug: { current: string };
        episodeDate: string;
        guest?: string;
      }>>(
        `*[_type == "podcastEpisode" && (title match $q + "*" || description match $q + "*" || guest match $q + "*")] | order(episodeDate desc) [0...5] { title, slug, episodeDate, guest }`,
        { q }
      ),
    ]);

    const results = { briefs, reviews, newsletters, episodes };
    const total = briefs.length + reviews.length + newsletters.length + episodes.length;

    return new Response(JSON.stringify({ query: q, results, total }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Search failed' }), { status: 500 });
  }
};