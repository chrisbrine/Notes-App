import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header';

const NotFound = () => {
  return (
    <div className='notfound'>

      <Header subtitle='Page Not Found'/>

      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <p>We're unable to find that page.</p>
          <Link to='/' className='link__nounderline'>
            <button className='button button--fullwidth'>
              HEAD HOME
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
