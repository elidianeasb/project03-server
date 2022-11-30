const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const bookSchema = new Schema(
  {
    local: {
      type: String,
      required: [true, "Local is required."],
    },
    date: {
      type: Date,
      required: [true, "Password is required."],
    },
    service: { 
      type: Schema.Types.ObjectId, 
      ref: "Service",
      required: [true, "Service is required."]
    },
    contact: {
      type: Number,
      required: [true, "Contact is required."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "User is required."]
    },
    status: String
  },
  {
    timestamps: true,
  }
);

const Book = model("Book", bookSchema);

module.exports = Book;
