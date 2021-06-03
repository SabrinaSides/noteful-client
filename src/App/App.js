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
import NotefulError from '../NotefulError';
import './App.css';

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
  };

 /* handleDeleteNote = (note_id) => {
    fetch(`${APIconfig.API_ENDPOINT}/notes/${note_id}`, {
      method: 'DELETE',
     headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(null)})
      //.then(res => this.props.history.push(`/`)) 
      .then(res => this.deleteNote(note_id))
    } */

  handleDeleteNote = (noteId) => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
      })
  }

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
    return fetch(`${APIconfig.API_ENDPOINT}/api/notes`)
      .then(res => {
        if(!res.ok){
          throw new Error(res.statusText)
        }
      return res.json()
      })
  }

  fetchFolders = () => {
    return fetch(`${APIconfig.API_ENDPOINT}/api/folders`)
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
        {['/', '/folder/:folder_id'].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:note_id" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folder_id'].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:note_id" component={NotePageMain} />
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
          <NotefulError>
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          </NotefulError>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{' '}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <NotefulError>
          <main className="App__main">{this.renderMainRoutes()}</main>
          </NotefulError>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
