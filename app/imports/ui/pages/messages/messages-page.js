import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';
import { Message } from '../../../api/message/MessageCollection.js';

Template.Message_Page.onCreated(function () {
  this.subscribe(Message.getPublicationName());
  this.receivedMessage = new ReactiveDict();
  this.receivedMessage.set('showReceivedMessages', true);
});

Template.Message_Page.helpers({
  receivedMessageList() {
    console.log('receivemessage');
    const id = Meteor.user().profile.name;
    return Message.find({ destination: id });
  },
  sentMessageList() {
    console.log('sentmessage');
    const id = Meteor.user().profile.name;
    return Message.find({ username: id });
  },
  routeUserName() {
    return Meteor.user().profile.name;
  },
  showReceivedMessages() {
    return Template.instance().receivedMessage.get('showReceivedMessages');
  },
});

Template.Message_Page.events({
  'change select'(event) {
    if ($(event.target).val() === 'receive') {
      Template.instance().receivedMessage.set('showReceivedMessages', true);
    }
    if ($(event.target).val() === 'sent') {
      Template.instance().receivedMessage.set('showReceivedMessages', false);
    }
  },
});
