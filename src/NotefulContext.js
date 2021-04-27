import React from 'react';

const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {}

})

export default NotefulContext; 