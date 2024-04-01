
const utils={};


utils.styles={
   
      Zari: { color: 'green', text: '🖊️📝👥' },
      Tyson: { color: 'green', text: '🖊️📝👥' },
      Simone: { color: 'green', text: '🖊️📝👥' },
      Kylie: { color: 'green', text: '🖊️📝👥' },
      Zendaya: { color: 'green', text: '🖊️📝👥' },
      Beiber: { color: 'green', text: '🖊️📝👥' },
      Monroe: { color: 'green', text: '🖊️📝👥' },
      Diamond: { color: 'green', text: '🖊️📝👥' },
      Oprah: { color: 'green', text: '🖊️📝👥' },
      Markle: { color: 'green', text: '🖊️📝👥' },

      bot: { color: 'lightblue', text: '🤖' },
      npc: { color: 'lightgreen', text: '🙂' },
      anime: { color: 'lightyellow', text: '🐉' },
      fantasia: { color: 'lightpurple', text: '🔮' },
      westworld: { color: 'lightorange', text: '🏹' },
      PS3: { color: 'lightpink', text: '🎮' },
      wwe: { color: 'lightbrown', text: '🤼‍♂️' },
      nueron: { color: 'lightcyan', text: '⚡' },
      silicon: { color: 'lightmagenta', text: '⌛' },
      gucci: { color: 'darkred', text: '💄👠👗' },
      prada: { color: 'darkblue', text: '👠' },
      lion: { color: 'darkgreen', text: '🦁' },
      tigress: { color: 'darkyellow', text: '🐯' },
      synth: { color: 'darkpurple', text: '🎹🎶🔊' },
      matrix: { color: 'darkorange', text: '👩‍💻' },
      stranger: { color: 'darkpink', text: '🫥' },
      traffic: { color: 'darkbrown', text: '🚦' },
      violent: { color: 'darkcyan', text: '🔫' },
      PG: { color: 'darkmagenta', text: '🔞' },
      merch: { color: 'darklightblue', text: '🧢' },
      email: { color: 'darklightgreen', text: '📧' },
      block: { color: 'darklightyellow', text: '💰🔒🌐' },
      crypto: { color: 'darklightpurple', text: '🤑' },
      comp: { color: 'darklightorange', text: '💻' }
  };
  
utils.styles["?"]={color:'red',text:'❓'};

utils.formatPercent=(n)=>{
    return (n*100).toFixed(2)+"%";
 }
 
 utils.printProgress=(count,max)=>{
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percent=utils.formatPercent(
       count/max
    );
    process.stdout.write(count+"/"+max+
       " ("+percent+")"
    );
 }
 
 utils.groupBy=(objArray,key)=>{
    const groups={};
    for(let obj of objArray){
       const val=obj[key];
       if(groups[val]==null){
          groups[val]=[];
       }
       groups[val].push(obj);
    }
    return groups;
 }
 
 utils.distance=(p1,p2)=>{
    return Math.sqrt(
       (p1[0]-p2[0])**2+
       (p1[1]-p2[1])**2
    );
 }
 
 utils.getNearest=(loc,points,k=1)=>{
    const obj=points.map((val,ind)=>{
         return {ind, val}
    });
    const sorted=obj.sort((a,b)=>{
         return utils.distance(loc,a.val)-utils.distance(loc,b.val)
    });

    const indices = sorted.map((obj)=>obj.ind);
    return indices.slice(0,k); 
 }

 utils.invLerp=(a,b,v)=>{
   return (v-a)/(b-a);
 }

 utils.normalizePoints=(points,minMax)=>{
   let min,max;
   const dimensions = points[0].length;
   if(minMax){
      min=minMax.min;
      max=minMax.max;
   }else{
      min=[...points[0]];
      max=[...points[0]];
      for(let i=1;i<points.length;i++){
         for(let j=0;j<dimensions;j++){
            min[j]=Math.min(min[j],points[i][j]);
            max[j]=Math.max(max[j],points[i][j]);
         }  
      }
}
   for(let i=0;i<points.length;i++){
      for(let j=0;j<dimensions;j++){
         points[i][j]=
            utils.invLerp(min[j],max[j],points[i][j]);
      }
   }
   return {min,max};
 }


 utils.specPoints = (points, minMax) => {
   let min, max;
   const dimensions = points[0].length;

   if (minMax) {
       min = minMax.min;
       max = minMax.max;
   } else {
       min = new Array(dimensions).fill(null);
       max = new Array(dimensions).fill(null);

       // Find the actual min and max values, skipping null values
       for (let i = 0; i < points.length; i++) {
           for (let j = 0; j < dimensions; j++) {
               if (points[i][j] !== null) {
                   if (min[j] === null || points[i][j] < min[j]) {
                       min[j] = points[i][j];
                   }

                   if (max[j] === null || points[i][j] > max[j]) {
                       max[j] = points[i][j];
                   }
               }
           }
       }
   }

   for (let i = 0; i < points.length; i++) {
       for (let j = 0; j < dimensions; j++) {
           if (max[j] !== null && min[j] !== null && max[j] - min[j] !== 0) {
               points[i][j] = utils.invLerp(min[j], max[j], points[i][j]);
           } else {
               // Handle cases where max[j] - min[j] is zero or null
               points[i][j] = 0.5; // Default to 0.5 for example
           }
       }
   }

   return { min, max };
};




 utils.csv=(headers,samples)=>{
      let str=headers.join(",")+"\n";
      for (const sample of samples){
         str+=sample.join(",")+"\n";
      }
   return str;
 }
 
 if(typeof module!=='undefined'){
    module.exports=utils;
 }
