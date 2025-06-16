type PageOptions = 'home' | 'about' | 'contact' | 'faq';

const pageDesc: Record<PageOptions, string> = {
  home: 'home',
  about: 'about',
  contact: 'contact',
  faq: 'faq',
};

type User1 = 'guest' | 'user' | 'admin';
const role: Record<User1, number> = {
  guest: 0,
  user: 1,
  admin: 2,
};
