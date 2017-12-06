import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';


const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';


Template.Edit_Profile_Page.onCreated(function onCreated() {
    this.subscribe(Interests.getPublicationName());
    this.subscribe(Profiles.getPublicationName());
    this.messageFlags = new ReactiveDict();
    this.messageFlags.set(displaySuccessMessage, false);
    this.messageFlags.set(displayErrorMessages, false);
    this.context = Profiles.getSchema().namedContext('Edit_Profile_Page');
});


Template.Edit_Profile_Page.helpers({
    successClass() {
        return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
    },
    displaySuccessMessage() {
        return Template.instance().messageFlags.get(displaySuccessMessage);
    },
    errorClass() {
        return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
    },
    profile() {
        return Profiles.findDoc(FlowRouter.getParam('username'));
    },
    interests() {
        const profile = Profiles.findDoc(FlowRouter.getParam('username'));
        const selectedInterests = profile.interests;
        return profile && _.map(Interests.findAll(),
            function makeInterestObject(interest) {
                return { label: interest.name, selected: _.contains(selectedInterests, interest.name) };
            });
    },
});


Template.Edit_Profile_Page.events({
    'submit .profile-data-form'(event, instance) {
        event.preventDefault();
        const firstName = event.target.First.value;
        const lastName = event.target.Last.value;
        const username = FlowRouter.getParam('username'); // schema requires username.
        const picture = event.target.Picture.value;
        const skills = event.target.Skills.value;
        const youtube = event.target.YouTube.value;
        const soundCloud = event.target.SoundCloud.value;
        const other = event.target.Other.value;
        const bio = event.target.Bio.value;
        const selectedInterests = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
        const interests = _.map(selectedInterests, (option) => option.value);

        const updatedProfileData = { firstName, lastName, skills, picture, youtube, soundCloud, other, bio, interests,
            username };

        // Clear out any old validation errors.
        instance.context.reset();
        // Invoke clean so that updatedProfileData reflects what will be inserted.
        const cleanData = Profiles.getSchema().clean(updatedProfileData);
        // Determine validity.
        instance.context.validate(cleanData);

        if (instance.context.isValid()) {
            const docID = Profiles.findDoc(FlowRouter.getParam('username'))._id;
            const id = Profiles.update(docID, { $set: cleanData });
            instance.messageFlags.set(displaySuccessMessage, id);
            instance.messageFlags.set(displayErrorMessages, false);
        } else {
            instance.messageFlags.set(displaySuccessMessage, false);
            instance.messageFlags.set(displayErrorMessages, true);
        }
    },
});