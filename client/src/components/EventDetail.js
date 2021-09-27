import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

function EventDetail({ eventId, removeRsvpForEvent, rsvpForEvent, cancelEvent }) {
  const [event, setEvent] = useState(null)
  const [rsvpTouched, setRsvpTouched] = useState(0)
  const history = useHistory();

  const fetchEventCallback = useCallback(
    () => {
      fetch(`/events/${eventId}`)
        .then(res => res.json())
        .then(event => setEvent(event))
    },
    [eventId],
  )

  useEffect(() => {
    fetchEventCallback()
  }, [fetchEventCallback, rsvpTouched])


  const cancelEventButton = (event) => {
    if (event.user_is_creator) {
      return (
        <p>
          <button
            onClick={handleCancel}>Cancel Event</button>
        </p>
      )
    }
  }

  const handleCancel = (e) => {
    cancelEvent(event.id);
    history.push('/events')
  }

  const rsvpButton = (event) => {
    if (event.user_event) {
      return (
        <button
          onClick={() => {
            removeRsvpForEvent(event.id);
            setRsvpTouched(rsvpTouched + 1);
          }
        }>
          Cancel RSVP
        </button >
      )
    } else {
      return (
        <button
          onClick={() => {
            rsvpForEvent(event.id)
            setRsvpTouched(rsvpTouched + 1)
          }
        }>
          RSVP for event
        </button>
      )
    }
  }
  
  if(!event) { return <div></div>}
  return (
    <div>
      <h1>{event.title}</h1>
      {cancelEventButton(event)}
      <small>Created by {event.creator} for <Link to={`/groups/${event.group.id}`}>{event.group.name}</Link></small>
      <p>{event.description}</p>
      <p>{event.time}</p>
      <p>Location: {event.location}</p>
      <p>{rsvpButton(event)}</p>
      <ul>
        {event.attendees.map(attendee => (
          <li>{attendee.username}</li>
        ))}
      </ul>


    </div>
  )
}

export default EventDetail
