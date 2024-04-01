const constants = require('../common/constants.js');
const utils = require('../common/utils.js');
const KNN = require('../common/classify/knnmodule.js');

const fs=require('fs');

console.log('Class in session...')


const {samples:trainSamples}=JSON.parse(
    fs.readFileSync(constants.TRAINING)
);
const knn=new KNN(trainSamples,50);

const {samples:testSamples}=JSON.parse(
    fs.readFileSync(constants.TESTING)
);

let totalCount=0;
let correctCount=0;
for (const sample of testSamples){
    const {label:predictedLabel}=knn.predict(sample.point);
    correctCount+=predictedLabel==sample.label
    totalCount++;
}

console.log("SHOT ACC: "+
    correctCount+"/"+totalCount+"("+
    utils.formatPercent(correctCount/totalCount)+
    ")"
);

console.log('Colouring')


const {createCanvas} = require('canvas');
const canvas = createCanvas(300,300);
const ctx = canvas.getContext('2d'); 

for (let x=0;x<canvas.width;x++){
    for(let y=0;y<canvas.height;y++){
        const point=[
            x/canvas.width,
            1-y/canvas.height
        ];
        const {label}=knn.predict(point);
        const color=utils.styles[label].color;
        ctx.fillStyle=color;
        ctx.fillRect(x,y,1,1);
        ctx.imageSmoothingEnabled=false;
    }
}

const buffer=canvas.toBuffer("image/png");
fs.writeFileSync(constants.DECISION,buffer);



