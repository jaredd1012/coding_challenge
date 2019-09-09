import { describe } from 'mocha';
const assert = require('chai').assert;
import PokerHand from '../../src/PokerHand/PokerHand';

describe('PokerHand', () => {

  it('can rank a royal flush', () => {
    const hand = new PokerHand('10s Js Ks Qs As');
    assert.deepEqual(hand.getRank(), 'Royal Flush');
  });

  it('can rank a straight flush', () => {
    const hand = new PokerHand('2s 3s 4s 5s 6s');
    assert.deepEqual(hand.getRank(), 'Straight Flush');
  });

  it('can rank a straight', () => {
    const hand = new PokerHand('2s 3f 4s 5h As');
    assert.deepEqual(hand.getRank(), 'Straight');
  });

  it('can rank a flush', () => {
    const hand = new PokerHand('2s 3s 4s 5s 9s');
    assert.deepEqual(hand.getRank(), 'Flush');
  });
  it('can rank a high card', () => {
    const hand = new PokerHand('Ah Qs 10c 7d 2s');
    assert.deepEqual(hand.getRank(), 'High Card');
  });
  it('can rank a pair', () => {
    const hand = new PokerHand('Ah As 10c 7d 6s');
    assert.deepEqual(hand.getRank(), 'One Pair');
  });

  it('can rank two pair', () => {
    const hand = new PokerHand('Kh Kc 3s 3h 2d');
    assert.deepEqual('Two Pair', hand.getRank());
  });

  it('can rank three of a kind', () => {
    const hand = new PokerHand('Kh Kc Ks 3h 2d');
    assert.deepEqual('Three of a Kind', hand.getRank());
  });

  it('can rank four of a kind', () => {
    const hand = new PokerHand('Kh Kc Ks Kh 2d');
    assert.deepEqual('Four of a Kind', hand.getRank());
  });

  it('can rank a full house', () => {
    const hand = new PokerHand('Kh Kc Ks Ah Ad');
    assert.deepEqual('Full House', hand.getRank());
  });
  // TODO: More tests go here
});
