import React from 'react';
import '../css/table.scss';

/**
 * rows = {
 *  <rowId>: {
 *     title: String,
 *     id: String,
 *     type: 'text' or 'number',
 *     open: Boolean,
 *     parentId: String
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
  // parses data and creates the row for the row passed in
  function createRow (row) {
    return (
      <div className='table-row' id={row.id}>
        <div className='row-title'>
          <input type='text' value={row.title} onInput={(e) => modifyRow('modify', row.id, { title: e.target.value })} />
          <span class='material-icons' onClick={() => modifyRow('delete', row.id)}>cancel</span>
        </div>
        {/* TODO: Add nesting rows ability */}
        {columns.map((column, index) => {
          return (
            <div className='row-item' key={index}>
              <input type={row.type} value={column[row.id]} onInput={(e) => modifyColumn('modify', index, { [row.id]: e.target.value })} />
            </div>
          );
        })}
      </div>
    );
  }

  // creates array of custom rows elements
  function renderTable () {
    const rowsArray = [];
    const rowKeys = Object.keys(rows);
    for (const row of rowKeys) {
      console.log(row);
      rowsArray.push(createRow(rows[row]));
    }
    return rowsArray;
  }

  return (
    <article className='table-container'>
      {/* render the 'add criteria row */}
      <div className='new-row-row'>
        <button className='small-caps-button' onClick={() => modifyRow('add', null, { title: 'New row', id: `new-row-${Object.keys(rows).length + 1}`, type: 'text' })}>
          ADD CRITERIA
          <span class='material-icons'>
            arrow_drop_down
          </span>
        </button>
      </div>
      {/* render the title row */}
      <div className='table-row'>
        <div className='row-title title'>
          <button className='button-lite' onClick={() => modifyColumn('add', columns.length + 1, { 'add-title': 'New company' })}>
            <div className='company-logo'>
              <span class='material-icons add-column'>add_circle</span>
            </div>
            Add New Vendor
          </button>
        </div>
        <>
          {columns.map((column, index) => {
            return (
              <div className='row-item title' key={index}>
                <div className='company-logo'>
                  <img src='' alt={'logo for ' + column['add-title']} />
                </div>
                <input type='text' value={column['add-title']} onInput={(e) => modifyColumn('modify', index, { 'add-title': e.target.value })} />
                <span class='material-icons delete-column' onClick={() => modifyColumn('delete', index)}>close</span>
              </div>
            );
          })}
        </>
      </div>
      {/* TODO: add overall score row */}
      {renderTable()}
    </article>
  );
};

export default Table;
