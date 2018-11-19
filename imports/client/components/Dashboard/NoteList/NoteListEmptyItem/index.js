import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import moment from 'moment';

const NoteListEmptyItem = ({ onAdd }) => {
  return (
    <li className='notelistemptyitem'>
      <a onClick={onAdd}>
        <h3><span>You have no notes</span></h3>
        <p className='note__updatedat'>
          Create a note to get started!
        </p>
      </a>
    </li>
  );
}

export default NoteListEmptyItem;
