/* =============================================================
   post-loader.js: universal blog post renderer
   Used by /posts/<slug>/index.html

   Reads meta.json and content.md from the same directory as the
   page that loads it, parses the markdown via marked.js (loaded
   from CDN by the page), and renders the full post:
     - sticky nav
     - article header (title, subtitle, date, tags, reading time)
     - article body (markdown -> HTML, raw HTML allowed for iframes)
     - footer with author byline and back-to-blog link

   Markdown can include raw HTML, which is required for iframes.
   This is safe because all posts are authored by the site owner.
   ============================================================= */

(function () {
  'use strict';

  const root = document.getElementById('post-root');
  if (!root) {
    console.error('[post-loader] missing #post-root element');
    return;
  }

  const META_PATH = root.dataset.meta || './meta.json';
  const CONTENT_PATH = root.dataset.content || './content.md';

  /* ------- nav ------- */
  function renderNav() {
    return `
      <nav class="post-nav">
        <div class="post-nav-inner">
          <a href="/" class="post-nav-brand">Arnav Amal Ray</a>
          <div class="post-nav-links">
            <a href="/#projects">Work</a>
            <a href="/blog.html">Blog</a>
            <a href="/#connect">Connect</a>
          </div>
        </div>
      </nav>
    `;
  }

  /* ------- header ------- */
  function renderHeader(meta) {
    const tagsHtml = (meta.tags || [])
      .map((t) => `<span class="post-tag">${escapeHtml(t)}</span>`)
      .join('');

    const dateHtml = meta.date ? formatDate(meta.date) : '';

    return `
      <header class="post-header">
        ${meta.eyebrow ? `<div class="post-eyebrow">${escapeHtml(meta.eyebrow)}</div>` : ''}
        <h1 class="post-title">${escapeHtml(meta.title || 'Untitled')}</h1>
        ${meta.subtitle ? `<p class="post-subtitle">${escapeHtml(meta.subtitle)}</p>` : ''}
        <div class="post-meta">
          ${dateHtml ? `<span class="post-meta-item">${dateHtml}</span>` : ''}
          ${meta.reading_time ? `<span class="post-meta-item">${escapeHtml(meta.reading_time)}</span>` : ''}
          ${tagsHtml ? `<div class="post-tags">${tagsHtml}</div>` : ''}
        </div>
      </header>
    `;
  }

  /* ------- footer ------- */
  function renderFooter() {
    return `
      <footer class="post-footer">
        <div class="post-footer-author">
          <div class="post-footer-author-avatar">A</div>
          <div class="post-footer-author-meta">
            <div class="post-footer-author-name">Arnav Amal Ray</div>
            <div class="post-footer-author-tagline">SAP Finance and Tax consultant. Builds AI projects to advise better.</div>
          </div>
        </div>
        <p>If you read this and disagree, or you are seeing the same shifts from a different vantage point, I would like to hear it.</p>
        <a class="post-footer-back" href="/blog.html">&larr; All posts</a>
      </footer>
    `;
  }

  /* ------- error ------- */
  function renderError(message) {
    return `
      <div class="post-error">
        <h1>Could not load post</h1>
        <p>${escapeHtml(message)}</p>
        <p style="margin-top:1.5rem;"><a href="/blog.html">Back to all posts</a></p>
      </div>
    `;
  }

  /* ------- helpers ------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return iso;
    }
  }

  function setDocumentMeta(meta) {
    if (meta.title) document.title = meta.title + ' | Arnav Amal Ray';
    if (meta.summary) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement('meta');
        m.name = 'description';
        document.head.appendChild(m);
      }
      m.content = meta.summary;
    }
  }

  /* ------- main ------- */
  async function init() {
    if (typeof marked === 'undefined') {
      root.innerHTML = renderNav() + renderError('Markdown parser failed to load. Check internet connection.');
      return;
    }

    // Configure marked: allow raw HTML, GitHub-flavoured markdown, line breaks.
    marked.setOptions({ gfm: true, breaks: false, headerIds: true, mangle: false });

    root.innerHTML = renderNav() + '<div class="post-loading">Loading post&hellip;</div>';

    try {
      const [metaRes, contentRes] = await Promise.all([
        fetch(META_PATH, { cache: 'no-cache' }),
        fetch(CONTENT_PATH, { cache: 'no-cache' })
      ]);

      if (!metaRes.ok) throw new Error('meta.json not found (' + metaRes.status + ')');
      if (!contentRes.ok) throw new Error('content.md not found (' + contentRes.status + ')');

      const meta = await metaRes.json();
      let content = await contentRes.text();

      // Strip the first H1 from the markdown if present, since we render
      // the title from meta.json instead. This keeps the markdown standalone-readable.
      content = content.replace(/^#\s+.+\n+/, '');

      setDocumentMeta(meta);

      const bodyHtml = marked.parse(content);

      root.innerHTML =
        renderNav() +
        renderHeader(meta) +
        '<article class="post-body">' + bodyHtml + '</article>' +
        renderFooter();

      // Make iframes inside the body responsive (best-effort)
      root.querySelectorAll('.post-body iframe').forEach((f) => {
        if (!f.hasAttribute('loading')) f.setAttribute('loading', 'lazy');
      });

    } catch (err) {
      console.error('[post-loader]', err);
      root.innerHTML = renderNav() + renderError(err.message || 'Unknown error');
    }
  }

  // Wait for marked.js (loaded via defer in the page) to be available.
  if (typeof marked !== 'undefined') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();
