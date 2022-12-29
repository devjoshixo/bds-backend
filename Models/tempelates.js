const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempelateSchema = new Schema({
    tempelateNo: {
        type: Number,
    },
    tempelatesBody: {
        type: String,
    },
    Attachment: {
        type: String,
    },
    UnSubscribeLink: {
        type: Boolean
    },
    SendType: {
        type: String,
    },
    PersonalisedAttachment: {
        type: Boolean
    },
    ButtonOption: {
        type: Boolean
    },
    Header: {
        type: String
    },
    Buttons: {
        type: String
    },
    Footer: {
        type: String
    },
    ButtonPreview: {
        type: String
    },
    Api: {
        type: String
    }
})

const Tempelates = mongoose.model("Tempelates", tempelateSchema)

module.exports = Tempelates