import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';




Template.Landing_Page.onCreated(function onCreated() {
    this.subscribe(Landing.getPublicationName());
});

Template.User_Header.helpers({
    routeUserName() {
        return FlowRouter.getParam('username');
    },
});
