import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Message } from '../../../api/message/MessageCollection.js';

Template.Landing_Page.onCreated(function () {
  this.subscribe(Message.getPublicationName());
});

Template.Landing_Page.helpers({
  userLanding() {
    return Meteor.user().profile.name;
  },
  newMessageCount() {
    const userMessages = Message.findAll();
    const id = Meteor.user().profile.name;
    for (let i = 0; i < userMessages.length; i++) {
      if (id === userMessages[i].destination) {
        if (userMessages[i].notRead) {
          return true;
        }
      }
    }
    return false;
  },
});
