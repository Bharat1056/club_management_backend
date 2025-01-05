import { defaultPaginateValue } from "../constants/constant.js";

const queryAdminMiddleware = (Model, type="club", modelPath="club") => async (req, res, next) => {
  try {
    const {
      filter = "{}",
      limit = defaultPaginateValue,
      offset = 0,
      sort = "{}",
      fields = null,
    } = req.query;



    const clubId = req[type]._id;

    // Parse the filter and sort strings into objects
    const parsedFilter = JSON.parse(filter);
    const filterObj = { [modelPath]: clubId, ...parsedFilter };
    const sortObj = JSON.parse(sort);
    const fieldsObj = fields ? fields.split(",").join(" ") : null;

    const query = Model.find(filterObj).select(fieldsObj).sort(sortObj);
    const countQuery = Model.find(filterObj).select(fieldsObj).sort(sortObj);
    const count = await countQuery.countDocuments();

    query.skip(parseInt(offset)).limit(parseInt(limit));
    const results = await query;

    res.paginate = {
      count: count,
      offset: parseInt(offset),
      limit: parseInt(limit),
      data: results,
    };

    next();
  } catch (error) {
    console.log(JSON.stringify(error)); // Corrected to JSON.stringify
    next(error);
  }
};

export default queryAdminMiddleware;
