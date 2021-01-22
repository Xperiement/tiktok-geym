import './App.css';
import Block from './components/Block'
import {useState, useEffect} from 'react'
import {uuid} from 'uuidv4'

let mode = true


function App() {
  const winPattern = [
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],

    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],

    [[0,0], [1,1], [2,2]],
    [[2,0], [1,1], [0,2]],
  ]


  const [state, setState] = useState(()=>{return {
    blocks: [
      {id: uuid(), typeA : null, clickable : true, x: 0, y:0},
      {id: uuid(), typeA : null, clickable : true, x: 0, y:1},
      {id: uuid(), typeA : null, clickable : true, x: 0, y:2},
      {id: uuid(), typeA : null, clickable : true, x: 1, y:0},
      {id: uuid(), typeA : null, clickable : true, x: 1, y:1},
      {id: uuid(), typeA : null, clickable : true, x: 1, y:2},
      {id: uuid(), typeA : null, clickable : true, x: 2, y:0},
      {id: uuid(), typeA : null, clickable : true, x: 2, y:1},
      {id: uuid(), typeA : null, clickable : true, x: 2, y:2}
    ],
    gg: {
      showMainWindow: true,
      showScoreWindow: false,
      teamRed: false,
      useBot: false,
      mode: null
    }
  }})

  useEffect(() => {
    let obj = isGameFinished()
    if(obj.win === true || obj.teamRed == null){
      setState(prevState => ({
        ...prevState,
        gg: {
          ...prevState.gg,
          showScoreWindow: true,
          teamRed: obj.teamRed
        }
      }))
    }
  }, [state.blocks])

  function mapIndex(x, y){
    if(x === 0 && y === 0) return 0
    if(x === 0 && y === 1) return 1
    if(x === 0 && y === 2) return 2
    if(x === 1 && y === 0) return 3
    if(x === 1 && y === 1) return 4
    if(x === 1 && y === 2) return 5
    if(x === 2 && y === 0) return 6
    if(x === 2 && y === 1) return 7
    if(x === 2 && y === 2) return 8
  }

  function getItem(is, x, y){
    let f = is.blocks.filter(item=>{
      return x === item.x && y === item.y
    })

    //console.log(f[0])

    if(f[0].typeA === true){
      return 1
    }else if(f[0].typeA === false){
      return 0
    }else{
      return null
    }
  }

  function isGameFinished(){
    let winObj = {
      win: false,
      teamRed: false
    }

    if (state.blocks.filter(item=>{
      return item.clickable === true
    }).length === 0){
      winObj.teamRed = null
      return winObj
    }

    

    // eslint-disable-next-line
    winPattern.map(eachPattern => {
      let addidas = []
      // eslint-disable-next-line
      eachPattern.map(eachCords => {
        addidas.push(getItem(state, eachCords[0], eachCords[1]))
      })

      
      if(addidas[0] === 1 && addidas[1] === 1 && addidas[2] === 1){
        winObj.win = true
        winObj.teamRed = true
      }else if(addidas[0] === 0 && addidas[1] === 0 && addidas[2] === 0){
        winObj.win = true
      }
      
    })

    return winObj
  }



  let onceClicked = (item) => {

    let updatedItems = state.blocks.map(eachItem=>{
      return eachItem.id === item.id ? {...eachItem, typeA: mode, clickable: false} : eachItem
    })

    if(item.clickable){
      if(state.gg.useBot === true){
        console.log('Entering')
        //console.log(updatedItems)
        let emptyBlock = updatedItems.filter(item=>{
          return item.clickable === true
        })

        let chBlock = emptyBlock[Math.floor(Math.random() * emptyBlock.length)]

        console.log(emptyBlock)
        updatedItems = updatedItems.map(eachItem=>{
          return eachItem.id === chBlock.id ? {...eachItem, typeA: false, clickable: false} : eachItem
        })

      }else{
        mode = !mode
      }

      setState(prevState => ({
        ...prevState,
        blocks: updatedItems,
        gg:{
          ...prevState.gg,
          mode: mode
        }
      }))
    }
  }


  return (
    <div className={state.gg.mode === true ? "App teamAmode" : state.gg.mode === false ? "App teamBmode" : "App"}>
      <div className={state.gg.showMainWindow ? "mainWindow" : "mainWindow hideWindow"}>
        <h1 className="gameHeading">TIK TOK</h1>
        <button className="playButton" onClick={()=>{
          setState(prevState => ({
            ...prevState,
            gg : {
              ...prevState.gg,
              showMainWindow: false,
              mode: true
            }
          }))

        }}>Multiplayer</button>

        <button className="playButton" onClick={()=>{
          setState(prevState => ({
            ...prevState,
            gg : {
              ...prevState.gg,
              showMainWindow: false,
              mode: true,
              useBot: true
            }
          }))

        }}>Playing with bot</button>
      </div>



      <div className={state.gg.showScoreWindow ? "mainWindow" : "mainWindow hideWindow"}>
        <h1>{state.gg.teamRed === true ? 'Player A' : state.gg.teamRed === false ? 'Player B' : "No one"} wins</h1>
        <button className="playButton" onClick={()=>{
          setState(prevState => ({
            blocks: [
              {id: prevState.blocks[0].id, typeA : null, clickable : true, x: 0, y:0},
              {id: prevState.blocks[1].id, typeA : null, clickable : true, x: 0, y:1},
              {id: prevState.blocks[2].id, typeA : null, clickable : true, x: 0, y:2},
              {id: prevState.blocks[3].id, typeA : null, clickable : true, x: 1, y:0},
              {id: prevState.blocks[4].id, typeA : null, clickable : true, x: 1, y:1},
              {id: prevState.blocks[5].id, typeA : null, clickable : true, x: 1, y:2},
              {id: prevState.blocks[6].id, typeA : null, clickable : true, x: 2, y:0},
              {id: prevState.blocks[7].id, typeA : null, clickable : true, x: 2, y:1},
              {id: prevState.blocks[8].id, typeA : null, clickable : true, x: 2, y:2}
            ],
            gg: {
              showMainWindow: true,
              showScoreWindow: false,
              teamRed: false,
              useBot: false,
              mode: null
            }
          }))
          mode = true


        }}>Play again</button>
      </div>



      {state.blocks.map((item) =>{
        return(
          <Block key={item.id} typeA={item.typeA} onc={()=> {onceClicked(item);}}/>
        )
      })}
    </div>
  );
}

App.defaultProps = {

}

export default App;
