import '../components/organisms/Calendar/cod-calendar';

export default {
  title: 'Components/Organisms/Calendar',
  argTypes: {
    events: {
      control: { type: 'text' },
      description:
        'A JSON array of events conforming to the FullCalenar \
      event model. See: https://fullcalendar.io/docs/event-model.',
    },
    eventFilters: {
      control: { type: 'text' },
      description: `A JSON object of event filters to be applied. The filters
        should take the following form:
        {
         "filter_name": {
            type: "ui_filter_type",
            legend: "A helpful legend.",
            key: "event_field_key",
            values: [
              "event_field_key_value1",
              "event_field_key_value2"
            ],
          }
        }`,
    },
    eventPropertyRules: {
      control: { type: 'text' },
      description: `A JSON object of event properties to be applied to events matching
          a specific criteria. The keys and value of the object correspond to keys and
          values of the event and filters where the properties are applied. The object
          associated with each key is a list of event properties and their values
          as defined in https://fullcalendar.io/docs/event-object.
          The rules should take the following form:
          {
            event_field_key: {
              event_field_key_value: {
                backgroundColor: '#000',
              }
            }
          }
        `,
    },
  },
  args: {
    events: JSON.stringify([
      {
        title: 'event @ Say Detroit Play Center',
        start: new Date().toISOString(),
        allDay: true,
        location: 'Say Detroit Play Center',
      },
      {
        title: 'event @ Senior Facility',
        start: new Date().toISOString(),
        allDay: true,
        location: 'Senior Facility',
      },
      {
        title: 'event @ Detroit Housing Commission',
        start: new Date().toISOString(),
        allDay: true,
        location: 'Detroit Housing Commission',
      },
    ]),
    eventFilters: JSON.stringify({
      dei_category_filter: {
        type: 'radio',
        legend: 'Select a location filter:',
        key: 'location',
        values: [
          'Say Detroit Play Center',
          'Senior Facility',
          'Dick & Sandy Boys and Girls Club',
          'Detroit Housing Commission',
        ],
      },
    }),
    eventPropertyRules: JSON.stringify({
      location: {
        'Say Detroit Play Center': {
          backgroundColor: '#ff6c37',
        },
        'Senior Facility': {
          backgroundColor: '#1f71bf',
        },
        'Detroit Housing Commission': {
          backgroundColor: '#1ed760',
        },
      },
    }),
  },
};

// Template
const Template = (args) => {
  const calendarElt = document.createElement('cod-calendar');
  calendarElt.setAttribute('events', args.events);
  if (args.eventFilters) {
    calendarElt.setAttribute('event-filters', args.eventFilters);
  }
  if (args.eventPropertyRules) {
    calendarElt.setAttribute('event-property-rules', args.eventPropertyRules);
  }
  return calendarElt;
};

export const Primary = Template.bind({});
