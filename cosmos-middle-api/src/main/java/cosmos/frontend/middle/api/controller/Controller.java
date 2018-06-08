package cosmos.frontend.middle.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cosmos.frontend.middle.api.exception.MiddlewareServiceException;
import cosmos.frontend.middle.api.model.DataPoint;
import cosmos.frontend.middle.api.model.DataStream;
import cosmos.frontend.middle.api.model.RealAction;
import cosmos.frontend.middle.api.service.MiddlewareService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class Controller {
	
	@Autowired
	private MiddlewareService middlewareService;
	
	/**
	 * Answers only if the service is available
	 * @return string indicating availability
	 */
	@RequestMapping(value="/testAvailable", produces = { MediaType.APPLICATION_JSON_VALUE })
	public String testAvailable() {
		return "Service is available";
	}

	
	/**
	 * Gets all the available {@link DataStream} names from back-end
	 * @return List of available {@link DataStream} names
	 * @throws MiddlewareServiceException in case of error
	 */
	@CrossOrigin
	@RequestMapping(value="/dataStream/availables", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
	public ArrayList<String> getDataStreamAvailables() throws MiddlewareServiceException{
		log.debug(" Entering getDataStreamAvailables.");
		ResponseEntity<DataStream[]> responseEntity = middlewareService.getAvailableDataStreams();
		DataStream[] dataStreams = responseEntity.getBody();
		
		ArrayList<String> dataStreamNames = adaptDataStreamsToList(dataStreams);
		log.debug(" Returning dataStreamNames: " + dataStreamNames);
		return dataStreamNames;
	}
	
	@CrossOrigin
	@RequestMapping(value="/test/dataStream/availables", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
	public ArrayList<String> getDataStreamAvailablesForTesting() throws MiddlewareServiceException{
		log.debug(" Entering getDataStreamAvailablesForTesting.");
//		ResponseEntity<DataStream[]> responseEntity = middlewareService.getAvailableDataStreams();
//		DataStream[] dataStreams = responseEntity.getBody();
//		
//		ArrayList<String> dataStreamNames = adaptDataStreamsToList(dataStreams);
		
		ArrayList<String> dataStreamNames = getDataStreamsForTesting();
		
		log.debug(" Returning dataStreamNames: " + dataStreamNames);

		try{
			Thread.sleep(5000);
		}catch(Exception e){
			;
		}

		return dataStreamNames;
	}

	@CrossOrigin
	@RequestMapping(value="/test/dataStream", method = RequestMethod.POST, consumes = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Void> createDataStream(@RequestBody String name) throws MiddlewareServiceException{
		
		log.debug(" Entering createDataStream.");
		log.debug(" dataStreamName received: " + name);
		try{
			Thread.sleep(4000);
		}catch(Exception e){
			;
		}

		System.out.println(" Entering createDataStream.");
		System.out.println(" dataStreamName received: " + name);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}


	@CrossOrigin
	@RequestMapping(value="/test/actions", method = RequestMethod.POST, consumes = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Void> createAction(@RequestBody RealAction action) throws MiddlewareServiceException{
		
		log.debug(" Entering createAction.");
		log.debug(" action received: " + action);
		try{
			Thread.sleep(4000);
		}catch(Exception e){
			;
		}

		System.out.println(" Entering createAction.");
		System.out.println(" action received: " + action);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	
	/**
	 * Gets the information associated with an specific {@link DataStream}
	 * @param dataStreamName of the desired {@link DataStream}
	 * @return the complete information of the dataStreamName
	 * @throws MiddlewareServiceException in case of error
	 */
	@CrossOrigin
	@RequestMapping(value = "/dataStream/{name}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
	public DataStream getDataStreamInformation(@PathVariable(value = "name") String dataStreamName) throws MiddlewareServiceException{
		log.debug(" Entering getDataPointsForDataStream.");

		ResponseEntity<DataStream> dataStreamInfo = middlewareService.getDataStreamInformation(dataStreamName);
		log.debug(" Returning dataStreamInfo: " + dataStreamInfo);
		return dataStreamInfo.getBody();
	}
	
	/**
	 * Gets the information associated with an specific {@link DataStream}
	 * @param dataStreamName of the desired {@link DataStream}
	 * @return the complete information of the dataStreamName
	 * @throws MiddlewareServiceException in case of error
	 */
	@CrossOrigin
	@RequestMapping(value = "/test/dataStream/{name}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
	public DataStream getDataStreamInformationForTesting(@PathVariable(value = "name") String dataStreamName) throws MiddlewareServiceException{
		log.debug(" Entering getDataStreamInformationForTesting.");

//		ResponseEntity<DataStream> dataStreamInfo = middlewareService.getDataStreamInformation(dataStreamName);
		DataStream ds = getDataPointsForTesting(dataStreamName);
		log.debug(" Returning dataStreamInfo: " + ds);
		return ds;
	}
	

	//////////////////////
	// Private Methods  //
	/////////////////////
	
	private ArrayList<String> adaptDataStreamsToList(DataStream[] dataStreams) {
		ArrayList<String> dataStreamNames =  new ArrayList<>();
		
		for ( DataStream  dataStream : dataStreams ){
			dataStreamNames.add(dataStream.getName());
		}
		return dataStreamNames;
	}
	
	private ArrayList<String> getDataStreamsForTesting(){
		ArrayList<String> ds = new ArrayList<>();
		
		ds.add("Temperature");
		ds.add("Pressure");
		ds.add("Humidity");
		ds.add("UV-Intensity");
		
		return ds;
	}
	
	private DataStream getDataPointsForTesting(String dataStreamName){
		DataStream ds = new DataStream();
		List<DataPoint> dps = new ArrayList<DataPoint>();
		
		switch (dataStreamName) {
		case "Temperature":
			ds.setCurrentValue(16.5);
			ds.setLastUpdate("October 7, 2017 18:25:28 {(GMT-03:00) Local Time}");
			ds.setName("Temperature");
			dps.add(new DataPoint("October 7, 2017 18:00:28 {(GMT-03:00) Local Time}", 17.2));
			dps.add(new DataPoint("October 7, 2017 18:05:28 {(GMT-03:00) Local Time}", 16.5));
			dps.add(new DataPoint("October 7, 2017 18:10:28 {(GMT-03:00) Local Time}", 15.9));
			dps.add(new DataPoint("October 7, 2017 18:15:28 {(GMT-03:00) Local Time}", 16.2));
			dps.add(new DataPoint("October 7, 2017 18:20:28 {(GMT-03:00) Local Time}", 16.7));
			dps.add(new DataPoint("October 7, 2017 18:25:28 {(GMT-03:00) Local Time}", 16.5));
			ds.setDataPoints(dps);
			break;
		case "Pressure":
			ds.setCurrentValue(1001);
			ds.setLastUpdate("October 7, 2017 18:25:28 {(GMT-03:00) Local Time}");
			ds.setName("Pressure");
			dps.add(new DataPoint("October 7, 2017 18:00:28 {(GMT-03:00) Local Time}", 1005));
			dps.add(new DataPoint("October 7, 2017 18:05:28 {(GMT-03:00) Local Time}", 1003));
			dps.add(new DataPoint("October 7, 2017 18:10:28 {(GMT-03:00) Local Time}", 989));
			dps.add(new DataPoint("October 7, 2017 18:15:28 {(GMT-03:00) Local Time}", 972));
			dps.add(new DataPoint("October 7, 2017 18:20:28 {(GMT-03:00) Local Time}", 998));
			dps.add(new DataPoint("October 7, 2017 18:25:28 {(GMT-03:00) Local Time}", 1001));
			ds.setDataPoints(dps);
			break;
		case "Humidity":
			ds.setCurrentValue(97);
			ds.setLastUpdate("October 7, 2017 18:25:28 {(GMT-03:00) Local Time}");
			ds.setName("Humidity");
			dps.add(new DataPoint("October 7, 2017 18:00:28 {(GMT-03:00) Local Time}", 93));
			dps.add(new DataPoint("October 7, 2017 18:05:28 {(GMT-03:00) Local Time}", 95));
			dps.add(new DataPoint("October 7, 2017 18:10:28 {(GMT-03:00) Local Time}", 93));
			dps.add(new DataPoint("October 7, 2017 18:15:28 {(GMT-03:00) Local Time}", 92));
			dps.add(new DataPoint("October 7, 2017 18:20:28 {(GMT-03:00) Local Time}", 94));
			dps.add(new DataPoint("October 7, 2017 18:25:28 {(GMT-03:00) Local Time}", 97));
			ds.setDataPoints(dps);
			break;
		case "UV-Intensity":
			ds.setCurrentValue(2);
			ds.setLastUpdate("October 7, 2017 18:25:28 {(GMT-03:00) Local Time}");
			ds.setName("UV-Intensity");
			dps.add(new DataPoint("October 7, 2017 13:25:28 {(GMT-03:00) Local Time}", 3.4));
			dps.add(new DataPoint("October 7, 2017 14:25:28 {(GMT-03:00) Local Time}", 3.1));
			dps.add(new DataPoint("October 7, 2017 15:25:28 {(GMT-03:00) Local Time}", 2.9));
			dps.add(new DataPoint("October 7, 2017 16:25:28 {(GMT-03:00) Local Time}", 2.6));
			dps.add(new DataPoint("October 7, 2017 17:25:28 {(GMT-03:00) Local Time}", 2.3));
			dps.add(new DataPoint("October 7, 2017 18:25:28 {(GMT-03:00) Local Time}", 2));
			ds.setDataPoints(dps);
			break;
		default:
			break;
		}
		return ds;
	}
}
