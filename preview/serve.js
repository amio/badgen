const path = require('path')
const http = require('http')
const url = require('url')
const qs = require('querystring')
const serveMarked = require('serve-marked')
const badgen = require('..')

const iconDataURI = require('../test/icon-data-uri.js')

const serveBadge = (req, res) => {
  const { pathname, query } = url.parse(req.url)
  const { style, icon } = qs.parse(query)
  const [ subject, status, color ] = pathname.split('/')
    .filter(Boolean)
    .map(s => qs.unescape(s))

  res.statusCode = 200
  res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8')
  res.end(badgen({ subject, status, color, style, icon: icon && iconDataURI }))
}

const md = path.join(__dirname, 'preview.md')
const inlineCSS = `
  body { color: #333; padding-bottom: 5em; max-width: 800px }
  a { text-decoration: none; color: #06D }
  a:hover { text-decoration: underline }
  table { border-spacing: 0 }
  td { padding: 0 1em 0 0; height: 24px; font: 14px/14px sans-serif }
  td a { font: 14px/14px monospace; vertical-align: top }
  img { height: 30px }
`

const serve404 = (req, res) => {
  res.writeHead(404)
  res.end()
}

const port = 3000
http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      return serveMarked(md, {
        title: 'badgen preview',
        preset: 'merri',
        inlineCSS
      })(req, res)
    case '/favicon.ico':
      return serve404(req, res)
    default:
      return serveBadge(req, res)
  }
}).listen(port)

console.log(`Preview served at http://localhost:${port}`)
