import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonical?: string;
}

const SEO = ({ 
  title = "EventHub - Discover Amazing Events Near You",
  description = "Find and attend incredible events with EventHub. From music festivals to tech conferences, discover your next adventure.",
  keywords = "events, concerts, conferences, festivals, tickets, networking, entertainment",
  image = "/og-image.jpg",
  url = window.location.href,
  canonical
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph meta tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);

    // Twitter meta tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Canonical URL
    let canonical_elem = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical_elem) {
      canonical_elem = document.createElement('link');
      canonical_elem.rel = 'canonical';
      document.head.appendChild(canonical_elem);
    }
    canonical_elem.href = canonical || url;

  }, [title, description, keywords, image, url, canonical]);

  return null;
};

export default SEO;