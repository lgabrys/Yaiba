import KeybaseProfile from './keybase-profile.js'
export default class KeybaseXLM extends KeybaseProfile {
  async handle({ username }) {
    const options = {
      qs: {
        usernames: username,
        fields: 'stellar',
      },
    }
  }
}
