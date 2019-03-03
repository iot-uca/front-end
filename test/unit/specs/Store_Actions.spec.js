import Vue from 'vue';
import {store} from '../../../src/store/store.js';

describe('Actions', () => {

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

    it('testSetMaxCommandsPerPage', () => {
        let existingCommands = [
            {command: 'Turn On LED 1', priority: '100'},
            {command: 'Turn Off LED 1', priority: '23'},
            {command: 'Turn On PIN 5',priority: '56'},
        ];

        store.state.existingCommands = existingCommands;
        store.dispatch('setMaxCommandsPerPage',2);
        expect(store.state.commandsForPage.length).to.equal(2);
        expect(store.state.commandsForPage[0].command).to.equal('Turn On LED 1');
        expect(store.state.commandsForPage[1].command).to.equal('Turn Off LED 1');
    });

    it('testShowDashboardView', () => {
      store.dispatch('showDashboardView');
      expect(store.state.renderDashboardView).to.equal(true);
      expect(store.state.renderDataStreamView).to.equal(false);
      expect(store.state.renderActionAddView).to.equal(false);
      expect(store.state.renderTriggerAddView).to.equal(false);
      expect(store.state.renderSecurityView).to.equal(false);
      expect(store.state.renderAboutView).to.equal(false);
      expect(store.state.renderCommandsView).to.equal(false);
      expect(store.state.elementsToDelete.length).to.equal(0);

    });

    it('testShowSecurityView', () => {
      store.dispatch('showSecurityView');
      expect(store.state.renderDashboardView).to.equal(false);
      expect(store.state.renderDataStreamView).to.equal(false);
      expect(store.state.renderActionAddView).to.equal(false);
      expect(store.state.renderTriggerAddView).to.equal(false);
      expect(store.state.renderSecurityView).to.equal(true);
      expect(store.state.renderAboutView).to.equal(false);
      expect(store.state.renderCommandsView).to.equal(false);
      expect(store.state.elementsToDelete.length).to.equal(0);

    });

    it('testShowAboutView', () => {
      store.dispatch('showAboutView');
      expect(store.state.renderDashboardView).to.equal(false);
      expect(store.state.renderDataStreamView).to.equal(false);
      expect(store.state.renderActionAddView).to.equal(false);
      expect(store.state.renderTriggerAddView).to.equal(false);
      expect(store.state.renderSecurityView).to.equal(false);
      expect(store.state.renderAboutView).to.equal(true);
      expect(store.state.renderCommandsView).to.equal(false);
      expect(store.state.elementsToDelete.length).to.equal(0);

    });

    it('testDisplayPrevPageCommands', () => {
      let existingCommands = [
          {command: 'Turn On LED 1', priority: '100'},
          {command: 'Turn Off LED 1', priority: '23'},
          {command: 'Turn On PIN 5',priority: '56'},
      ];
      store.state.currentPage = 2;
      store.state.maxCommandsPerPage = 1;
      store.state.existingCommands = existingCommands;
      store.state.filteredCommands = existingCommands;

      store.dispatch('displayPrevPageCommands');

      expect(store.state.commandsForPage.length).to.equal(1);
      expect(store.state.commandsForPage[0].command).to.equal('Turn On LED 1');

    });

    it('testDisplayNextPageCommands', () => {
      let existingCommands = [
          {command: 'Turn On LED 1', priority: '100'},
          {command: 'Turn Off LED 1', priority: '23'},
          {command: 'Turn On PIN 5',priority: '56'},
      ];
      store.state.currentPage = 2;
      store.state.maxCommandsPerPage = 1;
      store.state.existingCommands = existingCommands;
      store.state.filteredCommands = existingCommands;

      store.dispatch('displayNextPageCommands');

      expect(store.state.commandsForPage.length).to.equal(1);
      expect(store.state.commandsForPage[0].command).to.equal('Turn On PIN 5');

    });


    it('testDisplayPrevPageActions', () => {
      let existingActions = [
        {id: 1, name: 'Tweet', http_request:{ request_line: { method:'POST', url:'https://twitter.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 2, name: 'Make Facebook Post', http_request:{ request_line: { method:'POST', url:'https://facebook.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 3, name: 'Send Email',  http_request:{ request_line: { method:'POST', url:'https://gmail.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 4, name: 'Start Engine Alfa',  http_request:{ request_line: { method:'POST', url:'http://device1.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 5, name: 'Sense Temperature',  http_request:{ request_line: { method:'GET', url:'http://device2.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}}
      ];

      store.state.currentPage = 2;
      store.state.maxActionsPerPage = 1;
      store.state.existingActions = existingActions;
      store.state.filteredActions = existingActions;

      store.dispatch('displayPrevPageActions');

      expect(store.state.actionsForPage.length).to.equal(1);
      expect(store.state.actionsForPage[0].name).to.equal('Tweet');

    });


    it('testDisplayNextPageActions', () => {
      let existingActions = [
        {id: 1, name: 'Tweet', http_request:{ request_line: { method:'POST', url:'https://twitter.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 2, name: 'Make Facebook Post', http_request:{ request_line: { method:'POST', url:'https://facebook.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 3, name: 'Send Email',  http_request:{ request_line: { method:'POST', url:'https://gmail.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 4, name: 'Start Engine Alfa',  http_request:{ request_line: { method:'POST', url:'http://device1.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 5, name: 'Sense Temperature',  http_request:{ request_line: { method:'GET', url:'http://device2.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}}
      ];

      store.state.currentPage = 2;
      store.state.maxActionsPerPage = 1;
      store.state.existingActions = existingActions;
      store.state.filteredActions = existingActions;

      store.dispatch('displayNextPageActions');

      expect(store.state.actionsForPage.length).to.equal(1);
      expect(store.state.actionsForPage[0].name).to.equal('Send Email');

    });


    it('testGetActionsToShowInTable', () => {
      let existingActions = [
        {id: 1, name: 'Tweet', http_request:{ request_line: { method:'POST', url:'https://twitter.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 2, name: 'Make Facebook Post', http_request:{ request_line: { method:'POST', url:'https://facebook.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 3, name: 'Send Email',  http_request:{ request_line: { method:'POST', url:'https://gmail.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 4, name: 'Start Engine Alfa',  http_request:{ request_line: { method:'POST', url:'http://device1.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 5, name: 'Sense Temperature',  http_request:{ request_line: { method:'GET', url:'http://device2.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}}
      ];

      store.state.currentPage = 2;
      store.state.maxActionsPerPage = 1;
      store.state.existingActions = existingActions;
      store.state.filteredActions = existingActions;

      store.dispatch('getActionsToShowInTable', 4);

      expect(store.state.actionsForPage.length).to.equal(1);
      expect(store.state.actionsForPage[0].name).to.equal('Start Engine Alfa');

    });

    it('testGetCommandsToShowInTable', () => {
      let existingCommands = [
          {command: 'Turn On LED 1', priority: '100'},
          {command: 'Turn Off LED 1', priority: '23'},
          {command: 'Turn On PIN 5',priority: '56'},
      ];

      store.state.currentPage = 2;
      store.state.maxCommandsPerPage = 1;
      store.state.filteredCommands = existingCommands;
      store.state.existingCommands = existingCommands;

      store.dispatch('getCommandsToShowInTable', 2);

      expect(store.state.commandsForPage.length).to.equal(1);
      expect(store.state.commandsForPage[0].command).to.equal('Turn Off LED 1');

    });


    it('testGetDataStreamsToShowInTable', () => {
      let existingStreams = [
          {id: 0, name: 'Solar light in garden'},
          {id: 1, name: 'Temperature inside the house'},
          {id: 2, name: 'Temperature outside the house'}];

      store.state.currentPage = 2;
      store.state.maxDataStreamsPerPage = 1;
      store.state.filteredDataStreams = existingStreams;
      store.state.existingStreams = existingStreams;

      store.dispatch('getDataStreamsToShowInTable', 2);

      expect(store.state.dataStreamsForPage.length).to.equal(1);
      expect(store.state.dataStreamsForPage[0].name).to.equal('Temperature inside the house');

    });

    it('testGetTriggersToShowInTable', () => {
      let existingTriggers = [
        { name: 'Trigger1', action : 'Tweet', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius', 'Temperature current value > 24 Celsius', 'Time interval' ]},
        {name: 'Trigger2', action: 'Make Facebook Post', policy: {type: 'data_point_registration',	elem: 'Temperature' }, conditions: ['Always']	}
      ];

      store.state.currentPage = 1;
      store.state.maxTriggersPerPage = 1;
      store.state.filteredTriggers = existingTriggers;
      store.state.existingTriggers = existingTriggers;

      store.dispatch('getTriggersToShowInTable', 2);

      expect(store.state.triggersForPage.length).to.equal(1);
      expect(store.state.triggersForPage[0].name).to.equal('Trigger2');

    });

    it('testDisplayPrevPageTriggers', () => {
      let existingTriggers = [
        { name: 'Trigger1', action : 'Tweet', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius', 'Temperature current value > 24 Celsius', 'Time interval' ]},
        {name: 'Trigger2', action: 'Make Facebook Post', policy: {type: 'data_point_registration',	elem: 'Temperature' }, conditions: ['Always']	}
      ];

      store.state.currentPage = 2;
      store.state.maxTriggersPerPage = 1;
      store.state.filteredTriggers = existingTriggers;
      store.state.existingTriggers = existingTriggers;

      store.dispatch('displayPrevPageTriggers');

      expect(store.state.triggersForPage.length).to.equal(1);
      expect(store.state.triggersForPage[0].name).to.equal('Trigger1');

    });

    it('testDisplayNextPageTriggers', () => {
      let existingTriggers = [
        { name: 'Trigger1', action : 'Tweet', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius', 'Temperature current value > 24 Celsius', 'Time interval' ]},
        {name: 'Trigger2', action: 'Make Facebook Post', policy: {type: 'data_point_registration',	elem: 'Temperature' }, conditions: ['Always']	}
      ];

      store.state.currentPage = 1;
      store.state.maxTriggersPerPage = 1;
      store.state.filteredTriggers = existingTriggers;
      store.state.existingTriggers = existingTriggers;

      store.dispatch('displayNextPageTriggers');

      expect(store.state.triggersForPage.length).to.equal(1);
      expect(store.state.triggersForPage[0].name).to.equal('Trigger2');

    });

    it('testSetMaxTriggersPerPage', () => {
      let existingTriggers = [
        { name: 'Trigger1', action : 'Tweet', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius', 'Temperature current value > 24 Celsius', 'Time interval' ]},
        {name: 'Trigger2', action: 'Make Facebook Post', policy: {type: 'data_point_registration',	elem: 'Temperature' }, conditions: ['Always']	}
      ];

        store.state.existingTriggers = existingTriggers;
        store.dispatch('setMaxTriggersPerPage', 1);
        expect(store.state.triggersForPage.length).to.equal(1);
        expect(store.state.triggersForPage[0].name).to.equal('Trigger1');
    });


    it('tetsFilterTriggersToDisplay', () => {
    let existingTriggers = [
          {name: 'Trigger1', action: 'Tweet', policy: {type: 'on_data_point_registration', data_stream: 'Temperature'}, conditions: [{type:"data_stream_current_value",data_stream:"DataStream2", condition:{"operator":"<","value":55}}]},
          {name: 'Trigger2', action: 'Make Facebook Post', policy: {type: 'on_data_point_registration',	data_stream: 'Temperature' }, condition: []},
          {name: 'Trigger3', action: 'Send Email', policy: {type: 'on_data_point_registration', data_stream: 'Temperature'}, condition: [{"type":"data_stream_current_value","data_stream":"DataStream2","condition":{"operator":"<","value":55}}]},
          {name: 'Trigger4', action: 'Start Engine Alfa', policy: {type:'on_data_point_registration', data_stream: 'Temperature'}, condition: []},
          {name: 'Trigger5', action: 'Sense Temperature', policy: {type: 'periodical', time_interval: '10 minutes' }, condition: []},
          {name: 'Trigger6', action: 'Start Engine Alfa', policy: {type: 'on_data_point_registration', data_stream: 'Temperature'}, condition: [{"type":"data_stream_current_value","data_stream":"DataStream2","condition":{"operator":"<","value":55}}]},
        ];

        store.state.existingTriggers = existingTriggers;
        store.dispatch('filterTriggersToDisplay', 'Facebook');
        expect(store.state.triggersForPage.length).to.equal(1);
        expect(store.state.triggersForPage[0].name).to.equal('Trigger2');
    });


    it('testDisplayPrevPageDataStream', () => {
      let existingStreams = [
          {id: 0, name: 'Solar light in garden'},
          {id: 1, name: 'Temperature inside the house'},
          {id: 2, name: 'Temperature outside the house'}];

      store.state.currentPage = 2;
      store.state.maxDataStreamsPerPage = 1;
      store.state.filteredDataStreams = existingStreams;
      store.state.existingStreams = existingStreams;

      store.dispatch('displayPrevPageDataStream');

      expect(store.state.dataStreamsForPage.length).to.equal(1);
      expect(store.state.dataStreamsForPage[0].name).to.equal('Solar light in garden');

    });

    it('testDisplayNextPageDataStream', () => {
      let existingStreams = [
          {id: 0, name: 'Solar light in garden'},
          {id: 1, name: 'Temperature inside the house'},
          {id: 2, name: 'Temperature outside the house'}];

      store.state.currentPage = 1;
      store.state.maxDataStreamsPerPage = 1;
      store.state.filteredDataStreams = existingStreams;
      store.state.existingStreams = existingStreams;

      store.dispatch('displayNextPageDataStream');

      expect(store.state.dataStreamsForPage.length).to.equal(1);
      expect(store.state.dataStreamsForPage[0].name).to.equal('Temperature inside the house');

    });

    it('testAddElementToDeleteList', () => {
      let elem = {id: 0, name: 'Solar light in garden'};

      store.dispatch('addElementToDeleteList', elem);
      expect(store.state.elementsToDelete.length).to.equal(1);
      expect(store.state.elementsToDelete[0].name).to.equal('Solar light in garden');

      store.dispatch('addElementToDeleteList', elem);
      expect(store.state.elementsToDelete.length).to.equal(0);

    });


    it('testShowDataStream', () => {
      let elem = {id: 0, name: 'Solar light in garden'};

      store.dispatch('showDataStream', elem);
      expect(store.state.editDataStream).to.equal(false);
      expect(store.state.activeDataStream.name).to.equal('Solar light in garden');
      expect(store.state.activeDataStream.id).to.equal(0);

    });


    it('testShowDataStream', () => {
      let elem = {id: 0, name: 'Solar light in garden'};
      store.dispatch('editDataStreams', elem);
      expect(store.state.activeDataStream.name).to.equal('Solar light in garden');
      expect(store.state.activeDataStream.id).to.equal(0);
    });


    it('testUpdateDataStreamsForPage', () => {
      let elem = {id: 0, name: 'Solar light in garden'};
      store.dispatch('updateDataStreamsForPage', elem);
      expect(store.state.dataStreamsForPage.name).to.equal('Solar light in garden');
      expect(store.state.dataStreamsForPage.id).to.equal(0);
    });


    it('testFilterActionsToDisplay', () => {
      let existingActions = [
        {id: 1, name: 'Tweet', http_request:{ request_line: { method:'POST', url:'https://twitter.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 2, name: 'Make Facebook Post', http_request:{ request_line: { method:'POST', url:'https://facebook.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 3, name: 'Send Email',  http_request:{ request_line: { method:'POST', url:'https://gmail.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 4, name: 'Start Engine Alfa',  http_request:{ request_line: { method:'POST', url:'http://device1.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}},
        {id: 5, name: 'Sense Temperature',  http_request:{ request_line: { method:'GET', url:'http://device2.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}}
      ];

      store.state.currentPage = 1;
      store.state.maxActionsPerPage = 1;
      store.state.existingActions = existingActions;
      store.state.filteredActions = existingActions;

      store.dispatch('filterActionsToDisplay', 'Alfa');
      expect(store.state.actionsForPage.length).to.equal(1);
      expect(store.state.actionsForPage[0].name).to.equal('Start Engine Alfa');

    });


    it('testFilterCommandsToDisplay', () => {
      let existingCommands = [
          {command: 'Turn On LED 1', priority: '100'},
          {command: 'Turn Off LED 1', priority: '23'},
          {command: 'Turn On PIN 5',priority: '56'},
      ];

      store.state.currentPage = 1;
      store.state.maxCommandsPerPage = 1;
      store.state.existingCommands = existingCommands;
      store.state.existingCommands = existingCommands;

      store.dispatch('filterCommandsToDisplay', 'PIN');
      expect(store.state.commandsForPage.length).to.equal(1);
      expect(store.state.commandsForPage[0].command).to.equal('Turn On PIN 5');

    });


    it('testSetDataStreamToAdd', () => {
      let elem = {id: 0, name: 'Solar light in garden'};
      store.dispatch('setDataStreamToAdd', elem);
      expect(store.state.dataStreamToAdd.name).to.equal('Solar light in garden');
    });


    it('testSetActiveDataStream', () => {
      let elem = {id: 0, name: 'Solar light in garden'};
      store.dispatch('setActiveDataStream', elem);
      expect(store.state.activeDataStream.name).to.equal('Solar light in garden');
    });

    it('testAddOneMoreElemForActionRequestHeader', () => {
      store.state.activeIdsForHttpRequestHeader=[];
      store.dispatch('addOneMoreElemForActionRequestHeader');
      expect(store.state.activeIdsForHttpRequestHeader.length).to.equal(1);
      store.dispatch('addOneMoreElemForActionRequestHeader');
      expect(store.state.activeIdsForHttpRequestHeader.length).to.equal(2);

    });

    it('testOneLessElementForActionRequestHeader', () => {
      store.state.activeIdsForHttpRequestHeader=[];
      store.dispatch('addOneMoreElemForActionRequestHeader');
      expect(store.state.activeIdsForHttpRequestHeader.length).to.equal(1);
      store.dispatch('addOneMoreElemForActionRequestHeader');
      expect(store.state.activeIdsForHttpRequestHeader.length).to.equal(2);
      store.dispatch('oneLessElemForActionRequestHeader', 1);
      expect(store.state.activeIdsForHttpRequestHeader.length).to.equal(1);
    });

    it('testSetActionBody', () => {
      store.state.actionBody=[];
      store.dispatch('setActionBody', {"key":"value"});
      expect(store.state.validJson).to.equal(false);

      store.dispatch('setActionBody', '{"key":"value"}');
      expect(store.state.validJson).to.equal(true);
    });

/*    it('testAssignBodyAndHeader', () => {
      let action = {id: 1, name: 'Tweet', http_request:{ request_line: { method:'POST', url:'https://twitter.com', version:'1.1'}, body:"{\"foo\":\"bar\", \"jane\":\"doe\"}", headers:[{key:'security-key', value:'f78r3d'}, {key:'email', value:'jnahas@foor.bar'}]}};
      store.dispatch('assignBodyAndHeader', action);

      expect(store.state.activeAction.name).to.equal('Tweet');
      expect(store.state.activeIdsForHttpRequestHeader.length).to.equal(2);
      expect(store.state.activeIdsForHttpRequestBody).to.equal("{\"foo\":\"bar\", \"jane\":\"doe\"}");
    });

    it('testUpdateAction', () => {
      store.dispatch('updateAction');
    });
*/

    it('testDataPointPolicy', () => {
      store.dispatch('dataPointPolicy');
      expect(store.state.isTimePeriodPolicy).to.equal(false);
    });


    it('testTimePeriodPolicy', () => {
      store.dispatch('timePeriodPolicy');
      expect(store.state.isTimePeriodPolicy).to.equal(true);
    });

    it('testSetConditionSelected', () => {
      store.dispatch('setConditionSelected', {condition: "selected"});
      expect(store.state.conditionSelected.condition).to.equal("selected");
    });


    it('testSetConditionSelected', () => {
      let existingTriggers = [
        { name: 'Trigger1', action : 'Tweet', policy: {type: 'data_point_registration', elem: 'Temperature'}, conditions: ['Temperature current value > 24 Celsius', 'Temperature current value > 24 Celsius', 'Time interval' ]},
        {name: 'Trigger2', action: 'Make Facebook Post', policy: {type: 'time_interval',	elem: '5 mins' }, conditions: ['Always']	}
      ];

      store.dispatch('editTrigger', existingTriggers[0]);
      expect(store.state.activeTrigger.name).to.equal('Trigger1');
      expect(store.state.isTimePeriodPolicy).to.equal(false);

      store.dispatch('editTrigger', existingTriggers[1]);
      expect(store.state.activeTrigger.name).to.equal('Trigger2');
      expect(store.state.isTimePeriodPolicy).to.equal(true);
    });

    it('testCleanActiveAction', () => {
      store.dispatch('cleanActiveAction');
      expect(store.state.activeAction.length).to.equal(0);
      expect(store.state.activeIdsForHttpRequestHeader.length).to.equal(0);
      expect(store.state.actionBody).to.equal('{"foo":"bar", "jane":"doe"}');
    });

    it('testDrawCharts', () => {
      store.dispatch('drawCharts');
    });

/*
    it('testDeleteElements', () => {
      store.dispatch('deleteElements');
    });*/

    it('testDisplayLoadingFeedback', () => {
      store.dispatch('displayLoadingFeedback');
      expect(store.state.displayLoadingFeedback).to.equal(true);
    });

    it('testHideLoadingFeedback', () => {
      store.dispatch('hideLoadingFeedback');
      expect(store.state.displayLoadingFeedback).to.equal(false);
    });

    it('testSetOnDataStreamValue', () => {
      store.state.onDataStreamValueCondition = {dataStream:""};
      store.dispatch('setOnDataStreamValue', "DataStream1");
      expect(store.state.onDataStreamValueCondition.dataStream).to.equal("DataStream1");
    });

    it('testSetOnDataStreamCondition', () => {
      store.state.onDataStreamValueCondition = {condition:""};
      store.dispatch('setOnDataStreamCondition', "Condition1");
      expect(store.state.onDataStreamValueCondition.condition).to.equal("Condition1");
    });

    it('testSetOnDataStreamReferenceValue', () => {
      store.state.onDataStreamValueCondition = {value:""};
      store.dispatch('setOnDataStreamReferenceValue', "Value1");
      expect(store.state.onDataStreamValueCondition.value).to.equal("Value1");
    });

    /*it('testAddNewCondition', () => {
      store.dispatch('addNewCondition');
    });*/

    it('testSetDataStreamNotUpdated', () => {
      store.state.dataStreamNotUpdatedCondition = {dataStream:""};
      store.dispatch('setDataStreamNotUpdated', "dataStream1");
      expect(store.state.dataStreamNotUpdatedCondition.dataStream).to.equal("dataStream1");
    });

    it('testDisplayModalForStreamAdding', () => {
      store.dispatch('displayModalForStreamAdding');
      expect(store.state.showModalForStreamAdding).to.equal(true);
    });

    it('testHideModalForStreamAdding', () => {
      store.dispatch('hideModalForStreamAdding');
      expect(store.state.showModalForStreamAdding).to.equal(false);
    });

    it('testDisplayModalForTriggerDetails', () => {
      store.dispatch('displayModalForTriggerDetails');
      expect(store.state.showModalForTriggerDetails).to.equal(true);
    });

    it('testHideModalForTriggerDetails', () => {
      store.dispatch('hideModalForTriggerDetails');
      expect(store.state.showModalForTriggerDetails).to.equal(false);
    });


    it('testDisplayModalForActionEditing', () => {
      store.dispatch('displayModalForActionEditing');
      expect(store.state.showModalForActionEditing).to.equal(true);
    });

    it('testHideModalForActionEditing', () => {
      store.dispatch('hideModalForActionEditing');
      expect(store.state.showModalForActionEditing).to.equal(false);
    });

    it('testDisplayModalForRemovingElements', () => {
      store.dispatch('displayModalForRemovingElements');
      expect(store.state.showModalForRemovingElements).to.equal(true);
    });

    it('testHideModalForRemovingElements', () => {
      store.dispatch('hideModalForRemovingElements');
      expect(store.state.showModalForRemovingElements).to.equal(false);
    });

    it('testDisplayModalForActionDetails', () => {
      store.dispatch('displayModalForActionDetails');
      expect(store.state.showModalForActionDetails).to.equal(true);
    });

    it('testHideModalForActionDetails', () => {
      store.dispatch('hideModalForActionDetails');
      expect(store.state.showModalForActionDetails).to.equal(false);
    });

    it('testDisplayModalForDataPointsAdding', () => {
      store.dispatch('displayModalForDataPointsAdding');
      expect(store.state.showModalForDataPointsAdding).to.equal(true);
    });

    it('testHideModalForDataPointsAdding', () => {
      store.dispatch('hideModalForDataPointsAdding');
      expect(store.state.showModalForDataPointsAdding).to.equal(false);
    });

    it('testSetdataPointToAdd', () => {
      store.dispatch('setdataPointToAdd', "DataPoint1");
      expect(store.state.dataPointToAdd).to.equal("DataPoint1");
    });

    it('testDisplayModalForDataPointsChart', () => {
      store.dispatch('displayModalForDataPointsChart');
      expect(store.state.showModalForDataPointsChart).to.equal(true);
    });

    it('testHideModalForDataPointsChart', () => {
      store.dispatch('hideModalForDataPointsChart');
      expect(store.state.showModalForDataPointsChart).to.equal(false);
    });

    it('testGetLabelsForDataPointsChart', () => {
      store.dispatch('getLabelsForDataPointsChart');
    });

    it('testDisplayModalForStreamEditing', () => {
      store.dispatch('displayModalForStreamEditing');
      expect(store.state.showModalForStreamEditing).to.equal(true);
    });

    it('testHideModalForStreamEditing', () => {
      store.dispatch('hideModalForStreamEditing');
      expect(store.state.showModalForStreamEditing).to.equal(false);
    });

    /*it('testDetermineMostRecentlyUpdatedStreams', () => {
      store.dispatch('determineMostRecentlyUpdatedStreams');
    });*/


});
