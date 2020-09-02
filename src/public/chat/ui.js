const UI = {
  openChat: true
};
const UserInput = document.querySelector('#input');
const Msgs = document.querySelector('.msgs');
UI.ArrowBtn = document.querySelector('.arrow');
UI.Main = document.querySelector('main');

const Alerts = document.querySelector('.alerts');
// const _ = document.querySelector('');
let TotalMsg = 0;
const AllMsg = [];
// UI
UI.ArrowBtn.onclick = () => {
  if(UI.openChat){
    UI.ArrowBtn.style.transform = "rotate(0deg)";
  }else{
    UI.ArrowBtn.style.transform = "rotate(180deg)";
  }
  UI.openChat = !UI.openChat;
}

// ALERTS

function see(){
  console.log('see');
  closeAlert();
}
function closeAlert(){
  Alerts.removeChild(document.querySelector('.SeeMsgs'));
}
