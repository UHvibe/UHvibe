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
    if (confirm('Send?')) {
      event.preventDefault();
      const newSubject = event.target.Subject.value;
      const newContent = event.target.Content.value;
      const messages = Message.findAll();
      const id = FlowRouter.getParam('messageID');
      let receiver = 'In Progress...';
      for (let i = 0; i < messages.length; i++) {
        if (id === messages[i]._id) {
          receiver = messages[i].destination;
          Message.removeIt({ _id: id });
          break;
        }
      }
      let newDate = new Date();
      newDate = newDate.toString().slice(0, 24);
      const username = FlowRouter.getParam('username');
      const destination = receiver;
      Message.define({
        _id: id,
        username: username,
        destination: destination,
        date: newDate,
        subject: newSubject,
        content: newContent,
        notRead: true,
        isDraft: false,
      });
      FlowRouter.go('/:username/messages', {
        username: FlowRouter.getParam('username'),
      });
    }
  },
  'click #cancel'(event) {
    event.preventDefault();
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
