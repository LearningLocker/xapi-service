import Actor from '../../../models/Actor';
import IdFormattedActor from '../../../models/IdFormattedActor';

export interface ActorWithId {
  readonly account?: any;
  readonly mbox?: any;
  readonly mbox_sha1sum?: any;
  readonly openid?: any;
}

export interface ActorWithMembers {
  readonly member?: any[];
}

const getActorWithId = (actor: Actor): ActorWithId => {
  if (actor.account !== undefined) { return { account: actor.account }; }
  if (actor.mbox !== undefined) { return { mbox: actor.mbox }; }
  if (actor.mbox_sha1sum !== undefined) { return { mbox_sha1sum: actor.mbox_sha1sum }; }
  if (actor.openid !== undefined) { return { openid: actor.openid }; }
  return {};
};

const getActorWithMembers = (actor: Actor): ActorWithMembers => {
  return (
    (actor.objectType === 'Group' && actor.member !== undefined) ?
      // tslint:disable-next-line:no-use-before-declare
      { member: actor.member.map(formatActor) } :
      {}
  );
};

const formatActor = (actor: Actor): IdFormattedActor => {
  const actorWithId = getActorWithId(actor);
  const actorWithMembers = (
    Object.keys(actorWithId).length > 0 ? {} :
      getActorWithMembers(actor)
  );
  return {
    ...(actor.objectType !== 'Agent' ? { objectType: actor.objectType } : {}),
    ...actorWithId,
    ...actorWithMembers,
  };
};

export default formatActor;
