let Str=[];
function e(Codes){
  let Code=Codes.split("\n");
  //문자열 인식
  for(let i=0;i<Code.length;i++){
    Code[i]=newCode(Code[i]);
  }
  //문자열 인식 end
  //괄호 인식
  Code=newCode2(Code);
  //괄호 인식end
  console.log(Code)
}
function newCode2(Code){
  let returnCode="";
  for(let i=1;i<Code.length;i++){
    if(SpaceVal(Code[i-1])>SpaceVal(Code[i])){
      let str="";
      for(let j=0;j<Math.floor(SpaceVal(Code[i-1])-SpaceVal(Code[i]))/2;j++){
        str=str+"}";
      }
      returnCode=returnCode+str+"\n"+notSpace(Code[i]);
    }
    else{
      returnCode=returnCode+"\n"+notSpace(Code[i]);
    }
  }
  return returnCode;
}
function SpaceVal(str){
  let i;
  for(i=0;str.charAt(i)==" ";i++){}
  return i;
}
function notSpace(str){
  let i;
  for(i=0;str.charAt(i)==" ";i++){}
  return Estrcut(str,i,str.length);
}
function newCode(Code){
  //문자열 인식
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
      let j;
      for(j=i+1;Code.charAt(j)!=`'`;j++){}
      Str.push(Estrcut(Code,i+1,j-1));
      returnCode=returnCode+"<-str->";
      i=j+1;
    }
    else{
      returnCode=returnCode+Code.charAt(i);
    }
    //문자열 인식end
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
