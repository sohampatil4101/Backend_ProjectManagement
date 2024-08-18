const mongoose =require("mongoose")
// const connectToMongo = ()=>{ mongoose.connect("mongodb://0.0.0.0:27017/projectmanagement",{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(()=>{ 
    console.log("Database connected successfully!!!");          
})
.catch((e)=>{
    console.log("Database connection Failed, Error is:",e);
})
}



module.exports = connectToMongo;    


// 0xIbJjZwqTpHoPm9
