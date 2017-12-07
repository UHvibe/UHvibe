// import { Message } from '/imports/api/message/MessageCollection';
// import { Meteor } from 'meteor/meteor';
// import { expect } from 'chai';
// import { removeAllEntities } from '/imports/api/base/BaseUtilities';
//
// if (Meteor.isServer) {
//   describe('MessageCollection', function testSuite() {
//     const interestName = 'Pop';
//     const interestDescription = 'I am interested in Pop music';
//     const firstName = 'Philip';
//     const lastName = 'Johnson';
//     const username = 'johnson';
//     const bio = 'I have been playing guitar for 5 years.';
//     const interests = [interestName];
//     const picture = 'http://philipmjohnson.org/headshot.jpg';
//     const skills = 'Guitar';
//     const youtube = 'http://github.com/philipjohnson';
//     const soundCloud = 'http://github.com/philipjohnson';
//     const other = '';
//     const defineObject = { firstName, lastName, username, bio, interests, picture, skills, youtube, soundCloud, other};
//
//     before(function setup() {
//       removeAllEntities();
//       // Define a sample interest.
//       Interests.define({ name: interestName, description: interestDescription });
//     });
//
//     after(function teardown() {
//       removeAllEntities();
//     });
//
//     it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
//       let docID = Profiles.define(defineObject);
//       expect(Profiles.isDefined(docID)).to.be.true;
//       // Check that fields are available
//       const doc = Profiles.findDoc(docID);
//       expect(doc.firstName).to.equal(firstName);
//       expect(doc.lastName).to.equal(lastName);
//       expect(doc.username).to.equal(username);
//       expect(doc.bio).to.equal(bio);
//       expect(doc.interests[0]).to.equal(interestName);
//       expect(doc.picture).to.equal(picture);
//       expect(doc.skills).to.equal(skills);
//       expect(doc.youtube).to.equal(youtube);
//       expect(doc.soundCloud).to.equal(soundCloud);
//       expect(doc.other).to.equal(other);
//       // Check that multiple definitions with the same email address fail
//       expect(function foo() { Profiles.define(defineObject); }).to.throw(Error);
//       // Check that we can dump and restore a Profile.
//       const dumpObject = Profiles.dumpOne(docID);
//       Profiles.removeIt(docID);
//       expect(Profiles.isDefined(docID)).to.be.false;
//       docID = Profiles.restoreOne(dumpObject);
//       expect(Profiles.isDefined(docID)).to.be.true;
//       Profiles.removeIt(docID);
//     });
//
//     it('#define (illegal interest)', function test() {
//       const illegalInterests = ['foo'];
//       const defineObject2 = { firstName, lastName, username, bio, interests: illegalInterests, picture, skills,
//         youtube, soundCloud, other };
//       expect(function foo() { Profiles.define(defineObject2); }).to.throw(Error);
//     });
//
//     it('#define (duplicate interests)', function test() {
//       const duplicateInterests = [interestName, interestName];
//       const defineObject3 = { firstName, lastName, username, bio, interests: duplicateInterests, picture, skills,
//         youtube, soundCloud, other};
//       expect(function foo() { Profiles.define(defineObject3); }).to.throw(Error);
//     });
//   });
// }