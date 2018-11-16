import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'

import { addElementToFilteredOnes, getPagesNeeded, getElementsToShowInTable, addCommandToFilteredOnes} from './store-helpers'


Vue.use(Vuex); // tell Vue you want to use Vuex plugin

export const store = new Vuex.Store({ // we need to export it to make it avaibla for other components to use the store
  strict: false, // no permite que se hagan cambios de estado por fuera del store

  state:{
    options:[
      {name: 'uno', value: 1},
    ],

//##########################################################################################
// Backend details
//##########################################################################################

    //backendEndPoint: "http://192.168.99.100:8090",
    backendEndPoint: "http://localhost:8090",

//##########################################################################################
// Error Handling
//##########################################################################################

    errorMessage: "There was a problem... Please try again!",
    errorInInteraction: false,
    successMessage: "Your action was succesfully done!",

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
    renderCommandsView : false,

//##########################################################################################
// Commands model
//##########################################################################################
    existingCommands: [
      {command: 'Start Engine Alfa', priority: '28'},
      {command: 'Turn On LED 1', priority: '100'},
      {command: 'Turn Off LED 1', priority: '23'},
      {command: 'Stop Engine Alfa', priority: '46'},
      {command: 'Turn On PIN 5',priority: '56'},
      {command: 'Turn On PIN 6', priority: '33'},
      {command: 'Turn On PIN 7', priority: '66'},
      {command: 'Turn On PIN 8', priority: '73'},
      {command: 'Stop Engine Beta', priority: '92'},
      {command: 'Stop Engine Delta', priority: '35'},
    ],

    commandsForPage: [],
    maxCommandsPerPage: 10,
    pagesNeededForCommands: 0,
    commandFilter: undefined,
    filteredCommands:[],
    intermmediateCommands:[],

    commandToAdd: {
      command:'', priority:0
    },

//##########################################################################################
// Variables for managing the modals behavior

    showModalForStreamAdding: false,
    showModalForStreamEditing: false,

    showModalForCommandAdding: false,

    showModalForActionAdding: false,
    showModalForActionDetails: false,
    showModalForActionEditing: false,

    showModalForTriggerAdding: false,
    showModalForTriggerDetails: false,
    showModalForTriggerEditing: false,

    showModalForRequestResult: false,

    showModalForRemovingElements: false,

//##########################################################################################

//##########################################################################################
// Data Stream model
//##########################################################################################

    /*dataStreamsConfigured:[
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
    ],*/

    dataStreamsResponseFromBackend:[],

    dataStreamsConfigured:[],

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
    maxDataStreamsPerPage: 10,
    dataStreamsForPage: [],
    filteredDataStreams: [],
    intermediateDataStreams:[],
    activeDataStream:[],
    dataStreamSelected: [],
    displayLoadingFeedback: false,

    showAddDataStreamModal: false,

    request:undefined,

    elementsToDelete: [],


//##########################################################################################
// Actions model
//##########################################################################################

    // actions variables
    existingActions:[
      {id: 1, name: 'Tweet', type:'http_request', method:'POST', url:'https://twitter.com', version:'1.1', body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
      {id: 2, name: 'Make Facebook Post', type:'http_request', method:'POST', url:'https://facebook.com', version:'1.1', body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
      {id: 3, name: 'Send Email', type:'http_request', method:'POST', url:'https://gmail.com', version:'1.1', body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
      {id: 4, name: 'Start Engine Alfa', type:'http_request', method:'POST', url:'http://device1.com', version:'1.1', body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
      {id: 5, name: 'Sense Temperature', type:'http_request', method:'GET', url:'http://device2.com', version:'1.1', body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
      {id: 6, name: 'Command A', type:'command', priority:'High'},
      {id: 7, name: 'Command B', type:'command', priority:'Medium'},
      {id: 8, name: 'Command C', type:'command', priority:'Low'},
    ],


    trueActions: [
      {name:'Action1', created_on:'2018-08-19T19:33:3400:00', http_request:{
          request_line:{method:'GET', url:'http://facebook.com/', version:'HTTP/1.0'},
          body: '',
          headers:[{key:'Name',value:'jorge'},{key:'Surname',value:'nahas'}],
        }
      }

    ],



    actionFilter: undefined,
    pagesNeededForActions: 0,
    maxActionsPerPage: 10,
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
    isTimePeriodPolicy : false,

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
    maxTriggersPerPage: 10,
    pagesNeededForTriggers: 0,
    triggerFilter: undefined,
    filteredTriggers:[],
    intermediateTriggers:[],

    activeTrigger:{
      name:'',
      action:'',
      dataPointRegistration:{
        dataStream:''
      },
      timePeriod:{
        granularity:''
      },
      conditions:[],
    },

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

    conditionSelected:{
      id:1,
      text:''
    },

    conditionsForTrigger:[], // it will contain an array of 'condition's selected for a trigger

    condition:{               // it will contain each condition selected for a trigger
      condition: undefined,   // it will contain the conditionSelected
      details: undefined,     // it will contain either dataStreamNotUpdatedCondition, onDataStreamValueCondition or timeIntervalCondition
    },

    dataStreamNotUpdatedFrom:{
      months:0,
      weeks:0,
      days:0,
      hours:0,
      minutes:0,
      seconds:0,
    },

    newTriggerConditions: [], // this will contain all the Triggers nested conditions.

    dataStreamNotUpdatedCondition:{
      dataStream: undefined,
      dataStreamNotUpdatedFrom: undefined,
    },

    onDataStreamValueCondition:{
      dataStream: undefined,
      condition: undefined,
      value: undefined
    },

    timeIntervalCondition: {
      from:{
        hours: '00',
        minutes: '00'
      },
      to:{
        hours: '00',
        minutes: '00'
      }
    },

    conditionsCounter:1 ,

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
    increaseOptions: state => {
      state.options.forEach(option => {
        option.value += 1;

      })
    },
//##########################################################################################
// Burguer menu mutations
//##########################################################################################

    openNav: state => {
      state.sideNavStyle.backgroundColor = "#111"; //Background color BLACK
      //state.sideNavStyle.backgroundColor = "#2b2c37"; // Cosmos Title background color
      state.sideNavStyle.width = "250px";
    },

    showDashboardView: state => {
      state.renderDashboardView = true;
      state.renderDataStreamView = false;
      state.renderActionAddView = false;
      state.renderTriggerAddView = false;
      state.renderSecurityView = false;
      state.renderAboutView = false;
      state.renderCommandsView = false;
    },

    closeNav: state => {
      state.sideNavStyle.backgroundColor = "white";
      state.sideNavStyle.width = "0";
    },

    showDataStreamView: state => {
      console.log("## Entering showDataStreamView !!");
      state.renderDashboardView = false;
      state.renderDataStreamView = true;
      state.renderActionAddView = false;
      state.renderTriggerAddView = false;
      state.renderSecurityView = false;
      state.renderAboutView = false;
      state.renderCommandsView = false;

    },

    showActionView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = false;
      state.renderActionAddView = true;
      state.renderTriggerAddView = false;
      state.renderSecurityView = false;
      state.renderAboutView = false;
      state.renderCommandsView = false;
    },

    showTriggerView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = false;
      state.renderActionAddView = false;
      state.renderTriggerAddView = true;
      state.renderSecurityView = false;
      state.renderAboutView = false;
      state.renderCommandsView = false;
    },

    showSecurityView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = false;
      state.renderActionAddView = false;
      state.renderTriggerAddView = false;
      state.renderSecurityView = true;
      state.renderAboutView = false;
      state.renderCommandsView = false;
    },

    showAboutView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = false;
      state.renderActionAddView = false;
      state.renderTriggerAddView = false;
      state.renderSecurityView = false;
      state.renderCommandsView = false;
      state.renderAboutView = true;
    },

    showCommandView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = false;
      state.renderActionAddView = false;
      state.renderTriggerAddView = false;
      state.renderSecurityView = false;
      state.renderAboutView = false;
      state.renderCommandsView = true;
    },

//##########################################################################################
// Pagination mutations
//##########################################################################################

    setFilteredDataStreamsToAllConfigured: state => {
      console.log("### Entering  setFilteredDataStreamsToAllConfigured");
      state.filteredDataStreams = state.dataStreamsConfigured;
      console.log(" state.filteredDataStreams: " + state.filteredDataStreams);
      console.log(" state.dataStreamsConfigured: "+ state.dataStreamsConfigured);
    },

    setFilteredActionsToAllConfigured: state => {
      console.log("### Entering  setFilteredActionsToAllConfigured");
      state.filteredActions = state.existingActions;
    },

    setFilteredTriggersToAllConfigured: state => {
      console.log("### Entering  setFilteredTriggersToAllConfigured");
      state.filteredTriggers = state.existingTriggers;
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
      console.log(" actionsPerPage: " + state.actionsForPage);
    },

    getTriggersToShowInTable: state => {
      console.log("#### Entering getTriggersToShowInTable");
      state.triggersForPage = getElementsToShowInTable(state.currentPage, state.maxTriggersPerPage, state.filteredTriggers);
      console.log(" triggersForPage: " + state.triggersForPage);
    },

    getDataStreamsToShowInTable: state => {
      console.log("#### Entering getDataStreamsToShowInTable");
      state.dataStreamsForPage = getElementsToShowInTable(state.currentPage, state.maxDataStreamsPerPage, state.filteredDataStreams);
      console.log(" dataStreamsForPage: " + state.dataStreamsForPage);
    },

    setCurrentPage: (state, payload) => {
      state.currentPage = payload;
    },

    setCurrentPageNextPage: state => {
      state.currentPage += 1;
    },

    setCurrentPagePreviousPage: state => {
      state.currentPage -= 1;
    },


//##########################################################################################
// Datas Stream mutations
//##########################################################################################

  cleanElementsToDelete: state => {
    console.log("### ENTERING cleanElementsToDelete");
    state.elementsToDelete = [];
  },

  addElementToDeleteList: (state, elem) => {
      console.log("### Entering addElementToDeleteList!");

      console.log("elementsToDelete: " + state.elementsToDelete);
      console.log("elem: " + elem);

      //if already exists, delete it; add it otherwise
      if (state.elementsToDelete.indexOf(elem) > -1) {
        state.elementsToDelete.splice(state.elementsToDelete.indexOf(elem), 1);
      } else {
        state.elementsToDelete.push(elem);
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
      console.log("### Entering filterActionsToDisplay ");

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
          /*filteredField = state.existingActions[i].type;
          intermmediateActions = addElementToFilteredOnes(filteredField, state.actionFilter, intermmediateActions, state.existingActions[i]);*/

          // FIXME: Need to check COMMANDS structure!!

          if(state.existingActions[i].http_request!== undefined){
            filteredField = "HTTP Request";
            intermmediateActions = addElementToFilteredOnes(filteredField, state.actionFilter, intermmediateActions, state.existingActions[i]);

            //check Action http request method
            filteredField = state.existingActions[i].http_request.request_line.method;
            intermmediateActions = addElementToFilteredOnes(filteredField, state.actionFilter, intermmediateActions, state.existingActions[i]);

            //check Action http request url
            filteredField = state.existingActions[i].http_request.request_line.url;
            intermmediateActions = addElementToFilteredOnes(filteredField, state.actionFilter, intermmediateActions, state.existingActions[i]);

            //check Action http request version
            filteredField = state.existingActions[i].http_request.request_line.version;
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


    filterCommandsToDisplay: (state, filterValue) => {
      console.log("Entering filterCommandsToDisplay ");

      state.commandFilter = filterValue;
      console.log("commandFilter: " + state.commandFilter);

      let intermmediateCommands = []; // siempre vacío el intermedio

      // check if contains a valid value
      if(state.commandFilter !== undefined){ // uso uno intermedio para recien cambiar el array principal cuando haya identificado todos los triggers que tienen que ser mostrados

        // get the amount of existing triggers
        let amountOfCommands = state.existingCommands.length;

        for(let i=0; i<amountOfCommands; i++){

          //check command name
          let filteredField = state.existingCommands[i].command;
          intermmediateCommands = addCommandToFilteredOnes(filteredField, state.commandFilter, intermmediateCommands, state.existingCommands[i]);

          //check command priority
          filteredField = state.existingCommands[i].priority;
          intermmediateCommands = addCommandToFilteredOnes(filteredField, state.commandFilter, intermmediateCommands, state.existingCommands[i]);
        }

        if(intermmediateCommands.length>0){ // si tiene triggers para mostrar
          state.filteredCommands = intermmediateCommands; // ahora ya podría mostrar todos los filtrados
        }else{
          state.filteredCommands = [];
        }

      }else{
        // copy all the existing triggers, no filtering
        state.filteredCommands = state.existingCommands;
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

    setMaxCommandsPerPage: (state, value) => {
      state.maxCommandsPerPage = value;
    },

    showAddDataStreamModal: state => {
      state.showAddDataStreamModal=true;
    },
    hideAddDataStreamModal: state => {
      state.showAddDataStreamModal=false;
    },

    prepareDataStreamAdding: state => {
        //$("#addDataStreamModal").modal("hide");  			// close the modal
        state.displayLoadingFeedback = true; // user starts seeing the loading spinner
    },

    prepareCommandAdding: state => {
        //$("#addCommandModal").modal("hide");  			// close the modal
        state.displayLoadingFeedback = true; // user starts seeing the loading spinner
    },

    displaySuccessDataStreamAdding: state => {
        state.displayLoadingFeedback = false;
        state.errorInInteraction = false;
        state.successMessage = state.dataStreamToAdd + " added successfully.";
        //$("#successModal").modal();

        state.showModalForRequestResult = true;
        setTimeout(function(){
          state.showModalForRequestResult = false;
        }, 2000);

        state.dataStreamToAdd = "";
    },

    displaySuccessCommandAdding: state => {
        state.displayLoadingFeedback = false;
        state.errorInInteraction = false;
        state.successMessage = state.commandToAdd.command + " added successfully with priority " + state.commandToAdd.priority;
        //$("#successModal").modal();

        state.showModalForRequestResult = true;
        setTimeout(function(){
          state.showModalForRequestResult = false;
        }, 2000);

        state.commandToAdd = {};
    },

    errorTreatmentForDataStreamAdding: (state,error) => {
        console.log("[ERROR] " + error);

        state.displayLoadingFeedback = false;
        state.errorInInteraction = true;

        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.data.message);

          state.errorMessage = error.response.data.message;

          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          state.errorMessage = "There was a problem adding " + state.dataStreamToAdd + ". Please try again!";
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          state.errorMessage = "There was a problem adding " + state.dataStreamToAdd + ". Please try again!";
        }

        //$("#successModal").modal();

        state.showModalForRequestResult = true;
        setTimeout(function(){
          state.showModalForRequestResult = false;
        }, 2000);

        state.dataStreamToAdd = "";

    },

    errorTreatmentForCommandAdding: (state,error) => {
        console.log("[ERROR] " + error);

        state.displayLoadingFeedback = false;
        state.errorInInteraction = true;

        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.data.message);

          state.errorMessage = error.response.data.message;

          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          state.errorMessage = "There was a problem adding " + state.commandToAdd.command + ". Please try again!";
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          state.errorMessage = "There was a problem adding " + state.commandToAdd.command + ". Please try again!";
        }

        //$("#successModal").modal();

        state.showModalForRequestResult = true;
        setTimeout(function(){
          state.showModalForRequestResult = false;
        }, 2000);

        state.commandToAdd = {};

    },

    setDataStreamToAdd: (state, value) =>{
      state.dataStreamToAdd = value;
    },

    setActiveDataStream: (state, value) => {
      state.activeDataStream = value;
    },

    addOneMoreElemForActionRequestHeader: state => {
      console.log("### Entering addOneMoreElemForActionRequestHeader ");
      state.activeIdsForHttpRequestHeader.push({
        key: '',
        value: ''
      });
    },

    oneLessElemForActionRequestHeader: (state, index) => {
      state.activeIdsForHttpRequestHeader.splice(index,1);
    },

    prepareActionRequest: state => {
      console.log(" Entering prepareActionRequest!");
      let request={};
      let request_line={};

      request_line['url'] = state.activeAction.url;
      request_line['method'] = state.activeAction.method;
      request_line['version'] = state.activeAction.version;
      request['request_line'] = request_line;
      request['headers'] = state.activeIdsForHttpRequestHeader;
      request['body'] = state.actionBody;

      console.log("request_line: " + request_line);
      console.log("request: " + request);

      state.request = request;

      state.displayLoadingFeedback = true; // user starts seeing the loading spinner

    },

    displayErrorDetailsForAddingAction: (state, error) => {
        console.log("[ERROR] " + error);

        state.displayLoadingFeedback = false;
        state.errorInInteraction = true;

        // Error
        if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.data.message);

        state.errorMessage = error.response.data.message;

        console.log(error.response.status);
        console.log(error.response.headers);

      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        state.errorMessage = "There was a problem adding " + state.activeAction.name + ". Please try again!";

      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        state.errorMessage = "There was a problem adding " + state.activeAction.name + ". Please try again!";
      }

      //$("#successModal").modal();

      state.showModalForRequestResult = true;
      setTimeout(function(){
        state.showModalForRequestResult = false;
      }, 2000);

    },


    setActionAddSuccessDetails: state => {
        console.log(" Entering setActionAddSuccessDetails!");
        state.displayLoadingFeedback = false;
        state.errorInInteraction = false;
        state.successMessage = state.activeAction.name + " added successfully.";
        //$("#successModal").modal();

        state.showModalForRequestResult = true;
        setTimeout(function(){
          state.showModalForRequestResult = false;
        }, 2000);
    },

    addAction: state => {
      console.log("##### ABOUT TO ADD AN ACTION!! ");
      console.log("activeIdsForHttpRequestHeader: " + state.activeIdsForHttpRequestHeader);
      console.log("activeIdsForHttpRequestBody: " + state.actionBody);
      console.log("activeAction - Name: " + state.activeAction.name);
      console.log("activeAction - Method: " + state.activeAction.method);
      console.log("activeAction - URL: " + state.activeAction.url);
      console.log("activeAction - Version: " + state.activeAction.version);

      let request={};
      let request_line={};

      request_line['url'] = state.activeAction.url;
      request_line['method'] = state.activeAction.method;
      request_line['version'] = state.activeAction.version;
      request['request_line'] = request_line;
      request['headers'] = state.activeIdsForHttpRequestHeader;
      request['body'] = state.actionBody;

      console.log("request_line: " + request_line);
      console.log("request: " + request);

      state.displayLoadingFeedback = true; // user starts seeing the loading spinner

      axios.post(state.backendEndPoint + '/actions', {
        name: state.activeAction.name,
        request: request
      })
        .then(function (response) {
          console.log("(1)");
          console.log("data: " + response.data);
          console.log("status: " + response.status);
          console.log("statusText: " + response.statusText);
          console.log("headers: " + response.headers);
          console.log("config: " + response.config);

          state.displayLoadingFeedback = false;
          state.errorInInteraction = false;
          state.successMessage = state.activeAction.name + " added successfully.";
          //$("#successModal").modal();

          state.showModalForRequestResult = true;
          setTimeout(function(){
            state.showModalForRequestResult = false;
          }, 2000);


        })
        .catch(function (error) {
          console.log("[ERROR] " + error);

          state.displayLoadingFeedback = false;
          state.errorInInteraction = true;

          // Error
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.data.message);

            state.errorMessage = error.response.data.message;

            console.log(error.response.status);
            console.log(error.response.headers);

          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            state.errorMessage = "There was a problem adding " + state.activeAction.name + ". Please try again!";

          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            state.errorMessage = "There was a problem adding " + state.activeAction.name + ". Please try again!";
          }

          //$("#successModal").modal();

          state.showModalForRequestResult = true;
          setTimeout(function(){
            state.showModalForRequestResult = false;
          }, 2000);

        });

    },


    setActionBody: (state, value) => {
      console.log("Entering setActionBody!");
      state.actionBody = value;
      try {
        JSON.parse(state.actionBody);
        state.validJson=true;
      } catch (e) {
        state.validJson=false;
      }
    },

    assignBodyAndHeader: (state, action) => {
      console.log("Entering assignBodyAndHeader !");

      state.activeAction = action;

      console.log("activeIdsForHttpRequestHeader: " + state.activeIdsForHttpRequestHeader);
      console.log("action.headers: " + action.headers);
      console.log("activeIdsForHttpRequestBody: " + state.activeIdsForHttpRequestBody);
      console.log("action.body: " + action.body);

      state.activeIdsForHttpRequestHeader = action.headers;
      state.activeIdsForHttpRequestBody = action.body;

      console.log("activeIdsForHttpRequestHeader: " + state.activeIdsForHttpRequestHeader);
      console.log("activeIdsForHttpRequestBody: " + state.activeIdsForHttpRequestBody);
    },

    updateAction: state =>{
      console.log("##### ABOUT TO UPDATE AN ACTION!! ");
      console.log("activeIdsForHttpRequestHeader: " + state.activeIdsForHttpRequestHeader);
      console.log("activeIdsForHttpRequestBody: " + state.actionBody);
      console.log("activeAction - Name: " + state.activeAction.name);
      console.log("activeAction - Method: " + state.activeAction.method);
      console.log("activeAction - URL: " + state.activeAction.url);
      console.log("activeAction - Version: " + state.activeAction.version);

      // FIXME => FALTA HACER EL UDPATE

    },

    dataPointPolicy: state => {
      console.log("### Entering DataPointPolicy");
      console.log(state.isTimePeriodPolicy);
      state.isTimePeriodPolicy = false;
      console.log(state.isTimePeriodPolicy);
    },

    timePeriodPolicy: state => {
      console.log("### Entering TimePeriodPolicy");
      console.log(state.isTimePeriodPolicy);
      state.isTimePeriodPolicy = true;
    },


    setConditionSelected: (state, value) => {
      state.conditionSelected = value;
    },

    editTrigger: (state, trigger) => {
      console.log("...Entering editTrigger!");
      console.log("activeTrigger: " + state.activeTrigger);
      console.log("trigger: " + trigger.name);
      state.activeTrigger = trigger;
      state.isTimePeriodPolicy = trigger.policy.type === "data_point_registration";
      console.log("activeTrigger: " + state.activeTrigger);
    },

    cleanActiveAction: state => {
      console.log(" Entering cleanActiveAction!");
      state.activeAction = [];
      state.activeIdsForHttpRequestHeader = [];
      state.actionBody = '{"foo":"bar", "jane":"doe"}';

    },


    drawMosTriggeredActionsChart: state => {
      console.log("Entering drawMosTriggeredActionsChart!!");

      let ctx = document.getElementById("myPieChart2").getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Action 1', 'Action 2', 'Action 3'],
          datasets: [{
            data: [7, 9, 5],
            backgroundColor: ['#ffc107', '#007bff', '#28a745']
            /*backgroundColor: ['#3e95cd', '#8e5ea2','#3cba9f','#e8c3b9','#c45850']*/
          }]
        },
        options: {
          legend: { // Para no mostrar la leyenda de cada set de datos
            display: false
          },
          title: false,
          responsive:true,
          cutoutPercentage:0,
          maintainAspectRatio: false,
        }
      });

    },

    drawTriggerTypesPercentagesChart: state => {
      let ctx = document.getElementById("percentageBar").getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Data Point Reg', 'Time Interval'],
          datasets: [{
            data: [11, 22,],
            backgroundColor: ['#0000FF', '#32D75E']
          }]
        },
        options: {
          legend: {
            display: false
          },
          title: false,
          responsive:true,
          cutoutPercentage:70,
          maintainAspectRatio: false,
        }
      });
    },

    drawMostExecutedTriggersChart: state => {
      let ctx = document.getElementById("barChart").getContext('2d');
      new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: ['Trigger 1', 'Trigger 2', 'Trigger 3', 'Trigger 4', 'Trigger 5'],
          datasets: [{
            data: [22, 17, 15, 11, 9],
            backgroundColor: ['#FABB3C', '#32D75E','#D02FC0','#EB0524','#3e95cd']
            /*backgroundColor: ['#3e95cd', '#8e5ea2','#3cba9f','#e8c3b9','#c45850']*/
          }]
        },
        options: {
          legend: {
            display: false
          },
          responsive:true,
          maintainAspectRatio: true,
          title: {
            display: false,
            text: 'Most Executed actions (times)'
          },
          scales: {
            xAxes: [{
              gridLines: {
                display:false
              },
              ticks: {
                display: false //this will remove only the label
              },
              display: false
            }],
            yAxes: [{
              gridLines: {
                display:false
              }
            }]
          }
        }
      });
    },

    /*getDataStreamsConfigured: state => {
      console.log("##### Entering getDataStreamsConfigured!! ");

      //state.displayLoadingFeedback = true;

      axios.get(state.backendEndPoint + '/data-streams',{ headers: { "Accept": "application/vnd.cosmos.data-stream-snapshot+json; version=1.0.0" } }).then(response => {

        console.log(" RESPONSE: " + response);
        //state.displayLoadingFeedback = false;
        state.dataStreamsResponseFromBackend = response.data;
        console.log("[SUCCESS] DataStreams =>>>> " + state.dataStreamsResponseFromBackend);

        state.dataStreamsConfigured = [];

        for(let i=0; i<state.dataStreamsResponseFromBackend.length; i++){
          state.dataStreamsConfigured.push(state.dataStreamsResponseFromBackend[i]);
          console.log("DataStreams =>" + state.dataStreamsConfigured);
        }
        console.log(" Finishing getDataStreamsConfigured ######");

      }, (error) => {
        // state.displayLoadingFeedback = false; // we stop showing the loading spinner
        console.log(error);
      });

    },*/

    processActionsConfigured: (state, response)  => {
      console.log(" Entering processActionsConfigured!!");

      console.log(" RESPONSE: " + response);
      state.displayLoadingFeedback = false;
      let actions = response.data;
      console.log("[SUCCESS] actions =>>>> " + actions);

      state.existingActions = [];

      for(let i=0; i<actions.length; i++){
        state.existingActions.push(actions[i]);
        console.log("DataStreams =>" + state.existingActions);
      }

    },

    processTriggersConfigured: (state, response)  => {
      console.log(" Entering processTriggersConfigured!!");

      console.log(" RESPONSE: " + response);
      state.displayLoadingFeedback = false;
      let triggers = response.data;
      console.log("[SUCCESS] triggers =>>>> " + triggers);

      state.existingTriggers = [];

      for(let i=0; i<triggers.length; i++){
        state.existingTriggers.push(triggers[i]);
        console.log("existingTriggers =>" + state.existingTriggers);
      }

    },

    getDataPointForDataStream: state => {

      /*axios.get(state.backendEndPoint + '/data-streams/4cuvu7vjro0tbqz7arztpt657/data-points',{ headers: { "Accept": "application/vnd.cosmos.data-points+json; version=1.0.0" } }).then(response => {

        console.log(" RESPONSE: " + response);
        state.displayLoadingFeedback = false;
        let dataStreams = response.data;
        console.log("[SUCCESS] DataPoints =>>>> " + dataStreams);


      }, (error) => {

        state.displayLoadingFeedback = false; // we stop showing the loading spinner
        console.log(error);

      })*/

    },

    deleteElements: state => {

      if(state.renderDataStreamView){

        for(let i=0; i<state.elementsToDelete.length; i++){

          axios.delete(state.backendEndPoint + '/data-streams/' + state.elementsToDelete[i].metadata[0].identifier,{ headers: { "Accept": "application/vnd.cosmos.data-stream+json; version=1.0.0" } }).then(response => {

            console.log(" RESPONSE: " + response);
            state.displayLoadingFeedback = false;
            let dataStreams = response.data;
            console.log("[SUCCESS] DataPoints =>>>> " + dataStreams);


          }, (error) => {

            state.displayLoadingFeedback = false; // we stop showing the loading spinner
            console.log(error);

          })
        }

      }else{
        if(state.renderActionAddView){

        }else{
          if(state.renderTriggerAddView){

          }else{

          }
        }
      }

    },

    displayLoadingFeedback: state => {
      console.log("### ENTERING  displayLoadingFeedback");
      state.displayLoadingFeedback = true;
    },

    hideLoadingFeedback: state => {
      console.log("### ENTERING  hideLoadingFeedback");
      state.displayLoadingFeedback = false;
    },

    logResponseAttributes:(state, response) => {
      console.log("########################");
      console.log("[DATA]: " + response.data);
      console.log("[STATUS]: " + response.status);
      console.log("[STATUSTEXT]: " + response.statusText);
      console.log("########################");
    },

    processDataStreamsConfigured: (state, response) => {
      state.dataStreamsResponseFromBackend = response.data;
      state.dataStreamsConfigured = [];

      console.log("Amount of Streams in Response: " + state.dataStreamsResponseFromBackend.length);

      for(let i=0; i<state.dataStreamsResponseFromBackend.length; i++){
        state.dataStreamsConfigured.push(state.dataStreamsResponseFromBackend[i]);
        console.log("DataStreams =>" + state.dataStreamsConfigured);
      }
      console.log(" Finishing getDataStreamsConfigured ######");
    },

    treatErrorForAddingDataStream: (state, error) => {

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.data.message);

        state.errorMessage = error.response.data.message;

        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        state.errorMessage = "There was a problem adding " + state.dataStreamToAdd + ". Please try again!";
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        state.errorMessage = "There was a problem adding " + state.dataStreamToAdd + ". Please try again!";
      }
    },

    treatErrorForAddingAction: (state, error) => {

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.data.message);

        state.errorMessage = error.response.data.message;

        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        state.errorMessage = "There was a problem adding " + state.dataStreamToAdd + ". Please try again!";
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        state.errorMessage = "There was a problem adding " + state.dataStreamToAdd + ". Please try again!";
      }
    },


    setOnDataStreamValue: (state, newValue) =>{
      console.log("### Entering setOnDataStreamValue");
      state.onDataStreamValueCondition.dataStream = newValue;
      console.log("# " + state.onDataStreamValueCondition.dataStream + " #");
    },

    setOnDataStreamCondition: (state, newValue) =>{
      console.log("### Entering setOnDataStreamCondition");
      state.onDataStreamValueCondition.condition = newValue;
      console.log("# " + state.onDataStreamValueCondition.condition + " #");
    },

    setOnDataStreamReferenceValue: (state, newValue) =>{
      console.log("### Entering setOnDataStreamReferenceValue");
      state.onDataStreamValueCondition.value = newValue;
      console.log("# " + state.onDataStreamValueCondition.value + " #");
    },

    setDataStreamNotUpdated: (state, newValue) =>{
      console.log("### Entering setDataStreamNotUpdated");
      state.dataStreamNotUpdatedCondition.dataStream = newValue;
      console.log("# " + state.dataStreamNotUpdatedCondition.dataStream + " #");
    },

    addNewCondition: state => {
      console.log("### Entering addNewCondition");

      let condition = {};
      let elemId = state.conditionsCounter;

      condition.condition =  state.conditionSelected.text;
      condition.id = state.conditionSelected.id;
      condition.elemId = elemId;

      console.log("condition.id: " + condition.id);
      console.log("condition.elemId: " + condition.elemId);

      if(state.conditionSelected.id === 1){
          // DO NOTHING
      }else {
        if (state.conditionSelected.id === 2) {
          condition.details = Object.assign({}, state.onDataStreamValueCondition);   // This prevents binding the variables, since you are copying the initial object

        } else {
          if (state.conditionSelected.id === 3) {
            state.dataStreamNotUpdatedCondition.dataStreamNotUpdatedFrom = Object.assign({}, state.dataStreamNotUpdatedFrom);
            condition.details = Object.assign({}, state.dataStreamNotUpdatedCondition);

          } else {
            console.log("state.timeIntervalCondition: " +state.timeIntervalCondition);
            console.log("state.timeIntervalCondition.from: " + state.timeIntervalCondition.from);
            console.log("state.timeIntervalCondition.to: " + state.timeIntervalCondition.to);
            condition.details = Object.assign({}, state.timeIntervalCondition);
          }
        }
      }

      state.conditionsForTrigger.push(Object.assign({}, condition));
      state.conditionsCounter+=1;

      console.log("### state.conditionsForTrigger: " + state.conditionsForTrigger);
      console.log("### conditionsCounter: " + state.conditionsCounter);

    },


    addTrigger: (state, url) => {
      console.log("##### ABOUT TO ADD A TRIGGER!! ");

      let policy = {};

      if(state.isTimePeriodPolicy){
        policy = {type: "time_interval", granularity: state.activeTrigger.timePeriod.granularity};
      }else{
        policy= {type: "data_point_registration", data_stream: state.activeTrigger.dataPointRegistration.dataStream};
      }

      state.displayLoadingFeedback = true; // user starts seeing the loading spinner

      axios.post(url + '/triggers', {
        name: state.activeTrigger.name,
        action: state.activeTrigger.action,
        policy: policy,
        conditions: state.conditionsForTrigger,
      })
        .then(function (response) {
          console.log("data: " + response.data);
          console.log("status: " + response.status);
          console.log("statusText: " + response.statusText);
          console.log("headers: " + response.headers);
          console.log("config: " + response.config);

          state.displayLoadingFeedback = false;
          state.errorInInteraction = false;
          state.successMessage = state.activeTrigger.name + " added successfully.";
          //$("#successModal").modal();

          state.showModalForRequestResult = true;
          setTimeout(function(){
            state.showModalForRequestResult = false;
          }, 2000);

        })
        .catch(function (error) {
          console.log("[ERROR] " + error);

          state.displayLoadingFeedback = false;
          state.errorInInteraction = true;

          // Error
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.data.message);

            state.errorMessage = error.response.data.message;

            console.log(error.response.status);
            console.log(error.response.headers);

          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            state.errorMessage = "There was a problem adding " + state.activeTrigger.name + ". Please try again!";

          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            state.errorMessage = "There was a problem adding " + state.activeTrigger.name + ". Please try again!";
          }

          //$("#successModal").modal();

          state.showModalForRequestResult = true;
          setTimeout(function(){
            state.showModalForRequestResult = false;
          }, 2000);

        });

    },

    getPagesNeededForCommands: state => {
      console.log("### Entering  getPagesNeededForCommands");
      state.pagesNeededForCommands = getPagesNeeded(state.filteredCommands, state.maxCommandsPerPage);
    },

    getCommandsToShowInTable: state => {
        console.log("#### Entering getCommandsToShowInTable");
        state.commandsForPage = getElementsToShowInTable(state.currentPage, state.maxCommandsPerPage, state.filteredCommands);
        console.log(" commandsForPage: " + state.commandsForPage);
      },


    processCommandsConfigured: (state, response)  => {
      console.log(" Entering processCommandsConfigured!");
      console.log(" RESPONSE: " + response);

      let commands = response.data;
      console.log("[SUCCESS] commands =>>>> " + commands);

      state.existingCommands = [];

      for(let i=0; i<commands.length; i++){
        state.existingCommands.push(commands[i]);
        console.log(" Commands =>" + state.existingCommands);
      }

    },


    setFilteredCommandsToAllConfigured: state => {
      console.log("### Entering  setFilteredCommandsToAllConfigured");
      state.filteredCommands = state.existingCommands;
    },

    //####################################################################
    //  Stream  Modals
    //####################################################################

    displayModalForStreamAdding: state => {
      console.log("### Entering  displayModalForStreamAdding");
      state.showModalForStreamAdding = true;
    },

    hideModalForStreamAdding: state => {
      console.log("### Entering  hideModalForStreamAdding");
      state.showModalForStreamAdding = false;
    },

    displayModalForStreamEditing: state => {
      state.showModalForStreamEditing = true;
    },

    hideModalForStreamEditing: state => {
      state.showModalForStreamEditing = false;
    },

    //####################################################################
    //  Command  Adding  Modal
    //####################################################################

    displayModalForCommandAdding: state => {
      console.log("### Entering  displayModalForCommandAdding");
      state.showModalForCommandAdding = true;
    },

    hideModalForCommandAdding: state => {
      console.log("### Entering  hideModalForCommandAdding");
      state.showModalForCommandAdding = false;
    },

    //####################################################################
    //  Action  Modals
    //####################################################################

    displayModalForActionAdding: state => {
      console.log("### Entering  displayModalForActionAdding");
      state.showModalForActionAdding = true;
    },

    hideModalForActionAdding: state => {
      console.log("### Entering  hideModalForActionAdding");
      state.showModalForActionAdding = false;
    },

    displayModalForActionEditing: state => {
      state.showModalForActionEditing = true;
    },

    hideModalForActionEditing: state => {
      state.showModalForActionEditing = false;
    },

    displayModalForActionDetails: state => {
      state.showModalForActionDetails = true;
    },

    hideModalForActionDetails: state => {
      state.showModalForActionDetails = false;
    },

    //####################################################################
    //  Trigger  Modals
    //####################################################################

    displayModalForTriggerAdding: state => {
      console.log("### Entering  displayModalForTriggerAdding");
      state.showModalForTriggerAdding = true;
    },

    hideModalForTriggerAdding: state => {
      console.log("### Entering  hideModalForTriggerAdding");
      state.showModalForTriggerAdding = false;
    },

    displayModalForTriggerDetails: state => {
      console.log("### Entering  displayModalForTriggerDetails");
      state.showModalForTriggerDetails = true;
    },

    hideModalForTriggerDetails: state => {
      console.log("### Entering  hideModalForTriggerDetails");
      state.showModalForTriggerDetails = true;
    },

    //####################################################################
    //  Remove Elements  Modal
    //####################################################################

    displayModalForRemovingElements: state => {
      console.log("### Entering  displayModalForRemovingElements");
      state.showModalForRemovingElements = true;
    },

    hideModalForRemovingElements: state => {
      console.log("### Entering  hideModalForRemovingElements");
      state.showModalForRemovingElements = false;
    },


  },

  //#####################################################################
  // ACTIONS
  //#####################################################################

  actions:{ // es una BUENA PRACTICA que todas sean acciones y commiteen mutaciones, aún éstas no sean asíncronas

    showDataStreamView: (context, url) => {
      context.commit('showDataStreamView');
      context.commit('cleanElementsToDelete');
      context.commit('displayLoadingFeedback');
      /*axios.get(url + '/data-streams',{ headers: { "Accept": "application/vnd.cosmos.data-stream-snapshot+json; version=1.0.0" } }).then(response => {*/
      /*axios.get(url + '/data-streams').then(response => {*/
      axios.get(url + '/data-streams',{ headers: { "Accept": "application/json" } }).then(response => {
        context.commit('logResponseAttributes', response);
        context.commit('processDataStreamsConfigured', response);
        context.commit('setFilteredDataStreamsToAllConfigured');
        context.commit('setCurrentPage', 1);
        context.commit('getDataStreamsToShowInTable');
        context.commit('getPagesNeededForDataStreams');
        context.commit('hideLoadingFeedback');
      }, (err) => {
        console.log("[ERROR] => " + err);
        //context.commit('treatErrorForDataStream', err);
        context.commit('hideLoadingFeedback');

      })
    },

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
            this.displayLoadingFeedback = false; // user stops seeing the loading spinner
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
            this.displayLoadingFeedback = false;
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

    setMaxCommandsPerPage: (context, value) => {
      context.commit('setMaxCommandsPerPage', value);
      context.commit('setCurrentPage', 1);
      context.commit('getCommandsToShowInTable');
      context.commit('getPagesNeededForCommands');
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
      context.commit('cleanElementsToDelete');

      setTimeout(function () { // This setTimeout is needed due to a race condition between the DOM rendering and the Chart drawing events
        console.log("Entering drawMosTriggeredActionsChart");

        context.commit('drawMostExecutedTriggersChart');
        context.commit('drawTriggerTypesPercentagesChart');
        context.commit('drawMosTriggeredActionsChart');

      }, 100);

    },

    closeNav: context => {
      context.commit('closeNav');
    },

/*    showDataStreamView: context => {
      console.log("Entering showDataStreamView ");

      context.commit('showDataStreamView');
      context.commit('displayLoadingFeedback');
      context.commit('getDataStreamsConfigured');

      setTimeout(function () {
        context.commit('setFilteredDataStreamsToAllConfigured');
        context.commit('setCurrentPage', 1);
        context.commit('getDataStreamsToShowInTable');
        context.commit('getPagesNeededForDataStreams');
        context.commit('hideLoadingFeedback');
      }, 1000);

      context.commit('cleanElementsToDelete');
    },*/

    showActionView: (context, url) => {
      console.log("Entering showActionView ");

      context.commit('showActionView');
      context.commit('cleanElementsToDelete');
      context.commit('displayLoadingFeedback');
      /*axios.get(url + '/actions',{ headers: { "Accept": "application/vnd.cosmos.action+json; version=1.0.0" } }).then(response => {*/
      axios.get(url + '/actions', {headers:{"Accept" : "application/json"}} ).then(response => {
        context.commit('processActionsConfigured', response);
        context.commit('setFilteredActionsToAllConfigured');
        context.commit('setCurrentPage', 1);
        context.commit('getActionsToShowInTable');
        context.commit('getPagesNeededForActions');
        context.commit('hideLoadingFeedback');
      }, (err) => {
        console.log("[ERROR] => " + err);
        context.commit('hideLoadingFeedback');
        //context.commit('treatErrorForActions', err);
      });

    },

    showTriggerView: (context, url) => {
      console.log("Entering showTriggerView ");

      context.commit('showTriggerView');
      context.commit('cleanElementsToDelete');
      context.commit('displayLoadingFeedback');
      console.log("SARASAAA : " + url + "/triggers");
      axios.get(url + '/triggers', {headers:{"Accept" : "application/json"}} ).then(response => {
        context.commit('processTriggersConfigured', response);
        context.commit('setFilteredTriggersToAllConfigured');
        context.commit('setCurrentPage', 1);
        context.commit('getTriggersToShowInTable');
        context.commit('getPagesNeededForTriggers');
        context.commit('hideLoadingFeedback');

      }, (err) => {
        console.log("[ERROR] => " + err);
        context.commit('hideLoadingFeedback');
        //context.commit('treatErrorForActions', err);
      });


    },

    showCommandView: (context, url) => {
      console.log("Entering showCommandView ");
      context.commit('showCommandView');
      context.commit('cleanElementsToDelete');
      context.commit('displayLoadingFeedback');

      axios.get(url + '/commands', {headers:{"Accept" : "application/json"}} ).then(response => {
        context.commit('processCommandsConfigured', response);
        context.commit('setFilteredCommandsToAllConfigured');
        context.commit('setCurrentPage', 1);
        context.commit('getCommandsToShowInTable');
        context.commit('getPagesNeededForCommands');
        context.commit('hideLoadingFeedback');
      }, (err) => {
        console.log("[ERROR] => " + err);
        context.commit('hideLoadingFeedback');

      });

      /*context.commit('setFilteredCommandsToAllConfigured');
      context.commit('setCurrentPage', 1);
      context.commit('getCommandsToShowInTable');
      context.commit('getPagesNeededForCommands');
      context.commit('hideLoadingFeedback');*/

    },

    showSecurityView: context =>{
      console.log("Entering showSecurityView ");
      context.commit('showSecurityView');
      context.commit('cleanElementsToDelete');

    },

    showAboutView: context => {
      console.log("Entering showAboutView ");
      context.commit('showAboutView');
      context.commit('cleanElementsToDelete');

    },

    displayPrevPageCommands: context => {
      console.log("Entering displayPrevPageCommands ");
      context.commit('setCurrentPagePreviousPage');
      context.commit('getCommandsToShowInTable');
    },

    displayNextPageCommands: context => {
      console.log("Entering displayNextPageCommands");
      context.commit('setCurrentPageNextPage');
      context.commit('getCommandsToShowInTable');
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

    getCommandsToShowInTable: (context, number) => {
      console.log("Entering getCommandsToShowInTable ");
      context.commit('setCurrentPage', number);
      context.commit('getCommandsToShowInTable');
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
      console.log(" Entering updateDataStreamsForPage");
      context.commit('updateDataStreamsForPage', value);
    },

    filterActionsToDisplay: (context, value) => {
      console.log(" Entering filterActionsToDisplay");
      context.commit('filterActionsToDisplay', value);
      context.commit('getPagesNeededForActions');
      context.commit('getActionsToShowInTable');
    },

    filterCommandsToDisplay: (context, value) => {
      console.log(" Entering filterCommandsToDisplay");
      context.commit('filterCommandsToDisplay', value);
      context.commit('getPagesNeededForCommands');
      context.commit('getCommandsToShowInTable');
    },

    /*
    filterTriggersToDisplay: (context, value) => {
      console.log("Entering filterTriggersToDisplay");
      context.commit('filterTriggersToDisplay', value);
      context.commit('getPagesNeededForTriggers');
      context.commit('getTriggersToShowInTable');
    },

    */

    addDataStream: (context, url) => {
        console.log(' Entering addDataStream!');

        context.commit('prepareDataStreamAdding');

        axios.post( url + '/data-streams', {
                name: context.state.dataStreamToAdd
            }).then(function (response) {

            context.commit('displaySuccessDataStreamAdding');

              /*axios.get(url + '/data-streams',{ headers: { "Accept": "application/vnd.cosmos.data-stream-snapshot+json; version=1.0.0" } }).then(response => {*/
              axios.get(url + '/data-streams',{ headers: { "Accept": "application/json" } }).then(response => {
                context.commit('processDataStreamsConfigured', response);
                context.commit('setFilteredDataStreamsToAllConfigured');
                context.commit('setCurrentPage', 1);
                context.commit('getDataStreamsToShowInTable');
                context.commit('getPagesNeededForDataStreams');
                //context.commit('hideLoadingFeedback');
              }, (err) => {
                console.log("[ERROR] => " + err);
                //context.commit('treatErrorForDataStream', err);
              });

          }).catch(function (error) {
                context.commit('errorTreatmentForDataStreamAdding', error);
          });

    },

    addCommand: (context, url) => {
        console.log(' Entering addCommand!');

        context.commit('prepareCommandAdding');

        axios.post( url + '/commands', {
          command: context.state.commandToAdd.command,
          priority: context.state.commandToAdd.priority
            }).then(function (response) {

            context.commit('displaySuccessCommandAdding');

              /*axios.get(url + '/data-streams',{ headers: { "Accept": "application/vnd.cosmos.data-stream-snapshot+json; version=1.0.0" } }).then(response => {*/
              axios.get(url + '/commands').then(response => {
                context.commit('processCommandsConfigured', response);
                context.commit('setFilteredCommandsToAllConfigured');
                context.commit('setCurrentPage', 1);
                context.commit('getCommandsToShowInTable');
                context.commit('getPagesNeededForCommands');
                //context.commit('hideLoadingFeedback');
              }, (err) => {
                console.log("[ERROR] => " + err);
                //context.commit('treatErrorForDataStream', err);
              });

          }).catch(function (error) {
                context.commit('errorTreatmentForCommandAdding', error);
          });

    },

    setDataStreamToAdd: (context, value) => {
      context.commit('setDataStreamToAdd', value);
    },

    setActiveDataStream: (context, value) => {
      context.commit('setActiveDataStream', value);
    },

    addOneMoreElemForActionRequestHeader: context => {
      context.commit('addOneMoreElemForActionRequestHeader');
    },

    oneLessElemForActionRequestHeader: (context, index) => {
      context.commit('oneLessElemForActionRequestHeader', index);
    },

    addAction: (context, url, request, name) => {

    context.commit('prepareActionRequest');

    axios.post(url + '/actions', {
        name: context.state.activeAction.name,
        request: context.state.request
      }).then(function (response) {
          console.log("(1)");
          console.log("data: " + response.data);
          console.log("status: " + response.status);
          console.log("statusText: " + response.statusText);
          console.log("headers: " + response.headers);
          console.log("config: " + response.config);

          context.commit('setActionAddSuccessDetails');

          //context.commit('addAction');

          /*axios.get(url + '/actions',{ headers: { "Accept": "application/vnd.cosmos.action+json; version=1.0.0" } }).then(response => {*/
          axios.get(url + '/actions', {headers: {"Accept" : "application/json"} }).then(response => {
                  console.log("(2)");
                context.commit('processActionsConfigured', response);
                context.commit('setFilteredActionsToAllConfigured');
                context.commit('setCurrentPage', 1);
                context.commit('getActionsToShowInTable');
                context.commit('getPagesNeededForActions');
                //context.commit('hideLoadingFeedback');
           }, (err) => {
                console.log("[ERROR] => " + err);
                //context.commit('treatErrorForActions', err);
           });

        }).catch(function (error) {
            context.commit('displayErrorDetailsForAddingAction', error);
        });
    },

    setActionBody: (context, value) => {
      context.commit('setActionBody', value);
    },

    assignBodyAndHeader: (context, action) => {
      context.commit('assignBodyAndHeader', action);
    },

    updateAction: context => {
      context.commit('updateAction');
    },

    dataPointPolicy: context => {
      context.commit('dataPointPolicy');
    },

    timePeriodPolicy: context => {
      context.commit('timePeriodPolicy');
    },

    setConditionSelected: (context, value) => {
      context.commit('setConditionSelected', value);
    },

    editTrigger: (context, trigger) => {
      context.commit('editTrigger', trigger);
    },

    cleanActiveAction: context => {
      context.commit('cleanActiveAction');
    },

    createConditionObject: context => {

    },

    drawCharts: context => {
      context.commit('drawMosTriggeredActionsChart');
      context.commit('drawTriggerTypesPercentagesChart');
      context.commit('drawMostExecutedTriggersChart');
    },

    deleteElements: context =>{
      context.commit('deleteElements');
    },

    displayLoadingFeedback: context => {
      context.commit('displayLoadingFeedback');
    },

    hideLoadingFeedback: context => {
      context.commit('hideLoadingFeedback');
    },

    setOnDataStreamValue: (context, newValue) => {
      context.commit('setOnDataStreamValue', newValue);
    },

    setOnDataStreamCondition: (context, newValue) => {
      context.commit('setOnDataStreamCondition', newValue);
    },

    setOnDataStreamReferenceValue: (context, newValue) => {
      context.commit('setOnDataStreamReferenceValue', newValue);
    },

    addNewCondition: context => {
      context.commit('addNewCondition');
    },

    setDataStreamNotUpdated: (context, newValue) => {
      context.commit('setDataStreamNotUpdated', newValue);
    },

    addTrigger: (context, url) => {
      context.commit('addTrigger', url);
    },


    displayModalForStreamAdding: context => {
      context.commit('displayModalForStreamAdding');
    },
    hideModalForStreamAdding: context => {
      context.commit('hideModalForStreamAdding');
    },

    displayModalForStreamEditing: context => {
      context.commit('displayModalForStreamEditing');
    },

    hideModalForStreamEditing: context => {
      context.commit('hideModalForStreamEditing');
    },

    displayModalForCommandAdding: context => {
      context.commit('displayModalForCommandAdding');
    },
    hideModalForCommandAdding: context => {
      context.commit('hideModalForCommandAdding');
    },


    displayModalForActionAdding: context => {
      context.commit('displayModalForActionAdding');
    },
    hideModalForActionAdding: context => {
      context.commit('hideModalForActionAdding');
    },


    displayModalForTriggerAdding: context => {
      context.commit('displayModalForTriggerAdding');
    },
    hideModalForTriggerAdding: context => {
      context.commit('hideModalForTriggerAdding');
    },


    displayModalForTriggerDetails: context => {
      context.commit('displayModalForTriggerDetails');
    },

    hideModalForTriggerDetails: context => {
      context.commit('hideModalForTriggerDetails');
    },


    displayModalForActionEditing: context => {
      context.commit('displayModalForActionEditing');
    },
    hideModalForActionEditing: context => {
      context.commit('hideModalForActionEditing');
    },

    displayModalForRemovingElements: context => {
      context.commit('displayModalForRemovingElements');
    },
    hideModalForRemovingElements: context => {
      context.commit('hideModalForRemovingElements');
    },

    displayModalForActionDetails: context => {
      context.commit('displayModalForActionDetails');
    },
    hideModalForActionDetails: context => {
      context.commit('hideModalForActionDetails');
    },


  }
})
