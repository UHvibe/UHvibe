import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor';


Template.Landing_Page.helpers({
    routeUserName() {
        return FlowRouter.getParam('username');
    },

    userLanding () {
      return Meteor.user().profile.name;
    },
});
