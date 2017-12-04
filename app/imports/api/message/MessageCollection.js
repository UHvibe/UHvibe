import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import {check} from 'meteor/check';
import {Tracker} from 'meteor/tracker';

class MessageCollection extends BaseCollection {

  constructor() {
    super('Message', new SimpleSchema({
      username: {type: String},
      destination: {type: String},
      date: {type: String},
      subject: {type: String},
      content: {type: String},
    }, {tracker: Tracker}));
  }

  define({ username, destination = '', date = '', subject = '', content = '' }) {
    const checkPattern = {
      username: String, destination: String, date: String, subject: String, content: String
    };
    check({username, destination, date, subject, content}, checkPattern);

    return this._collection.insert({
      username, destination, date, subject, content
    });
  }


  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const username = doc.username;
    const destination = doc.destination;
    const date = doc.date;
    const subject = doc.subject;
    const content = doc.content;
    return {username, destination, date, subject, content};
  }
}

export const Message = new MessageCollection();

