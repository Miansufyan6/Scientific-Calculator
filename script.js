let current="";


let display =
document.getElementById("expression");


let result =
document.getElementById("result");


let historyList =
document.getElementById("historyList");



let justCalculated=false;





function append(value){


let operators=["+","-","*","/"];




if(justCalculated && operators.includes(value)){


current=result.dataset.raw;


justCalculated=false;


}


else if(justCalculated){


current="";


result.innerHTML="0";


justCalculated=false;


}




current+=value;


display.innerHTML=current;



}







function clearAll(){


current="";


display.innerHTML="";


result.innerHTML="0";


justCalculated=false;


}






function deleteChar(){


current=current.slice(0,-1);


display.innerHTML=current;


}







function calculate(){


if(justCalculated)return;



try{


let exp=current;


let answer=mathSolve(exp);



result.dataset.raw=answer;



result.innerHTML=
Number(answer).toLocaleString(
"en-US",
{
maximumFractionDigits:10
}
);




let li=document.createElement("li");


li.innerHTML=
`${exp} = ${answer}`;


historyList.prepend(li);



current=answer.toString();


justCalculated=true;


}



catch{


result.innerHTML="Error";


}



}






function mathSolve(exp){


exp=exp

.replace(/×/g,"*")

.replace(/÷/g,"/")

.replace(/\^/g,"**")

.replace(/sqrt\(/g,"Math.sqrt(")

.replace(/sin\(/g,"Math.sin(")

.replace(/cos\(/g,"Math.cos(")

.replace(/tan\(/g,"Math.tan(")

.replace(/log\(/g,"Math.log10(");



return Function(
"return "+exp
)();


}






function clearHistory(){


historyList.innerHTML="";


}





document.addEventListener(
"keydown",

e=>{


if(e.key.match(/[0-9+\-*/().]/))

append(e.key);



if(e.key==="Enter")

calculate();



if(e.key==="Backspace")

deleteChar();



});