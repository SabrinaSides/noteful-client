import React from 'react';
import APIconfig from '../APIconfig';
import NotefulContext from '../NotefulContext';
import './AddNote.css';

class AddNote extends React.Component {
  //to be transferred to global state in App
  state = {
    notes: [
      {
        name: '',
        folderId: '',
        content: ''
      },
    ],
  };

  static contextType = NotefulContext;

  //used to update local state (from onChange in input tag)
  updateName(name) {
    this.setState({
      name
    });
  }

  updatefolderId(id) {

  }

  updateContent(content) {
    this.setState({
        content
      });
  }

  //handles submit button click and update of global state with POST
  handleSubmit(e) {
    e.preventDefault();
    const { id, name } = this.state;
    const newFolder = { id, name };
    const url = `${APIconfig.API_ENDPOINT}/folders`;
    const options = {
      method: 'POST',
      body: JSON.stringify(newFolder),
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res.json();
      })
      .then((resJson) => {
        this.AddFolder(resJson);
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  render() {
      const { folders } = this.context;

    return (
      <div className="addnote">
        <h1>Add Note</h1>
        <form className="addnote__form" onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={this.state.notes.name}
            onChange={(e) => this.updateName(e.target.value)}
          />
          <br />
          <label htmlFor="folder">Assign to Folder:</label>
          <select name="folder" id="folder">
            {folders.map( folder => {
                return `<option value=${folders.id}>${folders.name}</options>`
            })}
            <option>Folder1</option>
            <option>Folder2</option>
            </select><br />
          <label htmlFor="content">Content of Note:</label><br/>
          <textarea 
            name="content" 
            id="content" 
            cols="50" 
            rows="10"
            value={this.state.notes.content}
            onChange={(e) => this.updateContent(e.target.value)}/>
          <div className="addbookmark__buttons">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNote;
