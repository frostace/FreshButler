import Vue from 'vue';
import App from './App';
// ==============================
//   fontawesome stuff
// ==============================
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// library.add(faUserSecret);
// Vue.component('font-awesome-icon', FontAwesomeIcon);

// ===
Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	...App
});
app.$mount();
