Socket.on('evt', Data => {
  if(Data.type === 'console'){
    console.log(Data.id + '>>' + Data.msg);
  }else
  if(Data.type === 'msg'){
    if(Data.extraData.type === 'public'){
      console.log(Data.extraData.sendFrom.Username + ' >> ' + Data.msg);
      createMsg(Data.extraData.sendFrom.Username, Data.msg, true, MyInfo.id === Data.id);
      console.log(MyInfo.id, Data.id);
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
