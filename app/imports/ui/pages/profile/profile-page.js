import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Message } from '../../../api/message/MessageCollection.js';

Template.Profile_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Message.getPublicationName());
});


Template.Profile_Page.helpers({
  firstName() {
    const firstName = Profiles.findAll();
    const username = FlowRouter.getParam('username');
    for (let i = 0; i < firstName.length; i++) {
      if (username === firstName[i].username) {
        return firstName[i].firstName;
      }
    }
    return ' ';
  },

  lastName() {
    const lastName = Profiles.findAll();
    const username = FlowRouter.getParam('username');
    for (let i = 0; i < lastName.length; i++) {
      if (username === lastName[i].username) {
        return lastName[i].lastName;
      }
    }
    return ' ';
  },

  picture() {
    const picture = Profiles.findAll();
    const username = FlowRouter.getParam('username');
    for (let i = 0; i < picture.length; i++) {
      if (username === picture[i].username) {
        return picture[i].picture;
      }
    }
    return ' ';
  },

  interests() {
    const interests = Profiles.findAll();
    const username = FlowRouter.getParam('username');
    for (let i = 0; i < interests.length; i++) {
      if (username === interests[i].username) {
        return interests[i].interests;
      }
    }
    return ' ';
  },

  skills() {
    const skills = Profiles.findAll();
    const username = FlowRouter.getParam('username');
    for (let i = 0; i < skills.length; i++) {
      if (username === skills[i].username) {
        return skills[i].skills;
      }
    }
    return ' ';
  },

  youtube() {
    const youtube = Profiles.findAll();
    const username = FlowRouter.getParam('username');
    for (let i = 0; i < youtube.length; i++) {
      if (username === youtube[i].username) {
        return youtube[i].youtube;
      }
    }
    return ' ';
  },

  soundCloud() {
    const soundCloud = Profiles.findAll();
    const username = FlowRouter.getParam('username');
    for (let i = 0; i < soundCloud.length; i++) {
      if (username === soundCloud[i].username) {
        return soundCloud[i].soundCloud;
      }
    }
    return ' ';
  },

  other() {
    const other = Profiles.findAll();
    const username = FlowRouter.getParam('username');
    for (let i = 0; i < other.length; i++) {
      if (username === other[i].username) {
        return other[i].other;
      }
    }
    return ' ';
  },
  bio() {
    const bio = Profiles.findAll();
    const username = FlowRouter.getParam('username');
    for (let i = 0; i < bio.length; i++) {
      if (username === bio[i].username) {
        return bio[i].bio;
      }
    }
    return ' ';
  },
});


Template.Profile_Page.events({
  'click #edit-profile'() {
    FlowRouter.go('/:username/editProfile', {
      username: FlowRouter.getParam('username'),
    });
  },
});
