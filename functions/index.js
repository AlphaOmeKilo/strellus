const workspaces = require('./workspaces');
const notifications = require('./notifications');

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//Pass functions and admin down
workspaces.setup(admin);
notifications.setup(admin);

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
