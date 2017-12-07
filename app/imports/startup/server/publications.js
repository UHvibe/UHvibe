import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Message } from '/imports/api/message/MessageCollection';

Interests.publish();
Profiles.publish();
Message.publish();
