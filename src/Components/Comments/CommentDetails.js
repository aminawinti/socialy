import React from 'react';

const TIME_DIFFS = {
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000,
};

const CommentDetails = (props) => {
  const now = Date.now();
  const then = new Date(props.createdDate).getTime();
  const diff = now - then;

  let newFormatDate;

  if (diff < TIME_DIFFS.minute) {
    newFormatDate = 'seconds ago';
  } else if (diff < TIME_DIFFS.hour) {
    newFormatDate =
      Math.floor(Math.abs(diff - TIME_DIFFS.hour) / TIME_DIFFS.minute) +
      ' minutes ago';
  } else if (diff < TIME_DIFFS.day) {
    newFormatDate =
      Math.floor(Math.abs(diff - TIME_DIFFS.day) / TIME_DIFFS.hour) +
      ' hours ago';
  } else if (diff < TIME_DIFFS.week) {
    newFormatDate =
      Math.floor(Math.abs(diff - TIME_DIFFS.week) / TIME_DIFFS.day) +
      ' days ago';
  } else if (diff < TIME_DIFFS.month) {
    newFormatDate =
      Math.floor(Math.abs(diff - TIME_DIFFS.month) / TIME_DIFFS.week) +
      ' weeks ago';
  } else if (diff < TIME_DIFFS.year) {
    newFormatDate =
      Math.floor(Math.abs(diff - TIME_DIFFS.year) / TIME_DIFFS.month) +
      ' months ago';
  } else {
    let timeInYears = Math.ceil(
      Math.abs(diff - TIME_DIFFS.year) / TIME_DIFFS.year
    );
    if (timeInYears > 1) {
      newFormatDate = timeInYears + ' years ago';
    } else {
      newFormatDate = timeInYears + ' year ago';
    }
  }

  return (
    <div className="comment">
      <small className="date">{newFormatDate}</small>
      <p>{props.comment}</p>
    </div>
  );
};

export default CommentDetails;
