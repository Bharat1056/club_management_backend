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

    const filterObj = JSON.parse({ [modelPath]: clubId, ...filter });
    const sortObj = JSON.parse(sort);
    const fieldsObj = fields ? fields.split(",").join(" ") : null;

    const query = await Model.find(filterObj).select(fieldsObj).sort(sortObj);
    const countQuery = await Model.find(filterObj).select(fieldsObj).sort(sortObj);
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
    console.log(json.stringify(err));
    next(error);
  }
};

export default queryAdminMiddleware;
