const auth = require('./auth');
let admin;

const getMembershipsFS = (uid) => {
    const db = admin.firestore();
    return db.collection('workspace_membership')
    .where("user_id", "==", uid)
    .get();
}

const getNewMembershipsFS = (uid) => {
    const db = admin.firestore();
    return db.collection('workspace_membership')
    .where("user_id", "==", uid)
    .where("new", "==", true)
    .get();
}

const updateMembershipFS = (id, content) => {
    const db = admin.firestore();
    return db.collection('workspace_membership')
    .doc(id)
    .update(content);
}

const updateNewMembershipsWithEmailFS = (uid, email) => {
    return getMembershipsFS(email)
    .then(result => {
        let promises = [];
        result.forEach(membership => {
            promises.push(updateMembershipFS(membership.id, {
                user_id: uid
            }));
        });
        return Promise.all(promises);
    })
}

const addWorkspaceMembership = (data) => {
    const db = admin.firestore();
    return db.collection('workspace_membership')
    .add({
        admin: false,
        new: true,
        private: false,
        user_id: data.email,
        workspace_id: data.workspace_id
    });
}

const getWorkspaceFS = (id) => {
    const db = admin.firestore();
    return db.collection('workspaces')
    .doc(id)
    .get();
};

const setup = (a) => {
    admin = a;
    auth.setup(a);
}

const getWorkspace = (req,res) => {
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
        return res.status(403).send('Unauthorized - No Firebase ID token was passed as a Bearer token in the Authorization header.');
    } 
    
    const idToken = req.headers.authorization.split('Bearer ')[1];

    auth.getToken(idToken)
    .then(decodedToken => {
        const uid = decodedToken.uid;
        console.log(uid,'user');
        return getWorkspaceFS(req.params.id)
    })
    .then(result => {
        const workspace = {
            id: result.id,
            name: result.data().name,
        };

        return res.status(200).send(workspace);
    })
    .catch(error => {
        return res.status(500).send({
            message: error.message
        });
    });
};

const getWorkspaces = (req,res) => {
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
        return res.status(403).send('Unauthorized - No Firebase ID token was passed as a Bearer token in the Authorization header.');
    } 
    
    const idToken = req.headers.authorization.split('Bearer ')[1];

    let userWorkspaces = [];
    let promises = [];

    auth.getToken(idToken)
    .then(decodedToken => {
        const uid = decodedToken.uid;
        console.log(uid,'user');
        return getMembershipsFS(uid);
    })
    .then(result => {
        result.forEach(membership => {
            promises.push(getWorkspaceFS(membership.data().workspace_id));
        });
        return Promise.all(promises);
    })
    .then(workspaces => {
        workspaces.forEach(workspace => {
            userWorkspaces = userWorkspaces.concat({
                id: workspace.id,
                name: workspace.data().name,
            });
        })

        return res.status(200).send(userWorkspaces);
    })
    .catch(error => {
        return res.status(500).send({
            message: error.message
        });
    });
};

module.exports = {
    setup,
    getMembershipsFS,
    getNewMembershipsFS,
    updateNewMembershipsWithEmailFS,
    getWorkspaceFS,
    addWorkspaceMembership,
    getWorkspace,
    getWorkspaces
}