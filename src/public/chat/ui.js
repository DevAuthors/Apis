const UI = {
  openChat: true
};
const UserInput = document.querySelector('#input');
const Msgs = document.querySelector('.msgs');
UI.ArrowBtn = document.querySelector('.arrow');
UI.Main = document.querySelector('main');

const Alerts = document.querySelector('.alerts');
// const _ = document.querySelector('');

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
  Emit('msgs', "")
  closeAlert();
}
function closeAlert(){
  Alerts.removeChild(document.querySelector('.SeeMsgs'));
}


function isMobile(Details){
  const Devices = [];
  let ended = false;
  let Answer;
  Devices.map((a) => {
    if(ended){return;}else{
      if(navigator.userAgent.match(a)){
        if(Details){
          Answer = {
            is: true,
            Device: (/[a-zA-Z ]+/i).exec(a.toString())
          };
        }else{
          Answer = true;
        }
        ended = true;
      }
    }
  });
  if(!ended){
    if(Details){
      Answer = {
        is: false,
        Device: null
      };
    }else{
      Answer = false;
    }
  };
  return Answer;
}
