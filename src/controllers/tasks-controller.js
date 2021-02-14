/**
 * Module for the UsersController (RESTful methods for the Users collection).
 *
 * @author Erik Lindholm <elimk06@student.lnu.se>
 * @author Mats Loock
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import fetch from 'node-fetch'
//import { User } from '../models/crud-snippet.js'

/**
 * Encapsulates a controller.
 */
export class TasksController {
  /**
   * Displays the index page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const url = 'https://gitlab.lnu.se/api/v4/projects/12746/issues'
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
        }
      })
      const responseJSON = await response.json()
      const issues = []
      responseJSON.forEach(element => {
        const issue = {
          description: element.description
        }
        if (element.closed_at !== null) issue.done = true;
        else issue.done = false;
        issues.push(issue)
      })
      res.render('real-time-issues/index', { issues })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Displays a form for registering a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async new (req, res, next) {
    //try {
      //const user = req.session.user
      //res.render('crud-snippets/user-new', { user })
    //} catch (error) {
      //next(error)
    //}
  }

  /**
   * Creates a new User based on the form content and adds to the Users collection
   * in the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async create (req, res) {
    // Socket.io: Send the created task to all subscribers.
    res.io.emit('task', {
      description: req.body.description,
      done: req.body.done
    })

    // Webhook: Call is from hook. Skip redirect and flash.
    if (req.headers['x-gitlab-event']) {
      res.status(200).send('Hook accepted')
      return
    }

    /*try {
      
      // Hashes the entered password and creates a new User based on the form data.
      const hashedPassword = await User.hashPassword(req.body.password)
      const user = new User({
        username: req.body.username,
        password: hashedPassword
      })
      // Saves the user to the database.
      await user.save()
      // Redirects and shows a flash message.
      req.session.flash = { type: 'success', text: 'A new user has been registered.' }
      res.redirect('../login')
    } catch (error) {
      // If an error, or validation error, occurred, view the form and an error message.
      const user = req.session.user
      res.render('crud-snippets/user-new', {
        validationErrors: [error.message] || [error.errors.value.message],
        value: req.body.value,
        user
      })
    }*/
  }
}
