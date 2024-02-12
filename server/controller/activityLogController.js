const ActivityLog = require('../model/ActivityLog');
const asyncErrorHandler = require('../util/asyncErrorHandler');
const ApiFeactures = require('../util/ApiFeatures');

exports.getAllActivityLogs = asyncErrorHandler(async (req, res, next) => {
  const features = new ApiFeactures(ActivityLog.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const activityLogs = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      activityLogs,
    },
  });
});
