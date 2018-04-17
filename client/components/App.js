import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import '../css/App.css';
var querystring = require('querystring');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        count: 0,
        cards: [],
        shuffled: [],
        messageFromServer: '',
        score: 0,
        data: [],
        percentage: 0
    }
  }


  shuffleCards(array) {
    var i = array.length,
      j = 0,
      temp;

    while (i--) {
      j = Math.floor(Math.random() * (i + 1));

      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  generate_deck(){
    let card = (suit, value, img) => {
         this.name = value + ' of ' + suit;
         this.suit = suit;
         this.value = value;
         this.img = img;

         return {name:this.name, suit:this.suit, value:this.value, img:this.img}
       }


       let values = ['A','2', '3','4','5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
          let suits = ['Spades', 'Diamonds', 'Hearts', 'Clubs'];
let img = ['sA', 's2','s3','s4', 's5', 's6', 's7', 's8', 's9', 's10', 'sJ', 'sQ', 'sK','cA','c2','c3','c4','c5','c6','c7','c8','c9','c10','cJ','cQ','cK','hA','h2','h3','h4','h5','h6','h7','h8','h9','h10','hJ','hQ','hK','dA','d2','d3','d4','d5','d6','d7','d8','d9','d10','dJ','dQ','dK'];

          for ( let s = 0; s < suits.length; s++ ) {
                  for ( let v = 0; v < values.length; v++ ) {
                          this.state.cards.push(card(suits[s], values[v]));
                  }
          }
          for ( let i = 0; i < this.state.cards.length; i++ ) {
            this.state.cards[i].img = img[i];
}


          this.setState({
           cards: this.state.cards
          })

          const renObjData = this.state.cards.map(function(data, idx) {
              console.log(data.img);
          });
  }

  handleClickEvent(event) {
    this.generate_deck();
  this.state.shuffled =  JSON.parse(JSON.stringify(this.state.cards));

    if (this.state.count === 0) {
      this.state.shuffled = this.shuffleCards(this.state.shuffled);
    }
    this.setState({
     shuffled: this.state.shuffled
    })
  //console.log(this.state.shuffled.length);
    for(var i = 0; i < this.state.cards.length; i++){
      if(this.state.cards[i].suit === this.state.shuffled[i].suit && this.state.cards[i].value === this.state.shuffled[i].value){
        this.state.score = this.state.score + 1;
      }
      if(this.state.cards[i].suit === this.state.shuffled[i].suit){
        this.state.score = this.state.score + 1;
      }
    }

  const renObjData = this.state.shuffled.map(function(data, idx) {
    console.log(data.img);
  });
  this.setState({
   score: this.state.score
  })
  console.log(this.state.score);
  //console.log(this.state.shuffled[0].suit);
  this.insertNewExpense(this);
  this.getData(this);
  }

  insertNewExpense(e) {
    //const cardconfig = JSON.stringify(e.state.shuffled);
        axios.post('/insert',
          querystring.stringify({
            cards: e.state.shuffled,
            score: e.state.score
          }), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(function(response) {
            //console.log(e);
          e.setState({
            messageFromServer: response.data
          });
        });
      }

    getData(ev){
      var len = 0;
      var sum = 0;
    axios.get('/getAll')
      .then(function(response) {
        ev.setState({data: response.data}, function (){
          const renObjData = this.state.data.map(function(exp, idx) {
            //console.log(exp.score);
          });
        });
        });
        ev.state.percentage = (ev.state.score * 100)/104;
        ev.state.percentage = ev.roundUp(ev.state.percentage, 1);
        ev.setState({percentage:ev.state.percentage}, function(){
          console.log(ev.state.percentage);
        })
      }


  roundUp(num, precision) {
  precision = Math.pow(10, precision)
  return Math.ceil(num * precision) / precision
}


  render() {
    var divStyle = {
width:'320px',
padding: '10px',
border: '5px solid gray',
margin: '0'
};
    return (
      <div>
      <button onClick={this.handleClickEvent.bind(this)}>Shuffle cards</button>
    
        {this.state.shuffled.map(function(data, index){
     return <img src='/components/images/'+ data.img +'.png' />
})}
      <p style={divStyle}>Your Score = {this.state.score}</p>
        {"\n"}
        <p style={divStyle}>configuration’s score = {this.state.percentage}%</p>
      </div>

    );
  }
}

function getSum(total, num) {
   return total + num;
}


export default App;
