const Socket = io();

const UserInput = document.querySelector('#input');
const Msgs = document.querySelector('.msgs');
// const _ = document.querySelector('');

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
