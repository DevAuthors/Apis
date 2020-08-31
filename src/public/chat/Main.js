const Socket = io();

const UI = {
  openChat: true
};
const UserInput = document.querySelector('#input');
const Msgs = document.querySelector('.msgs');
UI.ArrowBtn = document.querySelector('.arrow');
UI.Main = document.querySelector('main');
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
  sendMsg(UserInput.value, false);
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
      console.log(Data.extraData.sendFrom.Username + ' >> ' + Data.msg);
      createMsg(Data.extraData.sendFrom.Username, Data.msg, true, false);
    }else
    if(Data.extraData.type === 'private'){
      if(MyInfo.Name === Data.extraData.sendTo){
        console.log(Data.extraData.sendFrom.Username + ' >> ' + Data.msg);
      }
    }
  }else{
    throw new Error('unspecified event type');
  }
});
function createMsg(User, Msg, public, me){
  const mm = document.createElement('msg');
  mm.appendChild(document.createTextNode(''));
  Msgs.appendChild(mm);
  mm.outerHTML = `
<div
  style="bottom: 16px;"
  class="msg ${public? "public" : "private"} ${me? "me" : "other"}"
  id="${MyInfo.id}">
  <user>${User}</user>
	<span> ${me?"<<":'>>'} </span>
  <txt>${Msg}</txt>
</div>`;
  AllMsg.unshift(mm);
  TotalMsg++;
  const AllMsgs = document.querySelectorAll('.msg');
  for(i = AllMsgs - 1; i >= 0; i--){
    AllMsgs[i].style = "bottom: " + (20 * (i) + 16) +"px;";
  }
}
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
