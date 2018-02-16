package cosmos.frontend.middle.api.service;

import java.util.Calendar;

import org.apache.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;

import cosmos.frontend.middle.api.exception.MiddlewareServiceException;
import cosmos.frontend.middle.api.model.DataStream;

@Service
public class MiddlewareService {

	private RestTemplate restTemplate = new RestTemplate() ;
	private static final Logger logger = Logger.getLogger(MiddlewareService.class);
	private static final String STATUS_CODE_NOT_OK_EXCEPTION = " Problem when executing service - Status Code Received: ";
	
	
	public ResponseEntity<DataStream[]> getAvailableDataStreams() throws MiddlewareServiceException{
		logger.debug(" Entering getAvailableDataStreams() ");
		
		try{
			long before = Calendar.getInstance().getTimeInMillis();
			ResponseEntity<String> response = restTemplate.getForEntity("http://localhost:8010/data-streams", String.class);
			long after = Calendar.getInstance().getTimeInMillis();
			
			logger.debug(" Back-end response delay (milis): " + (after-before));
			logger.debug(" Back-end response: " + response);
	
			// FIXME El mapeo de JSON a Object debería ser directo, dado por los MessageConverters del restTemplate
			Gson g = new Gson();
			DataStream[] fromJson = g.fromJson(response.getBody(), DataStream[].class);
			logger.debug(" Response after deserialization: " + fromJson);
			
			if(response.getStatusCode().is2xxSuccessful()){
				return new ResponseEntity<DataStream[]>(fromJson, response.getStatusCode()); 
			}else{
				logger.error(" Problem when executing getAvailableDataStreams() ");
				throw new MiddlewareServiceException(STATUS_CODE_NOT_OK_EXCEPTION + response.getStatusCodeValue());
			}
		}catch(RestClientException e){
			logger.error(" Problem when executing getAvailableDataStreams() ");
			e.printStackTrace(System.err);
			throw new MiddlewareServiceException(e.getMessage());
		}
		
	}

	public ResponseEntity<DataStream> getDataStreamInformation(String dataStreamName) throws MiddlewareServiceException{
		logger.debug(" Entering getDataPointsForDataStream() ");
		
		try{
			long before = Calendar.getInstance().getTimeInMillis();
			ResponseEntity<String> response = restTemplate.getForEntity("http://localhost:8010/data-streams/" + dataStreamName, String.class);
			long after = Calendar.getInstance().getTimeInMillis();
			
			logger.debug(" Response delay (milis): " + (after-before));
			logger.debug(" Response from back-end: " + response);
	
			// FIXME El mapeo de JSON a Object debería ser directo, dado por los MessageConverters del restTemplate
			Gson g = new Gson();
			DataStream fromJson = g.fromJson(response.getBody(), DataStream.class);
			
			logger.debug(" Response after deserialization: " + fromJson);
			
			if(response.getStatusCode().is2xxSuccessful()){
				return new ResponseEntity<DataStream>(fromJson, response.getStatusCode()); 
			}else{
				logger.error(" Problem when executing getAvailableDataStreams() ");
				throw new MiddlewareServiceException(STATUS_CODE_NOT_OK_EXCEPTION + response.getStatusCodeValue());
			}
		}catch(RestClientException e){
			logger.error(" Problem when executing getAvailableDataStreams() ");
			e.printStackTrace(System.err);
			throw new MiddlewareServiceException(e.getMessage());
		}
	}
	
//	public ResponseEntity<List<DataPoint>> getDataPointsForDataStream(String dataStreamName) throws MiddlewareServiceException{
//		logger.debug(" Entering getDataPointsForDataStream() ");
//		
//		long before = Calendar.getInstance().getTimeInMillis();
//		ResponseEntity<String> response = restTemplate.getForEntity("http://localhost:8010/data-streams/" + dataStreamName, String.class);
//		long after = Calendar.getInstance().getTimeInMillis();
//		
//		System.out.println(response);
//		
//		logger.debug(" Response delay (milis): " + (after-before));
//		logger.debug(" Response from back-end: " + response);
//
//		// FIXME El mapeo de JSON a Object debería ser directo, dado por los MessageConverters del restTemplate
//		Gson g = new Gson();
//		DataStream fromJson = g.fromJson(response.getBody(), DataStream.class);
//		
//		System.out.println(fromJson);
//		
//		logger.debug(" Response after deserialization: " + fromJson);
//		
//		if(response.getStatusCode().is2xxSuccessful()){
//			return new ResponseEntity<List<DataPoint>>(fromJson.getDataPoints(), response.getStatusCode()); 
//		}else{
//			logger.error(" Problem when executing getAvailableDataStreams() ");
//			throw new MiddlewareServiceException(STATUS_CODE_NOT_OK_EXCEPTION + response.getStatusCodeValue());
//		}
//	}
}