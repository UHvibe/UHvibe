import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Message } from '../../../api/message/MessageCollection.js';

Template.Message_Page.onCreated(function onCreated() {
  this.subscribe(Message.getPublicationName());
});

Template.Message_Page.helpers({
  messageList() {
    return Message.find();
  },
  routeUserName() {
    return FlowRouter.getParam('username');
  },
});
