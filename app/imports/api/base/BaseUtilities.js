import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Message } from '/imports/api/message/MessageCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Message.removeAll();
}
