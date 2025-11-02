const Game = JSON.parse(localStorage.getItem('score')) || { win : 0 , loss : 0 , tie : 0};
const lastMessage = localStorage.getItem('flashMessage');


const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissor = document.querySelector('.scissor');
const reset = document.querySelector('.reset');
const testResult = document.querySelector('.text-result');
const autoPlay = document.querySelector('.autoPlay');

testResult.innerHTML = lastMessage;

let myMove = ' ';
let computerMove = ' ';
let autoPlayId = null;

     rock.addEventListener('click',()=>{
          computerMove = selectComputerMove();
          checkBoth(computerMove,'Rock');
     });

     paper.addEventListener('click',()=>{
          computerMove = selectComputerMove();
          checkBoth(computerMove,'Paper');
     });
     scissor.addEventListener('click',()=>{
          computerMove = selectComputerMove();
          checkBoth(computerMove,'Scissor');
     });
     reset.addEventListener('click' , ()=>{
          Game.tie = 0;
          Game.loss = 0;
          Game.win = 0;
          localStorage.setItem('score' , JSON.stringify(Game));
          display();
     });
     autoPlay.addEventListener('click',() =>{
          if (autoPlayId) {
     clearInterval(autoPlayId);
     autoPlayId = null;
     autoPlay.textContent = 'Auto Play';  
     } else {
     autoPlayId = setInterval(autoPlayFunction, 1000); 
     autoPlay.textContent = 'Stop';
     }
     });


     function selectComputerMove(){
          const randomMove = Math.random();
          let returnComputerMove = ' ';
          
                    if( 0 < randomMove && randomMove <= 1/3 ){
                         returnComputerMove = 'Rock';
                    } else if (1/3 < randomMove && randomMove <= 2/3) {
                         returnComputerMove = 'Paper'; 
                    }else if (2/3 < randomMove && randomMove <= 1){
                         returnComputerMove = 'Scissor';
                    }
          return returnComputerMove;
     }

     function checkBoth(computerMove,myMove){
          if(computerMove === myMove){
               Game.tie+=1;
               display(true , myMove , computerMove);      
          }else if((computerMove === 'Rock' && myMove === 'Scissor') ||
               (computerMove === 'Paper' && myMove === 'Rock') ||
               (computerMove === 'Scissor' && myMove ==='Paper')){
                    Game.loss+=1;
               display(false , myMove , computerMove); 
          }else{
               Game.win+=1;
               display( "abc" , myMove , computerMove); 
          } 

          localStorage.setItem('score', JSON.stringify(Game)); 
     }

     const display = (isWin , myMove , computerMove) => {
          if (isWin === undefined && myMove === undefined && computerMove === undefined) {
               testResult.innerHTML = `Game reset!`;
               return;
          }

          if(isWin === true){
               testResult.innerHTML = `TIE`;
               displayMoves(myMove , computerMove);
          }else if(isWin === false){
               testResult.innerHTML = `LOSS`;
               displayMoves(myMove , computerMove);
          }else if(isWin === "abc"){
               testResult.innerHTML = `WON`;
               displayMoves(myMove , computerMove);
          }

     }

     const displayMoves = (myMove , computerMove) => {
          let myEmoji = '';
          let compEmoji = '';

          if (myMove === 'Rock'){
               myEmoji = '👊';
          }
          else if (myMove === 'Paper'){
               myEmoji = '🖐️';
          }
          else if (myMove === 'Scissor'){
               myEmoji = '✌️';
          } 

          if (computerMove === 'Rock'){
               compEmoji = '👊';
          } 
          else if (computerMove === 'Paper'){
               compEmoji = '🖐️';
          } 
          else if (computerMove === 'Scissor'){
               compEmoji = '✌️';
          } 
          
          testResult.innerHTML += ` <br><br> Your Move:${myEmoji} | Computer Move:${compEmoji} <br> <br> Wins: ${Game.win} Loss: ${Game.loss} Tie: ${Game.tie}`;
     }

     const autoPlayFunction = () =>{
          const myMove = selectComputerMove();
          const computerMove = selectComputerMove();
          checkBoth(computerMove , myMove);
     }

     localStorage.setItem("flashMessage", "Page Refreshed .... But not your Score!");