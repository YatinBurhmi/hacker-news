

function getId(array,id){
for(var i in array){
  if(array[i].id === id){
      return i;
  }
 }
}

export default getId;