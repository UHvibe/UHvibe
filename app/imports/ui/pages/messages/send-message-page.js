import { Template } from 'meteor/templating';
import { Message } from '../../../api/message/MessageCollection.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Send_Message_Page.onCreated(function onCreated() {
  this.subscribe(Message.getPublicationName());
});

Template.Send_Message_Page.helpers({
  sending() {
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
  message(){
    return Message.findDoc(FlowRouter.getParam('messageID'));
  },
});

Template.Send_Message_Page.events({
  'click .send-message-form #send'(event, instance) {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for(let i = 0; i < messages.length; i++) {
      if(id === messages[i]._id) {
        const receiver = Message[i].destination;
        Message.removeIt( { _id: id } );
        break;
      }
    }
    const newDate = new Date();
    const username = FlowRouter.getParam('username');
    const destination = receiver;
    const date = newDate.toString();
    const subject = event.target.Subject.value;
    const content = event.target.Message.value;
    const newMessage = Message.define({
      _id: id,
      username: username,
      destination: destination,
      date: date,
      subject: subject,
      content: content
    });
  },
  'click .send-message-form #cancel'(event, instance) {
    const messages = Message.findAll();
    const id = FlowRouter.getParam('messageID');
    for(let i = 0; i < messages.length; i++) {
      if (id === messages[i]._id) {
        Message.removeIt({ _id: id });
        break;
      }
    }
    FlowRouter.go('/:username/messages', {
      username: FlowRouter.getParam('username')
    });
  }
});