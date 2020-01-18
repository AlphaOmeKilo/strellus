const auth = require('./auth');
const workspaces = require('./workspaces');
const user = require('./user');
let admin;

const setup = (a) => {
    admin = a;
    auth.setup(a);
}

const inviteUser = (req, res) => {
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
        return res.status(403).send('Unauthorized - No Firebase ID token was passed as a Bearer token in the Authorization header.');
    } 
    
    const idToken = req.headers.authorization.split('Bearer ')[1];

    auth.getToken(idToken)
    .then(decodedToken => {
        const uid = decodedToken.uid;
        console.log(uid,'user');
        workspaces.setup(admin);
        return workspaces.addWorkspaceMembership(req.body.data);
    })
    .then(result => {
        return res.status(200).send(result);
    })
    .catch(error => {
        return res.status(500).send({
            message: error.message
        });
    });
}

const getInvitations = (req, res) => {
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
        return res.status(403).send('Unauthorized - No Firebase ID token was passed as a Bearer token in the Authorization header.');
    } 
    
    const idToken = req.headers.authorization.split('Bearer ')[1];

    workspaces.setup(admin);
    user.setup(admin);
    
    let promises = [];
    let uid = '';

    auth.getToken(idToken)
    .then(decodedToken => {
        uid = decodedToken.uid;
        console.log(uid,'user');
        return user.getUserById(uid);
    })
    .then(userObj => {
        return workspaces.updateNewMembershipsWithEmailFS(userObj.uid, userObj.email);
    })
    .then(() => {
        promises = [];
        promises.push(workspaces.getNewMembershipsFS(uid));
        return Promise.all(promises);
    })
    .then(result => {
        promises = [];
        result.forEach(newMembershipArray => {
            newMembershipArray.forEach(newMembership => {
                promises.push(workspaces.getWorkspaceFS(newMembership.data().workspace_id));
            });
        });
        return Promise.all(promises);
    })
    .then(workspaces => {
        let invitations = [];
        workspaces.forEach(workspace => {
            console.log(workspace.id, 'workspace');
            invitations = invitations.concat({
                id: workspace.id,
                name: workspace.data().name,
            });
        })

        return res.status(200).send(invitations);
    })
    .catch(error => {
        return res.status(500).send({
            message: error.message
        });
    });
}

module.exports = {
    setup,
    inviteUser,
    getInvitations
}