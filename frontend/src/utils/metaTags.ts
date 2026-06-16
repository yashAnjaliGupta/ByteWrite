/**
 * Utility functions for updating Open Graph and Twitter Card meta tags dynamically
 */

export interface MetaTagData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  author?: string;
  publishedDate?: string;
}

export function updateMetaTags(data: MetaTagData) {
  // Update Open Graph meta tags
  updateOrCreateMetaTag('property', 'og:title', data.title);
  updateOrCreateMetaTag('property', 'og:description', data.description);
  updateOrCreateMetaTag('property', 'og:url', data.url || window.location.href);
  
  if (data.image) {
    updateOrCreateMetaTag('property', 'og:image', data.image);
    updateOrCreateMetaTag('property', 'og:image:width', '1200');
    updateOrCreateMetaTag('property', 'og:image:height', '630');
  }

  if (data.author) {
    updateOrCreateMetaTag('property', 'article:author', data.author);
  }

  if (data.publishedDate) {
    updateOrCreateMetaTag('property', 'article:published_time', data.publishedDate);
  }

  // Update Twitter Card meta tags
  updateOrCreateMetaTag('name', 'twitter:title', data.title);
  updateOrCreateMetaTag('name', 'twitter:description', data.description);
  updateOrCreateMetaTag('name', 'twitter:url', data.url || window.location.href);
  
  if (data.image) {
    updateOrCreateMetaTag('name', 'twitter:image', data.image);
  }

  // Update standard meta tags
  updateOrCreateMetaTag('name', 'description', data.description);

  // Update page title
  document.title = `${data.title} - ByteWrite`;

  // Update canonical URL
  updateOrCreateCanonicalLink(data.url || window.location.href);
}

function updateOrCreateMetaTag(attributeName: string, attributeValue: string, content: string) {
  const selector = `meta[${attributeName}="${attributeValue}"]`;
  let meta = document.querySelector(selector) as HTMLMetaElement;

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attributeName, attributeValue);
    document.head.appendChild(meta);
  }

  meta.content = content;
}

function updateOrCreateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }

  link.href = url;
}

export function resetMetaTags() {
  updateMetaTags({
    title: 'ByteWrite — Developer Blogging Platform',
    description: 'Publish developer blogs with ByteWrite. Signup with email OTP, write rich content, image uploads, and manage your posts in a Medium-style app.',
    image: 'https://bytewrite.yashguptaiiit.in/image.png',
    url: 'https://bytewrite.yashguptaiiit.in/',
  });
}
