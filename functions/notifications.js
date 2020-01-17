const auth = require('./auth');
const workspaces = require('./workspaces');
let admin;

const setup = (a) => {
    admin = a;
    auth.setup(a);
}

const getNotificationsFS = (workspace_id) => {
    const db = admin.firestore();
    return db.collection('notifications')
    .where("workspace_id", "==", workspace_id)
    .get();
}

const getNotificationFS = (id) => {
    const db = admin.firestore();
    return db.collection('notifications')
    .doc(id)
    .get();
}

const getNotifications = (req,res) => {
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
        return res.status(403).send('Unauthorized - No Firebase ID token was passed as a Bearer token in the Authorization header.');
    } 
    
    const idToken = req.headers.authorization.split('Bearer ')[1];

    let notifications = [];
    let promises = [];

    auth.getToken(idToken)
    .then(decodedToken => {
        const uid = decodedToken.uid;
        console.log(uid,'user');
        workspaces.setup(admin);
        return workspaces.getMembershipsFS(uid);
    })
    .then(result => {
        promises = [];
        result.forEach(membership => {
            promises.push(getNotificationsFS(membership.data().workspace_id));
        });
        return Promise.all(promises);
    })
    .then(notificationsForWorkspace => {
        promises = [];
        notificationsForWorkspace.forEach(workspaceNotifications => {
            workspaceNotifications.forEach(notification => {
                promises.push(getNotificationFS(notification.id)); 
            })
        })

        return Promise.all(promises);
    })
    .then(result => {
        result.forEach(n => {
            notifications = notifications.concat({
                id: n.id,
                workspace_id: n.data().workspace_id,
                doctype: n.data().doctype,
                chain: n.data().chain,
                icon_class: n.data().icon_class,
                message: n.data().message,
                timestamp: n.data().timestamp
            });
        });
        
        return res.status(200).send(notifications);
    })
    .catch(error => {
        return res.status(500).send({
            message: error.message
        });
    });
}


module.exports = {
  setup,
  getNotifications
}