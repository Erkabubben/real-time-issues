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
      const user = req.session.user
      res.render('crud-snippets/index', { })
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
