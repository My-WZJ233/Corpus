var fs = require('fs')
var mongoose =require('mongoose')
var dbPath = './database/db.json'

exports.find = function(callback) {
    fs.readFile(dbPath, 'utf8', function(err,data) {
        if (err) { 
            return callback(err)
        }
        callback(null,JSON.parse(data).CorpusData)
        // console.log(data)
    })
}

// 根据id获取信息
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function(err,data) {
        if (err) { 
            return callback(err)
        }
        var CorpusData = JSON.parse(data).CorpusData
        var ret = CorpusData.find(function (item) {
            return item.id === parseInt(id)
        })
        callback(null, ret)
    })
}

// 保存数据
exports.save = function(Corpus, callback) {
    fs.readFile(dbPath, 'utf8', function(err,data) {
        if (err) { 
            return callback(err)
        }

        var CorpusData = JSON.parse(data).CorpusData

        Corpus.id = CorpusData[CorpusData.length - 1].id + 1
        // console.log(Corpus.id);
        CorpusData.push(Corpus)

        // 数据转换
        var fileData = JSON.stringify({
            CorpusData:CorpusData
        })

        // 保存到文件
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) { 
                return callback(err)
            }
            callback(null)
        })
    })
}

// 更新数据
exports.updateById = function(Corpus, callback) {
    fs.readFile(dbPath, 'utf8', function(err,data) {
        if (err) { 
            return callback(err)
        }
        var CorpusData = JSON.parse(data).CorpusData
        
        Corpus.id = parseInt(Corpus.id)

        // 找出要修改的数据
        var search = CorpusData.find(function (item) {
            return item.id === Corpus.id
        })

        // 遍历
        for (var key in Corpus) {
            search[key] = Corpus[key]
        }

        var fileData = JSON.stringify({
            CorpusData:CorpusData
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) { 
                return callback(err)
            }
            callback(null)
        })
    })
}

// 删除
exports.deleteById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function(err,data) {
        if (err) { 
            return callback(err)
        }

        var CorpusData = JSON.parse(data).CorpusData

        // findIndex 根据条件查找元素的下标
        var deleteId = CorpusData.findIndex(function (item) {
            return item.id === parseInt(id)
        })

        // 根据下标从数组中删除对应的对象
        CorpusData.splice(deleteId, 1)

        var fileData = JSON.stringify({
            CorpusData: CorpusData
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) { 
                return callback(err)
            }
            callback(null)
        })
    }) 
}
