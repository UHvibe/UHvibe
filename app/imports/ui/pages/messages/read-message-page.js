import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Message } from '../../../api/message/MessageCollection.js';

Template.Read_Message_Page.onCreated(function onCreated() {
  this.subscribe(Message.getPublicationName());
});

Template.Read_Message_Page.helpers({
  sender() {
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
  messageArrival() {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for (let i = 0; i < messages.length; i++) {
      if (id === messages[i]._id) {
        return messages[i].date;
      }
    }
    return '';
  },
  subject() {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for (let i = 0; i < messages.length; i++) {
      if (id === messages[i]._id) {
        return messages[i].subject;
      }
    }
    return '';
  },
  messageContent() {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for (let i = 0; i < messages.length; i++) {
      if (id === messages[i]._id) {
        return messages[i].content;
      }
    }
    return '';
  },
});

Template.Read_Message_Page.events({
  'click #reply'(event) {
    event.preventDefault();
    let tempDestination = ' ';
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for (let i = 0; i < messages.length; i++) {
      if (id === messages[i]._id) {
        tempDestination = messages[i].username;
        break;
      }
    }
    const newDate = new Date();
    const username = FlowRouter.getParam('username');
    const destination = tempDestination;
    const date = newDate.toString();
    const subject = 'In Progress';
    const content = 'In Progress';
    const newMessage = Message.define({
      username: username,
      destination: destination,
      date: date,
      subject: subject,
      content: content,
    });
    FlowRouter.go('/:username/messages/sendMessage/:messageID', {
      username: FlowRouter.getParam('username'),
      messageID: newMessage,
    });
  },
  'click #delete'(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete?')) {
      const messages = Message.findAll();
      const id = FlowRouter.getParam('messageID');
      for (let i = 0; i < messages.length; i++) {
        if (id === messages[i]._id) {
          Message.removeIt({ _id: id });
        }
      }
      FlowRouter.go('/:username/messages', {
        username: FlowRouter.getParam('username'),
      });
    }
  },
  'click #back'(event) {
    event.preventDefault();
    FlowRouter.go('/:username/messages', {
      username: FlowRouter.getParam('username'),
    });
  },
});
