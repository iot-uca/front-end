package sa;

import org.junit.Test;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;

import cosmos.frontend.middle.api.model.DataStream;

public class TestCase {
	
	@Test
	public void s(){
		RestTemplate rt = new RestTemplate();
		HttpEntity<String> response = null;
		response = rt.getForEntity("http://localhost:8010/data-streams", String.class);
		System.out.println(response);
	}
	
	@Test
	//TODO no es lo mejor, lo ideal es traer la entidad, fijarse el HTTP Status y después el body!
	public void stringTest(){
		RestTemplate restTemplate = new RestTemplate();
		//DataStream[] response = restTemplate.getForObject("http://localhost:8010/data-streams", DataStream[].class);
		String response = restTemplate.getForObject("http://localhost:8010/data-streams", String.class);
		System.out.println("RESPONSE FOR PROCESS SERVICE: " + response);
	}
	
	@Test
	//TODO no es lo mejor, lo ideal es traer la entidad, fijarse el HTTP Status y después el body!
	public void httpEntityTest(){
		RestTemplate restTemplate = new RestTemplate();
		//DataStream[] response = restTemplate.getForObject("http://localhost:8010/data-streams", DataStream[].class);
		HttpEntity<String> response = restTemplate.getForEntity("http://localhost:8010/data-streams", String.class);
		System.out.println("RESPONSE FOR PROCESS SERVICE: " + response);
		System.out.println("STATUS: " + response.getHeaders());
		System.out.println("BODY: " + response.getBody());
	}
	
	@Test
	//TODO no es lo mejor, lo ideal es traer la entidad, fijarse el HTTP Status y después el body!
	public void responseEntityTest(){
		RestTemplate restTemplate = new RestTemplate();
		//DataStream[] response = restTemplate.getForObject("http://localhost:8010/data-streams", DataStream[].class);
		ResponseEntity<String> response = restTemplate.getForEntity("http://localhost:8010/data-streams", String.class);
		System.out.println("RESPONSE FOR PROCESS SERVICE: " + response);
		System.out.println("STATUS: " + response.getStatusCode());
		System.out.println("STATUS VALUE: " + response.getStatusCodeValue());
		System.out.println("HEADERS: " + response.getHeaders());
		System.out.println("BODY: " + response.getBody());
		
		Gson g = new Gson();
		DataStream[] fromJson = g.fromJson(response.getBody(), DataStream[].class);
		System.out.println("DTO RESPONSE : " + fromJson[1].toString());
		
	}

}
