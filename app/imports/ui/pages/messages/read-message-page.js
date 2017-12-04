import { Template } from 'meteor/templating';
import { Message } from '../../../api/message/MessageCollection.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Read_Message_Page.onCreated(function onCreated() {
  this.subscribe(Message.getPublicationName());
});

Template.Read_Message_Page.helpers({
  sender() {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for(let i = 0; i < messages.length; i++) {
      if(id === messages[i]._id) {
        return messages[i].username;
      }
    }
  },
  receiver() {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for(let i = 0; i < messages.length; i++) {
      if(id === messages[i]._id) {
        return messages[i].destination;
      }
    }
  },
  messageArrival() {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for(let i = 0; i < messages.length; i++) {
      if(id === messages[i]._id) {
        return messages[i].date;
      }
    }
  },
  subject() {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for(let i = 0; i < messages.length; i++) {
      if(id === messages[i]._id) {
        return messages[i].subject;
      }
    }
  },
  messageContent() {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for(let i = 0; i < messages.length; i++) {
      if(id === messages[i]._id) {
        return messages[i].content;
      }
    }
  },
});

Template.Read_Message_Page.events({

});