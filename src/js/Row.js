import React, { useState, useEffect } from 'react';

// parses data and creates the row for the row passed in
function CreateRow ({ columns, row, modifyRow, modifyColumn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subKeys, setSubKeys] = useState();
  const [subs, setSubs] = useState();

  useEffect(() => {
    if (row.subs) {
      const subKeys = Object.keys(row.subs);
      setSubs({ ...row.subs });
      setSubKeys(subKeys);
    }
  }, [row.subs]);

  function modifySubRow (action, rowId, change = {}) {
    const tempSubs = { ...row.subs };
    if (action === 'delete') {
      delete tempSubs[rowId];
      modifyRow('modify', row.id, { subs: tempSubs });
    } else if (action === 'modify') {
      const objectKey = Object.keys(change)[0];
      tempSubs[rowId][objectKey] = change[objectKey];
      modifyRow('modify', row.id, { subs: tempSubs });
    }
  }

  return (
    <>
      <div className='table-row' id={row.id}>
        <div className='row-title title-column'>
          {subKeys && <span className={isOpen ? 'material-icons grey-icon open-section rotated-icon' : 'material-icons grey-icon open-section'} onClick={() => setIsOpen(!isOpen)}>chevron_right</span>}
          <input type='text' value={row.title} onInput={(e) => modifyRow('modify', row.id, { title: e.target.value })} />
          <span className='material-icons' onClick={() => modifyRow('delete', row.id)}>cancel</span>
        </div>
        {columns.map((column, index) => {
          return (
            <div className='row-item' key={'row' + index}>
              <input type={row.type} value={column[row.id]} onInput={(e) => modifyColumn('modify', index, { [row.id]: e.target.value })} />
            </div>
          );
        })}
      </div>
      {/* Check for sub-rows and render them */}
      {subKeys && isOpen &&
        subKeys.map((rowId, index) => {
          return (
            <div className='table-row' key={`${rowId} + index`} id={rowId}>
              <div className='row-title sub-row'>
                <input className='sub-row-title-input' type='text' value={subs[rowId].title} onInput={(e) => modifySubRow('modify', rowId, { title: e.target.value })} />
                <span className='material-icons' onClick={() => modifySubRow('delete', rowId)}>cancel</span>
              </div>
              {columns.map((column, index) => {
                return (
                  <div className='row-item' key={'sub-row-' + index}>
                    <input type={subs[rowId].type} value={column[rowId]} onInput={(e) => modifyColumn('modify', index, { [rowId]: e.target.value })} />
                  </div>
                );
              })}
            </div>
          );
        })}
    </>
  );
}

export default CreateRow;
