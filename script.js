/**
 * Escript
 * 컴파일러 입니다
 * -----------------------
 * made by ex
 * -----------------------
 */

//필요한 함수를 불러오는 곳

String.prototype.strcut = function(a,b){
    let returnSTR="";
    for(let i=a;i<=b;i++){
        returnSTR=returnSTR+this.charAt(i);
    }
    return returnSTR;
}
String.prototype.compare = function(a){
    let t=a.split(">");
    let str=this;
    for(let i=0;i<t.length;i++){
        const th=t[i].split("<")[0];
        if(str.indexOf(th)!=-1){
            str=str.replace(th,"");
        }
        else{
            return false;
        }
    }
    return true;
}
String.prototype.data = function(a){
    let t=a.split(">");
    let str=this;
    for(let i=0;i<t.length;i++){
        const th=t[i].split("<")[0];
        if(str.indexOf(th)!=-1){
            str=str.replace(th,",");
        }
    }
    const str2=[];
    str.split(",").map(a=>{if(a!="" && a!=undefined){str2.push(a);}});
    if(str2.length==1){
        return str2[0];
    }
    else if(str2.length==0){
        return 0;
    }
    else{
        return str2;
    }
}
function spaceNum(str){
    let i;
    for(i=0;i<str.length;i++){
        if(str.charAt(i)!=" "){
            break;
        }
    }
    return i;
}

//컴파일 관련 함수를 불러오는곳
function err(msg){throw new Error(msg);}
function run(data){
    data=transform(data); //{} , " " 없에기 등등
    return data;
}
function transform(data){
    data="\n"+data+"\n"
    let code=data.split("\n"); // 오류 방지용 앞 뒤 공백 배열 추가
    // "  "로 괄호 자동 추가
    let futurespace=0;
    for(let i=0;i<code.length-1;i++){
        futurespace=spaceNum(code[i+1]); //다음 space 수를 저장
        if(spaceNum(code[i])<futurespace){
            //괄호가 추가 되어야 하는 상태
            if(futurespace-2 == spaceNum(code[i])){
                code[i]=code[i]+"{";
            }
            else{
                err("한번에 두번 괄호를 열 수 없습니다.");
            }
        }
        else if(spaceNum(code[i])!=futurespace){
            //괄호가 닫혀야 되는 상황
            const num=Math.ceil((spaceNum(code[i])-futurespace)/2);
            for(let j=0;j<num;j++){
                code[i]=code[i]+"\n}";
            }
        }
    }
    code=code.join("\n");code=code.split("\n"); // code[i]=code[i]+"\n}" 에서 추가한 \n을 배열로 만듬
    code=code.map(a=>a.strcut(spaceNum(a),a.length)); // 코드에 space를 제거
    return code.join("\n");
}
/**
 * log "hi world"
 */