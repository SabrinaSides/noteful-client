import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import NotefulContext from '../NotefulContext';
import { findNote, findFolder } from '../notes-helpers';
import PropTypes from 'prop-types';
import './NotePageNav.css'

//changed function to class component 
class NotePageNav extends React.Component {
  static defaultProps = {
      history: { //allows us to call history and goBack method to return to previous page
        goBack: () => {}
      },
    match: {
      params: {} //param holds unique folderId
    }
  }
  static contextType = NotefulContext; //allows this.context

  render(){
    const { notes, folders } = this.context //define what is used from context
    const { noteId } = this.props.match.params //
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
  return (
    <div className='NotePageNav'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => this.props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {folder && (
        <h3 className='NotePageNav__folder-name'>
          {folder.name}
        </h3>
      )}
    </div>
  )
}
}

NotePageNav.propTypes = {
  match: PropTypes.string
}

export default NotePageNav;
