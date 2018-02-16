package cosmos.frontend.middle.api.service.test;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.get;
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.ClassRule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.github.tomakehurst.wiremock.junit.WireMockClassRule;

import cosmos.frontend.middle.api.exception.MiddlewareServiceException;
import cosmos.frontend.middle.api.model.DataStream;
import cosmos.frontend.middle.api.service.MiddlewareService;

@SpringBootTest 
@RunWith(SpringRunner.class)
public class MiddlewareServiceTest {
	
	private static final String HUMIDITY = "Humidity";
	private static final String PRESSURE = "Pressure";
	private static final String TEMPERATURE = "Temperature";

	private static final String APP_JSON = "application/json";
	private static final String CONTENT_TYPE = "Content-Type";

	@ClassRule
	public static WireMockClassRule wireMockRule = new WireMockClassRule(8010);
	
	@Autowired
	private MiddlewareService service;

    @Test
    public void testServiceInstance() throws Exception {
        assertThat(service).isNotNull();
    }
	
	@Test(expected = MiddlewareServiceException.class)
	public void getAvailableDataStreamsWithStatusNotOkTest() throws Exception{
		
		// Mock the resource and force to answer with a predefined JSON
		stubFor(get(urlEqualTo("/data-streams")).willReturn(aResponse().withStatus(500).withHeader(CONTENT_TYPE, APP_JSON)));

		// Call the service
		service.getAvailableDataStreams();
		
	}	
	
	@Test
	public void getAvailableDataStreamsWithOkStatusTest() throws Exception{
		
		// Mock the resource and force to answer with a predefined JSON
		stubFor(get(urlEqualTo("/data-streams")).willReturn(aResponse().withStatus(200).withHeader(CONTENT_TYPE, APP_JSON).withBodyFile("/data-streams.json")));

		// Call the service
		ResponseEntity<DataStream[]> availableDataStreams = service.getAvailableDataStreams();
		
		assertThat(availableDataStreams.getStatusCode()).isEqualTo(HttpStatus.OK);
		DataStream[] dataStreams = availableDataStreams.getBody();
		assertThat(dataStreams).isNotNull();
		
		assertThat(dataStreams[0].getName()).isEqualTo(TEMPERATURE);
		assertThat(dataStreams[0].getCurrentValue()).isEqualTo(16.5);
		assertThat(dataStreams[0].getLastUpdate()).isEqualTo("October 7, 2017 18:25:28 {(GMT-03:00) Local Time}");
		
		assertThat(dataStreams[1].getName()).isEqualTo(PRESSURE);
		assertThat(dataStreams[1].getCurrentValue()).isEqualTo(1016);
		assertThat(dataStreams[1].getLastUpdate()).isEqualTo("October 7, 2017 18:17:04 {(GMT-03:00) Local Time}");
		
		assertThat(dataStreams[2].getName()).isEqualTo(HUMIDITY);
		assertThat(dataStreams[2].getCurrentValue()).isEqualTo(72);
		assertThat(dataStreams[2].getLastUpdate()).isEqualTo("October 7, 2017 18:17:04 {(GMT-03:00) Local Time}");
		
	}
	
	@Test
	public void getDataStreamInformationWithStatusOkTest() throws Exception{
		
		// Mock the resource and force to answer with a predefined JSON
		stubFor(get(urlEqualTo("/data-streams/Temperature")).willReturn(aResponse().withStatus(200).withHeader(CONTENT_TYPE, APP_JSON).withBodyFile("/temperature-data-stream.json")));

		// Call the service
		ResponseEntity<DataStream> dataStreamInformation = service.getDataStreamInformation(TEMPERATURE);
		
		assertThat(dataStreamInformation.getStatusCode()).isEqualTo(HttpStatus.OK);
		DataStream dataStream = dataStreamInformation.getBody();
		assertThat(dataStream).isNotNull();
		
		assertThat(dataStream.getName()).isEqualTo(TEMPERATURE);
		assertThat(dataStream.getCurrentValue()).isEqualTo(16.5);
		assertThat(dataStream.getLastUpdate()).isEqualTo("October 7, 2017 18:25:28 {(GMT-03:00) Local Time}");
		
		assertThat(dataStream.getDataPoints()).isNotNull();
		assertThat(dataStream.getDataPoints().size()).isEqualTo(2);
		
		assertThat(dataStream.getDataPoints().get(0).getValue()).isEqualTo(16);
		assertThat(dataStream.getDataPoints().get(0).getTimestamp()).isEqualTo("October 7, 2017 18:17:04 {(GMT-03:00) Local Time}");
		
		assertThat(dataStream.getDataPoints().get(1).getValue()).isEqualTo(16.5);
		assertThat(dataStream.getDataPoints().get(1).getTimestamp()).isEqualTo("October 7, 2017 18:25:28 {(GMT-03:00) Local Time}");
	}
	
	@Test(expected = MiddlewareServiceException.class)
	public void getDataStreamInformationWithStatusNotOkTest() throws Exception{
		
		// Mock the resource and force to answer with a predefined JSON
		stubFor(get(urlEqualTo("/data-streams/FanSpeed")).willReturn(aResponse().withStatus(404).withHeader(CONTENT_TYPE, APP_JSON)));

		// Call the service
		service.getDataStreamInformation("FanSpeed");

	}
}
