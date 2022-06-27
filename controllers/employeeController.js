const Employee = require('../models/employee')

// Read All
exports.index = async (req, res) => {
    // console.log(req.protocol)// `http` - Protocol [type: String]
    // console.log(req.hostname)// `localhost` - only hostname [type: String]
    // console.log(req.get('host'))// `localhost:5000` - hostname with PORT [type: String]
    // console.log(req.originalUrl)//` /api/employees` - request URL [type: String]  
    // console.log(req.baseUrl)// `/api/employees` - request URL [type: String]  
    // console.log(req.params)// `{}` - URL Parameters [type: Object] 
    // console.log(req.query)// `{}` - URL Query Parameters [type: Object]
    // console.log(req.body)// `{}` - Body Sent With request [type: Object]
    // console.log(req.ip)// `::1` - Request IP [type: String]
    // console.log(req.ips)// `[]` - Request IP if with proxies and reidrects [type: Array]
    // console.log(req.path)// `/` - Path of URL requested [type: String] 
    // console.log(req.method)// `GET` - Request Type Method [type: String]
    // console.log(req.rawHeaders)// [ 'User-Agent','PostmanRuntime/7.29.0','Accept','*/*','Postman-Token','a897d7f2-a69c-4244-a00c-4d337626879b','Host','localhost:5000','Accept-Encoding','gzip, deflate, br','Connection','keep-alive']
    // // - All Headers sent with Request [type: Array]
    // console.log(req.subdomains)// `[]` - Subdomains of Request [type: Array]
    // console.log(req.route)// Route {path: '/',stack: [Layer {handle: [AsyncFunction (anonymous)],name: '<anonymous>',params: undefined,path: undefined,keys: [],regexp: /^\/?$/i, method: 'get'}],methods: { get: true }}
    // // - Get Currently matched Routes [type: Route Object]
    // console.log(req.cookies)// `undefined` - Cookies Sent by Object [type: String]
    // console.log(req.get('Content-Type')) // `undefined` - Request header feild Conten-Type [type: String]
    // console.log(req.get('User-Agent'))// `PostmanRuntime/7.29.0` Request header feild User-Agent(Request Host) [type: String]
    // console.log(req.get('Referrer'))
    let allEmp = await Employee.find()
    res.json(allEmp)
}

// Create
exports.create = async (req, res) => {
    // console.log(req.body)
    let emp = {
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        age: req.body.age, 
        phone: req.body.phone, 
        role: req.body.role,
        active: true,
        joinDate: Date.now()
    }
    await Employee.insertMany([emp], (err, emp) => {
        if(err){
            return res.json(err)
        }else{
            res.json({msg:"Employee Added", emp})
        }
    });
}

// Update
exports.update = async(req, res) => {
    let emp = []
    try{
        emp = await findQuery(req)
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Error, Bad Request"})
    }
    // console.log(emp)
    let upEmp = emp
    // console.log(emp)
    Employee.updateOne(emp, {
        $set: {
                firstName: req.body.firstName ? req.body.firstName : upEmp.firstName,
                lastName : req.body.lastName ? req.body.lastName : upEmp.lastName,
                age : req.body.age ? req.body.age : upEmp.age,
                phone : req.body.phone ? req.body.phone : upEmp.phone,
                role : req.body.role ? req.body.role : upEmp.role,
                active : req.body.active ? req.body.active : upEmp.active,
                joinDate : req.body.joinDate ? req.body.joinDate : (upEmp.joinDate ? upEmp.joinDate : null),
                leavingDate : req.body.leavingDate ? req.body.leavingDate : (upEmp.leavingDate ? upEmp.leavingDate : null),
                updatedAt : Date.now()
        }
    }, (err, emp) => {
        if(err){
            return res.status(500).send("Bad Request")
        }else{
            return res.json({msg: "Updated Object"})
        }
    })
}

// Delete
exports.del = async (req, res) => {
    let emp = []
    try{
        emp = await findQuery(req)
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Error, Bad Request"})
    }
    emp = emp
    Employee.deleteOne(emp, (err, emp) => {
        if(err){
            return res.status(500).json({msg:"Bad Request"})
        }else{
            return res.json({msg: "Object Deleted"})
        }
    })
}

exports.getQuery = async (req, res) => {
    try{
        let emp = await findQueryAll(req)
        res.json(emp)
    }catch(err){
        console.log(err)
        res.status(500).json({msg: "Error, Bad Request"})
    }

}


function findQuery(req){
    return new Promise(async (resolve, reject) => {
        // console.log(req.query)
        let qParams = req.query;
        let emp = [];
        try{
            if('name' in qParams){
                emp = await Employee.findByName(qParams['name'])
                // console.log('name')
            }else if('role' in qParams){
                emp = await Employee.findByRole(qParams['role'])
                // console.log('role')
            }else if('status' in qParams){
                emp = await Employee.findByStatus(qParams['status'])
                // console.log('status')
            }else{
                emp = await Employee.findOne(qParams)
                // console.log('else')
            }
            resolve(emp)
        }catch(err){
            reject(err)
        }
       
    });
    
}
function findQueryAll(req){
    return new Promise(async (resolve, reject) => {
        // console.log(req.query)
        let qParams = req.query;
        let emp = [];
        try{
            if('name' in qParams){
               emp = await Employee.find().byName(qParams['name'])
            //    console.log('name')
            }else if('role' in qParams){
                emp = await Employee.find().byRole(qParams['role'])
                // console.log('role')
            }else if('status' in qParams){
                emp = await Employee.find().byStatus(qParams['status'])
                // console.log('status')
            }else{
                emp = await Employee.find(qParams)
                // console.log('else')
            }
            resolve(emp)
        }catch(err){
            reject(err)
        }
       
    });
    
}