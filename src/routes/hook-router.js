/**
 * Routes for the Users collection (RESTful).
 *
 * @author Erik Lindholm <elimk06@student.lnu.se>
 * @author Mats Loock
 * @version 1.0.0
 */

import express from 'express'
import { HookController } from '../controllers/hook-controller.js'
import { IssuesController } from '../controllers/issues-controller.js'

export const router = express.Router()

const controller = new HookController()
const issuesController = new IssuesController()

// Map HTTP verbs and route paths to controller actions.
router.post('/issue', controller.index, issuesController.create)

//router.get('/', controller.index)

//router.get('/new', controller.new)
//router.post('/create', controller.create)
//router.get('/:userid', controller.show)

//router.use('/:userid/snippets', snippetsRouter) // Registers the Snippets collection router.