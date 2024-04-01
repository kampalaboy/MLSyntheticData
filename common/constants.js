const constants = {};

constants.DATA_DIR="../data";
constants.RAW_DIR=constants.DATA_DIR+"/raw";
constants.DATASET_DIR=constants.DATA_DIR+"/dataset";
constants.JSON_DIR=constants.DATASET_DIR+"/json";
constants.IMG_DIR=constants.DATASET_DIR+"/img";
constants.SAMPLES=constants.DATASET_DIR+"/samples.json";
constants.JS_OBJECTS="../common/js_objects";
constants.SAMPLES_JS=constants.JS_OBJECTS+"/samples.js";

//Features

constants.FEATURES=constants.DATASET_DIR+"/features.json";
constants.TRAINING=constants.DATASET_DIR+"/training.json";
constants.TESTING=constants.DATASET_DIR+"/testing.json";
constants.FEATURES_JS=constants.JS_OBJECTS+"/features.js";
constants.TRAINING_JS=constants.JS_OBJECTS+"/training.js";
constants.TESTING_JS=constants.JS_OBJECTS+"/testing.js";
constants.MIN_MAX_JS=constants.JS_OBJECTS+"/minMax.js";
constants.DECISION=constants.DATASET_DIR+"/decision.png";
constants.TRAINING_CSV=constants.DATASET_DIR+"/training.csv";
constants.TESTING_CSV=constants.DATASET_DIR+"/testing.csv";

//Specs

constants.SPECS=constants.DATASET_DIR+"/sFeatures.json";
constants.SPECS_TRAINING=constants.DATASET_DIR+"/sTraining.json";
constants.SPECS_TESTING=constants.DATASET_DIR+"/sTesting.json";
constants.SPECS_JS=constants.JS_OBJECTS+"/sFeatures.js";
constants.SPECS_TRAINING_JS=constants.JS_OBJECTS+"/sTraining.js";
constants.SPECS_TESTING_JS=constants.JS_OBJECTS+"/sTesting.js";
constants.SPECS_MIN_MAX_JS=constants.JS_OBJECTS+"/sMinMax.js";
constants.SPECS_DECISION=constants.DATASET_DIR+"/sDecision.png";
constants.SPECS_TRAINING_CSV=constants.DATASET_DIR+"/sTraining.csv";
constants.SPECS_TESTING_CSV=constants.DATASET_DIR+"/sTesting.csv";


constants.MY_SAMPLES=constants.DATA_DIR+"/mysamples/JSON";

if(typeof module!=='undefined'){
    module.exports=constants;
}