const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const axios = require("axios");
const util = require("../common/util.js");

// Review model
const Review = require('../models/Review');

// Load Validation
const validateReviewInput = require('../validation/review');

// @route   GET review/test
// @desc    Tests Review route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Review Works' });
});



// @route   GET review/:id/:userEmail
// @desc    Get review by id and userEmail
// @access  Public
router.get('/:id/:userEmail', (req, res) => {
  const id = req.params.id;
  const userEmail = req.params.userEmail;
  console.log('Get Review with userEmail ', userEmail);
  util.connectDatabaseByUserEmail(userEmail, () => {
    Review.findById(id)
      .then(review => {
        res.json(review);
      })
      .catch(err => {
        errors = {
          code: 404,
          message: 'There are no Review',
        }
        res.status(404).json(errors);
      }
      );
  });
});

// @route   GET review totalpoint : /:revieweeId/:userEmail
// @desc    Get review totalpoint 
// @access  Public
router.get('/totalpoint/:revieweeId/:userEmail', (req, res) => {
  const revieweeId = req.params.revieweeId;
  const userEmail = req.params.userEmail;
  console.log('Get Review point with userEmail ', userEmail);
  util.connectDatabaseByUserEmail(userEmail, () => {
    var filter = {
      revieweeId: revieweeId,
    };
    Review.find(filter)
      .then(reviews => {
        //ttt calculate here!!!

        var totalReviewResult = {
          revieweeId: revieweeId,
          point: 2.3,
          ratings: 14,
        };
        res.json(totalReviewResult);
      })
      .catch(err => {
        errors = {
          code: 404,
          message: 'There are no Review',
        }
        res.status(404).json(errors);
      }
      );
  });
});
// @route   GET by reviewee: /:revieweeType/:revieweeId/:reviewerId/:userEmail
// @desc    Get review by id and userEmail
// @access  Public
router.get('/reviewee/:revieweeType/:revieweeId/:reviewerId/:userEmail', (req, res) => {
  const revieweeType = req.params.revieweeType;
  const revieweeId = req.params.revieweeId;
  const reviewerId = req.params.reviewerId;
  const userEmail = req.params.userEmail;
  console.log('Get Review by reviewee with userEmail ', userEmail);
  util.connectDatabaseByUserEmail(userEmail, () => {
    var filter = {
      revieweeType: revieweeType,
      revieweeId: revieweeId,
      reviewerId: reviewerId,
    };
    Review.findOne(filter)
      .then(review => {
        res.json(review);
      })
      .catch(err => {
        errors = {
          code: 404,
          message: 'There are no Review',
        }
        res.status(404).json(errors);
      }
      );
  });
});


// @route   POST review
// @desc    Add review 
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const id = req.body._id;
    const userEmail = req.body.userEmail;
    util.connectDatabaseByUserEmail(userEmail, () => {

      const { errors, isValid } = validateReviewInput(req.body);
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }

      if (id === undefined) {
        //create new review
        const newReview = new Review({
          revieweeType: req.body.revieweeType,
          revieweeId: req.body.revieweeId,
          point: req.body.point,
          comment: req.body.comment,
          reviewerId: req.body.reviewerId,
          createdDate: req.body.createdDate,
        });
        console.log('new review ', newReview);
        newReview.save()
          .then(review => res.json(review))
          .catch(err => res.status(404).json({ reviewnotfound: 'Can not create' }));
      }
      else {
        //update review
        const reviewFields = {};

        if (req.body.revieweeType)
          reviewFields.revieweeType = req.body.revieweeType;
        if (req.body.revieweeId)
          reviewFields.revieweeId = req.body.revieweeId;
        if (req.body.point)
          reviewFields.point = req.body.point;
        if (req.body.comment)
          reviewFields.comment = req.body.comment;
        if (req.body.reviewerId)
          reviewFields.reviewerId = req.body.reviewerId;
        if (req.body.createdDate)
          reviewFields.createdDate = req.body.createdDate;

          console.log('update review ', reviewFields);

          Review.findOneAndUpdate(
          { _id: id },
          { $set: reviewFields },
          { new: true }
        ).then(review => res.json(review));
      }
    });
  }
);

// @route   DELETE api/review/:id
// @desc    Delete review
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
      Review.findOne(filter)
        .then(review => {
          // Delete
          console.log('found ', review);
          review.remove().then(() => res.json({ success: true }));
        })
        .catch(err => {
          errors = {
            code: 404,
            message: 'There are no review',
          }
          res.status(404).json(errors);
        }
        );
    });
  });

module.exports = router;