	  				Vue.component('trigger-table-row',{
		props:['trigger'],//<th scope="row"></th>
		template:'<tr><td>{{trigger.name}}</td><td>{{trigger.action}}</td><td>{{trigger.policy.type}}</td><td>{{trigger.policy.elem}}</td><td>{{trigger.conditions}}</td><td><button type="button" class="btn btn-info btn-block" @click.native="displaySomething()" data-toggle="modal" data-target="#editTriggerModal"><i class="fa fa-pencil-square-o"></i></button></td><td><button type="button" class="btn btn-danger btn-block" data-toggle="modal" data-target="#deleteTriggerModal"><i class="fa fa-remove"></i></button></td></tr>'			
	});				
	  				// Cards for each Data Stream 	
	  				Vue.component("data-stream-card",{
	  					props:['name', 'value', 'timestamp'],
	  					template:'<div class="col-md-2"><div class="card text-white bg-primary mb-3 ds shadow"><div class="card-header">{{name}}<button type="button" class="btn btn-primary btn-sm" style="float: right;" data-toggle="modal" data-target="#dataPointsForStreamModal"><strong>More</strong></button></div><div class="card-body"> <h5 class="text-center">{{value}}</h5></div><div class="card-footer small">{{timestamp}}</div> </div> </div>'
	  				});


	  				Vue.component('div-canvas-for-chart', {
	  					props:['id'],
	  					template:'<div class="col-md-4"><canvas :id="id"></canvas></div>' 
	  				});

	  				Vue.component('content-separator', {
	  					template:'<h1 id="contentSeparator"><strong><slot></slot></strong></h1>'
	  				});

	  				Vue.component('data-streams-button', {
	  					props:['name'],
	  					template:'<button type="button">{{name}}</button>'
	  				});

	  				Vue.component('data-stream-checkboxes', {
	  					props:['value'],
	  					template:'<p><input type="checkbox" :value="value" v-model="caca"><label :for="value">{{value}}</label></p>',
	  					data() {
	  						console.log(" data() en componen => " + this.value);
	  						return { caca: this.value }
	  					},
	  					watch: {
	  						caca(val) {
	  							console.log(" caca => " + val);
	  							this.$emit('input', val);
	  						}
	  					} 
	  				});

	  				new Vue({
	  					el: '#app',
	  					data: {

	  						backendEndPoint: "http://192.168.99.100:8090",

	  						dataStreams: [],
	  						dataStreamSelected: [],
	  						hasNotFinishedDS: true,
	  						hasNotFinishedDPS: true,
	  						streamWasSelected:false,
	  						hasToShowCharAndCards: false,
	  						isTimePeriodPolicy: false,

	  						renderDashboardView: true,
	  						renderSecurityView: false,
	  						renderAboutView: false,
	  						renderActionAddView: false,
	  						renderActionRemoveView: false,
	  						renderCommandAddView: false,
	  						renderCommandRemoveView: false,
	  						renderTriggerAddView: false,
	  						renderTriggerRemoveView: false,
	  						renderDataStreamView : false,
	  						showAddDataStream: false,

	  						displayLoadingFeedback: false,
	  						displayLoadingFeedbackDataStreams: false,
	  						errorInInteraction: false,       // flag to activate the success/failure modal content

                            elementsToDelete:[],
                            validJson: true,


	  				showActionsOptions : false,
	  				showCommandsOptions : false,
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
	  				currentPage: 1,
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


	  				// general pagination
	  				optionsOfEntriesPerPage:[
		  				{id:0, value:5},
		  				{id:1, value:10},
		  				{id:2, value:15},
		  				{id:3, value:20}, 				
	  				],


	  				// data stream variables

	  				editDataStream: false,

	  				dataStreamFilter: undefined,
	  				pagesNeededForDataStreams: 0, 
	  				maxDataStreamsPerPage: 5, 
	  				dataStreamsForPage: [], 
	  				filteredDataStreams: [],

	  				filteredDataStreams:[],
	  				intermediateDataStreams:[],
	  				activeDataStream:[],

                    dataStreamToAdd:'',
                    requestWasSuccessful:true,
                    requestIsInProgress:false,


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
	  				filteredActions: [],

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



	  				conditionSelected:{
	  					id:1,
	  					text:''
	  				},
	  				
	  				dataStreamNotUpdatedFrom:{
	  					months:0,
	  					weeks:0,
	  					days:0,
	  					hours:0,
	  					minutes:0,
	  					seconds:0,
	  				},


	  				// data stream view variables

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



	  				// security view variables

	  				securityKey : '91c-xdy-w5w',

	  				maxValue:{
	  					value:'',
	  					timestamp:''
	  				},
	  				minValue:{
	  					value:'',
	  					timestamp:''
	  				},
	  				averageValue:{
	  					value:'',
	  					timestamp:''
	  				},
	  				currentValue: {
	  					value:'',
	  					timestamp:''
	  				},
	  				data:'',
	  				dataStreamInformation: [],
	  				selectedDs: '',
	  				sideNavStyle:{
	  					backgroundColor: '',
	  					width: ''						
	  				}
	  			},

	  			mounted(){
	  			this.showAddDataStream = false; // user does not see the "add" button

				//Chart.defaults.global.legend.display = false; // avoid showing dataset labels on any chart
				this.hasNotFinishedDS = true;
				this.isSideNavActive = false;
				this.renderDashboardView = true;
				this.renderSecurityView = false;
				this.renderActionAddView = false;
				this.renderAboutView = false;
				this.renderTriggerAddView = false;
				this.showActionsOptions = false;
				this.showCommandsOptions = false;
				this.showTriggersOptions = false;
				this.renderTriggerRemoveView = false;
				this.renderCommandRemoveView = false;
				this.renderActionRemoveView = false;
				this.renderDataStreamView = false;

				this.streamWasSelected = false;
				this.isTimePeriodPolicy = false;

				this.displayLoadingFeedback = true; // user starts seeing the loading spinner
				this.displayLoadingFeedbackDataStreams = false;

				this.data = new Date();

				console.log("DATE => " + this.data);

				axios.get(this.backendEndPoint + '/data-streams',{ headers: { "Accept": "application/vnd.cosmos.data-stream+json; version=1.0.0" } }).then(response => {
					this.showAddDataStream = true; // user sees the "add" button
					this.hasNotFinishedDS = false;
					this.errorInInteraction = false;
					this.displayLoadingFeedback = false;
					this.dataStreams = response.data;	
					console.log("[SUCCESS] DataStreams =>>>> " + this.dataStreams);

				}, (error) => {
					this.showAddDataStream = true; // user sees the "add" button
					this.hasNotFinishedDS=false;
					this.displayLoadingFeedback = false; // we stop showing the loading spinner
					this.errorInInteraction = true;
					$("successModal").modal(); // we display the modal saying it was a problem


					console.log(error);
					this.dataStreams = [
						{name: 'Temperature', current_value: '25', last_updated: '2 secs ago'},
						{name: 'Pressure', current_value: '1023', last_updated: '1 sec ago'},
						{name: 'Humidity', current_value: '90%', last_updated: '11 mins ago'},
						{name: 'UV-Intensity', current_value: '0.78', last_updated: '3 mins ago'},
						{name: 'Door Sensor', current_value: 'Open', last_updated: '53 secs ago'}
					];
					console.log("[ERROR] DataStreams >>> " + this.dataStreams);
				})

				console.log("Width => " + this.sideNavStyle.backgroundColor);
				console.log("Color => " + this.sideNavStyle.width);


			    // Drawing the chart for Actions -> FIXME <-
			    /*var ctx = document.getElementById("actionsChart").getContext('2d');
			    var actionsChart = new Chart(ctx, {
			    	type: 'doughnut',
			    	data: {
			    		labels: ['Action 1', 'Action 2', 'Action 3', 'Action 4', 'Action 5'],
			    		datasets: [{
			    			label: 'Population (millions)',
			    			data: [11, 22, 5, 17, 15],
			    			backgroundColor: ['#FABB3C', '#32D75E','#D02FC0','#EB0524','#848B7A']
			    		}]
			    	},
			    	options: {
			    		responsive:true,
			    		cutoutPercentage:75,
			    		maintainAspectRatio: true,
						title: false,
					}
				});*/

			},

			watch: {
				triggerFilter: function(val, oldVal){ //watch the input for filtering the triggers
					console.log("Entering triggerFilter watcher");
					this.filterTriggerToDisplay();
				},
				dataStreamFilter: function(val, oldVal){ //watch the input for filtering the data streams
					console.log("Entering dataStreamFilter watcher");
					this.filterDataStreamToDisplay();
				},
				actionFilter: function(val, oldVal){ //watch the input for filtering the actions
					console.log("Entering actionFilter watcher");
					this.filterActionToDisplay();
				},
				maxTriggersPerPage: function(val, oldVal){ //watches the amount of triggers per page
					console.log("Entering maxTriggersPerPage watcher");	
					this.triggersForPage = this.getElementsToShowInTable(1, this.maxTriggersPerPage, this.triggersForPage, this.filteredTriggers);
					this.pagesNeededForTriggers = this.getPagesNeeded(this.filteredTriggers, this.maxTriggersPerPage);
				},
				maxDataStreamsPerPage: function(val, oldVal){ //watches the amount of triggers per page
					console.log("Entering maxDataStreamsPerPage watcher");
					this.dataStreamsForPage = this.getElementsToShowInTable(1, this.maxDataStreamsPerPage, this.dataStreamsForPage, this.filteredDataStreams);
					this.pagesNeededForDataStreams = this.getPagesNeeded(this.filteredDataStreams, this.maxDataStreamsPerPage);
				},
				maxActionsPerPage: function(val, oldVal){ //watches the amount of triggers per page
					console.log("Entering maxActionsPerPage watcher");
					this.actionsForPage = this.getElementsToShowInTable(1, this.maxActionsPerPage, this.actionsForPage, this.filteredActions);
					this.pagesNeededForActions = this.getPagesNeeded(this.filteredActions, this.maxActionsPerPage);
				},
				actionBody: function(val, oldVal){
					try {
					        JSON.parse(this.actionBody);
					        this.validJson=true;
					    } catch (e) {
					        this.validJson=false;
					    }
				},
			},	

			methods: {

				displayDataStreamModal: function(){
                    $("#addDataStreamModal").modal();  			// open the modal
				},
				updateDataStream: function(){
                    console.log("Entering updateDataStream!");
                    console.log("activeDataStream: " + this.activeDataStream);

                    /*  Commented until the backend implementation is ready 

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
                addElementToDeleteList: function(elem){
                    console.log("Entering addElementToDeleteList !");
                    
                    console.log("elementsToDelete: " + this.elementsToDelete);
                    console.log("elem: " + elem);
                    
                    //if already exists, delete it; add it otherwise
                    if(this.elementsToDelete.indexOf(elem.name)>-1){
                        this.elementsToDelete.splice(this.elementsToDelete.indexOf(elem.name), 1);  
                    }else{
                        this.elementsToDelete.push(elem.name);  
                    }
                    console.log("elementsToDelete: " + this.elementsToDelete);
                    console.log("elem: " + elem);
                },                
                
                assignBodyAndHeader: function(action){
                    console.log("Entering assignBodyAndHeader !");
                    
                    this.activeAction = action;
                    
                    console.log("activeIdsForHttpRequestHeader: " + this.activeIdsForHttpRequestHeader);
                    console.log("action.headers: " + action.headers);
                    console.log("activeIdsForHttpRequestBody: " + this.activeIdsForHttpRequestBody);
                    console.log("action.body: " + action.body);
                    
                    this.activeIdsForHttpRequestHeader = action.headers;
                    this.activeIdsForHttpRequestBody = action.body;
                    
                    console.log("activeIdsForHttpRequestHeader: " + this.activeIdsForHttpRequestHeader);
                    console.log("activeIdsForHttpRequestBody: " + this.activeIdsForHttpRequestBody);
                },
                addDataStream: function(){
                    console.log("Entering addDataStream !");
                    console.log("dataStreamToAdd: " + this.dataStreamToAdd);

                    if(this.dataStreamToAdd.length>0){

	                    $("#addDataStreamModal").modal("hide");  			// close the modal

	                    this.displayLoadingFeedbackDataStreams = true; // user starts seeing the loading spinner

	                    axios.post(this.backendEndPoint + '/data-streams', {
	                    	name: this.dataStreamToAdd
	                    })
	                      .then(function (response) {
	                      	this.displayLoadingFeedbackDataStreams = false;
	                      	this.errorInInteraction = false;
	                      	$("#successModal").modal();
	                        console.log("data: " + response.data);
	                        console.log("status: " + response.status);
	                        console.log("statusText: " + response.statusText);
	                        console.log("headers: " + response.headers);
	                        console.log("config: " + response.config);
	                        this.dataStreamToAdd = "";
	                      })
	                      .catch(function (error) {
	                      	console.log("[ERROR] " + error); 
	                      	this.displayLoadingFeedbackDataStreams = false; 
	                      	this.errorInInteraction = true; 
	                      	$("#successModal").modal();
	                      	this.dataStreamToAdd = "";
	                  });

                  }
                },
                
				sasa: function(){
					console.log(" ABOUT TO ADD AN ACTION!! ");
					console.log("activeIdsForHttpRequestHeader: " + this.activeIdsForHttpRequestHeader);
					console.log("activeIdsForHttpRequestBody: " + this.activeIdsForHttpRequestBody);
					console.log("activeAction: " + this.activeAction.name);
					console.log("activeAction: " + this.activeAction.method);
					console.log("activeAction: " + this.activeAction.url);
					console.log("activeAction: " + this.activeAction.version);

					var request={};
					var request_line={};

					
					request_line['url'] = this.activeAction.url;
					request_line['method'] = this.activeAction.method;
					request_line['version'] = this.activeAction.version;
					request['request_line'] = request_line;
					request['headers'] = this.activeIdsForHttpRequestHeader;
					request['body'] = this.actionBody;


					console.log("request_line: " + request_line);
					console.log("request: " + request);

                    axios.post(this.backendEndPoint + '/actions', {
                    	name: this.activeAction.name,
                    	request: request
                    })
                      .then(function (response) {
                        console.log("data: " + response.data);
                        console.log("status: " + response.status);
                        console.log("statusText: " + response.statusText);
                        console.log("headers: " + response.headers);
                        console.log("config: " + response.config);
                      })
                      .catch(function (error) {console.log("[ERROR] " + error); 
                  });

				},

				editAction: function(action){
                    console.log("Entering editAction!");
					this.activeAction = action;
                    
                    console.log("activeIdsForHttpRequestHeader: " + this.activeIdsForHttpRequestHeader);
                    console.log("action.headers: " + action.headers);
                    console.log("activeIdsForHttpRequestBody: " + this.activeIdsForHttpRequestBody);
                    console.log("action.body: " + action.body);
                    
                    this.activeIdsForHttpRequestHeader = action.headers;
                    this.activeIdsForHttpRequestBody = action.body;
                    
                    console.log("activeIdsForHttpRequestHeader: " + this.activeIdsForHttpRequestHeader);
                    console.log("activeIdsForHttpRequestBody: " + this.activeIdsForHttpRequestBody);
				},

				removeAction: function(action){
					this.activeAction = action;
				},

				editDataStreams: function(dataStream){
                    console.log("Entering editDataStream");
                    console.log("this.activeDataStream: " + this.activeDataStream);
					this.activeDataStream = dataStream;
					this.editDataStream = true;
                    console.log("this.activeDataStream: " + this.activeDataStream);

				},

				showDataStream: function(dataStream){
					this.editDataStream = false;
					this.activeDataStream = dataStream;
				},

				removeDataStream: function(dataStream){
					this.activeDataStream = dataStream;
				},

				removeTrigger(trigger){
					this.activeTrigger = trigger;
				},

				editTrigger: function(trigger){
					console.log("...Entering editTrigger!");
					console.log("activeTrigger: " + this.activeTrigger);
					console.log("trigger: " + trigger.name);
					this.activeTrigger = trigger;
					console.log("activeTrigger: " + this.activeTrigger);
				},

				filterActionToDisplay: function () {
					console.log("Entering filterActionToDisplay ");
					console.log("actionFilter: " + this.actionFilter);

			    	this.intermediateActions = []; // siempre vacío el intermedio

					// check if contains a valid value
					if(this.actionFilter != undefined){ // uso uno intermedio para recien cambiar el array principal cuando haya identificado todos los triggers que tienen que ser mostrados

			      		// get the amount of existing triggers
			      		amountOfActions = this.existingActions.length;

			      		for(i=0; i<amountOfActions; i++){

			      			//check Action name 
			      			filteredField = this.existingActions[i].name;
			      			this.intermediateActions = this.addElementToFilteredOnes(filteredField, this.actionFilter, this.intermediateActions, this.existingActions[i]);

			      			//check Action type 
			      			filteredField = this.existingActions[i].type;
			      			this.intermediateActions = this.addElementToFilteredOnes(filteredField, this.actionFilter, this.intermediateActions, this.existingActions[i]);

			      			if(filteredField=="command"){
								//check Action command priority
								filteredField = this.existingActions[i].priority;
								this.intermediateActions = this.addElementToFilteredOnes(filteredField, this.actionFilter, this.intermediateActions, this.existingActions[i]);			      				
							}else{

				      			//check Action http request method 
				      			filteredField = this.existingActions[i].method;
				      			this.intermediateActions = this.addElementToFilteredOnes(filteredField, this.actionFilter, this.intermediateActions, this.existingActions[i]);


				      			//check Action http request url
				      			filteredField = this.existingActions[i].url;
				      			this.intermediateActions = this.addElementToFilteredOnes(filteredField, this.actionFilter, this.intermediateActions, this.existingActions[i]);

				      			//check Action http request version
				      			filteredField = this.existingActions[i].version;
				      			this.intermediateActions = this.addElementToFilteredOnes(filteredField, this.actionFilter, this.intermediateActions, this.existingActions[i]);


				      			//check Action http request body parameters
				      			body = this.existingActions[i].body;
				      			console.log("body: " + body);
				      			console.log("body length: " + body.length);
				      			console.log("Filter: " + this.actionFilter);

				      			var alreadyAdded = false;

				      			for(t=0; t<body.length;t++){
				      				if(body[t].key.indexOf(this.actionFilter) >= 0){

				      					// Check if the trigger was not already added to the filtered ones
				      					for(a=0; a<this.intermediateActions.length; a++){
				      						if(this.intermediateActions[a].name == this.existingActions[i].name){
				      							alreadyAdded = true;
				      							break;
				      						}
				      					}
				      					console.log("alreadyAdded: " + alreadyAdded);
				      					if(!alreadyAdded){
				      						this.intermediateActions.push(this.existingActions[i]);  
				      					}
				      				}
				      				alreadyAdded = false;
				      				if(body[t].value.indexOf(this.actionFilter) >= 0){

				      					// Check if the trigger was not already added to the filtered ones
				      					for(a=0; a<this.intermediateActions.length; a++){
				      						if(this.intermediateActions[a].name == this.existingActions[i].name){
				      							alreadyAdded = true;
				      							break;
				      						}
				      					}
				      					console.log("alreadyAdded: " + alreadyAdded);
				      					if(!alreadyAdded){
				      						this.intermediateActions.push(this.existingActions[i]);  
				      					}
				      				}

				      			}

				      			alreadyAdded = false;
				      			//check Action http request header parameters
				      			headers = this.existingActions[i].headers;
				      			console.log("headers: " + headers);
				      			console.log("headers length: " + headers.length);
				      			console.log("Filter: " + this.actionFilter);

				      			var alreadyAdded = false;

				      			for(t=0; t<headers.length;t++){
				      				if(headers[t].key.indexOf(this.actionFilter) >= 0){

				      					// Check if the trigger was not already added to the filtered ones
				      					for(a=0; a<this.intermediateActions.length; a++){
				      						if(this.intermediateActions[a].name == this.existingActions[i].name){
				      							alreadyAdded = true;
				      							break;
				      						}
				      					}
				      					console.log("alreadyAdded: " + alreadyAdded);
				      					if(!alreadyAdded){
				      						this.intermediateActions.push(this.existingActions[i]);  
				      					}
				      				}

				      				alreadyAdded = true;

				      				if(headers[t].value.indexOf(this.actionFilter) >= 0){

				      					// Check if the trigger was not already added to the filtered ones
				      					for(a=0; a<this.intermediateActions.length; a++){
				      						if(this.intermediateActions[a].name == this.existingActions[i].name){
				      							alreadyAdded = true;
				      							break;
				      						}
				      					}
				      					console.log("alreadyAdded: " + alreadyAdded);
				      					if(!alreadyAdded){
				      						this.intermediateActions.push(this.existingActions[i]);  
				      					}
				      				}
				      			}
				      		}
				      	}

			      		if(this.intermediateActions.length>0){ // si tiene triggers para mostrar
			      			this.filteredActions = this.intermediateActions; // ahora ya podría mostrar todos los filtrados
			      		}else{
			      			this.filteredActions = [];
			      		} 		

			      	}else{
						// copy all the existing triggers, no filtering
						this.filteredActions =this.existingActions;
					}

					// Set the pages needed to show the filtered triggers
					this.pagesNeededForActions = this.getPagesNeeded(this.filteredActions, this.maxActionsPerPage);
					console.log(" pagesNeededForActions " + this.pagesNeededForActions);

					// Always display first page first to the user
					this.actionsForPage = this.getElementsToShowInTable(1, this.maxActionsPerPage, this.actionsForPage, this.filteredActions);
				},

				filterTriggerToDisplay: function () {
					console.log("Entering filterTriggerToDisplay ");
					console.log("triggerFilter: " + this.triggerFilter);

			    	this.intermediateTriggers = []; // siempre vacío el intermedio

					// check if contains a valid value
					if(this.triggerFilter != undefined){ // uso uno intermedio para recien cambiar el array principal cuando haya identificado todos los triggers que tienen que ser mostrados

			      		// get the amount of existing triggers
			      		amountOfTriggers = this.existingTriggers.length;

			      		for(i=0; i<amountOfTriggers; i++){

			      			//check Trigger name 
			      			filteredField = this.existingTriggers[i].name;
			      			this.intermediateTriggers = this.addElementToFilteredOnes(filteredField, this.triggerFilter, this.intermediateTriggers, this.existingTriggers[i]);

			      			//check Trigger action 
			      			filteredField = this.existingTriggers[i].action;
			      			this.intermediateTriggers = this.addElementToFilteredOnes(filteredField, this.triggerFilter, this.intermediateTriggers, this.existingTriggers[i]);


			      			//check Trigger policy type 
			      			filteredField = this.existingTriggers[i].policy.type;
			      			this.intermediateTriggers = this.addElementToFilteredOnes(filteredField, this.triggerFilter, this.intermediateTriggers, this.existingTriggers[i]);


			      			//check Trigger policy 
			      			filteredField = this.existingTriggers[i].policy.elem;
			      			this.intermediateTriggers = this.addElementToFilteredOnes(filteredField, this.triggerFilter, this.intermediateTriggers, this.existingTriggers[i]);


			      			//check Trigger conditions 
			      			conditions = this.existingTriggers[i].conditions;
			      			console.log("conditions: " + conditions);
			      			console.log("conditions length: " + conditions.length);
			      			console.log("Filter: " + this.triggerFilter);

			      			var alreadyAdded = false;

			      			for(t=0; t<conditions.length;t++){
			      				if(conditions[t].indexOf(this.triggerFilter) >= 0){

			      					// Check if the trigger was not already added to the filtered ones
			      					for(a=0; a<this.intermediateTriggers.length; a++){
			      						if(this.intermediateTriggers[a].name == this.existingTriggers[i].name){
			      							alreadyAdded = true;
			      							break;
			      						}
			      					}
			      					console.log("alreadyAdded: "  +alreadyAdded);
			      					if(!alreadyAdded){
			      						this.intermediateTriggers.push(this.existingTriggers[i]);  
			      					}
			      				}
			      			}

			      		}

			      		if(this.intermediateTriggers.length>0){ // si tiene triggers para mostrar
			      			this.filteredTriggers = this.intermediateTriggers; // ahora ya podría mostrar todos los filtrados
			      		}else{
			      			this.filteredTriggers = [];
			      		} 		

			      	}else{
						// copy all the existing triggers, no filtering
						this.filteredTriggers =this.existingTriggers;
					}

					// Set the pages needed to show the filtered triggers
					this.pagesNeededForTriggers = this.getPagesNeeded(this.filteredTriggers, this.maxTriggersPerPage);
					console.log(" pagesNeededForTriggers " + this.pagesNeededForTriggers);

					// Always display first page first to the user
					this.triggersForPage = this.getElementsToShowInTable(1, this.maxTriggersPerPage, this.triggersForPage, this.filteredTriggers);
				},

				filterDataStreamToDisplay: function () {
					console.log("Entering filterDataStreamToDisplay ");
					console.log("dataStreamFilter: " + this.dataStreamFilter);

			    	this.intermediateDataStreams = []; // siempre vacío el intermedio

					// check if contains a valid value
					if(this.dataStreamFilter != undefined){ // uso uno intermedio para recien cambiar el array principal cuando haya identificado todos los triggers que tienen que ser mostrados

			      		// get the amount of existing triggers
			      		amountOfDataStreams = this.dataStreamsConfigured.length;

			      		for(i=0; i<amountOfDataStreams; i++){

			      			//check Data stream name 
			      			filteredField = this.dataStreamsConfigured[i].name;
			      			this.intermediateDataStreams = this.addElementToFilteredOnes(filteredField, this.dataStreamFilter, this.intermediateDataStreams, this.dataStreamsConfigured[i]);

			      		}

			      		if(this.intermediateDataStreams.length>0){ // si tiene triggers para mostrar
			      			this.filteredDataStreams = this.intermediateDataStreams; // ahora ya podría mostrar todos los filtrados
			      		}else{
			      			this.filteredDataStreams = [];
			      		} 		

			      	}else{
						// copy all the existing triggers, no filtering
						this.filteredDataStreams =this.dataStreamsConfigured;
					}

					// log all the triggers that are filtered
					for(c=0; c<this.filteredDataStreams.length; c++){
						console.log("ELEM ["+c+"]: " + this.filteredDataStreams[c].name);
					}

					// Set the pages needed to show the filtered triggers
					this.pagesNeededForDataStreams = this.getPagesNeeded(this.filteredDataStreams, this.maxDataStreamsPerPage);
					console.log(" pagesNeededForDataStreams " + this.pagesNeededForDataStreams);

					// Always display first page first to the user
					this.dataStreamsForPage = this.getElementsToShowInTable(1, this.maxDataStreamsPerPage, this.dataStreamsForPage, this.filteredDataStreams);
				},
				// assumes all elements are identified by its name
				addElementToFilteredOnes: function(param, filter, existingElems, elem){
					console.log("param: " + param);
					console.log("filter: " + filter);
					console.log("existingElems: " + existingElems);
					console.log("elem: " + elem);

					var alreadyAdded = false;
					if (param.indexOf(filter) >= 0 ){

						for(a=0; a<existingElems.length; a++){
							if(existingElems[a].name == elem.name){
								alreadyAdded = true;
								break;
							}
						}
						console.log("alreadyAdded: "  +alreadyAdded);
						if(!alreadyAdded){
							existingElems.push(elem);  
						}
						console.log("existingElems: " + existingElems);
					}   				

					return existingElems; // FIXME: Checkear si puedo no retornar y pasar por parametro.
				},

				displayPrevPage: function(maxPerPage, elementsInCurrentPage, allElements){
					console.log("Entering displayPrevPage");
					this.currentPage -= 1;			
					//this.triggersForPage = this.getElementsToShowInTable(this.currentPage, this.maxTriggersPerPage, this.triggersForPage, this.filteredTriggers);
					return this.getElementsToShowInTable(this.currentPage, maxPerPage, elementsInCurrentPage, allElements);

				},

				displayNextPage: function(maxPerPage, elementsInCurrentPage, allElements){
					console.log("Entering displayNextPage");
					this.currentPage += 1;
					//this.triggersForPage = this.getElementsToShowInTable(this.currentPage, this.maxTriggersPerPage, this.triggersForPage, this.filteredTriggers);
					return this.getElementsToShowInTable(this.currentPage, maxPerPage, elementsInCurrentPage, allElements);

				},

				getElementsToShowInTable: function(pageNumber, maxPerPage, elementsInCurrentPage, allElements){
					console.log("Entering getElementsToShowInTable");
					console.log("pageNumber:" + pageNumber);
					console.log("maxPerPage:" + maxPerPage);
					console.log("elementsInCurrentPage:" + elementsInCurrentPage);
					console.log("allElements:" + allElements);

					this.currentPage = pageNumber;
					console.log("currentPage: "  + this.currentPage);

					elementsInCurrentPage=[];

					for (i=(this.currentPage-1)*maxPerPage; i<this.currentPage*maxPerPage; i++){

						if(allElements[i] != undefined){
							elementsInCurrentPage.push(allElements[i]);
							console.log("elementsInCurrentPage length " + elementsInCurrentPage.length);
						}
					}
					return elementsInCurrentPage;
				},

				getPagesNeeded: function(allExistingElements, maxPerPage){
					console.log(" Existing elements length: " + allExistingElements.length);
					console.log(" MaxPerPage: " + maxPerPage);
					pagesNeeded = allExistingElements.length / maxPerPage;
					console.log(" pagesNeeded " + pagesNeeded);

					// if number is int, that's it
					if(pagesNeeded % 1 === 0){
						return pagesNeeded;
					}
					else{ 
						// if not, we need the next since at least one element will be shown on the 'n' page
						return Math.ceil(pagesNeeded);	
					}
				},		

				addOneMoreElemsForActionRequestHeader: function(){ /* http://jsbin.com/zusokiy/edit?html,js,output  */
					this.activeIdsForHttpRequestHeader.push({
						key: '',
						value: ''
					});
				},

				oneLessElemForActionRequestHeader: function(index){
					this.activeIdsForHttpRequestHeader.splice(index,1);					
				},

				oneLessElemForActionRequestBody: function(index){
					console.log("oneLessElemForActionRequestBody");
					console.log("elemsForActionRequestBody: " + this.elemsForActionRequestBody);
					console.log("activeIdsForHttpRequestBody: " + this.activeIdsForHttpRequestBody);

					this.activeIdsForHttpRequestBody.splice(index,1);

					console.log("elemsForActionRequestBody: " + this.elemsForActionRequestBody);
					console.log("activeIdsForHttpRequestBody: " + this.activeIdsForHttpRequestBody);
				},

				addOneMoreElemsForActionRequestBody: function(){
					console.log("addOneMoreElemsForActionRequestBody");
					console.log("activeIdsForHttpRequestBody: " + this.activeIdsForHttpRequestBody);

					this.activeIdsForHttpRequestBody.push({
						key: '',
						value: ''
					});

					console.log("activeIdsForHttpRequestBody: " + this.activeIdsForHttpRequestBody);
				},

				showActionsAddRemoveOptions: function(){
					console.log("this.showActionsOptions : " + this.showActionsOptions);
					this.showActionsOptions = !this.showActionsOptions;
					this.showCommandsOptions = false;
					this.showTriggersOptions = false;
				},
				showCommandsAddRemoveOptions: function(){
					console.log("this.showCommandsOptions : " + this.showCommandsOptions);
					this.showCommandsOptions = !this.showCommandsOptions;
					this.showActionsOptions = false;
					this.showTriggersOptions = false;
				},
				showTriggersAddRemoveOptions: function(){
					console.log("this.showTriggersOptions : " + this.showTriggersOptions);
					this.showTriggersOptions = !this.showTriggersOptions;
					this.showActionsOptions = false;
					this.showCommandsOptions = false;
				},
				dataPointPolicy: function(){
					console.log(this.isTimePeriodPolicy);
					this.isTimePeriodPolicy = false;
					console.log(this.isTimePeriodPolicy);
				},
				timePeriodPolicy: function(){
					console.log(this.isTimePeriodPolicy);
					this.isTimePeriodPolicy = true;
					console.log(this.isTimePeriodPolicy);
				},

				drawPieChart(){	
				    // Drawing the chart for Actions -> FIXME <-
				    var ctx = document.getElementById("actionsChart").getContext('2d');
				    var actionsChart = new Chart(ctx, {
				    	type: 'doughnut',
				    	data: {
				    		labels: ['Action 1', 'Action 2', 'Action 3', 'Action 4', 'Action 5'],
				    		datasets: [{
				    			label: 'Population (millions)',
				    			data: [11, 22, 5, 17, 15],
				    			backgroundColor: ['#FABB3C', '#32D75E','#D02FC0','#EB0524','#848B7A']
				    			/*backgroundColor: ['#3e95cd', '#8e5ea2','#3cba9f','#e8c3b9','#c45850']*/
				    		}]
				    	},
				    	options: {
				    		responsive:true,
				    		cutoutPercentage:75,
				    		maintainAspectRatio: true,
				    		title: {
				    			display: true,
				    			text: 'Most Executed actions (times)'
				    		}
				    	}
				    });
				},

				assignDataStream: function(dS){
					console.log(" Entering assignDataStream function");
					this.selectedDs = dS;
					this.streamWasSelected=true;

					this.getdataStreamInformation(dS);
				},
				showDataStreamView: function(){

					console.log("Entering showDataStreamView ");

					this.renderDashboardView = false;
					this.renderSecurityView = false;
					this.renderActionAddView = false;
					this.renderAboutView = false;
					this.renderTriggerAddView = false;
					this.renderCommandAddView = false;
					this.renderTriggerRemoveView = false;
					this.renderCommandRemoveView = false;
					this.renderActionRemoveView = false;
					this.renderDataStreamView = true;

					// initially you should assume showing all data streams with no fitering
					this.filteredDataStreams = this.dataStreamsConfigured;

					this.pagesNeededForDataStreams = this.getPagesNeeded(this.filteredDataStreams, this.maxDataStreamsPerPage);

					console.log(" pagesNeededForDataStreams " + this.pagesNeededForDataStreams);

					this.dataStreamsForPage = this.getElementsToShowInTable(1, this.maxDataStreamsPerPage, this.dataStreamsForPage, this.filteredDataStreams);

				},
				showSecurityView: function(){
					this.renderDashboardView = false;
					this.renderSecurityView = true;
					this.renderActionAddView = false;
					this.renderAboutView = false;
					this.renderTriggerAddView = false;
					this.renderCommandAddView = false;
					this.renderTriggerRemoveView = false;
					this.renderCommandRemoveView = false;
					this.renderActionRemoveView = false;
					this.renderDataStreamView = false;
				},
				showDashboardView: function(){
					this.renderDashboardView = true;
					this.renderSecurityView = false;
					this.renderActionAddView = false;
					this.renderAboutView = false;
					this.renderTriggerAddView = false;
					this.renderCommandAddView = false;
					this.renderTriggerRemoveView = false;
					this.renderCommandRemoveView = false;
					this.renderActionRemoveView = false;
					this.renderDataStreamView = false;
					this.drawPieChart();
				},
				showActionAddView: function(){
					this.renderDashboardView = false;
					this.renderSecurityView = false;
					this.renderAboutView = false;

					this.renderActionAddView = true;
					this.renderTriggerAddView = false;
					this.renderCommandAddView = false;
					this.renderTriggerRemoveView = false;
					this.renderCommandRemoveView = false;
					this.renderActionRemoveView = false;
					this.renderDataStreamView = false;

					// initially you should assume showing all trigger with no fitering
					this.filteredActions = this.existingActions;

					this.pagesNeededForActions = this.getPagesNeeded(this.filteredActions, this.maxActionsPerPage);

					console.log(" pagesNeededForActions " + this.pagesNeededForActions);

					//this.getElementsToShowInTable(1);
					this.actionsForPage = this.getElementsToShowInTable(1, this.maxActionsPerPage, this.actionsForPage, this.filteredActions);
				},
				showCommandAddView: function(){
					this.renderDashboardView = false;
					this.renderSecurityView = false;
					this.renderAboutView = false;

					this.renderActionAddView = false;
					this.renderTriggerAddView = false;
					this.renderCommandAddView = true;
					this.renderTriggerRemoveView = false;
					this.renderCommandRemoveView = false;
					this.renderActionRemoveView = false;
					this.renderDataStreamView = false;

				},
				showTriggerAddView: function(){
					this.renderDashboardView = false;
					this.renderSecurityView = false;
					this.renderAboutView = false;

					this.renderTriggerAddView = true;
					this.renderActionAddView = false;
					this.renderCommandAddView = false;
					this.renderTriggerRemoveView = false;
					this.renderCommandRemoveView = false;
					this.renderActionRemoveView = false;
					this.renderDataStreamView = false;

					//this.renderOneTimeTrigger = false;

					// initially you should assume showing all trigger with no fitering
					this.filteredTriggers = this.existingTriggers;

					this.pagesNeededForTriggers = this.getPagesNeeded(this.filteredTriggers, this.maxTriggersPerPage);

					console.log(" pagesNeededForTriggers " + this.pagesNeededForTriggers);

					//this.getElementsToShowInTable(1);
					this.triggersForPage = this.getElementsToShowInTable(1, this.maxTriggersPerPage, this.triggersForPage, this.filteredTriggers);
				},
				showAboutView: function(){
					this.renderDashboardView = false;
					this.renderSecurityView = false;
					this.renderActionAddView = false;
					this.renderTriggerAddView = false;
					this.renderAboutView = true;
					this.renderCommandAddView = false;

					this.renderTriggerRemoveView = false;
					this.renderCommandRemoveView = false;
					this.renderActionRemoveView = false;
					this.renderDataStreamView = false;
				},
				showActionRemoveView: function(){
					this.renderDashboardView = false;
					this.renderSecurityView = false;
					this.renderActionAddView = false;
					this.renderTriggerAddView = false;
					this.renderAboutView = false;
					this.renderCommandAddView = false;

					this.renderTriggerRemoveView = false;
					this.renderCommandRemoveView = false;
					this.renderActionRemoveView = true;
					this.renderDataStreamView = false;
				},
				showCommandRemoveView: function(){
					this.renderDashboardView = false;
					this.renderSecurityView = false;
					this.renderActionAddView = false;
					this.renderTriggerAddView = false;
					this.renderAboutView = false;
					this.renderCommandAddView = false;
					this.renderDataStreamView = false;


					this.renderTriggerRemoveView = false;
					this.renderCommandRemoveView = true;
					this.renderActionRemoveView = false;
				},
				showTriggerRemoveView: function(){
					this.renderDashboardView = false;
					this.renderSecurityView = false;
					this.renderActionAddView = false;
					this.renderTriggerAddView = false;
					this.renderAboutView = false;
					this.renderCommandAddView = false;
					this.renderDataStreamView = false;


					this.renderTriggerRemoveView = true;
					this.renderCommandRemoveView = false;
					this.renderActionRemoveView = false;
				},

				getMaxValue: function(dataPoints){
					var max = 0;
					var timestamp = '';

					for(i=0;i<dataPoints.length;i++){
						if(dataPoints[i].value>=max){
							max=dataPoints[i].value;
							timestamp = dataPoints[i].timestamp;
						}
					}
					console.log("Max value = " + max);
					console.log("timestamp = " + timestamp);
					this.maxValue.value = max;
					this.maxValue.timestamp = this.timeDif(timestamp);
				},
				getMinValue: function(dataPoints){
					var min=dataPoints[0].value;
					var timestamp = '';

					for(i=0;i<dataPoints.length;i++){
						if(dataPoints[i].value<=min){
							min=dataPoints[i].value;
							timestamp=dataPoints[i].timestamp;
						}
					}
					console.log("Min value = " + min);
					console.log("timestamp = " + timestamp);
					this.minValue.value = min;
					this.minValue.timestamp = this.timeDif(timestamp);
				},
				getAvgValue: function(){
					var values = this.getDataFromStream();
					var sum=0;
					var length = values.length;
					var avg = 0;

					console.log("values: " + values);
					console.log("length: " + length);

					for(i=0;i<length;i++){
						sum = sum + values[i];						
					}
					avg = sum / length;
					avg = avg.toFixed(2);
					console.log("Sum value = " + sum);
					console.log("Avg = " + avg)

					this.averageValue.value = avg;
					var time = this.getTimeElapsed();

					this.averageValue.timestamp=time;

				},

				getTimeElapsed: function(){
					var length = this.dataStreamInformation.dataPoints.length;
					var time1 = this.dataStreamInformation.dataPoints[0].timestamp;
					var time2 = this.dataStreamInformation.dataPoints[length-1].timestamp;

					console.log("timestamp 1 => " + time1); // "October 7, 2017 18:15:28 {(GMT-03:00) Local Time}"
					console.log("timestamp 2 => " + time2);

					var subs1 = time1.substring(0, 25); // "October 7, 2017 18:15:28
					var subs2 = time2.substring(0, 25); // "October 7, 2017 18:15:28

					console.log("subs1: " + subs1);
					console.log("subs2: " + subs2);

					var date1 = moment(subs1, 'MMM DD, YYYY hh:mm:ss').toDate();
					var date2 = moment(subs2, 'MMM DD, YYYY hh:mm:ss').toDate();

					console.log("date1 = " + date1);
					console.log("date2 = " + date2);

					console.log("RESPONSE IS ==> " + this.timeDif(time1));

					var minsElapsed = ((date2.getTime() - date1.getTime() ) / 1000) / 60;

					console.log( "Mins Elapsed: " + minsElapsed);
					return minsElapsed;
				},

				timeDif: function(dataPointTimestamp){

					var subs1 = dataPointTimestamp.substring(0, 25);

					expresion = /\(([^)]+)\)/; // GMT-03:00
					result = expresion.exec(dataPointTimestamp)
					console.log("regex: " + result[1]);

					hrs = result[1].substring(4,6);
					sign = result[1].substring(3,4);
					mins = result[1].substring(7,9);

					console.log("hh: " + hrs);
					console.log("signus: " + sign);
					console.log("mm: " + mins);


					var clientTimeIso8601 = moment().toISOString(); // te tira la hora del Cliente en UTC (que es GMT a secas)-Ej: '2018-05-09T00:52:46.404Z'


					dateSetUp = subs1 + ' ' + sign + hrs + mins;

					serverTimeInUtc = moment(dateSetUp).utc().format("YYYY-MM-DDTHH:mm:ss");

					console.log("###################################");

					console.log("ISO 8601 String: " + clientTimeIso8601); 

					console.log("server Time in UTC: " + serverTimeInUtc); 
					serverTimeInUtcString = String(serverTimeInUtc);
					clientTimeIso8601String = String(clientTimeIso8601);
					console.log("serverTimeInUtc [String]: " + serverTimeInUtcString); 
					console.log("clientTimeIso8601 [String]: " + clientTimeIso8601String); 

					clientTimeIso8601String = clientTimeIso8601String.substring(0, clientTimeIso8601String.length - 5); // Removing trailing '.msmsmsZ'

					console.log("clientTimeIso8601 cleaned [String]: " + clientTimeIso8601String); 

					var diff = moment(clientTimeIso8601String).diff(moment(serverTimeInUtcString));

					var duration = moment.duration(diff);

					durationMillis = duration.milliseconds();
					durationSeconds = duration.seconds();
					durationMinutes = duration.minutes();
					durationHours = duration.hours();
					durationMonths = duration.months();
					durationDays = duration.days();
					durationYears = duration.years();

					console.log("millis: " + durationMillis);
					console.log("secs: " + durationSeconds);
					console.log("mins: " + durationMinutes);
					console.log("hours: " + durationHours);
					console.log("days: " + Math.floor(duration.asDays())/*durationDays*/);
					console.log("months: " + durationMonths);
					console.log("years: " + durationYears);
					console.log("###################################");

					durationDays = Math.floor(duration.asDays());


					/*if(durationMonths>0){
						return durationMonths+' mths, '+durationDays+' days, '+durationHours+' hours, '+durationMinutes+' mins, '+durationSeconds+' secs ago.';
					}else{*/
						if(durationDays>0){
							return durationDays+' days';//+durationHours+' hours, '+durationMinutes+' mins, '+durationSeconds+' secs';
						}else{
							if(durationHours>0){
								return durationHours+' hours';//+durationMinutes+' mins, '+durationSeconds+' secs';
							}else{
								if(durationMinutes>0){
									return durationMinutes+' mins';//+durationSeconds+' secs';
								}else{
									return durationSeconds+' secs';
								}
							}
						}
					//}
					
				},

				openNav: function(){
						//this.sideNavStyle.backgroundColor = "rgba(0,0,0,0.4)";
						this.sideNavStyle.backgroundColor = "#111";
						this.sideNavStyle.width = "250px";

						console.log("Width => " + this.sideNavStyle.width);
						console.log("Color => " + this.sideNavStyle.backgroundColor);
					},

					closeNav: function(){
						this.sideNavStyle.backgroundColor = "white";
						this.sideNavStyle.width = "0";


						// Avoiding that next time you open it, some add/remove options are still displayed 
						this.showCommandsOptions = false;
						this.showActionsOptions = false;
						this.showTriggersOptions = false;
					},

					hasToShowStreams: function(){
						console.log("Entering hasToShowStreams function");
						console.log("length = " + this.dataStreams.length);
						return this.dataStreams.length > 0;
					},

					getdataStreamInformation: function(dS){

						this.hasToShowCharAndCards=true;

						console.log("Entering getdataStreamInformation !");
						console.log("dS = " + dS);
						console.log('http://localhost:8090/test/dataStream/' + dS);

						axios.get('http://localhost:8090/test/dataStream/' + dS).then(response => {

							console.log("Response PLain => " + response);
							this.dataStreamInformation = response.data;	
							console.log("[SUCCESS] dataStreamInformation =>>>> " + this.dataStreamInformation);
							console.log("[SUCCESS] dataStreamInformation =>>>> " + this.dataStreamInformation.name);
							console.log("[SUCCESS] dataStreamInformation =>>>> " + this.dataStreamInformation.currentValue);
							console.log("[SUCCESS] dataStreamInformation =>>>> " + this.dataStreamInformation.lastUpdate);
							console.log("[SUCCESS] dataStreamInformation =>>>> " + this.dataStreamInformation.dataPoints);
							console.log("[SUCCESS] dataStreamInformation =>>>> " + this.dataStreamInformation.dataPoints[0]);
							console.log("[SUCCESS] dataStreamInformation =>>>> " + this.dataStreamInformation.dataPoints[0].timestamp);
							console.log("[SUCCESS] dataStreamInformation =>>>> " + this.dataStreamInformation.dataPoints[0].value);
							this.drawStreamChart(dS);

							this.currentValue.value = this.dataStreamInformation.currentValue ;
							this.currentValue.timestamp = this.timeDif(this.dataStreamInformation.lastUpdate);

							this.getAvgValue(this.dataStreamInformation.dataPoints);
							this.getMaxValue(this.dataStreamInformation.dataPoints);
							this.getMinValue(this.dataStreamInformation.dataPoints);

						}, (error) => {
							console.log("[ERROR] " + error);
						})
					},

					getLabelsForChart: function(){
						console.log(" Entering generateLabelsForChart");
						var length = this.dataStreamInformation.dataPoints.length;
						var labels = [];

						for(i=1; i<=length; i++){
							labels.push(i);
						}

						console.log(" Labels generated: " + labels);

						return labels;
					},

					getDataFromStream: function(){
						var dataPoints = this.dataStreamInformation.dataPoints;
						var length = dataPoints.length;
						var values = [];
						for(i=0; i< length; i++){
							values.push(dataPoints[i].value);
						}
						console.log(" Data Points values: " + values);
						return values;
					},

					drawStreamChart: function(dS){

						console.log(" Entering drawStreamChart function!");
						console.log(" Preparing for drawing [" + dS + "] stream!");

						var dataPointsLabels = this.getLabelsForChart();
						var dataPoints = this.getDataFromStream();

					    // Draw the chart using labels and data generated before
					    var ctx = document.getElementById('streamCanvas').getContext('2d');
					    var myChart = new Chart(ctx, {
					    	type: 'line',
					    	data: {
					    		labels: dataPointsLabels,
					    		datasets: [
					    		{
					    			label: dS,
					    			data: dataPoints,
					    			backgroundColor: "#007bff",
					    			pointBackgroundColor: "#007bff",
					    			strokeColor: "#007bff",
					    			pointColor: "#007bff",
					    			pointStrokeColor: "#007bff",
					    			pointHighlightFill: "#007bff",
					    			pointHighlightStroke: "#007bff",
					    		}]
					    	},
					    	options: {
					    		legend: {
					    			display: false
					    		},
					    		tooltips: {
					    			callbacks: {
					    				label: function(tooltipItem) {
					    					return tooltipItem.yLabel;
					    				}
					    			}
					    		},
					    		responsive: true,
					    		title: false,/*
					    		title: {
					    			display: false,	
					    		},*/					    		
					    		scales: {
					    			yAxes: [{
					    				display:false,
					    				ticks: {
					    					beginAtZero:false
					    				},
					    				gridLines:{
					    					display:false
					    				}
					    			}],
					    			xAxes: [{
			            //display:false,
			            ticks: {
			            	beginAtZero:false
			            },
			            gridLines:{
			            	display:false
			            }       }]     }  }  });
					}
				}
			});
