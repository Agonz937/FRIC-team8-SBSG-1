'use strict';

const mongoose = require('mongoose');
const {Schema} = mongoose;

const eventSchema = new Schema({
      name: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: '',
      },
      version: {
        type: String,
        default: "2.0",
      },
      created: {
        type: String,
        default: "09112020",
      },
      created_mm_dd_yyyy: {
        type: String,
        default: "13092020"
      },
      organization: {
        type: String,
        default: '',
      },
      department: {
        type: String,
        default: 'CVPA',
      },
      sctg: {
        type: String,
        default: 'Security Classification',
      },
      classification:{
        type: String,
        default: 'Top Secret',
      },
      declassified_date:{
        type: String,
        default: "21092020",
      },
      login: {
        type: String,
      },
      archive:{
        type: String,
        default: 'Archive',
      },
      systems: {
        type: String,
        default: '09',
      },
      initials: {
        type: String,
        default: 'L.A',
      },
      findings: {
        type: String,
        default: '06',
      },
      progress: {
        type: Number,
        default: 18,
      },
      avatar:{
        type: String,
        default: "https://avatars.dicebear.com/v2/gridy/Sigmund-Abbott.svg",
      },
    },
    {collection: 'event'}
);

// eventSchema
//   .virtual('url')
//   .get(function (){
//     return '/catalog/event/' + this._id;
//   });

module.exports = mongoose.model('event',eventSchema);