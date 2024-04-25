import styles from '!!raw-loader!./Calendar.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

import observedAttributeMixin from '../../../shared/js/observed-attribute-mixin';

import { Calendar as FullCalendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

const template = document.createElement('template');
template.innerHTML = `
<div>
  <div id="calendarFilters">
  </div>
  <div id="calendar">
  </div>
</div>
`;

class Calendar extends HTMLElement {
  static observedAttributeCbs = {
    events: (component, _oldValue, newEventsJSON) => {
      if (component.calendar === null) {
        // Guard against attribute initialization being
        // called before component connected.
        return;
      }
      component.updateEventArraySource(newEventsJSON);
    },
  };
  static observedAttributes = Object.keys(this.observedAttributeCbs);

  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Create variable for calendar instance
    this.calendar = null;

    // Add styles
    const bootStyles = document.createElement('style');
    bootStyles.textContent = bootstrapStyles;
    const variableStyles = document.createElement('style');
    variableStyles.textContent = varStyles;
    const itemStyles = document.createElement('style');
    itemStyles.textContent = styles;
    this.shadowRoot.appendChild(bootStyles);
    this.shadowRoot.appendChild(variableStyles);
    this.shadowRoot.appendChild(itemStyles);
  }

  connectedCallback() {
    if (this.calendarIsConnected()) {
      return;
    }

    const calendarEl = this.shadowRoot.getElementById('calendar');
    const eventArraySource = this.buildEventArraySource();
    this.calendar = new FullCalendar(calendarEl, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      height: 'auto',
      headerToolbar: {
        left: 'title',
        center: '',
        right: 'prev,next today',
      },
      eventSources: [eventArraySource],
    });
    this.buildEventFilters();
    this.calendar.render();
  }

  /**
   * Build an events source object from the JSON list of events
   * provided by the user of the component.
   * @param {string} [eventsJSON=null] A JSON serialized array of pre-parsed
   *        event objects. See https://fullcalendar.io/docs/event-parsing. If null, events
   *        will be fetched from the 'events' attribute on the component.
   * @returns an EventSource object using an array of events.
   *          See https://fullcalendar.io/docs/event-source-object.
   */
  buildEventArraySource(eventsJSON = null) {
    if (eventsJSON === null) {
      eventsJSON = this.getAttribute('events');
    }
    let events = [];
    try {
      events = JSON.parse(eventsJSON ?? '[]');
    } catch (error) {
      // TODO: Introduce proper error logging.
      // eslint-disable-next-line no-console
      console.error(`Failed to parse list of events:\n${eventsJSON}`);
    }
    events = this.applyEventPropertyRules(events);
    const eventSource = {
      id: 'eventsArray',
      events: events,
    };
    return eventSource;
  }

  /**
   * Apply additional event properties as defined by event
   * property rules supplied in the `event-property-rules` attribute.
   *
   * @param {Object[]} events - An array of pre-parsed
   *        event objects. See https://fullcalendar.io/docs/event-parsing.
   * @returns {Object[]} An array of pre-parsed event objects.
   */
  applyEventPropertyRules(events) {
    const eventPropertyRules = this.getEventPropertyRules();
    for (const property in eventPropertyRules) {
      events = events.map((event) => {
        const eventPropertyValue = event[property];
        if (
          !Object.prototype.hasOwnProperty.call(
            eventPropertyRules[property],
            eventPropertyValue,
          )
        ) {
          return event;
        }
        return {
          ...event,
          ...eventPropertyRules[property][eventPropertyValue],
        };
      });
    }
    return events;
  }

  /**
   * Replaces the 'eventsArray' event source with a new event source.
   *
   * @param {string} newEventsJSON - A JSON serialized array of pre-parsed
   *        event objects. See https://fullcalendar.io/docs/event-parsing. If null, events
   *        will be fetched from the 'events' attribute on the component instead.
   */
  updateEventArraySource(newEventsJSON = null) {
    this.calendar.pauseRendering();
    const newEventSource = this.buildEventArraySource(newEventsJSON);
    this.calendar.getEventSourceById('eventsArray')?.remove();
    this.calendar.addEventSource(newEventSource);
    this.calendar.resumeRendering();
  }

  /**
   * Checks if the calendar is already connected to the Shadow DOM.
   * @returns true if the calendar element is already connected to
   *          the Shadow DOM, and false otherwise.
   */
  calendarIsConnected() {
    return this.shadowRoot.getElementById('calendar').childElementCount > 0;
  }

  /**
   * Creates filter form elements above the calendar based on the event filters provided.
   *
   * @param {string} [newFiltersJSON=null] - A JSON serialized array of event filter definitions.
   *        If null, filters will be fetched from the 'event-filters' attribute on the
   *        component instead.
   */
  buildEventFilters(newFiltersJSON = null) {
    const calendarFilterElt = this.shadowRoot.getElementById('calendarFilters');
    if (calendarFilterElt === null) {
      return;
    }

    if (newFiltersJSON === null) {
      newFiltersJSON = this.getAttribute('event-filters');
    }

    let filters = {};
    try {
      filters = JSON.parse(newFiltersJSON ?? '{}');
    } catch (error) {
      // TODO: Introduce proper error logging.
      // eslint-disable-next-line no-console
      console.error(`Failed to parse list of filters:\n${newFiltersJSON}`);
    }
    for (const filter in filters) {
      this.buildEventFilter(calendarFilterElt, filters[filter]);
    }
  }

  /**
   * Creates a single filter form field set above the calendar based
   * on the event filter provided.
   *
   * @param {HTMLElement} calendarFilterElt - An HTML element to be used
   *        as the container for the event filter created.
   * @param {Object} filter - A single event filter object.
   */
  buildEventFilter(calendarFilterElt, filter) {
    switch (filter.type) {
      case 'radio': {
        const radioFiltersContainer = document.createElement('fieldset');
        radioFiltersContainer.classList.add(
          'd-flex',
          'flex-wrap',
          'm-3',
          'justify-content-center',
        );
        const legend = document.createElement('legend');
        legend.classList.add('visually-hidden');
        legend.innerText = filter.legend;
        radioFiltersContainer.appendChild(legend);
        filter.values.forEach((value) => {
          const radioButtonContainer = document.createElement('div');
          radioButtonContainer.classList.add('m-2');
          const radioButtonInput = document.createElement('input');
          radioButtonInput.setAttribute('type', 'radio');
          radioButtonInput.setAttribute('id', value);
          radioButtonInput.setAttribute('name', filter.key);
          radioButtonInput.setAttribute('value', value);
          radioButtonInput.classList.add('btn-check');
          // Bind event handler to this instance.
          radioButtonInput.addEventListener(
            'click',
            this.filterEvents.bind(this),
          );
          radioButtonContainer.appendChild(radioButtonInput);
          const radioButtonLabel = document.createElement('label');
          radioButtonLabel.setAttribute('for', value);
          radioButtonLabel.classList.add('btn', 'btn-primary');
          const eventRule = this.getEventPropertyRule(filter.key, value);
          this.applyFilterPropertyRule(radioButtonLabel, eventRule);
          radioButtonLabel.innerText = value;
          radioButtonContainer.appendChild(radioButtonLabel);
          radioFiltersContainer.appendChild(radioButtonContainer);
        });
        calendarFilterElt.appendChild(radioFiltersContainer);
        break;
      }
      default: {
        // TODO: Introduce proper error logging.
        // eslint-disable-next-line no-console
        console.warn(`Unsupported event filter type provided: ${filter.type}`);
        return;
      }
    }
  }

  /**
   * Applies necessary styles based on the event property rule supplied.
   *
   * @param {HTMLElement} filterElement - The HTML element where the filter
   *        property rule will be applied.
   * @param {Object} eventPropertyRule - An event property rule to be used as
   *        the filter property.
   */
  applyFilterPropertyRule(filterElement, eventPropertyRule) {
    for (const property in eventPropertyRule) {
      switch (property) {
        case 'backgroundColor': {
          filterElement.style.backgroundColor = eventPropertyRule[property];
          break;
        }
        default: {
          // TODO: Introduce proper error logging.
          // eslint-disable-next-line no-console
          console.warn(`Ignoring unsupported filter property: ${property}`);
          return;
        }
      }
    }
  }

  /**
   * Handles filter element events by filter down events to the
   * user-selected criteria.
   *
   * @param {Event} browserEvent - The browser event triggered on the filter
   *        form element.
   */
  filterEvents(browserEvent) {
    const inputKey = browserEvent.target.name;
    const inputValue = browserEvent.target.value;
    const currentEventsJSON = this.getAttribute('events');
    let events = [];
    try {
      events = JSON.parse(currentEventsJSON ?? '[]');
    } catch (error) {
      // TODO: Introduce proper error logging.
      // eslint-disable-next-line no-console
      console.error(`Failed to parse list of events:\n${currentEventsJSON}`);
    }
    events = events.filter((calEvent) => calEvent[inputKey] === inputValue);
    this.updateEventArraySource(JSON.stringify(events));
  }

  /**
   * Get an event/filter property and value for a given event/filter key and
   * value.
   * @param {string} eventKey - The event key used to filter down filters
   *        and events for rules.
   * @param {string} eventKeyValue - The value at the sepcified event key
   *        used to filter down filters and events for rules.
   * @returns Object - An event property rule consisting of
   *          property keys and values to be applied to events and filters.
   */
  getEventPropertyRule(eventKey, eventKeyValue) {
    const rules = this.getEventPropertyRules();
    return rules[eventKey][eventKeyValue] ?? {};
  }

  /**
   * Get all the event property rules from the `event-property-rules`
   * attribute.
   * @returns Object - All event property rules.
   */
  getEventPropertyRules() {
    const eventPropertyRulesJSON = this.getAttribute('event-property-rules');
    if (!eventPropertyRulesJSON) {
      return {};
    }
    let eventPropertyRules = {};
    try {
      eventPropertyRules = JSON.parse(eventPropertyRulesJSON ?? '{}');
    } catch (error) {
      // TODO: Introduce proper error logging.
      // eslint-disable-next-line no-console
      console.error(
        `Failed to parse event property rules:\n${eventPropertyRulesJSON}`,
      );
    }
    return eventPropertyRules;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name in Calendar.observedAttributeCbs) {
      this.handleObservedAttribute(
        oldValue,
        newValue,
        Calendar.observedAttributeCbs[name],
      );
    }
  }
}

// Apply mixins.
Object.assign(Calendar.prototype, observedAttributeMixin);

export { Calendar as default };
