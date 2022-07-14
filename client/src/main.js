import Vue from 'vue';
import { Collapse, Button, CollapseItem} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);

new Vue({
  render: (h) => h(App),
}).$mount('#acc');
