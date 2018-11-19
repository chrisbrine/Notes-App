import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

const NoteListHeader = ({ onAdd }) => {
    return (
      <div className='notelistheader'>
        <button onClick={onAdd} className='button button--fullwidth'>Create Note</button>
      </div>
    );
}

export default NoteListHeader;
