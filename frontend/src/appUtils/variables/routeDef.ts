
const PORT = import.meta.env.VITE_PORT_BACK;
const HOST = import.meta.env.VITE_HOST_BACK;
const PATH = `http://${HOST}:${PORT}`;

export const appRedirect = {
  loadingMatcha: '/',
  signin: '/connexion',
  signup: '/inscription',
  forgot: '/mot_de_passe_oublie',
  reinit: '/reinitialisation_mot_de_passe',
  resend: '/renvoi_lien_validation',
  validateEmail: '/validation_email',
  contactus: '/contactez_nous',
  errorInterne: '/erreur_interne',
  errorLoading: '/serveur_indisponible',
  errorNotFound: '/page_introuvable',
  getMe: '/chargement',
  home: '/tableau_de_bord',
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
  LoadingMatcha: `${PATH}/auth/loading_matcha`,
  signin: `${PATH}/auth/signin`,
  signup: `${PATH}/auth/signup`,
  forgot: `${PATH}/auth/forgot`,
  resend: `${PATH}/auth/resend`,
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
