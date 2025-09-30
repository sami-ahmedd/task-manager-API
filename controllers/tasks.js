const Task = require('../models/task')
const asnycWrapper = require('../middleware/async')

const getAllTasks = asnycWrapper( async (req,res)=>{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
})

const createTask = asnycWrapper( async (req,res) => {
        const task = await Task.create(req.body)
        res.status(201).json({task})
})

const getTask = asnycWrapper( async (req,res) => {

        const {id :taskID} = req.params
        const task = await Task.findOne({_id : taskID})

    if(!task){
        return res.status(404).json({msg : `no task with id : ${taskID}`})
    }
    res.status(200).json(task)
})

const updateTask = asnycWrapper( async  (req,res) => {
        const taskID = req.params.id
        const task = await Task.findOneAndUpdate({_id : taskID}, req.body , {
            new : true , 
            runValidators : true
        })
        if(!task){
        return res.status(404).json({msg : `no task with id : ${taskID}`})
        }
        res.status(404).json({task})
})

const deleteTask = asnycWrapper( async (req,res) => {
        const taskID= req.params.id
        const task = await Task.findOneAndDelete({_id : taskID})
    if (!task){
         return res.status(404).json({msg : `no task with id : ${taskID}`})
    }
    res.status(200).json({task})
})

module.exports = {
    getAllTasks ,
    createTask,
    updateTask,
    getTask,
    deleteTask
}