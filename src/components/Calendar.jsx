import React, { useState, useEffect } from 'react';
import './Calendar.css';
import EventViewer from './EventViewer';
import EventForm from './EventForm';

const Calendar = ({ language, theme }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [showEventViewer, setShowEventViewer] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const translations = {
    en: {
      months: ['January', 'February', 'March', 'April', 'May', 'June',
               'July', 'August', 'September', 'October', 'November', 'December'],
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      today: 'Today',
      addEvent: 'Add Event',
      viewEvents: 'View Events',
      noEvents: 'No events for this date'
    },
    hi: {
      months: ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
               'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
      days: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
      today: 'आज',
      addEvent: 'इवेंट जोड़ें',
      viewEvents: 'इवेंट देखें',
      noEvents: 'इस दिनांक के लिए कोई इवेंट नहीं'
    },
    ta: {
      months: ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்',
               'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'],
      days: ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'],
      today: 'இன்று',
      addEvent: 'நிகழ்வு சேர்க்க',
      viewEvents: 'நிகழ்வுகளைப் பார்க்க',
      noEvents: 'இந்த தேதிக்கு நிகழ்வுகள் இல்லை'
    }
  };

  const t = translations[language];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    const dateKey = clickedDate.toDateString();
    if (events[dateKey] && events[dateKey].length > 0) {
      setShowEventViewer(true);
    } else {
      setShowEventForm(true);
    }
  };

  const addEvent = (eventData) => {
    const dateKey = selectedDate.toDateString();
    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), eventData]
    }));
    setShowEventForm(false);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = date.toDateString();
      const hasEvents = events[dateKey] && events[dateKey].length > 0;
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
          {hasEvents && (
            <div className="event-indicator">
              <span className="event-count">{events[dateKey].length}</span>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={`calendar-container ${theme}`}>
      <div className="calendar-header">
        <button className="nav-button" onClick={() => navigateMonth(-1)}>‹</button>
        <div className="month-year">
          <h2>{t.months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        </div>
        <button className="nav-button" onClick={() => navigateMonth(1)}>›</button>
      </div>

      <button className="today-button" onClick={goToToday}>
        {t.today}
      </button>

      <div className="calendar-grid">
        <div className="calendar-header-days">
          {t.days.map(day => (
            <div key={day} className="calendar-header-day">{day}</div>
          ))}
        </div>
        <div className="calendar-days">
          {renderCalendarDays()}
        </div>
      </div>

      {showEventViewer && (
        <EventViewer
          date={selectedDate}
          events={events[selectedDate?.toDateString()] || []}
          language={language}
          onClose={() => setShowEventViewer(false)}
          onAddEvent={() => {
            setShowEventViewer(false);
            setShowEventForm(true);
          }}
        />
      )}

      {showEventForm && (
        <EventForm
          date={selectedDate}
          language={language}
          onSave={addEvent}
          onClose={() => setShowEventForm(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
