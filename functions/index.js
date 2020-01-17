const workspaces = require('./workspaces');
const notifications = require('./notifications');
const user = require('./user');

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//Pass functions and admin down
workspaces.setup(admin);
notifications.setup(admin);
user.setup(admin);

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
exports.user = functions.region("europe-west2").https.onRequest(userApp);
