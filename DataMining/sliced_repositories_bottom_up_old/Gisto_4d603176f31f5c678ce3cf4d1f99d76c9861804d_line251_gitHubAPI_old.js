import * as superagent from 'superagent';
import * as AT from 'constants/actionTypes';
let API = superagent;
if (process.env.NODE_ENV === 'development') {
  API = require('superagent/superagent');
}
const gitHubAPIMiddleware = ({ dispatch }) => {
  return (next) => (action) => {
    if (action.type === AT.CREATE_SNIPPET) {
      API.post(`${getApiUrl('/api/v3')}/gists`)
        .end((error, result) => {
          if (result.statusCode === 201) {
            action.payload.history.push(`/snippet/${result.body.id}`);
          }
        });
    }
  };
};
