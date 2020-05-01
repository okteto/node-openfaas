'use strict'
var fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const mongoSecret = fs.readFileSync('/var/openfaas/secrets/mongodb-password', 'utf8');
const client = new MongoClient(`mongodb://root:${mongoSecret}@mongodb:27017`);  

module.exports = async (event, context) => {
  const c = await client.connect();
  
  if (event.method == 'POST'){
    let r = await c.db('okteto').collection('attendees').insertOne({'githubID': event.body.githubID});
    if (1 == r.insertedCount) {
      return context
      .status(204);
    } else {
      return context
      .status(500);
    }
  } else if (event.method == 'GET'){
    const result = await c.db('okteto').collection('attendees').find().toArray();
    const list = [];
    result.forEach(a => list.push({'githubID': a.githubID}));
    return context
    .status(200)
    .succeed(result)
  }  else {
    return context.status(405);
  }
}

