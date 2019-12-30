// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
const cors = require('cors')({origin: true});
const Busyboy = require('busboy');
const fs = require('fs');

const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectID: "strellus-68be0",
    keyFilename: "strellus-68be0-firebase-adminsdk-g2kus-ae5332bf83.json"
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp();

exports.uploadFile = functions.region("europe-west2").https.onRequest((req,res) => {
    cors(req, res, () => {
        if(req.method !== "POST") {
            res.status(405).json({
                message: "Method not allowed"
            })
        }
        const busyboy = new Busyboy({headers: req.headers});
        let uploadData = null;
        busyboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const filepath = path.join(os.tmpdir(), filename);
            uploadData = { file: filepath, type: mimetype };
            file.pipe(fs.createWriteStream(filepath));
        });
        busyboy.on('finish', () => {
            const bucket = storage.bucket('strellus-68be0.appspot.com');
            bucket.upload(uploadData.file, {
                uploadType: 'media',
                metadata: {
                    metadata: {
                        contentType: uploadData.type
                    }
                }
            }).then(() => {
                return res.status(200).json({
                    message: "file uploaded"
                })
            }).catch(err => {
                return res.status(500).json({
                    message: err
                })
            })
        });
        busyboy.end(req.rawBody);
    });
});
