const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        dueDate: {
            type: String,
            required: true
        },

        priority: {
            type: String,
            enum: ["High", "Medium", "Low"],
            default: "Medium"
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);