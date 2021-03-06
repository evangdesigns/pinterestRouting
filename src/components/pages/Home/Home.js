import React from 'react';
import Board from '../../shared/Board/Board';

import boardData from '../../../helpers/data/boardData';
import authData from '../../../helpers/data/authData';

import './Home.scss';

class Home extends React.Component {
  state = {
    boards: [],
  }

  getBoards = () => {
    boardData.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error('errorfrom get boards', err));
  }

  componentDidMount() {
    this.getBoards();
  }

  deleteBoard = (boardId) => {
    boardData.deleteBoard(boardId)
      .then(() => this.getBoards())
      .catch((err) => console.error('error feleting board', err));
  }

  render() {
    return (
      <div className="Home">
        <h1>Home Page</h1>
        <div className="boards d-flex flex-wrap justify-content-center">
          {this.state.boards.map((board) => <Board key={board.id} board={board} deleteBoard={this.deleteBoard} />)}
        </div>
      </div>
    );
  }
}

export default Home;
