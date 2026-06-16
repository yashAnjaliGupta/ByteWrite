/**
 * CloudFront Function (viewer-request) — attach to the /share/blog/* behavior.
 *
 * AWS CloudFront setup (required for LinkedIn/WhatsApp previews):
 *
 * 1. Origins → Create origin
 *    - Domain: backend.yash-medium-api.workers.dev
 *    - Protocol: HTTPS only
 *    - Origin path: (leave empty)
 *
 * 2. Behaviors → Create behavior (place ABOVE the default /* behavior)
 *    - Path pattern: /share/blog/*
 *    - Origin: backend.yash-medium-api.workers.dev
 *    - Viewer protocol policy: Redirect HTTP to HTTPS
 *    - Allowed HTTP methods: GET, HEAD
 *    - Cache policy: CachingOptimized (or custom, TTL ~1 hour)
 *    - Origin request policy: AllViewerExceptHostHeader (or forward Host to worker)
 *
 *
 * 4. Deploy backend: cd backend && npm run deploy
 *
 * 5. Test: https://bytewrite.yashguptaiiit.in/share/blog/YOUR_BLOG_ID
 *    - View page source → should show og:title, og:image (not the React SPA shell)
