function e(Codes){
  let Code=reCode(Codes);
  let Str=[];
  let newCode="";
  for(let i=0;i<Code.length;i++){
    if(Code.charAt(i)=="<"){
      let j;
      for(j=i;Code.charAt(j)!=">";j++){}
      Str.push(Estrcut(Code,i+1,j-1));
      i=j;
      newCode=newCode+"|STR|";
    }else{
      newCode=newCode+Code.charAt(i);
    }
  }
  Code=newCode;
  Code=sliceCode(Code);
  for(let i=0;i<Str.length;i++){
    Code=Code.replace("|STR|",`"`+Str[i]+`"`);
  }
  console.log(Code,Str);
}
function sliceCode(Code){
  let newCode=Code;
  newCode.replace(/:/gi,"\n");
  newCode.replace(/{/gi,"{\n");
  newCode.replace(/}/gi,"\n}\n");
  return newCode;
}
function reCode(Codes){
  let newCode="";
  let is=0;
  for(let i=0;i<Codes.length;i++){
    if(Codes.charAt(i)==`"`){
      if(is%2==0){
        newCode=newCode+"<";
      }
      else{
        newCode=newCode+">";
      }
      is++;
    }
    else{
      newCode=newCode+Codes.charAt(i);
    }
  }
  return newCode;
}
function Estrcut(index,a,b){
    var returnn="";
    for(var i=a;i<=b;i++){
        returnn=returnn+index.charAt(i);
    }
    return returnn;
}
e(`" asd" asdasd  "ds"  d"d"`);
