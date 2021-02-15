/**
 * Module for the UsersController (RESTful methods for the Users collection).
 *
 * @author Erik Lindholm <elimk06@student.lnu.se>
 * @author Mats Loock
 * @version 1.0.0
 */

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
      title: req.body.object_attributes.title,
      description: req.body.object_attributes.description,
      done: false
    }

    next()
  }
}
