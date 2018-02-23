		$(document).ready(function(){
			$("#keys").hide();
			$("#commands").hide();
			getAvailableDataStreams();

			/* This is to not allow user to select more than X options
			var last_valid_selection = null;
		      $('#selectDataStream').change(function(event) {
		        if ($(this).val().length > 2) {
		          alert(' Please choose no more than 2 options ');
		          $(this).val(last_valid_selection);
		        } else {
		          last_valid_selection = $(this).val();
		        }
		      });*/


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
						text: 'Predicted world population (millions) in 2050'
					}
				}
			});

		});


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("main").style.marginLeft = "0";
	document.body.style.backgroundColor = "white";
}

function showKeysView(){
	$("#selectDataStream").hide();
	$("#buttonShowCharts").hide();
	$(".dashboardSeparator").hide();
	$("#scoreCards").hide();
	$("#actions").hide();
	$("#commands").hide();
	$("#keys").show();
}

function showDashboardView(){
	$("#selectDataStream").show();
	$("#buttonShowCharts").show();
	$(".dashboardSeparator").show();
	$("#scoreCards").show();
	$("#actions").show();
	$("#commands").hide();
	$("#keys").hide();
}

function showCommandsView(){
	$("#selectDataStream").hide();
	$("#buttonShowCharts").hide();
	$(".dashboardSeparator").hide();
	$("#scoreCards").hide();
	$("#actions").hide();
	$("#keys").hide();
	$("#commands").show();
}

function generateRandomColor(){
	var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	console.log(" GENERATED COLOR =>>> " + color);
	return color;
}




// Generates the label numbers based on the amount of values to display
function generateLabelsForChart(length)
{   console.log(" Entering generateLabelsForChart <"+length+">.");
    var labels = [];
    
    for(i=1; i<=length; i++){
    	labels.push(i);
    }
    return labels;
}

// Iterates the list of Data Points, retrieving its values
function generateDataForChart(values)
{                       
	console.log(" Entering generateDataForChart <"+values+">.");
    var data = [];
    
    for(i=0; i<values.length; i++){
    	data.push(values[i].value);
    }
    return data;
}

// Asks the middleware-api about the available data streams
function getAvailableDataStreams(){
	$.getJSON("http://localhost:8090/dataStream/availables", function(result){
		console.log(result);
		console.log(JSON.stringify(result));
		var elements = JSON.stringify(result);
		console.log(elements);
		var jsonObject = JSON.parse(elements);
		console.log(jsonObject);
		console.log(jsonObject[0]);
		console.log(jsonObject.length);

		for(i=0; i<jsonObject.length; i++){
			var option = new Option(jsonObject[i], jsonObject[i]); /// jquerify the DOM object 'option' so we can use the html method
		
			//$('#getAvailableDataStreams').append('<label class="checkbox-inline"><input type="checkbox" value="'+jsonObject[i]+'">'+jsonObject[i]+'</label>');

			$(option).html(jsonObject[i]); 
			$('#selectDataStream').append(option);
		}
		console.log(jsonObject);
	});
}

// Draws the charts containing the current data from the streams
function displayCharts(){

	var values = $('#selectDataStream').val();

	console.log(" VALUES = " + values);

	var valuesLength = values.length;

	console.log(" Values Length = " + valuesLength);

	for(i=0; i<values.length;i++){

		console.log("Going to query for <" + values[i] + "> data-stream.");

/*		console.log(" LENGTH => " + $('#'+values[i]).length);

		if($('#'+values[i]).length === 0) {

			console.log(" APPENDING => " + '<div class="col-md-4"><canvas id="' + values[i] + '"></canvas></div>');

			$('#scoreCards').append('<div class="col-md-4"><canvas id="' + values[i] + '"></canvas></div>');
		}
*/

		$.getJSON("http://localhost:8090/dataStream/" + values[i], function(result){
				
			console.log(" RESPONSE => " + JSON.stringify(result));
			var elements = JSON.stringify(result);
			jsonObject = JSON.parse(elements);
			console.log(jsonObject);
			console.log(jsonObject.length);

			var dataPoints = jsonObject.dataPoints;
			var dataStreamName = jsonObject.name;

			console.log(" dataStreamName => " + dataStreamName);
			console.log(" dataPoints => " + dataPoints);

			//generate labels for Chart
		    var chartLabels = generateLabelsForChart(dataPoints.length);
		    console.log("chartLabels => " + chartLabels);

			//generate data sources for Chart
		    var chartData =  generateDataForChart(dataPoints);
		    console.log(" chartData => " + chartData);

		    console.log(" dataStreamName already exists? (!=0) => " + $('#'+dataStreamName).length);

			// If canvas already exists, then we reuse the same
			if($('#'+dataStreamName).length === 0) {

				console.log(" APPENDING => " + '<div class="col-md-4"><canvas id="' + dataStreamName + '"></canvas></div>');

				$('#scoreCards').append('<div class="col-md-4"><canvas id="' + dataStreamName + '"></canvas></div>');
			}

		    // Draw the chart using labels and data generated before
			var ctx = document.getElementById(dataStreamName).getContext('2d');
			var myChart = new Chart(ctx, {
				type: 'line',
				data: { labels: chartLabels,
					datasets: [
					{
						label: dataStreamName, 
						data: chartData,
						backgroundColor: generateRandomColor(),/*"#fc9272",
						pointBackgroundColor: "#de2d26",
						strokeColor: "#de2d26",
						pointColor: "#de2d26",
						pointStrokeColor: "#de2d26",
						pointHighlightFill: "#de2d26",
						pointHighlightStroke: "#de2d26",*/
					}]
				},
				options: {
					responsive: true,
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
        		ticks: {
			        	beginAtZero:false
			        },
			        gridLines:{
			        	display:false
			        }
			    }]
			}
			}
			});
			
		});
	}
}