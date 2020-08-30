const Socket = io();

const UI = {
  openChat: true
};
const UserInput = document.querySelector('#input');
const Msgs = document.querySelector('.msgs');
UI.ArrowBtn = document.querySelector('.arrow');
UI.Main = document.querySelector('main');
// const _ = document.querySelector('');

// UI
UI.ArrowBtn.onclick = () => {
  if(UI.openChat){
    UI.ArrowBtn.style.transform = "rotate(0deg)";
    UI.Main.style.height = "5em";
  }else{
    UI.ArrowBtn.style.transform = "rotate(180deg)";
    UI.Main.style.height = "30em";
  }
  UI.openChat = !UI.openChat;
}

UserInput.onchange = e => {
  Emit('console', UserInput.value);
}

Socket.on('evt', Data => {
  if(Data.type === 'console'){
    console.log(Data.id + '>>' +Data.msg);
  }
});

function Emit(type, msg, extraData) {
  Socket.emit('evt', {
    type: type,
    msg: msg,
    extraData: extraData || null,
    id: Socket.id
  });
}
