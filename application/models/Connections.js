var softDelete = require('mongoose-softdelete');
var timestamps = require('mongoose-timestamp');
var ConnectionsSchema = new mongooseSchema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  followers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  following:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  created: {
   type: Date,
   default: Date.now
 }
});


function stringNotNull(obj){
   return obj.length
}

ConnectionsSchema.plugin(softDelete);
ConnectionsSchema.plugin(timestamps);

var Connections = mongoose.model('Connections', ConnectionsSchema);
module.exports = Connections
