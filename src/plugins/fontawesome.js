import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBell, faUserCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);