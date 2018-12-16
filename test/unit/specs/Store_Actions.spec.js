import Vue from 'vue';
import {store} from '../../../src/store/store.js';

// PENDING!!
// showDashboardView | showActionView |


describe('Actions', () => {

  it('showAddDataStreamModalTest', () => {
    store.state.showAddDataStreamModal=false;
    store.dispatch('showAddDataStreamModal')
    expect(store.state.showAddDataStreamModal).to.equal(true)

  });


  it('hideAddDataStreamModalTest', () => {
    store.state.showAddDataStreamModal=true;
    store.dispatch('hideAddDataStreamModal')
    expect(store.state.showAddDataStreamModal).to.equal(false)

  });

  it('setMaxDataStreamsPerPageOddAmountOfElementsTest', () => {
    store.state.maxDataStreamsPerPage = 0;
    store.state.currentPage = 1
    store.state.dataStreamsForPage = []


    store.state.filteredDataStreams = [ {id: 0, name: 'Solar light in garden'}, {id: 1, name: 'Temperature inside the house'}, {id: 2, name: 'Temperature outside the house'}, {id: 3, name: 'Solar light in terrace'}, {id: 4, name: 'Rain Sensor'} ]

    store.dispatch('setMaxDataStreamsPerPage', 2)


    expect(store.state.dataStreamsForPage.length).to.equals(2)
    expect(store.state.dataStreamsForPage[0].name).to.equals('Solar light in garden')
    expect(store.state.dataStreamsForPage[1].name).to.equals('Temperature inside the house')

    expect(store.state.pagesNeededForDataStreams).to.equals(3)
    expect(store.state.maxDataStreamsPerPage).to.equal(2)
    expect(store.state.currentPage).to.equal(1)


  });


  it('setMaxDataStreamsPerPageEvenAmountOfElementsTest', () => {
    store.state.maxDataStreamsPerPage = 0;
    store.state.currentPage = 1
    store.state.dataStreamsForPage = []


    store.state.filteredDataStreams = [ {id: 0, name: 'Solar light in garden'}, {id: 1, name: 'Temperature inside the house'}, {id: 2, name: 'Temperature outside the house'}, {id: 3, name: 'Solar light in terrace'}]

    store.dispatch('setMaxDataStreamsPerPage', 2)


    expect(store.state.dataStreamsForPage.length).to.equals(2)
    expect(store.state.dataStreamsForPage[0].name).to.equals('Solar light in garden')
    expect(store.state.dataStreamsForPage[1].name).to.equals('Temperature inside the house')

    expect(store.state.pagesNeededForDataStreams).to.equals(2)
    expect(store.state.maxDataStreamsPerPage).to.equal(2)
    expect(store.state.currentPage).to.equal(1)


  });


    it('setMaxActionsPerPageEvenAmountOfElementsTest', () => {
        store.state.maxActionsPerPage = 0;
        store.state.currentPage = 1
        store.state.actionsForPage = []


        store.state.filteredActions = [ {id: 1, name: 'Tweet', type:'http_request', method:'POST', url:'https://twitter.com',       version:'1.1', body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
          {id: 2, name: 'Make Facebook Post', type:'http_request', method:'POST', url:'https://facebook.com', version:'1.1', body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
          {id: 3, name: 'Send Email', type:'http_request', method:'POST', url:'https://gmail.com', version:'1.1', body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
          {id: 4, name: 'Start Engine Alfa', type:'http_request', method:'POST', url:'http://device1.com', version:'1.1', body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
          {id: 5, name: 'Sense Temperature', type:'http_request', method:'GET', url:'http://device2.com', version:'1.1', body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]},
          {id: 6, name: 'Command A', type:'command', priority:'High'}]

        store.dispatch('setMaxActionsPerPage', 2)


        expect(store.state.actionsForPage.length).to.equals(2)
        expect(store.state.actionsForPage[0].name).to.equals('Tweet')
        expect(store.state.actionsForPage[1].name).to.equals('Make Facebook Post')

        expect(store.state.pagesNeededForActions).to.equals(3)
        expect(store.state.maxActionsPerPage).to.equal(2)
        expect(store.state.currentPage).to.equal(1)
  });

    it('filterDataStreamToDisplayTest', () => {

        store.state.maxDataStreamsPerPage = 2;
        store.state.currentPage = 1
        store.state.dataStreamsForPage = []

        store.state.dataStreamsConfigured = [ {id: 0, name: 'Solar light in garden'}, {id: 1, name: 'Temperature inside the house'}, {id: 2, name: 'Temperature outside the house'}, {id: 3, name: 'Solar light in terrace'}, {id: 4, name: 'Rain Sensor'} ]

        store.dispatch('filterDataStreamToDisplay', 'Temperature')

        expect(store.state.filteredDataStreams.length).to.equals(2)
        expect(store.state.filteredDataStreams[0].name).to.equals('Temperature inside the house')
        expect(store.state.filteredDataStreams[1].name).to.equals('Temperature outside the house')

        expect(store.state.pagesNeededForDataStreams).to.equals(1)
        expect(store.state.maxDataStreamsPerPage).to.equal(2)
        expect(store.state.currentPage).to.equal(1)

    });



    it('openNavTest', () => {
        store.state.sideNavStyle.backgroundColor = "white";
        store.state.sideNavStyle.width = "0";
        store.dispatch('openNav')
        expect(store.state.sideNavStyle.backgroundColor).to.equals("#111")
        expect(store.state.sideNavStyle.width).to.equals("250px")
    });

    it('closeNavTest', () => {
        store.state.sideNavStyle.backgroundColor = "#111";
        store.state.sideNavStyle.width = "250px";

        store.dispatch('closeNav')
        expect(store.state.sideNavStyle.backgroundColor).to.equals("white")
        expect(store.state.sideNavStyle.width).to.equals("0")
    });

    it('testDisplayModalForStreamAdding', () => {
        store.dispatch('displayModalForStreamAdding');
        expect(store.state.showModalForStreamAdding).to.equal(true);
    });


    it('testHideModalForStreamAdding', () => {
        store.dispatch('hideModalForStreamAdding');
        expect(store.state.showModalForStreamAdding).to.equal(false);
    });


    it('testDisplayModalForCommandAdding', () => {
        store.dispatch('displayModalForCommandAdding');
        expect(store.state.showModalForCommandAdding).to.equal(true);
    });


    it('testHideModalForCommandAdding', () => {
        store.dispatch('hideModalForCommandAdding');
        expect(store.state.showModalForCommandAdding).to.equal(false);
    });


    it('testDisplayModalForActionAdding', () => {
        store.dispatch('displayModalForActionAdding');
        expect(store.state.showModalForActionAdding).to.equal(true);
    });


    it('testHideModalForActionAdding', () => {
        store.dispatch('hideModalForActionAdding');
        expect(store.state.showModalForActionAdding).to.equal(false);
    });


    it('testDisplayModalForTriggerAdding', () => {
        store.dispatch('displayModalForTriggerAdding');
        expect(store.state.showModalForTriggerAdding).to.equal(true);
    });


    it('testHideModalForTriggerAdding', () => {
        store.dispatch('hideModalForTriggerAdding');
        expect(store.state.showModalForTriggerAdding).to.equal(false);
    });


});
