// Ref:
// https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
const { assert, expect } = require('chai')

// TODO: use waffle https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html

// Request the usable contract abstraction via `artifacts.require`
const Color = artifacts.require('./Color.sol')

require('chai')
.use(require('chai-as-promised'))
.should()

// Use `contract` to enable Truffle's clean-room features
contract('Color', (accounts) => {
    describe('deployment', async () => {
        it('deploys successfully', async () => {
            contract = await Color.deployed()
            const {address, name, symbol} = contract
            const nameStr = await name();
            const symbolStr = await symbol();

            assert.notEqual(address, '', "address not valid")
            assert.notEqual(address, 0x0, "address not valid")
            assert.notEqual(address, null, "address not valid")
            assert.notEqual(address, undefined, "address not valid")
            assert.equal("Color", nameStr, "Name is not 'Color'")
            assert.equal("CLR", symbolStr, "Symbol is not 'CLR'")

        })
    })

    describe('minting', async () => {
        it('creates a new token', async () => {
            contract = await Color.deployed()
            const result = await contract.mint('#FFFFFF')
            const totalSupply = await contract.totalSupply()
            const event = result.logs[0].args

            assert.equal(totalSupply, 1, "total supply is not 1")
            assert.equal(event.tokenId.toNumber(), 0, "Event: tokenId is not 0")
            assert.equal(event.to, accounts[0], "Event: not sent to first account")
        })

        it('cannot create duplicate color tokens', async () => {
            contract = await Color.deployed()
            await expect(contract.mint('#FFFFFF')).to.be.rejected
        })
    })
} )