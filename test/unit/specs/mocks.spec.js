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

})
