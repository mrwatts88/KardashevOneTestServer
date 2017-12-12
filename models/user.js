class User {

    constructor(userData) {
      this.name = userData.name;
      this.displayName = userData.displayName
      this.email = userData.email
      this.emailVerified = userData.emailVerified
      this.photoURL = userData.photoURL
      this.isAnonymous = userData.isAnonymous
      this.uid = userData.uid
      this.providerData = userData.providerData
      this.fcmToken = userData.fcmToken
    }
        
  }module.exports = User;
