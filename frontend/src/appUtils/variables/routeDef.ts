
const PORT = import.meta.env.VITE_PORT_BACK;
const HOST = import.meta.env.VITE_HOST_BACK;
const PATH = `http://${HOST}:${PORT}`;

export const appRedirect = {
  loading: '/',
  signin: '/connexion',
  signup: '/inscription',
  forgot: '/mot_de_passe_oublie',
  reinit: '/reinitialisation_mot_de_passe',
  resend: '/renvoi_lien_validation',
  validateEmail: '/validation_email',
  contactus: '/contactez_nous',
  getMe: '/',
  home: '/tableau_de_bord',
  errorInternal: '/erreur_interne',
};

export const disconnectedRoute = {
  signup: `${PATH}/auth/signup`,
  signin: `${PATH}/auth/signin`,
  forgot: `${PATH}/auth/forgot`,
  resend: `${PATH}/auth/resend`,
  reinit: `${PATH}/auth/reinit_password`,
  validateEmail: `${PATH}/auth/validate_email`,
};

export const authRoute = {
  loading: `${PATH}/auth/loading`,
  signin: `${PATH}/auth/signin`,
  signup: `${PATH}/auth/signup`,
  forgot: `${PATH}/auth/forgot`,
  resend: `${PATH}/auth/resend`,
  reinit: `${PATH}/auth/reinit`,
  validateEmail: `${PATH}/auth/validate_email`,
};

export const mailRoute = {
  contactOff: `${PATH}/mailer/contact_off`,
  contactOn: `${PATH}/mailer/contact_on`,
};

export const searchRoute = {
  searchLogin: `${PATH}/search/login`,
  searchData: `${PATH}/search/data`,
};

export const listRoute = {
  getExistingTagsList: `${PATH}/list/get_existing_tags_list`,

};

export const userRoute = {
  getMe: `${PATH}/user/getme`,

};

export const socketRoute = {
  path: `${PATH}`,
  connected: 'connected', //getMe.tsx
  connection_failed: 'connection_failed', //getMe.tsx
  validEmail: 'validEmail',
  updateToken: 'updateToken',
  sendView: 'sendView', //{receiverId: number}

  isConnected: 'isUserConnected',
  receptIsConnected: 'receptIsConnected',
};
