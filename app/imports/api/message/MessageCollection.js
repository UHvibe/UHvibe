import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Tracker } from 'meteor/tracker';

export const Messages = new Mongo.Collection('Messages');

export const MessageSchema = new SimpleSchema({
  sender: {
    label: 'Sender',
    type: String,
  },
  receiver: {
    label: 'Receiver',
    type: String,
  },
  subject: {
    label: 'Subject',
    type: String,
  },
  content: {
    label: Content,
    type: String,
  },
}, { tracker: Tracker });

Messages.attachSchema(MessageSchema);


