import Vue from 'vue';
import { Collapse, Button, CollapseItem, Col, Container, Header, Main, Row, Tree} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../css/index.css';

import App from './App.vue';
import store from './store/index.js';

Vue.component(Button.name, Button);
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);
Vue.component(Col.name, Col);
Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Main.name, Main);
Vue.component(Row.name, Row);
Vue.component(Tree.name, Tree)

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
