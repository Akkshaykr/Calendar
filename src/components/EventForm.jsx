import React, { useState } from 'react';
import './EventForm.css';

const EventForm = ({ date, language, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');

  const translations = {
    en: {
      addEventFor: 'Add Event for',
      eventTitle: 'Event Title',
      eventDescription: 'Event Description',
      eventTime: 'Event Time',
      save: 'Save Event',
      cancel: 'Cancel',
      titleRequired: 'Title is required',
      timeRequired: 'Time is required'
    },
    hi: {
      addEventFor: 'इवेंट जोड़ें',
      eventTitle: 'इवेंट शीर्षक',
      eventDescription: 'इवेंट विवरण',
      eventTime: 'इवेंट समय',
      save: 'इवेंट सेव करें',
      cancel: 'रद्द करें',
      titleRequired: 'शीर्षक आवश्यक है',
      timeRequired: 'समय आवश्यक है'
    },
    ta: {
      addEventFor: 'நிகழ்வு சேர்க்க',
      eventTitle: 'நிகழ்வு தலைப்பு',
      eventDescription: 'நிகழ்வு விளக்கம்',
      eventTime: 'நிகழ்வு நேரம்',
      save: 'நிகழ்வு சேமிக்க',
      cancel: 'ரத்து செய்',
      titleRequired: 'தலைப்பு தேவை',
      timeRequired: 'நேரம் தேவை'
    }
  };

  const t = translations[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !time.trim()) {
      alert(t.titleRequired + (time ? '' : `, ${t.timeRequired}`));
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      time: time.trim()
    });

    setTitle('');
    setDescription('');
    setTime('');
  };

  return (
    <div className="event-form-overlay">
      <div className="event-form-modal">
        <div className="event-form-header">
          <h3>{t.addEventFor} {date?.toLocaleDateString()}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="eventTime">{t.eventTime}</label>
            <input
              type="time"
              id="eventTime"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventTitle">{t.eventTitle}</label>
            <input
              type="text"
              id="eventTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.eventTitle}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventDescription">{t.eventDescription}</label>
            <textarea
              id="eventDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.eventDescription}
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              {t.cancel}
            </button>
            <button type="submit" className="save-button">
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
