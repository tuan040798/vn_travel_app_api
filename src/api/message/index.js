import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Message, { schema } from './model'

const router = new Router()
const { room, content, type } = schema.tree

/**
 * @api {post} /message Create message
 * @apiName CreateMessage
 * @apiGroup Message
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam room Message's room.
 * @apiParam content Message's content.
 * @apiParam type Message's type.
 * @apiSuccess {Object} message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ room, content, type }),
  create)

/**
 * @api {get} /message Retrieve messages
 * @apiName RetrieveMessages
 * @apiGroup Message
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} messages List of messages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /message/:id Retrieve message
 * @apiName RetrieveMessage
 * @apiGroup Message
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /message/:id Update message
 * @apiName UpdateMessage
 * @apiGroup Message
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam room Message's room.
 * @apiParam content Message's content.
 * @apiParam type Message's type.
 * @apiSuccess {Object} message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ room, content, type }),
  update)

/**
 * @api {delete} /message/:id Delete message
 * @apiName DeleteMessage
 * @apiGroup Message
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Message not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
