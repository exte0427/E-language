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
let str=[];
function decode(code){
    while(code.indexOf("&*&*str")!=-1){
        code=code.replace("&*&*str","ppppppppppdp");
        let i=code.strcut(code.indexOf("ppppppppppdp")+"ppppppppppdp".length,code.indexOf("&*&*")-1)*1;
        code=code.replace("ppppppppppdp"+i+"&*&*","`"+str[i]+"`");
    }
    return code;
}
function stringdel(a){
    let code="";
    let o=0;
    for(let i=0;i<a.length;i++){
        if(a.charAt(i)=="`"){
            let first=i;
            let j=0;
            for(j=first+1;a.charAt(j)!="`";j++){}
            str.push(a.strcut(first,j).replace("<","${").replace(">","}"));
            code=code+"&*&*str"+o+"&*&*";
            o++;
            i=j;
        }
        else if(a.charAt(i)==`'`){
            let first=i;
            let j=0;
            for(j=first+1;a.charAt(j)!="'";j++){}
            str.push(a.strcut(first+1,j-1));
            code=code+"&*&*str"+o+"&*&*";
            o++;
            i=j;
        }
        else if(a.charAt(i)==`"`){
            let first=i;
            let j=0;
            for(j=first+1;a.charAt(j)!=`"`;j++){}
            str.push(a.strcut(first+1,j-1));
            code=code+"&*&*str"+o+"&*&*";
            o++;
            i=j;
        }
        else if(a.charAt(i)=="#"){
            let first=i;
            let j=0;
            for(j=first+1;a.charAt(j)!="\n";j++){
                if(j>=a.length){
                    break;
                }
            }
            i=j;
        }
        else{
            code=code+a.charAt(i);
        }
    }
    return code;
}
function err(msg){throw new Error(msg);}
function run(data){
    return eval(decode(compiler(transform(stringdel(data)).split("\n"))));
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
                //code[i]=code[i]+"{";
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
function compiler(a){
    for(let i=0;i<a.length;i++){
        if(a[i]==""){
            a.splice(i,1);
            i--;
        }
    }
    let returnCode="";
    //--------------------------------------------------------------------------------------------------------------------------
    const codes=[
        {
            //repeat a in 1,3 // repeat a in 3 // repeat a==10
            str:["repeat <> in <>,<>","repeat <> in <>","repeat <>"],
            datas:["for(<data1>=<data2>;<data1><<data3>;<data1>++){","for(<data1>=0;<data1><<data2>;<data1>++){","while(<data1>){"]
        },
        {
            // a=10
            str:["<>=<>,<>","<>=<>"],
            datas:["let <data1>=[<data2>,<data3>];","let <data1>=<data2>;"]
        }
    ];
    //--------------------------------------------------------------------------------------------------------------------------
    for(let i=0;i<a.length;i++){
        let returns="";
        let br=0;
        for(let j=0;j<codes.length;j++){
            for(let pp=0;pp<codes[j].str.length;pp++){
                if(a[i].compare(codes[j].str[pp])){
                    let d=a[i].data(codes[j].str[pp]);
                    let c=codes[j].datas[pp];
                    while(c.indexOf("<data")!=-1){
                        let o=d[c.strcut(c.indexOf("<data")+5,c.indexOf(">")-1)*1-1];
                        c=c.replace("<data"+c.strcut(c.indexOf("<data")+5,c.indexOf(">")-1),"");
                        c=c.replace(">",o);
                    }
                    returns=c;
                    br=1;
                    break;
                }
                //if(br==1){break;}
            }
            if(br==1){break;}
        }
        if(br==0){
            returns=a[i];
        }
        returnCode=returnCode+"\n"+returns;
    }
    returnCode=returnCode.replace("\n","");
    return returnCode;
}
function custom(str){
    let k=true;
    let now=true;
    if(str.startsWith("!")){
        k=false;
        str=str.replace("!","");
    }
    else if(str.startsWith("false")){
        k=false;
        str=str.replace("false ","");
    }
    else if(str.startsWith("true")){
        k=true;
        str=str.replace("true ","");
    }
    else if(str.startsWith("not")){
        k=false;
        str=str.replace("not ","");
    }


    if(k==false){
        if(now==true){
            return false;
        }
        else{
            return true;
        }
    }
    else{
        return now;
    }

}
run(`
b="hello world","s"
sdfsdf
repeat a in b
  d
s
`)
/**
 * log "hi world"
 */
