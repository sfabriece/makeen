import * as handlers from './handlers';

export default ({
  dispatcher, renderTemplate, transporter, app,
}) => {
  const { subscribe, onAfter } = dispatcher;

  subscribe('Mail.send', handlers.send({ renderTemplate, transporter, app }));

  onAfter('User.register', handlers.onAfterRegistration);

  subscribe('Mail.sendActivationEmail', handlers.sendActivationEmail);

  onAfter('User.resetPassword', handlers.onAfterPasswordReset);
};
