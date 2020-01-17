const auth = require('./auth');
let admin;

const getMembershipsFS = (uid) => {
    const db = admin.firestore();
    return db.collection('workspace_membership')
    .where("user_id", "==", uid)
    .get();
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
            name: result.data().name
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
            const workspaceData = workspace.data();

            userWorkspaces = userWorkspaces.concat({
                id: workspace.id,
                name: workspaceData.name,
                new: workspace.data().new,
                admin: workspace.data().admin,
                private: workspace.data().private
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
    getWorkspace,
    getWorkspaces
}