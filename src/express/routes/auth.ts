import { Router } from 'express';
import passport from 'passport';

export default () => {
  const router = Router();

  router.get(
    '/google',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    })
  );

  router.get(
    '/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      const params = `cookie=${encodeURI(req.headers.cookie!)}`;
      res.redirect(`https://auth.expo.io/@olivierwilkinson/actone?${params}`);
    }
  );

  router.post('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
  });

  return router;
};
