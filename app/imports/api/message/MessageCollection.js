// import SimpleSchema from 'simpl-schema';
// import BaseCollection from '/imports/api/base/BaseCollection';
// import {check} from 'meteor/check';
// import {Tracker} from 'meteor/tracker';
//
// class MessageCollection extends BaseCollection {
//
//   constructor() {
//     super('Message', new SimpleSchema({
//       username: {type: String},
//       destination: {type: String},
//       date: {type: String},
//       subject: {type: String},
//       content: {type: String},
//       isSent: {type: Boolean},
//       isReceive: {type: Boolean},
//     }, {tracker: Tracker}));
//   }
//
//   define({ username, destination = '', date = '', subject = '', content = '', isSent = false, isReceive = false }) {
//     const checkPattern = {
//       username: String, destination: String, date: String, subject: String, content: String,
//       isSent: Boolean, isReceive: Boolean
//     };
//     check({username, destination, date, subject, content, isSent, isReceive}, checkPattern);
//
//     return this._collection.insert({
//       username, destination, date, subject, content, isSent, isReceive
//     });
//   }
//
//
//   dumpOne(docID) {
//     const doc = this.findDoc(docID);
//     const username = doc.username;
//     const destination = doc.destination;
//     const date = doc.date;
//     const subject = doc.subject;
//     const content = doc.content;
//     const isSent = doc.isSent;
//     const isReceive = doc.isReceive;
//     return {username, destination, date, subject, content, isSent, isReceive};
//   }
// }
//
// export const Message = new MessageCollection();

