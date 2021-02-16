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
export class IssuesController {
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
          issueid: element.iid,
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
  async determineWebhookType (req, res) {
    // CREATE
    if (req.body.changes.created_at !== undefined) {
      console.log(req.body.changes)
      // Socket.io: Send the created issue to all subscribers.
      res.io.emit('new-issue', {
        title: req.body.title,
        description: req.body.description,
        issueid: req.body.issueid,
        done: req.body.done,
        userAvatar: req.body.userAvatar,
        userUsername: req.body.userUsername,
        userFullname: req.body.userFullname
      })
      console.log('NEW ISSUE')
    // UPDATE
    } else {
      console.log(req.body)
      console.log('UPDATE ISSUE')
      // Socket.io: Send the created issue to all subscribers.
      res.io.emit('update-issue', {
        title: req.body.title,
        description: req.body.description,
        issueid: req.body.issueid,
        done: req.body.done,
        userAvatar: req.body.userAvatar,
        userUsername: req.body.userUsername,
        userFullname: req.body.userFullname
      })
    }

    // Webhook: Call is from hook. Skip redirect and flash.
    if (req.headers['x-gitlab-event']) {
      res.status(200).send('Hook accepted')
      return
    }
  }

  /**
   * Creates a new Issue.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  create = (req, res) =>  {
    // Socket.io: Send the created issue to all subscribers.
    res.io.emit('new-issue', {
      title: req.body.title,
      description: req.body.description,
      issueid: req.body.issueid,
      done: req.body.done,
      userAvatar: req.body.userAvatar,
      userUsername: req.body.userUsername,
      userFullname: req.body.userFullname
    })

    // Webhook: Call is from hook. Skip redirect and flash.
    if (req.headers['x-gitlab-event']) {
      res.status(200).send('Hook accepted')
      return
    }
  }

  /**
   * Creates a new User based on the form content and adds to the Users collection
   * in the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async close (req, res) {
    try {
      const url = 'https://gitlab.lnu.se/api/v4/projects/12746/issues' + '/' + req.params.issueid + '?state_event=close'
      fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
        }
      })
    } catch (error) {
      next(error)
    }

    // Skip redirect and flash.
    res.status(200).send()
    return
  }

  /**
   * Creates a new User based on the form content and adds to the Users collection
   * in the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async isClosed (req, res) {
    // Socket.io: Send the created issue to all subscribers.
    res.io.emit('close-issue', {
      issueid: req.body.issueid,
      done: req.body.done,
    })

    // Webhook: Call is from hook. Skip redirect and flash.
    if (req.headers['x-gitlab-event']) {
      res.status(200).send('Hook accepted')
      return
    }
  }

  /**
   * Creates a new User based on the form content and adds to the Users collection
   * in the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async reopen (req, res) {
    try {
      const url = 'https://gitlab.lnu.se/api/v4/projects/12746/issues' + '/' + req.params.issueid + '?state_event=reopen'
      fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
        }
      })
    } catch (error) {
      next(error)
    }

    // Skip redirect and flash.
    res.status(200).send()
    return
  }
}
