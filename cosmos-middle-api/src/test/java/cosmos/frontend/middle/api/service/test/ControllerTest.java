package cosmos.frontend.middle.api.service.test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import com.google.gson.Gson;

import cosmos.frontend.middle.api.Application;
import cosmos.frontend.middle.api.model.DataPoint;
import cosmos.frontend.middle.api.model.DataStream;
import cosmos.frontend.middle.api.service.MiddlewareService;

@RunWith(SpringRunner.class)
@SpringBootTest (classes = Application.class)
@AutoConfigureMockMvc
public class ControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private MiddlewareService middlewareService;

    @Test
    public void testGetDataStreamAvailables() throws Exception {
        // Mock Response
    	DataStream[] streamsAvailables = createDataStreams(4);
        ResponseEntity<DataStream[]> expectedResponse = ResponseEntity.status(HttpStatus.OK).body(streamsAvailables);
        given(middlewareService.getAvailableDataStreams()).willReturn(expectedResponse);

        // Execute
        String path = "/dataStream/availables";
        MockHttpServletRequestBuilder mockHttpServletRequestBuilder = get(path, new Object[]{});
        ResultActions resultActions = this.mockMvc.perform(mockHttpServletRequestBuilder);
        String responseJson = resultActions.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8)).andReturn().getResponse().getContentAsString();
        
		Gson g = new Gson();
		String[] received = g.fromJson(responseJson, String[].class);
		
		DataStream[] expected = expectedResponse.getBody();

        assertThat(received).isNotNull().hasSize(expected.length);
        for (int i = 0; i < expected.length; i++) {
            assertEquals(expected[i].getName(), received[i]);
        }
    }
    
    // TODO: Finish this test
//    @Test
//    public void testGetDataStreamInformation() throws Exception {
//        // Mock Response
//		ArrayList<DataPoint> dataPoints = new ArrayList<DataPoint>();
//		dataPoints.add(new DataPoint("timestamp", 3.0));
//    	DataStream streamAvailable = new DataStream("aName", 2.0, "lastUpdate", dataPoints);
//    	
//        ResponseEntity<DataStream> expectedResponse = ResponseEntity.status(HttpStatus.OK).body(streamAvailable);
//        given(middlewareService.getDataStreamInformation(any())).willReturn(expectedResponse);
//
//        // Execute
//        String path = "/dataStream/availables";
//        MockHttpServletRequestBuilder mockHttpServletRequestBuilder = get(path, new Object[]{});
//        ResultActions resultActions = this.mockMvc.perform(mockHttpServletRequestBuilder);
//        String responseJson = resultActions.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8)).andReturn().getResponse().getContentAsString();
//        
//		Gson g = new Gson();
//		String[] received = g.fromJson(responseJson, String[].class);
//		
//		DataStream[] expected = expectedResponse.getBody();
//
//        assertThat(received).isNotNull().hasSize(expected.length);
//        for (int i = 0; i < expected.length; i++) {
//            assertEquals(expected[i].getName(), received[i]);
//        }
//    }
    
	//////////////////////
	// Private Methods  //
	/////////////////////
    
    private DataStream[] createDataStreams(int n){
    	DataStream[] dataStreams = new DataStream[n]; 
    	for(int i=0; i<n; i++){
    		ArrayList<DataPoint> dataPoints = new ArrayList<DataPoint>();
    		dataPoints.add(new DataPoint("timestamp", 3.0));
    		dataStreams[i] = new DataStream("aName", 2.0, "lastUpdate", dataPoints);
    	}
    	return dataStreams;
    }
}
