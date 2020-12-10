import React, { useState } from 'react';
import Table from './js/Table';
import './App.css';

const rowData = {
  'product-description': {
    title: 'Product Description',
    id: 'product-description',
    type: 'text'
  },
  'funding-history': {
    title: 'Funding History',
    id: 'funding-history',
    type: 'text',
    open: false,
    subs: {
      founded: {
        title: 'Founded',
        id: 'founded',
        type: 'number'
      },
      'key-investors': {
        title: 'Key Investors',
        id: 'key-investors',
        type: 'text'
      },
      founders: {
        title: 'Founders',
        id: 'founders',
        type: 'text'
      }
    }
  },
  pricing: {
    title: 'Pricing',
    id: 'pricing',
    type: 'text'
  },
  features: {
    title: 'Features',
    id: 'features',
    type: 'text'
  },
  'customer-case-studies': {
    title: 'Customer Case Studies',
    id: 'customer-case-studies',
    type: 'text'
  }
};

const columnData = [
  {
    'add-title': 'Dropbox',
    icon: 'dropbox',
    'overall-score': 6,
    color: '0000FF',
    'product-description': 'Dropbox is a cloud based file management',
    'funding-history': 'Total funding $170m',
    founded: '2007',
    'key-investors': 'Index Ventures, Sequoia',
    founders: 'Arash Ferdoswi',
    pricing: 'www.dropbox.com/pricing',
    features: '5 different features present',
    'customer-case-studies': '4 customer case studies found'
  },
  {
    'add-title': 'Google Drive',
    icon: 'drive',
    color: '00ff00',
    'overall-score': 4.5,
    'product-description': 'Store, sync, and share file easily',
    'funding-history': 'Total funding $36.1m',
    founded: '1998',
    'key-investors': 'Sequia, Kleiner, Index Ventures',
    founders: 'Larry Page, Sergey Bin',
    pricing: 'www.drive.google.com/pricing',
    features: '4 different features present',
    'customer-case-studies': '6 customer case studies found'
  },
  {
    'add-title': 'SalesForce',
    'overall-score': 6.2,
    icon: 'salesforce',
    color: '0000FF',
    'product-description': 'SalesForce is a cloud based file storage',
    'funding-history': 'Total funding $756.1m',
    founded: '2002',
    'key-investors': 'Sequia, Larry Page',
    founders: 'Kleiner, Sergey Bin',
    pricing: 'www.salesforce.com/pricing',
    features: '6 different features present',
    'customer-case-studies': '1 customer case studies found'
  },
  {
    'add-title': 'Box',
    icon: 'box',
    color: 'FF0000',
    'overall-score': 6.1,
    'product-description': 'Box is a modern content management',
    'funding-history': 'Total funding $150m',
    founded: '2005',
    'key-investors': 'DFG, Scale Venture Partners',
    founders: 'Aeron Levie, Dylon Smith',
    pricing: '',
    features: '6 different features present',
    'customer-case-studies': '2 customer case studies present'
  }
];

function App () {
  const [rows, setRows] = useState(rowData);
  const [columns, setColumns] = useState(columnData);

  function modifyRow (action, rowId, change = {}) {
    const tempRows = { ...rows };
    if (action === 'delete') {
      const tempColumns = [...columns];
      for (const column of tempColumns) {
        if (column[rowId]) delete column[rowId];
      }
      setColumns(tempColumns);
      delete tempRows[rowId];
      setRows(tempRows);
    } else if (action === 'add') {
      tempRows[change.id] = change;
      setRows(tempRows);
    } else if (action === 'modify') {
      const objectKey = Object.keys(change)[0];
      tempRows[rowId][objectKey] = change[objectKey];
      setRows(tempRows);
    } else {
      throw new Error('modifyRows action not supported');
    }
  }

  function modifyColumn (action, columnNumber, change = {}) {
    const tempColumns = [...columns];
    if (action === 'delete') {
      tempColumns.splice(columnNumber, 1);
      setColumns(tempColumns);
    } else if (action === 'add') {
      tempColumns.push(change);
      setColumns(tempColumns);
    } else if (action === 'modify') {
      const key = Object.keys(change)[0];
      tempColumns[columnNumber][key] = change[key];
      setColumns(tempColumns);
    } else {
      throw new Error('modifyColumn action not supported');
    }
  }

  return (
    <div className='app'>
      <Table rows={rows} columns={columns} modifyRow={modifyRow} modifyColumn={modifyColumn} />
    </div>
  );
}

export default App;
