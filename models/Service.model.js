const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
    {
        type: String,
        name: String,
        price: String,
        description: String,
        duration: String,
        book: { type: Schema.Types.ObjectId, ref: 'Book'}
    }
)

module.exports = model("Service", serviceSchema)