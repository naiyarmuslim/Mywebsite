const express = require('express');
const path = require('path');

const router = express.Router();
const ROOT = path.join(__dirname, '..');

/**
 * Whitelist of servable pages: route -> exact file on disk.
 * Nothing outside this explicit map is ever sent, so there is no
 * dynamic ":page" param that could be abused for path traversal.
 */
const PAGE_MAP = {
  '/': path.join(ROOT, 'index.html'),
  '/about': path.join(ROOT, 'pages', 'about.html'),
  '/courses': path.join(ROOT, 'pages', 'courses.html'),
  '/projects': path.join(ROOT, 'pages', 'projects.html'),
  '/content': path.join(ROOT, 'pages', 'content.html'),
  '/how-the-internet-works': path.join(ROOT, 'pages', 'how-the-internet-works.html'),
  '/contact': path.join(ROOT, 'pages', 'contact.html'),
};

// Legacy static paths kept working so existing links/bookmarks don't break.
const LEGACY_MAP = {
  '/index.html': PAGE_MAP['/'],
  '/pages/about.html': PAGE_MAP['/about'],
  '/pages/courses.html': PAGE_MAP['/courses'],
  '/pages/projects.html': PAGE_MAP['/projects'],
  '/pages/content.html': PAGE_MAP['/content'],
  '/pages/how-the-internet-works.html': PAGE_MAP['/how-the-internet-works'],
  '/pages/contact.html': PAGE_MAP['/contact'],
};

for (const [route, file] of Object.entries({ ...PAGE_MAP, ...LEGACY_MAP })) {
  router.get(route, (req, res) => res.sendFile(file));
}

module.exports = router;
