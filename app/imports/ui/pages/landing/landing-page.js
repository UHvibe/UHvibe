import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.Landing_Page.helpers({
  userLanding() {
    return Meteor.user().profile.name;
  },
});
