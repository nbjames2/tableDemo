import React, { useState } from 'react';

function Logo ({ column, modifyColumn, index }) {
  const [logoInputOpen, setLogoInputOpen] = useState(false);
  const [logoInputValue, setLogoInputValue] = useState('');

  function submitLogo (e, index) {
    e.preventDefault();
    modifyColumn('modify', index, { icon: logoInputValue });
    setLogoInputOpen(false);
  }

  return (
    <div className='company-logo'>
      {column.icon
        ? (<img src={`images/${column.icon}.svg`} alt={'logo for ' + column['add-title']} />)
        : (logoInputOpen
            ? (
              <form onSubmit={(e) => submitLogo(e, index)}>
                <input type='text' value={logoInputValue} onChange={(e) => setLogoInputValue(e.target.value)} />
              </form>)
            : (<span className='material-icons grey-icon help-circle' onClick={() => setLogoInputOpen(true)}>help</span>))}
    </div>
  );
}

export default Logo;
