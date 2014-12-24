// Secret keys

//TODO: Fill in id and secret keys for each SNS
module.exports = {
  'facebookAuth' : {
    'clientID' : 'your secret client id', // your App ID
    'clientSecret' : 'your secret id', // your App Secret
    'callbackURL' : 'http://localhost:3000/auth/facebook/callback'
  },
  'twitterAuth' : {
    'consumerKey' : 'your secret client id',
    'consumerSecret' : 'your secret id ',
    'callbackURL' : 'http://localhost:3000/auth/twitter/callback'
  },
  'googleAuth' : {
    'clientID' : 'your secret client id',
    'clientSecret' : 'your secret id ',
    'callbackURL' : 'http://localhost:3000/auth/google/callback'
  }
};
