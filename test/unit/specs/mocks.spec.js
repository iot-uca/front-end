import moxios from "moxios";
import axios from 'axios'
import sinon from 'sinon'
import { equal } from 'assert'
import {store} from '../../../src/store/store.js';


describe('mocking axios requests', function () {

  it('GET /data-streams', function (done) {

    store.state.maxDataStreamsPerPage = 5;

    moxios.withMock(function () {
      let onFulfilled = sinon.spy()

      store.dispatch('showDataStreamView', 'http://localhost:1111').then(onFulfilled)

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          statusText: 'OK',
          response: [
            {id: 1, name: 'DataStream1'},{id: 2, name: 'DataStream2'}, {id: 3, name: 'DataStream3'}
          ]
        }).then(function () {
          equal(onFulfilled.called, true)
          expect(store.state.dataStreamsForPage.length).to.equal(3)
          expect(store.state.dataStreamsForPage[0].name).to.equal('DataStream1')
          expect(store.state.dataStreamsForPage[0].id).to.equal(1)
          expect(store.state.dataStreamsForPage[1].name).to.equal('DataStream2')
          expect(store.state.dataStreamsForPage[1].id).to.equal(2)
          expect(store.state.dataStreamsForPage[2].name).to.equal('DataStream3')
          expect(store.state.dataStreamsForPage[2].id).to.equal(3)
          done()
        })
      })
    })

  });



  it('GET /commands', function (done) {

    store.state.maxCommandsPerPage = 5;

    moxios.withMock(function () {
      let onFulfilled = sinon.spy()
      //axios.get('/users/12345').then(onFulfilled)

      store.dispatch('showCommandView', 'http://localhost:1111').then(onFulfilled)

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          statusText: 'OK',
          response: [
            {priority: 1, command: 'Command1'},{priority: 2, command: 'Command2'}, {priority: 3, command: 'Command3'}
          ]
        }).then(function () {
          equal(onFulfilled.called, true)
          expect(store.state.commandsForPage.length).to.equal(3)
          expect(store.state.commandsForPage[0].command).to.equal('Command1')
          expect(store.state.commandsForPage[0].priority).to.equal(1)
          expect(store.state.commandsForPage[1].command).to.equal('Command2')
          expect(store.state.commandsForPage[1].priority).to.equal(2)
          expect(store.state.commandsForPage[2].command).to.equal('Command3')
          expect(store.state.commandsForPage[2].priority).to.equal(3)
          done()
        })
      })
    })

  });

  it('GET /actions', function (done) {

    store.state.maxActionsPerPage = 5;

    moxios.withMock(function () {
      let onFulfilled = sinon.spy()
      //axios.get('/users/12345').then(onFulfilled)

      store.dispatch('showActionView', 'http://localhost:1111').then(onFulfilled)

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          statusText: 'OK',
          response: [
            {id: 1, name: 'Tweet', type:'http_request', method:'POST', url:'https://twitter.com', version:'1.1', body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
            {id: 2, name: 'Make Facebook Post', type:'http_request', method:'POST', url:'https://facebook.com', version:'1.1', body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}
          ]
        }).then(function () {
          equal(onFulfilled.called, true)
          expect(store.state.actionsForPage.length).to.equal(2)
          expect(store.state.actionsForPage[0].name).to.equal('Tweet')
          expect(store.state.actionsForPage[0].url).to.equal('https://twitter.com')
          expect(store.state.actionsForPage[1].name).to.equal('Make Facebook Post')
          expect(store.state.actionsForPage[1].url).to.equal('https://facebook.com')
          done()
        })
      })
    })

  });

  it('GET /triggers', function (done) {

    store.state.maxTriggersPerPage = 5;

    moxios.withMock(function () {
      let onFulfilled = sinon.spy()

      store.dispatch('showTriggerView', 'http://localhost:1111').then(onFulfilled)

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          statusText: 'OK',
          response: [
            { name: 'Trigger1', action : 'Tweet', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius', 'Temperature current value > 24 Celsius', 'Time interval' ]},
            {name: 'Trigger2', action: 'Make Facebook Post', policy: {type: 'data_point_registration',	elem: 'Temperature' }, conditions: ['Always']	}
          ]
        }).then(function () {
          equal(onFulfilled.called, true)
          expect(store.state.triggersForPage.length).to.equal(2)
          expect(store.state.triggersForPage[0].name).to.equal('Trigger1')
          expect(store.state.triggersForPage[0].action).to.equal('Tweet')
          expect(store.state.triggersForPage[1].name).to.equal('Trigger2')
          expect(store.state.triggersForPage[1].action).to.equal('Make Facebook Post')
          done()
        })
      })
    })

  });

  it('GET /data-points', function (done) {

    moxios.withMock(function () {
      let onFulfilled = sinon.spy()

      store.state.activeDataStream = {links:{data_points: 'http://localhost:1111'}};

      store.dispatch('getDataPoints').then(onFulfilled)

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          statusText: 'OK',
          response: [
            {value: '1'},{value: '4'}, {value: '11'}
          ]
        }).then(function () {
          equal(onFulfilled.called, true)
          expect(store.state.dataPointsAvailables.length).to.equal(3)
          expect(store.state.dataPointsAvailables[0]).to.equal("11")
          expect(store.state.dataPointsAvailables[1]).to.equal("4")
          expect(store.state.dataPointsAvailables[2]).to.equal("1")
          done()
        })
      })
    })

  });


  it('GET /data-points with error', function (done) {
    moxios.withMock(function () {
      let onFulfilled = sinon.spy()

      store.state.activeDataStream = {links:{data_points: 'http://localhost:1111'}};

      store.dispatch('getDataPoints').then(onFulfilled)

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 500,
          statusText: 'Internal Server Error',
          response: []
        }).then(function () {
          equal(onFulfilled.called, true)
          expect(store.state.displayLoadingFeedback).to.equal(false)
          expect(store.state.elementsToDelete.length).to.equal(0)
          done()
        })
      })
    })

  });



  it('GET /commands?order=priority', function (done) {

    moxios.withMock(function () {
      let onFulfilled = sinon.spy()

      store.dispatch('getNextCommandsInQueue', 'http://localhost:1111').then(onFulfilled)

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          statusText: 'OK',
          response: [
            {command: 'Turn On LED 1', priority: '100'},
            {command: 'Turn Off LED 1', priority: '56'},
            {command: 'Turn On PIN 5',priority: '23'}
          ]
        }).then(function () {
          equal(onFulfilled.called, true)
          expect(store.state.existingCommandsPrioritized.length).to.equal(3)
          expect(store.state.existingCommandsPrioritized[0].command).to.equal('Turn On LED 1')
          expect(store.state.existingCommandsPrioritized[0].priority).to.equal('100')
          expect(store.state.existingCommandsPrioritized[1].command).to.equal('Turn Off LED 1')
          expect(store.state.existingCommandsPrioritized[1].priority).to.equal('56')
          expect(store.state.existingCommandsPrioritized[2].command).to.equal('Turn On PIN 5')
          expect(store.state.existingCommandsPrioritized[2].priority).to.equal('23')
          done()
        })
      })
    })

  });



  it('POST /data-streams', function (done) {
    store.state.dataStreamToAdd = 'Data Stream 1';

    moxios.withMock(function () {
      let onFulfilled = sinon.spy()

      store.dispatch('addDataStream', 'http://localhost:1111').then(onFulfilled)

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          statusText: 'OK',
          response: [ ]
        }).then(function () {
          equal(onFulfilled.called, true)
          expect(store.state.displayLoadingFeedback).to.equal(false)
          expect(store.state.errorInInteraction).to.equal(false)
          expect(store.state.dataStreamToAdd).to.equal('')
          done()
        })
      })
    })

  });

  it('POST /commands', function (done) {

    store.state.commandToAdd.command = "Command 1";
    store.state.commandToAdd.priority = 12;

    moxios.withMock(function () {
      let onFulfilled = sinon.spy()

      store.dispatch('addCommand', 'http://localhost:1111').then(onFulfilled)

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          statusText: 'OK',
          response: [ ]
        }).then(function () {
          equal(onFulfilled.called, true)
          expect(store.state.displayLoadingFeedback).to.equal(false)
          expect(store.state.errorInInteraction).to.equal(false)
          done()
        })
      })
    })

  });

  it('POST /actions', function (done) {

    store.state.activeAction.name = "Action to Add";
    store.state.activeAction.url = "myUrl";
    store.state.activeAction.method = "POST";
    store.state.activeAction.version = "HTTP 1.1";
    store.state.activeIdsForHttpRequestHeader = "";
    store.state.actionBody = "";

    moxios.withMock(function () {
      let onFulfilled = sinon.spy()

      store.dispatch('addAction', 'http://localhost:1111', '', '').then(onFulfilled)

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          statusText: 'OK',
          response: [ ]
        }).then(function () {
          equal(onFulfilled.called, true)
          expect(store.state.displayLoadingFeedback).to.equal(false)
          expect(store.state.errorInInteraction).to.equal(false)
          expect(store.state.successMessage).to.equal("Action to Add added successfully.")
          done()
        })
      })
    })

  });

  it('POST /triggers', function (done) {

    store.state.isTimePeriodPolicy = true;
    store.state.activeTrigger.timePeriod= {granularity: "10 seg"};
    store.state.activeTrigger.name = "Trigger1";
    store.state.activeTrigger.action = "Action1";
    store.state.conditionsForTrigger = "Always";

    moxios.withMock(function () {
      let onFulfilled = sinon.spy()

      store.dispatch('addTrigger', 'http://localhost:1111').then(onFulfilled)

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          statusText: 'OK',
          response: [ ]
        }).then(function () {
          equal(onFulfilled.called, true)
          expect(store.state.displayLoadingFeedback).to.equal(false)
          expect(store.state.errorInInteraction).to.equal(false)
          expect(store.state.successMessage).to.equal("Trigger1 added successfully.")
          done()
        })
      })
    })

  });

