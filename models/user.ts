class User {

  private displayName
  private email
  private emailVerified
  private photoURL
  private isAnonymous
  private uid
  private providerData
  private fcmToken

    constructor(userData) {
      this.displayName = userData.displayName
      this.email = userData.email
      this.emailVerified = userData.emailVerified
      this.photoURL = userData.photoURL
      this.isAnonymous = userData.isAnonymous
      this.uid = userData.uid
      this.fcmToken = userData.fcmToken
    }
        
  }module.exports = User
