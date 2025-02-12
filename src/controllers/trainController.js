const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addTrain = async (req, res) => {
  const { trainNumber, source, destination, totalSeats } = req.body;
  const train = await prisma.train.create({
    data: {
      trainNumber,
      source,
      destination,
      totalSeats,
    },
  });
  res.json(train);
};

const getSeatAvailability = async (req, res) => {
  const { source, destination } = req.query;
  const trains = await prisma.train.findMany({
    where: {
      source,
      destination,
    },
    include: {
      bookings: true,
    },
  });
  const trainsWithAvailability = trains.map((train) => {
    const bookedSeats = train.bookings.reduce(
      (acc, booking) => acc + booking.seats,
      0
    );
    return {
      ...train,
      availableSeats: train.totalSeats - bookedSeats,
    };
  });
  res.json(trainsWithAvailability);
};

module.exports = { addTrain, getSeatAvailability };
