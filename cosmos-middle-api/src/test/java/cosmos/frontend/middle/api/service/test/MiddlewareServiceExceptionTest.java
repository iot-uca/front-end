package cosmos.frontend.middle.api.service.test;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;

import cosmos.frontend.middle.api.exception.MiddlewareServiceException;

public class MiddlewareServiceExceptionTest {

	@Test
	public void testConstructors(){
		assertThat( new MiddlewareServiceException()).isInstanceOf(MiddlewareServiceException.class);
		assertThat( new MiddlewareServiceException("string")).isInstanceOf(MiddlewareServiceException.class);
		assertThat( new MiddlewareServiceException(new Exception())).isInstanceOf(MiddlewareServiceException.class);
		assertThat( new MiddlewareServiceException("string", new Exception())).isInstanceOf(MiddlewareServiceException.class);
	}
}
