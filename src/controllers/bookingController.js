const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bookSeat = async (req, res) => {
  const { trainId, seats } = req.body;
  const userId = req.user.id;

  try {
    const booking = await prisma.$transaction(async (tx) => {
      const train = await tx.train.findUnique({
        where: { id: trainId },
        include: { bookings: true },
      });

      if (!train) {
        throw new Error("Train not found");
      }

      const bookedSeats = train.bookings.reduce(
        (acc, booking) => acc + booking.seats,
        0
      );
      const availableSeats = train.totalSeats - bookedSeats;

      if (availableSeats < seats) {
        throw new Error("Not enough seats available");
      }

      const newBooking = await tx.booking.create({
        data: {
          userId,
          trainId,
          seats,
        },
      });

      return newBooking;
    });

    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getBookingDetails = async (req, res) => {
  const bookingId = parseInt(req.params.id);
  const userId = req.user.id;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { train: true },
  });
  if (!booking || booking.userId !== userId) {
    return res.status(404).json({ error: "Booking not found" });
  }
  res.json(booking);
};

module.exports = { bookSeat, getBookingDetails };
