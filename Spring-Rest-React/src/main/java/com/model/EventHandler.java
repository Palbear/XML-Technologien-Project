package com.model;
import static com.model.WebSocketConfiguration.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

/**
 * @author Greg Turnquist
 */
// tag::code[]
@Component
@RepositoryEventHandler(Painting.class)
public class EventHandler {

	private final SimpMessagingTemplate websocket;

	private final EntityLinks entityLinks;

	@Autowired
	public EventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks) {
		this.websocket = websocket;
		this.entityLinks = entityLinks;
	}

//	@HandleAfterCreate
//	public void newPainting(Painting painting) {
//		this.websocket.convertAndSend(
//				MESSAGE_PREFIX + "/newPainting", getPath(painting));
//	}


//	@HandleAfterSave
//	public void updatePainting(Painting painting) {
//		this.websocket.convertAndSend(
//				MESSAGE_PREFIX + "/updatePainting", getPath(painting));
//	}

	/**
	 * Take an {@link Painting} and get the URI using Spring Data REST's {@link EntityLinks}.
	 *
	 * @param painting
	 */
	private String getPath(Painting painting) {
		return this.entityLinks.linkForSingleResource(painting.getClass(),
				painting.getId()).toUri().getPath();
	}

}
// end::code[]

