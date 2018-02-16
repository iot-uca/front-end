package cosmos.frontend.middle.api.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cosmos.frontend.middle.api.exception.MiddlewareServiceException;
import cosmos.frontend.middle.api.model.DataStream;
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

//	@CrossOrigin
//	@RequestMapping(value = "/dataPoints/{name}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
//	public List<DataPoint> getDataPointsForDataStream(@PathVariable(value = "name") String dataStreamName) throws MiddlewareServiceException{
//		log.debug(" Entering getDataPointsForDataStream.");
//		System.out.println(" Entering getDataPointsForDataStream.");
//		if("undefined".equalsIgnoreCase(dataStreamName)){
//			return null;
//		}else{
//			
//			ResponseEntity<List<DataPoint>> dataPointsForDataStream = middlewareService.getDataPointsForDataStream(dataStreamName);
//			System.out.println(dataPointsForDataStream);
//			return dataPointsForDataStream.getBody();
//		}
//	}
	

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
}
