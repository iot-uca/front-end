import Dashboard from './components/Dashboard.vue';
import DataStreamView from './components/DataStreamView.vue';
import CommandsView from './components/CommandsView.vue';
import ActionView from './components/ActionView.vue';
import TriggerView from './components/TriggerView.vue';
import AboutView from './components/AboutView.vue'



export default [
  { path: '/' , component: Dashboard },
  { path: '/dashboard' , component: Dashboard },
  { path: '/dataStreams' , component: DataStreamView },
  { path: '/commands' , component: CommandsView },
  { path: '/actions' , component: ActionView },
  { path: '/triggers' , component: TriggerView },
  { path: '/about' , component: AboutView },

]
