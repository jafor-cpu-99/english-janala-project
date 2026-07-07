function toggleLoading(isLoading) {
    const loading = document.getElementById("loading");

    if (isLoading) {
        loading.classList.remove("hidden");
    } else {
        loading.classList.add("hidden");
    }
}
const loadlesson=lesson=>{
    toggleLoading(true);
    fetch(`https://openapi.programming-hero.com/api/level/${lesson}`)
    .then(res=>res.json())
    .then(data=>{
        showdata(data.data);
        bgcolorchange(lesson);
        
    })
};
function showdata(data){
    if (data.length === 0) {
        showcard();
        return;
    }
    const lessoncontainer1=document.getElementById('or');
    lessoncontainer1.innerHTML='';
      const lessoncontainer=document.getElementById('lesson');
    lessoncontainer.innerHTML='';
    data.forEach(element => {
      
    const div = document.createElement("div");
    div.innerHTML=`<div class="flex flex-col justify-center items-center w-[547px] h-[372px] border border-gray-300 rounded-md"> <h1 class="font-bold text-[32px]">${element.word}</h1> <p class="font-medium ext-[20px]">Meaning /Pronounciation</p> <h1 class="font-semibold text-[32px]">"${element.meaning}"</h1> <div class="flex justify-between w-[547px] px-20 mt-15" "> <div class="bg-[#babdbe] p-2" onclick="getvalue(${element.id})"><i class="fa-solid fa-circle-info"></i>
    
  
    
    </div> <div class="bg-[#babdbe] p-2 " onclick="pronounceWord('${element.word}')"><i class="fa-solid fa-volume-high"></i></div> </div> </div>
    `;
    lessoncontainer.appendChild(div);

        
    });
    toggleLoading(false);
}
function bgcolorchange(lesson){
    //remove allclass
    for(let i=1; i<=7; i++){
        document.getElementById(`lesson-${i}`).classList.remove(...document.getElementById(`lesson-${i}`).classList);
    }

    document.getElementById(`lesson-${lesson}`).classList.add('btn');
     document.getElementById(`lesson-${lesson}`).classList.add('btn-primary');
     //add btn btn outline btn-primary to all other buttons
     for(let i=1; i<=7; i++){
        if(i!==lesson){
            document.getElementById(`lesson-${i}`).classList.add('btn');
            document.getElementById(`lesson-${i}`).classList.add('btn-outline');
            document.getElementById(`lesson-${i}`).classList.add('btn-primary');
        }
     }

}
function showcard(){
    const lessoncontainer=document.getElementById('or');
    lessoncontainer.innerHTML='';
    const lessoncontainer2=document.getElementById('lesson');
    lessoncontainer2.innerHTML='';
    const div = document.createElement("div");
    div.innerHTML=`<div class="flex flex-col justify-center items-center bg-[#faf8f6] h-[338px] gap-6">
    <div><img src="assets/alert-error.png" alt=""></div>
    <div class="flex flex-col justify-center items-center gap-3">
        <p class="text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="font-bold text-[34px] mx-auto">নেক্সট Lesson এ যান</h1>
    </div>
</div>`;
    lessoncontainer.appendChild(div);
    toggleLoading(false);
}
getvalue = (element) => {
    fetch(`https://openapi.programming-hero.com/api/word/${element}`)
    .then(res => res.json())
    .then(data =>{
        showdetails(data.data);
    })
};
showdetails = (data) => {
    const modal=document.getElementById('modaldis');
    modal.innerHTML='';
    const div = document.createElement("div");
      div.innerHTML=`<h1 class="font-semibold text-[36px] text-[#000000] mb-6">${data.word} (<i class="fa-solid fa-microphone"></i>:${data.pronunciation})</h1>
    <h1 class="font-semibold text-[24px] text-[#000000] mb-3">Meaning: </h1>
    <p class="text-[24px] text-[#000000] mb-3">${data.meaning}</p>
    <h1 class="font-semibold text-[24px] text-[#000000] mb-3">Example</h1>
    <p class="text-[24px] text-[#000000] mb-3">${data.sentence}</p>
    <h1 class="font-semibold text-[24px] text-[#000000] mb-3">সমার্থক শব্দ গুলো</h1>
    <div id="synonyms" class="flex justify-center gap-4"></div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
       <button class="btn btn-primary">Complete Learning</button>
      </form>
    `
    modal.appendChild(div);

   for(let i=0; i<data.synonyms.length; i++){
    const synonymDiv = document.createElement("div");
    synonymDiv.innerHTML =`  <div class="bg-[#EDF7FF] border rounded-md w-fit p-2 text-[#000000] text-[20px] mb-8">${data.synonyms[i]}</div>`
    document.getElementById('synonyms').appendChild(synonymDiv);

    }
    
   my_modal_5.showModal();
    
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US"; // English
  window.speechSynthesis.speak(utterance);
}
takeinput = () => {
    const word = document.getElementById('search-input').value;
    fetch(`https://openapi.programming-hero.com/api/words/all`)
    .then(res => res.json())
    .then(data => {
        checkword(data.data, word);
    });
}   
checkword = (data, word) => {
    const lowerCaseWord = word.toLowerCase();
   const result = data.filter(item =>
    item.word.toLowerCase().startsWith(lowerCaseWord)
);
    if (result.length > 0) {
        showdata(result);
    } else {
        alert("এই শব্দটি আমাদের ডাটাবেসে নেই।");
    }
}