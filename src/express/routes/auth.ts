import { Request, Response, Router } from 'express';
import passport from 'passport';

function handleEmailSignIn(req: Request<any>, res: Response<any>) {
  if (!req.user) return res.sendStatus(401);
  res.header('Set-Cookie', req.headers.cookie);
  return res.json(req.user);
}

export default () => {
  const router = Router();

  router.post('/signup', passport.authenticate('signup'), handleEmailSignIn);
  router.post('/login', passport.authenticate('login'), handleEmailSignIn);

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
