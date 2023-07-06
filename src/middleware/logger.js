'use strict';

module.exports = (req,res,next) => {
  console.log(`Hello, welcome traveler ${req.path}`);
  next();
};