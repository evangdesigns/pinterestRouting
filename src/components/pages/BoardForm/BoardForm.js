import React from 'react';
import './BoardForm.scss';
import authData from '../../../helpers/data/authData';
import boardData from '../../../helpers/data/boardData';

class BoardForm extends React.Component {
  state = {
    boardName: '',
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  }

  saveBoardEvent = (e) => {
    e.preventDefault();
    const newBoard = {
      name: this.state.boardName,
      uid: authData.getUid(),
    };
    boardData.saveBoard(newBoard)
      .then(() => this.props.history.push('/'))
      .catch((errFromAddBoard) => console.error(errFromAddBoard));
  }

  render() {
    const { boardName } = this.state;
    return (
      <div className="BoardForm">
      <form className="col-6 offset-3">
        <div className="form-group">
          <label htmlFor="board-name">Board Name</label>
          <input
          type="text"
          className="form-control"
          id="board-name"
          placeholder="Enter board name"
          value={boardName}
          onChange={this.nameChange}
          />
        </div>
        <button className="btn btn-danger" onClick={this.saveBoardEvent}>SAVE BOARD</button>
      </form>
      </div>
    );
  }
}

export default BoardForm;
