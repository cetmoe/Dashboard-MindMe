import React from 'react';
import '../styles/sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar flex-column'>
      <div className='sidebar-title'>MindMe</div>
      <div className='sidebar-content'>
        <div className='m-1'>
          <div className='nav-cat'>Behandler</div>
          <div className='user-info'>Oddbjørn Hove</div>
          <div className='nav-cat p-t-1'>Pasient</div>
          <div className='user-info'>Roland Gundersen</div>
        </div>
      </div>
      <div className='sidebar-content'>
        <div className='nav-cat p-l-1'>Handlinger</div>
        <div className='sidebar-nav-item'>Search</div>
        <div className='sidebar-nav-item'>Read</div>
        <div className='sidebar-nav-item'>Adjust</div>
        <div className='sidebar-nav-item'>Blabla</div>
      </div>
    </div>
  );
};

export default Sidebar;
