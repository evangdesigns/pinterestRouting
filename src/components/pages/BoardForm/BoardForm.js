import React from 'react';
import './BoardForm.scss';
import authData from '../../../helpers/data/authData';
import boardData from '../../../helpers/data/boardData';

class BoardForm extends React.Component {
  state = {
    boardName: '',
  }

  componentDidMount() {
    const { boardId } = this.props.match.params;
    if (boardId) {
      boardData.getSingleBoard(boardId)
        .then((response) => {
          this.setState({ boardName: response.data.name });
        })
        .catch((err) => console.error('this shit aint workin', err));
    }
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  }

  editBoardEvent = (e) => {
    e.preventDefault();
    const { boardId } = this.props.match.params;
    const updatedBoard = {
      name: this.state.boardName,
      uid: authData.getUid(),
    };
    boardData.updateBoard(boardId, updatedBoard)
      .then(() => this.props.history.push('/'))
      .catch((errFromEditBoard) => console.error(errFromEditBoard));
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
    const { boardId } = this.props.match.params;
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
        { boardId
          ? <button className="btn btn-danger" onClick={this.editBoardEvent}>UPDATE BOARD</button>
          : <button className="btn btn-danger" onClick={this.saveBoardEvent}>SAVE BOARD</button>
        }
      </form>
      </div>
    );
  }
}

export default BoardForm;
