
// function createRow(container,file, samples){
//     const row =document.createElement('div');
//     row.classList.add('row');
//     container.appendChild(row);

//     const rowLabel = document.createElement('div');
//     rowLabel.innerHTML=file;
//     rowLabel.classList.add('rowLabel');
//     container.appendChild(rowLabel);

//     for (let sample of samples){
//         const {id, label} = sample;

//         const sampleContainer = document.createElement("div")
//         sampleContainer.id ="sample_"+id
//         sampleContainer.classList.add("sampleContainer")

//         const sampleLabel = document.createElement("div")
//         sampleLabel.innerHTML =label
//         sampleLabel.appendChild(sampleLabel)

//         const img = document.createElement('img');
//         img.src = constants.IMG_DIR+"/"+id+".png"
//         sampleContainer.appendChild(img)
//         row.appendChild(sampleContainer);
//         // row.appendChild(img)
//     }
// }

// function handleClick(sample) {
//     const el = document.getElementById("sample_" + sample.id);
//         el.classList.add('emphasize')
// }
 
function createRow(container, file, samples ) {
    const row = document.createElement('div');
    row.classList.add('row');
    container.appendChild(row);

    const rowLabel = document.createElement('div');
    rowLabel.innerHTML = file;
    rowLabel.classList.add('rowLabel');
    row.appendChild(rowLabel); // Append rowLabel to the row, not directly to the container

    for (let sample of samples) {
        const { id, label, correct } = sample;

        const sampleContainer = document.createElement("div")
        sampleContainer.id = "sample_" + id
        sampleContainer.onclick = () => handleClick(sample, false)
        sampleContainer.classList.add("sampleContainer")
         if(correct){
            sampleContainer.style.backgroundColor='lightpink'
         }
        const sampleLabel = document.createElement("div")
        sampleLabel.innerHTML = label
        sampleContainer.appendChild(sampleLabel); // Append sampleLabel to the sampleContainer, not directly to itself

        const img = document.createElement('img');
        img.src = constants.IMG_DIR + "/" + id + ".png"
        sampleContainer.appendChild(img)
        img.classList.add("thumb")
        row.appendChild(sampleContainer);
    }
}

function handleClick(sample,doScroll=true){
    if(sample==null){
       [...document.querySelectorAll('.emphasize')].
          forEach((e)=>e.classList.remove('emphasize'));
       return;
    }
    const el=document.getElementById(
       "sample_"+sample.id
    );
    if(el.classList.contains("emphasize")){
       el.classList.remove("emphasize");
       chart.selectSample(null);
       return;
    }
    [...document.querySelectorAll('.emphasize')].
       forEach((e)=>e.classList.remove('emphasize'));
    el.classList.add("emphasize");
    if(doScroll){
       el.scrollIntoView({
          behavior:'auto',
          block:'center'
       });
    }
    chart.selectSample(sample);
 }

function toggleInput(){
    if(inputContainer.style.display=="none"){
       inputContainer.style.display="block";
       sketchPad.triggerUpdate();
    }else{
       inputContainer.style.display="none";
       chart.hideDynamicPoint();
    }
 }

 