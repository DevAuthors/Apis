Socket.on('evt', Data => {
  if(Data.type === 'console'){
    console.log(Data.id + '>>' + Data.msg);
  }else
  if(Data.type === 'msg'){
    if(Data.extraData.type === 'public'){
      console.log(Data.extraData.sendFrom.Username + ' >> ' + Data.msg);
      createMsg(Data.extraData.sendFrom.Username, Data.msg, true, MyInfo.id === Data.id);
      //console.log(MyInfo.id, Data.id);
    }else
    if(Data.extraData.type === 'private'){
      if(MyInfo.Name === Data.extraData.sendTo){
        console.log(Data.extraData.sendFrom.Username + ' >> ' + Data.msg);
      }
    }
  }else
  if(Data.type === 'msgs'){
    AllMsg = new Array();
    for(let t of Data.p){
      if(t.type === 'msg'){
        if(t.extraData.type === 'public'){
          console.log(t.extraData.sendFrom.Username + ' >> ' + t.msg);
          createMsg(t.extraData.sendFrom.Username, t.msg, true, MyInfo.id === t.id);
        }else
        if(t.extraData.type === 'private'){
          if(MyInfo.Name === t.extraData.sendTo){
            console.log(t.extraData.sendFrom.Username + ' >> ' + t.msg);
          }
        }
      }else{
        throw new Error('--------infiltrado--------');
      }
    }
  }else{
    throw new Error('unspecified event type');
  }
});

Socket.on('req', Data => {

});
