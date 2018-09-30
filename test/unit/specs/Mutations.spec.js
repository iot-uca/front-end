import Vue from 'vue';
import {store} from '../../../src/store/store.js';


describe('Mutations', () => {
  it('increase options should increase options in 1', () => {
      
    store.state.options = [ {name: 'uno', value: 2}, {name: 'uno', value: 3} ]
    console.log("dddd: " + store.state.options[0].name)
    console.log("dddd: " + store.state.options[0].value)
    store.commit('increaseOptions')
    expect(store.state.options[0].value).to.equal(3)
      expect(store.state.options[1].value).to.equal(4)
  });    
    
  it('showDashboardView should only show dashboard view', () => {
      
    store.commit('showDashboardView')
      
    expect(store.state.renderDashboardView).to.equal(true)
    expect(store.state.renderDataStreamView).to.equal(false)
    expect(store.state.renderActionAddView).to.equal(false)
    expect(store.state.renderTriggerAddView).to.equal(false)
    expect(store.state.renderSecurityView).to.equal(false)
    expect(store.state.renderAboutView).to.equal(false)      
  });
    
  it('showDashboardView should only show data streams view', () => {
      
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
    
// PENDING!!!
// filterActionsToDisplay  |  filterTriggersToDisplay  |  filterDataStreamToDisplay | errorTreatmentForDataStreamAdding | displayErrorDetailsForAddingAction | 
  
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
    
    /*it('prepareDataStreamAddingTest', () => {  
    store.commit('prepareDataStreamAdding')
    expect(store.state.displayLoadingFeedback).to.equal(true)
  });
    
    
    it('displaySuccessDataStreamAddingTest', () => {  
        
    store.state.dataStreamToAdd='Backyard door sensor'
    store.commit('displaySuccessDataStreamAdding')
    expect(store.state.displayLoadingFeedback).to.equal(false)
     expect(store.state.errorInInteraction).to.equal(false)
     expect(store.state.successMessage).to.equal('Backyard door sensor added successfully.')
     expect(store.state.dataStreamToAdd).to.equal('')     
  });
    */
    
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
    
    /*it('setActionAddSuccessDetailsTest', () => {  
        store.state.activeAction.name='Post on Facebook'
        
        store.commit('setActionAddSuccessDetails')   
        expect(store.state.displayLoadingFeedback).to.equal(false)
         expect(store.state.errorInInteraction).to.equal(false)
        
         expect(store.state.successMessage).to.equal('Post on Facebook added successfully.')
  });*/
    
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
       expect(store.state.isTimePeriodPolicy).to.equals(true)
      
       trigger.policy.type = 'time_interval'
       store.commit('editTrigger', trigger) 
       expect(store.state.activeTrigger).to.equals(trigger)      
       expect(store.state.isTimePeriodPolicy).to.equals(false)
            
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
        
        store.state.conditionSelected = {
            id:1,
            text:'Always'
        }
        
        store.commit('addNewCondition') 
        expect(store.state.conditionsForTrigger.length).to.equals(1)
        expect(store.state.conditionsForTrigger[0].id).to.equals(1)
        expect(store.state.conditionsForTrigger[0].condition).to.equals('Always')
        expect(store.state.conditionsForTrigger[0].elemId).to.equals(0)
        expect(store.state.conditionsCounter).to.equals(1)
        
        //2 - on data Stream value
        store.state.onDataStreamValueCondition.dataStream='Temperature sensor'
        store.state.onDataStreamValueCondition.condition='>'
        store.state.onDataStreamValueCondition.value='20'
        
        store.state.conditionSelected.text = 'On Data Stream value'
        store.state.conditionSelected.id = 2
        
        store.commit('addNewCondition')
        expect(store.state.conditionsForTrigger.length).to.equals(2)
        expect(store.state.conditionsForTrigger[1].id).to.equals(2)
        expect(store.state.conditionsForTrigger[1].condition).to.equals('On Data Stream value')
        expect(store.state.conditionsForTrigger[1].elemId).to.equals(1)
        //expect(store.state.conditionsForTrigger[1].details.dataStream).to.equals('Temperature sensor')
        expect(store.state.conditionsForTrigger[1].details.condition).to.equals('>')
        expect(store.state.conditionsForTrigger[1].details.value).to.equals('20')
        
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
        expect(store.state.conditionsForTrigger.length).to.equals(3)
        expect(store.state.conditionsForTrigger[2].id).to.equals(3)
        expect(store.state.conditionsForTrigger[2].condition).to.equals('When Data Stream has not been updated for')
        expect(store.state.conditionsForTrigger[2].elemId).to.equals(2)
        //expect(store.state.conditionsForTrigger[2].details.dataStream).to.equals('Temperature sensor')
        expect(store.state.conditionsForTrigger[2].details.dataStreamNotUpdatedFrom.months).to.equals(0)
        expect(store.state.conditionsForTrigger[2].details.dataStreamNotUpdatedFrom.weeks).to.equals(1)
        expect(store.state.conditionsForTrigger[2].details.dataStreamNotUpdatedFrom.days).to.equals(0)
        expect(store.state.conditionsForTrigger[2].details.dataStreamNotUpdatedFrom.hours).to.equals(1)
        expect(store.state.conditionsForTrigger[2].details.dataStreamNotUpdatedFrom.minutes).to.equals(0)
        expect(store.state.conditionsForTrigger[2].details.dataStreamNotUpdatedFrom.seconds).to.equals(0)
        
        expect(store.state.conditionsCounter).to.equals(3)
            
        //4 - Time interval
        store.state.timeIntervalCondition.from = '01:23'
        store.state.timeIntervalCondition.to = '07:10'
        
        store.state.conditionSelected.text = 'Time interval'
        store.state.conditionSelected.id = 4
        
        store.commit('addNewCondition')
        expect(store.state.conditionsForTrigger.length).to.equals(4)
        expect(store.state.conditionsForTrigger[3].id).to.equals(4)
        expect(store.state.conditionsForTrigger[3].condition).to.equals('Time interval')
        expect(store.state.conditionsForTrigger[3].elemId).to.equals(3)
        expect(store.state.conditionsForTrigger[3].details.from).to.equals('01:23')
        expect(store.state.conditionsForTrigger[3].details.to).to.equals('07:10')
        expect(store.state.conditionsCounter).to.equals(4)
    }); 
    
    
    
    
    
    
})