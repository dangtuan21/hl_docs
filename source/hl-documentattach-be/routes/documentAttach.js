const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const axios = require("axios");
const util = require("../common/util.js");

// DocumentAttach model
const DocumentAttach = require('../models/DocumentAttach');

// Load Validation
const validateDocumentAttachInput = require('../validation/documentAttach');

// @route   GET documentAttach/test
// @desc    Tests DocumentAttach route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'DocumentAttach Works' });
});

// @route   GET documentAttach/search/:searchTerm/:userEmail
// @desc    Search documentAttach
// @access  Public
router.get('/search/:searchTerm/:userEmail',
  (req, res) => {
    const searchTerm = req.params.searchTerm;
    const userEmail = req.params.userEmail;

    const errors = {};
    const PAGE_LIMIT = require('../config/constants').PAGE_LIMIT;
    util.connectDatabaseByUserEmail(userEmail, (err) => {
      if (err) {
        console.log('Err connectDatabaseByUserEmail ', err);
        return res.status(404).json(err);
      }
      console.log('connectDatabaseByUserEmail: Connected to DB with userEmail ', userEmail);

      var filter = {};

      if (searchTerm != '*') {
        filter = {
          $or: [
            { name: { "$regex": searchTerm, "$options": "i" } },
            { code: { "$regex": searchTerm, "$options": "i" } },
          ]
        };
      }

      console.log('filter ', filter);
      DocumentAttach.find(filter)
        .sort({ 'createdDate': -1 })
        .limit(PAGE_LIMIT)
        .then(documentAttachs => {
          if (!documentAttachs) {
            errors = {
              code: 404,
              message: 'There are no documentAttachs',
            }
            console.log(errors.message);
            return res.status(404).json(errors);
          }
          res.json(documentAttachs);
        })
        .catch(err => {
          errors = {
            code: 404,
            message: 'There are no documentAttachs',
          }
          res.status(404).json(errors);
        }
        );
    });
  });

// @route   GET documentAttach/:id/:userEmail
// @desc    Get documentAttach by id and userEmail
// @access  Public
router.get('/:id/:userEmail', (req, res) => {
  const id = req.params.id;
  const userEmail = req.params.userEmail;
  console.log('Get DocumentAttach with userEmail ', userEmail);
  util.connectDatabaseByUserEmail(userEmail, () => {
    DocumentAttach.findById(id)
      .populate('lesson', ['code', 'name', 'category', 'sections'])
      .then(documentAttach => {
        console.log('Found documentAttach: ', documentAttach);
        res.json(documentAttach);
      })
      .catch(err => {
        console.log('Err: ', err);
        errors = {
          code: 404,
          message: 'There are no documentAttachs',
        }
        res.status(404).json(errors);
      }
      );
  });
});

// @route   POST documentAttach
// @desc    Add documentAttach 
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const id = req.body._id;
    const userEmail = req.body.userEmail;
    util.connectDatabaseByUserEmail(userEmail, () => {

      const { errors, isValid } = validateDocumentAttachInput(req.body);
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }

      if (id === undefined) {
        //create new documentAttach
        const newDocumentAttach = new DocumentAttach({
          url: req.body.url,
          documentType: req.body.documentType,
          description: req.body.description,
          code: req.body.code,
          name: req.body.name,
          sourceId: req.body.sourceId,
          createdDate: req.body.createdDate,
        });
        console.log('newDocumentAttach ', newDocumentAttach)
        newDocumentAttach.save()
          .then(documentAttach => res.json(documentAttach))
          .catch(err => res.status(404).json({ documentAttachnotfound: 'Can not create' }));
      }
      else {
        //update documentAttach
        const documentAttachFields = {};

        if (req.body.url)
          documentAttachFields.url = req.body.url;
        if (req.body.description)
          documentAttachFields.description = req.body.description;
        if (req.body.documentType)
          documentAttachFields.documentType = req.body.documentType;
        if (req.body.code)
          documentAttachFields.code = req.body.code;
        if (req.body.name)
          documentAttachFields.name = req.body.name;
        if (req.body.sourceId)
          documentAttachFields.sourceId = req.body.sourceId;
        if (req.body.createdDate)
          documentAttachFields.createdDate = req.body.createdDate;

        DocumentAttach.findOneAndUpdate(
          { _id: id },
          { $set: documentAttachFields },
          { new: true }
        ).then(documentAttach => res.json(documentAttach));
      }
    });
  }
);

// @route   DELETE api/documentAttach/:id
// @desc    Delete documentAttach
// @access  Private
router.delete(
  '/:id/:userEmail',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const id = req.params.id;
    const userEmail = req.params.userEmail;
    console.log('delete with id + userEmail ', id, userEmail);

    util.connectDatabaseByUserEmail(userEmail, () => {
      var filter = {
        _id: id,
      };

      console.log('delete with filter ', filter);
      DocumentAttach.findOne(filter)
        .then(documentAttach => {
          // Delete
          console.log('found ', documentAttach);
          documentAttach.remove().then(() => res.json({ success: true }));
        })
        .catch(err => {
          errors = {
            code: 404,
            message: 'There are no documentAttachs',
          }
          res.status(404).json(errors);
        }
        );
    });
  });

module.exports = router;