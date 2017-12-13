import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Message } from '../../../api/message/MessageCollection.js';

Template.Read_Message_Page.onCreated(function onCreated() {
  this.subscribe(Message.getPublicationName());
  const id = FlowRouter.getParam('messageID');
  const username = Meteor.user().profile.name;
  const messages = Message.findAll();
  for (let i = 0; i < messages.length; i++) {
    if (id === messages[i]._id) {
      if (username === messages[i].destination) {
        Message.update(
            { _id: id },
            { $set: { notRead: false } },
        );
      }
    }
  }
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
  userSentMessage() {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for (let i = 0; i < messages.length; i++) {
      if (id === messages[i]._id) {
        if (messages[i].username === Meteor.user().profile.name) {
          return false;
        }
      }
    }
    return true;
  },
  messageIsDraft() {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for (let i = 0; i < messages.length; i++) {
      if (id === messages[i]._id) {
        return messages[i].isDraft;
      }
    }
    return ' ';
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
    let newDate = new Date();
    newDate = newDate.toString().slice(0, 24);
    const username = FlowRouter.getParam('username');
    const destination = tempDestination;
    const subject = 'DRAFT IN PROGRESS';
    const content = 'DRAFT IN PROGRESS';
    const newMessage = Message.define({
      username: username,
      destination: destination,
      date: newDate,
      subject: subject,
      content: content,
      notRead: false,
    });
    FlowRouter.go('/:username/messages/sendMessage/:messageID', {
      username: FlowRouter.getParam('username'),
      messageID: newMessage,
    });
  },
  'click #edit'(event) {
    event.preventDefault();
    const id = FlowRouter.getParam('messageID');
    let newDate = new Date();
    newDate = newDate.toString().slice(0, 24);
    Message.update(
        { _id: id },
        { $set: { date: newDate } },
    );
    FlowRouter.go('/:username/messages/sendMessage/:messageID', {
      username: FlowRouter.getParam('username'),
      messageID: id,
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
