import { Template } from 'meteor/templating';
import { Message } from '../../../api/message/MessageCollection.js';

Template.Landing_Page.onCreated(function () {
  this.subscribe(Message.getPublicationName());
});
