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
  }else{
    UI.ArrowBtn.style.transform = "rotate(180deg)";
  }
  UI.openChat = !UI.openChat;
}
if(getURLParam('color')){
  document.querySelector('main').style.backgroundColor = '#' + getURLParam('color');
}

const MyInfo = {
  id: Socket.id,
  Name: '_Blank',
  Username: 'Guest',
  pass: '0000'
};


UserInput.onchange = e => {
  Emit('console', UserInput.value);
}

function sendMsg(Msg, private, To){
  Emit('msg', Msg, {
    type: private ? 'private' : 'public',
    sendTo: To || null,
    sendFrom: MyInfo
  });
}

Socket.on('evt', Data => {
  if(Data.type === 'console'){
    console.log(Data.id + '>>' + Data.msg);
  }else
  if(Data.type === 'msg'){
    if(Data.extraData.type === 'public'){
      console.log(Data.sendFrom.Name + '>>' + Data.msg);
    }else
    if(Data.extraData.type === 'private'){
      if(MyInfo.Name === Data.extraData.sendTo){
        console.log(Data.extraData.sendFrom.Name + '>>' + Data.msg);
      }
    }
  }else{
    throw new Error('unspecified event type');
  }
});

Socket.on('req', Data => {
  console.log(Data);
});

function getURLParam(name){
  return new URL(window.location.href).searchParams.get(name) || null;
}
function Emit(type, msg, extraData, request) {
  Socket.emit('evt', {
    type: type,
    msg: msg,
    extraData: extraData || null,
    id: MyInfo.id
  });
}
function exect(Code, Pass){
  Socket.emit('exect', {Pass,Code});
}
