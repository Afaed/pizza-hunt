const router = require('express').Router();
const { addComment, removeComment } = require('../../controller/comment-controller')

//api/coments <pizzaID>
router.route('/:pizzaId').post(addComment)

// .api.comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment)

module.exports = router;