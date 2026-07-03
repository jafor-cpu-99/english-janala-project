const loadlesson=lesson=>{
    fetch(`https://openapi.programming-hero.com/api/level/${lesson}`)
    .then(res=>res.json())
    .then(data=>{
        showdata(data.data);
        
    })
};
function showdata(data){
      const lessoncontainer=document.getElementById('lesson');
    lessoncontainer.innerHTML='';
    data.forEach(element => {
      
    const div = document.createElement("div");
    div.innerHTML=`<div class="flex flex-col justify-center items-center w-[547px] h-[372px] border border-gray-300 rounded-md"> <h1 class="font-bold text-[32px]">${element.word}</h1> <p class="font-medium ext-[20px]">Meaning /Pronounciation</p> <h1 class="font-semibold text-[32px]">"${element.meaning}"</h1> <div class="flex justify-between w-[547px] px-20 mt-15"> <div class="bg-[#babdbe] p-2"><i class="fa-solid fa-circle-info"></i></div> <div class="bg-[#babdbe] p-2"><i class="fa-solid fa-volume-high"></i></div> </div> </div>
    `;
    lessoncontainer.appendChild(div);
        
    });
}
