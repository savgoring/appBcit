import React, { Component } from 'react';
import './App.css';
import mySocket from "socket.io-client";

class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            
            mode:0,
            username:"",
            users:[],
            allChats: [],
            myMsg:""
        }
        
        this.joinChat = this.joinChat.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleMyMsg = this.handleMyMsg.bind(this);
        this.sendChat = this.sendChat.bind(this);
        
    }
    componentDidMount(){
       // this.socket = mySocket("http://localhost:10001");
        
    }
    
    joinChat(){
        this.setState({
            mode:1
            
        })
        this.socket = mySocket("http://localhost:10001")
        this.socket.emit("username", this.state.username);
        
        this.socket.on("usersjoined", (data)=>{
            console.log(data);
            this.setState({
                users:data
                
            })
        
            
        });
        
        this.socket.on("msgsent", (data)=>{
            this.setState({
                allChats:data
                
            })
            
            
        })
        
    }
    
    handleUsername(evt){
        this.setState({
            username:evt.target.value
            
        })
        
        
    }
    
    handleMyMsg(evt){
        this.setState({
            myMsg:evt.target.value
            
        })  
    }
    
    sendChat(){
        
        var msg = this.state.username+": "+this.state.myMsg;
        this.socket.emit("sendChat", msg);
    }
    
  render() {
      
      var config = null;
      
      if(this.state.mode === 0){
              
          config = (
              

              
    <div class="wrapper"> 
        <h1 class="glitch"> HELLO </h1> 
 
     
      <div id="enterChat">
        <p margin="15px"> WELCOME TO OUR CHAT ROOM! </p>
          <input type="text" placeholder="Type your username" onChange={this.handleUsername} className="enter-item" id="username"/>
          <button onClick={this.joinChat} className="enter-item" id="joinChat"> Join Chat </button>
          </div>
              
      </div>
      )
      }
      
      else if(this.state.mode === 1){
          var allChats = this.state.allChats.map((obj, i)=>{
              return (
              <div key={i} className="Bubbles">
                  {obj}
              </div>
              )
              
              
          })
          
          
          config = (  
              
              
              //* 
               
 
        
          <div class="chat">
  <section class="sidebar">
    <div class="user-info">USERS ONLINE</div>
    <div class="userBox"> 
        <div id="userList"> 
              {this.state.users.join(" ")} 
        </div> 
              
    </div>
  </section>

  <section class="main">
   <div class="chatHeader"> CHAT WITH US </div>
    <div class="message-list"> {allChats} </div>
    <div class="typing-indicator">typing-indicator</div>
    <div class="message-form"> 
        <input type="text" placeholder="Enter Message" onChange={this.handleMyMsg} id="messageBox"/>
              <button id="send" onClick ={this.sendChat}> SEND </button> </div>
  </section>
</div>
          )
          
      }
      
      
      

      var allUsers = this.state.users.map((obj,i)=> {
       return(
       <div key={i}>
           {obj}
           </div>
       )  
         
     })
     

     
    return (
      <div className="App">
        {config}
      </div>
    );
  }
}

export default App;
