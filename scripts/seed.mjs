import 'dotenv/config';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '64qdsz2b',
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2025-01-01',
  useCdn: false,
});

if (!client.config().token) {
  console.error('Missing SANITY_TOKEN. Add it to your .env file.');
  console.error('Create one at: https://manage.sanity.io/projects/64qdsz2b/settings/api#tokens');
  process.exit(1);
}

function blockText(text, style = 'normal') {
  return [{ _type: 'block', style, children: [{ _type: 'span', text }] }];
}

function blockWithHeading(heading, ...paragraphs) {
  const blocks = [];
  blocks.push({ _type: 'block', style: 'h2', children: [{ _type: 'span', text: heading }] });
  for (const p of paragraphs) {
    blocks.push({ _type: 'block', style: 'normal', children: [{ _type: 'span', text: p }] });
  }
  return blocks;
}

async function createIfNotExists(doc) {
  if (doc._id) {
    try {
      await client.createIfNotExists(doc);
      console.log(`  ✔ ${doc._type}: ${doc._id}`);
    } catch (e) {
      if (e.statusCode === 409) {
        console.log(`  ✓ ${doc._type}: ${doc._id} (already exists)`);
      } else {
        console.error(`  ✖ ${doc._type}: ${doc._id} - ${e.message}`);
      }
    }
  } else {
    try {
      await client.create(doc);
      console.log(`  ✔ ${doc._type}: ${doc.title || doc.name || 'untitled'}`);
    } catch (e) {
      console.error(`  ✖ ${doc._type}: ${e.message}`);
    }
  }
}

