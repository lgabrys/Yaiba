import KeybaseProfile from './keybase-profile.js'
export default class KeybasePGP extends KeybaseProfile {
  async handle({ username }) {
    const options = {
      qs: {
        usernames: username,
        fields: 'public_keys',
      },
    }
  }
}
