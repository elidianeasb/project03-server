const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const bookSchema = new Schema(
  {
    service: { 
      type: Schema.Types.ObjectId, 
      ref: "Service",
      required: [true, "Service is required."]
    },
    hour: {
      type: String,
      required: [true, "Hour is required."],
    },
    date: {
      type: Date,
      required: [true, "Password is required."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "User is required."]
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'canceled'],
      default: 'pending'
    },
  },
  {
    timestamps: true,
  }
);

const Book = model("Book", bookSchema);

module.exports = Book;
