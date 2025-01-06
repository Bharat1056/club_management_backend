
import mongoose from "mongoose";
import { defaultPaginateValue } from "../constants/constant.js";

const queryMiddleware = (Model, modelPath) => async (req, res, next) => {
  try {
    const {
      filter = "{}",
      limit = defaultPaginateValue,
      offset = 0,
      sort = "{}",
      fields = null,
    } = req.query;

    const { id } = req.params;
    const trimmedId = id.trim();

    // Check if the modelPath corresponds to an ObjectId and cast the ID if necessary
    const filterObj = {
      [modelPath]: mongoose.Types.ObjectId.isValid(trimmedId)
        ? new mongoose.Types.ObjectId(trimmedId)
        : trimmedId,
      ...JSON.parse(filter),
    };

    const sortObj = JSON.parse(sort);
    const fieldsObj = fields ? fields.split(",").join(" ") : null;

    // Create the query
    const query = Model.find(filterObj).select(fieldsObj).sort(sortObj);

    // Apply pagination (skip and limit) after the query has been built
    query.skip(parseInt(offset)).limit(parseInt(limit));

    // Execute the query
    const results = await query;
    const count = await Model.countDocuments(filterObj);

    // Attach pagination results to the response
    res.paginate = {
      count: count,
      offset: parseInt(offset),
      limit: parseInt(limit),
      data: results,
    };

    next();
  } catch (error) {
    console.error("Error in queryMiddleware:", error);
    res.paginate = { count: 0, offset: 0, limit: 0, data: [] }; // Fallback
    next(error);
  }
};

export default queryMiddleware;
