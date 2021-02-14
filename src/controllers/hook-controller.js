/**
 * Module for the UsersController (RESTful methods for the Users collection).
 *
 * @author Erik Lindholm <elimk06@student.lnu.se>
 * @author Mats Loock
 * @version 1.0.0
 */

import mongoose from 'mongoose'
//import { User } from '../models/crud-snippet.js'

/**
 * Encapsulates a controller.
 */
export class HookController {
  /**
   * Authorizes the Webhook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  authorize (req, res, next) {
    // Validate the GitLab Secret Token to be sure that the hook is from the correct sender
    // This needs to be in a database if we have multiple users.
    if (req.headers['x-gitlab-token'] !== process.env.HOOK_SECRET) {
      res.status(403).send('Incorrect secret')
      return
    }

    next()
  }


  /**
   * Receives a Webhook, validates it and sends it to Tasks Create Controller.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    // Parses the incoming data from the Webhook
    req.body = {
      description: req.body.object_attributes.title,
      done: false
    }

    next()
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
