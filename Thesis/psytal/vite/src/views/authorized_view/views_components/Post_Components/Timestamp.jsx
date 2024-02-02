import React from 'react';
import moment from 'moment';

function formatTimestamp(timestamp, updatedAt) {
  const timeToShow = updatedAt || timestamp;

  // Display format: "Month Day, Year at Hour:Minute AM/PM"
  const formattedDateTime = moment(timeToShow).format('MMMM D, YYYY [at] h:mm A');

  return updatedAt ? formattedDateTime : `Created ${formattedDateTime}`;
}

export default function Timestamp({ timestamp, updatedAt }) {
  return <p className="text-xl text-gray-600">{formatTimestamp(timestamp, updatedAt)}</p>;
}
