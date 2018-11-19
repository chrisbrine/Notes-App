import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routes from '../imports/client/components/Routes';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  ReactDOM.render(
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  ,
    document.getElementById('app')
  );
});
