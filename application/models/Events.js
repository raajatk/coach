var softDelete = require('mongoose-softdelete');
var timestamps = require('mongoose-timestamp');
var EventsSchema = new mongooseSchema({
  eventName:{
    type:String,
    required:true,
    trim:true,
    validate:[stringNotNull,'event name required']
  },
  eventOrganizerId:{
    type:mongooseSchema.ObjectId,
    ref:'User'
  },
  startTime:{
    type:Date,
    required:true
  },
  endTime:{
    type:Date,
    required:true
  },
  sportName:{
    type:String,
    required:true,
    trim:true,
    validate:[stringNotNull,'sport name required']
  },
  isOpenEvent:{
    type:Boolean,
    required:true
  },
  registrationsAllowed:{
    type:Number,
    required:true
  },
  isPaid:{
    type:Boolean,
    default:false
  },
  eventType:{
    type:String,
    required:true,
    enum:['TRAINING','COMPETITION'],
    trim:true
  },
  totalRegistrations:{
    type:Number,
    required:true,
    default:0
  },
  placeOfEvent:{
    type:String,
    required:true,
    trim:true
  },
  cityOfEvent:{
    type:String,
    required:true,
    trim:true
  },
  created: {
   type: Date,
   default: Date.now
 }
});


function stringNotNull(obj){
   return obj.length
}

EventsSchema.plugin(softDelete);
EventsSchema.plugin(timestamps);

var Events = mongoose.model('Events', EventsSchema);
module.exports = Events
