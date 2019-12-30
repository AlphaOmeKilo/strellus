<template>
    <div>
        <div>
            <input type="file" @change="setupCropper">
        </div>
        <!-- <button @click="onUpload" class="button button-light">Upload Profile Image</button> -->
    
    
        <div class="st-flex">
            <div class="image-container st-vh-center">
                <img class="image-preview" v-show="objectUrl" :src="objectUrl" ref="source">
            </div>
            <div class="image-container st-vh-center">
                <img class="image-preview image-preview-actual" v-show="previewCropped" :src="previewCropped">
            </div>
        </div>
        <button @click="upload">Upload</button>
    
    
    </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import 'cropperjs/dist/cropper.css';

import Cropper from 'cropperjs';
import debounce from 'lodash/debounce'
import { mapActions } from 'vuex';

export default {
    name: "ProfileImageUploader",
    data: () => ({
        selectedFile: null,
        cropper: null,
        objectUrl: null,
        previewCropped: null,
    }),
    methods: {
        ...mapActions("UserStore", ["updateProfileImage"]),

        setupCropper(event) {
            if (this.cropper) {
                this.cropper.destroy()
            }

            this.selectedFile = event.target.files[0];

            var reader = new FileReader();

            reader.onload = (e) => {
                this.objectUrl = e.target.result;
                this.$nextTick(this.setupCropperInstance)
            }
            const result = reader.readAsDataURL(this.selectedFile);

        },
        setupCropperInstance() {
            this.cropper = new Cropper(this.$refs.source, {
                aspectRatio: 1,
                crop: debounce(this.updatePreview, 257)
            });
        },
        updatePreview(event) {
            const canvas = this.cropper.getCroppedCanvas();
            this.previewCropped = canvas.toDataURL('image/png');
        },
        upload() {
            const storageRef = firebase.storage().ref();

            var profileImageRef = storageRef.child(`${firebase.auth().currentUser.uid}/profile/image.png`);

            const canvas = this.cropper.getCroppedCanvas();
            let image;
            canvas.toBlob(blob => {
                profileImageRef.put(blob).then(snapshot => {

                    profileImageRef.getDownloadURL().then(url => {
                        this.updateProfileImage({url});

                    }).catch(function(error) {
                        // Handle any errors
                    });
                });
            });

        }
    }
}
</script>

<style lang="scss" scoped>
.button {
    margin: 20px;
}

.image-container {
    width: 50%;
    max-height: 400px;
}

.image-preview {
    max-width: 100%;
    &-actual {
        max-width: 50%;
        border-radius: 50%;
    }
}
</style>