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
    div.innerHTML=`<div class="flex flex-col justify-center items-center w-[547px] h-[372px] border border-gray-300 rounded-md"> <h1 class="font-bold text-[32px]">${element.word}</h1> <p class="font-medium ext-[20px]">Meaning /Pronounciation</p> <h1 class="font-semibold text-[32px]">"${element.meaning}"</h1> <div class="flex justify-between w-[547px] px-20 mt-15"> <div class="bg-[#babdbe] p-2"><i class="fa-solid fa-circle-info"></i></div> <div class="bg-[#babdbe] p-2"><i class="fa-solid fa-volume-high"></i></div> </div> </div>
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
