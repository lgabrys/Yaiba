import moment from 'moment'
import depDiff from 'dep-diff'
import Batch from 'david/lib/batch'
export default ({db, registry, github, githubConfig}) => {
  const batch = new Batch()
  const Manifest = new EventEmitter()
  Manifest.hasCachedManifest = (user, repo, opts, cb) => {
    if (!cb) {
      cb = opts
      opts = {}
    }
    opts = opts || {}
  }
  Manifest.getManifest = (user, repo, opts, cb) => {
    if (!cb) {
      cb = opts
      opts = {}
    }
    opts = opts || {}
    const manifestKey = createManifestKey(user, repo, opts)
    const batchKey = manifestKey + (opts.authToken || '')
    db.get(manifestKey, (err, manifest) => {
      const gh = github.getInstance(opts.authToken)
      const ghOpts = {user: user, repo: repo, path: (opts.path ? opts.path + '/' : '') + 'package.json'}
      if (opts.ref) {
        ghOpts.ref = opts.ref
      }
      if (manifest) {
        ghOpts.headers = { 'If-None-Match': manifest.etag }
      }
      gh.repos.getContent(ghOpts, (err, resp) => {
        if (err) {
          if (err.code === '504' && !opts.noCache && manifest && !manifest.private) {
            console.log('Using expired cached manifest', manifestKey, manifest.data.name, manifest.data.version)
            return batch.call(batchKey, (cb) => cb(null, manifest.data))
          }

          console.error('Failed to get package.json', user, repo, opts.path, opts.ref, err)
          return batch.call(batchKey, (cb) => cb(err))
        }

        if (!opts.noCache && manifest && manifest.expires > Date.now()) {
          console.log('Using cached private manifest', manifest.data.name, manifest.data.version, opts.ref)
          return batch.call(batchKey, (cb) => cb(null, manifest.data))
        }

        if (!opts.noCache && manifest && resp.meta && resp.meta.status === '304 Not Modified') {
          console.log('Using unmodified manifest', manifest.data.name, manifest.data.version, opts.ref)

          manifest.expires = moment().add(moment.duration({ hours: 1 })).valueOf()

          return db.put(manifestKey, manifest, (err) => {
            if (err) return batch.call(batchKey, (cb) => cb(err))
            batch.call(batchKey, (cb) => cb(null, manifest.data))
          })
        }

        let data

        try {
          // JSON.parse will barf with a SyntaxError if the body is ill.
          data = JSON.parse(new Buffer(resp.content, resp.encoding).toString().trim())
        } catch (err) {
          console.error('Failed to parse package.json', resp, err)
          return batch.call(batchKey, (cb) => {
            cb(new Error('Failed to parse package.json: ' + (resp && resp.content)))
          })
        }

        if (!data) {
          console.error('Empty package.json')
          return batch.call(batchKey, (cb) => cb(new Error('Empty package.json')))
        }

        console.log('Got manifest', data.name, data.version, opts.ref)

        if (!opts.authToken) {
          // There was no authToken so MUST be public
          onGetRepo(null, {'private': false})
        } else {
          // Get repo info so we can determine private/public status
          gh.repos.get({user: user, repo: repo}, onGetRepo)
        }

        function onGetRepo (err, repoData) {
          if (err) {
            console.error('Failed to get repo data', user, repo, err)
            return batch.call(batchKey, (cb) => cb(err))
          }

          const oldManifest = manifest

          data.ref = opts.ref
          manifest = {
            data,
            etag: resp.meta.etag,
            private: repoData.private,
            expires: moment().add(moment.duration({ hours: 1 })).valueOf()
          }

          db.put(manifestKey, manifest, (err) => {
            if (err) {
              console.error('Failed to save manifest', manifestKey, err)
              return batch.call(batchKey, (cb) => cb(err))
            }

            console.log('Cached at', manifestKey)

            batch.call(batchKey, (cb) => cb(null, manifest.data))

            if (!oldManifest) {
              Manifest.emit('retrieve', manifest.data, user, repo, opts.path, opts.ref, repoData.private)
            } else {
              const oldDependencies = oldManifest ? oldManifest.data.dependencies : {}
              const oldDevDependencies = oldManifest ? oldManifest.data.devDependencies : {}
              const oldPeerDependencies = oldManifest ? oldManifest.data.peerDependencies : {}
              const oldOptionalDependencies = oldManifest ? oldManifest.data.optionalDependencies : {}

              let diffs

              if (Manifest.listenerCount('dependenciesChange')) {
                diffs = depDiff(oldDependencies, data.dependencies)

                if (diffs.length) {
                  Manifest.emit('dependenciesChange', diffs, manifest.data, user, repo, opts.path, opts.ref, repoData.private)
                }
              }

              if (Manifest.listenerCount('devDependenciesChange')) {
                diffs = depDiff(oldDevDependencies, data.devDependencies)

                if (diffs.length) {
                  Manifest.emit('devDependenciesChange', diffs, manifest.data, user, repo, opts.path, opts.ref, repoData.private)
                }
              }

              if (Manifest.listenerCount('peerDependenciesChange')) {
                diffs = depDiff(oldPeerDependencies, data.peerDependencies)

                if (diffs.length) {
                  Manifest.emit('peerDependenciesChange', diffs, manifest.data, user, repo, opts.path, opts.ref, repoData.private)
                }
              }

              if (Manifest.listenerCount('optionalDependenciesChange')) {
                diffs = depDiff(oldOptionalDependencies, data.optionalDependencies)

                if (diffs.length) {
                  Manifest.emit('optionalDependenciesChange', diffs, manifest.data, user, repo, opts.path, opts.ref, repoData.private)
                }
              }
            }
          })
        }
      })
    })
  }
}
