/**
 * Module for the UsersController (RESTful methods for the Users collection).
 *
 * @author Erik Lindholm <elimk06@student.lnu.se>
 * @author Mats Loock
 * @version 1.0.0
 */

import fetch from 'node-fetch'

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
          title: element.title,
          description: element.description,
          userAvatar: element.author.avatar_url,
          userUsername: element.author.username,
          userFullname: element.author.name
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
  }
}
