import Joi from 'joi'

const id = Joi.number()
const title = Joi.string().min(5).max(255)
const done = Joi.boolean()

const createTaskSchema = Joi.object({
    title: title.required(),
    done: done.optional()
});

const updateTaskSchema = Joi.object({
    title: title.optional(),
    done: done.optional()
});

const getTaskSchema = Joi.object({
    id: id.required()
});

export {
    createTaskSchema,
    updateTaskSchema,
    getTaskSchema
}