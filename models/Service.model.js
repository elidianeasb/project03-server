const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
    {
        type: String,
        name: String,
        price: Number,
        description: String,
        book: { type: Schema.Types.ObjectId, ref: 'Book'}
    }
)

module.exports = model("Service", serviceSchema)