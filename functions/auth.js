let admin;

const setup = (a) => {
    admin = a;
}

const getToken = (idToken) => {
    return admin.auth().verifyIdToken(idToken);
}

module.exports = {
    setup,
    getToken
}