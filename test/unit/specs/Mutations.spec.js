import Vue from 'vue';
import {store} from '../../../src/store/store.js';
//import mockAxios from './axios.js'


describe('Mutations', () => {

    before(function () {
      // runs before all tests in this block
      console.log("#### BEFORE ALL #####");
      var body = document.getElementsByTagName("body")[0];
      var canvasForFirstChart = document.createElement("canvas");
      canvasForFirstChart.id = 'line-chart';
      canvasForFirstChart.classList.add('chartjs-render-monitor');
      canvasForFirstChart.height ='20';
      canvasForFirstChart.width ='20';

      var canvasForSecondChart = document.createElement("canvas");
      canvasForSecondChart.id = 'barChart';
      canvasForSecondChart.classList.add('chartjs-render-monitor');
      canvasForSecondChart.height ='20';
      canvasForSecondChart.width ='20';

      var canvasForThirdChart = document.createElement("canvas");
      canvasForThirdChart.id = 'myPieChart2';
      canvasForThirdChart.classList.add('chartjs-render-monitor');
      canvasForThirdChart.height ='20';
      canvasForThirdChart.width ='20';

      var canvasForFourthChart = document.createElement("canvas");
      canvasForFourthChart.id = 'percentageBar';
      canvasForFourthChart.classList.add('chartjs-render-monitor');
      canvasForFourthChart.height ='20';
      canvasForFourthChart.width ='20';

      body.appendChild(canvasForFirstChart);
      body.appendChild(canvasForSecondChart);
      body.appendChild(canvasForThirdChart);
      body.appendChild(canvasForFourthChart);

      console.log("#### BEFORE ALL #####");
    });


  it('increase options should increase options in 1', () => {

    store.state.options = [ {name: 'uno', value: 2}, {name: 'uno', value: 3} ]
    console.log("dddd: " + store.state.options[0].name)
    console.log("dddd: " + store.state.options[0].value)
    store.commit('increaseOptions')
    expect(store.state.options[0].value).to.equal(3)
      expect(store.state.options[1].value).to.equal(4)
  });


/*  it('showDashboardView should only show dashboard view', () => {

    store.commit('showDashboardView')

    expect(store.state.renderDashboardView).to.equal(true)
    expect(store.state.renderDataStreamView).to.equal(false)
    expect(store.state.renderActionAddView).to.equal(false)
    expect(store.state.renderTriggerAddView).to.equal(false)
    expect(store.state.renderSecurityView).to.equal(false)
    expect(store.state.renderAboutView).to.equal(false)
  });*/



  it('showDataStreamView should only show data streams view', () => {

    store.commit('showDataStreamView')

    expect(store.state.renderDashboardView).to.equal(false)
    expect(store.state.renderDataStreamView).to.equal(true)
    expect(store.state.renderActionAddView).to.equal(false)
    expect(store.state.renderTriggerAddView).to.equal(false)
    expect(store.state.renderSecurityView).to.equal(false)
    expect(store.state.renderAboutView).to.equal(false)
  });


  it('showActionView should only show actions view', () => {

    store.commit('showActionView')

    expect(store.state.renderDashboardView).to.equal(false)
    expect(store.state.renderDataStreamView).to.equal(false)
    expect(store.state.renderActionAddView).to.equal(true)
    expect(store.state.renderTriggerAddView).to.equal(false)
    expect(store.state.renderSecurityView).to.equal(false)
    expect(store.state.renderAboutView).to.equal(false)
  });


  it('showTriggerView should only show triggers view', () => {

    store.commit('showTriggerView')

    expect(store.state.renderDashboardView).to.equal(false)
    expect(store.state.renderDataStreamView).to.equal(false)
    expect(store.state.renderActionAddView).to.equal(false)
    expect(store.state.renderTriggerAddView).to.equal(true)
    expect(store.state.renderSecurityView).to.equal(false)
    expect(store.state.renderAboutView).to.equal(false)
  });


  it('showSecurityView should only show security view', () => {

    store.commit('showSecurityView')

    expect(store.state.renderDashboardView).to.equal(false)
    expect(store.state.renderDataStreamView).to.equal(false)
    expect(store.state.renderActionAddView).to.equal(false)
    expect(store.state.renderTriggerAddView).to.equal(false)
    expect(store.state.renderSecurityView).to.equal(true)
    expect(store.state.renderAboutView).to.equal(false)
  });


  it('showAboutView should only show about view', () => {

    store.commit('showAboutView')

    expect(store.state.renderDashboardView).to.equal(false)
    expect(store.state.renderDataStreamView).to.equal(false)
    expect(store.state.renderActionAddView).to.equal(false)
    expect(store.state.renderTriggerAddView).to.equal(false)
    expect(store.state.renderSecurityView).to.equal(false)
    expect(store.state.renderAboutView).to.equal(true)
  });


  it('setFilteredDataStreamsToAllConfiguredTest', () => {
    expect(store.state.filteredDataStreams.length).to.equal(0)
    store.state.dataStreamsConfigured = [
        {id: 0, name: 'Solar light in garden'},
        {id: 1, name: 'Temperature inside the house'},
        {id: 2, name: 'Temperature outside the house'}]

    store.commit('setFilteredDataStreamsToAllConfigured')

    expect(store.state.filteredDataStreams.length).to.equal(3)
    expect(store.state.filteredDataStreams[0].id).to.equal(0)
    expect(store.state.filteredDataStreams[0].name).to.equal('Solar light in garden')
    expect(store.state.filteredDataStreams[1].id).to.equal(1)
    expect(store.state.filteredDataStreams[1].name).to.equal('Temperature inside the house')
    expect(store.state.filteredDataStreams[2].id).to.equal(2)
    expect(store.state.filteredDataStreams[2].name).to.equal('Temperature outside the house')
  });


  it('setFilteredActionsToAllConfiguredTest', () => {
    expect(store.state.filteredActions.length).to.equal(0)
    store.state.existingActions = [
      {id: 1, name: 'Tweet', type:'http_request', method:'POST', url:'https://twitter.com', version:'1.1', body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
      {id: 2, name: 'Make Facebook Post', type:'http_request', method:'POST', url:'https://facebook.com', version:'1.1', body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}]

    store.commit('setFilteredActionsToAllConfigured')

    expect(store.state.filteredActions.length).to.equal(2)
    expect(store.state.filteredActions[0].id).to.equal(1)
    expect(store.state.filteredActions[0].name).to.equal('Tweet')
    expect(store.state.filteredActions[1].id).to.equal(2)
    expect(store.state.filteredActions[1].name).to.equal('Make Facebook Post')

  });


  it('setFilteredTriggersToAllConfiguredTest', () => {
    expect(store.state.filteredTriggers.length).to.equal(0)
    store.state.existingTriggers = [
      { name: 'Trigger1', action : 'Tweet', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius', 'Temperature current value > 24 Celsius', 'Time interval' ]},
      {name: 'Trigger2', action: 'Make Facebook Post', policy: {type: 'data_point_registration',	elem: 'Temperature' }, conditions: ['Always']	}
    ]

    store.commit('setFilteredTriggersToAllConfigured')

    expect(store.state.filteredTriggers.length).to.equal(2)
    expect(store.state.filteredTriggers[0].name).to.equal('Trigger1')
    expect(store.state.filteredTriggers[1].name).to.equal('Trigger2')

  });


  it('setCurrentPageTest', () => {
    store.commit('setCurrentPage', 2)
    expect(store.state.currentPage).to.equal(2)
  });


  it('setCurrentPageNextPageTest', () => {
    store.state.currentPage = 1
    store.commit('setCurrentPageNextPage')
    expect(store.state.currentPage).to.equal(2)
  });


  it('setCurrentPagePreviousPageTest', () => {
    store.state.currentPage = 2
    store.commit('setCurrentPagePreviousPage')
    expect(store.state.currentPage).to.equal(1)
  });


  it('cleanElementsToDeleteTest', () => {
    store.state.elementsToDelete = [1,2,3]
    store.commit('cleanElementsToDelete')
    expect(store.state.elementsToDelete.length).to.equal(0)
  });


  it('addElementToDeleteListTest', () => {
    store.state.elementsToDelete = [1,2,3]
    store.commit('addElementToDeleteList', 4)
    expect(store.state.elementsToDelete.length).to.equal(4)
    expect(store.state.elementsToDelete.length).to.equal(4)
    expect(store.state.elementsToDelete[0]).to.equal(1)
    expect(store.state.elementsToDelete[1]).to.equal(2)
    expect(store.state.elementsToDelete[2]).to.equal(3)

    expect(store.state.elementsToDelete[3]).to.equal(4)

    store.commit('addElementToDeleteList', 2)
    expect(store.state.elementsToDelete.length).to.equal(3)

    expect(store.state.elementsToDelete[0]).to.equal(1)
    expect(store.state.elementsToDelete[1]).to.equal(3)
    expect(store.state.elementsToDelete[2]).to.equal(4)
  });


  it('showDataStreamTest', () => {
    let dataStream = {id: 0, name: 'Solar light in garden'}

    store.commit('showDataStream', dataStream)

    expect(store.state.activeDataStream.id).to.equal(0)
    expect(store.state.activeDataStream.name).to.equal('Solar light in garden')
    expect(store.state.editDataStream).to.equal(false)

    });


  it('editDataStreamsTest', () => {
    let dataStream = {id: 0, name: 'Solar light in garden'}

    store.commit('editDataStreams', dataStream)

    expect(store.state.activeDataStream.id).to.equal(0)
    expect(store.state.activeDataStream.name).to.equal('Solar light in garden')
    expect(store.state.editDataStream).to.equal(false)

  });


  it('updateDataStreamsForPageTest', () => {
    let dataStream = {id: 0, name: 'Solar light in garden'}

    store.commit('updateDataStreamsForPage', dataStream)
    expect(store.state.dataStreamsForPage.id).to.equal(0)
    expect(store.state.dataStreamsForPage.name).to.equal('Solar light in garden')

  });


it('setMaxDataStreamsPerPageTest', () => {
    store.commit('setMaxDataStreamsPerPage', 5)
    expect(store.state.maxDataStreamsPerPage).to.equal(5)
  });


    it('setMaxTriggersPerPageTest', () => {
    store.commit('setMaxTriggersPerPage', 5)
    expect(store.state.maxTriggersPerPage).to.equal(5)
  });


    it('setMaxActionsPerPageTest', () => {
    store.commit('setMaxActionsPerPage', 5)
    expect(store.state.maxActionsPerPage).to.equal(5)
  });


    it('showAddDataStreamModalTest', () => {
    store.commit('showAddDataStreamModal')
    expect(store.state.showAddDataStreamModal).to.equal(true)
  });


    it('hideAddDataStreamModalTest', () => {
    store.commit('hideAddDataStreamModal')
    expect(store.state.showAddDataStreamModal).to.equal(false)
  });


    it('setDataStreamToAddTest', () => {
    store.state.dataStreamToAdd='Temperature sensor'

    store.commit('setDataStreamToAdd', 'Backyard door sensor')
     expect(store.state.dataStreamToAdd).to.equal('Backyard door sensor')
  });


    it('setActiveDataStreamTest', () => {
    store.state.activeDataStream='Temperature sensor'

    store.commit('setActiveDataStream', 'Backyard door sensor')
     expect(store.state.activeDataStream).to.equal('Backyard door sensor')
  });


    it('addOneMoreElemForActionRequestHeaderTest', () => {
    store.state.activeIdsForHttpRequestHeader=[]
 expect(store.state.activeIdsForHttpRequestHeader.length).to.equal(0)

    store.commit('addOneMoreElemForActionRequestHeader')
   expect(store.state.activeIdsForHttpRequestHeader.length).to.equal(1)

        store.commit('addOneMoreElemForActionRequestHeader')
        expect(store.state.activeIdsForHttpRequestHeader.length).to.equal(2)

  });


    it('oneLessElemForActionRequestHeaderTest', () => {
    store.state.activeIdsForHttpRequestHeader=[]

    store.commit('addOneMoreElemForActionRequestHeader')
    expect(store.state.activeIdsForHttpRequestHeader.length).to.equal(1)

    store.commit('oneLessElemForActionRequestHeader')
    expect(store.state.activeIdsForHttpRequestHeader.length).to.equal(0)

  });


    it('prepareActionRequestTest', () => {
        store.state.activeIdsForHttpRequestHeader=[]
        store.state.activeAction.url = 'http://someUrl.com'
        store.state.activeAction.method = 'GET'
        store.state.activeAction.version= 'HTTP 1.0'
        store.state.actionBody = '{"foo":"bar", "jane":"doe"}'
        store.state.activeIdsForHttpRequestHeader.push({
            key: 'name',
            value: 'john'
          })

        store.commit('prepareActionRequest')

        expect(store.state.request['body']).to.equal('{"foo":"bar", "jane":"doe"}')
        expect(store.state.request['headers'].length).to.equal(1)
        expect(store.state.request['headers'][0].key).to.equal('name')
        expect(store.state.request['headers'][0].value).to.equal('john')
        expect(store.state.request['request_line'].url).to.equal('http://someUrl.com')
        expect(store.state.request['request_line'].method).to.equal('GET')
        expect(store.state.request['request_line'].version).to.equal('HTTP 1.0')
        expect(store.state.displayLoadingFeedback).to.equal(true)

  });

    it('setActionBodyTest', () => {

        store.commit('setActionBody', '{"foo":"bar", "jane":"doe"}')
        expect(store.state.validJson).to.equals(true)
        store.commit('setActionBody', '{"foo", "jane":"doe"}')
        expect(store.state.validJson).to.equals(false)

    });


    it('assignBodyAndHeaderTest', () => {
        store.state.activeIdsForHttpRequestHeader = [];
        store.state.activeIdsForHttpRequestBody = [];

        let action={}

        action.url = 'http://someUrl.com'
        action.method = 'GET'
        action.version= 'HTTP 1.0'
        action.body = '{"foo":"bar", "jane":"doe"}'
        action.headers= [{key: 'name', value: 'john'}]


        store.commit('assignBodyAndHeader', action)

        expect(store.state.activeIdsForHttpRequestHeader.length).to.equals(1)
        expect(store.state.activeIdsForHttpRequestHeader[0].key).to.equals('name')
         expect(store.state.activeIdsForHttpRequestHeader[0].value).to.equals('john')
        expect(store.state.activeIdsForHttpRequestBody).to.equals('{"foo":"bar", "jane":"doe"}')

    });


    it('dataPointPolicyTest', () => {
       store.commit('dataPointPolicy')
        expect(store.state.isTimePeriodPolicy).to.equals(false)
    });


   it('timePeriodPolicyTest', () => {
       store.commit('timePeriodPolicy')
       expect(store.state.isTimePeriodPolicy).to.equals(true)
    });


   it('setConditionSelectedTest', () => {
       store.state.conditionSelected = undefined
       expect(store.state.conditionSelected).to.equals(undefined)

       store.commit('setConditionSelected', 2)
       expect(store.state.conditionSelected).to.equals(2)
    });


  it('editTriggerTest', () => {
       let trigger = { name: 'Trigger1', action : 'Tweet', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius', 'Temperature current value > 24 Celsius', 'Time interval' ]}

       store.commit('editTrigger', trigger)
       expect(store.state.activeTrigger).to.equals(trigger)
       expect(store.state.isTimePeriodPolicy).to.equals(false)

       trigger.policy.type = 'time_interval'
       store.commit('editTrigger', trigger)
       expect(store.state.activeTrigger).to.equals(trigger)
       expect(store.state.isTimePeriodPolicy).to.equals(true)

    });


  it('cleanActiveActionTest', () => {
        let action={}

        action.url = 'http://someUrl.com'
        action.method = 'GET'
        action.version= 'HTTP 1.0'
        action.body = '{"name":"jane", "surname":"doe"}'
        action.headers= [{key: 'security-key', value: 'a1b2c3'}]

        store.state.activeAction = action
        store.state.activeIdsForHttpRequestHeader = [{key: 'security-key', value: 'd4e5f6'}]
        store.state.actionBody = '{"a":"1", "b":"2"}'

        store.commit('cleanActiveAction')
        expect(store.state.activeAction.length).to.equals(0)
        expect(store.state.activeIdsForHttpRequestHeader.length).to.equals(0)
        expect(store.state.actionBody).to.equals('{"foo":"bar", "jane":"doe"}')

    });


      it('processActionsConfiguredTest', () => {
        let action={}
        let response={}
        action.name = 'Action 1'
        action.url = 'http://someUrl.com'
        action.method = 'GET'
        action.version= 'HTTP 1.0'
        action.body = '{"name":"jane", "surname":"doe"}'
        action.headers= [{key: 'security-key', value: 'a1b2c3'}]

        response.data = [action, action, action]

        store.commit('processActionsConfigured', response)

        expect(store.state.existingActions.length).to.equals(3)
        expect(store.state.existingActions[0].name).to.equals('Action 1')
        expect(store.state.existingActions[1].name).to.equals('Action 1')
        expect(store.state.existingActions[2].name).to.equals('Action 1')
        expect(store.state.displayLoadingFeedback).to.equals(false)

    });


    it('displayLoadingFeedbackTest', () => {
        store.state.displayLoadingFeedback = false
        store.commit('displayLoadingFeedback')
        expect(store.state.displayLoadingFeedback).to.equals(true)
    });


    it('hideLoadingFeedbackTest', () => {
        store.state.displayLoadingFeedback = true
        store.commit('hideLoadingFeedback')
        expect(store.state.displayLoadingFeedback).to.equals(false)
    });


    it('processDataStreamsConfiguredTest', () => {
        let dataStream={}
        let response={}
        response.data = [
            {id: 0, name: 'Solar light in garden'},
            {id: 1, name: 'Temperature inside the house'},
            {id: 2, name: 'Temperature outside the house'}]

        store.commit('processDataStreamsConfigured', response)

        expect(store.state.dataStreamsConfigured.length).to.equals(3)
        expect(store.state.dataStreamsConfigured[0].name).to.equals('Solar light in garden')
        expect(store.state.dataStreamsConfigured[1].name).to.equals('Temperature inside the house')
        expect(store.state.dataStreamsConfigured[2].name).to.equals('Temperature outside the house')
    });


    it('setOnDataStreamValueTest', () => {
        store.commit('setOnDataStreamValue', {id: 0, name: 'Solar light in garden'})
        expect(store.state.onDataStreamValueCondition.dataStream.id).to.equals(0)
         expect(store.state.onDataStreamValueCondition.dataStream.name).to.equals('Solar light in garden')
    });

    it('setOnDataStreamConditionTest', () => {
        store.commit('setOnDataStreamCondition', '>')
         expect(store.state.onDataStreamValueCondition.condition).to.equals('>')
    });

    it('setOnDataStreamReferenceValueTest', () => {
        store.commit('setOnDataStreamReferenceValue', '12')
         expect(store.state.onDataStreamValueCondition.value).to.equals('12')
    });

    it('setDataStreamNotUpdatedTest', () => {
        store.commit('setDataStreamNotUpdated', {id: 0, name: 'Solar light in garden'})
         expect(store.state.dataStreamNotUpdatedCondition.dataStream.name).to.equals('Solar light in garden')
    });

    it('addNewConditionTest', () => {

        store.state.conditionsCounter = 0
        expect(store.state.conditionsForTrigger.length).to.equals(0)

        //1 - always
        store.state.conditionSelected = { id:1, text:'Always'}
        store.commit('addNewCondition')
        expect(store.state.conditionsForTrigger.length).to.equals(0)
        expect(store.state.conditionsCounter).to.equals(1)

        //2 - on data Stream value
        store.state.onDataStreamValueCondition.dataStream='Temperature sensor'
        store.state.onDataStreamValueCondition.condition='>'
        store.state.onDataStreamValueCondition.value='20'
        store.state.conditionSelected.text = 'On Data Stream value'
        store.state.conditionSelected.id = 2

        store.commit('addNewCondition')
        expect(store.state.conditionsForTrigger.length).to.equals(1)
        expect(store.state.conditionsForTrigger[0].type).to.equals('On Data Stream value')
        expect(store.state.conditionsForTrigger[0].data_stream).to.equals('Temperature sensor')
        expect(store.state.conditionsForTrigger[0].condition.operator).to.equals('>')
        expect(store.state.conditionsForTrigger[0].condition.value).to.equals(20)
        expect(store.state.conditionsCounter).to.equals(2)

        //3 - Data Stream not updated for...
        store.state.dataStreamNotUpdatedFrom.months=0
        store.state.dataStreamNotUpdatedFrom.weeks=1
        store.state.dataStreamNotUpdatedFrom.days=0
        store.state.dataStreamNotUpdatedFrom.hours=1
        store.state.dataStreamNotUpdatedFrom.minutes=0
        store.state.dataStreamNotUpdatedFrom.seconds=0
        store.state.conditionSelected.text = 'When Data Stream has not been updated for'
        store.state.conditionSelected.id = 3

        store.commit('addNewCondition')
        expect(store.state.conditionsForTrigger.length).to.equals(2)
        expect(store.state.conditionsForTrigger[1].type).to.equals('When Data Stream has not been updated for')
        expect(store.state.conditionsForTrigger[1].details.dataStreamNotUpdatedFrom.months).to.equals(0)
        expect(store.state.conditionsForTrigger[1].details.dataStreamNotUpdatedFrom.weeks).to.equals(1)
        expect(store.state.conditionsForTrigger[1].details.dataStreamNotUpdatedFrom.days).to.equals(0)
        expect(store.state.conditionsForTrigger[1].details.dataStreamNotUpdatedFrom.hours).to.equals(1)
        expect(store.state.conditionsForTrigger[1].details.dataStreamNotUpdatedFrom.minutes).to.equals(0)
        expect(store.state.conditionsForTrigger[1].details.dataStreamNotUpdatedFrom.seconds).to.equals(0)
        expect(store.state.conditionsCounter).to.equals(3)

        //4 - Time interval
        store.state.timeIntervalCondition.from.hours = '01'
        store.state.timeIntervalCondition.from.minutes = '23'
        store.state.timeIntervalCondition.to.hours = '07'
        store.state.timeIntervalCondition.to.minutes = '10'
        store.state.conditionSelected.text = 'Time interval'
        store.state.conditionSelected.id = 4

        store.commit('addNewCondition')
        expect(store.state.conditionsForTrigger.length).to.equals(3)
        expect(store.state.conditionsForTrigger[2].type).to.equals('Time interval')
        expect(store.state.conditionsForTrigger[2].from).to.equals('01:23:00')
        expect(store.state.conditionsForTrigger[2].to).to.equals('07:10:00')
        expect(store.state.conditionsCounter).to.equals(4)
    });



    it('showCommandView should only check commands view', () => {
        store.commit('showCommandView')
        expect(store.state.renderDashboardView).to.equal(false)
        expect(store.state.renderDataStreamView).to.equal(false)
        expect(store.state.renderActionAddView).to.equal(false)
        expect(store.state.renderTriggerAddView).to.equal(false)
        expect(store.state.renderSecurityView).to.equal(false)
        expect(store.state.renderAboutView).to.equal(false)
        expect(store.state.renderCommandsView).to.equal(true)
    });

    it('filterActionsToDisplay', () => {

        let existingActions = [
          {id: 1, name: 'Tweet', http_request:{ request_line: { method:'POST', url:'https://twitter.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
          {id: 2, name: 'Make Facebook Post', http_request:{ request_line: { method:'POST', url:'https://facebook.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
          {id: 3, name: 'Send Email',  http_request:{ request_line: { method:'POST', url:'https://gmail.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
          {id: 4, name: 'Start Engine Alfa',  http_request:{ request_line: { method:'POST', url:'http://device1.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
          {id: 5, name: 'Sense Temperature',  http_request:{ request_line: { method:'GET', url:'http://device2.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}}
        ];

        store.state.existingActions = existingActions;
        store.commit('filterActionsToDisplay','Tw');
        expect(store.state.filteredActions.length).to.equal(1);
        expect(store.state.filteredActions[0].id).to.equal(1);
        expect(store.state.filteredActions[0].name).to.equal('Tweet');
        expect(store.state.filteredActions[0].http_request.request_line.method).to.equal('POST');
    });

    it('filterActionsToDisplayWithNoneMatching', () => {

        let existingActions = [
          {id: 1, name: 'Tweet', http_request:{ request_line: { method:'POST', url:'https://twitter.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
          {id: 2, name: 'Make Facebook Post', http_request:{ request_line: { method:'POST', url:'https://facebook.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
          {id: 3, name: 'Send Email',  http_request:{ request_line: { method:'POST', url:'https://gmail.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
          {id: 4, name: 'Start Engine Alfa',  http_request:{ request_line: { method:'POST', url:'http://device1.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
          {id: 5, name: 'Sense Temperature',  http_request:{ request_line: { method:'GET', url:'http://device2.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}}
        ];

        store.state.existingActions = existingActions;
        store.commit('filterActionsToDisplay','ABC');
        expect(store.state.filteredActions.length).to.equal(0);
    });

    it('filterActionsToDisplayWithFilterUndefined', () => {

        let existingActions = [
          {id: 1, name: 'Tweet', http_request:{ request_line: { method:'POST', url:'https://twitter.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
          {id: 2, name: 'Make Facebook Post', http_request:{ request_line: { method:'POST', url:'https://facebook.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
          {id: 3, name: 'Send Email',  http_request:{ request_line: { method:'POST', url:'https://gmail.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
          {id: 4, name: 'Start Engine Alfa',  http_request:{ request_line: { method:'POST', url:'http://device1.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
          {id: 5, name: 'Sense Temperature',  http_request:{ request_line: { method:'GET', url:'http://device2.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}}
        ];

        store.state.existingActions = existingActions;
        store.commit('filterActionsToDisplay', undefined);
        expect(store.state.filteredActions.length).to.equal(5);
    });

    it('testFilterTriggersToDisplayWhenHavingTriggers', () => {

        let existingTriggers = [
              {name: 'Trigger1', action: 'Tweet', policy: {type: 'on_data_point_registration', data_stream: 'Temperature'}, conditions: [{type:"data_stream_current_value",data_stream:"DataStream2", condition:{"operator":"<","value":55}}]},
              {name: 'Trigger2', action: 'Make Facebook Post', policy: {type: 'on_data_point_registration',	data_stream: 'Temperature' }, condition: []},
              {name: 'Trigger3', action: 'Send Email', policy: {type: 'on_data_point_registration', data_stream: 'Temperature'}, condition: [{"type":"data_stream_current_value","data_stream":"DataStream2","condition":{"operator":"<","value":55}}]},
              {name: 'Trigger4', action: 'Start Engine Alfa', policy: {type:'on_data_point_registration', data_stream: 'Temperature'}, condition: []},
              {name: 'Trigger5', action: 'Sense Temperature', policy: {type: 'periodical', time_interval: '10 minutes' }, condition: []},
              {name: 'Trigger6', action: 'Start Engine Alfa', policy: {type: 'on_data_point_registration', data_stream: 'Temperature'}, condition: [{"type":"data_stream_current_value","data_stream":"DataStream2","condition":{"operator":"<","value":55}}]},
            ];

        store.state.existingTriggers = existingTriggers;
        store.commit('filterTriggersToDisplay','Trigger3');

        expect(store.state.filteredTriggers.length).to.equal(1);
        expect(store.state.filteredTriggers[0].name).to.equal('Trigger3');
        expect(store.state.filteredTriggers[0].action).to.equal('Send Email');
    });

    it('testFilterTriggersToDisplayWhenFilterUndefined', () => {

        let existingTriggers = [
              {name: 'Trigger1', action: 'Tweet', policy: {type: 'on_data_point_registration', data_stream: 'Temperature'}, conditions: [{type:"data_stream_current_value",data_stream:"DataStream2", condition:{"operator":"<","value":55}}]},
              {name: 'Trigger2', action: 'Make Facebook Post', policy: {type: 'on_data_point_registration',	data_stream: 'Temperature' }, condition: []},
              {name: 'Trigger3', action: 'Send Email', policy: {type: 'on_data_point_registration', data_stream: 'Temperature'}, condition: [{"type":"data_stream_current_value","data_stream":"DataStream2","condition":{"operator":"<","value":55}}]},
              {name: 'Trigger4', action: 'Start Engine Alfa', policy: {type:'on_data_point_registration', data_stream: 'Temperature'}, condition: []},
              {name: 'Trigger5', action: 'Sense Temperature', policy: {type: 'periodical', time_interval: '10 minutes' }, condition: []},
              {name: 'Trigger6', action: 'Start Engine Alfa', policy: {type: 'on_data_point_registration', data_stream: 'Temperature'}, condition: [{"type":"data_stream_current_value","data_stream":"DataStream2","condition":{"operator":"<","value":55}}]},
            ];

        store.state.existingTriggers = existingTriggers;
        store.commit('filterTriggersToDisplay', undefined);

        expect(store.state.filteredTriggers.length).to.equal(6);
    });


    it('testFilterCommandsToDisplayWhenHavingCommands', () => {

        let existingCommands = [
              {command: 'Turn On LED 1', priority: '100'},
              {command: 'Turn Off LED 1', priority: '23'},
              {command: 'Turn On PIN 5',priority: '56'},
            ];

        store.state.existingCommands = existingCommands;
        store.commit('filterCommandsToDisplay','Off');

        expect(store.state.filteredCommands.length).to.equal(1);
        expect(store.state.filteredCommands[0].command).to.equal('Turn Off LED 1');
        expect(store.state.filteredCommands[0].priority).to.equal('23');
    });


    it('testFilterCommandsToDisplayWhenFilterIsUndefined', () => {

            let existingCommands = [
                  {command: 'Turn On LED 1', priority: '100'},
                  {command: 'Turn Off LED 1', priority: '23'},
                  {command: 'Turn On PIN 5',priority: '56'},
                ];

            store.state.existingCommands = existingCommands;
            store.commit('filterCommandsToDisplay', undefined);

            expect(store.state.filteredCommands.length).to.equal(3);
    });

    it('testFilteringAnAlreadyFilteredElementDoesNotAddItAgain', () => {

      console.log("testFilteringAnAlreadyFilteredElementDoesNotAddItAgain");

      let existingCommands = [
            {command: 'Turn On LED 1', priority: '100'},
            {command: 'Turn Off LED 1', priority: '23'},
            {command: 'Turn On PIN 5',priority: '56'},
          ];

      store.state.existingCommands = existingCommands;
      store.commit('filterCommandsToDisplay','O');

      console.log("AJJJJJJJJJJJAAAAAAA: " + JSON.stringify(store.state.filteredCommands));

      expect(store.state.filteredCommands.length).to.equal(3);
      expect(store.state.filteredCommands[0].command).to.equal('Turn On LED 1');
      expect(store.state.filteredCommands[1].command).to.equal('Turn Off LED 1');
      expect(store.state.filteredCommands[2].command).to.equal('Turn On PIN 5');


      store.commit('filterCommandsToDisplay','On');
      console.log("BBBBBBBBBBBBBBBBBBBB: " + JSON.stringify(store.state.filteredCommands));
      expect(store.state.filteredCommands.length).to.equal(2);
      console.log("----1");
      expect(store.state.filteredCommands[0].command).to.equal('Turn On LED 1');
      console.log("----1");
      expect(store.state.filteredCommands[1].command).to.equal('Turn On PIN 5');
      console.log("----1");

      store.state.filteredCommands = [];

    });

  it('setMaxCommandsPerPageTest', () => {
    store.commit('setMaxCommandsPerPage', 5);
    expect(store.state.maxCommandsPerPage).to.equal(5);
  });


  it('testGetPagesNeededForCommands', () => {
    store.state.filteredCommands = [
          {command: 'Turn On LED 1', priority: '100'},
          {command: 'Turn Off LED 1', priority: '23'},
          {command: 'Turn On PIN 5',priority: '56'},
        ];

    store.state.maxCommandsPerPage = 1;
    store.commit('getPagesNeededForCommands');
    expect(store.state.pagesNeededForCommands).to.equal(3);

    store.state.maxCommandsPerPage = 2;
    store.commit('getPagesNeededForCommands');
    expect(store.state.pagesNeededForCommands).to.equal(2);

  });


  it('testGetCommandsToShowInTable', () => {
    store.state.currentPage = 1;
    store.state.maxCommandsPerPage = 2;
    store.state.filteredCommands = [
          {command: 'Turn On LED 1', priority: '100'},
          {command: 'Turn Off LED 1', priority: '23'},
          {command: 'Turn On PIN 5',priority: '56'},
        ];

    store.commit('getCommandsToShowInTable');
    expect(store.state.commandsForPage.length).to.equal(2);
    expect(store.state.commandsForPage[0].command).to.equal('Turn On LED 1');
    expect(store.state.commandsForPage[0].priority).to.equal('100');
    expect(store.state.commandsForPage[1].command).to.equal('Turn Off LED 1');
    expect(store.state.commandsForPage[1].priority).to.equal('23');
  });


  it('testDisplayModalForStreamAdding', () => {
      store.commit('displayModalForStreamAdding');
      expect(store.state.showModalForStreamAdding).to.equal(true);
  });


  it('testHideModalForStreamAdding', () => {
      store.commit('hideModalForStreamAdding');
      expect(store.state.showModalForStreamAdding).to.equal(false);
  });


  it('testDisplayModalForCommandAdding', () => {
      store.commit('displayModalForCommandAdding');
      expect(store.state.showModalForCommandAdding).to.equal(true);
  });


  it('testHideModalForCommandAdding', () => {
      store.commit('hideModalForCommandAdding');
      expect(store.state.showModalForCommandAdding).to.equal(false);
  });


  it('testDisplayModalForActionAdding', () => {
      store.commit('displayModalForActionAdding');
      expect(store.state.showModalForActionAdding).to.equal(true);
  });


  it('testHideModalForActionAdding', () => {
      store.commit('hideModalForActionAdding');
      expect(store.state.showModalForActionAdding).to.equal(false);
  });


  it('testDisplayModalForTriggerAdding', () => {
      store.commit('displayModalForTriggerAdding');
      expect(store.state.showModalForTriggerAdding).to.equal(true);
  });


  it('testHideModalForTriggerAdding', () => {
      store.commit('hideModalForTriggerAdding');
      expect(store.state.showModalForTriggerAdding).to.equal(false);
  });


  it('testTreatErrorForAddingDataStream', () => {
      let error = {
        response: {
          data: {
            message: 'Internal Server Error'
          },
          status:'500',
          headers:[]
        },
      };
      store.commit('treatErrorForAddingDataStream', error);
      expect(store.state.errorMessage).to.equal('Internal Server Error');

      store.state.dataStreamToAdd = "Data Stream 1";
      error = {
        request: { },
        message: 'Not Found'
      };

      store.commit('treatErrorForAddingDataStream', error);
      expect(store.state.errorMessage).to.equal("There was a problem adding Data Stream 1. Please try again!");
  });


  it('testErrorTreatmentForCommandAdding', () => {
    let error = {
      response: {
        data: {
          message: 'Internal Server Error'
        },
        status:'500',
        headers:[]
      },
    };
    store.commit('errorTreatmentForCommandAdding', error);
    expect(store.state.errorMessage).to.equal('Internal Server Error');
    store.state.commandToAdd.command = "Command 1";
    error = {
      request: { },
      message: 'Not Found'
    };

    store.commit('errorTreatmentForCommandAdding', error);
    expect(store.state.errorMessage).to.equal("There was a problem adding Command 1. Please try again!");
  });


  it('testDisplayErrorDetailsForAddingAction', () => {
      let error = {
        response: {
          data: {
            message: 'Internal Server Error'
          },
          status:'500',
          headers:[]
        },
      };
      store.commit('displayErrorDetailsForAddingAction', error);
      expect(store.state.errorMessage).to.equal('Internal Server Error');
      store.state.activeAction.name = "Action 1";
      error = {
        request: { },
        message: 'Not Found'
      };

      store.commit('displayErrorDetailsForAddingAction', error);
      expect(store.state.errorMessage).to.equal("There was a problem adding Action 1. Please try again!");
  });

  it('testErrorTreatmentForDataStreamAdding', () => {
      let error = {
        response: {
          data: {
            message: 'Internal Server Error'
          },
          status:'500',
          headers:[]
        },
      };
      store.commit('errorTreatmentForDataStreamAdding', error);
      store.state.dataStreamToAdd = "Data Stream 1";
      expect(store.state.errorMessage).to.equal('Internal Server Error');
  });


  it('testUpdateAction', () => {
    store.commit('updateAction');
  });

  it('testDrawMosTriggeredActionsChart', () => {
    console.log("AAA : " + JSON.stringify(document.getElementById('myPieChart2').outerHTML));
    store.commit('drawMosTriggeredActionsChart');
  });

  it('testDrawTriggerTypesPercentagesChart', () => {
    console.log("BBB : " + JSON.stringify(document.getElementById('percentageBar').outerHTML));
    store.commit('drawTriggerTypesPercentagesChart');
  });

  it('testDrawMostExecutedTriggersChart', () => {
    console.log("CCC : " + JSON.stringify(document.getElementById('barChart').outerHTML));
    store.commit('drawMostExecutedTriggersChart');
  });


  it('testDrawDataPointsChart', () => {
    console.log("DDD : " + JSON.stringify(document.getElementById('line-chart').outerHTML));

    store.state.labelsForDataPoints = [1,2,3];
    store.state.dataPointsAvailables = ['23','24','25'];
    store.state.activeDataStream = {name:'DataStream1'};

    store.commit('drawDataPointsChart');
  });


  it('testDisplayModalForStreamEditing', () => {
    store.state.showModalForStreamEditing = false;
    store.commit('displayModalForStreamEditing');
    expect(store.state.showModalForStreamEditing).to.equal(true);
  });

  it('testHideModalForStreamEditing', () => {
    store.state.showModalForStreamEditing = true;
    store.commit('hideModalForStreamEditing');
    expect(store.state.showModalForStreamEditing).to.equal(false);
  });

  it('testDisplayModalForActionEditing', () => {
    store.state.showModalForActionEditing = false;
    store.commit('displayModalForActionEditing');
    expect(store.state.showModalForActionEditing).to.equal(true);
  });

  it('testHideModalForActionEditing', () => {
    store.state.showModalForActionEditing = true;
    store.commit('hideModalForActionEditing');
    expect(store.state.showModalForActionEditing).to.equal(false);
  });

  it('testDisplayModalForActionDetails', () => {
    store.state.showModalForActionDetails = false;
    store.commit('displayModalForActionDetails');
    expect(store.state.showModalForActionDetails).to.equal(true);
  });

  it('testHideModalForActionDetails', () => {
    store.state.showModalForActionDetails = true;
    store.commit('hideModalForActionDetails');
    expect(store.state.showModalForActionDetails).to.equal(false);
  });

  it('testDisplayModalForDataPointsAdding', () => {
    store.state.showModalForDataPointsAdding = false;
    store.commit('displayModalForDataPointsAdding');
    expect(store.state.showModalForDataPointsAdding).to.equal(true);
  });

  it('testHideModalForDataPointsAdding', () => {
    store.state.showModalForDataPointsAdding = true;
    store.commit('hideModalForDataPointsAdding');
    expect(store.state.showModalForDataPointsAdding).to.equal(false);
  });

  it('testDisplayModalForDataPointsChart', () => {
    store.state.showModalForDataPointsChart = false;
    store.commit('displayModalForDataPointsChart');
    expect(store.state.showModalForDataPointsChart).to.equal(true);
  });

  it('testHideModalForDataPointsChart', () => {
    store.state.showModalForDataPointsChart = true;
    store.commit('hideModalForDataPointsChart');
    expect(store.state.showModalForDataPointsChart).to.equal(false);
  });

  it('testDisplayModalForTriggerDetails', () => {
    store.state.showModalForTriggerDetails = false;
    store.commit('displayModalForTriggerDetails');
    expect(store.state.showModalForTriggerDetails).to.equal(true);
  });

  it('testHideModalForTriggerDetails', () => {
    store.state.showModalForTriggerDetails = true;
    store.commit('hideModalForTriggerDetails');
    expect(store.state.showModalForTriggerDetails).to.equal(false);
  });

  it('testDisplayModalForRemovingElements', () => {
    store.state.showModalForRemovingElements = false;
    store.commit('displayModalForRemovingElements');
    expect(store.state.showModalForRemovingElements).to.equal(true);
  });

  it('testHideModalForRemovingElements', () => {
    store.state.showModalForRemovingElements = true;
    store.commit('hideModalForRemovingElements');
    expect(store.state.showModalForRemovingElements).to.equal(false);
  });

  it('testSetDataPointToAdd', () => {
    store.state.showModalForRemovingElements = true;
    store.state.dataPointToAdd = 0;
    store.commit('setdataPointToAdd', 5);
    expect(store.state.dataPointToAdd).to.equal(5);
  });

  it('testProcessDataPointsConfigured', () => {
    let response = [{value:1},{value:2},{value:3},{value:4},{value:5}];
    store.commit('processDataPointsConfigured',response);

    expect(store.state.dataPointsAvailables.length).to.equal(5);
    expect(store.state.dataPointsAvailables[0]).to.equal(1);
    expect(store.state.dataPointsAvailables[4]).to.equal(5);
    expect(store.state.labelsForDataPoints.length).to.equal(5);
    expect(store.state.labelsForDataPoints[0]).to.equal(1);
    expect(store.state.labelsForDataPoints[4]).to.equal(5);
    expect(store.state.dataPointsMaxValue).to.equal(5);
    expect(store.state.dataPointsMinValue).to.equal(1);
    expect(store.state.dataPointsAverageValue).to.equal(3);
  });


  it('testProcessDataPointsConfigured', () => {
      store.state.mostRecentlyUpdatedStreams = [{not_updated_since:7},{not_updated_since:9},{not_updated_since:13},{not_updated_since:3},{not_updated_since:2},{not_updated_since:1},{not_updated_since:5},{not_updated_since:4}];

      store.commit('determineMostRecentlyUpdatedStreams');

      expect(store.state.mostRecentlyUpdatedStreams.length).to.equal(5);
      expect(store.state.mostRecentlyUpdatedStreams[0].not_updated_since).to.equal(1);
      expect(store.state.mostRecentlyUpdatedStreams[1].not_updated_since).to.equal(2);
      expect(store.state.mostRecentlyUpdatedStreams[2].not_updated_since).to.equal(3);
      expect(store.state.mostRecentlyUpdatedStreams[3].not_updated_since).to.equal(4);
      expect(store.state.mostRecentlyUpdatedStreams[4].not_updated_since).to.equal(5);

      store.state.mostRecentlyUpdatedStreams = [{not_updated_since:1},{not_updated_since:5},{not_updated_since:4}];

      store.commit('determineMostRecentlyUpdatedStreams');

      expect(store.state.mostRecentlyUpdatedStreams.length).to.equal(3);
      expect(store.state.mostRecentlyUpdatedStreams[0].not_updated_since).to.equal(1);
      expect(store.state.mostRecentlyUpdatedStreams[1].not_updated_since).to.equal(4);
      expect(store.state.mostRecentlyUpdatedStreams[2].not_updated_since).to.equal(5);
  });


  it('testGetAmountOfTriggerTypes', () => {
    let existingTriggers = [
          {name: 'Trigger1', action: 'Tweet', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius', 'Temperature current value > 24 Celsius', 'Time interval' ]},
          {name: 'Trigger2', action: 'Make Facebook Post', policy: {type: 'data_point_registration',	elem: 'Temperature' }, conditions: ['Always']	},
          {name: 'Trigger3', action: 'Send Email', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius']},
          {name: 'Trigger4', action: 'Start Engine Alfa', policy: {type:'data_point_registration', elem: 'Temperature'}, conditions: ['Always']},
          {name: 'Trigger5', action: 'Sense Temperature', policy: {type: 'periodical', elem: 'Fridays' }, conditions: ['Always']},
          {name: 'Trigger6', action: 'Start Engine Alfa', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius', 'Temperature current value > 24 Celsius', 'Time interval' ]},
        ];

    store.state.existingTriggers = existingTriggers;

    store.commit('getAmountOfTriggerTypes');

    expect(store.state.amountOfDataPointTriggers).to.equal(5);
    expect(store.state.amountOfPeriodicalTriggers).to.equal(1);
  });


  it('testGetNextCommandsInQueue', () => {

    let existingCommands = [
          {command: 'Turn On LED 1', priority: '100'},
          {command: 'Turn On PIN 5',priority: '56'},
          {command: 'Turn Off LED 1', priority: '23'},
        ];
    let response = {data: existingCommands};
    store.commit('getNextCommandsInQueue', response);
    expect(store.state.existingCommandsPrioritized.length).to.equal(3);
  });


  it('testGetNextCommandsInQueue', () => {
    let customDate = new Date(999999999999);
    //Sat Sep 08 2001 22:46:39 GMT-0300 (-03)
    //Sun Sep 09 2001 01:46:39 UTC

    store.state.dataStreamsConfigured = [
      {name:'DataStream1',current_value:'N/A',last_update:'N/A',links:{data_points:'http://localhost:8090/data-streams/39fef8d1-2a41-0d00-bcf5-f2750dff89b3/data-points', self:'http://localhost:8090/data-streams/39fef8d1-2a41-0d00-bcf5-f2750dff89b3'}},
      {name:'DataStream2',current_value:65, last_update:'2001-09-08T21:00:41Z', links:{ data_points:'http://localhost:8090/data-streams/9eb98dd3-2a41-0d00-bcf6-f0660dff89b3/data-points', self :'http://localhost:8090/data-streams/9eb98dd3-2a41-0d00-bcf6-f0660dff89b3'}},
      {name:'DataStream3',current_value:77, last_update :'2001-09-08T21:00:35Z', links :{ data_points :'http://localhost:8090/data-streams/265ee7d3-2a41-0d00-bcf7-d9150dff89b3/data-points',self:'http://localhost:8090/data-streams/265ee7d3-2a41-0d00-bcf7-d9150dff89b3'}}
    ]

    store.commit('determineUpdateTimeForStreams', customDate);

    expect(store.state.dataStreamsConfigured[1].not_updated_since).to.equals(285.98331666666667);
    expect(store.state.dataStreamsConfigured[2].not_updated_since).to.equals(286.0833166666667);
    expect(store.state.mostRecentlyUpdatedStreams.length).to.equals(2);

  });

})
