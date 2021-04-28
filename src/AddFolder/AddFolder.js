import React from 'react';
import APIconfig from '../APIconfig';
import NotefulContext from '../NotefulContext';
import './AddFolder.css';

class AddFolder extends React.Component {
  //to be transferred to global state in App
  state = {
    folders: [
      {
        id: '',
        name: '',
      },
    ],
  };

  static contextType = NotefulContext;

  //creat random Id number for folder
  generateId(max) {
    return Math.floor(Math.random() * max);
  }

  //used to update local state as folder name is typed (from onChange in input tag)
  updateState(name) {
    this.setState({
      id: this.generateId(1000),
      name,
    });
  }

  //handles submit button click and update of global state with POST
  handleSubmit(e) {
    e.preventDefault();
    const {id, name } = this.state;
    const newFolder = {id, name};
    const url = `${APIconfig.API_ENDPOINT}/folders`;
    const options = {
        method: 'POST',
        body: JSON.stringify(newFolder),
        headers: { 'Content-Type': 'application/json' }
    }

    fetch(url, options)
        .then(res => {
            if(!res.ok) {
                throw new Error('Something went wrong, please try again later.')
            }
            return res.json();
        })
        .then(resJson => {
            this.AddFolder(resJson)
        })
        .catch(error => {
            this.setState({
                error: error.message
            });
        })
  };

  render() {
    return (
      <div className="addfolder">
        <h1>Add Folder</h1>
        <form className="addfolder__form" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={this.state.folders.name}
            onChange={(e) => this.updateState(e.target.value)}
          />
          <div className="addbookmark__buttons">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddFolder;
