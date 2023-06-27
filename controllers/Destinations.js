const Destinations = require("../models/Destinations");
const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, BadRequestError, NotFoundError } = require("../errors");

const getAllDestinations = async (req, res) => {
  const destinationsList = await Destinations.find({createdBy: req.user.userId}).sort("country");
  res
    .status(StatusCodes.OK)
    .json({ destinationsList, count: destinationsList.length });
};
const getDestination = async (req, res) => {
  const {
    user: { userId },
    params: { id: destinationId },
  } = req;

  const destination = await Destinations.findOne({
    "destinations._id": destinationId,
    createdBy: userId,
  });

  if (!destination)
    throw new NotFoundError(`No destination with id ${destinationId}`);

  res.status(StatusCodes.OK).json(destination);
};
const addDestination = async (req, res) => {
  const createdBy = req.user.userId;
  var { country, name, img, rating, description } = req.body;
  var countryDoc = await Destinations.findOne({
    country,
    createdBy,
  })
  rating = Number(rating);
  if (countryDoc) {
    countryDoc.destinations[countryDoc.destinations.length] = {
      name,
      img,
      rating,
      description,
    };
    var destination = await Destinations.findOne({
      country,
      "destinations.name": name,
      createdBy,
    });
    if (destination)
      throw new CustomAPIError("a destination with duplicate name exist");
    countryDoc = await Destinations.findOneAndUpdate(
      { country: country },
      countryDoc,
      { new: true, runValidators: true }
    );
    return res.status(StatusCodes.CREATED).json(countryDoc);
  }
  countryDoc = await Destinations.create({
    country,
    destinations: [{ name, img, rating, description }],
    createdBy,
  });
  res.status(StatusCodes.CREATED).json(countryDoc);
};
const updateDestination = async (req, res) => {
  var {
    body: { name, img, rating, description },
    user: { userId },
    params: { id: destinationId },
  } = req;
  if (name === "" || img === "" || rating === "")
    throw new BadRequestError("name or image or rating fields cannot be empty");
  rating = Number(rating);

  const destination = await Destinations.findOneAndUpdate(
    {
      "destinations._id": destinationId,
      createdBy: userId,
    },
    {
      $set: {
        destinations: {
          _id: destinationId,
          name,
          img,
          rating,
          description,
        },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ destination });
};
const deleteDestination = async (req, res) => {
  const {
    user: { userId },
    params: { id: destinationId },
  } = req;

  var destination = await Destinations.findOneAndUpdate(
    { "destinations._id": destinationId, createdBy: userId },
    { $pull: { destinations: { _id: destinationId } } },
    { new: true, runValidators: true }
  );
  if (!destination)
    throw new NotFoundError(`No destination with id ${destinationId}`);
  if (destination.destinations.length == 0) {
    const country = destination.country;
    await Destinations.findOneAndRemove({ country ,
    createdBy:userId})
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllDestinations,
  getDestination,
  addDestination,
  updateDestination,
  deleteDestination,
};