async function seed() {
  console.log('\n=== Seeding Sanity Dataset ===\n');

  // ── Markets ──
  console.log('Markets:');
  const markets = [
    { _id: 'market-national', name: 'National', slug: 'national' },
    { _id: 'market-texas', name: 'Texas', slug: 'texas' },
    { _id: 'market-california', name: 'California', slug: 'california' },
    { _id: 'market-new-york', name: 'New York', slug: 'new-york' },
    { _id: 'market-florida', name: 'Florida', slug: 'florida' },
  ];
  for (const m of markets) {
    await createIfNotExists({
      _id: m._id,
      _type: 'market',
      name: m.name,
      slug: { _type: 'slug', current: m.slug },
    });
  }

  // ── Sectors ──
  console.log('\nSectors:');
  const sectors = [
    { _id: 'sector-industry-news', name: 'Industry News', slug: 'industry-news' },
    { _id: 'sector-investments', name: 'Investments', slug: 'investments' },
    { _id: 'sector-multifamily', name: 'Multifamily', slug: 'multifamily' },
    { _id: 'sector-industrial', name: 'Industrial', slug: 'industrial' },
    { _id: 'sector-proptech', name: 'Proptech', slug: 'proptech' },
    { _id: 'sector-lending', name: 'Lending', slug: 'lending' },
    { _id: 'sector-office', name: 'Office', slug: 'office' },
    { _id: 'sector-retail', name: 'Retail', slug: 'retail' },
    { _id: 'sector-data', name: 'Data', slug: 'data' },
  ];
  for (const s of sectors) {
    await createIfNotExists({
      _id: s._id,
      _type: 'sector',
      name: s.name,
      slug: { _type: 'slug', current: s.slug },
    });
  }

  // ── Briefs ──
  console.log('\nBriefs:');
  const briefs = [
    { _id: 'brief-airbnb-office', title: 'Airbnb Buys Manhattan Office Despite NYC Rental Crackdown', slug: 'airbnb-buys-manhattan-office', market: 'market-new-york', sector: 'sector-office', date: '2026-07-10T12:00:00Z', excerpt: "Airbnb's $81.5M acquisition of a landmark NYC office signals a long-term presence in a city with strict short-term rental laws.", author: 'Brick Wire' },
    { _id: 'brief-dallas-miami', title: 'Dallas and Miami Challenge New York as US Financial Hub', slug: 'dallas-miami-financial-hub', market: 'market-national', sector: 'sector-investments', date: '2026-07-10T12:00:00Z', author: 'Brick Wire' },
    { _id: 'brief-retail-mini', title: 'US Retailers Bet on Mini Products as Shoppers Scale Back', slug: 'retailers-mini-products', market: 'market-national', sector: 'sector-retail', date: '2026-07-10T12:00:00Z', author: 'Brick Wire' },
    { _id: 'brief-foreclosure', title: 'Foreclosure Spike Unlocks Discounted Housing Deals For CRE', slug: 'foreclosure-spike-discounts', market: 'market-national', sector: 'sector-industry-news', date: '2026-07-10T12:00:00Z', author: 'Brick Wire' },
    { _id: 'brief-concession', title: 'Apartment Concession Discounts Hit Record Depth in June 2026', slug: 'concession-discounts-record', market: 'market-national', sector: 'sector-multifamily', date: '2026-07-10T12:00:00Z', author: 'Brick Wire' },
    { _id: 'brief-industrial', title: 'Industrial Leasing Surges as Occupiers Lock In Long-Term Deals', slug: 'industrial-leasing-surges', market: 'market-national', sector: 'sector-industrial', date: '2026-07-08T12:00:00Z', author: 'Brick Wire' },
    { _id: 'brief-nyc-apartment', title: "NYC Apartment Market Defies Headwinds With Nation's Tightest Vacancy", slug: 'nyc-apartment-market', market: 'market-new-york', sector: 'sector-multifamily', date: '2026-07-07T12:00:00Z', author: 'Brick Wire' },
    { _id: 'brief-nyc-budget', title: "NYC's $125.8B Budget Puts Housing First", slug: 'nyc-budget-housing', market: 'market-new-york', sector: 'sector-investments', date: '2026-07-02T12:00:00Z', author: 'Brick Wire' },
    { _id: 'brief-texas-multifamily', title: 'Texas Multifamily Growth Meets Affordability Pressure', slug: 'texas-multifamily-growth', market: 'market-texas', sector: 'sector-multifamily', date: '2026-07-08T12:00:00Z', author: 'Brick Wire' },
    { _id: 'brief-proptech-ai', title: 'The AI Architecture Real Estate Investment Firms Are Choosing', slug: 'ai-architecture-real-estate', market: 'market-national', sector: 'sector-proptech', date: '2026-06-25T12:00:00Z', sponsored: true, sponsorName: 'Proptech Co.', sponsorDescription: 'Leading AI solutions for real estate.' },
  ];
  for (const b of briefs) {
    const body = blockWithHeading(
      b.title,
      `In a significant development for the commercial real estate sector, ${b.title.toLowerCase()}. This trend has been closely watched by industry analysts who point to shifting market dynamics as a key driver.`,
      `According to industry experts, the implications of this development extend across multiple asset classes and geographic regions. Market participants are adjusting their strategies accordingly.`,
      `"We're seeing a fundamental shift in how real estate professionals approach this market," said a senior analyst. "The data suggests that those who adapt quickly will be best positioned to capitalize on emerging opportunities."`
    );
    await createIfNotExists({
      _id: b._id,
      _type: 'brief',
      title: b.title,
      slug: { _type: 'slug', current: b.slug },
      excerpt: b.excerpt || `Latest analysis on ${b.title.toLowerCase()} and what it means for CRE professionals.`,
      body,
      date: b.date,
      market: { _type: 'reference', _ref: b.market },
      sector: { _type: 'reference', _ref: b.sector },
      author: b.author || 'Brick Wire',
      ...(b.sponsored ? { sponsored: true, sponsorName: b.sponsorName, sponsorDescription: b.sponsorDescription } : {}),
    });
  }

  // ── Reviews ──
  console.log('\nReviews:');
  const reviews = [
    { _id: 'review-crexi', title: 'Crexi Review: Is It the Best Platform for CRE Listing & Investment?', slug: 'crexi-review', product: 'Crexi', rating: 4, pros: ['Modern intuitive interface', 'Strong data and analytics', 'Great marketing tools'], cons: ['Smaller inventory than incumbents', 'Premium pricing for advanced features'] },
    { _id: 'review-reonomy', title: 'Reonomy Review: Commercial Real Estate Data & Analytics', slug: 'reonomy-review', product: 'Reonomy', rating: 4, pros: ['Deep property data', 'Excellent search filters', 'Good ownership insights'], cons: ['Steep learning curve', 'Limited national coverage'] },
    { _id: 'review-dealpath', title: 'Dealpath Review: CRE Investment Management Software', slug: 'dealpath-review', product: 'Dealpath', rating: 5, pros: ['Comprehensive pipeline management', 'Excellent reporting', 'Great team collaboration'], cons: ['Expensive for small firms', 'Mobile app needs improvement'] },
    { _id: 'review-costar', title: 'CoStar Suite Review: The Industry Standard?', slug: 'costar-suite-review', product: 'CoStar', rating: 4, pros: ['Unmatched data depth', 'Industry standard', 'Extensive listings'], cons: ['Very expensive', 'Complex interface', 'Long-term contracts'] },
    { _id: 'review-vts', title: 'VTS Review: Lease Management & Marketing for CRE', slug: 'vts-review', product: 'VTS', rating: 4, pros: ['Great lease management', 'Good marketing tools', 'Strong analytics'], cons: ['Limited to certain asset classes', 'Integration challenges'] },
    { _id: 'review-buildout', title: 'Buildout Review: CRM & Marketing for CRE Brokers', slug: 'buildout-review', product: 'Buildout', rating: 3, pros: ['Good CRM features', 'Nice marketing templates', 'Easy listing syndication'], cons: ['Limited reporting', 'Occasional performance issues', 'Basic mobile experience'] },
    { _id: 'review-apto', title: 'Apto Review: Commercial Real Estate CRM Platform', slug: 'apto-review', product: 'Apto', rating: 4, pros: ['Intuitive CRM', 'Good team features', 'Strong pipeline management'], cons: ['Limited integrations', 'No mobile app'] },
    { _id: 'review-loopnet', title: 'LoopNet Review: Is It Worth Listing Your Property?', slug: 'loopnet-review', product: 'LoopNet', rating: 3, pros: ['High traffic', 'Brand recognition', 'Easy to list'], cons: ['Expensive for premium', 'Lead quality varies', 'Outdated interface'] },
  ];
  for (const r of reviews) {
    const body = blockWithHeading(
      `Overview of ${r.product}`,
      `${r.product} has established itself as a notable player in the commercial real estate technology landscape. This review examines its key features, pricing, and overall value proposition for CRE professionals.`,
      `The platform offers a range of features designed to streamline workflows and provide actionable insights. Our analysis is based on extensive hands-on testing and user feedback.`
    );
    await createIfNotExists({
      _id: r._id,
      _type: 'review',
      title: r.title,
      slug: { _type: 'slug', current: r.slug },
      productName: r.product,
      rating: r.rating,
      body,
      pros: r.pros,
      cons: r.cons,
      author: 'Brick Wire',
      date: '2026-07-01',
      categories: [r.product],
      tags: ['cre-software', r.product.toLowerCase()],
    });
  }

  // ── Newsletters ──
  console.log('\nNewsletters:');
  const newsletters = [
    { _id: 'nl-construction-costs', title: 'Construction Costs Climb as Labor Shortages and Trade Policy Tighten the Market', slug: 'construction-costs-climb', edition: 'national', date: '2026-07-10' },
    { _id: 'nl-nyc-conversion', title: 'NYC Office-to-Apartment Conversion Halted After Structural Scare', slug: 'nyc-conversion-halted', edition: 'new-york', date: '2026-07-09' },
    { _id: 'nl-rate-cuts', title: 'Why Rate Cuts May Not Be the CRE Catalyst Investors Expect', slug: 'rate-cuts-cre-catalyst', edition: 'national', date: '2026-07-09' },
    { _id: 'nl-texas-multifamily', title: 'Texas Multifamily Growth Meets Affordability Pressure', slug: 'texas-multifamily-growth', edition: 'texas', date: '2026-07-08' },
    { _id: 'nl-industrial-surge', title: 'Industrial Leasing Surges as Occupiers Lock In Long-Term Deals', slug: 'industrial-leasing-surges-nl', edition: 'national', date: '2026-07-08' },
    { _id: 'nl-nyc-apartment', title: 'NYC Apartment Market Defies Headwinds', slug: 'nyc-apartment-defies', edition: 'new-york', date: '2026-07-07' },
  ];
  for (const n of newsletters) {
    const body = blockWithHeading(
      n.title,
      `Welcome to today's ${n.edition} edition of the Brick Wire newsletter. We bring you the essential news and analysis you need to start your day in commercial real estate.`,
      `In today's issue: ${n.title.toLowerCase()}. This is a key development that CRE professionals should be monitoring closely.`,
      `Stay tuned for more insights and analysis in tomorrow's edition. Thank you for being a valued reader of Brick Wire.`
    );
    await createIfNotExists({
      _id: n._id,
      _type: 'newsletter',
      title: n.title,
      slug: { _type: 'slug', current: n.slug },
      edition: n.edition,
      issueDate: n.date,
      body,
    });
  }

  // ── Podcast Episodes ──
  console.log('\nPodcast Episodes:');
  const episodes = [
    { _id: 'pod-ep-102', title: 'The Future of Office: Flexible, Amenitized, and Smaller', slug: 'future-of-office-flexible', guest: 'Sarah Chen', guestTitle: 'SVP of Office Solutions, CBRE', date: '2026-07-08', desc: 'We sit down with Sarah Chen of CBRE to discuss the evolving office landscape and what tenants are really looking for in 2026 and beyond. From flexible lease terms to amenity-rich environments, we explore how office landlords are adapting to the new normal of hybrid work.' },
    { _id: 'pod-ep-101', title: 'Why Data Center Demand Is Reshaping Industrial CRE', slug: 'data-center-demand-industrial', guest: 'James Park', guestTitle: 'Managing Director, JLL Data Centers', date: '2026-07-01', desc: 'James Park from JLL joins us to explain how the explosive growth of data centers is transforming industrial real estate markets across the country.' },
    { _id: 'pod-ep-100', title: 'Milestone Episode: 100 Episodes of No Cap!', slug: '100-episodes-milestone', guest: 'The Brick Wire Team', guestTitle: '', date: '2026-06-24', desc: 'We celebrate 100 episodes of No Cap by Brick Wire with a special retrospective looking back at our favorite moments, biggest guests, and most important insights from across the CRE industry.' },
    { _id: 'pod-ep-99', title: 'Multifamily Investment Strategy in a High-Rate Environment', slug: 'multifamily-high-rate-strategy', guest: 'Maria Torres', guestTitle: 'VP of Acquisitions, Greystar', date: '2026-06-17', desc: 'Maria Torres of Greystar shares her perspective on multifamily investment strategies in the current high-interest-rate environment.' },
    { _id: 'pod-ep-98', title: 'PropTech Investment Trends to Watch in H2 2026', slug: 'proptech-investment-trends', guest: 'Alex Rivera', guestTitle: 'Partner, MetaProp', date: '2026-06-10', desc: 'Alex Rivera of MetaProp breaks down the PropTech investment landscape, highlighting which sectors are attracting capital and which technologies are poised for breakout growth.' },
    { _id: 'pod-ep-97', title: 'Texas vs. New York: Which Market Wins for CRE Investment?', slug: 'texas-vs-new-york-cre', guest: 'David Kim', guestTitle: 'Senior Director, Hines', date: '2026-06-03', desc: 'David Kim of Hines compares the investment dynamics of two powerhouse markets — Texas and New York — and offers insights on where capital is flowing.' },
  ];
  for (const ep of episodes) {
    await createIfNotExists({
      _id: ep._id,
      _type: 'podcastEpisode',
      title: ep.title,
      slug: { _type: 'slug', current: ep.slug },
      guest: ep.guest,
      guestTitle: ep.guestTitle,
      episodeDate: ep.date,
      description: ep.desc,
      spotifyUrl: 'https://open.spotify.com/show/example',
      appleUrl: 'https://podcasts.apple.com/podcast/example',
      youtubeUrl: 'https://youtube.com/@brickwire',
    });
  }

  // ── Testimonials ──
  console.log('\nTestimonials:');
  const testimonials = [
    { _id: 'testimonial-john-b', name: 'John B.', title: 'Research and Consulting', company: '', quote: 'Brick Wire is a great quick-hit read for anything important that happened yesterday, and I find the analysis quite insightful and unbiased.' },
    { _id: 'testimonial-logan-f', name: 'Logan F.', title: 'Investor', company: 'FTW Investments', quote: "I've been an avid reader of Brick Wire for some time now, and it's become an indispensable part of my day." },
    { _id: 'testimonial-doug-b', name: 'Doug B.', title: 'Managing Director', company: 'Greysteel', quote: 'I find Brick Wire to be a stimulating read every morning, sparking ideas for articles and information to share with clients consistently.' },
    { _id: 'testimonial-rod-s', name: 'Rod S.', title: 'Real Estate Advisor', company: 'The Massimo Group', quote: 'As a professional tracking real estate trends for clients, I find Brick Wire invaluable. It is well-organized, clear, and my daily go-to resource.' },
    { _id: 'testimonial-diann-c', name: 'Diann C.', title: 'Broker', company: 'Commercial Realty', quote: 'Brick Wire puts in smart brevity format what takes me days to get from all the real estate emails and articles I attempt to read.' },
    { _id: 'testimonial-cedric-k', name: 'Cedric K.', title: 'Investment Analyst', company: 'Bayview Partners', quote: 'I really appreciate the concise updates on investing and ROI insights in your newsletter, perfect for my busy schedule.' },
    { _id: 'testimonial-jay-m', name: 'Jay M.', title: 'Vice President', company: 'Blackstone', quote: 'With my first cup of coffee, I start my day by reading Brick Wire. Together they get my brain working.' },
    { _id: 'testimonial-michael-z', name: 'Michael Z.', title: 'Managing Director', company: 'Greystone', quote: 'Brick Wire is my go-to every morning for the best in real estate news – entertaining, insightful, and essential for staying current in our fast-paced industry.' },
  ];
  for (const t of testimonials) {
    await createIfNotExists({
      _id: t._id,
      _type: 'testimonial',
      name: t.name,
      title: t.title,
      ...(t.company ? { company: t.company } : {}),
      quote: t.quote,
      rating: 5,
    });
  }

  // ── Market Reports ──
  console.log('\nMarket Reports:');
  const reports = [
    { _id: 'report-q2-industrial', title: 'Q2 2026 National Industrial Market Report', publisher: 'Brick Wire Research', assetClass: 'Industrial', date: '2026-07-01' },
    { _id: 'report-q2-office', title: 'Q2 2026 National Office Market Report', publisher: 'Brick Wire Research', assetClass: 'Office', date: '2026-07-01' },
    { _id: 'report-q2-multifamily', title: 'Q2 2026 Multifamily Market Report', publisher: 'Brick Wire Research', assetClass: 'Multifamily', date: '2026-06-01' },
    { _id: 'report-h1-investment', title: 'H1 2026 Investment Sales Report', publisher: 'Brick Wire Research', assetClass: 'Investment Sales', date: '2026-06-01' },
    { _id: 'report-construction', title: '2026 Construction Cost Outlook', publisher: 'Brick Wire Research', assetClass: 'Construction', date: '2026-05-01' },
    { _id: 'report-q1-retail', title: 'Q1 2026 National Retail Market Report', publisher: 'Brick Wire Research', assetClass: 'Retail', date: '2026-04-01' },
  ];
  for (const r of reports) {
    await createIfNotExists({
      _id: r._id,
      _type: 'marketReport',
      title: r.title,
      publisher: r.publisher,
      assetClass: r.assetClass,
      reportDate: r.date,
    });
  }

  // ── Pages ──
  console.log('\nPages:');
  const pages = [
    { _id: 'page-about-us', title: 'About Us', slug: 'about-us', desc: 'Learn about Brick Wire and our mission.', body: 'Brick Wire is a digital media company covering the business of real estate. We deliver a well-rounded daily email you can trust, in a format that is digestible, independent, and actionable.' },
    { _id: 'page-advertise', title: 'Advertise', slug: 'advertise', desc: 'Reach thousands of CRE professionals.', body: 'Reach thousands of commercial real estate professionals with Brick Wire advertising. Our engaged audience of investors, brokers, developers, and lenders trusts us for their daily news.' },
    { _id: 'page-careers', title: 'Careers', slug: 'careers', desc: 'Join the Brick Wire team.', body: 'Join the Brick Wire team and help shape the future of real estate media. We are always looking for talented writers, analysts, and engineers.' },
    { _id: 'page-contact', title: 'Contact Us', slug: 'contact-us', desc: 'Get in touch with the Brick Wire team.', body: 'Have a question, tip, or feedback? We would love to hear from you. Email us at hello@brickwire.com.' },
    { _id: 'page-events', title: 'Events', slug: 'events', desc: 'Upcoming Brick Wire events.', body: 'Stay tuned for upcoming Brick Wire events. We regularly host webinars, panel discussions, and networking events for CRE professionals.' },
    { _id: 'page-terms', title: 'Terms of Service', slug: 'terms', desc: 'Terms and conditions.', body: 'These terms govern your use of the Brick Wire website and newsletter. By subscribing, you agree to receive daily email communications from Brick Wire.' },
    { _id: 'page-search-partners', title: 'Search Partners', slug: 'search-partners', desc: 'Our trusted partners.', body: 'Brick Wire partners with leading data providers and search platforms to bring you the best commercial real estate insights.' },
    { _id: 'page-privacy', title: 'Privacy Policy', slug: 'privacy-policy', desc: 'How we handle your data.', body: 'Brick Wire takes your privacy seriously. We collect only the information you provide and never share your data with third parties without your consent.' },
    { _id: 'page-terms-of-use', title: 'Terms of Use', slug: 'terms-of-use', desc: 'Terms governing the use of Brick Wire.', body: 'By accessing Brick Wire, you agree to these terms of use. All content is for informational purposes only.' },
    { _id: 'page-editorial', title: 'Editorial Guidelines', slug: 'editorial-guidelines', desc: 'Our editorial standards.', body: 'Brick Wire maintains the highest editorial standards. Our content is independent, researched, and fact-checked.' },
    { _id: 'page-advertiser-disclosure', title: 'Advertiser Disclosure', slug: 'advertiser-disclosure', desc: 'Transparency about our advertising.', body: 'Brick Wire may receive compensation from some of the products and services reviewed on our site. This does not affect our editorial independence.' },
  ];
  for (const p of pages) {
    const body = blockWithHeading(p.title, p.body);
    await createIfNotExists({
      _id: p._id,
      _type: 'page',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      body,
      seoDescription: p.desc,
    });
  }

  console.log('\n=== Seed complete! ===\n');
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
