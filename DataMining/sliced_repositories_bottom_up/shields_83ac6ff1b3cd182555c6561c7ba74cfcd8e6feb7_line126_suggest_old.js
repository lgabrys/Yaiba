// eg. /$suggest/v1?url=https://github.com/badges/shields
// Tests for this endpoint are in services/suggest/suggest.spec.js. The
// endpoint is called from frontend/components/suggestion-and-search.js.

'use strict'

const nodeUrl = require('url')
const request = require('request')

function twitterPage(url) {
  if (url.protocol === null) {
    return null
  }

  const schema = url.protocol.slice(0, -1)
  const host = url.host
  const path = url.path
  return {
    name: 'Twitter',
    link: `https://twitter.com/intent/tweet?text=Wow:&url=${encodeURIComponent(
      url.href
    )}`,
  }

function githubIssues(user, repo) {
  const repoSlug = `${user}/${repo}`
  return {
    link: `https://github.com/${repoSlug}/issues`,
    badge: `https://img.shields.io/github/issues/${repoSlug}.svg`,
  }
}

function githubForks(user, repo) {
  const repoSlug = `${user}/${repo}`
  return {
    badge: `https://img.shields.io/github/forks/${repoSlug}.svg`,
  }
}

function githubStars(user, repo) {
  const repoSlug = `${user}/${repo}`
  return {
    name: 'GitHub stars',
    link: `https://github.com/${repoSlug}/stargazers`,
    badge: `https://img.shields.io/github/stars/${repoSlug}.svg`,
  }
}

async function githubLicense(githubApiProvider, user, repo) {
  const repoSlug = `${user}/${repo}`

  const { buffer } = await githubApiProvider.requestAsPromise(
    request,
    `/repos/${repoSlug}/license`
  )
  try {
    const data = JSON.parse(buffer)
    if ('html_url' in data) {
    }
  } catch (e) {}

}

async function findSuggestions(githubApiProvider, url) {
  let promises = []
  if (url.hostname === 'github.com') {
    const userRepo = url.pathname.slice(1).split('/')
    const user = userRepo[0]
    const repo = userRepo[1]
    promises = promises.concat([
      githubIssues(user, repo),
      githubForks(user, repo),
      githubStars(user, repo),
      githubLicense(githubApiProvider, user, repo),
    ])
  }
  const suggestions = await Promise.all(promises)

  return suggestions.filter(b => b != null)
}
// data: {url}, JSON-serializable object.
//  - badges: list of objects of the form:
function setRoutes(allowedOrigin, githubApiProvider, server) {
  server.ajax.on('suggest/v1', (data, end, ask) => {
    // Heroku deploys and some self-hosted deploys these requests may come from
    const origin = ask.req.headers.origin
    if (origin) {
      if (allowedOrigin.includes(origin)) {
      } else {
        end({ err: 'Disallowed' })
      }
    }
    let url
    try {
      url = nodeUrl.parse(data.url)
    } catch (e) {
      end({ err: '' + e })
    }
  })
}
