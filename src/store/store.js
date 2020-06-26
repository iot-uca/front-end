import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment';
import Chart from 'chart.js';

import { addElementToFilteredOnes, getPagesNeeded, getElementsToShowInTable, addCommandToFilteredOnes} from './store-helpers';

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
    //backendEndPoint: "http://localhost:8090",
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
    
    dataPointsChart: undefined, //controls the Data Points chart
    actionsChart: undefined, //controls the Actions chart (Dashboard)
    
//##########################################################################################

//##########################################################################################
// Data Stream model
//##########################################################################################

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

    mostExecutedActions: {labels:[], points:[]},

    lastExecutedActions: [],

    mostRecentlyUpdatedActions: [],


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
      {id: 3, name: 'data_stream_has_not_been_updated', label:'Data-Stream not updated'},
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

  mutations: { 
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
      state.filteredDataStreams = state.dataStreamsConfigured;
    },

    setFilteredActionsToAllConfigured: state => {
      state.filteredActions = state.existingActions;
    },

    setFilteredTriggersToAllConfigured: state => {
      state.filteredTriggers = state.existingTriggers;
    },

    getPagesNeededForDataStreams: state => {
      state.pagesNeededForDataStreams = getPagesNeeded(state.filteredDataStreams, state.maxDataStreamsPerPage);
    },

    getPagesNeededForActions: state => {
      state.pagesNeededForActions = getPagesNeeded(state.filteredActions, state.maxActionsPerPage);
    },

    getPagesNeededForTriggers: state => {
      state.pagesNeededForTriggers = getPagesNeeded(state.filteredTriggers, state.maxTriggersPerPage);
    },

    getActionsToShowInTable: state => {
      state.actionsForPage = getElementsToShowInTable(state.currentPage, state.maxActionsPerPage, state.filteredActions);
    },

    getTriggersToShowInTable: state => {
      state.triggersForPage = getElementsToShowInTable(state.currentPage, state.maxTriggersPerPage, state.filteredTriggers);
    },

    getDataStreamsToShowInTable: state => {
      state.dataStreamsForPage = getElementsToShowInTable(state.currentPage, state.maxDataStreamsPerPage, state.filteredDataStreams);
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
    state.elementsToDelete = [];
  },

  addElementToDeleteList: (state, elem) => {
      //if already exists, delete it; add it otherwise
      if (state.elementsToDelete.indexOf(elem) > -1) {
        state.elementsToDelete.splice(state.elementsToDelete.indexOf(elem), 1);
      } else {
        state.elementsToDelete.push(elem);
      }
    },

    showDataStream: (state, dataStream) => {
      state.editDataStream = false;
      state.activeDataStream = dataStream;
    },

    editDataStreams: (state, dataStream) => {
      state.activeDataStream = dataStream;
    },

    updateDataStreamsForPage: (state, value) => {
      state.dataStreamsForPage = value;
    },


    filterActionsToDisplay: (state, filterValue) => {

      state.actionFilter = filterValue;
      let intermmediateActions = [];

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
      state.triggerFilter = filterValue;

      let intermediateTriggers = [];

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

      state.dataStreamFilter = filterValue;

      let intermediateDataStreams = [];

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
      state.commandFilter = filterValue;

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
        state.displayLoadingFeedback = true; // user starts seeing the loading spinner
    },

    prepareCommandAdding: state => {
        state.displayLoadingFeedback = true; // user starts seeing the loading spinner
    },

    displaySuccessDataStreamAdding: state => {
        state.displayLoadingFeedback = false;
        state.errorInInteraction = false;
        state.successMessage = state.dataStreamToAdd + " added successfully.";

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

        state.showModalForRequestResult = true;
        setTimeout(function(){
          state.showModalForRequestResult = false;
        }, 2000);

        state.dataStreamToAdd = "";

    },

    errorTreatmentForTriggersAdding: (state,error) => {
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
          state.errorMessage = "There was a problem adding " + state.activeTrigger.name + ". Please try again!";
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          state.errorMessage = "There was a problem adding " + state.activeTrigger.name + ". Please try again!";
        }

        state.showModalForRequestResult = true;
        setTimeout(function(){
          state.showModalForRequestResult = false;
        }, 2000);

    },


    errorTreatmentForCommandAdding: (state,error) => {
        
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
      state.activeIdsForHttpRequestHeader.push({
        key: '',
        value: ''
      });
    },

    oneLessElemForActionRequestHeader: (state, index) => {
      state.activeIdsForHttpRequestHeader.splice(index,1);
    },

    prepareActionRequest: state => {
      let request={};
      let request_line={};

      request_line['url'] = state.activeAction.url;
      request_line['method'] = state.activeAction.method;
      request_line['version'] = state.activeAction.version;
      request['request_line'] = request_line;
      request['headers'] = state.activeIdsForHttpRequestHeader;
      request['body'] = state.actionBody;

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

      state.showModalForRequestResult = true;
      setTimeout(function(){
        state.showModalForRequestResult = false;
      }, 2000);

    },


    setActionAddSuccessDetails: state => {
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
      state.actionBody = value;
      try {
        JSON.parse(state.actionBody);
        state.validJson=true;
      } catch (e) {
        state.validJson=false;
      }
    },

    assignBodyAndHeader: (state, action) => {
      state.activeAction = action;
      state.activeIdsForHttpRequestHeader = action.headers;
      state.activeIdsForHttpRequestBody = action.body;
    },

    updateAction: state =>{
        
      // FIXME => FALTA HACER EL UDPATE

    },

    dataPointPolicy: state => {
      state.isTimePeriodPolicy = false;
    },

    timePeriodPolicy: state => {
      state.isTimePeriodPolicy = true;
    },


    setConditionSelected: (state, value) => {
      state.conditionSelected = value;
    },

    editTrigger: (state, trigger) => {
      state.activeTrigger = trigger;
      state.isTimePeriodPolicy = trigger.policy.type === "time_interval";
    },

    cleanActiveAction: state => {
      state.activeAction = [];
      state.activeIdsForHttpRequestHeader = [];
      state.actionBody = '{"foo":"bar", "jane":"doe"}';
    },

    drawDataPointsChart: state => {
      let ctx = document.getElementById("line-chart").getContext('2d');
      
      if (!(state.dataPointsChart===undefined)) state.dataPointsChart.destroy();
                                    
      state.dataPointsChart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: state.labelsForDataPoints,
            datasets: [{
                data: state.dataPointsAvailables,
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
      let ctx = document.getElementById("barChart").getContext('2d');
      
      if (!(state.actionsChart===undefined)) state.actionsChart.destroy();
                                    
      state.actionsChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
            //labels: ['Trigger 1', 'Trigger 2', 'Trigger 3', 'Trigger 4', 'Trigger 5'],
            labels: state.mostExecutedActions.labels,
            datasets: [{
                //data: [22, 17, 15, 11, 9],
                data: state.mostExecutedActions.points,
                backgroundColor: ['#4AFF82', '#4AFF82','#4AFF82','#4AFF82','#4AFF82']
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
		            display:true
		        },
		        ticks: {
		            	display: true, //this will remove only the label
		            	beginAtZero: true,
				min: 0,
				stepSize: 1
		        },
                	display: true
                 }],
                yAxes: [{
		        gridLines: {
		            display:true
		        }
                }]
            }
            }
        });
    },

    processActionsConfigured: (state, response)  => {
      state.displayLoadingFeedback = false;
      let actions = response.data;

      state.existingActions = [];

      for(let i=0; i<actions.length; i++){
        state.existingActions.push(actions[i]);
      }

    },

    processTriggersConfigured: (state, response)  => {
      state.displayLoadingFeedback = false;
      let triggers = response.data;

      state.existingTriggers = [];

      for(let i=0; i<triggers.length; i++){
        state.existingTriggers.push(triggers[i]);
      }

    },

    getDataPointForDataStream: state => {


    },

    deleteElements: (state, view) => {
      // assume everything succeded
      state.successMessage = "Elements deleted successfully!";
      state.errorMessage = "";

      for(let i=0; i<state.elementsToDelete.length; i++){
        state.displayLoadingFeedback = true; // user starts seeing the loading spinner

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
      state.displayLoadingFeedback = true;
    },

    hideLoadingFeedback: state => {
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

      for(let i=0; i<state.dataStreamsResponseFromBackend.length; i++){
        state.dataStreamsConfigured.push(state.dataStreamsResponseFromBackend[i]);
      }
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
      state.onDataStreamValueCondition.dataStream = newValue;
    },

    setOnDataStreamCondition: (state, newValue) =>{
      state.onDataStreamValueCondition.condition = newValue;
    },

    setOnDataStreamReferenceValue: (state, newValue) =>{
      state.onDataStreamValueCondition.value = newValue;
    },

    setDataStreamNotUpdated: (state, newValue) =>{
      state.dataStreamNotUpdatedCondition.dataStream = newValue;
    },

    addNewCondition: state => {
      let condition = {};
      let elemId = state.conditionsCounter;

      condition.type =  state.conditionSelected.text;

      if (state.conditionSelected.id === 2) {
        condition.data_stream = state.onDataStreamValueCondition.dataStream;
        condition.condition = {operator:state.onDataStreamValueCondition.condition, value: parseInt(state.onDataStreamValueCondition.value)};
        state.dataStreamCurrentValueConditions.push(condition);

      } else {
        if (state.conditionSelected.id === 3) {
          state.dataStreamNotUpdatedCondition.dataStreamNotUpdatedFrom = Object.assign({}, state.dataStreamNotUpdatedFrom);
          condition.data_stream = state.dataStreamNotUpdatedCondition.dataStream;
	  condition.time_period = state.dataStreamNotUpdatedCondition.dataStreamNotUpdatedFrom.minutes + " minutes";
          state.dataStreamNotUpdatedConditions.push(condition);
        } else {
	  condition.time_interval = {start: state.timeIntervalCondition.from.hours + ":" + state.timeIntervalCondition.from.minutes, stop: state.timeIntervalCondition.to.hours + ":" + state.timeIntervalCondition.to.minutes};
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
      
    },


    getPagesNeededForCommands: state => {
      state.pagesNeededForCommands = getPagesNeeded(state.filteredCommands, state.maxCommandsPerPage);
    },

    getCommandsToShowInTable: state => {
        state.commandsForPage = getElementsToShowInTable(state.currentPage, state.maxCommandsPerPage, state.filteredCommands);
      },


    processCommandsConfigured: (state, response)  => {
      let commands = response.data;
      state.existingCommands = [];

      for(let i=0; i<commands.length; i++){
        state.existingCommands.push(commands[i]);
      }

    },


    setFilteredCommandsToAllConfigured: state => {
      state.filteredCommands = state.existingCommands;
    },

    //####################################################################
    //  Stream  Modals
    //####################################################################

    displayModalForStreamAdding: state => {
      state.showModalForStreamAdding = true;
    },

    hideModalForStreamAdding: state => {
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
      state.showModalForCommandAdding = true;
    },

    hideModalForCommandAdding: state => {
      state.showModalForCommandAdding = false;
    },

    //####################################################################
    //  Action  Modals
    //####################################################################

    displayModalForActionAdding: state => {
      state.showModalForActionAdding = true;
    },

    hideModalForActionAdding: state => {
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
      state.showModalForDataPointsAdding = true;
    },
    hideModalForDataPointsAdding: state => {
      state.showModalForDataPointsAdding = false;
    },

    displayModalForDataPointsChart: state => {
      state.showModalForDataPointsChart = true;
    },
    
    hideModalForDataPointsChart: state => {
      state.showModalForDataPointsChart = false;
    },

    //####################################################################
    //  Trigger  Modals
    //####################################################################

    displayModalForTriggerAdding: state => {
      state.showModalForTriggerAdding = true;
    },

    hideModalForTriggerAdding: state => {
      state.showModalForTriggerAdding = false;
    },

    displayModalForTriggerDetails: state => {
      state.showModalForTriggerDetails = true;
    },

    hideModalForTriggerDetails: state => {
      state.showModalForTriggerDetails = false;
    },

    //####################################################################
    //  Remove Elements  Modal
    //####################################################################

    displayModalForRemovingElements: state => {
      state.showModalForRemovingElements = true;
    },

    hideModalForRemovingElements: state => {
      state.showModalForRemovingElements = false;
    },

    setdataPointToAdd: (state,value) => {
      state.dataPointToAdd = value;
    },

    processDataPointsConfigured: (state, response) => {
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
      state.dataPointsAvailables = state.dataPointsAvailables.reverse();
      state.dataPointsMaxValue = ((state.dataPointsAvailables.length < 1) ? 0 : Math.max(...state.dataPointsAvailables));
      state.dataPointsMinValue = ((state.dataPointsAvailables.length < 1) ? 0 : Math.min(...state.dataPointsAvailables));
      state.dataPointsAverageValue = ((amountOfPoints < 1) ? 0 : (sum/amountOfPoints).toFixed(2));

    },


    getAmountOfTriggerTypes: state => {
      state.amountOfPeriodicalTriggers=0;
      state.amountOfDataPointTriggers=0;

      for(let i=0; i<state.existingTriggers.length; i++){
          if(state.existingTriggers[i].policy.type==='periodical'){
            state.amountOfPeriodicalTriggers+=1;
          }else{
            state.amountOfDataPointTriggers+=1;
          }
      }

    },

    determineUpdateTimeForStreams: (state, instant) => {
      state.mostRecentlyUpdatedStreams=[];
      let amountOfStreams = state.dataStreamsConfigured.length;
      let milisFromTimezone = instant.getTimezoneOffset()*60000;
      let thisMoment = moment(instant);

      for(let i=0; i<amountOfStreams; i++){

        if(state.dataStreamsConfigured[i].last_update !== 'N/A'){
          let iso8610 = state.dataStreamsConfigured[i].last_update.slice(0,19);

          let registrationMoment = moment(iso8610, moment.ISO_8601);
          // storing the time in another field, need the original to do every calculation
          state.dataStreamsConfigured[i].not_updated_since = ( (thisMoment + milisFromTimezone ) - registrationMoment)/60000;
          state.mostRecentlyUpdatedStreams.push(state.dataStreamsConfigured[i]);
        }
      }
    },

    determineMostRecentlyUpdatedStreams: state => {
      state.mostRecentlyUpdatedStreams = state.mostRecentlyUpdatedStreams.sort(function(a, b){return a.not_updated_since-b.not_updated_since});

      if(state.mostRecentlyUpdatedStreams.length>5){
        state.mostRecentlyUpdatedStreams = state.mostRecentlyUpdatedStreams.slice(0,5);
      }
      console.log(JSON.stringify(state.mostRecentlyUpdatedStreams));
    },

    determineMostRecentlyUpdatedActions: (state, instant) => {
      state.mostRecentlyUpdatedActions=[];
      let amountOfActions = state.lastExecutedActions.length;
      let milisFromTimezone = instant.getTimezoneOffset()*60000;
      let thisMoment = moment(instant);
      
      for(let i=0; i<amountOfActions; i++){

        if(state.lastExecutedActions[i].evaluationDateTime !== 'N/A'){
          let iso8610 = state.lastExecutedActions[i].evaluationDateTime.slice(0,19);
          let registrationMoment = moment(iso8610, moment.ISO_8601);
          
          // storing the time in another field, need the original to do every calculation
          state.lastExecutedActions[i].not_updated_since = ( (thisMoment + milisFromTimezone ) - registrationMoment)/60000;
          state.mostRecentlyUpdatedActions.push(state.lastExecutedActions[i]);
        }

      }

      state.mostRecentlyUpdatedActions = state.mostRecentlyUpdatedActions.sort(function(a, b){return a.not_updated_since-b.not_updated_since});

      if(state.mostRecentlyUpdatedActions.length>5){
        state.mostRecentlyUpdatedActions = state.mostRecentlyUpdatedActions.slice(0,5);
      }

    },

    getNextCommandsInQueue: (state, response) => {
      let commands = response.data;
      state.existingCommandsPrioritized = [];

      for(let i=0; i<commands.length; i++){
        state.existingCommandsPrioritized.push(commands[i]);
      }
    },

   getMostExecutedActions: (state, response) => {
      let actionsExecuted = response.data;
      state.mostExecutedActions.labels = [];
      state.mostExecutedActions.points = [];
      actionsExecuted = actionsExecuted.sort(function(a, b){return a.evaluationCount-b.evaluationCount});

      if(actionsExecuted.length>5){
        actionsExecuted = actionsExecuted.slice(0,5);
      }

      for (let i=0; i<actionsExecuted.length; i++){
	state.mostExecutedActions.labels.push(actionsExecuted[i].action.name);
	state.mostExecutedActions.points.push(actionsExecuted[i].evaluationCount);
      }
   },

   getLastExecutedActions: (state, response) => {
      let actionsExecuted = response.data;
      state.lastExecutedActions = [];
      state.lastExecutedActions.push(actionsExecuted[actionsExecuted.length-1]);
      let alreadyIncluded = false;

	for(let i=actionsExecuted.length-1; i>=0; i--){
		for(let j=0; j<state.lastExecutedActions.length; j++){
			if(actionsExecuted[i].action.name==state.lastExecutedActions[j].action.name){
				alreadyIncluded = true;
			}

		}
		if(!alreadyIncluded){
		   state.lastExecutedActions.push(actionsExecuted[i]);
		}
		alreadyIncluded = false;
	}

      if(state.lastExecutedActions.length>5){
         state.lastExecutedActions = state.lastExecutedActions.slice(0,5);
      }
   },


  },

  //#####################################################################
  // ACTIONS
  //#####################################################################

  actions:{

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

    showDashboardView: (context, url) => {
      context.commit('showDashboardView');
      context.commit('cleanElementsToDelete');

/*      setTimeout(function () { // This setTimeout is needed due to a race condition between the DOM rendering and the Chart drawing events
        context.commit('drawMostExecutedTriggersChart');
      }, 300);*/

    },

    closeNav: context => {
      context.commit('closeNav');
    },

    showActionView: (context, url) => {
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
      context.commit('showSecurityView');
      context.commit('cleanElementsToDelete');
    },

    showAboutView: context => {
      context.commit('showAboutView');
      context.commit('cleanElementsToDelete');
    },

    displayPrevPageCommands: context => {
      context.commit('setCurrentPagePreviousPage');
      context.commit('getCommandsToShowInTable');
    },

    displayNextPageCommands: context => {
      context.commit('setCurrentPageNextPage');
      context.commit('getCommandsToShowInTable');
    },

    displayPrevPageActions: context => {
      context.commit('setCurrentPagePreviousPage');
      context.commit('getActionsToShowInTable');
    },

    displayNextPageActions: context => {
      context.commit('setCurrentPageNextPage');
      context.commit('getActionsToShowInTable');
    },

    getActionsToShowInTable: (context, number) => {
      context.commit('setCurrentPage', number);
      context.commit('getActionsToShowInTable');
    },

    getCommandsToShowInTable: (context, number) => {
      context.commit('setCurrentPage', number);
      context.commit('getCommandsToShowInTable');
    },

    getDataStreamsToShowInTable: (context, number) => {
      context.commit('setCurrentPage', number);
      context.commit('getDataStreamsToShowInTable');
    },

    getTriggersToShowInTable: (context, number) =>{
      context.commit('setCurrentPage', number);
      context.commit('getTriggersToShowInTable');
    },

    displayPrevPageTriggers: context => {
      context.commit('setCurrentPagePreviousPage');
      context.commit('getTriggersToShowInTable');
    },

    displayNextPageTriggers: context => {
      context.commit('setCurrentPageNextPage');
      context.commit('getTriggersToShowInTable');
    },

    setMaxTriggersPerPage: (context, value) => {
      context.commit('setMaxTriggersPerPage', value);
      context.commit('setCurrentPage', 1);
      context.commit('getTriggersToShowInTable');
      context.commit('getPagesNeededForTriggers');
    },

    filterTriggersToDisplay: (context, value) => {
      context.commit('filterTriggersToDisplay', value);
      context.commit('getPagesNeededForTriggers');
      context.commit('getTriggersToShowInTable');
    },

    displayPrevPageDataStream: context => {
      context.commit('setCurrentPagePreviousPage');
      context.commit('getDataStreamsToShowInTable');
    },

    displayNextPageDataStream: context => {
      context.commit('setCurrentPageNextPage');
      context.commit('getDataStreamsToShowInTable');
    },

    addElementToDeleteList: (context, elem) => {
      context.commit('addElementToDeleteList', elem);
    },

    showDataStream: (context, dataStream) => {
      context.commit('showDataStream', dataStream);
    },

    editDataStreams: (context, dataStream) => {
      context.commit('editDataStreams', dataStream);
    },

    updateDataStreamsForPage: (context, value) =>{
      context.commit('updateDataStreamsForPage', value);
    },

    filterActionsToDisplay: (context, value) => {
      context.commit('filterActionsToDisplay', value);
      context.commit('getPagesNeededForActions');
      context.commit('getActionsToShowInTable');
    },

    filterCommandsToDisplay: (context, value) => {
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
        context.commit('prepareCommandAdding');

        axios.post( url + '/commands', {
          command: context.state.commandToAdd.command,
          priority: parseInt(context.state.commandToAdd.priority)
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
    context.commit('prepareActionRequest');

    axios.post(url + '/actions', {
        name: context.state.activeAction.name,
        http_request: context.state.request
      }).then(function (response) {

          context.commit('setActionAddSuccessDetails');

          axios.get(url + '/actions', {headers: {"Accept" : "application/json"} }).then(response => {
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
      context.commit('drawMostExecutedTriggersChart');
    },

    deleteElements: context => {
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
      let policy = {};

      if(context.state.isTimePeriodPolicy){
        policy = {type: "periodical", time_interval: context.state.activeTrigger.timePeriod.granularity};
      }else{
        policy= {type: "data_point_registration", data_stream: context.state.activeTrigger.dataPointRegistration.dataStream};
      }

      context.state.displayLoadingFeedback = true; // user starts seeing the loading spinner

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
            context.commit('cleanElementsToDelete');
            context.commit('errorTreatmentForTriggersAdding', error);
          });

        }).catch(function (error) {
	  console.log("[ERROR] => " + error);
          context.commit('cleanElementsToDelete');
          context.commit('errorTreatmentForTriggersAdding', error);
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

        setTimeout(function(){
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
      }, 100);
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

    determineMostRecentlyUpdatedStreams: (context, now) => {
      context.commit('determineUpdateTimeForStreams', now);
      context.commit('determineMostRecentlyUpdatedStreams');
    },

    getNextCommandsInQueue: (context, url) => {
            axios.get(url + '/commands?order=priority', 
                  {
                      headers:{"Accept" : "application/json"}
                } 
            ).then(response => {
          context.commit('getNextCommandsInQueue', response);
        }, (err) => {
          console.log("[ERROR] => " + err);
        });

    },

    getMostExecutedActions: (context, url) => {
	console.log("getMostExecutedActions!!");
        axios.get(url + '/action-evaluations/summaries', {headers:{"Accept" : "application/json"}} ).then(response => {
	  console.log("getMostExecutedActions>> : " + JSON.stringify(response));
          context.commit('getMostExecutedActions', response);
        }, (err) => {
          console.log("[ERROR] => " + err);
        });
    },

    getLastExecutedActions: (context, url) => {
	console.log("getLastExecutedActions!!");
        axios.get(url + '/action-evaluations/last', {headers:{"Accept" : "application/json"}} ).then(response => {
		console.log("getLastExecutedActions >> " + JSON.stringify(response));
          	context.commit('getLastExecutedActions', response);
	  	context.commit('determineMostRecentlyUpdatedActions', new Date());
      		context.commit('drawTriggerTypesPercentagesChart');
      		context.commit('drawMostExecutedTriggersChart');
        }, (err) => {
          console.log("[ERROR] => " + err);
        });
    },

   determineMostRecentlyUpdatedActions: (context, now) => {
      context.commit('determineMostRecentlyUpdatedActions', now);
   },
  }
})
