package cosmos.frontend.middle.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor

public class RealAction {
	private String name;
	private String method;
	private String url;
	private String version;
	private RequestElement[] headers;
	private RequestElement[] body;	
	
}
