var router = require('express').Router();
var PRESIDENTCLASS = require('../mongodb/mongoose_connection');
module.exports = router;

router.get('/', do_homepage);

function do_homepage(req, res) {
    console.log('doing homepage');
    res.render('index');
}

// routes for html controls eg dropdowns, radiosbuttons, checkboxes etc
router.get('/api/v4/partydropdown', partydropdown);

function partydropdown(req, res) {
    console.log('getting unique party list');
    PRESIDENTCLASS.find().distinct('party').then(function (party) {
        console.log(party);
        res.json(party);
    })
}
//api

router.get('/api/v4/read', do_read);
router.post('/api/v4/create', do_create);
router.put('/api/v4/update', do_update);
router.delete('/api/v4/delete/:_id', do_delete);

function do_read(req, res) {
    console.log('reading all data');
    PRESIDENTCLASS.find().then(function (results) {
        console.log(results);
        res.json(results);
    });
}

function do_create(req, res) {
    console.log('creating president');
    console.log(req.body);

    var data = {
        number: req.body.number,
        president: req.body.president,
        birth_year: req.body.birth_year,
        death_year: req.body.death_year,
        took_office: req.body.took_office,
        left_office: req.body.left_office,
        party: req.body.party
    }

    var president = new PRESIDENTCLASS(data);
    president.save().then(function (result) {
        console.log(result);
        res.json({
            message: 'backend saved!'
        });
    });
}

function do_update(req, res) {
    console.log('updating president');
    console.log(req.body);

    var update = {
        $set: {
            number: req.body.number,
            president: req.body.president,
            birth_year: req.body.birth_year,
            death_year: req.body.death_year,
            took_office: req.body.took_office,
            left_office: req.body.left_office,
            party: req.body.party
        }
    }
    PRESIDENTCLASS.findByIdAndUpdate(req.body._id, update).then(function (result) {
        console.log(result);
        res.json({
            message: 'backend updated!'
        });
    });
}

function do_delete(req, res) {
    console.log('deleting president');
    console.log(req.params);
   PRESIDENTCLASS.findByIdAndRemove(req.params._id).then(function (result) {
        console.log(result);
        res.json({
            message: 'deleted!'
        });
    });
}