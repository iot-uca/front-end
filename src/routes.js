import Dashboard from './components/Dashboard.vue';
import SecurityView from './components/SecurityView.vue';
import ActionView from './components/ActionView.vue';
import TriggerView from './components/TriggerView.vue';
import DataStreamView from './components/DataStreamView.vue';



export default [
  //{ path: '/' , component: Dashboard },
  { path: '/dashboard' , component: Dashboard },
  { path: '/security' , component: SecurityView },
  { path: '/dataStreams' , component: DataStreamView },
  { path: '/actions' , component: ActionView },
  { path: '/triggers' , component: TriggerView },

]
