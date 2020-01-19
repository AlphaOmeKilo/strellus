const workspaces = require('./workspaces');
const notifications = require('./notifications');
const user = require('./user');
const invitations = require('./invitations');

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//Pass functions and admin down
workspaces.setup(admin);
notifications.setup(admin);
user.setup(admin);
invitations.setup(admin);

// Workspaces API
const workspaceApp = express();
workspaceApp.use(cors);
workspaceApp.get('/', (req, res) => workspaces.getWorkspaces(req, res));
workspaceApp.get('/:id', (req,res) => workspaces.getWorkspace(req, res));
exports.workspaces = functions.region("europe-west2").https.onRequest(workspaceApp);

//Notifications API
const notificationsApp = express();
notificationsApp.use(cors);
notificationsApp.get('/', (req, res) => notifications.getNotifications(req, res));
exports.notifications = functions.region("europe-west2").https.onRequest(notificationsApp);

//User API
const userApp = express();
userApp.use(cors);
userApp.get('/profile-image', (req, res) => user.getProfileImage(req, res));
userApp.post('/profile-image', (req, res) => user.updateProfileImage(req, res));
exports.user = functions.region("europe-west2").https.onRequest(userApp);

//Invitations API
const invitationsApp = express();
invitationsApp.use(cors);
invitationsApp.put('/', (req, res) => invitations.inviteUser(req,res));
invitationsApp.get('/', (req, res) => invitations.getInvitations(req,res));
exports.invitations = functions.region("europe-west2").https.onRequest(invitationsApp);


// Triggered Methods

exports.createPrivateWorkspace = functions.region("europe-west2").auth.user().onCreate((userObj) => {
    user.createPrivateWorkspaceFS()
    .then(workspace => {
        console.info(`user ${userObj.uid} had private workspace ${workspace.id} created`);
        return user.createWorkspaceMembershipFS(userObj.uid, workspace.id);
    })
    .then(membership => {
        console.info(`user ${userObj.uid} had membership ${membership.id} created`);
        return 0;
    })
    .catch(error => {
        return {
            message: error.message
        };
    });
});

exports.createUserProfile = functions.region("europe-west2").auth.user().onCreate((userObj) => {
    user.createProfileFS(userObj.uid)
    .then(profile => {
        console.info(`user ${userObj.uid} had profile ${profile.id} created`);
        return 0;
    })
    .catch(error => {
        return {
            message: error.message
        };
    });
});