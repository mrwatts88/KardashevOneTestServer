var User = /** @class */ (function () {
    function User(userData) {
        this.displayName = userData.displayName;
        this.email = userData.email;
        this.emailVerified = userData.emailVerified;
        this.photoURL = userData.photoURL;
        this.isAnonymous = userData.isAnonymous;
        this.uid = userData.uid;
        this.fcmToken = userData.fcmToken;
    }
    return User;
}());
module.exports = User;
//# sourceMappingURL=user.js.map