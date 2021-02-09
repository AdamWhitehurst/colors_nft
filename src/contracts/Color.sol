// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

// Ref: https://erc721.org/

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Color is ERC721 {
    // Stores all colors that have been made into tokens
    string[] public _colors;
    mapping(string => bool) _colorExists;

    constructor() public ERC721("Color", "CLR") {}

    function mint(string memory _color) public {
        require(_colorExists[_color] != true, "Color already exists");

        _colors.push(_color);
        uint256 _id = _colors.length - 1;

        _mint(msg.sender, _id);

        _colorExists[_color] = true;
    }
}
