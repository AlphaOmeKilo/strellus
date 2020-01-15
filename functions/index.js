const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp(functions.config().firebase);

const getToken = (idToken) => {
    return admin.auth().verifyIdToken(idToken);
}

const getMemberships = (uid) => {
    const db = admin.firestore();
    return db.collection('workspace_membership')
    .where("user_id", "==", uid)
    .get();
}

const getWorkspaceFromMembership = (membership) => {
    const db = admin.firestore();
    return db.collection('workspaces')
    .doc(membership.data().workspace_id)
    .get();
};

exports.getWorkspaces = functions.region("europe-west2").https.onRequest((req,res) => {
    return cors(req, res, () => {
        if(req.method !== "GET") {
            return res.status(405).send({
                message: "Method not allowed"
            });
        }

        if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
            return res.status(403).send('Unauthorized - No Firebase ID token was passed as a Bearer token in the Authorization header.');
        } 
        
        const idToken = req.headers.authorization.split('Bearer ')[1];

        let userWorkspaces = [];
        let promises = [];

        getToken(idToken)
        .then(decodedToken => {
            const uid = decodedToken.uid;
            console.log(uid,'user');
            return getMemberships(uid);
        })
        .then(result => {
            result.forEach(membership => {
                promises.push(getWorkspaceFromMembership(membership));
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
    });
});