/*
  it('POST /data-points', function (done) {
    store.state.activeDataStream = {name: 'Data Stream 1'};
    store.state.dataPointToAdd = '77';

    moxios.withMock(function () {
      let onFulfilled = sinon.spy()

      store.dispatch('addDataPoint', 'http://localhost:1111').then(onFulfilled)

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          statusText: 'OK',
          response: []
        }).then(function () {
          equal(onFulfilled.called, true)
          expect(store.state.displayLoadingFeedback).to.equal(false)
          expect(store.state.errorInInteraction).to.equal(false)
          expect(store.state.showModalForRequestResult).to.equal(true)
          expect(store.state.dataStreamToAdd).to.equal('')
          expect(store.state.successMessage).to.equal(77 +'registered successfully on Data Stream 1')
          done()
        })
      })
    })
  });
*/
  it('DELETE /something', function (done) {
    store.state.elementsToDelete = [{links:{self:"http://localhost:1111/triggers/i-den-ti-fi-er"}}];

    moxios.withMock(function () {
      let onFulfilled = sinon.spy()

      store.dispatch('deleteElements','').then(onFulfilled)

      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          statusText: 'OK',
          response: [ ]
        }).then(function () {
          equal(onFulfilled.called, true)
          expect(store.state.displayLoadingFeedback).to.equal(false)
          expect(store.state.errorInInteraction).to.equal(false)
          expect(store.state.successMessage).to.equal("Elements deleted successfully!")
          done()
        })
      })
    })

  });

// Need to validate behavior when status code != 200

})
