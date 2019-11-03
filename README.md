# Password Generator

A simple password generator and manager using

- React
- Redux
- Antd
- Firebase

## Installation and Running app

1. Clone the repo: `git clone https://github.com/FlashBlaze/password-generator.git`
2. Go to password-generator: `cd password-generator` and install dependencies: `npm install`
3. Go to [Firebase Console](https://console.firebase.google.com) and create a project
4. Create a Firebase web app and replace the `firebase config` object with the given object
5. Create database in test mode and create 3 collections with collection ids: `masterPasswords`, `passwords` and `users`
6. Install firebase cli globally: `npm i -g firebase-cli` and follow the instructions given [here](https://firebase.google.com/docs/hosting/quickstart)
7. Run `npm run start` to start the project
