let storage;

module.exports = {
  setStorage(sharedStorage) {
    storage = sharedStorage;
  },
  getPosts(req, res) {
    res.status(200).send(storage);
  },
  addPost(req, res) {
    storage.push(req.body);
    let postId = storage.length-1;
    res.status(201).send({'postId':storage.length-1});
  },
  updatePost(req, res) {
    if (req.params.postId !== undefined){
      storage[req.params.postId] = req.body;
      res.status(200).send(storage[req.params.postId]);
    }else{
      res.status(401).end();
    }
  },
  removePost(req, res) {
    if (req.params.postId !== undefined){
      storage.splice(req.params.postId,1);
      res.status(204).send();
    }else{
      res.status(401).end();
    }
  }
};
