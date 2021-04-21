import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
//import dummyStore from '../dummy-store';
import APIconfig from '../APIconfig';
import NotefulContext from '../NotefulContext';
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${APIconfig.API_ENDPOINT}/notes`),
      fetch(`${APIconfig.API_ENDPOINT}/folders`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) {
          return notesRes.json().then(e => Promise.reject(e));
        }
        if (!foldersRes.ok) {
            return foldersRes.json().then(e => Promise.reject(e));
        }
        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => this.setState({notes, folders}))
      .catch((error) => alert(error));
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
      </>
    );
  }

  render() {
    //making contextvalue sync with state
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
    };

    return (
      //Provider used in return statement because above functions called inside
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{' '}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
