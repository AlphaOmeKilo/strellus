import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faUserCircle, faThLarge, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBell, faUserCircle, faThLarge, faPlus);

Vue.component('font-awesome-icon', FontAwesomeIcon);