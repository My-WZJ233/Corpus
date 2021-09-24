var Login = require('./login')
// var Corpus = require('./Corpus')
var Corpus = require('./CorpusData')

var express = require('express')
const { parse } = require('path')

var router = express.Router()

router.get('/Corpus/login', function(req, res) {
	Login.loginfind(function(err,login) {
		if (err) {
			return res.status(500).send('Error.');
		}
		res.render('login.html',{
			login: login
		})	
	})
})

router.post('/Corpus/login', function(req,res) {
	Login.loginfind(function(err,login) {
		let data = req.body

		if (data.inputId == 'root' && data.inputPassword == '123456') {
			res.redirect('/Corpus')
			
			// Login不能不引文件 里面东西可以省略 但方法就没法用了
			// var url=req.url
			// if(url=='/Corpus/login') {
			// 	res.redirect('/Corpus')
			// }

		} else if (data.inputId == '123' && data.inputPassword == '123456') {
			res.redirect('/CorpusUser')
		} else {
			// Login.alert()
		}
	})
})

router.get('/Corpus', function(req, res) {
	/* Corpus.find(function(err, Corpus) {
		if(err){
			return res.status(500).send('Error.')
		}
		res.render('Corpus.html', {
			Corpus: Corpus
		})	
	}) */

	if (req.query.name != null && req.query.name != undefined && req.query.name != '') {
	//Corpus.findOne({name: '/'+req.query.name.replace(/"/g, '')+'/'}, function (err, Corpus) {
		let CorpusSearch = req.query.name.replace(/"/g, '')
		let str = ".*"+CorpusSearch+".*$"
		let reg = new RegExp(str)

		Corpus.find({name:{$regex:reg, $options: 'i'}}, function (err, Corpus) {
			if (err) {
				return res.status(500).send('Server error');
			}
			// console.log(Corpus)
			if (Corpus == undefined) {
				res.render('Corpus.html', {
					count: 0,
					Corpus: Corpus
				})
			} else {
				let str = JSON.stringify(Corpus)
				Corpus = JSON.parse(str)
				res.render('Corpus.html', {
					count: 1,
					Corpus: Corpus	
				})
			}
		})
	} else {
		Corpus.find(function (err, CorpusData) {
			if (err) {
				return res.status(500).send('Server error');
			}
			if (CorpusData.length >= 3) {
				var top = [
					CorpusData[0],
					CorpusData[1],
					CorpusData[2],
				]
			}
			res.render('Corpus.html', {
				top: top,
				Corpus: CorpusData
			})
		})
	}
}) 

// 普通用户
router.get('/CorpusUser', function(req, res) {
	Corpus.find(function(err, Corpus) {
		if (err) {
			return res.status(500).send('Error.')
		}
		res.render('CorpusUser.html', {
			Corpus: Corpus
		})	
	})
})


router.get('/Corpus/new', function(req, res) {
	res.render('new.html')
})

router.post('/Corpus/new', function(req, res) {
	// Corpus.save(req.body, function (err) {
	new Corpus(req.body).save(function (err) {
		if (err) {
			return res.status(500).send('Error')
		}
		res.redirect('/Corpus')
	})
})

// 编辑
router.get('/Corpus/edit', function(req, res) {
	// console.log(req.query.id)
	// Corpus.findById(parseInt(req.query.id), function (err, Corpus) {
	Corpus.findById(req.query.id.replace(/"/g,''), function (err, Corpus) {
		if (err) {
			return res.status(500).send('Error')
		}
		res.render('edit.html', {
			Corpus: Corpus
		})
	})
})

// 更新信息
router.post('/Corpus/edit', function(req, res) {
	// console.log(req.body)
	var id = req.body.id.replace(/"/g,'')
	// Corpus.updateById(req.body, function (err) {
	Corpus.findByIdAndUpdate(id,req.body,function(err) {
		if (err) {
			return res.status(500).send('Error')
		}
		res.redirect('/Corpus')
	})
})

// 删除
router.get('/Corpus/delete', function(req, res) {
	var id = req.query.id.replace(/"/g,'')
	// Corpus.deleteById(req.query.id, function (err) {
	Corpus.findByIdAndRemove(id,function(err) {
		if (err) {
			return res.status(500).send('Error')
		}
		res.redirect('/Corpus')
	})
})

// router.post('/search', (req,res) => {})

module.exports = router
