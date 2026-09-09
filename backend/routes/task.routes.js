const express = require("express");

const router = express.Router();

const Task = require("../models/task.model");


// GET ALL TASKS

router.get("/", async (req, res) => {

    try {

        const tasks = await Task.find().sort({
            createdAt: -1
        });

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: "Failed to get tasks",
            error: error.message
        });

    }

});


// GET ONE TASK

router.get("/:id", async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        res.json(task);

    } catch (error) {

        res.status(500).json({
            message: "Failed to get task",
            error: error.message
        });

    }

});


// CREATE TASK

router.post("/", async (req, res) => {

    try {

        const task = await Task.create(req.body);

        res.status(201).json({
            message: "Task created successfully",
            task: task
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to create task",
            error: error.message
        });

    }

});


// UPDATE TASK

router.put("/:id", async (req, res) => {

    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        res.json({
            message: "Task updated successfully",
            task: task
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to update task",
            error: error.message
        });

    }

});


// DELETE TASK

router.delete("/:id", async (req, res) => {

    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete task",
            error: error.message
        });

    }

});


module.exports = router;