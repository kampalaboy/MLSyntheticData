
const constants=require('../common/constants.js');
const features = require('../common/specs.js');
const utils = require('../common/utils.js');
const fs =require('fs');

console.log('extrAct...')

const samples=JSON.parse(
    fs.readFileSync(constants.SAMPLES)
);

for (const sample of samples){
    const paths=JSON.parse(
        fs.readFileSync(
            constants.JSON_DIR+"/"+sample.id+".json"
        ) 
    );
    
    const functions=features.inUse.map(f=>f.function);
    sample.point=functions.map(f=>f(paths));   
};

const featureNames=features.inUse.map(f=>f.name);

fs.writeFileSync(constants.SPECS,
    JSON.stringify({
        featureNames,
        samples:samples.map(s=>{
            return {
                point:s.point,
                label:s.label
            }
        })
    })
);


fs.writeFileSync(constants.SPECS_JS,
    `const featuresDisplay =
    ${JSON.stringify({featureNames,samples})};
    `
);


console.log('Splitting...')

const trainingAmount=samples.length*0.5;

const training=[];
const testing=[];

for(let i=0;i<samples.length;i++){
    if(i<trainingAmount){
        training.push(samples[i]);
    }else{
        testing.push(samples[i]);
    }
}

const minMax = utils.specPoints(
    training.map(s=>s.point)
);

utils.specPoints(
    testing.map(s=>s.point),minMax
);

fs.writeFileSync(constants.SPECS_TRAINING,
    JSON.stringify({
        featureNames,
        samples:training.map(s=>{
            return {
                point:s.point,
                label:s.label
            }
        })
    })
);

fs.writeFileSync(constants.SPECS_TRAINING_CSV,
    utils.csv([...featureNames,"Label"],
    training.map(a=>[...a.point, a.label])
    )
 );


fs.writeFileSync(constants.SPECS_TRAINING_JS,
    `const training =
    ${JSON.stringify({featureNames,samples:training})};
    `
);

fs.writeFileSync(constants.SPECS_TESTING,
    JSON.stringify({
        featureNames,
        samples:testing.map(s=>{
            return {
                point:s.point,
                label:s.label
            }
        })
    })
);

fs.writeFileSync(constants.SPECS_TESTING_CSV,
    utils.csv([...featureNames,"Label"],
    training.map(a=>[...a.point, a.label])
    )
 );


fs.writeFileSync(constants.SPECS_TESTING_JS,
    `const testing =
    ${JSON.stringify({featureNames,samples:testing})};
    `
);

fs.writeFileSync(constants.SPECS_MIN_MAX_JS,
    `const minMax =
    ${JSON.stringify(minMax)};
    `
);


