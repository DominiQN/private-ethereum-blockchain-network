// personal.unlockAccount(eth.accounts[0], 'bridge')
// gxroom 
// "0x0000000000000000000000000000000000003139322e3136382e3130302e3230","0x0000000000000000000000000000000000000000000000000067785f726f6f6d","0x00000000000000000000000000000000000000000000000000004e4f524d414c"
// sauna 
// "0x0000000000000000000000000000000000003139322e3136382e3130302e3231","0x0000000000000000000000000000000000000000000000000000007361756e61","0x000000000000000000000000000000000000000000000053555350454e444544"

// da00001
// "0xb60d95e2bdb16b46d7156563f7e101be71699a6a","0x0000000000000000000000000000000000000000000000000064613030303031","0x00000000000000000000000000000000000000000000000000004e4f524d414c","0x0000000000000000000000000000000000000000000000000000000000313031","0x0000000000000000000000000000000000000000000000000000000000313031"
// da00002
// "0xcae74a2ad2b8c494020f11dbeaceaaec5225e00a","0x0000000000000000000000000000000000000000000000000064613030303032","0x000000000000000000000000000000000000000000000053555350454e444544","0x0000000000000000000000000000000000000000000000000000000000313031","0x0000000000000000000000000000000000000000000000000000000000313032"

pragma solidity ^0.4.19;

