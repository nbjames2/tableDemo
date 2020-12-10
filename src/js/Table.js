import React from 'react';
import CreateRow from './Row';
import RingMeter from './RingMeter';
import Logo from './Logo';
import '../css/table.scss';

/**
 * rows = {
 *  <rowId>: {
 *     title: String,
 *     id: String,
 *     type: 'text' or 'number',
 *     open: Boolean,
 *     subs: {
 *      <Row Object>
 *     }
 *   },
 * }
 *
 * columns = [
 * {
 *     <rowId>: String,
 *     <rowId>: String,
 *   },
 * ]
 *
 * modifyRow = function (
 *  action: 'add', 'delete', or 'modify',
 *  rowId: String,
 *  newString: String
 * )
 *
 * modifyColumn = function (
 *  action: 'add', 'delete', or 'modify',
 *  columnNumber: Number,
 *  changesObject: {
 *   <rowId>: String
 *  }
 * )
 */

const Table = ({ rows, columns, modifyRow, modifyColumn }) => {
  // creates array of custom rows elements
  function renderTable () {
    const rowsArray = [];
    const rowKeys = Object.keys(rows);
    for (const row of rowKeys) {
      rowsArray.push(<CreateRow row={rows[row]} columns={columns} modifyColumn={modifyColumn} modifyRow={modifyRow} />);
    }
    return rowsArray;
  }

  return (
    <article className='table-container'>
      {/* render the 'add criteria row */}
      <div className='new-row-row'>
        <button className='small-caps-button' onClick={() => modifyRow('add', null, { title: 'New row', id: `new-row-${Object.keys(rows).length + 1}`, type: 'text' })}>
          ADD CRITERIA
          <span className='material-icons'>
            arrow_drop_down
          </span>
        </button>
      </div>
      {/* render the title row */}
      <div className='table-row'>
        <div className='row-title title'>
          {columns.length >= 4
            ? <p className='note-text'>Note: To add more vendors to compare you need to first remove one or more vendors. At a time maximum 4 vendors are allowed to compare.</p>
            : (
              <button className='button-lite' onClick={() => modifyColumn('add', columns.length + 1, { 'add-title': 'New company' })}>
                <div className='company-logo'>
                  <span className='material-icons add-column'>add_circle</span>
                </div>
                Add New Vendor
              </button>
              )}
        </div>
        <>
          {columns.map((column, index) => {
            return (
              <div className='row-item title' key={index}>
                <Logo column={column} modifyColumn={modifyColumn} index={index} />
                <input type='text' value={column['add-title']} onInput={(e) => modifyColumn('modify', index, { 'add-title': e.target.value })} />
                <span className='material-icons delete-column' onClick={() => modifyColumn('delete', index)}>close</span>
              </div>
            );
          })}
        </>
      </div>
      <div className='table-row' id='overall-score-row'>
        <div className='row-title score-title'>
          Overall Score
        </div>
        {columns.map((column, index) => {
          return <RingMeter column={column} key={column['add-title']} index={index} modifyColumn={modifyColumn} />;
        })}
      </div>
      {/* TODO: add overall score row */}
      {renderTable()}
    </article>
  );
};

export default Table;
