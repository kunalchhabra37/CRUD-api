const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName:{
        type: String, 
        required: true
    },
    lastName:{
        type: String, 
        required: true
    },
    age: {
        type: Number, 
        required: true
    },
    phone: {
        type: Number, 
        required: true
    }, 
    role: {
        type: String, 
        required: true
    },
    active: Boolean, 
    joinDate: Date,
    leavingDate: Date, 
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
// Virtuals
//Full Name
employeeSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName
})

// Instance Methods
// Find Simmilar Role Types
employeeSchema.methods.findSimmilarRole = function(emp) {
    return mongoose.model('Employee').find({type: this.type}, emp)
}
// Find Simmilar status
employeeSchema.methods.findSimmilarStatus = function(emp) {
    return mongoose.model('Employee').find({active: this.active}, emp)
}

// Static Function
// Find by Status
employeeSchema.statics.findByStatus = function(status){
    if(status === /active/i) status = true;
    if(status === /inactive/i) status = false;
    return this.findOne({active: status})
}
// Find By Name
employeeSchema.statics.findByName = function(name){
    return this.findOne({$or: [{firstName: name}, {lastName: new RegExp(name, 'i')}]})
}
// Find By role
employeeSchema.statics.findByRole = function(roles){
    return this.findOne({role: new RegExp(roles, 'i')})
}

// Qurey Helpers
employeeSchema.query.byName = function(name){
    return this.where({$or: [{firstName: new RegExp(name, 'i')}, {lastName: new RegExp(name, 'i')}]})
}
// By Role
employeeSchema.query.byRole = function(roles){
    return this.where({role: new RegExp(roles, 'i')})
}
// By Status
employeeSchema.query.byStatus = function(status){
    if(status === /active/i) status = true;
    if(status === /inactive/i) status = false;
    return this.find({active: status})
}

// Exporting Model
module.exports = mongoose.model('Employee', employeeSchema);