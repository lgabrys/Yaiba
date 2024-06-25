import KeybaseProfile from './keybase-profile.js'
export default class KeybaseBTC extends KeybaseProfile {
  async handle({ username }) {
    const options = {
      searchParams: {
        usernames: username,
        fields: 'cryptocurrency_addresses',
      },
    }
  }
}
