let Str=[];
function e(Codes){
  let Code=Codes.split("\n");
  //주석 인식
  for(let i=0;i<Code.length;i++){
    Code[i]=newCode3(Code[i]);
  }
  //문자열 인식
  for(let i=0;i<Code.length;i++){
    Code[i]=newCode(Code[i]);
  }
  //괄호 인식
  Code=newCode2(Code);
  //마지막 코드 최적화
  Code=lastCode(Code);
  Code=Code.split("\n");
  //컴파일
  let returnCode="";
  for(let i=0;i<Code.length;i++){
    returnCode=returnCode+"\n"+compiler(Code[i]);
  }
  Code=returnCode;
  for(let i=0;Code.indexOf("<-str->")!=-1;i++){
    Code=Code.replace("<-str->",`"`+Str[i]+`"`);
  }
  eval(Code);
}
function compiler(Code){
  //start
  if(Code.startsWith("repeat")){
    let Codes=Code.split(" ");
    if(Codes[2]=="" || Codes[2]==undefined){
      return 문법.while.replace("<1>",Codes[1]);
    }
    else if(Codes[2]=="=>"){
      if(isNaN(Codes[3])==1){
        return 문법.for.replace("<name>",Codes[1]).replace("<2>",Codes[3]);
      }
      else{
        return 문법.for2.replace("<name>",Codes[1]).replace("<2>",Codes[3]);
      }
    }
  }
  if(Code.startsWith("if")){
    if(Code.startsWith("if not")){
      return 문법.elseif.replace("<1>",Code[2]);
    }
    else{
      return 문법.if.replace("<1>",Code[1]);
    }
  }
  if(Code.startsWith("not")){
    return 문법.else;
  }

  //end
  if(Code.replace(/ /gi,"")!=-1 && Code.indexOf("=")!=-1){
    return 문법.lett.replace("<1>",Code.split("=")[0]).replace("<2>",Code.split("=")[1]);
  }
  return Code;}
let 문법 = {
  while:"while(<1>){",
  for:"for(let <name>=0;<name><<2>,length;<name>++){",
  for2:"for(let <name>=0;<name><<2>;<name>++){",
  if:"if(<1>){",
  elseif:"else if(<1>){",
  else:"else{",
  lett:"let <1>=<2>;",
}
function lastCode(Code){
  Code=Code.replace(/:/gi,"\n");
  Code=Code.replace(/}/gi,"\n}\n");
  let reCode="";
  let Codes=Code.split("\n");
  for(let i=0;i<Codes.length;i++){
    if(Codes[i]==""){}
    else{reCode=reCode+Codes[i]+"\n";}
  }
  return reCode;
}
function newCode2(Code){
  if(Code.length<2){return Code[0];}
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
      i=j;
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
function newCode3(Code){
  let newCode="";
  if(Code.indexOf("#")==-1){
    newCode=Code;
  }
  else{
    newCode=Estrcut(Code,0,Code.indexOf("#")-1);
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
function error(errormsg){
  console.error('errormsg');
}
