import KeybaseProfile from './keybase-profile.js'
export default class KeybaseZEC extends KeybaseProfile {
  async handle({ username }) {
    const options = {
      qs: {
        usernames: username,
        fields: 'cryptocurrency_addresses',
      },
    }
  }
}
