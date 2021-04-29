import React from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import APIconfig from '../APIconfig';
import NotefulContext from '../NotefulContext';
import './App.css';

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
  };

 handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    Promise.all([
      this.fetchNotes(),
      this.fetchFolders()
    ])
      .then(([notes, folders]) => this.setState({ notes, folders }))
      .catch((error) => this.setState(error));
  };

  fetchNotes = () => {
    return fetch(`${APIconfig.API_ENDPOINT}/notes`)
      .then(res => {
        if(!res.ok){
          throw new Error(res.statusText)
        }
      return res.json()
      })
  }

  fetchFolders = () => {
    return fetch(`${APIconfig.API_ENDPOINT}/folders`)
      .then(res => {
        if(!res.ok){
          throw new Error(res.statusText)
        }
        return res.json()
      })
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
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
      </>
    );
  }

  render() {
    //making contextvalue sync with state and state changes
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      fetchData: this.fetchData,
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