contract Bridge {
    mapping (address => uint256) public balanceOf; // 각 주소의 잔고
    
    bytes32 normal = 0x00000000000000000000000000000000000000000000000000004e4f524d414c;
    bytes32 suspended = 0x000000000000000000000000000000000000000000000053555350454e444544;

    // 시설
    struct Facility {
        bytes32 ip;
        bytes32 name;
        bytes32 status;
    }
    mapping(bytes32 => Facility) private facilitys;
    bytes32[] facilityKeys;

    // 카드
    struct Card {
        address addr;
        bytes32 id;
        bytes32 status;
        bytes32 dong;
        bytes32 ho;
        mapping(bytes32 => Facility) auth;
    }
    mapping(address => Card) private cards;
    address[] cardKeys;


    // log events
    event getCardEvent(address addr, bytes32 id, bytes32 status, bytes32 dong, bytes32 ho);
    event setCardSuccessEvent(address addr, bytes32 id, bytes32 status, bytes32 dong, bytes32 ho);
    event setCardFailureEvent(address addr, bytes32 id, bytes32 status, bytes32 dong, bytes32 ho);
    event setFacility(bytes32 ip, bytes32 name, bytes32 status);
    event clearCardAuth(address addr);
    event updateCardAuth(address addr, bytes32[] auth);
    event successHistory(
        uint256 indexed accessTimestamp,
        address indexed cardAddr,
        bytes32 indexed facilityIp,
        bytes32 cardId,
        bytes32 dong,
        bytes32 ho,
        bytes32 facilityName
    );
    event failureHistory(
        uint256 indexed accessTimestamp,
        address indexed cardAddr,
        bytes32 indexed facilityIp,
        bytes32 cardId,
        bytes32 dong,
        bytes32 ho,
        bytes32 facilityName
    );

       // (3) 생성자
    function Bridge() public {}

    function divide(uint numerator, uint denominator) private pure returns (uint quotient, uint remainder) {
        quotient = numerator / denominator;
        remainder = numerator - denominator * quotient;
    }

    function createFacility(bytes32 ip, bytes32 name, bytes32 status) public {
        // Facility memory facility = facilitys[ip];
        facilitys[ip] = Facility(ip, name, status);
        facilityKeys.push(ip);
        setFacility(ip, name, status);
    }

    function getFacilityInfo(bytes32 ip) public view returns (bytes32, bytes32, bytes32) {
        Facility memory facility = facilitys[ip];
        return (facility.ip, facility.name, facility.status);
    }
    
    function getFacilityList() public view returns(
        bytes32[] memory ips,
        bytes32[] memory names,
        bytes32[] memory statuses
    ) {
        ips = new bytes32[](facilityKeys.length);
        names = new bytes32[](facilityKeys.length);
        statuses = new bytes32[](facilityKeys.length);
        Facility memory currentFacility;
        for(uint i = 0; i < facilityKeys.length; i++) {
            currentFacility = facilitys[facilityKeys[i]];
            ips[i] = currentFacility.ip;
            names[i] = currentFacility.name;
            statuses[i] = currentFacility.status;
        }
    }

    function addCard(address addr, bytes32 id, bytes32 status, bytes32 dong, bytes32 ho) private {
        cards[addr] = Card({ id: id, addr: addr, status: status, dong: dong, ho: ho});
        cardKeys.push(addr);
    }

    function createCard(address addr, bytes32 id, bytes32 status, bytes32 dong, bytes32 ho) public {
        Card storage card = cards[addr];

        if (card.id == 0) {
            addCard(addr, id, status, dong, ho);
            setCardSuccessEvent(addr, id, status, dong, ho);
        } else {
            setCardFailureEvent(addr, id, status, dong, ho);
        }
    }

    function getCardInfo(address addr) public view returns(address, bytes32, bytes32, bytes32, bytes32) {
        Card storage card = cards[addr];
        return (card.addr, card.id, card.status, card.dong, card.ho);
    }

    function isValidCard(address _to) public view returns(bool) {
        Card storage card = cards[_to];
        return (card.id != "") && (card.status == normal);
    }
    
    function getCardList() public view returns(
        bytes32[] memory ids,
        bytes32[] memory statuses,
        bytes32[] memory dongs,
        bytes32[] memory hos
    ) {
        ids = new bytes32[](cardKeys.length);
        statuses = new bytes32[](cardKeys.length);
        dongs = new bytes32[](cardKeys.length);
        hos = new bytes32[](cardKeys.length);
        Card memory currentCard;
        for(uint i = 0; i < cardKeys.length; i++) {
            currentCard = cards[cardKeys[i]];
            ids[i] = currentCard.id;
            statuses[i] = currentCard.status;
            dongs[i] = currentCard.dong;
            hos[i] = currentCard.ho;
        }
    }

    function getCardAuth(address addr) public view returns(bytes32[] memory ips, bytes32[] memory names) {
        Facility memory currentFacility;
        ips = new bytes32[](facilityKeys.length);
        names = new bytes32[](facilityKeys.length);
        for(uint i = 0; i < facilityKeys.length; i++) {
            currentFacility = cards[addr].auth[facilityKeys[i]];
            if((currentFacility.ip != 0) && (currentFacility.status == normal)) {
                ips[i] = currentFacility.ip;
                names[i] = currentFacility.name;
            }
        }
        // size = currentLength;
    }
    
    function clearAuth(address addr) public {
        for(uint i = 0; i < facilityKeys.length; i++) {
            cards[addr].auth[facilityKeys[i]].ip = bytes32(0);
            cards[addr].auth[facilityKeys[i]].name = bytes32(0);
            cards[addr].auth[facilityKeys[i]].status = bytes32(0);
        }
        clearCardAuth(addr);
    }
    
    function updateAuth(address addr, bytes32[] memory auth) public {
        Facility memory currentFacility;
        for(uint i = 0; i < auth.length; i++) {
            currentFacility = facilitys[auth[i]];
            require(currentFacility.ip != 0);
            cards[addr].auth[auth[i]] = currentFacility;
        }
        updateCardAuth(addr, auth);
    }
    
    function access(address addr, bytes32 facilityIp, uint256 accessTimestamp) public returns(bool isAuthorized) {
        Card memory card = cards[addr];
        Facility memory facility = cards[addr].auth[facilityIp];
        if (card.addr != address(0) && card.status == normal && facility.ip != bytes32(0)) {
            successHistory(accessTimestamp, card.addr, facility.ip, card.id, card.dong, card.ho, facility.name);
            return true;
        }
        else {
            failureHistory(accessTimestamp, card.addr, facility.ip, card.id, card.dong, card.ho, facility.name);
            return false;
        }
    }
}