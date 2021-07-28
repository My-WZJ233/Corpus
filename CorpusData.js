var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Corpus',{useUnifiedTopology: true})

// itcast 要连接的数据库

var Schema = mongoose.Schema

CorpusDataSchema= new Schema({

    name:{
        type:String,
        require:true
    },
    source:{
        type:String
    },
    type:{
        type:String
    },
    language:{
        type:String
    },
    class:{
        type:String
    },
})

//直接导出模型构造函数
module.exports = mongoose.model('Corpus',CorpusDataSchema)
