let current = "";

let display = document.getElementById("expression");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");


let justCalculated = false;



function append(value){


let operators = ["+","-","*","/"];



// calculation کے بعد operator دبایا

if(justCalculated && operators.includes(value)){


current = result.dataset.raw;

justCalculated = false;


}


// calculation کے بعد number یا function دبایا

else if(justCalculated && !operators.includes(value)){


current = "";

result.innerHTML = "0";

justCalculated = false;


}



current += value;


display.innerHTML = current;



}






function clearAll(){


current = "";

display.innerHTML = "";

result.innerHTML = "0";

result.dataset.raw = "";

justCalculated = false;


}







function deleteChar(){


current = current.slice(0,-1);


display.innerHTML = current;


}







function calculate(){


try{



// اگر پہلے ہی answer آ چکا ہے
// اور دوبارہ = دبایا جائے

if(justCalculated){

return;

}



let exp = current;



let answer = mathSolve(exp);



// raw value save

result.dataset.raw = answer;



result.innerHTML = 
Number(answer).toLocaleString(
"en-US",
{
maximumFractionDigits:10
}
);




// history save

let history = document.createElement("li");


history.innerHTML =
`${exp} = ${answer}`;



historyList.prepend(history);




current = answer.toString();



justCalculated = true;



}


catch{


result.innerHTML = "Error";


current = "";


}



}








function mathSolve(expression){



expression = expression


.replace(/×/g,"*")


.replace(/÷/g,"/")


.replace(/\^/g,"**")


.replace(/sqrt\(/g,"Math.sqrt(")


.replace(/sin\(/g,"Math.sin(")


.replace(/cos\(/g,"Math.cos(")


.replace(/tan\(/g,"Math.tan(")


.replace(/log\(/g,"Math.log10(");



return Function(
"return " + expression
)();



}







function clearHistory(){


historyList.innerHTML = "";


}







document.addEventListener(
"keydown",

function(e){



if(

e.key.match(/[0-9+\-*/().]/)

){


append(e.key);


}



if(e.key === "Enter"){


calculate();


}



if(e.key === "Backspace"){


deleteChar();


}



}

);