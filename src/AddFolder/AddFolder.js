import React from 'react';
import APIconfig from '../APIconfig';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import './AddFolder.css';

class AddFolder extends React.Component {
  //to be transferred to global state in App
  state = {
    name: '',
  };

  static defaultProps = {
    history: {
      goBack: () => {},
    },
  };

  static contextType = NotefulContext;

  //used to update local state as folder name is typed (from onChange in input tag)
  updateState(name) {
    this.setState({
      name,
    });
  }

  //handles submit button click and update of global state with POST
  handleSubmit(e) {
    e.preventDefault();
    const { name } = this.state;
    const url = `${APIconfig.API_ENDPOINT}/api/folders`;
    const options = {
      method: 'POST',
      body: JSON.stringify({ name }),
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
        this.props.history.goBack();
        this.context.fetchData();
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  render() {
    return (
      <div className="addfolder">
        <h1>Add Folder</h1>
          <form
            className="addfolder__form"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={(e) => this.updateState(e.target.value)}
              required
            />
            <div className="addbookmark__buttons">
              <button type="submit">Save</button>
            </div>
          </form>
      </div>
    );
  }
}

AddFolder.propTypes = {
  history: PropTypes.object,
};

export default AddFolder;
