const axios = require('axios');

axios.post('http://tictactoe.inseng.net/games')
 .then(function (response) {
   axios.post(`http://tictactoe.inseng.net/games/${response.data.id}/players`, {
     name: "rachel",
     pair: 1,
   })
     .then(function (game) {
        axios({
          method:'post',
          url:`http://tictactoe.inseng.net/games/${response.data.id}/moves`,
          headers: {'X-Token': game.data.currentPlayer.secret },
          data: {
            board: 0,
            cell: 4,
          }
        })
         .then(function (turn) {
           console.log(turn.data)
         })
     })
 })
 .catch(function (error) {
   console.log(error.message);
 });
