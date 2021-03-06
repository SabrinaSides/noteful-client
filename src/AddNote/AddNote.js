import React from 'react';
import APIconfig from '../APIconfig';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError/ValidationError';
import './AddNote.css';

class AddNote extends React.Component {
  //to be used to POST to server
  state = {
    name: '',
    folder_id: '',
    content: '',
    modified: ''
  };

  static defaultProps = {
    history: {
      goBack: () => {}
    }
}

  //allows this.context
  static contextType = NotefulContext;

  //used to update local state (from onChange in input tag)
  updateName(name) {
    this.setState({ name, modified: new Date(Date.now()).toISOString()});
  }

  updatefolderId(id) {
    this.setState({ folder_id: id });
  }

  updateContent(content) {
    this.setState({ content });
  }

  //handles submit button click and update of global state with POST
  handleSubmit(e) {
    e.preventDefault();
    const { name, folder_id, content, modified } = this.state;
    const newNote = { name, folder_id, content, modified };
    const url = `${APIconfig.API_ENDPOINT}/api/notes`;
    const options = {
      method: 'POST',
      body: JSON.stringify(newNote),
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
        this.props.history.goBack()
        this.context.fetchData()
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  //validate that text is entered in name field
  validateName() {
    const name = this.state.name.trim();
    if (name.length === 0) {
      return 'Name is required';
    }
  }

  render() {
    const { folders } = this.context;
    const folderList = folders.map((folder, i) => {
      return <option value={folder.id} key={i}>{folder.name}</option>;
    });

    return (
      <div className="addnote">
        <h1>Add Note</h1>
          <form
            className="addnote__form"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={(e) => this.updateName(e.target.value)}
              required
            />
            <ValidationError message={this.validateName()} />
            <br />
            <label htmlFor="folder">Assign to Folder:</label>
            <select name="folder" id="folder" onChange={(e) => this.updatefolderId(e.target.value)} required>
              <option value='' default hidden>Choose a folder</option>
              {folderList}
            </select>
            <br />
            <label htmlFor="content">Content of Note:</label>
            <br />
            <textarea
              name="content"
              id="content"
              cols="50"
              rows="10"
              value={this.state.content}
              onChange={(e) => this.updateContent(e.target.value)}
            />
            <div className="addbookmark__buttons">
              <button type="submit">Save</button>
            </div>
          </form>
      </div>
    );
  }
}


export default AddNote;
