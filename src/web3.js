import Web3 from 'web3';

// this program relies on metamask being installed
// we are using whatever provider metamask is currently using BUT we are using
// the new version of web3 rather than whatever version metamask is using
const web3 = new Web3(window.web3.currentProvider);
// at this point we have access to my keys, provider, etc
export default web3;