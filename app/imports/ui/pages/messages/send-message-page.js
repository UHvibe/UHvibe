import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Message } from '../../../api/message/MessageCollection.js';

Template.Send_Message_Page.onCreated(function onCreated() {
  this.subscribe(Message.getPublicationName());
});

Template.Send_Message_Page.helpers({
  sending() {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for (let i = 0; i < messages.length; i++) {
      if (id === messages[i]._id) {
        return messages[i].username;
      }
    }
    return '';
  },
  receiver() {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for (let i = 0; i < messages.length; i++) {
      if (id === messages[i]._id) {
        return messages[i].destination;
      }
    }
    return '';
  },
  message() {
    return Message.findDoc(FlowRouter.getParam('messageID'));
  },
});

Template.Send_Message_Page.events({
  'submit .send-message-form'(event) {
    const newSubject = event.target.Subject.value;
    const newContent = event.target.Content.value;

    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');

    let receiver = '';

    for (let i = 0; i < messages.length; i++) {
      if (id === messages[i]._id) {
        receiver = Message[i].destination;
        Message.removeIt({ _id: id });
        break;
      }
    }
    const newDate = new Date();
    const username = FlowRouter.getParam('username');
    const destination = receiver;
    const date = newDate.toString();
    Message.define({
      _id: id,
      username: username,
      destination: destination,
      date: date,
      subject: newSubject,
      content: newContent,
    });
  },
  'click .send-message-form #cancel'() {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for (let i = 0; i < messages.length; i++) {
      if (id === messages[i]._id) {
        Message.removeIt({ _id: id });
        break;
      }
    }
    FlowRouter.go('/:username/messages', {
      username: FlowRouter.getParam('username'),
    });
  },
});
