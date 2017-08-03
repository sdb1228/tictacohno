const axios = require('axios');

var boardId = 0;

axios.post('http://tictactoe.inseng.net/games')
 .then(function (response) {
   axios.post(`http://tictactoe.inseng.net/games/${response.data.id}/players`, {
     name: "sburnett",
     pair: 1,
   })
     .then(function (game) {
        recursiveLoop(response.data.id, game.data.currentPlayer.secret, game)
     })
 })
 .catch(function (error) {
   console.log(error.message);
 });


function recursiveLoop (id, secret, game) {
  var moveVar = move(game)
  console.log(game.data)
  axios({
    method:'post',
    url:`http://tictactoe.inseng.net/games/${id}/moves`,
    headers: {'X-Token': secret },
    data: {
      board: moveVar.board,
      cell: moveVar.cell,
    }
  })
   .then(function (turn) {
     if(turn.data.state === "inProgress") {
       recursiveLoop(id, secret, turn)
     }
   })
  .catch(function (error) {
    console.log("HMMMMMMMMMMMMMMM")
  })
}

function move (game) {
  if (!game.data.nextBoard){
    return {board: 0, cell: 0}
  }
  return {board: game.data.nextBoard, cell: cell(game, board)}
}

function cell (game) {
  return 2
}

function board (game) {
  //TODO board logic
}
