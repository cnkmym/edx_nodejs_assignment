let storage;

module.exports = {
  setStorage(sharedStorage){
    storage = sharedStorage;
  },
  getComments(req, res) {
    if (req.params.postId !== undefined && storage[req.params.postId]){
      res.status(200).send(storage[req.params.postId].comments);
    }
  },
  addComment(req, res) {
    if (req.params.postId !== undefined && storage[req.params.postId]){
      storage[req.params.postId].comments = storage[req.params.postId].comments || [];
      storage[req.params.postId].comments.push(req.body);
      let commentId = storage[req.params.postId].comments.length-1;
      res.status(201).send({'commentId':commentId});
    }
  },
  updateComment(req, res) {
    if (req.params.postId !== undefined && storage[req.params.postId] && req.params.commentId !== undefined && storage[req.params.postId].comments[req.params.commentId]){
      storage[req.params.postId].comments[req.params.commentId] = req.body;
      res.status(200).send(storage[req.params.postId].comments[req.params.commentId]);
    }
  },
  removeComment(req, res) {
    if (req.params.postId !== undefined && storage[req.params.postId] && req.params.commentId !== undefined && storage[req.params.postId].comments[req.params.commentId]){
      storage[req.params.postId].comments.splice(req.params.commentId,1);
      res.status(204).send();
    }
  }
};
