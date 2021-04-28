import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from '../CircleButton/CircleButton';
import { countNotesForFolder } from '../notes-helpers';
import NotefulContext from '../NotefulContext';
import './NoteListNav.css';

//changed from function to class component-- so we can use context without Context.Consumer(?)
export default class NoteListNav extends React.Component {
  static contextType = NotefulContext; //creates this.context

  render() {
    const { notes=[], folders=[] } = this.context //declaring part of context we will use
    return (
        <div className="NoteListNav">
          <ul className="NoteListNav__list">
            {folders.map((folder) => (
              <li key={folder.id}>
                <NavLink
                  className="NoteListNav__folder-link"
                  to={`/folder/${folder.id}`}
                >
                  <span className="NoteListNav__num-notes">
                    {countNotesForFolder(notes, folder.id)}
                  </span>
                  {folder.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="NoteListNav__button-wrapper">
            <CircleButton
              tag={Link}
              to="/add-folder"
              type="button"
              className="NoteListNav__add-folder-button"
            >
              <FontAwesomeIcon icon="plus" />
              <br />
              Folder
            </CircleButton>
          </div>
        </div>
    );
  }
}
