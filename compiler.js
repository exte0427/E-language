function Ecompiler(Codes){
  Codes=Codes.split("\n");
  let returnCodes="";
  for(let i=0;i<Codes.length;i++){
    let returnCode="";
    let Code=Codes[i];
    let newCodes="";
    let okokokok=0;
    for(let j=0;j<Code.length;j++){
      if(Code.charAt(j)!=" "){
        newCodes=newCodes+Code.charAt(j);
        okokokok=1;
      }
      else{
        if(okokokok==1){
          newCodes=newCodes+Code.charAt(j);
        }
      }
    }
    Code=newCodes;
    //start
    returnCode=Egrammer(Code);
    //end
    returnCodes=returnCodes+returnCode+"\n";
  }
  eval(returnCodes);
}
function e(Codes){
  let Code=reCode(Codes);
  let Str=[];
  let newCode="";
  for(let i=0;i<Code.length;i++){
    if(Code.charAt(i)=="§"){
      let j;
      for(j=i;Code.charAt(j)!="※";j++){}
      Str.push(Estrcut(Code,i+1,j-1));
      i=j;
      newCode=newCode+"|STR|";
    }else{
      newCode=newCode+Code.charAt(i);
    }
  }
  Code=newCode;
  Code=Code.replace(/:/gi,"\n");
  Code=Code.replace(/{/gi,"{\n");
  Code=Code.replace(/}/gi,"\n}\n");
  for(let i=0;i<Str.length;i++){
    Code=Code.replace("|STR|",`"`+Str[i]+`"`);
  }
  Ecompiler(Code);
}
function reCode(Codes){
  let newCode="";
  let is=0;
  for(let i=0;i<Codes.length;i++){
    if(Codes.charAt(i)==`"`){
      if(is%2==0){
        newCode=newCode+"§";
      }
      else{
        newCode=newCode+"※";
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
function Egrammer(Code){
  if(Estrcut(Code,0,2)=="new"){
    let Codes=Code.split("=");
    if(Codes[1].indexOf("Array")==-1){
      return "let "+Codes[0].replace("new ","")+" = "+Codes[1];
    }
    else{
      return "let "+Codes[0].replace("new ","")+" = new Array("+Codes[1].replace("Array[","").replace("]","")+")";
    }
  }
  if(Estrcut(Code,0,0)=="}"){
    return "}";
  }
  if(Estrcut(Code,0,3)=="load"){
    return Code.replace("load ","");
  }
  if(Estrcut(Code,0,5)=="repeat"){
    let c=Code.replace("for ","").replace("{","").split(",");
    if(c.length==1){
      return "while("+Code.replace("repeat ","").replace("{","")+"){";
    }
    else{
      return "for(let "+c[0]+";"+c[1]+";"+c[2]+"){";
    }
  }
return Code;}
