let Str=[];
function e(Codes){
  let Code=Codes.split("\n");
  for(let i=0;i<Code.length;i++){
    Code[i]=newCode(Code[i]);
    console.log(Code[i])
  }
  console.log(Code)
}
function newCode(Code){
  let returnCode="";
  for(let i=0;i<Code.length;i++){
    if(Code.charAt(i)==`"`){
      let j;
      for(j=i+1;Code.charAt(j)!=`"`;j++){}
      Str.push(Estrcut(Code,i+1,j-1));
      returnCode=returnCode+"<-str->";
      i=j+1;
    }
    else if(Code.charAt(i)==`'`){

    }
    else{
      returnCode=returnCode+Code.charAt(i);
    }
  }
  return returnCode;
}
function Estrcut(index,a,b){
    var returnn="";
    for(var i=a;i<=b;i++){
        returnn=returnn+index.charAt(i);
    }
    return returnn;
}
