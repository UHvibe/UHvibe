import { Template } from 'meteor/templating';
import { Message } from '../../../api/message/MessageCollection.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';

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