const Socket = io();

if(getURLParam('color')){
  document.querySelector('main').style.backgroundColor = '#' + getURLParam('color');
}

const MyInfo = {
  id: Socket.id,
  Name: '_Blank',
  Username: 'Guest',
  pass: '0000'
};

let TotalMsg = 0;
let AllMsg = new Array();

setTimeout(() => {
  MyInfo.id = window.localStorage.getItem('id') || Socket.id;
  window.localStorage.setItem('id', MyInfo.id);
  console.clear();
}, 500);

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

function createMsg(User, Msg, public, me){
  TotalMsg++;
  const Name = `<user>${User}</user>`;
  const Txt = `<txt>${Msg}</txt>`;
  AllMsg[TotalMsg - 1] = [`<div style="bottom: `,`px;" class="msg ${public? "public" : "private"} ${me? "me" : "other"} id="${MyInfo.id}">
  ${me? Txt : Name} <span> ${me?"<<":'>>'} </span> ${me? Name : Txt} </div>`];

  Msgs.innerHTML = "";

  AllMsg.map((i, a) => {
    const b = AllMsg.length - a;
    const mm = document.createElement('msg');
    mm.appendChild(document.createTextNode(''));
    Msgs.appendChild(mm);
    mm.outerHTML = i[0] + b * 20 + i[1];
  });
}

function getURLParam(name){
  return new URL(window.location.href).searchParams.get(name) || null;
}
function Emit(type, msg, extraData) {
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
