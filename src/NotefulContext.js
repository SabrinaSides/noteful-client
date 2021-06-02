import React from 'react';

const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    fetchData: () => {},
})

export default NotefulContext; 