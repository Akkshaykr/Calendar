import React from 'react';
import './EventViewer.css';

const EventViewer = ({ date, events, language, onClose, onAddEvent }) => {
  const translations = {
    en: {
      eventsFor: 'Events for',
      addNewEvent: 'Add New Event',
      close: 'Close',
      time: 'Time',
      title: 'Title',
      description: 'Description'
    },
    hi: {
      eventsFor: 'इवेंट्स',
      addNewEvent: 'नया इवेंट जोड़ें',
      close: 'बंद करें',
      time: 'समय',
      title: 'शीर्षक',
      description: 'विवरण'
    },
    ta: {
      eventsFor: 'நிகழ்வுகள்',
      addNewEvent: 'புதிய நிகழ்வு சேர்க்க',
      close: 'மூடு',
      time: 'நேரம்',
      title: 'தலைப்பு',
      description: 'விளக்கம்'
    }
  };

  const t = translations[language];

  return (
    <div className="event-viewer-overlay">
      <div className="event-viewer-modal">
        <div className="event-viewer-header">
          <h3>{t.eventsFor} {date?.toLocaleDateString()}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="events-list">
          {events.map((event, index) => (
            <div key={index} className="event-item">
              <div className="event-time">{event.time}</div>
              <div className="event-content">
                <h4 className="event-title">{event.title}</h4>
                {event.description && (
                  <p className="event-description">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="event-viewer-actions">
          <button className="add-event-button" onClick={onAddEvent}>
            {t.addNewEvent}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventViewer;
