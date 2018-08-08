import Vue from 'vue';
import Vuex from 'vuex'

import { addElementToFilteredOnes, getPagesNeeded, getElementsToShowInTable} from './store-helpers'


Vue.use(Vuex); // tell Vue you want to use Vuex plugin

export const store = new Vuex.Store({ // we need to export it to make it avaibla for other components to use the store
  strict: true, // no permite que se hagan cambios de estado por fuera del store

  state:{
    options:[
      {name: 'uno', value: 1},
      {name: 'dos', value: 2},
      {name: 'tres', value: 3},
      {name: 'cuatro', value: 4},
    ],

//##########################################################################################
// Backend details
//##########################################################################################

    backendEndPoint: "http://192.168.99.100:8090",

//##########################################################################################
// Burguer menu model
//##########################################################################################

    sideNavStyle:{
      backgroundColor: '',
      width: ''
    },
    renderDashboardView : true,
    renderSecurityView : false,
    renderActionAddView : false,
    renderAboutView : false,
    renderTriggerAddView : false,
    renderDataStreamView : false,

//##########################################################################################
// Data Stream model
//##########################################################################################

    dataStreamsConfigured:[
      {id: 0, name: 'Solar light in garden'},
      {id: 1, name: 'Temperature inside the house'},
      {id: 2, name: 'Temperature outside the house'},
      {id: 3, name: 'Car Volumetric Sensor'},
      {id: 4, name: 'Pressure inside the house'},
      {id: 5, name: 'UV-Intensity'},
      {id: 6, name: 'Humidity inside guest-room'},
      {id: 7, name: 'Humidity outside the house'},
      {id: 8, name: 'Pressure outside the house'},
      {id: 9, name: 'Movement sensor in atic'}
    ],

    dataStreams : [
      {name: 'Temperature', current_value: '25', last_updated: '2 secs ago'},
      {name: 'Pressure', current_value: '1023', last_updated: '1 sec ago'},
      {name: 'Humidity', current_value: '90%', last_updated: '11 mins ago'},
      {name: 'UV-Intensity', current_value: '0.78', last_updated: '3 mins ago'},
      {name: 'Door Sensor', current_value: 'Open', last_updated: '53 secs ago'}
    ],

    dataStreamNotUpdatedFor:{
      months:0,
      weeks:0,
      days:0,
      hours:0,
      minutes:0,
      seconds:0,
    },

    dataStreamToAdd:'',

    editDataStream: false,

    showAddDataStream: true,
    dataStreamFilter: undefined,
    pagesNeededForDataStreams: 0,
    maxDataStreamsPerPage: 5,
    dataStreamsForPage: [],
    filteredDataStreams: [],
    intermediateDataStreams:[],
    activeDataStream:[],
    dataStreamSelected: [],
    displayLoadingFeedbackDataStreams: false,

    showAddDataStreamModal: false,



    elementsToDelete: [],
    displayLoadingFeedback: false,


//##########################################################################################
// Actions model
//##########################################################################################

    // actions variables
    existingActions:[
      {id: 1, name: 'Tweet', type:'http_request', method:'POST', url:'https://twitter.com', version:'1.1', body:[{key:'name', value:'john'}, {key:'last-name', value:'doe'}], headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
      {id: 2, name: 'Make Facebook Post', type:'http_request', method:'POST', url:'https://facebook.com', version:'1.1', body:[{key:'name', value:'john'}, {key:'last-name', value:'doe'}], headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
      {id: 3, name: 'Send Email', type:'http_request', method:'POST', url:'https://gmail.com', version:'1.1', body:[{key:'name', value:'john'}, {key:'last-name', value:'doe'}], headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
      {id: 4, name: 'Start Engine Alfa', type:'http_request', method:'POST', url:'http://device1.com', version:'1.1', body:[{key:'name', value:'john'}, {key:'last-name', value:'doe'}], headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
      {id: 5, name: 'Sense Temperature', type:'http_request', method:'GET', url:'http://device2.com', version:'1.1', body:[{key:'name', value:'john'}, {key:'last-name', value:'doe'}], headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
      {id: 6, name: 'Command A', type:'command', priority:'High'},
      {id: 7, name: 'Command B', type:'command', priority:'Medium'},
      {id: 8, name: 'Command C', type:'command', priority:'Low'},
    ],

    actionFilter: undefined,
    pagesNeededForActions: 0,
    maxActionsPerPage: 5,
    actionsForPage: [],
    filteredActions:[],
    intermediateActions:[],
    activeAction:[],

    elemsForActionRequestBody: 0,
    activeIdsForHttpRequestBody: [],
    actionBody:'{"foo":"bar", "jane":"doe"}',
    activeIdsForHttpRequestHeader: [],


    existingHttpMethods:[
      {id:0, name:'DELETE'},
      {id:1, name:'GET'},
      {id:2, name:'HEAD'},
      {id:3, name:'OPTIONS'},
      {id:4, name:'PATCH'},
      {id:5, name:'POST'},
      {id:6, name:'PUT'},
      {id:7, name:'TRACE'},
    ],

    existingHttpVersions:[
      {id:0, name: 'HTTP/1.0'},
      {id:1, name: 'HTTP/1.1'}
    ],

    existingPriorities:[
      {id:0, name:'High'},
      {id:1, name:'Medium'},
      {id:2, name:'Low'},
    ],

//##########################################################################################
// Triggers model
//##########################################################################################

    validJson: true,
    showTriggersOptions : false,

    existingTriggers: [
      { name: 'Trigger1', action : 'Tweet', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius', 'Temperature current value > 24 Celsius', 'Time interval' ]},

      {name: 'Trigger2', action: 'Make Facebook Post', policy: {type: 'data_point_registration',	elem: 'Temperature' }, conditions: ['Always']	},

      {name: 'Trigger3', action: 'Send Email', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius']},

      {name: 'Trigger4', action: 'Start Engine Alfa', policy: {type:'data_point_registration', elem: 'Temperature'}, conditions: ['Always']},

      {name: 'Trigger5', action: 'Sense Temperature', policy: {type: 'time_interval', elem: 'Fridays' }, conditions: ['Always']},

      { name: 'Trigger6', action : 'Start Engine Alfa', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius', 'Temperature current value > 24 Celsius', 'Time interval' ]},

      {name: 'Trigger7', action: 'Start Engine Alfa', policy: {type: 'data_point_registration',	elem: 'Temperature' }, conditions: ['Always']	},

      {name: 'Trigger8', action: 'Start Engine Alfa', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius']},

      {name: 'Trigger9', action: 'Make Facebook Post', policy: {type:'data_point_registration', elem: 'Temperature'}, conditions: ['Always']},

      {name: 'Trigger10', action: 'Make Facebook Post', policy: {type: 'time_interval', elem: 'Fridays' }, conditions: ['Always']},

      { name: 'Trigger11', action : 'Make Facebook Post', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius', 'Temperature current value > 24 Celsius', 'Time interval' ]},

      {name: 'Trigger12', action: 'Send Email', policy: {type: 'data_point_registration',	elem: 'Temperature' }, conditions: ['Always']	},

      {name: 'Trigger13', action: 'Send Email', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius']},

      {name: 'Trigger14', action: 'Send Email', policy: {type:'data_point_registration', elem: 'Temperature'}, conditions: ['Always']},

      {name: 'Trigger15', action: 'Send Email', policy: {type: 'time_interval', elem: 'Fridays' }, conditions: ['Always']},
    ],

    triggersForPage: [],
    maxTriggersPerPage: 5,
    pagesNeededForTriggers: 0,
    triggerFilter: undefined,
    filteredTriggers:[],
    intermediateTriggers:[],
    activeTrigger:[],

    timeGranularityOptions: [
      {id: 1, name: '10 seconds'},
      {id: 2, name: '10 minutes'},
      {id: 3, name: '30 minutes'},
      {id: 4, name: '1 hour'},
    ],


    triggerConditions:[
      {id: 1, name: 'Always'},
      {id: 2, name: 'On Data-Stream value'},
      {id: 3, name: 'When Data-Stream has not been updated'},
      {id: 4, name: 'Time interval'},
    ],

//##########################################################################################
// Pagination model
//##########################################################################################

    optionsOfEntriesPerPage:[
      {id:0, value:5},
      {id:1, value:10},
      {id:2, value:15},
      {id:3, value:20},
    ],
    currentPage: 1,
    pagesNeeded: undefined,
    elementsInCurrentPage: undefined,

//##########################################################################################
// Security model
//##########################################################################################

    securityKey : '91c-xdy-w5w',

  },

  getters:{
    dataStreamFilter: state => {
      return state.dataStreamFilter;
    }
  },

  mutations: { // si uso mutaciones, el developer mediante las vue tools puede ser claramente el nombre de la mutación
    // que ocasionó el cambio de estado. Por lo tanto facilita el debugging.

    // no sirven para comunicarse contra backends, xq es una transaccion asíncrona. Toma tiempo que responda.
    // por ejemplo, si miro en vue tools, voy a ver que se ejecutó la mutación X, pero la vista no se va a actualizar
    // hasta tanto el backend haya respondido. Si tengo N mutaciones asincronas, es un lío poder detectar cual se ejcutó
    // y el resultado de la misma (la mutación no se lista cuando terminó sino cuando se lanzó).
    reduceOptions: state => {
      state.options.forEach(option => {
        option.value += 1;

      })
    },
//##########################################################################################
// Burguer menu mutations
//##########################################################################################

    openNav: state => {
      state.sideNavStyle.backgroundColor = "#111";
      state.sideNavStyle.width = "250px";
    },

    showDashboardView: state => {
      state.renderDashboardView = true;
      state.renderDataStreamView = false;
      state.renderActionAddView = false;
      state.renderTriggerAddView = false;
      state.renderSecurityView = false;
      state.renderAboutView = false;
    },

    closeNav: state => {
      state.sideNavStyle.backgroundColor = "white";
      state.sideNavStyle.width = "0";
    },

    showDataStreamView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = true;
      state.renderActionAddView = false;
      state.renderTriggerAddView = false;
      state.renderSecurityView = false;
      state.renderAboutView = false;
    },

    showActionView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = false;
      state.renderActionAddView = true;
      state.renderTriggerAddView = false;
      state.renderSecurityView = false;
      state.renderAboutView = false;
    },

    showTriggerView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = false;
      state.renderActionAddView = false;
      state.renderTriggerAddView = true;
      state.renderSecurityView = false;
      state.renderAboutView = false;
    },

    showSecurityView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = false;
      state.renderActionAddView = false;
      state.renderTriggerAddView = false;
      state.renderSecurityView = true;
      state.renderAboutView = false;
    },

    showAboutView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = false;
      state.renderActionAddView = false;
      state.renderTriggerAddView = false;
      state.renderSecurityView = false;
      state.renderAboutView = true;
    },

//##########################################################################################
// Pagination mutations
//##########################################################################################

    setFilteredDataStreamsToAllConfigured:  state => {
      console.log("### Entering  setFilteredDataStreamsToAllConfigured");
      state.filteredDataStreams = state.dataStreamsConfigured;
    },

    setFilteredActionsToAllConfigured:  state => {
      console.log("### Entering  setFilteredActionsToAllConfigured");
      state.filteredActions= state.existingActions;
    },

    setFilteredTriggersToAllConfigured: state =>{
      console.log("### Entering  setFilteredTriggersToAllConfigured");
      state.filteredTriggers= state.existingTriggers;
    },

    getPagesNeededForDataStreams: state => {
      console.log("### Entering  getPagesNeededForDataStreams");
      state.pagesNeededForDataStreams = getPagesNeeded(state.filteredDataStreams, state.maxDataStreamsPerPage);
    },

    getPagesNeededForActions: state => {
      console.log("### Entering  getPagesNeededForActions");
      state.pagesNeededForActions = getPagesNeeded(state.filteredActions, state.maxActionsPerPage);
    },

    getPagesNeededForTriggers: state => {
      console.log("### Entering  getPagesNeededForTriggers");
      state.pagesNeededForTriggers = getPagesNeeded(state.filteredTriggers, state.maxTriggersPerPage);
    },

    getActionsToShowInTable: state => {
      console.log("#### Entering getActionsToShowInTable");
      state.actionsForPage = getElementsToShowInTable(state.currentPage, state.maxActionsPerPage, state.filteredActions);
      console.log(" actionsPerPage: "  + state.actionsForPage);
    },

    getTriggersToShowInTable: state => {
      console.log("#### Entering getTriggersToShowInTable");
      state.triggersForPage = getElementsToShowInTable(state.currentPage, state.maxTriggersPerPage, state.filteredTriggers);
      console.log(" triggersForPage: "  + state.triggersForPage);
    },

    getDataStreamsToShowInTable: state=> {
      console.log("#### Entering getDataStreamsToShowInTable");
      state.dataStreamsForPage = getElementsToShowInTable(state.currentPage, state.maxDataStreamsPerPage, state.filteredDataStreams);
      console.log(" actionsPerPage: "  + state.dataStreamsForPage);
    },

    setCurrentPage: (state, payload) =>{
      state.currentPage = payload;
    },

    setCurrentPageNextPage: state => {
      state.currentPage +=1;
    },

    setCurrentPagePreviousPage: state => {
      state.currentPage -=1;
    },


//##########################################################################################
// Datas Stream mutations
//##########################################################################################

    addElementToDeleteList: (state, elem) => {
      console.log(" Entering addElementToDeleteList!");

      console.log("elementsToDelete: " + state.elementsToDelete);
      console.log("elem: " + elem);

      //if already exists, delete it; add it otherwise
      if (this.elementsToDelete.indexOf(elem.name) > -1) {
        this.elementsToDelete.splice(state.elementsToDelete.indexOf(elem.name), 1);
      } else {
        this.elementsToDelete.push(elem.name);
      }
      console.log("elementsToDelete: " + state.elementsToDelete);
      console.log("elem: " + elem);
    },

    showDataStream: (state, dataStream) => {
      state.editDataStream = false;
      state.activeDataStream = dataStream;
    },

    editDataStreams: (state, dataStream) => {
      console.log("### Entering editDataStream " + dataStream);
      console.log(" activeDataStream: " + state.activeDataStream);
      state.activeDataStream = dataStream;
      console.log(" activeDataStream: " + state.activeDataStream);

    },

    updateDataStreamsForPage: (state, value) => {
      console.log(" Entering updateDataStreamsForPage");
      state.dataStreamsForPage = value;
    },


    filterActionsToDisplay: (state, filterValue) => {
      console.log("Entering filterActionsToDisplay ");

      state.actionFilter = filterValue;
      console.log("actionFilter: " + state.actionFilter);

      let intermmediateActions = []; // siempre vacío el intermedio

      // check if contains a valid value
      if(state.actionFilter !== undefined){ // uso uno intermedio para recien cambiar el array principal cuando haya identificado todos los triggers que tienen que ser mostrados

        // get the amount of existing triggers
        let amountOfActions = state.existingActions.length;

        for(let i=0; i<amountOfActions; i++){

          //check Action name
          let filteredField = state.existingActions[i].name;
          intermmediateActions = addElementToFilteredOnes(filteredField, state.actionFilter, intermmediateActions, state.existingActions[i]);

          //check Action type
          filteredField = state.existingActions[i].type;
          intermmediateActions = addElementToFilteredOnes(filteredField, state.actionFilter, intermmediateActions, state.existingActions[i]);

          if(filteredField==="command"){
            //check Action command priority
            filteredField = state.existingActions[i].priority;
            intermmediateActions = addElementToFilteredOnes(filteredField, state.actionFilter, intermmediateActions, state.existingActions[i]);
          }else{

            //check Action http request method
            filteredField = state.existingActions[i].method;
            intermmediateActions = addElementToFilteredOnes(filteredField, state.actionFilter, intermmediateActions, state.existingActions[i]);

            //check Action http request url
            filteredField = state.existingActions[i].url;
            intermmediateActions = addElementToFilteredOnes(filteredField, state.actionFilter, intermmediateActions, state.existingActions[i]);

            //check Action http request version
            filteredField = state.existingActions[i].version;
            intermmediateActions = addElementToFilteredOnes(filteredField, state.actionFilter, intermmediateActions, state.existingActions[i]);

          }
        }

        if(intermmediateActions.length>0){ // si tiene triggers para mostrar
          state.filteredActions = intermmediateActions; // ahora ya podría mostrar todos los filtrados
        }else{
          state.filteredActions = [];
        }

      }else {
        // copy all the existing triggers, no filtering
        state.filteredActions = state.existingActions;
      }
    },

    filterTriggersToDisplay: (state, filterValue) => {
      console.log("Entering filterTriggersToDisplay ");

      state.triggerFilter = filterValue;
      console.log("triggerFilter: " + state.triggerFilter);

      let intermediateTriggers = []; // siempre vacío el intermedio

      // check if contains a valid value
      if(state.triggerFilter !== undefined){ // uso uno intermedio para recien cambiar el array principal cuando haya identificado todos los triggers que tienen que ser mostrados

        // get the amount of existing triggers
        let amountOfTriggers = state.existingTriggers.length;

        for(let i=0; i<amountOfTriggers; i++){

          //check Trigger name
          let filteredField = state.existingTriggers[i].name;
          intermediateTriggers = addElementToFilteredOnes(filteredField, state.triggerFilter, intermediateTriggers, state.existingTriggers[i]);

          //check Trigger action
          filteredField = state.existingTriggers[i].action;
          intermediateTriggers = addElementToFilteredOnes(filteredField, state.triggerFilter, intermediateTriggers, state.existingTriggers[i]);

          //check Trigger policy type
          filteredField = state.existingTriggers[i].policy.type;
          intermediateTriggers = addElementToFilteredOnes(filteredField, state.triggerFilter, intermediateTriggers, state.existingTriggers[i]);


          //check Trigger policy
          filteredField = state.existingTriggers[i].policy.elem;
          intermediateTriggers = addElementToFilteredOnes(filteredField, state.triggerFilter, intermediateTriggers, state.existingTriggers[i]);

        }

        if(intermediateTriggers.length>0){ // si tiene triggers para mostrar
          state.filteredTriggers = intermediateTriggers; // ahora ya podría mostrar todos los filtrados
        }else{
          state.filteredTriggers = [];
        }

      }else{
        // copy all the existing triggers, no filtering
        state.filteredTriggers = state.existingTriggers;
      }
    },

    filterDataStreamToDisplay: (state, filterValue) => {
      console.log("Entering filterDataStreamToDisplay ");

      state.dataStreamFilter = filterValue;
      console.log("dataStreamFilter: " + state.dataStreamFilter);

      let intermediateDataStreams = []; // siempre vacío el intermedio

      // check if contains a valid value
      if(state.dataStreamFilter !== undefined){ // uso uno intermedio para recien cambiar el array principal cuando haya identificado todos los triggers que tienen que ser mostrados

        // get the amount of existing triggers
        let amountOfDataStreams = state.dataStreamsConfigured.length;

        for(let i=0; i<amountOfDataStreams; i++){

          //check Data stream name
          let filteredField = state.dataStreamsConfigured[i].name;
          intermediateDataStreams = addElementToFilteredOnes(filteredField, state.dataStreamFilter, intermediateDataStreams, state.dataStreamsConfigured[i]);
        }

        if(intermediateDataStreams.length>0){ // si tiene triggers para mostrar
          state.filteredDataStreams = intermediateDataStreams; // ahora ya podría mostrar todos los filtrados
        }else{
          state.filteredDataStreams = [];
        }

      }else{
        // copy all the existing triggers, no filtering
        state.filteredDataStreams = state.dataStreamsConfigured;
      }

    },

    setMaxDataStreamsPerPage: (state, value) => {
      state.maxDataStreamsPerPage = value;
    },

    setMaxTriggersPerPage: (state, value) => {
      state.maxTriggersPerPage = value;
    },

    setMaxActionsPerPage: (state, value) => {
      state.maxActionsPerPage = value;
    },

    showAddDataStreamModal: state => {
      state.showAddDataStreamModal=true;
    },
    hideAddDataStreamModal: state => {
      state.showAddDataStreamModal=false;
    },

  },

  actions:{ // es una BUENA PRACTICA que todas sean acciones y commiteen mutaciones, aún éstas no sean asíncronas

    showAddDataStreamModal: context => {
      context.commit('showAddDataStreamModal');
    },

    hideAddDataStreamModal: context => {
      context.commit('hideAddDataStreamModal');
    },

    updateDataStream: context => {

      /*  Commented until the backend implementation is ready - This will need to be in a mutation

      axios.put(this.backendEndPoint + '/data-streams', {
          name: this.activeDataStream.name
      })
        .then(function (response) {
            this.displayLoadingFeedbackDataStreams = false; // user stops seeing the loading spinner
            this.errorInInteraction = false;				// since it was a succesful request

            $("#successModal").modal();						// trigger modal for announcing the request result

          console.log("data: " + response.data);
          console.log("status: " + response.status);
          console.log("statusText: " + response.statusText);
          console.log("headers: " + response.headers);
          console.log("config: " + response.config);

        })
        .catch(function (error) {
            console.log("[ERROR] : " + error);
            this.displayLoadingFeedbackDataStreams = false;
            this.errorInInteraction = true;
            $("#successModal").modal();
      });  */

    },

    setMaxDataStreamsPerPage: (context, value) => {
      context.commit('setMaxDataStreamsPerPage', value);
      context.commit('setCurrentPage', 1);
      context.commit('getDataStreamsToShowInTable');
      context.commit('getPagesNeededForDataStreams');
    },

    setMaxActionsPerPage: (context, value) => {
      context.commit('setMaxActionsPerPage', value);
      context.commit('setCurrentPage', 1);
      context.commit('getActionsToShowInTable');
      context.commit('getPagesNeededForActions');
    },

    filterDataStreamToDisplay: (context, filterValue) => {
      context.commit('filterDataStreamToDisplay', filterValue);
      context.commit('getPagesNeededForDataStreams');
      context.commit('getDataStreamsToShowInTable');
    },

    reduceOptions: context => { //el contexto actua "como" la store
      setTimeout(function () {
        context.commit('reduceOptions');
      }, 3000)
    },

    openNav: context =>{
      context.commit('openNav');
    },

    showDashboardView: context => {
      console.log("Entering showDashboardView");
      context.commit('showDashboardView');
    },

    closeNav: context => {
      context.commit('closeNav');
    },

    showDataStreamView: context => {

      console.log("Entering showDataStreamView ");

      context.commit('showDataStreamView');
      context.commit('setFilteredDataStreamsToAllConfigured');
      context.commit('setCurrentPage', 1);
      context.commit('getDataStreamsToShowInTable');
      context.commit('getPagesNeededForDataStreams');
    },

    showActionView: context =>{
      console.log("Entering showActionView ");

      context.commit('showActionView');
      context.commit('setFilteredActionsToAllConfigured');
      context.commit('setCurrentPage', 1);
      context.commit('getActionsToShowInTable');
      context.commit('getPagesNeededForActions');
    },

    showTriggerView: context =>{
      console.log("Entering showTriggerView ");
      context.commit('showTriggerView');
      context.commit('setFilteredTriggersToAllConfigured');
      context.commit('setCurrentPage', 1);
      context.commit('getTriggersToShowInTable');
      context.commit('getPagesNeededForTriggers');
    },

    showSecurityView: context =>{
      console.log("Entering showSecurityView ");
      context.commit('showSecurityView');
    },

    showAboutView: context =>{
      console.log("Entering showAboutView ");
      context.commit('showAboutView');
    },

    displayPrevPageActions: context => {
      console.log("Entering displayPrevPageActions ");
      context.commit('setCurrentPagePreviousPage');
      context.commit('getActionsToShowInTable');
    },

    displayNextPageActions: context => {
      console.log("Entering displayNextPageActions ");
      context.commit('setCurrentPageNextPage');
      context.commit('getActionsToShowInTable');
    },

    getActionsToShowInTable: (context, number) => {
      console.log("Entering getActionsToShowInTable ");
      context.commit('setCurrentPage', number);
      context.commit('getActionsToShowInTable');
    },

    getDataStreamsToShowInTable: (context, number) => {
      console.log("Entering getDataStreamsToShowInTable ");
      context.commit('setCurrentPage', number);
      context.commit('getDataStreamsToShowInTable');
    },

    getTriggersToShowInTable: (context, number) =>{
      console.log("Entering getTriggersToShowInTable ");
      context.commit('setCurrentPage', number);
      context.commit('getTriggersToShowInTable');
    },

    displayPrevPageTriggers: context => {
      console.log("Entering displayPrevPageDataStream ");
      context.commit('setCurrentPagePreviousPage');
      context.commit('getTriggersToShowInTable');
    },

    displayNextPageTriggers: context => {
      console.log("Entering displayNextPageDataStream ");
      context.commit('setCurrentPageNextPage');
      context.commit('getTriggersToShowInTable');
    },

    setMaxTriggersPerPage: (context, value) => {
      console.log("Entering setMaxTriggersPerPage ");
      context.commit('setMaxTriggersPerPage', value);
      context.commit('setCurrentPage', 1);
      context.commit('getTriggersToShowInTable');
      context.commit('getPagesNeededForTriggers');
    },

    filterTriggersToDisplay: (context, value) => {
      console.log("Entering filterTriggersToDisplay");
      context.commit('filterTriggersToDisplay', value);
      context.commit('getPagesNeededForTriggers');
      context.commit('getTriggersToShowInTable');
    },

    displayPrevPageDataStream: context => {
      console.log("Entering displayPrevPageDataStream ");
      context.commit('setCurrentPagePreviousPage');
      context.commit('getDataStreamsToShowInTable');
    },

    displayNextPageDataStream: context => {
      console.log("Entering displayNextPageDataStream ");
      context.commit('setCurrentPageNextPage');
      context.commit('getDataStreamsToShowInTable');
    },

    addElementToDeleteList: (context, elem) => {
      console.log("Entering addElementToDeleteList ");
      context.commit('addElementToDeleteList', elem);
    },

    showDataStream: (context, dataStream) => {
      console.log("Entering showDataStream ");
      context.commit('showDataStream', dataStream);
    },

    editDataStreams: (context, dataStream) => {
      console.log("## Entering editDataStreams " + dataStream);
      context.commit('editDataStreams', dataStream);
    },

    updateDataStreamsForPage: (context, value) =>{
      console.log("Entering updateDataStreamsForPage");
      context.commit('updateDataStreamsForPage', value);
    },

    filterActionsToDisplay: (context, value) => {
      console.log("Entering filterActionsToDisplay");
      context.commit('filterActionsToDisplay', value);
      context.commit('getPagesNeededForActions');
      context.commit('getActionsToShowInTable');
    }

  }
})
