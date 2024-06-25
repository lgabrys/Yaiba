  async fetch({ vcsName, user, repo, branch, token, flag }) {
    }/graph/badge.svg`
    return this._requestSvg({
      options: {
        qs: { token, flag },
      },
    })
