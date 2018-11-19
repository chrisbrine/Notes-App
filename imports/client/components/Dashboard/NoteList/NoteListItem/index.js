import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const NoteListItem = ({ note, selected }) => {
  const noteListItemClasses = selected
    ? 'notelistitem selected'
    : 'notelistitem';
  return (
    <li className={noteListItemClasses}>
      <Link to={`/dashboard/${note._id}`} onClick={() => Session.set('selectedNoteId', note._id)}>
        <h3>{note.title || (<span>Untitled note</span>)}</h3>
        <p className='note__updatedat'>
          {moment(note.updatedAt).format('l LT')}
        </p>
      </Link>
    </li>
  );
}

export default NoteListItem;
