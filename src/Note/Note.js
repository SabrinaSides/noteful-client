import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotefulContext from '../NotefulContext';
import APIconfig from '../APIconfig';
import PropTypes from 'prop-types';
import './Note.css';
class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  };
  static contextType = NotefulContext;

  handleClickDelete = (e) => {
    e.preventDefault();
    const note_id = this.props.id;

    fetch(`${APIconfig.API_ENDPOINT}/notes/${note_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(null)
    })
    .then(() => {
      this.context.deleteNote(note_id)
      //allow parent to perform extra behavior, prop passed from NotePain Main (where function lives), 
      //sends user back to mainpage after deleting note on notepage
      this.props.onDeleteNote(note_id)
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

Note.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  modified: PropTypes.string
}

export default Note;