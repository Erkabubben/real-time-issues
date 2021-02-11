/**
 * Routes for the Users collection (RESTful).
 *
 * @author Erik Lindholm <elimk06@student.lnu.se>
 * @author Mats Loock
 * @version 1.0.0
 */

import express from 'express'
import { TasksController } from '../controllers/tasks-controller.js'

export const router = express.Router()

const controller = new TasksController()

// Map HTTP verbs and route paths to controller actions.
router.get('/', controller.index)

//router.get('/new', controller.new)
//router.post('/create', controller.create)
//router.get('/:userid', controller.show)

//router.use('/:userid/snippets', snippetsRouter) // Registers the Snippets collection router.
