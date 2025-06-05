const FudiClaudeDirect = require('./services/brain/FudiClaudeDirect.js'); 
const EnigmaticBrainMaster = require('./services/brain/enigmatic/orchestrator/EnigmaticBrainMaster.js'); 
 
console.log('?? Testing Frankenstein Integration...'); 
const master = new EnigmaticBrainMaster(); 
console.log('? Frankenstein Master Ready:', master.monsterStatus); 
