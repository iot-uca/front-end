import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'
import Chart from 'chart.js';

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
    existingCommands: [],

    existingCommandsPrioritized:[],

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

    showModalForDataPointsAdding: false,
    showModalForDataPointsChart: false,

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

    mostRecentlyUpdatedStreams: [],

    dataPointToAdd: undefined,
    dataStreamToRegisterDataPointOn: undefined,

    dataPointsAvailables: [],
    dataPointsMinValue: 0,
    dataPointsMaxValue: 0,
    dataPointsAverageValue: 0,

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
    existingActions:[],


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


    streamTypes: [
      {id:0, name:'Boolean'},
      {id:1, name:'Numeric'},
      {id:2, name:'String'}
    ],

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

    existingTriggers: [],

    amountOfPeriodicalTriggers: 0,
    amountOfDataPointTriggers: 0,

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
      {id: 1, name: 'Always', label:'Always'},
      {id: 2, name: 'data_stream_current_value', label:'Data-Stream current value'},
      {id: 3, name: 'data_stream_not_updated', label:'Data-Stream not updated'},
      {id: 4, name: 'time_interval', label:'Time interval'},
    ],

    conditionSelected:{
      id:1,
      text:''
    },

    conditionsForTrigger:[], // it will contain an array of 'condition's selected for a trigger

    condition:{               // it will contain each condition selected for a trigger
      type: undefined,        // it will contain the conditionSelected
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

    timeIntervalConditions:[],
    dataStreamNotUpdatedConditions:[],
    dataStreamCurrentValueConditions:[],

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

        if(intermmediateActions.length>0){ // check if there are actions to show
          state.filteredActions = intermmediateActions; // start showing fitered ones
        }else{
          state.filteredActions = [];
        }

      }else {
        // copy all the existing actions, no filtering
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

          console.log("state.existingTriggers[i]: " + JSON.stringify(state.existingTriggers[i]));

          if(state.existingTriggers[i].policy.type=='on_data_point_registration'){
            filteredField = state.existingTriggers[i].policy.data_stream;
            intermediateTriggers = addElementToFilteredOnes(filteredField, state.triggerFilter, intermediateTriggers, state.existingTriggers[i]);
          }else{
            filteredField = state.existingTriggers[i].policy.time_interval;
            intermediateTriggers = addElementToFilteredOnes(filteredField, state.triggerFilter, intermediateTriggers, state.existingTriggers[i]);
          }


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
        console.log("### Entering errorTreatmentForDataStreamAdding ");
        console.log("[ERROR] " + error);

        state.displayLoadingFeedback = false;
        state.errorInInteraction = true;

        console.log("error " + JSON.stringify(error));

        console.log("error.response: " + error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("error.response.data: " + error.response.data);
          console.log("error.response.data.message: " + error.response.data.message);

          state.errorMessage = error.response.data.message;

          console.log("error.response.status: " + error.response.status);
          console.log("error.response.headers: " + error.response.headers);
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
        console.log(" Entering displayErrorDetailsForAddingAction!!!");
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
      state.isTimePeriodPolicy = trigger.policy.type === "time_interval";
      console.log("activeTrigger: " + JSON.stringify(state.activeTrigger));
    },

    cleanActiveAction: state => {
      console.log(" Entering cleanActiveAction!");
      state.activeAction = [];
      state.activeIdsForHttpRequestHeader = [];
      state.actionBody = '{"foo":"bar", "jane":"doe"}';

    },


    drawMosTriggeredActionsChart: state => {
      console.log("Entering drawMosTriggeredActionsChart!!");

      console.log("######################################################");
      console.log("FFF : " + JSON.stringify(document.getElementById('myPieChart2').outerHTML));
      console.log("######################################################");

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
      console.log("Entering drawTriggerTypesPercentagesChart!!");
      let ctx = document.getElementById("percentageBar").getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Action1', 'Action2', 'Action3', 'Action4', 'Action5'],
          datasets: [{
            data: [11, 22, 7, 17, 9],
            backgroundColor: ['#0000FF', '#ff4d4d', '#ffff33', ' #32D75E', ' #c61aff']
          }]
        },
        options: {
          legend: {
            display: false
          },
          title: false,
          responsive:true,
          cutoutPercentage:75,
          maintainAspectRatio: false,
        }
      });
    },


    drawDataPointsChart: state => {
      console.log("==> ENTERING drawDataPointsChart");

      console.log("######################################################");
      console.log("LALA : " + JSON.stringify(document.getElementById('line-chart').outerHTML));
      console.log("######################################################");

      let ctx = document.getElementById("line-chart").getContext('2d');

      new Chart(ctx, {
        type: 'line',
        data: {
          //labels: [1,2,3,4,5,6,7,8,9,10],
          labels: state.labelsForDataPoints,
          datasets: [{
            //data: [86,114,106,106,107,111,114,90,99,107],
            data: state.dataPointsAvailables,
            //label: "Temperature",
            label: state.activeDataStream.name,
            borderColor: "#3e95cd",
            fill: false
          }]
        },
        options: {
          title:false,
          title: {
            display: false,
            text: 'Data Points registered in ' + state.activeDataStream.name
          },
          scales: {
            xAxes: [{
              gridLines: {
                display:false
              }
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



    drawMostExecutedTriggersChart: state => {
      console.log("Etenring drawMostExecutedTriggersChart!!");
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


    },

    deleteElements: (state, view) => {
      console.log("### Entering deleteElements");

      // assume everything succeded
      state.successMessage = "Elements deleted successfully!";
      state.errorMessage = "";

      for(let i=0; i<state.elementsToDelete.length; i++){
        state.displayLoadingFeedback = true; // user starts seeing the loading spinner

        //axios.delete( url + state.elementsToDelete[i].metadata[0].identifier).then(response => {

        console.log(">> URL : " + state.elementsToDelete[i].links.self);
        axios.delete(state.elementsToDelete[i].links.self).then(response => {

          state.displayLoadingFeedback = false;

        }, (error) => {

          state.displayLoadingFeedback = false; // we stop showing the loading spinner
          state.errorInInteraction = true;
          state.errorMessage += "There was a problem deleting " ;//+ state.elementsToDelete[i].metadata[0].identifier;
          console.log(error);

        })
      }


      state.showModalForRequestResult = true;
      setTimeout(function(){
        state.showModalForRequestResult = false;
      }, 1500);

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

      condition.type =  state.conditionSelected.text;

      if (state.conditionSelected.id === 2) {
        //condition.details = Object.assign({}, state.onDataStreamValueCondition);   // This prevents binding the variables, since you are copying the initial object
        condition.data_stream = state.onDataStreamValueCondition.dataStream;
        condition.condition = {operator:state.onDataStreamValueCondition.condition, value: parseInt(state.onDataStreamValueCondition.value)};
        state.dataStreamCurrentValueConditions.push(condition);

      } else {
        if (state.conditionSelected.id === 3) {
          state.dataStreamNotUpdatedCondition.dataStreamNotUpdatedFrom = Object.assign({}, state.dataStreamNotUpdatedFrom);
          condition.details = Object.assign({}, state.dataStreamNotUpdatedCondition);
          state.dataStreamNotUpdatedConditions.push(condition);
        } else {
          console.log("state.timeIntervalCondition: " + state.timeIntervalCondition);
          console.log("state.timeIntervalCondition.from: " + state.timeIntervalCondition.from);
          console.log("state.timeIntervalCondition.to: " + state.timeIntervalCondition.to);
          condition.from = state.timeIntervalCondition.from.hours + ":" + state.timeIntervalCondition.from.minutes + ":00";
          condition.to = state.timeIntervalCondition.to.hours + ":" + state.timeIntervalCondition.to.minutes + ":00";
          state.timeIntervalConditions.push(condition);
        }
      }

      state.conditionsForTrigger.push(Object.assign({}, condition));
      state.conditionsCounter+=1;

      if(state.conditionSelected.id === 1){
        state.conditionsForTrigger=[]; // no conditions means "execute always"
        // all the other conditions have to be overwritten
        state.conditionsCounter=1;
        state.dataStreamCurrentValueConditions=[];
        state.timeIntervalConditions=[];
        state.dataStreamNotUpdatedConditions=[];
      }

      console.log("### state.conditionsForTrigger: " + state.conditionsForTrigger);
      console.log("### conditionsCounter: " + state.conditionsCounter);
      console.log("ABCDE###########################");
      console.log("condition: " + JSON.stringify(condition));
      console.log("state.conditionsForTrigger: " + JSON.stringify(state.conditionsForTrigger));
      console.log("ABCDE###########################");
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

    displayModalForDataPointsAdding: state => {
      console.log(" Entering displayModalForDataPointsAdding mutation");
      state.showModalForDataPointsAdding = true;
    },
    hideModalForDataPointsAdding: state => {
      state.showModalForDataPointsAdding = false;
    },

    displayModalForDataPointsChart: state => {
      console.log(" Entering displayModalForDataPointsChart mutation");
      state.showModalForDataPointsChart = true;
    },
    hideModalForDataPointsChart: state => {
      state.showModalForDataPointsChart = false;
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
      state.showModalForTriggerDetails = false;
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

    setdataPointToAdd: (state,value) => {
      console.log("### Entering  setdataPointToAdd");
      state.dataPointToAdd = value;
      console.log(" dataPointToAdd: " + state.dataPointToAdd);
    },

    processDataPointsConfigured: (state, response) => {
      console.log("### Entering  processDataPointsConfigured");
      state.labelsForDataPoints = [];
      state.dataPointsAvailables = [];
      state.dataPointsMinValue = 0;
      state.dataPointsMaxValue = 0;
      state.dataPointsAverageValue = 0;
      let sum=0;
      let amountOfPoints = response.length;

      for(let i=0; i<amountOfPoints; i++){
        state.dataPointsAvailables.push(response[i].value);
        state.labelsForDataPoints.push(i+1);
        sum = sum + +response[i].value; //convert the string number to number
      }
      state.dataPointsMaxValue = Math.max(...state.dataPointsAvailables);
      state.dataPointsMinValue = Math.min(...state.dataPointsAvailables);
      state.dataPointsAverageValue = sum/amountOfPoints;
    },


    getAmountOfTriggerTypes: state => {
      console.log("### Entering  getAmountOfTriggerTypes");
      state.amountOfPeriodicalTriggers=0;
      state.amountOfDataPointTriggers=0;

      for(let i=0; i<state.existingTriggers.length; i++){
          if(state.existingTriggers[i].policy.type==='periodical'){
            state.amountOfPeriodicalTriggers+=1;
            console.log("!!!!!!!!!!!state.amountOfPeriodicalTriggers: " + state.amountOfPeriodicalTriggers);
          }else{
            state.amountOfDataPointTriggers+=1;
            console.log("!!!!!!!!!!!state.amountOfDataPointTriggers: " + state.amountOfDataPointTriggers);
          }
      }

    },

    determineUpdateTimeForStreams: state => {
      console.log("### Entering determineUpdateTimeForStreams!!");
      state.mostRecentlyUpdatedStreams=[];

      let amountOfStreams = state.dataStreamsConfigured.length;
      console.log("dataStreamsConfigured: " + JSON.stringify(state.dataStreamsConfigured));

      let instant = new Date();
      console.log("instant: " + instant);
      console.log("TimezoneOffset: " + instant.getTimezoneOffset()); // negative value means ahead, positive behind UTC

      let milisFromTimezone = instant.getTimezoneOffset()*60000;
      console.log("milisFromTimezone: " + milisFromTimezone);

      let thisMoment = moment(instant);
      console.log("thisMoment: " + thisMoment);

      console.log("moment Adapted: " + (milisFromTimezone + thisMoment));

      for(let i=0; i<amountOfStreams; i++){

        if(state.dataStreamsConfigured[i].last_update !== 'N/A'){
          console.log("last_update: " + state.dataStreamsConfigured[i].last_update);
          //let iso8610 = state.dataStreamsConfigured[i].last_update.slice(0,19) + '-' + state.dataStreamsConfigured[i].last_update.slice(19,24);
          let iso8610 = state.dataStreamsConfigured[i].last_update.slice(0,19);
          console.log("iso8610: " + iso8610);

          let registrationMoment = moment(iso8610, moment.ISO_8601);

          console.log("===>" + registrationMoment.day());
          console.log("===>" + registrationMoment.month());
          console.log("===>" + registrationMoment.year());
          console.log("===>" + registrationMoment.hour());
          console.log("===>" + registrationMoment.minutes());
          console.log("===>" + registrationMoment.seconds());

          console.log("registrationMoment: " + registrationMoment);
          // storing the time in another field, need the original to do every calculation
          state.dataStreamsConfigured[i].not_updated_since = Math.floor(( (thisMoment + milisFromTimezone ) - registrationMoment)/60000);
          console.log("state.dataStreamsConfigured[i].not_updated_since: " + state.dataStreamsConfigured[i].not_updated_since);
          state.mostRecentlyUpdatedStreams.push(state.dataStreamsConfigured[i]);
        }

      }
    },

    determineMostRecentlyUpdatedStreams: state => {
      console.log("### Entering determineMostRecentlyUpdatedStreams!!");
      state.mostRecentlyUpdatedStreams = state.mostRecentlyUpdatedStreams.sort(function(a, b){return a.not_updated_since-b.not_updated_since});

      if(state.mostRecentlyUpdatedStreams.length>5){
        state.mostRecentlyUpdatedStreams = state.mostRecentlyUpdatedStreams.slice(0,5);
      }
      console.log(JSON.stringify(state.mostRecentlyUpdatedStreams));
    },

    getNextCommandsInQueue: (state, response) =>{
      console.log(" Entering getNextCommandsInQueue");
      console.log(" RESPONSE: " + JSON.stringify(response));

      let commands = response.data;
      console.log("[SUCCESS] commands =>>>> " + commands);

      state.existingCommandsPrioritized = [];

      for(let i=0; i<commands.length; i++){
        state.existingCommandsPrioritized.push(commands[i]);
      }
      console.log(" Commands =>" + JSON.stringify(state.existingCommandsPrioritized));
    }


  },

  //#####################################################################
  // ACTIONS
  //#####################################################################

  actions:{ // es una BUENA PRACTICA que todas sean acciones y commiteen mutaciones, aún éstas no sean asíncronas

    showDataStreamView: (context, url) => {
      context.commit('showDataStreamView');
      context.commit('cleanElementsToDelete');
      context.commit('displayLoadingFeedback');

      axios.get(url + '/data-streams',{ headers: { "Accept": "application/json" } }).then(response => {
        context.commit('logResponseAttributes', response);
        context.commit('processDataStreamsConfigured', response);
        context.commit('setFilteredDataStreamsToAllConfigured');
        context.commit('setCurrentPage', 1);
        context.commit('getDataStreamsToShowInTable');
        context.commit('getPagesNeededForDataStreams');
        context.commit('hideLoadingFeedback');
        //context.commit('determineUpdateTimeForStreams');
        //context.commit('determineMostRecentlyUpdatedStreams');
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

    showActionView: (context, url) => {
      console.log("Entering showActionView ");

      context.commit('showActionView');
      context.commit('cleanElementsToDelete');
      context.commit('displayLoadingFeedback');
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

      axios.get(url + '/triggers', {headers:{"Accept" : "application/json"}} ).then(response => {
        context.commit('processTriggersConfigured', response);
        context.commit('setFilteredTriggersToAllConfigured');
        context.commit('setCurrentPage', 1);
        context.commit('getTriggersToShowInTable');
        context.commit('getPagesNeededForTriggers');
        context.commit('hideLoadingFeedback');
        context.commit('getAmountOfTriggerTypes');

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
            }).then( function (response) {

	        	context.commit('displaySuccessDataStreamAdding');

		      axios.get(url + '/data-streams',{ headers: { "Accept": "application/json" } }).then(response => {
    			context.commit('processDataStreamsConfigured', response);
    			context.commit('setFilteredDataStreamsToAllConfigured');
    			context.commit('setCurrentPage', 1);
    			context.commit('getDataStreamsToShowInTable');
    			context.commit('getPagesNeededForDataStreams');
    			context.commit('cleanElementsToDelete');
    			//context.commit('determineUpdateTimeForStreams');
    			//context.commit('determineMostRecentlyUpdatedStreams');
    			//context.commit('hideLoadingFeedback');
    		      }, (err) => {
    			context.commit('cleanElementsToDelete');
    			console.log("[ERROR] => " + JSON.stringify(err));
			       //context.commit('treatErrorForDataStream', err);
		      });


          }).catch(function (error) {
                console.log("error : " + JSON.stringify(error));
                console.log("error.message : " + error.message);
                console.log("error.status : " + error.status);
                console.log("error.config : " + JSON.stringify(error.config));
                console.log("error.request : " + JSON.stringify(error.request));
                console.log("error.response : " + JSON.stringify(error.response));
                context.commit('cleanElementsToDelete');
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

              axios.get(url + '/commands').then(response => {
                context.commit('processCommandsConfigured', response);
                context.commit('setFilteredCommandsToAllConfigured');
                context.commit('setCurrentPage', 1);
                context.commit('getCommandsToShowInTable');
                context.commit('getPagesNeededForCommands');
                context.commit('cleanElementsToDelete');
                //context.commit('hideLoadingFeedback');
              }, (err) => {
                console.log("[ERROR] => " + err);
                context.commit('cleanElementsToDelete');
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
    console.log("######## TU VIEJAAAAA ########");
    context.commit('prepareActionRequest');

    axios.post(url + '/actions', {
        name: context.state.activeAction.name,
        http_request: context.state.request
      }).then(function (response) {
          console.log("(1)");
          console.log("data: " + response.data);
          console.log("status: " + response.status);
          console.log("statusText: " + response.statusText);
          console.log("headers: " + response.headers);
          console.log("config: " + response.config);

          context.commit('setActionAddSuccessDetails');

          axios.get(url + '/actions', {headers: {"Accept" : "application/json"} }).then(response => {
                console.log("(2)");
                context.commit('processActionsConfigured', response);
                context.commit('setFilteredActionsToAllConfigured');
                context.commit('setCurrentPage', 1);
                context.commit('getActionsToShowInTable');
                context.commit('getPagesNeededForActions');
           }, (err) => {
                console.log("[ERROR] => " + err);
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

    deleteElements: context => {
      console.log('### ENTERING deleteElements!!');
      context.commit('deleteElements');

      setTimeout(function(){

      if(context.state.renderDataStreamView){
        context.dispatch('showDataStreamView', context.state.backendEndPoint);
      }else{
        if(context.state.renderActionAddView){
          context.dispatch('showActionView', context.state.backendEndPoint);
        }else{
          if(context.state.renderTriggerAddView){
            context.dispatch('showTriggerView', context.state.backendEndPoint);
          }else{
            context.dispatch('showCommandView', context.state.backendEndPoint);
          }
        }
      }

    }, 500);

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
      console.log("### [addTrigger] ");

      let policy = {};

      if(context.state.isTimePeriodPolicy){
        //policy = {type: "time_interval", granularity: context.state.activeTrigger.timePeriod.granularity};
        policy = {type: "periodical", time_interval: context.state.activeTrigger.timePeriod.granularity};
      }else{
        policy= {type: "data_point_registration", data_stream: context.state.activeTrigger.dataPointRegistration.dataStream};
      }

      context.state.displayLoadingFeedback = true; // user starts seeing the loading spinner

      console.log("conditionsForTrigger: " + JSON.stringify(context.state.conditionsForTrigger));

      console.log("name="+ JSON.stringify(context.state.activeTrigger.name)+", action=" + JSON.stringify(context.state.activeTrigger.action)+", policy="+ JSON.stringify(policy)+", conditions=" + JSON.stringify(context.state.conditionsForTrigger));

      axios.post(url + '/triggers', {
        name: context.state.activeTrigger.name,
        action: context.state.activeTrigger.action,
        policy: policy,
        conditions: context.state.conditionsForTrigger,
      }).then(function (response) {

          context.state.dataStreamCurrentValueConditions = [];
          context.state.dataStreamNotUpdatedConditions = [];
          context.state.timeIntervalConditions = [];

          context.state.displayLoadingFeedback = false;
          context.state.errorInInteraction = false;
          context.state.successMessage = context.state.activeTrigger.name + " added successfully.";

          axios.get(url + '/triggers').then(response => {
            context.commit('processTriggersConfigured', response);
            context.commit('setFilteredTriggersToAllConfigured');
            context.commit('setCurrentPage', 1);
            context.commit('getTriggersToShowInTable');
            context.commit('getPagesNeededForTriggers');
            context.commit('getAmountOfTriggerTypes');

          }, (err) => {
            console.log("[ERROR] => " + err);
          });

        }).catch(function (error) {

      });

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

    displayModalForDataPointsAdding: context => {
      console.log("Entering displayModalForDataPointsAdding");
      context.commit('displayModalForDataPointsAdding');
    },
    hideModalForDataPointsAdding: context => {
      context.commit('hideModalForDataPointsAdding');
    },

    addDataPoint: (context, url) => {
      context.state.displayLoadingFeedback = true;

      axios.post( url + '/data-points',
              [{data_stream: context.state.activeDataStream.name,
                value: parseFloat(context.state.dataPointToAdd)}]
          ).then(function (response) {
            context.state.displayLoadingFeedback = false;
            context.state.errorInInteraction = false;
            context.state.successMessage = context.state.dataPointToAdd + " registered successfully on " + context.state.activeDataStream.name;

        }).catch(function (error) {
            context.state.displayLoadingFeedback = false;
            context.state.errorInInteraction = true;
        });

        context.state.showModalForRequestResult = true;
        setTimeout(function(){
          context.state.showModalForRequestResult = false;
        }, 1500);

        console.log("#$$$$$$$: " + context.state.activeDataStream.links.data_points);

        axios.get(url + '/data-streams',{ headers: { "Accept": "application/json" } }).then(response => {
        context.commit('processDataStreamsConfigured', response);
        context.commit('setFilteredDataStreamsToAllConfigured');
        context.commit('setCurrentPage', 1);
        context.commit('getDataStreamsToShowInTable');
        context.commit('getPagesNeededForDataStreams');
        context.commit('cleanElementsToDelete');
        //context.commit('determineUpdateTimeForStreams');
        //context.commit('determineMostRecentlyUpdatedStreams');
        //context.commit('hideLoadingFeedback');
      }, (err) => {
        context.commit('cleanElementsToDelete');
        console.log("[ERROR] => " + err);
        //context.commit('treatErrorForDataStream', err);
      });
    },

    setdataPointToAdd: (context, value) => {
      context.commit('setdataPointToAdd', value);
    },

    displayModalForDataPointsChart: context => {
      context.commit('displayModalForDataPointsChart');
    },
    hideModalForDataPointsChart: context => {
      context.commit('hideModalForDataPointsChart');
    },

    getDataPoints: context => {
      context.commit('displayLoadingFeedback');

      axios.get(context.state.activeDataStream.links.data_points, { headers: { "Accept": "application/json" } }).then(response => {
        context.commit('logResponseAttributes', response);
        context.commit('processDataPointsConfigured', response.data);
        context.commit('hideLoadingFeedback');
        context.commit('drawDataPointsChart');
      }, (err) => {
        console.log("[ERROR] => " + err);
        //context.commit('treatErrorForDataStream', err);
        context.commit('cleanElementsToDelete');
        context.commit('hideLoadingFeedback');

      });

    },

    getLabelsForDataPointsChart: context => {
      context.commit('getLabelsForDataPointsChart');
    },

    determineMostRecentlyUpdatedStreams: context => {
      context.commit('determineUpdateTimeForStreams');
      context.commit('determineMostRecentlyUpdatedStreams');
    },

    getNextCommandsInQueue: (context, url) => {
        console.log("Entering getNextCommandsInQueue ");

        axios.get(url + '/commands?order=priority', {headers:{"Accept" : "application/json"}} ).then(response => {
          context.commit('getNextCommandsInQueue', response);
        }, (err) => {
          console.log("[ERROR] => " + err);
        });

    },

  }
})
