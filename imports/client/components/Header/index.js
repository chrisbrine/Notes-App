import React, { Component } from 'react';

const Header = ({ title = 'Notes', subtitle = undefined, buttonLeft = undefined, buttonRight = undefined }) => {
  const makeButton = (button) => {
    if (button === undefined) {
      return undefined;
    }
    const buttonClasses = button.className ? button.className : 'button';
    const buttonOnClick = button.onClick ? button.onClick : null;
    const buttonLabel = button.label ? button.label : '';
    return (
      <button className={buttonClasses} onClick={buttonOnClick}>
        {buttonLabel}
      </button>
    );
  };
  const buttonLeftString = makeButton(buttonLeft);
  const buttonRightString = makeButton(buttonRight);
  return (
    <header className='header'>
      <div className='wrapper'>
        {buttonLeftString ? buttonLeftString : null}
        <h1>{title}</h1>
        {subtitle ? ( <h2>{subtitle}</h2> ) : null}
        {buttonRightString ? buttonRightString : null}
      </div>
    </header>
  );
}

export default Header;
