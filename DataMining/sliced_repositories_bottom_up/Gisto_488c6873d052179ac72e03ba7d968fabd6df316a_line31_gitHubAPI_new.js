const gitHubAPIMiddleware = ({ dispatch }) => {
  return (next) => (action) => {
    const errorHandler = (error, result) => {
      if (error) {
        if (error.response && error.response.headers['x-github-otp']) {
          setNotification({
            title: 'Two factor authentication',
            body: `${error.response.body.message} (${error.status})`,
            type: 'info'
          });
        }
      }
    };
  };
};
