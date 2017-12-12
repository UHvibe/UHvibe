import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';

class MessageCollection extends BaseCollection {

  constructor() {
    super('Message', new SimpleSchema({
      username: { type: String },
      destination: { type: String },
      date: { type: String },
      subject: { type: String },
      content: { type: String },
      notRead: { type: Boolean },
      isDraft: { type: Boolean},
    }, { tracker: Tracker }));
  }

  define({ username, destination = '', date = '', subject = '', content = '', notRead = true, isDraft = true }) {
    const checkPattern = {
      username: String, destination: String, date: String, subject: String,
      content: String, notRead: Boolean, isDraft: Boolean,
    };
    check({ username, destination, date, subject, content, notRead, isDraft }, checkPattern);

    return this._collection.insert({
      username, destination, date, subject, content, notRead, isDraft,
    });
  }


  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const username = doc.username;
    const destination = doc.destination;
    const date = doc.date;
    const subject = doc.subject;
    const content = doc.content;
    const notRead = doc.notRead;
    const isDraft = doc.isDraft;
    return { username, destination, date, subject, content, notRead, isDraft };
  }
}

export const Message = new MessageCollection();

