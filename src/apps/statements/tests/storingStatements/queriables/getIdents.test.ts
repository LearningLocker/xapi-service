import assert from 'assert';
import Actor from '../../../models/Actor';
import Agent from '../../../models/Agent';
import Group from '../../../models/Group';
import {
  getActorIdents,
  getGroupIdents,
} from '../../../service/storeStatements/queriables/getAgentsFromStatement';

const mboxAgent: Agent = {
  objectType: 'Agent',
  mbox: 'mailto:test@test.com',
};

const mboxShaAgent: Agent = {
  objectType: 'Agent',
  mbox_sha1sum: '1234567890qwryuiop',
};

const openIDAgent: Agent = {
  objectType: 'Agent',
  openid: 'http://example.org/user/1',
};

const accountAgent = {
  objectType: 'Agent',
  account: {
    name: '123',
    homePage: 'https://example.com',
  },
};

const identifiedGroup: Group = {
  ...mboxAgent,
  objectType: 'Group',
};

const membersGroup: Group = {
  ...identifiedGroup,
  member: [
    mboxShaAgent,
    openIDAgent,
    accountAgent as Actor,
    mboxShaAgent,
  ],
};

describe('create ident from agent', () => {
  it('should take an mbox actor and return an array with the ident', () => {
    const idents = getActorIdents(mboxAgent);
    assert.deepEqual(idents, [mboxAgent.mbox]);
  });

  it('should take an mboxsha1_sum actor and return an array with the ident', () => {
    const idents = getActorIdents(mboxShaAgent);
    assert.deepEqual(idents, [mboxShaAgent.mbox_sha1sum]);
  });

  it('should take an account actor and return an array with the ident', () => {
    const idents = getActorIdents(accountAgent as Actor);
    const expectedIdent = `${accountAgent.account.homePage}|${accountAgent.account.name}`;
    assert.deepEqual(idents, [expectedIdent]);
  });

  it('should take an openid actor and return an array with the ident', () => {
    const idents = getActorIdents(openIDAgent);
    assert.deepEqual(idents, [openIDAgent.openid]);
  });

  it('should take a group and return an array of idents including the members', () => {
    const idents = getGroupIdents(membersGroup);
    const member = membersGroup.member as Actor[];
    assert.equal(member.length, idents.length);

    assert.deepEqual(
      idents.sort(),
      [
        mboxAgent.mbox,
        openIDAgent.openid,
        `${accountAgent.account.homePage}|${accountAgent.account.name}`,
        mboxShaAgent.mbox_sha1sum,
      ].sort());
  });
});
