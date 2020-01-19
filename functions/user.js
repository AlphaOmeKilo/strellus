const auth = require('./auth');
let admin;

const setup = (a) => {
    admin = a;
    auth.setup(a);
}

const getUserById = (id) => {
    return admin.auth().getUser(id);
}

const createPrivateWorkspaceFS = () => {
    const db = admin.firestore();
    return db.collection('workspaces')
    .add({
        name: "My Private Workspace"
    });
}

const createWorkspaceMembershipFS = (user_id, workspace_id) => {
    const db = admin.firestore();
    return db.collection('workspace_membership')
    .add({
        admin: true,
        new: false,
        prviate: true,
        user_id: user_id,
        workspace_id: workspace_id
    });
}

const createProfileFS = (uid) => {
    const db = admin.firestore();
    return db.collection('profiles')
    .add({
        user_id: uid
    });
}

const getProfilesFS = (uid) => {
    const db = admin.firestore();
    return db.collection('profiles')
    .where("user_id", "==", uid)
    .get();
}

const getProfileFS = (id) => {
    const db = admin.firestore();
    return db.collection('profiles')
    .doc(id)
    .get();
}

const updateProfileFS = (id, body) => {
    const db = admin.firestore();
    return db.collection('profiles')
    .doc(id)
    .update(body);
}

const updateProfileImage = (req, res) => {
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
        return res.status(403).send('Unauthorized - No Firebase ID token was passed as a Bearer token in the Authorization header.');
    } 
    
    const idToken = req.headers.authorization.split('Bearer ')[1];

    auth.getToken(idToken)
    .then(decodedToken => {
        const uid = decodedToken.uid;
        console.log(uid,'user');
        return getProfilesFS(uid)
    })
    .then(result => {
        let promises = [];
        result.forEach(profile => {
            promises.push(updateProfileFS(profile.id, req.body.data));
        })
        return Promise.all(promises);
    })
    .then(() => {
        return res.status(200).send(req.body.data);
    })
    .catch(error => {
        return res.status(500).send({
            message: error.message
        });
    });
}

const getProfileImage = (req, res) => {
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
        return res.status(403).send('Unauthorized - No Firebase ID token was passed as a Bearer token in the Authorization header.');
    } 
    
    const idToken = req.headers.authorization.split('Bearer ')[1];

    auth.getToken(idToken)
    .then(decodedToken => {
        const uid = decodedToken.uid;
        console.log(uid,'user');
        return getProfilesFS(uid)
    })
    .then(result => {
        let promises = [];
        result.forEach(profile => {
            promises.push(getProfileFS(profile.id));
        })
        return Promise.all(promises);
    })
    .then(result => {
        let profileImages = [];
        result.forEach((userProfile) => {
            profileImages = profileImages.concat({
                profile_image: userProfile.data().profile_image_url
            })
        })  
        return res.status(200).send(profileImages);
    })
    .catch(error => {
        return res.status(500).send({
            message: error.message
        });
    });
}

module.exports = {
    setup,
    getUserById,
    getProfileImage,
    createProfileFS,
    createPrivateWorkspaceFS,
    createWorkspaceMembershipFS,
    updateProfileImage
}