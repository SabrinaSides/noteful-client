import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotefulContext from '../NotefulContext';
import APIconfig from '../APIconfig';
import './Note.css';

export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  };
  static contextType = NotefulContext;

  handleClickDelete = (e) => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`${APIconfig.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
    .then(res => {
      if(!res.ok) { return res.json().then(e => Promise.reject(e))}
        return res.json()
    })
    .then(() => {
      this.context.deleteNote(noteId)
      //allow parent to perform extra behavior, prop passed from NotePain Main (where function lives), 
      //sends user back to mainpage after deleting note on notepage
      this.props.onDeleteNote(noteId)
    })
    .catch(error => console.error({ error }))
  };

  render() {
    const { name, id, modified } = this.props;
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon="trash-alt" /> remove
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified{' '}
            <span className="Date">{format(modified, 'Do MMM YYYY')}</span>
          </div>
        </div>
      </div>
    );
  }
}
