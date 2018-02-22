package cosmos.frontend.middle.api.service.test;

import org.junit.Test;

import com.tocea.easycoverage.framework.junit.JUnitTestSuiteProvider;

import cosmos.frontend.middle.api.model.Action;
import cosmos.frontend.middle.api.model.DataPoint;
import cosmos.frontend.middle.api.model.DataStream;
import junit.framework.TestSuite;

public class DomainTest {

	@Test
	public static TestSuite suite(){
		
		JUnitTestSuiteProvider testSuiteProvider = new JUnitTestSuiteProvider();
		
		testSuiteProvider.addClass(Action.class);
		testSuiteProvider.addClass(DataStream.class);
		testSuiteProvider.addClass(DataPoint.class);
		
		return testSuiteProvider.getTestSuite("Easy Coverage Quick Start Test Suite");
	}
	
}
