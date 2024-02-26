const quote_input=document.getElementById("quoteInput")
const quote_display_element= document.getElementById("display")
const timer_element= document.getElementById("timer")
var time_limit=30
var letters=0;
let pop_up_box= document.getElementById('popup')
var score= document.getElementById('score');
let restart= document.getElementById('restart')
//This fetches a random line from the text file
function random_qoute(){
    quote_display_element.innerHTML=''
    return fetch('c_hard.txt')
        .then(response=> response.text())
        .then(text=>{
            const lines=text.trim().split('\n')
            const randomIndex=Math.floor(Math.random()*lines.length)

            const randomLine=lines[randomIndex]
           
            console.log(randomLine)
            randomLine.split('').forEach(character=>{
                const characterSpan= document.createElement('span')
                characterSpan.innerText= character
                quote_display_element.appendChild(characterSpan)
            })
            
            quote_input.value=null
        })
        .catch(error=>console.error('Error fetching text: ',error));
}


/*Loops over every character that is type and compares them to the spans */
quote_input.addEventListener('input', ()=>{
    const array_quote=quote_display_element.querySelectorAll('span')
    const array_val= quote_input.value.split('')
    let correct = true
    let wordcount=array_quote.length
    array_quote.forEach((characterSpan,index)=>{
        const character= array_val[index]
        if(character==null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false;
        }
        else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }else{
            console.log(characterSpan.innerText)
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct=false
        }
    })
    if (correct){
        
        random_qoute()
        letters+=array_quote.length;
        score.innerText=letters;
        console.log(letters);
        let lps=wordcount/timer_element.innerText
    }
})
restart.addEventListener('click',function(){
    location.reload()
})
let timerInterval;
  function startTimer() {
    let startTime = Date.now();
    timerInterval = setInterval(() => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const remainingTime = Math.max(0, time_limit - elapsedTime);
      timer_element.innerText = remainingTime.toFixed(1);

      if (remainingTime <= 0) {
        display_pop_up()
        clearInterval(timerInterval);
        random_qoute();
        time_limit = 30; // Reset time limit
        timer_element.innerText = time_limit;
      }
    }, 100);
}

function close_pop_up(){
    pop_up_box.classList.remove("display");
}
function display_pop_up(){
    pop_up_box.classList.add("display")
}
window.onload=random_qoute()
window.onload=startTimer()