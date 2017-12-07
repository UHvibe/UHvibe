import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { $ } from 'meteor/jquery';

/*                        LANDING ROUTE                       */

export const landingPageRouteName = 'Landing_Page';
FlowRouter.route('/', {
  name: landingPageRouteName,
  action() {
    BlazeLayout.render('Landing_Layout', { main: landingPageRouteName });
  },
});

/*                       INFORMATION PAGES                    */

export const learnMorePageRouteName = 'LearnMore_Page';
FlowRouter.route('/learnmore', {
  name: learnMorePageRouteName,
  action() {
    BlazeLayout.render('Visitor_Layout', { main: learnMorePageRouteName });
  },
});

// /*                        DIRECTORY ROUTE                       */

// function addDirectoryBodyClass() {
//   $('body').addClass('directory-page-body');
// }
//
// function removeDirectoryBodyClass() {
//   $('body').removeClass('directory-page-body');
// }
//
// export const directoryPageRouteName = 'Directory_Page';
// FlowRouter.route('/directory', {
//   name: directoryPageRouteName,
//   action() {
//     BlazeLayout.render('Directory_Layout', { main: directoryPageRouteName });
//   },
//   triggersEnter: [addDirectoryBodyClass],
//   triggersExit: [removeDirectoryBodyClass],
// });


/*                        USER ROUTES                      */


function addUserBodyClass() {
  $('body').addClass('user-layout-body');
}

function removeUserBodyClass() {
  $('body').removeClass('user-layout-body');
}

const userRoutes = FlowRouter.group({
  prefix: '/:username',
  name: 'userRoutes',
  triggersEnter: [addUserBodyClass],
  triggersExit: [removeUserBodyClass],
});

export const createProfilePageRouteName = 'Create_Profile_Page';
userRoutes.route('/createProfile', {
  name: createProfilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: createProfilePageRouteName });
  },
});

export const profilePageRouteName = 'Profile_Page';
userRoutes.route('/profile', {
  name: profilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: profilePageRouteName });
  },
});

export const editProfilePageRouteName = 'Edit_Profile_Page';
userRoutes.route('/editProfile', {
    name: editProfilePageRouteName,
    action() {
        BlazeLayout.render('User_Layout', { main: editProfilePageRouteName });
    },
});

export const searchPageRouteName = 'Filter_Page';
userRoutes.route('/search', {
  name: searchPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: searchPageRouteName });
  },
});

export const messagesPageRouteName = 'Message_Page';
userRoutes.route('/messages', {
  name: messagesPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: messagesPageRouteName });
  },
});

export const readMessagesPageRouteName = 'Read_Message_Page';
userRoutes.route('/messages/readMessage/:messageID', {
  name: readMessagesPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: readMessagesPageRouteName });
  },
});

export const sendMessagesPageRouteName = 'Send_Message_Page';
userRoutes.route('/messages/sendMessage/:messageID', {
  name: sendMessagesPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: sendMessagesPageRouteName });
  },
});

/*                        MISC ROUTES                       */
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('Page_Not_Found');
  },
};
